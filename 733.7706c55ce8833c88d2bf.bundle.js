"use strict";(self.webpackChunkcrypto_jingles=self.webpackChunkcrypto_jingles||[]).push([[733],{55425:(e,t,n)=>{n.d(t,{N3:()=>y,Ns:()=>g,_f:()=>v,ai:()=>h,Gh:()=>k});var r=n(42982),a=n(4942),o=n(15861),i=n(87757),s=n.n(i),l=n(9669),c=n.n(l),u=n(6752),p=n(78334),d=n(67661);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(){return function(){var e=(0,o.Z)(s().mark((function e(t,n){var r,a,o,i,l,d,f,y,g,v,h,k,b,E;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n().marketplace,a=r.currentPage,o=r.category,i=r.sorting,l=n().app,d=l.hasMM,f=l.lockedMM,y=l.address,g=[],e.prev=3,e.next=6,c()("".concat(u.T5,"/jingles/").concat(o.value,"/").concat(a,"/filter/").concat(i.value));case 6:if(v=e.sent,h=v.data.map((function(e){return e.jingleId})).toString(),!(d&&!f&&h.length>0)){e.next=13;break}return e.next=11,c()("".concat(u.T5,"/jingles/check-liked/").concat(y,"/").concat(h));case 11:k=e.sent,g=v.data.map((function(e,t){return m(m({},e),{},{liked:k.data[t]})}));case 13:return(!d||f)&&h.length>0&&(g=v.data.map((function(e){return m(m({},e),{},{liked:!1})}))),0===h.length&&(g=v.data),b="".concat(u.T5,"/jingles/count/filter/").concat(i.value,"/sale/").concat(("sale"===o.value).toString()),e.next=18,c()(b);case 18:E=e.sent,t({type:p.yc,payload:{jingles:g,num:E.data}}),e.next=24;break;case 22:e.prev=22,e.t0=e.catch(3);case 24:case"end":return e.stop()}}),e,null,[[3,22]])})));return function(t,n){return e.apply(this,arguments)}}()},g=function(e){return function(t){t({type:p.dT,payload:e}),t(y())}},v=function(e){return function(t){t({type:p.jh,payload:e}),t(y())}},h=function(e){return function(t){t({type:p.rL,payload:e+1}),t(y())}},k=function(e,t){return function(){var n=(0,o.Z)(s().mark((function n(a,o){var i,l,c,u,f;return s().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i=o(),l=i.app.address,n.prev=2,n.next=5,(0,d.$M)(e,t,l);case 5:if(c=n.sent){n.next=8;break}return n.abrupt("return");case 8:u=(0,r.Z)(i.marketplace.jingles),f=u.findIndex((function(t){return t.jingleId===e})),u[f]=m(m({},u[f]),c),a({type:p.rU,payload:u}),n.next=16;break;case 14:n.prev=14,n.t0=n.catch(2);case 16:case"end":return n.stop()}}),n,null,[[2,14]])})));return function(e,t){return n.apply(this,arguments)}}()}},22479:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294);const a=function(){return r.createElement("svg",{viewBox:"0 0 140 140",className:"play-icon"},r.createElement("circle",{cx:"70",cy:"70",r:"65",style:{fill:"#fff",stroke:"#4b4b4b"}}),r.createElement("polygon",{id:"shape",points:"50,40 100,70 100,70 50,100, 50,40",style:{fill:"#7d7d7d"}}))}},65077:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294);const a=function(){return r.createElement("svg",{viewBox:"0 0 140 140"},r.createElement("circle",{cx:"70",cy:"70",r:"65",style:{fill:"#fff",stroke:"#ddd"}}),r.createElement("polygon",{id:"shape",points:"45,45 95,45 95,95, 45,95 45,45",style:{fill:"#aaa"}}))}},51744:(e,t,n)=>{n.d(t,{Z:()=>R});var r=n(15671),a=n(43144),o=n(97326),i=n(60136),s=n(82963),l=n(61120),c=n(4942),u=n(67294),p=n(89528),d=n.n(p),f=n(25264),m=n(45697),y=n.n(m),g=n(22479),v=n(65077),h=n(79484),k=n(78334),b=n(80166);function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){(0,c.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,l.Z)(e);if(t){var a=(0,l.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,s.Z)(this,n)}}var Z={margin:"14px 27px 7px 26px",width:"175px",float:"left"},O=function(e){(0,i.Z)(n,e);var t=j(n);function n(e){var a;return(0,r.Z)(this,n),a=t.call(this,e),(0,c.Z)((0,o.Z)(a),"playSound",(function(){null!==a.state.sound?(a.state.sound.play(),a.setState({start:!0})):a.loadSample()})),(0,c.Z)((0,o.Z)(a),"stopSound",(function(){a.state.sound&&(a.state.sound.stop(),a.setState({start:!1}))})),a.state={start:!1,loading:!1,sound:null},a.stopSound=a.stopSound.bind((0,o.Z)(a)),a.playSound=a.playSound.bind((0,o.Z)(a)),a.loadSample=a.loadSample.bind((0,o.Z)(a)),a}return(0,a.Z)(n,[{key:"componentWillUnmount",value:function(){this.stopSound()}},{key:"loadSample",value:function(){var e=this;this.setState({loading:!0});var t=new(d().Sound)(this.props.source,(function(){t.on("stop",(function(){e.setState({start:!1})})),e.setState({sound:t,start:!1,loading:!1}),e.playSound()}))}},{key:"render",value:function(){var e=this.props,t=e.name,n=e.jingleType,r=e.rarity,a=(0,b.xF)(r);return u.createElement("div",{style:S({},Z)},u.createElement("div",{className:"sample-wrapper"},u.createElement("div",{className:"top",style:{background:a}},this.state.loading&&u.createElement("div",null,u.createElement(h.Z,null)),!this.state.loading&&!this.state.start&&u.createElement("div",{onClick:this.playSound},u.createElement(g.Z,null)),!this.state.loading&&this.state.start&&u.createElement("div",{onClick:this.stopSound},u.createElement(v.Z,null))),u.createElement("div",{className:"bottom"},u.createElement("div",{className:"name-tag"},t),u.createElement("div",{className:"id-tag"},u.createElement("span",null,"#",n," - "),u.createElement("span",{style:{color:a}},0===r&&"Common",1===r&&"Rare",2===r&&"Legendary",3===r&&"Mythical")))))}}]),n}(u.Component);O.propTypes={source:y().string.isRequired,name:y().string.isRequired,rarity:y().number.isRequired,jingleType:y().number.isRequired};const R=(0,f.$j)(null,{playAudio:function(e){return function(t){t({type:k.OA,payload:e})}}})(O)},51530:(e,t,n)=>{n.d(t,{Z:()=>w});var r=n(15671),a=n(43144),o=n(97326),i=n(60136),s=n(82963),l=n(61120),c=n(4942),u=n(67294),p=n(25264),d=n(73727),f=n(89528),m=n(45697),y=n.n(m),g=n(67917),v=n(79484),h=n(31841),k=n(62692),b=n(55425),E=n(80166),S=n(5056),j=n(67661);function Z(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,l.Z)(e);if(t){var a=(0,l.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,s.Z)(this,n)}}var O=function(e){(0,i.Z)(n,e);var t=Z(n);function n(e){var a;return(0,r.Z)(this,n),a=t.call(this,e),(0,c.Z)((0,o.Z)(a),"playSound",(function(){null!==a.state.sound?((0,S.Q)(a.state.sound,a.props.settings),a.setState({start:!0})):a.loadJingle()})),(0,c.Z)((0,o.Z)(a),"stopSound",(function(){a.state.sound&&(a.state.sound.stop(),a.setState({start:!1}))})),(0,c.Z)((0,o.Z)(a),"likeJingle",(function(e,t){a.props.canLike&&("marketplace"===a.props.type&&a.props.likeUnLikeMarketplaceJingle(e,t),"profile"===a.props.type&&a.props.likeUnLikeProfileJingle(e,t))})),a.state={start:!1,loading:!1,sound:null},a.stopSound=a.stopSound.bind((0,o.Z)(a)),a.playSound=a.playSound.bind((0,o.Z)(a)),a.loadJingle=a.loadJingle.bind((0,o.Z)(a)),a}return(0,a.Z)(n,[{key:"componentWillUnmount",value:function(){this.stopSound()}},{key:"loadJingle",value:function(){var e=this,t=this.props.settings.slice(5,11);t=t.map((function(e){return parseInt(e,10)}));var n=this.props.sampleTypes.map((function(t,n){return new Promise((function(r){var a=new f.Sound((0,k.H)(t).source,(function(){r(a)}));a.volume=parseInt(e.props.settings[n],10)/100}))}));this.setState({loading:!0}),Promise.all(n).then((function(n){n.reduce((function(e,n,r){return e.getRawSourceNode().buffer.duration+t[r]>n.getRawSourceNode().buffer.duration+t[r]?e:n})).on("stop",(function(){e.setState({start:!1})}));var r=new f.Group(n);r.on("stop",(function(){e.setState({start:!1})})),e.setState({sound:r,start:!1,loading:!1}),e.playSound()}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.jingleId,r=t.author,a=t.name,o=t.onSale,i=t.price,s=t.likeCount,l=t.liked,c=t.hasMM,p=t.lockedMM,f=t.type,m=t.canLike;return u.createElement("div",{key:n,className:"single-song"},u.createElement("div",{className:"jingle-image-actions"},o&&u.createElement("div",{className:"header-label"},u.createElement("span",null,"On sale for:"),(0,j.$G)(i),"Ξ"),u.createElement("div",{className:"jingle-image-container"},u.createElement(g.Z,{width:200,height:200,id:n})),u.createElement("div",{className:"overlay"},this.state.loading&&u.createElement(v.Z,null),!this.state.start&&!this.state.loading&&u.createElement("span",{onClick:this.playSound},u.createElement("i",{className:"material-icons play"},"play_circle_outline")),this.state.start&&!this.state.loading&&u.createElement("span",{onClick:this.stopSound},u.createElement("i",{className:"material-icons stop"},"cancel")),u.createElement(d.rU,{to:"/jingle/".concat(n)},u.createElement("i",{className:"material-icons open"},"open_in_new")))),u.createElement("div",{className:"jingle-footer"},u.createElement("div",{className:"id-likes-wrapper"},u.createElement("span",null,"#",n),"home"!==f&&u.createElement("span",null,u.createElement("span",{onClick:function(){e.likeJingle(n,!l)}},u.createElement(h.Z,{active:l,size:"30",canLike:c&&!p&&m})),u.createElement("span",null,s))),u.createElement("div",{className:"jingle-footer-author"},r),u.createElement("div",{className:"jingle-footer-name"},a)))}}]),n}(u.Component);O.propTypes={likeUnLikeMarketplaceJingle:y().func.isRequired,likeUnLikeProfileJingle:y().func.isRequired,hasMM:y().bool.isRequired,lockedMM:y().bool.isRequired,canLike:y().bool.isRequired,settings:y().array.isRequired,sampleTypes:y().array.isRequired,type:y().string.isRequired,jingleId:y().number.isRequired,author:y().string.isRequired,name:y().string.isRequired,onSale:y().bool.isRequired,price:y().number.isRequired,likeCount:y().number.isRequired,liked:y().bool.isRequired};var R={likeUnLikeMarketplaceJingle:b.Gh,likeUnLikeProfileJingle:E.gv};const w=(0,p.$j)((function(e){return{volumes:e.compose.volumes,delays:e.compose.delays,hasMM:e.app.hasMM,lockedMM:e.app.lockedMM,canLike:e.app.canLike}}),R)(O)}}]);
//# sourceMappingURL=sourcemaps/733.7706c55ce8833c88d2bf.bundle.js.map