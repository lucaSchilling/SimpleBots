webpackJsonp([1],{ABj6:function(t,e,a){"use strict";function s(t){a("JZP8")}var n=a("sYoA"),o=a("X27R"),i=a("VU/8"),l=s,r=i(n.a,o.a,!1,l,"data-v-0b54f9f3",null);e.a=r.exports},DVsz:function(t,e,a){"use strict";e.a={name:"tablerow",methods:{deleteBot:function(){this.$store.dispatch("delete",this.ID)},getAll:function(){this.$store.dispatch("getAll")},postStatus:function(){this.$store.dispatch("postStatus",this.ID)},postSwitch:function(t){var e={id:this.ID,status:t};this.$store.dispatch("postStatus",e)}},computed:{getStatus:function(){return this.$store.getters.getStatus(this.ID)}},props:["ID","status","template","name","lastedit"]}},JZP8:function(t,e){},M93x:function(t,e,a){"use strict";function s(t){a("hebK")}var n=a("xJD8"),o=a("aTa8"),i=a("VU/8"),l=s,r=i(n.a,o.a,!1,l,null,null);e.a=r.exports},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n=a("Lgyv"),o=a.n(n),i=a("tzNG"),l=(a.n(i),a("M93x")),r=a("YaEn"),u=a("wtEF");s.default.use(o.a),s.default.config.productionTip=!1,new s.default({el:"#app",router:r.a,template:"<App/>",components:{App:l.a},store:u.a,render:function(t){return t(l.a)}})},PMGh:function(t,e,a){"use strict";function s(t){a("zs32")}var n=a("DVsz"),o=a("dGln"),i=a("VU/8"),l=s,r=i(n.a,o.a,!1,l,null,null);e.a=r.exports},X27R:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("md-table-card",[a("md-toolbar",[a("h1",{staticClass:"md-title"},[t._v("All Bots")]),t._v(" "),a("md-button",{staticClass:"md-raised md-primary",attrs:{href:"/dist/config/frontend"}},[t._v("Config")]),t._v(" "),a("md-button",{staticClass:"md-icon-button"},[a("md-icon",[t._v("search")])],1),t._v(" "),a("md-button",{staticClass:"md-icon-button",on:{click:t.getAll}},[a("md-icon",[t._v("refresh")])],1)],1),t._v(" "),a("md-table",[a("md-table-header",[a("md-table-row",[a("md-table-head"),t._v(" "),a("md-table-head",[t._v("Status")]),t._v(" "),a("md-table-head",[t._v("ID")]),t._v(" "),a("md-table-head",[t._v("Template")]),t._v(" "),a("md-table-head",[t._v("Name")]),t._v(" "),a("md-table-head",[t._v("Last Edit")])],1)],1),t._v(" "),a("md-table-body",{attrs:{id:"tablebody"}},t._l(t.bots,function(t){return a("tablerow",{key:t.ID,attrs:{ID:t.ID,status:t.status,template:t.template,name:t.name,lastedit:t.lastedit}})}))],1)],1)],1)},n=[],o={render:s,staticRenderFns:n};e.a=o},YaEn:function(t,e,a){"use strict";var s=a("7+uW"),n=a("/ocq"),o=a("ABj6");s.default.use(n.a),e.a=new n.a({routes:[{path:"/",name:"Runtime",component:o.a}]})},aTa8:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[],o={render:s,staticRenderFns:n};e.a=o},dGln:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("md-table-row",[a("md-table-cell",[a("md-switch",{staticClass:"md-primary",on:{change:t.postSwitch},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}})],1),t._v(" "),a("md-table-cell",[a("div",{class:[t.status?"circleGreen":"circleYellow"]})]),t._v(" "),a("md-table-cell",[t._v(t._s(t.ID))]),t._v(" "),a("md-table-cell",[t._v(t._s(t.template))]),t._v(" "),a("md-table-cell",[t._v(t._s(t.name))]),t._v(" "),a("md-table-cell",[t._v(t._s(t.lastedit))]),t._v(" "),a("md-table-cell",[a("md-button",{staticClass:"md-icon-button",on:{click:t.deleteBot}},[a("md-icon",[t._v("delete")])],1)],1)],1)},n=[],o={render:s,staticRenderFns:n};e.a=o},hebK:function(t,e){},sYoA:function(t,e,a){"use strict";var s=a("PMGh");e.a={name:"Table",methods:{getAll:function(){this.$store.dispatch("getAll")}},beforeMount:function(){this.getAll()},computed:{bots:function(){return this.$store.state.bots},getStatus:function(){return this.$store.getters.getStatus}},components:{tablerow:s.a}}},tzNG:function(t,e){},wtEF:function(t,e,a){"use strict";a.d(e,"a",function(){return i});var s=a("7+uW"),n=a("NYxO");s.default.use(n.a);var o=a("mtWM"),i=new n.a.Store({state:{bots:[]},getters:{getBotFromArray:function(t,e){for(var a=0;a<t.bots.length;a++)if(e===t.bots[a]._id)return t.bots[a]},getStatus:function(t,e){for(var a=0;a<t.bots.length;a++)if(e===t.bots[a]._id)return t.bots[a].status}},mutations:{getAll:function(t,e){for(var a=0;a<e.data.length;a++)t.bots.push({ID:e.data[a]._id,status:e.data[a].status,template:e.data[a].template,name:e.data[a].name,lastedit:e.data[a].lastEdit})},clearBotsFromArray:function(t){t.bots=[]}},actions:{getAll:function(t){o.get("http://141.19.142.6:3000/getAll").then(function(e){t.commit("clearBotsFromArray"),t.commit("getAll",e)})},delete:function(t,e){o.delete("http://141.19.142.6:3000/delete/"+e).then(function(e){t.dispatch("getAll")})},postStatus:function(t,e){o.post("http://141.19.142.6:3000/setStatus",{_id:e.id,status:e.status}).then(function(t){})}}})},xJD8:function(t,e,a){"use strict";e.a={}},zs32:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f23448ce12637d40d134.js.map