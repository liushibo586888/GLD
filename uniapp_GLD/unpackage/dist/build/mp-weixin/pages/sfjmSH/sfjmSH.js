(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sfjmSH/sfjmSH"],{"072e":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("ae28"));function i(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{dataList:[],tabslist:["待处理","已同意","已拒绝"],tabIndex:0,height:0,PageIndex:1,totalPage:0}},created:function(){var t=this;t.height=t.getWindowHeight()-50+"px"},onShow:function(){this.getList()},methods:{tabclick:function(t){this.tabIndex=t,this.getList()},tzxqy:function(e){var a=this.dataList[e].slist;a["typeUrl"]="NewAudit/AuditRelief",a=JSON.stringify(a),t.navigateTo({url:"../wzshxq/wzshxq?data="+a})},scrolltolower:function(){this.PageIndex++,this.PageIndex<=this.totalPage?this.getList(this.PageIndex):t.showToast({title:"暂无更多数据",duration:1e3})},getList:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,o="NewAudit/GetFeeReduction",d={storeIds:void 0==this.$htData?null:this.$htData.join(","),employeeId:t.getStorageSync("employeeId"),StateType:this.tabIndex,PageIndex:a,PageSize:i};t.showLoading({title:"加载中"}),n.default.httpRequestGet(o,d).then((function(n){if("Success"==n.data.error_code){var i=n.data.data;if(a>1){var o=e.dataList;o=o.concat(i.list)}else{o=[];o=i.list}e.dataList=o,e.totalPage=i.totalPage,t.hideLoading()}else t.hideLoading(),t.showToast({title:n.data.error_message,duration:2e3,icon:"none"})}))}}};e.default=o}).call(this,a("543d")["default"])},"6d11":function(t,e,a){"use strict";var n=a("6d96"),i=a.n(n);i.a},"6d96":function(t,e,a){},"9a96":function(t,e,a){"use strict";var n,i=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}))},d7e5:function(t,e,a){"use strict";a.r(e);var n=a("9a96"),i=a("fad6");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("6d11");var d,s=a("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"67cfb98d",null,!1,n["a"],d);e["default"]=u.exports},de65:function(t,e,a){"use strict";(function(t){a("8063");n(a("66fd"));var e=n(a("d7e5"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},fad6:function(t,e,a){"use strict";a.r(e);var n=a("072e"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a}},[["de65","common/runtime","common/vendor"]]]);