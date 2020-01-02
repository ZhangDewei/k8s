(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{209:function(n,t,s){"use strict";s.r(t);var a=s(0),e=Object(a.a)({},(function(){var n=this,t=n.$createElement,s=n._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[s("h1",{attrs:{id:"pod控制器-deployment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#pod控制器-deployment"}},[n._v("#")]),n._v(" Pod控制器-Deployment")]),n._v(" "),s("p",[n._v("本章节开始，将对控制器逐个进行讲解和分析，我们先讲解最基础且最常用的控制器："),s("code",[n._v("Deployment")]),n._v("！")]),n._v(" "),s("ul",[s("li",[n._v("控制器对象的分类")]),n._v(" "),s("li",[n._v("What is Deployment?")]),n._v(" "),s("li",[n._v("Deployment的更新机制")]),n._v(" "),s("li",[n._v("ReplicaSet")]),n._v(" "),s("li",[n._v("命令补充")]),n._v(" "),s("li",[n._v("Deployment-demo")])]),n._v(" "),s("h2",{attrs:{id:"_1-控制器对象的分类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-控制器对象的分类"}},[n._v("#")]),n._v(" 1.控制器对象的分类")]),n._v(" "),s("h3",{attrs:{id:"_1-守护进程型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-守护进程型"}},[n._v("#")]),n._v(" 1.守护进程型")]),n._v(" "),s("p",[n._v("1.无状态应用:非系统级应用（Nginx等）")]),n._v(" "),s("p",[n._v("推荐使用：Deployment，ReplicaSet")]),n._v(" "),s("p",[n._v("2.无状态应用:系统级应用")]),n._v(" "),s("p",[n._v("应用场景：日志和监控收集客户端：场景就是每个node节点需要且只需要运行1个pod")]),n._v(" "),s("p",[n._v("推荐使用：DaemonSet")]),n._v(" "),s("p",[n._v("3.有状态应用")]),n._v(" "),s("p",[n._v("应用场景：mysql、redis集群等")]),n._v(" "),s("p",[n._v("推荐使用：statefulSet")]),n._v(" "),s("h3",{attrs:{id:"_2-非守护进程型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-非守护进程型"}},[n._v("#")]),n._v(" 2.非守护进程型")]),n._v(" "),s("p",[n._v("Job：一次性任务")]),n._v(" "),s("p",[n._v("Cronjob：定时任务")]),n._v(" "),s("h2",{attrs:{id:"_2-what-is-deployment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-what-is-deployment"}},[n._v("#")]),n._v(" 2. What is Deployment?")]),n._v(" "),s("p",[s("code",[n._v("Deploymen")]),n._v("是一个提供申明"),s("code",[n._v("Pod")]),n._v("更新和"),s("code",[n._v("Reolica Sets")]),n._v("状态的控制器。换句话说：")]),n._v(" "),s("blockquote",[s("p",[n._v("你在deployment对象中描述了一个期望状态，接着deployment控制器会让当前状态和用户期望状态保持一致。比如我期望运行2个nginx Pod，当一个Pod因为不可抗因素下线的时候deployment控制器就会根据用户期望的状态再启动一个nginx pod。")])]),n._v(" "),s("p",[s("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/deployment.png",alt:"deployment拓扑-1"}})]),n._v(" "),s("p",[n._v("第二章节的"),s("code",[n._v("kubernetes")]),n._v("集群架构里，我说过"),s("code",[n._v("tomcat")]),n._v("和"),s("code",[n._v("redis")]),n._v("是通过相关"),s("code",[n._v("service")]),n._v('进行"连接"的，这其实只是为了大家能更简单的理解。其实'),s("code",[n._v("serice")]),n._v("会去找到对应的"),s("code",[n._v("deployment")]),n._v("，然后"),s("code",[n._v("deployment")]),n._v("根据申明的"),s("code",[n._v("Replica Sets")]),n._v("的配置，控制对应"),s("code",[n._v("Pod")]),n._v("容器的数量和状态。")]),n._v(" "),s("h2",{attrs:{id:"_3-deployment的更新机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-deployment的更新机制"}},[n._v("#")]),n._v(" 3.Deployment的更新机制")]),n._v(" "),s("p",[s("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/deployment.png",alt:"deployment更新机制"}}),n._v("\n你可以发现"),s("code",[n._v("Deployment")]),n._v("的更新机制是基于滚动更新的，具体顺序如下：")]),n._v(" "),s("ul",[s("li",[n._v("首先，创建一个新的"),s("code",[n._v("RS")]),n._v("控制器，版本为"),s("code",[n._v("v2")]),n._v("；")]),n._v(" "),s("li",[n._v("接着将旧控制器的pod陆续下线，同时新的RS控制器同步上线对应Pod；")]),n._v(" "),s("li",[n._v("Pod更新完成后，弃用旧的RS控制器，滚动发布就此完成。")])]),n._v(" "),s("blockquote",[s("p",[n._v("你可以使用kubectl get pod -o wide -w观察pod滚动更新情况，可以使用kubectl get rs -o wide观察RS控制器的名字、状态等信息。")])]),n._v(" "),s("blockquote",[s("p",[n._v("你也可以使用pause命令实现基于deployment的金丝雀发布策略。")])]),n._v(" "),s("p",[n._v("这里我补充了一个"),s("code",[n._v("RS")]),n._v("控制器状态，你可以观察发现，各控制器的命名、期望状态、当前状态和就绪状态。")]),n._v(" "),s("div",{staticClass:"language-text extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("   \n#使用命令查看rs控制器的历史版本    \n[root@centos-1 mainfasts]# kubectl get rs -o wide\nNAME               DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES       SELECTOR\nmyapp-67f698f887   0         0         0       53m     myapp        nginx:1.16   app=myapp,pod-template-hash=67f698f887,rel=stable\nmyapp-7c488c6f44   5         5         5       48m     myapp        nginx:1.17   app=myapp,pod-template-hash=7c488c6f44,rel=stable\nmyapp-98f644994    0         0         0       46m     myapp        nginx:1.15   app=myapp,pod-template-hash=98f644994,rel=stable\nngx-new-cb79d555   2         2         2       2d22h   nginx        nginx        app=ngx-new,pod-template-hash=cb79d555\n\n")])])]),s("h3",{attrs:{id:"_1-滚动发布和回滚实战"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-滚动发布和回滚实战"}},[n._v("#")]),n._v(" 1.滚动发布和回滚实战")]),n._v(" "),s("ol",[s("li",[s("p",[n._v("我们首先编辑"),s("code",[n._v("deployment-nginx.yaml")]),n._v("，并"),s("code",[n._v("apply -f")]),n._v("，发布"),s("code",[n._v("nginx1.10")]),n._v("版本。\n其中我们给定了滚动策略：最多新增1个("),s("code",[n._v("maxSurge")]),n._v(")最少下线1个("),s("code",[n._v("maxUnavailable")]),n._v(")")]),n._v(" "),s("p",[n._v("第一次发布的时候是新增1个，下线2个")])])]),n._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("apiVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" apps/v1\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("kind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" Deployment\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" deploy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("-")]),n._v("nginx\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("replicas")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),n._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("minReadySeconds")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("10")]),n._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("strategy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("rollingUpdate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("maxSurge")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("maxUnavailable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" RollingUpdate\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("selector")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("matchLabels")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" nginx\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("labels")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" nginx\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("containers")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("-")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" nginx\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("image")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" nginx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("1.10"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("-")]),n._v("alpine\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("ports")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("-")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("containerPort")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("80")]),n._v("\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" http\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("readinessProbe")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("periodSeconds")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("httpGet")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v("\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("path")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" /\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[n._v("port")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(":")]),n._v(" http\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[n._v("接着，我们通过修改"),s("code",[n._v("deployment-nginx.yaml")]),n._v("的"),s("code",[n._v("image: nginx:1.10-alpine")]),n._v("版本为"),s("code",[n._v("1.13")]),n._v("，发布并观察。可以发现"),s("code",[n._v("deployment")]),n._v("对应的"),s("code",[n._v("rs")]),n._v("控制器逐步应用至"),s("code",[n._v("deploy-nginx-567c45c74")]),n._v("（"),s("code",[n._v("nginx:1.13-alpine")]),n._v("）")])]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 chapter5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl get rs -o wide")]),n._v("\nNAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR\ndeploy-nginx-567c45c748   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("       51s     nginx        nginx:1.13-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("567c45c748\ndeploy-nginx-5745bb45d7   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("       7m2s    nginx        nginx:1.10-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("5745bb45d7\ndeploy-nginx-67f876bcb6   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("       5m51s   nginx        nginx:1.11-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("67f876bcb6\n        \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 chapter5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl get rs -o wide")]),n._v("\nNAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR\ndeploy-nginx-567c45c748   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("       2m40s   nginx        nginx:1.13-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("567c45c748\ndeploy-nginx-5745bb45d7   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("       8m51s   nginx        nginx:1.10-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("5745bb45d7\ndeploy-nginx-67f876bcb6   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("       7m40s   nginx        nginx:1.11-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("67f876bcb6\n\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[n._v("同时，我们可以查看历史版本，第4条是我们最新的版本。由于前几次发布没有新增--record=true字段，所以显示为"),s("code",[n._v("none")])])]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 chapter5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl rollout history deployment/deploy-nginx")]),n._v("\ndeployment.apps/deploy-nginx \nREVISION  CHANGE-CAUSE\n"),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("<")]),n._v("none"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v(">")]),n._v("\n"),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("<")]),n._v("none"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v(">")]),n._v("\n"),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("4")]),n._v("         kubectl apply --filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("deploy-nginx.yaml --record"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("true\n\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[n._v("接下来，我将演示如何回滚至上个版本。\n我们使用rollout undo命令进行回滚，默认--to-revision=0（上一个版本）。观察"),s("code",[n._v("rs")]),n._v("变化,发现已经全部切换至"),s("code",[n._v("1.10")]),n._v("的"),s("code",[n._v("nginx")]),n._v(",至此滚动发布的策略和回滚已经演示完毕")])]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 chapter5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl rollout undo deployment/deploy-nginx --to-revision=0")]),n._v("\ndeployment.apps/deploy-nginx rolled back\n    \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 chapter5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl get rs -o wide")]),n._v("\nNAME                      DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES              SELECTOR\ndeploy-nginx-567c45c748   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("       4m58s   nginx        nginx:1.13-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("567c45c748\ndeploy-nginx-5745bb45d7   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("2")]),n._v("       11m     nginx        nginx:1.10-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("5745bb45d7\ndeploy-nginx-67f876bcb6   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("       9m58s   nginx        nginx:1.11-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("67f876bcb6\n    \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 chapter5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl get rs -o wide")]),n._v("\nNAME                      DESIRED   CURRENT   READY   AGE    CONTAINERS   IMAGES              SELECTOR\ndeploy-nginx-567c45c748   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("       5m6s   nginx        nginx:1.13-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("567c45c748\ndeploy-nginx-5745bb45d7   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("3")]),n._v("       11m    nginx        nginx:1.10-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("5745bb45d7\ndeploy-nginx-67f876bcb6   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("       10m    nginx        nginx:1.11-alpine   "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n._v("app")]),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("nginx,pod-template-hash"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v("67f876bcb6\n\n")])])]),s("h3",{attrs:{id:"_2-金丝雀发布实战"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-金丝雀发布实战"}},[n._v("#")]),n._v(" 2.金丝雀发布实战")]),n._v(" "),s("ol",[s("li",[n._v("这里，我们基于上文的"),s("code",[n._v("1.10")]),n._v("的"),s("code",[n._v("nginx")]),n._v("，发布金丝雀版本："),s("code",[n._v("1.14")])])]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 chapter5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl set image deployment deploy-nginx nginx=nginx:1.14-alpine && kubectl rollout pause deployment deploy-nginx")]),n._v("\ndeployment.apps/deploy-nginx image updated\ndeployment.apps/deploy-nginx paused\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[n._v("此时发现"),s("code",[n._v("pod")]),n._v("新老版本共存，2个新版本2个老版本。你可以通过控制器名称后面的"),s("code",[n._v("HASH")]),n._v("数列，清晰观察到不通版本的控制器。")])]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[n._v("^C"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 dingqishi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl get pod  -w")]),n._v("\nNAME                            READY   STATUS    RESTARTS   AGE\ndeploy-nginx-5745bb45d7-5wfml   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          18m\ndeploy-nginx-5745bb45d7-84s4c   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          18m\ndeploy-nginx-5745bb45d7-dqt8q   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          18m\n    \n    \ndeploy-nginx-754874567-l6q7h    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Pending   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          0s\ndeploy-nginx-754874567-l6q7h    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Pending   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          0s\ndeploy-nginx-5745bb45d7-5wfml   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Terminating   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          18m\ndeploy-nginx-754874567-l6q7h    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     ContainerCreating   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          0s\ndeploy-nginx-754874567-q4bsh    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Pending             "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          0s\ndeploy-nginx-754874567-q4bsh    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Pending             "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          0s\ndeploy-nginx-754874567-q4bsh    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     ContainerCreating   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          1s\ndeploy-nginx-5745bb45d7-5wfml   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Terminating         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          18m\ndeploy-nginx-5745bb45d7-5wfml   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Terminating         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          18m\ndeploy-nginx-5745bb45d7-5wfml   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Terminating         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          18m\ndeploy-nginx-754874567-l6q7h    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Running             "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          24s\ndeploy-nginx-754874567-l6q7h    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running             "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          25s\ndeploy-nginx-754874567-q4bsh    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Running             "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          27s\ndeploy-nginx-754874567-q4bsh    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running             "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          27s\n    \n        \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 dingqishi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl get pod  ")]),n._v("\nNAME                            READY   STATUS    RESTARTS   AGE\ndeploy-nginx-5745bb45d7-84s4c   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          19m\ndeploy-nginx-5745bb45d7-dqt8q   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          19m\ndeploy-nginx-754874567-l6q7h    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          61s\ndeploy-nginx-754874567-q4bsh    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          61s\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[n._v("如果新版本的用户满意度不高，需要回滚的话，此时我们也可以用上文提到的"),s("code",[n._v("rollout")]),n._v("命令。")])]),n._v(" "),s("blockquote",[s("p",[n._v("再次提示：--to-revision=0为默认参数，意思是上一个版本，如果要回到指定版本，按需指定就行了。")])]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[n._v("kubectl rollout undo deployment/deploy-nginx --to-revision"),s("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[n._v("如果新版本用户满意度不错，需要完成剩余"),s("code",[n._v("Pod")]),n._v("更新的话，需要使用"),s("code",[n._v("resume")]),n._v("命令")])]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 chapter5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl rollout resume deployment deploy-nginx")]),n._v("\ndeployment.apps/deploy-nginx resumed\n    \n        \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 dingqishi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl get pod  -w")]),n._v("\nNAME                            READY   STATUS    RESTARTS   AGE\ndeploy-nginx-5745bb45d7-84s4c   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          27m\ndeploy-nginx-5745bb45d7-dqt8q   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          27m\ndeploy-nginx-754874567-l6q7h    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          8m35s\ndeploy-nginx-754874567-q4bsh    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          8m35s\n    \n    \ndeploy-nginx-5745bb45d7-84s4c   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Terminating   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          30m\ndeploy-nginx-5745bb45d7-dqt8q   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Terminating   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          30m\ndeploy-nginx-754874567-l6zz8    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Pending       "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          0s\ndeploy-nginx-754874567-l6zz8    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Pending       "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          0s\ndeploy-nginx-754874567-l6zz8    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     ContainerCreating   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          0s\ndeploy-nginx-5745bb45d7-84s4c   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Terminating         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          30m\ndeploy-nginx-5745bb45d7-dqt8q   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Terminating         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          30m\ndeploy-nginx-754874567-l6zz8    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Running             "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          3s\ndeploy-nginx-754874567-l6zz8    "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running             "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          3s\ndeploy-nginx-5745bb45d7-84s4c   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Terminating         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          30m\ndeploy-nginx-5745bb45d7-84s4c   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Terminating         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          30m\ndeploy-nginx-5745bb45d7-dqt8q   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Terminating         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          30m\ndeploy-nginx-5745bb45d7-dqt8q   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("/1     Terminating         "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          30m\n    \n        \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),n._v("root@centos-1 dingqishi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("# kubectl get pod  ")]),n._v("\nNAME                           READY   STATUS    RESTARTS   AGE\ndeploy-nginx-754874567-l6q7h   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          14m\ndeploy-nginx-754874567-l6zz8   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          3m33s\ndeploy-nginx-754874567-q4bsh   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("1")]),n._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[n._v("0")]),n._v("          14m\n\n")])])]),s("h2",{attrs:{id:"_4-replicaset"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-replicaset"}},[n._v("#")]),n._v(" 4.ReplicaSet")]),n._v(" "),s("p",[n._v("ReplicaSet组件的作用，想必现在你已经有些许的了解了：")]),n._v(" "),s("ul",[s("li",[n._v("在给定的任何时间，保证一个明确的pod运行数量")]),n._v(" "),s("li",[n._v("管理底层Pod")]),n._v(" "),s("li",[n._v("不应该人为介入进行调整、管理")])]),n._v(" "),s("h2",{attrs:{id:"_5-命令补充"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-命令补充"}},[n._v("#")]),n._v(" 5.命令补充")]),n._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[n._v("#实时观察Pod：")]),n._v("\nkubectl get pod -w\n")])])]),s("h2",{attrs:{id:"_6-deployment-demo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-deployment-demo"}},[n._v("#")]),n._v(" 6.Deployment-demo")]),n._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/Aaron1989/CloudNativeNotes/tree/master/docs/Kubernetes/6.Pod%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86",target:"_blank",rel:"noopener noreferrer"}},[n._v("deployment-demo"),s("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=e.exports}}]);