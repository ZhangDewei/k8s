(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{227:function(t,a,e){"use strict";e.r(a);var s=e(0),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"pod资源清单配置基础"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pod资源清单配置基础"}},[t._v("#")]),t._v(" Pod资源清单配置基础")]),t._v(" "),e("p",[e("code",[t._v("Docker")]),t._v("中我们都说容器、"),e("code",[t._v("docker")]),t._v("，大家耳熟能详。但到了"),e("code",[t._v("kubernetes")]),t._v('中，这个专有名词仿佛就被"取而代之"了。'),e("code",[t._v("kubernetes")]),t._v("的语境中，我们将一个容器集合称之为"),e("code",[t._v("Pod")])]),t._v(" "),e("ul",[e("li",[t._v("What is Pod?")]),t._v(" "),e("li",[t._v("Pod的特征")]),t._v(" "),e("li",[t._v("Pod对象的配置格式")]),t._v(" "),e("li",[t._v("Pod对象的申明类型")]),t._v(" "),e("li",[t._v("命令补充")]),t._v(" "),e("li",[t._v("基础yaml")]),t._v(" "),e("li",[t._v("三种网络代理方式")]),t._v(" "),e("li",[t._v("参考文档")])]),t._v(" "),e("h2",{attrs:{id:"_1-what-is-pod"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-what-is-pod"}},[t._v("#")]),t._v(" 1.What is Pod?")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/pod.png",alt:"What is Pod"}}),t._v("\n那什么是"),e("code",[t._v("Pod")]),t._v("？如图所示，"),e("code",[t._v("Pod")]),t._v("中有一个"),e("code",[t._v("pause")]),t._v("容器，和一堆业务容器，他们有各自的"),e("code",[t._v("PID")]),t._v("、"),e("code",[t._v("MOUNT")]),t._v("和"),e("code",[t._v("USER")]),t._v("，但他们共享"),e("code",[t._v("IPC")]),t._v("、"),e("code",[t._v("UTS")]),t._v("和"),e("code",[t._v("NETWORK")]),t._v("。对于这六个专属名词的描述，可以看下面的表格：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("简称")]),t._v(" "),e("th",[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("UTS")]),t._v(" "),e("td",[t._v("主机名")])]),t._v(" "),e("tr",[e("td",[t._v("IPC")]),t._v(" "),e("td",[t._v("进程间通信")])]),t._v(" "),e("tr",[e("td",[t._v("PID")]),t._v(" "),e("td",[t._v('"chroot"进程树')])]),t._v(" "),e("tr",[e("td",[t._v("MOUNT")]),t._v(" "),e("td",[t._v("挂载点")])]),t._v(" "),e("tr",[e("td",[t._v("NETWORK")]),t._v(" "),e("td",[t._v("网络访问，包括接口")])]),t._v(" "),e("tr",[e("td",[t._v("USER")]),t._v(" "),e("td",[t._v("将本地的虚拟user-id映射到真实的user-id")])])])]),t._v(" "),e("h2",{attrs:{id:"_2-pod的特征"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-pod的特征"}},[t._v("#")]),t._v(" 2.Pod的特征")]),t._v(" "),e("ul",[e("li",[t._v('通过使用"各自"的IPC，使得可以在一个Pod中通信')]),t._v(" "),e("li",[t._v("容器可以通过localhost相互访问")]),t._v(" "),e("li",[t._v("每个容器继承Pod的名称")]),t._v(" "),e("li",[t._v("每个Pod有一个平滑共享网络名称空间的ip地址")]),t._v(" "),e("li",[t._v("Pod内部的存储卷是共享的")])]),t._v(" "),e("h2",{attrs:{id:"_3-pod对象的配置格式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-pod对象的配置格式"}},[t._v("#")]),t._v(" 3.Pod对象的配置格式")]),t._v(" "),e("pre",[e("code",[t._v("kind：定义资源类型，例如deployment、service等\napiVersion：定义调用的api版本，所支持的版本可以通过kubectl  api-resources查看 \nmetadata：资源提供源数据信息，如名称、隶属的名称空间和标签等\nspec：用于定义用户期望的状态，不同的资源类型\nStatus：记录活动对象的当前状态信息，由k8s系统自行维护，对用户来说为只读字段\n")])]),t._v(" "),e("h2",{attrs:{id:"_4-pod对象的申明类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-pod对象的申明类型"}},[t._v("#")]),t._v(" 4.Pod对象的申明类型")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("陈述式：\n    kubectl create -f xx.yaml\n        \n申明式（建议使用）：\n    kubectl apply -f xx.yaml\n")])])]),e("h2",{attrs:{id:"_5-命令补充"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-命令补充"}},[t._v("#")]),t._v(" 5.命令补充")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#相关资源的命令查询：")]),t._v("\nkubectl explain pods"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(".spec.tolerations…."),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    \n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#导出pod对应的yaml模版：")]),t._v("\nkubectl  get pod ngx-new-cb79d555-gqwf8 -o yaml --export "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" ngx-new-demo.yaml\n  \n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#Docker策略补充    ")]),t._v("\nDocker:\n    imagePullPolicy:\n        Always:无论本地有没有镜像，都要去互联网拖"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("常用于拉取latest的镜像"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        IfNotPresent：如果本地没有镜像，就不启动（常用于拉取指定版本的镜像）\n        Nerver:本地有就直接用，没有再去拖\n\n")])])]),e("p",[t._v("温馨提示：")]),t._v(" "),e("blockquote",[e("p",[t._v('你要善于使用kubectl explain命令，这是你学习、"原创"kubernetes配置清单的大宝剑！')])]),t._v(" "),e("h2",{attrs:{id:"_6-基础yaml"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-基础yaml"}},[t._v("#")]),t._v(" 6.基础yaml")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" v1\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Pod\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" first"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pod\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" bash"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("container\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" docker.io/busybox\n")])])]),e("h2",{attrs:{id:"_7-三种网络代理方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7-三种网络代理方式"}},[t._v("#")]),t._v(" 7.三种网络代理方式")]),t._v(" "),e("pre",[e("code",[t._v("Service：申明NodePort类型，可以通过任意节点访问\nhostPort：直接将容器的端口与所调度的节点上的端口路由，这样用户就可以通过宿主机的IP加上来访问Pod了\nhostNetwork：共享宿主机的网络名称空间\n")])]),t._v(" "),e("h2",{attrs:{id:"_8-参考文档"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_8-参考文档"}},[t._v("#")]),t._v(" 8.参考文档")]),t._v(" "),e("p",[t._v("reference文档：https://kubernetes.io/docs/reference/using-api/api-overview/")]),t._v(" "),e("p",[t._v("API文档：https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/")])])}),[],!1,null,null,null);a.default=n.exports}}]);