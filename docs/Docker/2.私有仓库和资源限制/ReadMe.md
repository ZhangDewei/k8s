## 1.私有仓库
```
名称：Harbor
官网：https://goharbor.io/
Git：https://github.com/goharbor/harbor
```
    
   
## 2.资源限制：NameSpace -> CGroups


类型说明：

```
Cpu：
    可压缩型资源
    --cpus=<value>：cpu占用的核心数量
    --cpuset-cpus： 限制跑在哪个cpu核心上（cpu绑定）

```

```
Mem：
    --memory：物理内存的限制配额
    --memory-swap：交换内存一般不建议使用，会影响性能（使用也是很小）

```

```
IO：
    还没有好的方案 
```


## 3.压测工具：docker-stress-ng

```
    拉取镜像：
        docker pull lorel/docker-stress-ng
    帮助命令查询：
        docker run -it --rm lorel/docker-stress-ng -h
     docker容器运行情况查看：
        docker stats
    Top命令观察：
        top ->1
```
           

内存压测方式：

说明：
* 限制内存使用最多315M
* 开启压测启动6个进程，每个进程使用256M（默认值，会被内存限制数所限制）
```
docker run --name stress -it --rm -m 315m lorel/docker-stress-ng:latest stress --vm 6
```    

验证：
```
docker stats stress
top
```
![内存压测验证](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/memcheck.png)

CPU压测方式：

说明：
* 限制CPU最多使用1.6C
* 开启压测启动5个进程
```
docker run --name stress --rm --cpus 1.6 lorel/docker-stress-ng:latest stress --cpu 5
```
    
验证：
```
docker stats stress
top
```
![Cpu压测验证](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/cpucheck.png)