"use strict";(self.webpackChunkcrypto_jingles=self.webpackChunkcrypto_jingles||[]).push([[166],{80166:(e,t,r)=>{r.d(t,{Jh:()=>b,ox:()=>g,r7:()=>w,Oj:()=>O,t7:()=>m,xI:()=>x,Au:()=>j,ct:()=>k,im:()=>S,xF:()=>P,Rk:()=>Z,HG:()=>D,hT:()=>I,DK:()=>E,VG:()=>T,WY:()=>A,PB:()=>F,gv:()=>M});var n=r(4942),a=r(15861),c=r(42982),u=r(87757),o=r.n(u),i=r(9669),p=r.n(i),s=r(78334),f=r(87135),l=r(54733),y=r(6752),d=r(67661);function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=function(){return function(e){e({type:s.pc})}},g=function(e){return function(t){t({type:s._S,payload:e})}},w=function(e){return function(t,r){var n=(0,c.Z)(r().profile.tabs);n[n.findIndex((function(e){return e.active}))].active=!1,n[n.findIndex((function(t){return t.value===e}))].active=!0,t({type:s.BD,payload:n})}},O=function(){return function(){var e=(0,a.Z)(o().mark((function e(t,r){var n,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=r(),a=n.profile.profileAddress===n.app.address,t({type:s.g0,payload:{isOwner:a}});case 3:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()},m=function(e){var t=e.target;return function(e){e({type:s.FJ,payload:t.value})}},x=function(e){return function(t){t({type:s.r$,payload:e})}},j=function(){return function(){var e=(0,a.Z)(o().mark((function e(t,r){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,window.contract.authors(r().profile.profileAddress);case 3:n=(n=e.sent)||r().profile.author,t({type:s.vp,payload:n}),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,r){return e.apply(this,arguments)}}()},k=function(){return function(){var e=(0,a.Z)(o().mark((function e(t,r){var n,a,c,u;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,l.M8)(),e.prev=1,a=r(),c=a.app.address,u=a.profile.authorEdit,t((0,l.h)(n,"Edit author name")),t({type:s.f6}),e.next=9,window.contract.setAuthorName(u,{from:c});case 9:t((0,l.z6)(n)),t({type:s.vp,payload:u}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),t((0,l.z6)(n)),t({type:s.vp,payload:r().profile.author});case 17:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t,r){return e.apply(this,arguments)}}()},S=function(e){var t=e.value;return function(e,r){var n=r().profile,a=(0,c.Z)(n.mySamples),u=h({},n.selectedMySampleSort);if(a){switch(t){case"-rarity":a=a.sort((function(e,t){return t.rarity-e.rarity})),u=s.tx[0];break;case"rarity":a=a.sort((function(e,t){return e.rarity-t.rarity})),u=s.tx[1];break;case"-length":a=a.sort((function(e,t){return t.length-e.length})),u=s.tx[2];break;case"length":a=a.sort((function(e,t){return e.length-t.length})),u=s.tx[3]}e({type:s.Em,payload:{mySamples:a,selectedMySampleSort:u}})}}},P=function(e){switch(e){case 0:return"#005792";case 1:return"#734488";case 2:return"#FFDF00";case 3:return"#99ff00";default:return"#000"}},Z=function(e){return function(){var t=(0,a.Z)(o().mark((function t(r,n){var a;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.c)(e);case 2:a=t.sent,r({type:s.ak,payload:a}),r(S(n().profile.selectedMySampleSort));case 5:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}()},D=function(){return function(){var e=(0,a.Z)(o().mark((function e(t,r){var n,a,c,u,i;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,l.M8)(),e.prev=1,a=r(),c=a.app.address,u=a.profile.numSamplesToBuy,t((0,l.h)(n,"Buy sample")),i={from:c,value:u*y.nb},e.next=9,window.contract.buySamples(parseInt(u,10),c,i);case 9:t((0,l.z6)(n)),t(Z(c)),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),t((0,l.z6)(n));case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t,r){return e.apply(this,arguments)}}()},I=function(e){var t=e.value;return function(){var e=(0,a.Z)(o().mark((function e(r){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t<1||t>15)){e.next=2;break}return e.abrupt("return");case 2:r({type:s.TC,payload:t});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},E=function(){return function(){var e=(0,a.Z)(o().mark((function e(t,r){var n,a,c,u,i,f,l,d,v,b,g,w,O,m,x;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r().profile,a=n.currentJinglesPage,c=n.jingleCategory,u=n.jingleSorting,i=n.profileAddress,f=[],l=c.value,d=u.value,v="".concat(y.T5,"/jingles/").concat(l,"/").concat(i,"/page/").concat(a,"/filter/").concat(d),e.next=7,p()(v);case 7:if(b=e.sent,g=b.data.map((function(e){return e.jingleId})).toString(),w=r().app.address,!(g.length>0)){e.next=17;break}return e.next=13,p()("".concat(y.T5,"/jingles/check-liked/").concat(w,"/").concat(g));case 13:O=e.sent,f=b.data.map((function(e,t){return h(h({},e),{},{liked:O.data[t]})})),e.next=18;break;case 17:f=b.data;case 18:return m="".concat(y.T5,"/jingles/count/owner/").concat(i,"/sale/").concat(("sale"===l).toString()),e.next=21,p()(m);case 21:x=e.sent,t({type:s.Tk,payload:{jingles:f,num:x.data}});case 23:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()},T=function(e){return function(t){t({type:s.j_,payload:e}),t(E())}},A=function(e){return function(t){t({type:s.fs,payload:e}),t(E())}},F=function(e){return function(t){t({type:s.LE,payload:e+1}),t(E())}},M=function(e,t){return function(){var r=(0,a.Z)(o().mark((function r(n,a){var u,i,p,f,l;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return u=a(),i=u.app.address,r.prev=2,r.next=5,(0,d.$M)(e,t,i);case 5:if(p=r.sent){r.next=8;break}return r.abrupt("return");case 8:f=(0,c.Z)(u.profile.myJingles),l=f.findIndex((function(t){return t.jingleId===e})),f[l]=h(h({},f[l]),p),n({type:s.IK,payload:f}),r.next=16;break;case 14:r.prev=14,r.t0=r.catch(2);case 16:case"end":return r.stop()}}),r,null,[[2,14]])})));return function(e,t){return r.apply(this,arguments)}}()}},87135:(e,t,r)=>{r.d(t,{c:()=>l});var n=r(15861),a=r(4942),c=r(87757),u=r.n(c),o=r(62692),i=r(94871);function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f=function(e){for(var t=[],r=0;r<e.length;r+=2){var n=parseInt(e[r].valueOf(),10),a=parseInt(e[r+1].valueOf(),10);t.push(s({id:n,jingleType:a},(0,o.H)(a)))}return t},l=function(){var e=(0,n.Z)(u().mark((function e(t){var r;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.Dc)(500);case 2:return e.next=4,window.samplesContract.getAllSamplesForOwner(t);case 4:return r=e.sent,e.abrupt("return",f(r));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}}]);
//# sourceMappingURL=sourcemaps/166.ed250dc6d0fff80a4e45.bundle.js.map