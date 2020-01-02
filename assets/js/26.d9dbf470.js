(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{246:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"horizontal-pod-autoscaler（hpa控制器）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#horizontal-pod-autoscaler（hpa控制器）"}},[t._v("#")]),t._v(" Horizontal Pod Autoscaler（HPA控制器）")]),t._v(" "),s("p",[t._v("应用的资源使用率通常都有高峰和低谷的时候，如何削峰填谷，如何提高集群的整体资源利用率，如何让"),s("code",[t._v("service")]),t._v("中的"),s("code",[t._v("Pod")]),t._v("个数自动调整呢？\n这就有赖于"),s("code",[t._v("Horizontal Pod Autoscaling")]),t._v("（"),s("code",[t._v("HPA")]),t._v("控制器）了！")]),t._v(" "),s("ul",[s("li",[t._v("自动伸缩")]),t._v(" "),s("li",[t._v("HPA简介")]),t._v(" "),s("li",[t._v("HPA组件交互图")]),t._v(" "),s("li",[t._v("Before you begin")]),t._v(" "),s("li",[t._v("实战-autoscaling/v1")]),t._v(" "),s("li",[t._v("介绍-autoscaling/v2beta2")]),t._v(" "),s("li",[t._v("附录：参考文档")])]),t._v(" "),s("h2",{attrs:{id:"_1-自动伸缩"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-自动伸缩"}},[t._v("#")]),t._v(" 1.自动伸缩")]),t._v(" "),s("p",[t._v("自动伸缩分为两种：水平伸缩和垂直伸缩。")]),t._v(" "),s("h3",{attrs:{id:"_1-水平伸缩"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-水平伸缩"}},[t._v("#")]),t._v(" 1.水平伸缩")]),t._v(" "),s("p",[t._v("水平伸缩")]),t._v(" "),s("div",{staticClass:"language-text extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("K8S基础资源级别的水平伸缩：\nHPA（Horizontal Pod Autoscaling）：\n    autoscaling/v1：仅支持cpu采样\n    autoscaling/v2beta1：额外增加支持custom metrics（kubernetes1.6+）\n    autoscaling/v2beta2：额外增加支持external metrics，multiple metrics和metrics APIs（kubernetes1.6）\n")])])]),s("div",{staticClass:"language-text extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("K8S集群级别的水平伸缩：\nCA（Cluster Autoscaler）：通过集成云计算的相关资源申请接口，达到集群级别的动态弹性伸缩效果。\n\n")])])]),s("h3",{attrs:{id:"_2-垂直伸缩"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-垂直伸缩"}},[t._v("#")]),t._v(" 2.垂直伸缩")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/kubernetes/community/blob/master/contributors/design-proposals/autoscaling/vertical-pod-autoscaler.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("垂直伸缩"),s("OutboundLink")],1)])]),t._v(" "),s("div",{staticClass:"language-text extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("    VPA（Vertical Pod AutoScaler）-垂直伸缩：提升单个Pod的request处理能力（还不成熟）\n    AR（Addon Resizer：垂直伸缩工具）：根据实际状态，弹性调整pod的request和limit\n\n")])])]),s("h2",{attrs:{id:"_2-hpa简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-hpa简介"}},[t._v("#")]),t._v(" 2.HPA简介")]),t._v(" "),s("p",[t._v("根据对应的"),s("code",[t._v("autoscaling/API")]),t._v("版本，"),s("code",[t._v("HPA")]),t._v("可以获得监控指标并结合"),s("code",[t._v("replication controller")]),t._v(", "),s("code",[t._v("deployment")]),t._v(", "),s("code",[t._v("replica set")]),t._v("或者"),s("code",[t._v("stateful set")]),t._v("自动扩展"),s("code",[t._v("Pod")]),t._v("，需要注意的是"),s("code",[t._v("DaemonSets")]),t._v("对象是不支持的。")]),t._v(" "),s("h2",{attrs:{id:"_3-hpa组件交互图"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-hpa组件交互图"}},[t._v("#")]),t._v(" 3.HPA组件交互图")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Docker/HPA.png",alt:"HPA组件交互图-1"}})]),t._v(" "),s("p",[t._v("用户可以通过"),s("code",[t._v("CMD")]),t._v("，显示申明一个"),s("code",[t._v("HPA")]),t._v("控制器,然后"),s("code",[t._v("HPA")]),t._v("控制器根据指标自动调整"),s("code",[t._v("RS/Deployment")]),t._v("控制器指标，从而达到自动扩缩容"),s("code",[t._v("Pod")]),t._v("的效果。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("kubectl autoscale deployment foo --min"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" --max"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" --cpu-percent"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("\n\n")])])]),s("h2",{attrs:{id:"_4-before-you-begin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-before-you-begin"}},[t._v("#")]),t._v(" 4.Before you begin")]),t._v(" "),s("p",[t._v("使用前，需要"),s("code",[t._v("make sure")]),t._v("以下几点：")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("K8S")]),t._v("集群"),s("code",[t._v("version 1.2")]),t._v(" or "),s("code",[t._v("later")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/kubernetes-sigs/metrics-server",target:"_blank",rel:"noopener noreferrer"}},[t._v("metrics-server"),s("OutboundLink")],1),t._v("/"),s("a",{attrs:{href:"https://github.com/coreos/prometheus-operator",target:"_blank",rel:"noopener noreferrer"}},[t._v("Prometheus"),s("OutboundLink")],1)])]),t._v(" "),s("p",[s("code",[t._v("metrics-server")]),t._v("部署的时候需要注意修改"),s("code",[t._v("~/deploy/")]),t._v("对应版本下的"),s("code",[t._v("/metrics-server-deployment.yaml")]),t._v(",新增"),s("code",[t._v("command")])]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" metrics"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("server\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" k8s.gcr.io/metrics"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("server"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("amd64"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("v0.3.3\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("imagePullPolicy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Always\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumeMounts")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" tmp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("dir\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("mountPath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /tmp\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("command")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" /metrics"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("server\n                "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("kubelet"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("preferred"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("address"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("types=InternalIP\n                "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("kubelet"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("insecure"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("tls\n")])])]),s("p",[t._v("否则会碰到如下报错信息：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("unable to fully collect metrics: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("unable to fully scrape metrics from "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" kubelet_summary:mywork: unable to fetch metrics from Kubelet mywork "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mywork"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(": Get https://mywork:10250/stats/summary/: dial tcp: i/o timeout, unable to fully scrape metrics from "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" kubelet_summary:marktest: unable to fetch metrics from Kubelet marktest "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("marktest"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(": Get https://marktest:10250/stats/summary/: dial tcp: i/o timeout"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("p",[t._v("相应的，如果想集成"),s("code",[t._v("prometheus")]),t._v("的"),s("code",[t._v("SD")]),t._v("，需要在"),s("code",[t._v("K8S")]),t._v("基础资源中进行声明：")]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[t._v("      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("annotations")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# based on your Prometheus config above, this tells prometheus")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# to scrape this pod for metrics on port 80 at "/metrics"')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("prometheus.io/scrape")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"true"')]),t._v("     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#允许prometheus自动发现，并抓取数据")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("prometheus.io/port")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"80"')]),t._v("         "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#数据端口")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("prometheus.io/path")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/metrics"')]),t._v("   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#数据uri")]),t._v("\n\n")])])]),s("h2",{attrs:{id:"_5-实战-autoscaling-v1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-实战-autoscaling-v1"}},[t._v("#")]),t._v(" 5.实战-autoscaling/v1")]),t._v(" "),s("ol",[s("li",[t._v("创建压测服务"),s("code",[t._v("myapp.yaml")]),t._v("，并"),s("code",[t._v("apply")])])]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" apps/v1\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Deployment\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" myapp\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("namespace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" default\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("labels")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("app")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" myapp\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("replicas")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("selector")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("matchLabels")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("app")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" myapp\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" myapp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pod\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("labels")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("app")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" myapp\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" myapp\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ikubernetes/myapp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("v1\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("resources")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("requests")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cpu")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 50m\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("memory")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 64Mi\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("limits")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cpu")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 50m\n            "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("memory")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 64Mi\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("---")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" v1\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Service\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" myapp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("svc\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("labels")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("app")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" myapp\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("namespace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" default\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("selector")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("app")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" myapp\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" http\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("port")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("targetPort")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" NodePort\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("创建"),s("code",[t._v("HPA")]),t._v("控制器，并检查")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@centos-1 chapter14"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl autoscale deployment myapp --min=1 --max=5 --cpu-percent=1")]),t._v("\nhorizontalpodautoscaler.autoscaling/myapp autoscaled\n    \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@centos-1 chapter14"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl get hpa")]),t._v("\nNAME    REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE\nmyapp   Deployment/myapp   "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("%/1%     "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("          3s\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[t._v("由于"),s("code",[t._v("CPU利")]),t._v("用率不足1%，"),s("code",[t._v("pod")]),t._v("已经进行了缩容")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@centos-1 chapter14"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl get pods")]),t._v("\nNAME                     READY   STATUS    RESTARTS   AGE\nmyapp-d48f86cd4-d8nt5    "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("/1     Running   "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("          21m\n\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[t._v("这时，我们需要达到扩容的展示效果，需要在客户端启动压测命令")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("do")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" http://192.168.0.104:30502"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sleep")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".1."),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("done")]),t._v("\n")])])]),s("ol",{attrs:{start:"5"}},[s("li",[t._v("我们发现"),s("code",[t._v("pod")]),t._v("已经进行了扩容，虽然"),s("code",[t._v("cpu")]),t._v("利用率还是大于"),s("code",[t._v("10")]),t._v("，但是我们定义最大pod数量是"),s("code",[t._v("5")]),t._v("，所以就不会再扩容了，\n和预期效果一致。")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@centos-1 chapter14"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl top pod")]),t._v("\nNAME                     CPU"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cores"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("   MEMORY"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("bytes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("   \nmyapp-d48f86cd4-d8nt5    24m          2Mi             \nngx-new-cb79d555-x822n   0m           3Mi  \n               \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@centos-1 chapter14"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl top pod")]),t._v("\nNAME                     CPU"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cores"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("   MEMORY"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("bytes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("   \nmyapp-d48f86cd4-8xdts    5m           2Mi             \nmyapp-d48f86cd4-bdlr2    5m           2Mi             \nmyapp-d48f86cd4-d8nt5    5m           2Mi             \nmyapp-d48f86cd4-mll6m    5m           2Mi             \nmyapp-d48f86cd4-rlszf    5m           2Mi             \nngx-new-cb79d555-x822n   0m           3Mi \n                \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@centos-1 chapter14"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl get hpa")]),t._v("\nNAME    REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE\nmyapp   Deployment/myapp   "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("%/1%    "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("         "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("          4m8s\n")])])]),s("h2",{attrs:{id:"_6-介绍-autoscaling-v2beta2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-介绍-autoscaling-v2beta2"}},[t._v("#")]),t._v(" 6.介绍-autoscaling/v2beta2")]),t._v(" "),s("p",[s("code",[t._v("autoscaling/v2beta2")]),t._v("接口中提供了丰富的"),s("a",{attrs:{href:"https://v1-16.docs.kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/",target:"_blank",rel:"noopener noreferrer"}},[t._v("custom metrics"),s("OutboundLink")],1),t._v("，如"),s("code",[t._v("Pod")]),t._v("级别内建指标以及第三发可集成的指标。\n也可以参阅本页相关"),s("code",[t._v("yaml")]),t._v("附件，")]),t._v(" "),s("h2",{attrs:{id:"_7-参考文档"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-参考文档"}},[t._v("#")]),t._v(" 7.参考文档")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("官方文档：")]),t._v(" "),s("p",[t._v("https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/")]),t._v(" "),s("p",[t._v("https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/")])]),t._v(" "),s("li",[s("p",[t._v("jimmysong.io：")]),t._v(" "),s("p",[t._v("https://jimmysong.io/kubernetes-handbook/concepts/horizontal-pod-autoscaling.html")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);