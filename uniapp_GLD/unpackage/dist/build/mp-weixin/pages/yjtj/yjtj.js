(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/yjtj/yjtj"],{"2d6f":function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))},3144:function(t,e,n){"use strict";var i=n("9cee"),o=n.n(i);o.a},"32bd":function(t,e,n){"use strict";n.r(e);var i=n("2d6f"),o=n("552d");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("3144");var s,r=n("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"f29c6a10",null,!1,i["a"],s);e["default"]=c.exports},"552d":function(t,e,n){"use strict";n.r(e);var i=n("df2a"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"9cee":function(t,e,n){},c097:function(t,e,n){"use strict";(function(t){n("8063");i(n("66fd"));var e=i(n("32bd"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},df2a:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("66fd")),o=n("2f62"),a=r(n("ae28")),s=(r(n("a57d")),r(n("d95f")));function r(t){return t&&t.__esModule?t:{default:t}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){h(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d,l=function(){n.e("components/tabControl-tag/tabControl-tag").then(function(){return resolve(n("b00d"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/mx-datepicker/mx-datepicker").then(function(){return resolve(n("9d56"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/mdslect").then(function(){return resolve(n("239f"))}.bind(null,n)).catch(n.oe)},g=null,m={components:{tabControl:l,MxDatePicker:f,mdslect:p},data:function(){return{canvasIsShow:!0,Winheight:this.getWindowHeight(),mdxz:!1,isShow:!0,showPicker:!1,date:(new Date).getNowFormatDate("yyyy-MM-dd"),range:[],type:"rangetime",value:"",items:["昨天","今天","本周","本月","上月"],current:1,currentRRR:0,cWidth:"",cHeight:"",pixelRatio:1,DateChoose:null,yjList:[],ljddList:[],ljddNumber:0,lsNumber:0}},computed:u({},(0,o.mapState)({num:function(t){return t.num}})),onLoad:function(){d=this,d.cWidth=t.upx2px(700),d.cHeight=t.upx2px(500),d.getSList(),d.getljddList(),d.getlsList()},methods:{YJmdxz:function(){this.mdxz=!0,this.canvasIsShow=!1},queding:function(t){this.mdxz=t.yinC,this.mdnum=t.num,i.default.prototype.$mdList=t.oldArr,i.default.prototype.$mdListData=t.newArr,i.default.prototype.$htData=t.htArr,this.canvasIsShow=!0,this.getSList(),this.getljddList(),this.getlsList()},resert:function(t){this.mdxz=t.yinC,this.canvasIsShow=!0},onClickItem:function(t){this.current=t.currentIndex},scollSwiper:function(t){this.current=t.target.current,this.range=[],this.currentRRR=0,this.DateChoose=null,this.getSList(),this.getljddList(),this.getlsList()},onShowDatePicker:function(t){this.type=t,this.showPicker=!0,this.value=this[t],this.canvasIsShow=!1},onSelected:function(t){this.showPicker=!1,t&&(this[this.type]=t.value,t.value.length>1?this.isShow=!0:this.isShow=!1,this.currentRRR=-1,this.canvasIsShow=!0,this.DateChoose=t.value.join(","),this.getSList(),this.getljddList(),this.getlsList())},onCancel:function(){this.showPicker=!1,this.canvasIsShow=!0},getServerData:function(t){var e=t.list;0==e.length?this.canvasIsShow=!1:this.canvasIsShow=!0,this.showRing("canvasRing",e)},showRing:function(t,e){g=new s.default({$this:d,canvasId:t,type:"ring",fontSize:11,padding:[5,5,5,5],legend:{show:!0,position:"right",float:"center",itemGap:10,padding:5,lineHeight:26,margin:5,borderWidth:1},background:"#FFFFFF",pixelRatio:d.pixelRatio,series:e,animation:!1,width:d.cWidth*d.pixelRatio,height:d.cHeight*d.pixelRatio,disablePieStroke:!0,dataLabel:!0,extra:{pie:{offsetAngle:0,ringWidth:20*d.pixelRatio,labelWidth:15}}})},touchRing:function(t){g.touchLegend(t,{animation:!1}),g.showToolTip(t,{format:function(t){return t.name+":"+t.data}})},changeData:function(){g.updateData({series:this.pieListB})},getSList:function(){var e=this,n="Performance/GetPerformanceStatistics",i={employeeId:t.getStorageSync("employeeId"),DateType:null==this.DateChoose?this.current:null,storeIds:void 0==this.$htData?null:this.$htData.join(","),DateChoose:this.DateChoose};t.showLoading({title:"加载中"}),a.default.httpRequestGet(n,i).then((function(n){"Success"==n.data.error_code?(e.yjList=n.data.data,t.hideLoading()):t.hideLoading()}))},getljddList:function(){var e=this,n="Performance/GetPerformanceNumber",i={employeeId:t.getStorageSync("employeeId"),DateType:null==this.DateChoose?this.current:null,storeIds:void 0==this.$htData?null:this.$htData.join(","),DateChoose:this.DateChoose};a.default.httpRequestGet(n,i).then((function(t){"Success"==t.data.error_code&&(e.ljddList=t.data.data.list,e.ljddNumber=t.data.data.Number)}))},getlsList:function(){var e=this,n="Performance/GetPerformanceNumberLossof",i={employeeId:t.getStorageSync("employeeId"),DateType:null==this.DateChoose?this.current:null,storeIds:void 0==this.$htData?null:this.$htData.join(","),DateChoose:this.DateChoose};a.default.httpRequestGet(n,i).then((function(t){"Success"==t.data.error_code&&(e.lsNumber=t.data.data.Number,e.getServerData(t.data.data))}))}}};e.default=m}).call(this,n("543d")["default"])}},[["c097","common/runtime","common/vendor"]]]);