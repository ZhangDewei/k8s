# 二进制部署高可用k8s集群

本次采用二进制文件方式部署`https`（证书有效期为10年）高可用`k8s`集群，所有涉及的配置文件和镜像均已提供，无需翻墙。
另外，默认集群规模可支撑`254`个节点。
如果需要调整，请自行修改`/etc/kubernetes/controller-manager`中的`--node-cidr-mask-size=24`字段


- 高可用设计原则
- 高可用架构
- 基础环境准备
- Docker环境准备
- Etcd集群部署
- Master配置
- Node配置
- 组件高可用扩展-apiserver
- 组件高可用扩展-controller-manager
- 组件高可用扩展-scheduler
- CoreDns部署
- 集群高可用测试
- 证书过期时间修改和查询

## 1.高可用设计原则
```text
生产环境：
    高可用etcd集群（需定期备份），建立3、5或7个节点（奇数个节点）
    高可用Master：
        kube-apiserver无状态，可多实例部署：
            借助于Haproxy、nginx或keepalived进行vip流量实现多实例冗余，用户和集群客户端通过vip访问    
        kuber-scheduler和kuber-controller-manager：
            只能有一个活动实例，但可以有多个备用（主备模式）
```

## 2.高可用架构

![高可用架构-1](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/k8s-ha.png)

## 3.基础环境准备

组件 | 版本 
---- | ----- 
kubernetes | v1.13.4
etcd | 3.3.11
dockerce | 19.03.5 
cni | v0.8.1
OS | Centos6.2

主机名 | ip | 组件 | 角色 
---- | ----- | ----- | ----- 
k8s-etcd-master01.shared | 192.168.0.111 | etcd/apiserver/controller-manager/scheduler | Master 
k8s-etcd-master02.shared | 192.168.0.112 | etcd/apiserver/controller-manager/scheduler | Master 
k8s-etcd-master03.shared | 192.168.0.113 | etcd/apiserver/controller-manager/scheduler | Master 
k8s-node01.shared | 192.168.0.114 | kubelet/kube-proxy | Node 



`hosts`信息和时间同步（略）:
```bash
192.168.0.111   k8s-etcd-master01.shared   k8s-master01 etcd01 etcd01.ilinux.io k8s-master01.ilinux.io kubernetes-api.ilinux.io
192.168.0.112   k8s-etcd-master02.shared   k8s-master02 etcd02 etcd02.ilinux.io k8s-master02.ilinux.io
192.168.0.113   k8s-etcd-master03.shared   k8s-master03 etcd03 etcd03.ilinux.io k8s-master03.ilinux.io
192.168.0.114   k8s-node01.shared
```

关闭防火墙：
```bash
systemctl stop firewalld.service
systemctl stop iptables.service
systemctl disable firewalld.service
systemctl disable iptables.service
```
关闭`SELINUX`：
```bash
#临时关闭：
setenforce 0
    
    
#永久关闭
vi /etc/selinux/config
将SELINUX=enforcing改为SELINUX=disabled 
设置后需要重启才能生效
```
禁用`swap`设备
```bash
临时禁用： swapoff  -a
    
永久禁用：
vim  /etc/fstab 
注释 /dev/mapper/VolGroup-lv_swap swap 行
```
更新`nss` `curl` `libcurl`（否则`git clone`会报错）
```bash
yum update -y nss curl libcurl
```

## 4.Docker环境准备

安装步骤请参考[使用Kubeadm部署k8s集群]('http://localhost:8080/CloudNativeNotes/Kubernetes/3.%E4%BD%BF%E7%94%A8Kubeadm%E9%83%A8%E7%BD%B2k8s%E9%9B%86%E7%BE%A4/#_1-%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87')中的前五步即可


## 5.Etcd集群部署

文件 | 路径 | 说明
---- | ----- | ----- 
etcd.conf | /etc/etcd/ | 配置文件 
pki/* | /etc/etcd/ | 证书文件
pki/* | /root/k8s-certs-generator/etcd | 证书生成的路径（备用）
k8s.etcd | /var/lib/etcd/ | 数据文件，需定期备份 

Tips：
```text
下面展示如何从0->http集群->https集群的建设全过程，如果打算https一步到位，可跳过4和5两个步骤进行配置。
```

`Master`端：
1) 安装`3.3.11`的`etcd`
```bash
yum install -y etcd-3.3.11-2.el7.centos
```

2) 可以通过以下命令检查`install`是否成功
```bash
rpm -ql etcd
```

3) 三台对应修改`/etc/etcd/etcd.conf`配置文件，其中`ETCD_LISTEN_PEER_URLS`
、`ETCD_LISTEN_CLIENT_URLS`、`ETCD_NAME`、`ETCD_INITIAL_ADVERTISE_PEER_URLS`和
`ETCD_ADVERTISE_CLIENT_URLS`需要改成自己对应的信息
```bash
#[Member]
#ETCD_CORS=""
ETCD_DATA_DIR="/var/lib/etcd/default.etcd"
#ETCD_WAL_DIR=""
ETCD_LISTEN_PEER_URLS="http://192.168.0.111:2380"  #集群内相互通信地址
ETCD_LISTEN_CLIENT_URLS="http://192.168.0.111:2379" #客户端访问地址
#ETCD_MAX_SNAPSHOTS="5"
#ETCD_MAX_WALS="5"
ETCD_NAME="etcd01"           #本节点etcd名
#ETCD_SNAPSHOT_COUNT="100000"
#ETCD_HEARTBEAT_INTERVAL="100"
#ETCD_ELECTION_TIMEOUT="1000"
#ETCD_QUOTA_BACKEND_BYTES="0"
#ETCD_MAX_REQUEST_BYTES="1572864"
#ETCD_GRPC_KEEPALIVE_MIN_TIME="5s"
#ETCD_GRPC_KEEPALIVE_INTERVAL="2h0m0s"
#ETCD_GRPC_KEEPALIVE_TIMEOUT="20s"
#
#[Clustering]
ETCD_INITIAL_ADVERTISE_PEER_URLS="http://etcd01:2380"  #集群初始化监听在哪个地址，可用主机名
ETCD_ADVERTISE_CLIENT_URLS="http://etcd01:2379"      #监听在哪个地址，可用主机名 
#ETCD_DISCOVERY=""
#ETCD_DISCOVERY_FALLBACK="proxy"
#ETCD_DISCOVERY_PROXY=""
#ETCD_DISCOVERY_SRV=""
ETCD_INITIAL_CLUSTER="etcd01=http://etcd01:2380,etcd02=http://etcd02:2380,etcd03=http://etcd03:2380"    #静态初始化集群
#ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster"
#ETCD_INITIAL_CLUSTER_STATE="new"
```
4) 逆序依次启动`etcd`
```bash
systemctl start etcd
systemctl enable etcd
```

5) 此时高可用`etcd`集群已经部署完成（但是内部通信是`http`，非安全协议）
```bash
[root@k8s-etcd-master02 /]# etcdctl --endpoints='http://etcd01:2379' member list
b3504381e8ba3cb: name=etcd02 peerURLs=http://etcd02:2380 clientURLs=http://etcd02:2379 isLeader=false
b8b747c74aaea686: name=etcd01 peerURLs=http://etcd01:2380 clientURLs=http://etcd01:2379 isLeader=false
f572fdfc5cb68406: name=etcd03 peerURLs=http://etcd03:2380 clientURLs=http://etcd03:2379 isLeader=true
```

6) 将`cert-generator`目录`git clone`到本地，然后使用`bash gencerts.sh etcd`生成`etcd`证书，默认域名是`ilinux.io`，可自行填写，然后回车
```bash
[root@k8s-etcd-master01 cert-generator]# bash gencerts.sh etcd
Enter Domain Name [ilinux.io]: 

```

7) 证书生成并归档结果如下：
```bash
[root@k8s-etcd-master01 k8s-certs-generator]# tree etcd
etcd
├── patches
│   └── etcd-client-cert.patch        
└── pki
    ├── apiserver-etcd-client.crt     #让apiserver作为客户端与etcd集群通信的证书     
    ├── apiserver-etcd-client.key     #让apiserver作为客户端与etcd集群通信的证书
    ├── ca.crt                        #etcd https测试功能是否成功的证书
    ├── ca.key                        #etcd https测试功能是否成功的证书
    ├── client.crt               #客户端证书,apiserver也可以用这一个
    ├── client.key               #客户端私钥,apiserver也可以用这一个
    ├── peer.crt                 #etcd集群对等通信证书  
    ├── peer.key                 #etcd集群对等通信私钥  
    ├── server.crt               #服务端证书
    └── server.key               #服务端私钥

```

8) 证书分发至各`Master`节点的`/etc/etcd/`目录下
```bash
cd etcd
#本机
cp -rp pki/ /etc/etcd/ -a
    
#各节点
scp -rp pki/ etcd02:/etc/etcd/
scp -rp pki/ etcd03:/etc/etcd/
```
9) 修改各`Master`节点的`/etc/etcd/etcd.conf`配置文件中的`Security`段落
```yaml
#[Security]
ETCD_CERT_FILE="/etc/etcd/pki/server.crt"
ETCD_KEY_FILE="/etc/etcd/pki/server.key"
ETCD_CLIENT_CERT_AUTH="true"                        #服务端必须验证客户端证书 
ETCD_TRUSTED_CA_FILE="/etc/etcd/pki/ca.crt"
#ETCD_AUTO_TLS="false"
ETCD_PEER_CERT_FILE="/etc/etcd/pki/peer.crt"
ETCD_PEER_KEY_FILE="/etc/etcd/pki/peer.key"
ETCD_PEER_CLIENT_CERT_AUTH="true"                    #集群间必须相互验证证书
ETCD_PEER_TRUSTED_CA_FILE="/etc/etcd/pki/ca.crt"
#ETCD_PEER_AUTO_TLS="false"
```
10) 将第三步修改的`http`全改成`https`，`ETCD_DATA_DIR`修改成新地址，`ETCD_NAME="etcd03.ilinux.io"`修改成和`ca`域名设置时的`Domain Name`保持一致，最后修改`ETCD_INITIAL_CLUSTER_TOKEN="k8s-etcd-cluster"`,完成配置文件可参阅`etcd/etcd.conf`
```yaml
[Member]
ETCD_DATA_DIR="/var/lib/etcd/k8s.etcd"
ETCD_LISTEN_PEER_URLS="https://192.168.0.113:2380"
ETCD_LISTEN_CLIENT_URLS="https://192.168.0.113:2379"
ETCD_NAME="etcd03.ilinux.io"
  
#[Clustering]
ETCD_INITIAL_ADVERTISE_PEER_URLS="https://etcd03.ilinux.io:2380"
ETCD_ADVERTISE_CLIENT_URLS="https://etcd03.ilinux.io:2379"
ETCD_INITIAL_CLUSTER="etcd01.ilinux.io=https://etcd01.ilinux.io:2380,etcd02.ilinux.io=https://etcd02.ilinux.io:2380,etcd03.ilinux.io=https://etcd03.ilinux.io:2380"
ETCD_INITIAL_CLUSTER_TOKEN="k8s-etcd-cluster"
  
#[Security]
ETCD_CERT_FILE="/etc/etcd/pki/server.crt"
ETCD_KEY_FILE="/etc/etcd/pki/server.key"
ETCD_CLIENT_CERT_AUTH="true"                 #服务端必须验证客户端证书
ETCD_TRUSTED_CA_FILE="/etc/etcd/pki/ca.crt"
ETCD_PEER_CERT_FILE="/etc/etcd/pki/peer.crt"
ETCD_PEER_KEY_FILE="/etc/etcd/pki/peer.key"
ETCD_PEER_CLIENT_CERT_AUTH="true"             #集群间必须相互验证证书
ETCD_PEER_TRUSTED_CA_FILE="/etc/etcd/pki/ca.crt"

```

11) 全部停止并重启`etcd`，并用之前生成功能测试的`ca`客户端证书进行访问，至此`etcd https`集群已经部署完成
```bash
#全停止
systemctl stop etcd
    
#全启动
systemctl start etcd
    
#使用证书查看集群状态    
[root@k8s-etcd-master01 etcd]# etcdctl --endpoints='https://etcd01.ilinux.io:2379' --cert-file=/etc/etcd/pki/client.crt --key-file=/etc/etcd/pki/client.key --ca-file=/etc/etcd/pki/ca.crt cluster-health
member 1f22dc5568642e6f is healthy: got healthy result from https://etcd03.ilinux.io:2379
member 433f227ff9ad65cd is healthy: got healthy result from https://etcd02.ilinux.io:2379
member c4eb31a06cd36dd7 is healthy: got healthy result from https://etcd01.ilinux.io:2379
cluster is healthy

```


## 6.Master配置


文件 | 路径 | 说明
---- | ----- | ----- 
.* | /etc/kubernetes | master端实际配置文件
auth/* | /etc/kubernetes | auth证书文件
pki/* | /etc/kubernetes | pki证书文件
token.csv | /etc/kubernetes | 引导令牌文件
token.csv | /root/k8s-certs-generator/kubernetes/k8s-master01 | 引导令牌文件(备用)
.*  | /root/k8s-certs-generator/kubernetes | 证书生成的路径（备用）
.*  | /usr/local/kubernetes/server/bin | 二进制启动文件
kube-apiserver.service | /usr/lib/systemd/system | apiserver的启动配置文件
kube-controller-manager.service | /usr/lib/systemd/system | controller-manager的启动配置文件
kube-scheduler.service | /usr/lib/systemd/system | scheduler的启动配置文件
.*  | /var/run/kubernetes | k8s运行目录


1) 生成必要的证书和密钥，包括访问`etcd`集群时用到的客户端证书和私钥
```bash
#生成证书
cd /root/cert-generator
    
#生成k8s相关证书
[root@k8s-etcd-master01 k8s-certs-generator]# bash gencerts.sh k8s
Enter Domain Name [ilinux.io]:                    #不需要动，需要和etcd配置时保持一致
Enter Kubernetes Cluster Name [kubernetes]:       #可自定义
Enter the IP Address in default namespace 
  of the Kubernetes API Server[10.96.0.1]:        #不需要改
Enter Master servers name[master01 master02 master03]: k8s-master01 k8s-master02 k8s-master03      
                                                  #master名，与Domain Name拼接

```

2) 所需证书已经全部生成并归档
```bash
[root@k8s-etcd-master01 k8s-certs-generator]# tree kubernetes/
kubernetes/
├── CA
│   ├── ca.crt
│   └── ca.key
├── front-proxy
│   ├── front-proxy-ca.crt
│   ├── front-proxy-ca.key
│   ├── front-proxy-client.crt
│   └── front-proxy-client.key
├── ingress
│   ├── ingress-server.crt
│   ├── ingress-server.key
│   └── patches
│       └── ingress-tls.patch
├── k8s-master01
│   ├── auth
│   │   ├── admin.conf
│   │   ├── controller-manager.conf
│   │   └── scheduler.conf
│   ├── pki
│   │   ├── apiserver.crt
│   │   ├── apiserver-etcd-client.crt
│   │   ├── apiserver-etcd-client.key
│   │   ├── apiserver.key
│   │   ├── apiserver-kubelet-client.crt
│   │   ├── apiserver-kubelet-client.key
│   │   ├── ca.crt
│   │   ├── ca.key
│   │   ├── front-proxy-ca.crt
│   │   ├── front-proxy-ca.key
│   │   ├── front-proxy-client.crt
│   │   ├── front-proxy-client.key
│   │   ├── kube-controller-manager.crt
│   │   ├── kube-controller-manager.key
│   │   ├── kube-scheduler.crt
│   │   ├── kube-scheduler.key
│   │   ├── sa.key
│   │   └── sa.pub
│   └── token.csv
├── k8s-master02
│   ├── auth
│   │   ├── admin.conf
│   │   ├── controller-manager.conf
│   │   └── scheduler.conf
│   ├── pki
│   │   ├── apiserver.crt
│   │   ├── apiserver-etcd-client.crt
│   │   ├── apiserver-etcd-client.key
│   │   ├── apiserver.key
│   │   ├── apiserver-kubelet-client.crt
│   │   ├── apiserver-kubelet-client.key
│   │   ├── ca.crt
│   │   ├── ca.key
│   │   ├── front-proxy-ca.crt
│   │   ├── front-proxy-ca.key
│   │   ├── front-proxy-client.crt
│   │   ├── front-proxy-client.key
│   │   ├── kube-controller-manager.crt
│   │   ├── kube-controller-manager.key
│   │   ├── kube-scheduler.crt
│   │   ├── kube-scheduler.key
│   │   ├── sa.key
│   │   └── sa.pub
│   └── token.csv
├── k8s-master03
│   ├── auth
│   │   ├── admin.conf
│   │   ├── controller-manager.conf
│   │   └── scheduler.conf
│   ├── pki
│   │   ├── apiserver.crt
│   │   ├── apiserver-etcd-client.crt
│   │   ├── apiserver-etcd-client.key
│   │   ├── apiserver.key
│   │   ├── apiserver-kubelet-client.crt
│   │   ├── apiserver-kubelet-client.key
│   │   ├── ca.crt
│   │   ├── ca.key
│   │   ├── front-proxy-ca.crt
│   │   ├── front-proxy-ca.key
│   │   ├── front-proxy-client.crt
│   │   ├── front-proxy-client.key
│   │   ├── kube-controller-manager.crt
│   │   ├── kube-controller-manager.key
│   │   ├── kube-scheduler.crt
│   │   ├── kube-scheduler.key
│   │   ├── sa.key
│   │   └── sa.pub
│   └── token.csv
└── kubelet
    ├── auth
    │   ├── bootstrap.conf
    │   └── kube-proxy.conf
    └── pki
        ├── ca.crt
        ├── kube-proxy.crt
        └── kube-proxy.key

```

3) 将证书分发至各节点
```bash
#各节点
mkdir /etc/kubernetes
    
#本节点操作
cp -r kubernetes/k8s-master01/* /etc/kubernetes/
    
#其他节点
scp -rp kubernetes/k8s-master02/* k8s-master02:/etc/kubernetes/
scp -rp kubernetes/k8s-master03/* k8s-master03:/etc/kubernetes/        
```

4) 获取`v1.13.4`二进制`k8s`文件，解压缩至`/usr/local`,并分发至其余`master`节点一份
```bash
#获取镜像
docker pull registry.cn-hangzhou.aliyuncs.com/aaron89/k8s_bin:v1.13.4
    
#解压二进制文件    
docker run --rm -d --name temp registry.cn-hangzhou.aliyuncs.com/aaron89/k8s_bin:v1.13.4 sleep 10
docker cp temp:/kubernetes-server-linux-amd64.tar.gz .
tar xf kubernetes-server-linux-amd64.tar.gz  -C /usr/local/
    
#分发二进制文件
scp kubernetes-server-linux-amd64.tar.gz k8s-etcd-master02.shared:~
scp kubernetes-server-linux-amd64.tar.gz k8s-etcd-master03.shared:~
```

5) 将我提供的配置文件`cp`到对应路径
```bash
#本节点
cp etc/kubernetes/* /etc/kubernetes/
cp usr/lib/systemd/system/* /usr/lib/systemd/system
    
#各节点
scp etc/kubernetes/* k8s-master02:/etc/kubernetes/
scp usr/lib/systemd/system/* k8s-master02:/usr/lib/systemd/system
    
scp etc/kubernetes/* k8s-master03:/etc/kubernetes/
scp usr/lib/systemd/system/* k8s-master03:/usr/lib/systemd/system    
```

6) 修改`apiserver`配置文件中的`KUBE_ETCD_SERVERS`，另外`config`文件中的日志级别是`0(Debug)`，先不动,为了测试
```bash
KUBE_ETCD_SERVERS="--etcd-servers=https://etcd01.ilinux.io:2379,https://etcd02.ilinux.io:2379,https://etcd03.ilinux.io:2379"

```
7) 创建`kube`用户、`kubernetes`运行目录和权限
```bash
useradd -r kube
mkdir /var/run/kubernetes
chown kube.kube /var/run/kubernetes/
```

8) 启动`apiserver`，并查看`status`是否正常.至此`apiserver`已经成功启动，连接`etcd`集群和相关证书
```bash
systemctl daemon-reload
systemctl start kube-apiserver
systemctl enable kube-apiserver
systemctl status kube-apiserver
```

9) 配置`kubectl`，并使用`kubectl config view`查看配置是否正常
```bash
mkdir ~/.kube
ln -sv /usr/local/kubernetes/server/bin/kubectl /usr/bin/
cp /etc/kubernetes/auth/admin.conf ~/.kube/config
    
#kubectl config view   
[root@k8s-etcd-master01 auth]# kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://k8s-master01.ilinux.io:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: k8s-admin
  name: k8s-admin@kubernetes
current-context: k8s-admin@kubernetes
kind: Config
preferences: {}
users:
- name: k8s-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
```

10) 使用`get nodes`命令，如果没`error`就说明一切正常！
```bash
[root@k8s-etcd-master01 auth]# kubectl get nodes
No resources found.

```

11) 创建`ClusterRoleBinding`，将`/etc/kubernetes/token.csv`(引导`token`)中创建用户或者用户组（二选一即可）绑定至内建的
允许引导令牌功能的`clusterrole：system:node-bootstrapper`上。这里我使用的是`system:bootstrapper`用户。
```bash
# token.csv说明：用户（system:bootstrapper），组（system:bootstrappers）
b21f94.fbff38f94cfd0713,"system:bootstrapper",10001,"system:bootstrappers"
    
#授权        
kubectl create clusterrolebinding system:bootstrapper --user=system:bootstrapper --clusterrole=system:node-bootstrapper
```
12) 启动`kube-controller-manager`和`kube-scheduler`
```bash
#controller-manager
systemctl start kube-controller-manager
systemctl enable kube-controller-manager
systemctl status kube-controller-manager
    
#scheduler    
systemctl start kube-scheduler
systemctl enable kube-scheduler    
systemctl status kube-scheduler
```

13) 此时单台`master`已经配置完毕
```bash
[root@k8s-etcd-master01 kubernetes]# kubectl get cs
NAME                 STATUS    MESSAGE             ERROR
scheduler            Healthy   ok                  
controller-manager   Healthy   ok                  
etcd-1               Healthy   {"health":"true"}   
etcd-0               Healthy   {"health":"true"}   
etcd-2               Healthy   {"health":"true"}   

```

## 7.Node配置

文件 | 路径 | 说明
---- | ----- | ----- 
.* | /etc/kubernetes | node端实际配置文件
auth/* | /etc/kubernetes | auth证书文件
pki/* | /etc/kubernetes | pki证书文件
kubelet  | /usr/local/kubernetes/node/bin | kubelet二进制启动文件
kube-proxy  | /usr/local/kubernetes/node/bin | kube-proxy二进制启动文件
kubelet | /var/lib/ | kubelet的配置文件
kube-proxy | /var/lib/ | kube-proxy的配置文件
kubelet.service | /usr/lib/systemd/system | kubelet的service文件
kube-proxy.service | /usr/lib/systemd/system | kube-proxy的service文件
.*  | /opt/cni/bin | cni运行文件
ipvs.modules | /etc/sysconfig/modules/ipvs.modules | ipvs脚本

你需要自行将环境准备环节和`dockerce`环境初始化好
1) 准备配置文件和证书
```bash
#将本章提供的kube-proxy和kubelet整个目录复制到/var/lib/下面
cp -rp kube-proxy/ /var/lib/
cp -rp kubelet/ /var/lib/
        
#将本章提供的kubernetes/目录整个复制到/etc下
cp -rp kubernetes/ /etc/  
    
#将Master端生成的kubelet证书分发至node节点的/etc/kubernetes/下     
cd ~/k8s-certs-generator/kubernetes/kubelet/
scp -r * k8s-node01.shared:/etc/kubernetes/
```

2) 下载`cni`插件，并放到`opt/cni/bin`目录下
```bash
wget https://github.com/containernetworking/plugins/releases/download/v0.8.1/cni-plugins-linux-amd64-v0.8.1.tgz
mkdir -p /opt/cni/bin
tar xf cni-plugins-linux-amd64-v0.8.1.tgz  -C /opt/cni/bin/
```

3) 准备`kublet`和`kubeproxy`的`service`文件
```bash
#将本章提供的node/unit-files/*放到/usr/lib/systemd/system目录
scp node/unit-files/* k8s-node01.shared:/usr/lib/systemd/system
```

4) 创建`bin`目录，并从`master`端分发`kubelet`和`kubeproxy`的二进制文件
```bash
mkdir -p /usr/local/kubernetes/node/bin/
    
#在拉取过k8s二进制代码的master节点上操作    
scp /usr/local/kubernetes/server/bin/kube{let,-proxy} k8s-node01.shared:/usr/local/kubernetes/node/bin/
```
5) 启动`kubelet`
```bash
systemctl start  kubelet
systemctl enable  kubelet
systemctl status  kubelet
```
6) `master`端确认加入集群的请求
```bash
#查询请求
[root@k8s-etcd-master01 auth]# kubectl get csr
NAME                                                   AGE     REQUESTOR             CONDITION
node-csr-O1ThCQzmKSWv7aUvCBJLF0U2A-FJY73d3l9ui2Zdf74   5m48s   system:bootstrapper   Pending
    
#签署请求
[root@k8s-etcd-master01 auth]# kubectl certificate approve node-csr-O1ThCQzmKSWv7aUvCBJLF0U2A-FJY73d3l9ui2Zdf74
certificatesigningrequest.certificates.k8s.io/node-csr-O1ThCQzmKSWv7aUvCBJLF0U2A-FJY73d3l9ui2Zdf74 approved
    
# node已经加入，但是还没ready
[root@k8s-etcd-master01 auth]# kubectl get nodes
NAME                STATUS     ROLES    AGE     VERSION
k8s-node01.shared   NotReady   <none>   2m44s   v1.13.4
    
```

7) 启用`ipvs`内核模块
创建内核模块载入相关的脚本文件`/etc/sysconfig/modules/ipvs.modules`，设定自动载入的内核模块。文件内容如下：
```bash
#!/bin/bash
ipvs_mods_dir="/usr/lib/modules/$(uname -r)/kernel/net/netfilter/ipvs"
for i in $(ls $ipvs_mods_dir | grep -o "^[^.]*"); do
    /sbin/modinfo -F filename $i  &> /dev/null
    if [ $? -eq 0 ]; then
        /sbin/modprobe $i
    fi
done
    
# 赋权、运行并检查    
chmod +x /etc/sysconfig/modules/ipvs.modules
/etc/sysconfig/modules/ipvs.modules
lsmod |grep ip_vs
```

8) 启动`kube-proxy`
```bash
[root@k8s-node01 kubernetes]# systemctl  start kube-proxy
[root@k8s-node01 kubernetes]# systemctl  enable kube-proxy
Created symlink from /etc/systemd/system/multi-user.target.wants/kube-proxy.service to /usr/lib/systemd/system/kube-proxy.service.
[root@k8s-node01 kubernetes]# systemctl  status kube-proxy

```

9) 拉取`flannel`所需镜像
```bash
#node节点
docker pull registry.cn-hangzhou.aliyuncs.com/aaron89/flannel:v0.11.0-amd64	
docker tag registry.cn-hangzhou.aliyuncs.com/aaron89/flannel:v0.11.0-amd64	  quay.io/coreos/flannel:v0.11.0-amd64

docker pull registry.cn-hangzhou.aliyuncs.com/aaron89/pause:3.1
docker tag registry.cn-hangzhou.aliyuncs.com/aaron89/pause:3.1 k8s.gcr.io/pause:3.1    
```

10) `master`端`apply flannel`插件
```bash
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

11) 此时`flannel`的`pod`已经成功运行，而且`node`的状态也已经是`ready`了
```bash
[root@k8s-etcd-master01 ~]# kubectl get pod -n kube-system -o wide
NAME                          READY   STATUS    RESTARTS   AGE   IP              NODE                NOMINATED NODE   READINESS GATES
kube-flannel-ds-amd64-cj8rh   1/1     Running   0          37m   192.168.0.114   k8s-node01.shared   <none>           <none>
    
[root@k8s-etcd-master01 ~]# kubectl get node
NAME                STATUS   ROLES    AGE   VERSION
k8s-node01.shared   Ready    <none>   93m   v1.13.4    
```


## 8.组件高可用扩展-apiserver
### 1.其余master节点
1) 创建`kube`用户、`kubernetes`运行目录和权限
```bash
useradd -r kube
mkdir /var/run/kubernetes
chown kube.kube /var/run/kubernetes/
```
2) 启动`apiserver`，并查看`status`是否正常.至此`apiserver`已经成功启动，连接`etcd`集群和相关证书 
```bash
systemctl daemon-reload
systemctl start kube-apiserver
systemctl enable kube-apiserver
systemctl status kube-apiserver
```
3) 配置`kubectl`(可选)
```bash
mkdir ~/.kube
ln -sv /usr/local/kubernetes/server/bin/kubectl /usr/bin/
cp /etc/kubernetes/auth/admin.conf ~/.kube/config
    
#使用kubelet命令查看
[root@k8s-etcd-master02 kubernetes]# kubectl get node
NAME                STATUS   ROLES    AGE   VERSION
k8s-node01.shared   Ready    <none>   22h   v1.13.4

```

4) 集群的高可用链接地址，需要用`vip`或者多个`A`记录进行冗余。本章暂时就通过`hosts`解析在`mater01`上。

高可用集群接入地址：
```bash
https://kubernetes-api.ilinux.io:6443
```    
配置文件位置如下：
```bash
#master：
/root/k8s-certs-generator/kubernetes/kubelet/auth/bootstrap.conf和kube-proxy.conf
    
#node:
/etc/kubernetes/auth/bootstrap.conf和kube-proxy.conf
```

## 9.组件高可用扩展-controller-manager
### 1.其余master节点
```bash
systemctl start kube-controller-manager
systemctl enable kube-controller-manager
systemctl status kube-controller-manager
```
## 10.组件高可用扩展-scheduler
### 1.其余master节点
```bash
systemctl start kube-scheduler
systemctl enable kube-scheduler
systemctl status kube-scheduler
```

## 11.CoreDns部署

1)`Master01`上进行操作
```bash
docker pull registry.cn-hangzhou.aliyuncs.com/aaron89/coredns:1.6.6
docker tag registry.cn-hangzhou.aliyuncs.com/aaron89/coredns:1.6.6 coredns/coredns:1.6.6
wget https://raw.githubusercontent.com/coredns/deployment/master/kubernetes/coredns.yaml.sed
wget https://raw.githubusercontent.com/coredns/deployment/master/kubernetes/deploy.sh
bash deploy.sh -i 10.96.0.10 -r "10.96.0.0/12" -s -t coredns.yaml.sed | kubectl apply -f -
```

2) 解析测试
```bash
#初始化pod
cat<<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  namespace: default
spec:
  containers:
  - name: busybox
    image: busybox:1.28
    command:
      - sleep
      - "3600"
    imagePullPolicy: IfNotPresent
  restartPolicy: Always
EOF
    
#测试
[root@k8s-etcd-mater01 ~]# kubectl exec -ti busybox -- nslookup kubernetes
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local
    
Name:      kubernetes
Address 1: 10.96.0.1 kubernetes.default.svc.cluster.local
    
```

## 12.集群高可用测试
### 1.Etcd高可用测试

```bash
#现在etcd02是leader节点
[root@k8s-etcd-master01 unit-files]# etcdctl --endpoints='https://etcd01.ilinux.io:2379' --cert-file=/etc/etcd/pki/client.crt --key-file=/etc/etcd/pki/client.key --ca-file=/etc/etcd/pki/ca.crt member list
1f22dc5568642e6f: name=etcd03.ilinux.io peerURLs=https://etcd03.ilinux.io:2380 clientURLs=https://etcd03.ilinux.io:2379 isLeader=false
433f227ff9ad65cd: name=etcd02.ilinux.io peerURLs=https://etcd02.ilinux.io:2380 clientURLs=https://etcd02.ilinux.io:2379 isLeader=true
c4eb31a06cd36dd7: name=etcd01.ilinux.io peerURLs=https://etcd01.ilinux.io:2380 clientURLs=https://etcd01.ilinux.io:2379 isLeader=false
    
#在etcd02上关闭etcd    
systemctl stop etcd
    
#此时已经进行重新选举etcd03成了leader
[root@k8s-etcd-master01 unit-files]# etcdctl --endpoints='https://etcd01.ilinux.io:2379' --cert-file=/etc/etcd/pki/client.crt --key-file=/etc/etcd/pki/client.key --ca-file=/etc/etcd/pki/ca.crt member list
1f22dc5568642e6f: name=etcd03.ilinux.io peerURLs=https://etcd03.ilinux.io:2380 clientURLs=https://etcd03.ilinux.io:2379 isLeader=true
433f227ff9ad65cd: name=etcd02.ilinux.io peerURLs=https://etcd02.ilinux.io:2380 clientURLs=https://etcd02.ilinux.io:2379 isLeader=false
c4eb31a06cd36dd7: name=etcd01.ilinux.io peerURLs=https://etcd01.ilinux.io:2380 clientURLs=https://etcd01.ilinux.io:2379 isLeader=false
    
#此时集群状态是degraded降级，且k8s集群功能正常，表示etcd集群高可用验证成功
[root@k8s-etcd-master01 unit-files]# etcdctl --endpoints='https://etcd01.ilinux.io:2379' --cert-file=/etc/etcd/pki/client.crt --key-file=/etc/etcd/pki/client.key --ca-file=/etc/etcd/pki/ca.crt cluster-health
member 1f22dc5568642e6f is healthy: got healthy result from https://etcd03.ilinux.io:2379
failed to check the health of member 433f227ff9ad65cd on https://etcd02.ilinux.io:2379: Get https://etcd02.ilinux.io:2379/health: dial tcp 192.168.0.112:2379: connect: connection refused
member 433f227ff9ad65cd is unreachable: [https://etcd02.ilinux.io:2379] are all unreachable
member c4eb31a06cd36dd7 is healthy: got healthy result from https://etcd01.ilinux.io:2379
cluster is degraded
    
#[root@k8s-etcd-master01 unit-files]# kubectl get node
NAME                STATUS   ROLES    AGE   VERSION
k8s-node01.shared   Ready    <none>   22h   v1.13.4
    
#最后我们回复etcd02节点，发现集群状态已经恢复成healthy
[root@k8s-etcd-master01 unit-files]# etcdctl --endpoints='https://etcd01.ilinux.io:2379' --cert-file=/etc/etcd/pki/client.crt --key-file=/etc/etcd/pki/client.key --ca-file=/etc/etcd/pki/ca.crt cluster-health
member 1f22dc5568642e6f is healthy: got healthy result from https://etcd03.ilinux.io:2379
member 433f227ff9ad65cd is healthy: got healthy result from https://etcd02.ilinux.io:2379
member c4eb31a06cd36dd7 is healthy: got healthy result from https://etcd01.ilinux.io:2379
cluster is healthy
        
```

### 2.kube-controller-manager高可用测试
```bash
#当前controller-manager使用的是吗master01的组件（一定要注意：这是主备模式的组件，有一个工作就行），并且探测周期为15秒
[root@k8s-etcd-master02 kubernetes]# kubectl get endpoints -n kube-system kube-controller-manager -o yaml
apiVersion: v1
kind: Endpoints
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"k8s-etcd-master01.shared_25338479-2400-11ea-ac38-001c425c73bc","leaseDurationSeconds":15,"acquireTime":"2019-12-22T09:30:00Z","renewTime":"2019-12-22T11:07:15Z","leaderTransitions":3}'
  creationTimestamp: "2019-12-20T13:26:28Z"
  name: kube-controller-manager
  namespace: kube-system
  resourceVersion: "35332"
  selfLink: /api/v1/namespaces/kube-system/endpoints/kube-controller-manager
  uid: 54417b97-232c-11ea-a207-001c425c73bc
    
#关闭master01的controller-manager
systemctl stop kube-controller-manager
    
#此时我们发现controller-manager已经切换至k8s-etcd-master02，且一切功能正常
[root@k8s-etcd-master02 kubernetes]# kubectl get endpoints -n kube-system kube-controller-manager -o yaml
apiVersion: v1
kind: Endpoints
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"k8s-etcd-master02.shared_f16dffb2-24a7-11ea-89b4-001c42662fdd","leaseDurationSeconds":15,"acquireTime":"2019-12-22T11:11:01Z","renewTime":"2019-12-22T11:12:27Z","leaderTransitions":4}'
  creationTimestamp: "2019-12-20T13:26:28Z"
  name: kube-controller-manager
  namespace: kube-system
  resourceVersion: "35880"
  selfLink: /api/v1/namespaces/kube-system/endpoints/kube-controller-manager
  uid: 54417b97-232c-11ea-a207-001c425c73bc
    
#最后我们恢复master01的controller-manager,controller-manager使用的还是k8s-etcd-master02，和预期一致，测试成功
systemctl start kube-controller-manager    
```

### 3.kube-scheduler高可用测试
同上，不再单独演示

## 13.证书过期时间修改和查询

最后，我要说一下kubernetes默认证书1年，本章提供证书已经改为10年，你已经不需要调整；当然也可以通过修改源码的方式，修改kubernetes默认证书时间
1) 拉取源码
```bash
cd /data && git clone https://github.com/kubernetes/kubernetes.git

```

2) 切换到指定版本，以`V1.12.3`为例
```bash
git checkout -b remotes/origin/release-1.12  v1.12.3
```
3) 安装`go`环境
```bash
cd /data/soft && wget https://dl.google.com/go/go1.11.2.linux-amd64.tar.gz
tar zxvf go1.11.2.linux-amd64.tar.gz  -C /usr/local 
    
#编辑/etc/profile文件添加如下：
    
#go setting
export GOROOT=/usr/local/go
export GOPATH=/usr/local/gopath
export PATH=$PATH:$GOROOT/bin
    
source /etc/profile 生效
    
#验证：

go version
go version go1.11.2 linux/amd64

```
4) 修改源码：
`/data/kubernetes/staging/src/k8s.io/client-go/util/cert/cert.go`
```bash
112  NotAfter:     time.Now().Add(duration365d * 10).UTC(),
187  NotAfter:  validFrom.Add(maxAge *10),
215  NotAfter:  validFrom.Add(maxAge * 10),
    
原来1年 ； * 10 表示10年 
    
```

5) 编译：
```bash
cd /data/kubernetes/ && make WHAT=cmd/kubeadm
```

6) 查看证书过期时间
```bash
cd /etc/kubernetes/pki
    
openssl x509 -in front-proxy-client.crt   -noout -text  |grep Not
            Not Before: Nov 28 09:07:02 2018 GMT
            Not After : Nov 25 09:07:03 2028 GMT
    
openssl x509 -in apiserver.crt   -noout -text  |grep Not
            Not Before: Nov 28 09:07:04 2018 GMT
            Not After : Nov 25 09:07:04 2028 GMT

```