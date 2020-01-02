(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{242:function(t,e,s){"use strict";s.r(e);var n=s(0),r=Object(n.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"_1-调度流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-调度流程"}},[t._v("#")]),t._v(" 1.调度流程")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/%E8%B0%83%E5%BA%A6%E6%B5%81%E7%A8%8B%E5%9B%BE.png",alt:"调度流程"}})]),t._v(" "),s("p",[t._v("如图所示，调度流程分为两大块：")]),t._v(" "),s("h3",{attrs:{id:"_1-filtering"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-filtering"}},[t._v("#")]),t._v(" 1.Filtering")]),t._v(" "),s("p",[t._v("预选阶段，也称为"),s("code",[t._v("predicate")]),t._v("。会按照预选过滤器，首先把不符合要求的"),s("code",[t._v("node")]),t._v("节点直接剔除在外。")]),t._v(" "),s("p",[t._v("所有过滤器：https://github.com/kubernetes/kubernetes/tree/master/pkg/scheduler/algorithm/predicates")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("Filtering：Pod Affinity")]),t._v(" "),s("p",[t._v("Pod之间的亲和性，表示是否愿意调度在一个区域（可以是node、机架、也可以是机房）")])])]),t._v(" "),s("h3",{attrs:{id:"_2-scoring"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-scoring"}},[t._v("#")]),t._v(" 2.Scoring")]),t._v(" "),s("p",[t._v("打分阶段，也称为"),s("code",[t._v("priority")]),t._v("（优选阶段，哪个更优），通过优选函数对节点进行打分，从而决定调度策略。")]),t._v(" "),s("p",[t._v("所有过滤器：https://github.com/kubernetes/kubernetes/tree/master/pkg/scheduler/algorithm/priorities")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("Scoring：NodeAffinityPriority")]),t._v(" "),s("p",[t._v("pod对node的亲和性，表示是否愿意调度到某个node上，其细分为以下两个类型：")]),t._v(" "),s("p",[t._v("硬亲和(required)：requiredDuringSchedulingIgnoredDuringExecution")]),t._v(" "),s("pre",[s("code",[t._v(" 如果条件都不满足，则不调度,Pod对象的状态会一直是Pending状态\n")])]),t._v(" "),s("p",[t._v("软亲和(preferred)：preferredDuringSchedulingIgnoredDuringExecution")]),t._v(" "),s("pre",[s("code",[t._v(" 如果条件都不满足，也会从中按照打分，“勉为其难”的选择一个进行调度\n")])])])]),t._v(" "),s("h2",{attrs:{id:"_2-相关命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-相关命令"}},[t._v("#")]),t._v(" 2.相关命令")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@centos-1 chapter12"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl explain pod.spec.affinity")]),t._v("\nKIND:     Pod\nVERSION:  v1\n\nRESOURCE: affinity "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Object"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\nDESCRIPTION:\n     If specified, the pod's scheduling constraints\n\n     Affinity is a group of affinity scheduling rules.\n\nFIELDS:\n   nodeAffinity\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Object"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n     Describes node affinity scheduling rules "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" the pod.\n\n   podAffinity\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Object"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n     Describes pod affinity scheduling rules "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e.g. co-locate this pod "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" the\n     same node, zone, etc. as some other pod"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("s"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("))")]),t._v(".\n\n   podAntiAffinity\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Object"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n     Describes pod anti-affinity scheduling rules "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e.g. avoid putting this pod\n     "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" the same node, zone, etc. as some other pod"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("s"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("))")]),t._v(".\n")])])]),s("h2",{attrs:{id:"_3-实际配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-实际配置"}},[t._v("#")]),t._v(" 3.实际配置")]),t._v(" "),s("p",[t._v("可参考本页相关yaml文件，仅供参考")]),t._v(" "),s("p",[t._v("请注意：")]),t._v(" "),s("ul",[s("li",[t._v("key级别，是与关系（and）")]),t._v(" "),s("li",[t._v("matchExpressions级别是或关系（or）")])]),t._v(" "),s("h2",{attrs:{id:"_4-参考文档"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-参考文档"}},[t._v("#")]),t._v(" 4.参考文档")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("官方：")]),t._v(" "),s("p",[t._v("https://kubernetes.io/docs/concepts/scheduling/kube-scheduler/")])])])])}),[],!1,null,null,null);e.default=r.exports}}]);