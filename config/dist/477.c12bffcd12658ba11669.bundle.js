(self.webpackChunkcrypto_jingles=self.webpackChunkcrypto_jingles||[]).push([[477],{93506:(A,t,r)=>{var a=r(48177);A.exports=function(A,t,r,e){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";function s(A){for(var r,a,e=A.length,n=A.slice();e;)r=Math.floor(t(1)*e--),a=n[e],n[e]=n[r],n[r]=a;return n}function i(){return s(a[Math.floor(t()*a.length)])}return{random:r,seedName:A,pointilism:t(0,.1),noiseScalar:[t(1e-6,1e-6),t(2e-4,.004)],globalAlpha:.5,startArea:t(0,1.5),maxRadius:t(5,100),lineStyle:t(1)>.5?"round":"square",interval:t(.001,.01),count:300,steps:300,endlessBrowser:!1,debugLuma:!1,backgroundScale:1,backgorundFille:"black",backgroundSrc:e,pixelRatio:1,width:250,height:250,palette:i(),asVideoFrames:!1,filename:"render",outputDir:n}}},74401:(A,t,r)=>{var a=r(42664),e=r(74450),n=r(5627),s=r(32644),i=r(35311),C=r(2514),o=r(18994);A.exports=function(A){var t=(A=A||{}).random||Math.random,r=C(t),B=new i(t),F=A.context,E="number"==typeof A.pixelRatio?A.pixelRatio:1,c=F.canvas,l=c.width,D=c.height,p=A.count||0,m=A.palette||["#fff","#000"],f=A.backgroundImage,g="number"==typeof A.maxRadius?A.maxRadius:10,v="number"==typeof A.startArea?A.startArea:.5,h=e(1e-6,.5,A.pointilism),u=A.noiseScalar||[1e-5,1e-4],d="number"==typeof A.globalAlpha?A.globalAlpha:1,y=o(F,f,{scale:A.backgroundScale,fillStyle:A.backgroundFill}),x=y.data,w=0,G=a(p).map((function(){return k()}));return{clear:function(){F.fillStyle=m[0],F.fillRect(0,0,c.width,c.height)},step:function(t){w+=t,G.forEach((function(r,a){var i=r.position[0],C=r.position[1],o=n(Math.round(i),0,c.width-1),E=n(Math.round(C),0,c.height-1),l=o+E*c.width,D=x[4*l]/255,p=e(u[0],u[1],D),m=B.noise3D(o*p,E*p,r.duration+w)*Math.PI*2,f=r.speed+e(0,2,1-D);s.add(r.velocity,r.velocity,[Math.cos(m),Math.sin(m)]),s.normalize(r.velocity,r.velocity);var g=s.scale([],r.velocity,f);s.add(r.position,r.position,g);var v=h,y=r.radius*B.noise3D(i*v,C*v,r.duration+w);y*=e(.01,1,D),F.beginPath(),F.lineTo(i,C),F.lineTo(r.position[0],r.position[1]),F.lineWidth=y*(r.time/r.duration),F.lineCap=A.lineStyle||"square",F.lineJoin=A.lineStyle||"square",F.strokeStyle=r.color,F.globalAlpha=d,F.stroke(),r.time+=t,r.time>r.duration&&k(r)}))},debugLuma:function(){F.putImageData(y,0,0)}};function k(A){A=A||{};var a=Math.min(l,D)/2;return A.position=function(A,r){r=r||1;var a=2*t()*Math.PI;return A[0]=Math.cos(a)*r,A[1]=Math.sin(a)*r,A}([],r(0,a*v)),A.position[0]+=l/2,A.position[1]+=D/2,A.radius=r(.01,g),A.duration=r(1,500),A.time=r(0,A.duration),A.velocity=[r(-1,1),r(-1,1)],A.speed=r(.5,2)*E,A.color=m[Math.floor(r(m.length))],A}}},85845:A=>{A.exports=function(A,t,r,a){a="number"==typeof a?a:1,r=void 0===r?A.canvas:r;var e,n,s=t.width/t.height,i=r.width,C=r.height;s>i/C?e=(n=C)*s:n=(e=i)/s;var o=(i-(e*=a))/2,B=(C-(n*=a))/2;A.drawImage(t,o,B,e,n)}},18994:(A,t,r)=>{var a=r(30618),e=r(26413),n=r(85845);A.exports=function(A,t,r){var s=A.canvas,i="number"==typeof r.scale?r.scale:1,C=Array.isArray(r.threshold)?r.threshold:null;A.fillStyle=r.fillStyle||"black",A.fillRect(0,0,s.width,s.height),n(A,t,s,i);for(var o=A.getImageData(0,0,s.width,s.height),B=o.data,F=0;F<s.width*s.height;F+=1){var E=B[4*F+0],c=B[4*F+1],l=B[4*F+2],D=e(E,c,l);C&&(D=Math.floor(255*a(C[0],C[1],D/255))),B[4*F+0]=D,B[4*F+1]=D,B[4*F+2]=D}return o}},2514:A=>{A.exports=function(A){return function(t,r){return void 0===t&&(t=1),void 0===r&&(r=t,t=0),A()*(r-t)+t}}},31841:(A,t,r)=>{"use strict";r.d(t,{Z:()=>h});var a=r(67294),e=r(45697),n=r.n(e),s=r(93379),i=r.n(s),C=r(7795),o=r.n(C),B=r(90569),F=r.n(B),E=r(3565),c=r.n(E),l=r(19216),D=r.n(l),p=r(44589),m=r.n(p),f=r(77887),g={};g.styleTagTransform=m(),g.setAttributes=c(),g.insert=F().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=D();i()(f.Z,g);f.Z&&f.Z.locals&&f.Z.locals;var v=function(A){var t=A.active,r=A.size,e=A.canLike;return a.createElement("svg",{id:"heart-svg",width:"".concat(r,"px"),className:"".concat(t&&"active","\n    ").concat(!e&&"no-like"),viewBox:"467 392 58 57",xmlns:"http://www.w3.org/2000/svg"},a.createElement("g",{id:"Group",fill:"none",fillRule:"evenodd",transform:"translate(467 392)"},a.createElement("path",{d:"M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z",id:"heart",fill:"#AAB8C2"}),a.createElement("circle",{id:"main-circ",fill:"#E2264D",opacity:"0",cx:"29.5",cy:"29.5",r:"1.5"}),a.createElement("g",{id:"grp7",opacity:"0",transform:"translate(7 6)"},a.createElement("circle",{id:"oval1",fill:"#9CD8C3",cx:"2",cy:"6",r:"2"}),a.createElement("circle",{id:"oval2",fill:"#8CE8C3",cx:"5",cy:"2",r:"2"})),a.createElement("g",{id:"grp6",opacity:"0",transform:"translate(0 28)"},a.createElement("circle",{id:"oval1",fill:"#CC8EF5",cx:"2",cy:"7",r:"2"}),a.createElement("circle",{id:"oval2",fill:"#91D2FA",cx:"3",cy:"2",r:"2"})),a.createElement("g",{id:"grp3",opacity:"0",transform:"translate(52 28)"},a.createElement("circle",{id:"oval2",fill:"#9CD8C3",cx:"2",cy:"7",r:"2"}),a.createElement("circle",{id:"oval1",fill:"#8CE8C3",cx:"4",cy:"2",r:"2"})),a.createElement("g",{id:"grp2",opacity:"0",transform:"translate(44 6)",fill:"#CC8EF5"},a.createElement("circle",{id:"oval2",transform:"matrix(-1 0 0 1 10 0)",cx:"5",cy:"6",r:"2"}),a.createElement("circle",{id:"oval1",transform:"matrix(-1 0 0 1 4 0)",cx:"2",cy:"2",r:"2"})),a.createElement("g",{id:"grp5",opacity:"0",transform:"translate(14 50)",fill:"#91D2FA"},a.createElement("circle",{id:"oval1",transform:"matrix(-1 0 0 1 12 0)",cx:"6",cy:"5",r:"2"}),a.createElement("circle",{id:"oval2",transform:"matrix(-1 0 0 1 4 0)",cx:"2",cy:"2",r:"2"})),a.createElement("g",{id:"grp4",opacity:"0",transform:"translate(35 50)",fill:"#F48EA7"},a.createElement("circle",{id:"oval1",transform:"matrix(-1 0 0 1 12 0)",cx:"6",cy:"5",r:"2"}),a.createElement("circle",{id:"oval2",transform:"matrix(-1 0 0 1 4 0)",cx:"2",cy:"2",r:"2"})),a.createElement("g",{id:"grp1",opacity:"0",transform:"translate(24)",fill:"#9FC7FA"},a.createElement("circle",{id:"oval1",cx:"2.5",cy:"3",r:"2"}),a.createElement("circle",{id:"oval2",cx:"7.5",cy:"2",r:"2"}))))};v.propTypes={active:n().bool.isRequired,size:n().string.isRequired,canLike:n().bool.isRequired};const h=v},67917:(A,t,r)=>{"use strict";r.d(t,{Z:()=>eA});var a=r(4942),e=r(15671),n=r(43144),s=r(97326),i=r(60136),C=r(82963),o=r(61120),B=r(67294),F=r(79683),E=r.n(F),c=r(45697),l=r.n(c),D=r(57905),p=r.n(D),m=r(2514),f=r.n(m),g=r(93506),v=r.n(g);const h=r.p+"assets/images/architecture.jpg",u=r.p+"assets/images/church2.jpg",d=r.p+"assets/images/city2.jpg",y=r.p+"assets/images/city5.jpg",x=r.p+"assets/images/eye.jpg",w=r.p+"assets/images/fractal1.jpg",G=r.p+"assets/images/fractal2.jpg",k=r.p+"assets/images/geo1.jpg",b=r.p+"assets/images/geo3.jpg",S=r.p+"assets/images/geo4.jpg",j=r.p+"assets/images/geo5.jpg",I=r.p+"assets/images/map7.jpg",O=r.p+"assets/images/nature1.jpg",R=r.p+"assets/images/pat1.jpg",Z=r.p+"assets/images/scifi.jpg",M=r.p+"assets/images/sym3.jpg",Y=r.p+"assets/images/sym6.jpg";var H=r(74401),P=r.n(H),K=r(93379),q=r.n(K),z=r(7795),T=r.n(z),L=r(90569),W=r.n(L),J=r(3565),N=r.n(J),U=r(19216),V=r.n(U),_=r(44589),X=r.n(_),Q=r(757),$={};$.styleTagTransform=X(),$.setAttributes=N(),$.insert=W().bind(null,"head"),$.domAPI=T(),$.insertStyleElement=V();q()(Q.Z,$);Q.Z&&Q.Z.locals&&Q.Z.locals;function AA(A,t){var r=Object.keys(A);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(A);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(A,t).enumerable}))),r.push.apply(r,a)}return r}function tA(A){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?AA(Object(r),!0).forEach((function(t){(0,a.Z)(A,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(r)):AA(Object(r)).forEach((function(t){Object.defineProperty(A,t,Object.getOwnPropertyDescriptor(r,t))}))}return A}function rA(A){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var r,a=(0,o.Z)(A);if(t){var e=(0,o.Z)(this).constructor;r=Reflect.construct(a,arguments,e)}else r=a.apply(this,arguments);return(0,C.Z)(this,r)}}var aA=function(A){(0,i.Z)(r,A);var t=rA(r);function r(A){var a;return(0,e.Z)(this,r),(a=t.call(this,A)).reload=a.reload.bind((0,s.Z)(a)),a}return(0,n.Z)(r,[{key:"componentDidMount",value:function(){var A,t,r,a,e,n;this.reload((A=this.props.id,t=parseInt(A,10),r=p()(t),a=f()(r),n=(e=[h,u,d,y,x,w,G,k,b,S,j,I,O,R,Z,M,Y])[Math.floor(a(e.length))],v()(t,a,r,n)))}},{key:"reload",value:function(A){var t=this.canvas,r=new window.Image,a=t.getContext("2d"),e=E()();e.removeAllListeners("tick"),e.stop();var n=tA(tA({},A),{},{backgroundImage:r,context:a,width:this.props.width,height:this.props.height}),s="number"==typeof n.pixelRatio?n.pixelRatio:1;t.width=n.width*s,t.height=n.height*s,this.canvasWrapper.style.background=n.palette[0],r.onload=function(){var A=P()(n);A.clear();var t=0;e.on("tick",(function(){A.step(n.interval),t+=1,!n.endlessBrowser&&t>n.steps&&e.stop()})),e.start()},r.src=A.backgroundSrc}},{key:"render",value:function(){var A=this;return B.createElement("div",{className:"jingle-image-wrapper",ref:function(t){A.canvasWrapper=t}},B.createElement("canvas",{ref:function(t){A.canvas=t}}))}}]),r}(B.Component);aA.propTypes={id:l().number.isRequired,width:l().number.isRequired,height:l().number.isRequired};const eA=aA},77887:(A,t,r)=>{"use strict";r.d(t,{Z:()=>i});var a=r(94015),e=r.n(a),n=r(23645),s=r.n(n)()(e());s.push([A.id,"#heart-svg:not(.no-like):hover #heart{fill:#E2264D}#heart-svg.no-like{pointer-events:none;cursor:auto}#heart-svg #heart{transform-origin:center;-webkit-animation:animateHeartOut .3s linear forwards;animation:animateHeartOut .3s linear forwards;transition:0.2s ease-in}#heart-svg #main-circ{transform-origin:29.5px 29.5px}#heart-svg.active #heart{transform:scale(0.2);fill:#E2264D;-webkit-animation:animateHeart .3s linear forwards .25s;animation:animateHeart .3s linear forwards .25s}#heart-svg.active #main-circ{transition:all 2s;-webkit-animation:animateCircle .3s linear forwards;animation:animateCircle .3s linear forwards;opacity:1}#heart-svg.active #grp1 #oval1{transform:scale(0) translate(0, -30px);transform-origin:0 0 0;transition:.5s transform .3s}#heart-svg.active #grp1 #oval2{transform:scale(0) translate(10px, -50px);transform-origin:0 0 0;transition:1.5s transform .3s}#heart-svg.active #grp2 #oval1{transform:scale(0) translate(30px, -15px);transform-origin:0 0 0;transition:.5s transform .3s}#heart-svg.active #grp2 #oval2{transform:scale(0) translate(60px, -15px);transform-origin:0 0 0;transition:1.5s transform .3s}#heart-svg.active #grp3 #oval1{transform:scale(0) translate(30px, 0px);transform-origin:0 0 0;transition:.5s transform .3s}#heart-svg.active #grp3 #oval2{transform:scale(0) translate(60px, 10px);transform-origin:0 0 0;transition:1.5s transform .3s}#heart-svg.active #grp4 #oval1{transform:scale(0) translate(30px, 15px);transform-origin:0 0 0;transition:.5s transform .3s}#heart-svg.active #grp4 #oval2{transform:scale(0) translate(40px, 50px);transform-origin:0 0 0;transition:1.5s transform .3s}#heart-svg.active #grp5 #oval1{transform:scale(0) translate(-10px, 20px);transform-origin:0 0 0;transition:.5s transform .3s}#heart-svg.active #grp5 #oval2{transform:scale(0) translate(-60px, 30px);transform-origin:0 0 0;transition:1.5s transform .3s}#heart-svg.active #grp6 #oval1{transform:scale(0) translate(-30px, 0px);transform-origin:0 0 0;transition:.5s transform .3s}#heart-svg.active #grp6 #oval2{transform:scale(0) translate(-60px, -5px);transform-origin:0 0 0;transition:1.5s transform .3s}#heart-svg.active #grp7 #oval1{transform:scale(0) translate(-30px, -15px);transform-origin:0 0 0;transition:.5s transform .3s}#heart-svg.active #grp7 #oval2{transform:scale(0) translate(-55px, -30px);transform-origin:0 0 0;transition:1.5s transform .3s}#heart-svg.active #grp1{opacity:1;transition:.1s all .3s}#heart-svg.active #grp2{opacity:1;transition:.1s opacity .3s}#heart-svg.active #grp3{opacity:1;transition:.1s opacity .3s}#heart-svg.active #grp4{opacity:1;transition:.1s opacity .3s}#heart-svg.active #grp5{opacity:1;transition:.1s opacity .3s}#heart-svg.active #grp6{opacity:1;transition:.1s opacity .3s}#heart-svg.active #grp7{opacity:1;transition:.1s opacity .3s}@-webkit-keyframes animateCircle{40%{transform:scale(10);opacity:1;fill:#DD4688}55%{transform:scale(11);opacity:1;fill:#D46ABF}65%{transform:scale(12);opacity:1;fill:#CC8EF5}75%{transform:scale(13);opacity:1;fill:transparent;stroke:#CC8EF5;stroke-width:.5}85%{transform:scale(17);opacity:1;fill:transparent;stroke:#CC8EF5;stroke-width:.2}95%{transform:scale(18);opacity:1;fill:transparent;stroke:#CC8EF5;stroke-width:.1}100%{transform:scale(19);opacity:1;fill:transparent;stroke:#CC8EF5;stroke-width:0}}@keyframes animateCircle{40%{transform:scale(10);opacity:1;fill:#DD4688}55%{transform:scale(11);opacity:1;fill:#D46ABF}65%{transform:scale(12);opacity:1;fill:#CC8EF5}75%{transform:scale(13);opacity:1;fill:transparent;stroke:#CC8EF5;stroke-width:.5}85%{transform:scale(17);opacity:1;fill:transparent;stroke:#CC8EF5;stroke-width:.2}95%{transform:scale(18);opacity:1;fill:transparent;stroke:#CC8EF5;stroke-width:.1}100%{transform:scale(19);opacity:1;fill:transparent;stroke:#CC8EF5;stroke-width:0}}@-webkit-keyframes animateHeart{0%{transform:scale(0.2)}40%{transform:scale(1.2)}100%{transform:scale(1)}}@keyframes animateHeart{0%{transform:scale(0.2)}40%{transform:scale(1.2)}100%{transform:scale(1)}}@-webkit-keyframes animateHeartOut{0%{transform:scale(1.4)}100%{transform:scale(1)}}@keyframes animateHeartOut{0%{transform:scale(1.4)}100%{transform:scale(1)}}\n","",{version:3,sources:["webpack://./src/components/Decorative/Heart.scss"],names:[],mappings:"AAAA,sCACI,YAAa,CAChB,mBAGC,mBAAoB,CACpB,WAAY,CACb,kBAEiB,uBAAuB,CAAE,qDAA6C,CAA7C,6CAA6C,CAAE,uBAAwB,CAAG,sBAC/F,8BAA8B,CAAG,yBAE9B,oBAAmB,CAAE,YAAY,CAAE,uDAAU,CAAV,+CAA+C,CAAG,6BACjF,iBAAiB,CAAE,mDAA2C,CAA3C,2CAA2C,CAAE,SAAS,CAAG,+BAEvE,sCAAsC,CAAG,sBAAsB,CAAG,4BAA4B,CAAG,+BACjG,yCAAyC,CAAG,sBAAsB,CAAG,6BAA6B,CAAG,+BAErG,yCAAyC,CAAG,sBAAsB,CAAG,4BAA4B,CAAG,+BACpG,yCAAyC,CAAG,sBAAsB,CAAG,6BAA6B,CAAG,+BAErG,uCAAuC,CAAG,sBAAsB,CAAG,4BAA4B,CAAG,+BAClG,wCAAwC,CAAG,sBAAsB,CAAG,6BAA6B,CAAG,+BAEpG,wCAAwC,CAAG,sBAAsB,CAAG,4BAA4B,CAAG,+BACnG,wCAAwC,CAAG,sBAAsB,CAAG,6BAA6B,CAAG,+BAEpG,yCAAyC,CAAG,sBAAsB,CAAG,4BAA4B,CAAG,+BACpG,yCAAyC,CAAG,sBAAsB,CAAG,6BAA6B,CAAG,+BAErG,wCAAwC,CAAG,sBAAsB,CAAG,4BAA4B,CAAG,+BACnG,yCAAyC,CAAG,sBAAsB,CAAG,6BAA6B,CAAG,+BAErG,0CAA0C,CAAG,sBAAsB,CAAG,4BAA4B,CAAG,+BACrG,0CAA0C,CAAG,sBAAsB,CAAG,6BAA6B,CAAG,wBAE9G,SAAS,CAAE,sBAAsB,CAAI,wBACvC,SAAS,CAAE,0BAA0B,CAAG,wBACxC,SAAS,CAAE,0BAA0B,CAAG,wBACxC,SAAS,CAAE,0BAA0B,CAAG,wBACxC,SAAS,CAAE,0BAA0B,CAAG,wBACxC,SAAS,CAAE,0BAA0B,CAAG,wBACxC,SAAS,CAAE,0BAA0B,CAAG,iCAG5D,IAAI,mBAAmB,CAAE,SAAS,CAAE,YAAY,CAChD,IAAI,mBAAmB,CAAE,SAAS,CAAE,YAAY,CAChD,IAAI,mBAAmB,CAAE,SAAS,CAAE,YAAY,CAChD,IAAI,mBAAmB,CAAE,SAAS,CAAE,gBAAgB,CAAE,cAAc,CAAE,eAAe,CACrF,IAAI,mBAAmB,CAAE,SAAS,CAAE,gBAAgB,CAAE,cAAc,CAAE,eAAe,CACrF,IAAI,mBAAmB,CAAE,SAAS,CAAE,gBAAgB,CAAE,cAAc,CAAE,eAAe,CACrF,KAAK,mBAAmB,CAAE,SAAS,CAAE,gBAAgB,CAAE,cAAc,CAAE,cAAc,CAAA,CATzB,yBAG5D,IAAI,mBAAmB,CAAE,SAAS,CAAE,YAAY,CAChD,IAAI,mBAAmB,CAAE,SAAS,CAAE,YAAY,CAChD,IAAI,mBAAmB,CAAE,SAAS,CAAE,YAAY,CAChD,IAAI,mBAAmB,CAAE,SAAS,CAAE,gBAAgB,CAAE,cAAc,CAAE,eAAe,CACrF,IAAI,mBAAmB,CAAE,SAAS,CAAE,gBAAgB,CAAE,cAAc,CAAE,eAAe,CACrF,IAAI,mBAAmB,CAAE,SAAS,CAAE,gBAAgB,CAAE,cAAc,CAAE,eAAe,CACrF,KAAK,mBAAmB,CAAE,SAAS,CAAE,gBAAgB,CAAE,cAAc,CAAE,cAAc,CAAA,CAGzF,gCACI,GAAG,oBAAmB,CACtB,IAAI,oBAAoB,CACxB,KAAK,kBAAkB,CAAA,CAH3B,wBACI,GAAG,oBAAmB,CACtB,IAAI,oBAAoB,CACxB,KAAK,kBAAkB,CAAA,CAG3B,mCACI,GAAG,oBAAoB,CACvB,KAAK,kBAAkB,CAAA,CAF3B,2BACI,GAAG,oBAAoB,CACvB,KAAK,kBAAkB,CAAA",sourcesContent:["#heart-svg:not(.no-like):hover #heart {\n    fill: #E2264D;\n}\n\n#heart-svg.no-like {\n  pointer-events: none;\n  cursor: auto;\n}\n\n#heart-svg #heart{transform-origin:center; animation:animateHeartOut .3s linear forwards; transition: 0.2s ease-in;}\n#heart-svg #main-circ{transform-origin:29.5px 29.5px;}\n\n#heart-svg.active #heart{transform:scale(.2); fill:#E2264D; animation:animateHeart .3s linear forwards .25s;}\n#heart-svg.active #main-circ{transition:all 2s; animation:animateCircle .3s linear forwards; opacity:1;}\n\n#heart-svg.active #grp1 #oval1 {  transform:scale(0) translate(0, -30px);  transform-origin:0 0 0;  transition:.5s transform .3s;}\n#heart-svg.active #grp1 #oval2 {  transform:scale(0) translate(10px, -50px);  transform-origin:0 0 0;  transition:1.5s transform .3s;}\n\n#heart-svg.active #grp2 #oval1 {  transform:scale(0) translate(30px, -15px);  transform-origin:0 0 0;  transition:.5s transform .3s;}\n#heart-svg.active #grp2 #oval2 {  transform:scale(0) translate(60px, -15px);  transform-origin:0 0 0;  transition:1.5s transform .3s;}\n\n#heart-svg.active #grp3 #oval1 {  transform:scale(0) translate(30px, 0px);  transform-origin:0 0 0;  transition:.5s transform .3s;}\n#heart-svg.active #grp3 #oval2 {  transform:scale(0) translate(60px, 10px);  transform-origin:0 0 0;  transition:1.5s transform .3s;}\n\n#heart-svg.active #grp4 #oval1 {  transform:scale(0) translate(30px, 15px);  transform-origin:0 0 0;  transition:.5s transform .3s;}\n#heart-svg.active #grp4 #oval2 {  transform:scale(0) translate(40px, 50px);  transform-origin:0 0 0;  transition:1.5s transform .3s;}\n\n#heart-svg.active #grp5 #oval1 {  transform:scale(0) translate(-10px, 20px);  transform-origin:0 0 0;  transition:.5s transform .3s;}\n#heart-svg.active #grp5 #oval2 {  transform:scale(0) translate(-60px, 30px);  transform-origin:0 0 0;  transition:1.5s transform .3s;}\n\n#heart-svg.active #grp6 #oval1 {  transform:scale(0) translate(-30px, 0px);  transform-origin:0 0 0;  transition:.5s transform .3s;}\n#heart-svg.active #grp6 #oval2 {  transform:scale(0) translate(-60px, -5px);  transform-origin:0 0 0;  transition:1.5s transform .3s;}\n\n#heart-svg.active #grp7 #oval1 {  transform:scale(0) translate(-30px, -15px);  transform-origin:0 0 0;  transition:.5s transform .3s;}\n#heart-svg.active #grp7 #oval2 {  transform:scale(0) translate(-55px, -30px);  transform-origin:0 0 0;  transition:1.5s transform .3s;}\n\n#heart-svg.active #grp1{  opacity:1; transition:.1s all .3s; }\n#heart-svg.active #grp2{opacity:1; transition:.1s opacity .3s;}\n#heart-svg.active #grp3{opacity:1; transition:.1s opacity .3s;}\n#heart-svg.active #grp4{opacity:1; transition:.1s opacity .3s;}\n#heart-svg.active #grp5{opacity:1; transition:.1s opacity .3s;}\n#heart-svg.active #grp6{opacity:1; transition:.1s opacity .3s;}\n#heart-svg.active #grp7{opacity:1; transition:.1s opacity .3s;}\n\n@keyframes animateCircle{\n    40%{transform:scale(10); opacity:1; fill:#DD4688;}\n    55%{transform:scale(11); opacity:1; fill:#D46ABF;}\n    65%{transform:scale(12); opacity:1; fill:#CC8EF5;}\n    75%{transform:scale(13); opacity:1; fill:transparent; stroke:#CC8EF5; stroke-width:.5;}\n    85%{transform:scale(17); opacity:1; fill:transparent; stroke:#CC8EF5; stroke-width:.2;}\n    95%{transform:scale(18); opacity:1; fill:transparent; stroke:#CC8EF5; stroke-width:.1;}\n    100%{transform:scale(19); opacity:1; fill:transparent; stroke:#CC8EF5; stroke-width:0;}\n}\n\n@keyframes animateHeart{\n    0%{transform:scale(.2);}\n    40%{transform:scale(1.2);}\n    100%{transform:scale(1);}\n}\n\n@keyframes animateHeartOut{\n    0%{transform:scale(1.4);}\n    100%{transform:scale(1);}\n}\n"],sourceRoot:""}]);const i=s},757:(A,t,r)=>{"use strict";r.d(t,{Z:()=>i});var a=r(94015),e=r.n(a),n=r(23645),s=r.n(n)()(e());s.push([A.id,".jingle-image-actions canvas{box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.jingle-image-actions:hover canvas{box-shadow:0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)}.jingle-footer{margin-top:10px}.jingle-footer-name,.jingle-footer-author{width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.jingle-footer .id-likes-wrapper,.jingle-footer .id-likes-wrapper span{display:flex;align-items:center;justify-content:center}.jingle-footer .id-likes-wrapper{justify-content:space-between}\n","",{version:3,sources:["webpack://./src/components/JingleImage/JingleImage.scss"],names:[],mappings:"AAAA,6BACI,gEAAkE,CAClE,oDAA+C,CAClD,mCAGG,oEAAsE,CACzE,eAGG,eAAgB,CACnB,0CAGG,UAAW,CACX,sBAAuB,CACvB,kBAAmB,CACnB,eAAgB,CACnB,uEAGG,YAAa,CACb,kBAAmB,CACnB,sBAAuB,CAC1B,iCAGG,6BAA8B",sourcesContent:[".jingle-image-actions canvas {\n    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n    transition: all 0.3s cubic-bezier(.25,.8,.25,1);\n}\n\n.jingle-image-actions:hover canvas {\n    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n}\n\n.jingle-footer {\n    margin-top: 10px;\n}\n\n.jingle-footer-name, .jingle-footer-author {\n    width: 100%;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n}\n\n.jingle-footer .id-likes-wrapper, .jingle-footer .id-likes-wrapper span {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.jingle-footer .id-likes-wrapper {\n    justify-content: space-between;\n}"],sourceRoot:""}]);const i=s},48177:A=>{"use strict";A.exports=JSON.parse('[["#69D2E7","#A7DBD8","#E0E4CC","#F38630","#FA6900"],["#FE4365","#FC9D9A","#F9CDAD","#C8C8A9","#83AF9B"],["#ECD078","#D95B43","#C02942","#542437","#53777A"],["#556270","#4ECDC4","#C7F464","#FF6B6B","#C44D58"],["#774F38","#E08E79","#F1D4AF","#ECE5CE","#C5E0DC"],["#E8DDCB","#CDB380","#036564","#033649","#031634"],["#490A3D","#BD1550","#E97F02","#F8CA00","#8A9B0F"],["#594F4F","#547980","#45ADA8","#9DE0AD","#E5FCC2"],["#00A0B0","#6A4A3C","#CC333F","#EB6841","#EDC951"],["#E94E77","#D68189","#C6A49A","#C6E5D9","#F4EAD5"],["#D9CEB2","#948C75","#D5DED9","#7A6A53","#99B2B7"],["#FFFFFF","#CBE86B","#F2E9E1","#1C140D","#CBE86B"],["#EFFFCD","#DCE9BE","#555152","#2E2633","#99173C"],["#3FB8AF","#7FC7AF","#DAD8A7","#FF9E9D","#FF3D7F"],["#343838","#005F6B","#008C9E","#00B4CC","#00DFFC"],["#413E4A","#73626E","#B38184","#F0B49E","#F7E4BE"],["#99B898","#FECEA8","#FF847C","#E84A5F","#2A363B"],["#FF4E50","#FC913A","#F9D423","#EDE574","#E1F5C4"],["#554236","#F77825","#D3CE3D","#F1EFA5","#60B99A"],["#351330","#424254","#64908A","#E8CAA4","#CC2A41"],["#00A8C6","#40C0CB","#F9F2E7","#AEE239","#8FBE00"],["#FF4242","#F4FAD2","#D4EE5E","#E1EDB9","#F0F2EB"],["#655643","#80BCA3","#F6F7BD","#E6AC27","#BF4D28"],["#8C2318","#5E8C6A","#88A65E","#BFB35A","#F2C45A"],["#FAD089","#FF9C5B","#F5634A","#ED303C","#3B8183"],["#BCBDAC","#CFBE27","#F27435","#F02475","#3B2D38"],["#D1E751","#FFFFFF","#000000","#4DBCE9","#26ADE4"],["#FF9900","#424242","#E9E9E9","#BCBCBC","#3299BB"],["#5D4157","#838689","#A8CABA","#CAD7B2","#EBE3AA"],["#5E412F","#FCEBB6","#78C0A8","#F07818","#F0A830"],["#EEE6AB","#C5BC8E","#696758","#45484B","#36393B"],["#1B676B","#519548","#88C425","#BEF202","#EAFDE6"],["#F8B195","#F67280","#C06C84","#6C5B7B","#355C7D"],["#452632","#91204D","#E4844A","#E8BF56","#E2F7CE"],["#F04155","#FF823A","#F2F26F","#FFF7BD","#95CFB7"],["#F0D8A8","#3D1C00","#86B8B1","#F2D694","#FA2A00"],["#2A044A","#0B2E59","#0D6759","#7AB317","#A0C55F"],["#67917A","#170409","#B8AF03","#CCBF82","#E33258"],["#B9D7D9","#668284","#2A2829","#493736","#7B3B3B"],["#BBBB88","#CCC68D","#EEDD99","#EEC290","#EEAA88"],["#A3A948","#EDB92E","#F85931","#CE1836","#009989"],["#E8D5B7","#0E2430","#FC3A51","#F5B349","#E8D5B9"],["#B3CC57","#ECF081","#FFBE40","#EF746F","#AB3E5B"],["#AB526B","#BCA297","#C5CEAE","#F0E2A4","#F4EBC3"],["#607848","#789048","#C0D860","#F0F0D8","#604848"],["#515151","#FFFFFF","#00B4FF","#EEEEEE"],["#3E4147","#FFFEDF","#DFBA69","#5A2E2E","#2A2C31"],["#300030","#480048","#601848","#C04848","#F07241"],["#1C2130","#028F76","#B3E099","#FFEAAD","#D14334"],["#A8E6CE","#DCEDC2","#FFD3B5","#FFAAA6","#FF8C94"],["#EDEBE6","#D6E1C7","#94C7B6","#403B33","#D3643B"],["#FDF1CC","#C6D6B8","#987F69","#E3AD40","#FCD036"],["#AAB3AB","#C4CBB7","#EBEFC9","#EEE0B7","#E8CAAF"],["#CC0C39","#E6781E","#C8CF02","#F8FCC1","#1693A7"],["#3A111C","#574951","#83988E","#BCDEA5","#E6F9BC"],["#FC354C","#29221F","#13747D","#0ABFBC","#FCF7C5"],["#B9D3B0","#81BDA4","#B28774","#F88F79","#F6AA93"],["#5E3929","#CD8C52","#B7D1A3","#DEE8BE","#FCF7D3"],["#230F2B","#F21D41","#EBEBBC","#BCE3C5","#82B3AE"],["#5C323E","#A82743","#E15E32","#C0D23E","#E5F04C"],["#4E395D","#827085","#8EBE94","#CCFC8E","#DC5B3E"],["#DAD6CA","#1BB0CE","#4F8699","#6A5E72","#563444"],["#C2412D","#D1AA34","#A7A844","#A46583","#5A1E4A"],["#D1313D","#E5625C","#F9BF76","#8EB2C5","#615375"],["#9D7E79","#CCAC95","#9A947C","#748B83","#5B756C"],["#1C0113","#6B0103","#A30006","#C21A01","#F03C02"],["#8DCCAD","#988864","#FEA6A2","#F9D6AC","#FFE9AF"],["#CFFFDD","#B4DEC1","#5C5863","#A85163","#FF1F4C"],["#75616B","#BFCFF7","#DCE4F7","#F8F3BF","#D34017"],["#382F32","#FFEAF2","#FCD9E5","#FBC5D8","#F1396D"],["#B6D8C0","#C8D9BF","#DADABD","#ECDBBC","#FEDCBA"],["#E3DFBA","#C8D6BF","#93CCC6","#6CBDB5","#1A1F1E"],["#A7C5BD","#E5DDCB","#EB7B59","#CF4647","#524656"],["#9DC9AC","#FFFEC7","#F56218","#FF9D2E","#919167"],["#413D3D","#040004","#C8FF00","#FA023C","#4B000F"],["#EDF6EE","#D1C089","#B3204D","#412E28","#151101"],["#A8A7A7","#CC527A","#E8175D","#474747","#363636"],["#7E5686","#A5AAD9","#E8F9A2","#F8A13F","#BA3C3D"],["#FFEDBF","#F7803C","#F54828","#2E0D23","#F8E4C1"],["#C1B398","#605951","#FBEEC2","#61A6AB","#ACCEC0"],["#5E9FA3","#DCD1B4","#FAB87F","#F87E7B","#B05574"],["#951F2B","#F5F4D7","#E0DFB1","#A5A36C","#535233"],["#FFFBB7","#A6F6AF","#66B6AB","#5B7C8D","#4F2958"],["#000000","#9F111B","#B11623","#292C37","#CCCCCC"],["#9CDDC8","#BFD8AD","#DDD9AB","#F7AF63","#633D2E"],["#EFF3CD","#B2D5BA","#61ADA0","#248F8D","#605063"],["#84B295","#ECCF8D","#BB8138","#AC2005","#2C1507"],["#FCFEF5","#E9FFE1","#CDCFB7","#D6E6C3","#FAFBE3"],["#0CA5B0","#4E3F30","#FEFEEB","#F8F4E4","#A5B3AA"],["#4D3B3B","#DE6262","#FFB88C","#FFD0B3","#F5E0D3"],["#B5AC01","#ECBA09","#E86E1C","#D41E45","#1B1521"],["#379F7A","#78AE62","#BBB749","#E0FBAC","#1F1C0D"],["#FFE181","#EEE9E5","#FAD3B2","#FFBA7F","#FF9C97"],["#4E4D4A","#353432","#94BA65","#2790B0","#2B4E72"],["#A70267","#F10C49","#FB6B41","#F6D86B","#339194"],["#30261C","#403831","#36544F","#1F5F61","#0B8185"],["#2D2D29","#215A6D","#3CA2A2","#92C7A3","#DFECE6"],["#F38A8A","#55443D","#A0CAB5","#CDE9CA","#F1EDD0"],["#793A57","#4D3339","#8C873E","#D1C5A5","#A38A5F"],["#11766D","#410936","#A40B54","#E46F0A","#F0B300"],["#AAFF00","#FFAA00","#FF00AA","#AA00FF","#00AAFF"],["#C75233","#C78933","#D6CEAA","#79B5AC","#5E2F46"],["#F8EDD1","#D88A8A","#474843","#9D9D93","#C5CFC6"],["#6DA67A","#77B885","#86C28B","#859987","#4A4857"],["#1B325F","#9CC4E4","#E9F2F9","#3A89C9","#F26C4F"],["#BED6C7","#ADC0B4","#8A7E66","#A79B83","#BBB2A1"],["#046D8B","#309292","#2FB8AC","#93A42A","#ECBE13"],["#82837E","#94B053","#BDEB07","#BFFA37","#E0E0E0"],["#312736","#D4838F","#D6ABB1","#D9D9D9","#C4FFEB"],["#E5EAA4","#A8C4A2","#69A5A4","#616382","#66245B"],["#6DA67A","#99A66D","#A9BD68","#B5CC6A","#C0DE5D"],["#395A4F","#432330","#853C43","#F25C5E","#FFA566"],["#331327","#991766","#D90F5A","#F34739","#FF6E27"],["#FDFFD9","#FFF0B8","#FFD6A3","#FAAD8E","#142F30"],["#E21B5A","#9E0C39","#333333","#FBFFE3","#83A300"],["#FBC599","#CDBB93","#9EAE8A","#335650","#F35F55"],["#C7FCD7","#D9D5A7","#D9AB91","#E6867A","#ED4A6A"],["#EC4401","#CC9B25","#13CD4A","#7B6ED6","#5E525C"],["#BF496A","#B39C82","#B8C99D","#F0D399","#595151"],["#FFEFD3","#FFFEE4","#D0ECEA","#9FD6D2","#8B7A5E"],["#F1396D","#FD6081","#F3FFEB","#ACC95F","#8F9924"],["#F6F6F6","#E8E8E8","#333333","#990100","#B90504"],["#261C21","#6E1E62","#B0254F","#DE4126","#EB9605"],["#E9E0D1","#91A398","#33605A","#070001","#68462B"],["#F2E3C6","#FFC6A5","#E6324B","#2B2B2B","#353634"],["#FFAB07","#E9D558","#72AD75","#0E8D94","#434D53"],["#59B390","#F0DDAA","#E47C5D","#E32D40","#152B3C"],["#FDE6BD","#A1C5AB","#F4DD51","#D11E48","#632F53"],["#E4E4C5","#B9D48B","#8D2036","#CE0A31","#D3E4C5"],["#512B52","#635274","#7BB0A8","#A7DBAB","#E4F5B1"],["#805841","#DCF7F3","#FFFCDD","#FFD8D8","#F5A2A2"],["#E65540","#F8ECC2","#65A8A6","#79896D"],["#CAFF42","#EBF7F8","#D0E0EB","#88ABC2","#49708A"],["#595643","#4E6B66","#ED834E","#EBCC6E","#EBE1C5"],["#E4DED0","#ABCCBD","#7DBEB8","#181619","#E32F21"],["#058789","#503D2E","#D54B1A","#E3A72F","#F0ECC9"],["#FF003C","#FF8A00","#FABE28","#88C100","#00C176"],["#311D39","#67434F","#9B8E7E","#C3CCAF","#A51A41"],["#EFD9B4","#D6A692","#A39081","#4D6160","#292522"],["#C6CCA5","#8AB8A8","#6B9997","#54787D","#615145"],["#CC5D4C","#FFFEC6","#C7D1AF","#96B49C","#5B5847"],["#111625","#341931","#571B3C","#7A1E48","#9D2053"],["#EFEECC","#FE8B05","#FE0557","#400403","#0AABBA"],["#CCF390","#E0E05A","#F7C41F","#FC930A","#FF003D"],["#73C8A9","#DEE1B6","#E1B866","#BD5532","#373B44"],["#79254A","#795C64","#79927D","#AEB18E","#E3CF9E"],["#E0EFF1","#7DB4B5","#FFFFFF","#680148","#000000"],["#F06D61","#DA825F","#C4975C","#A8AB7B","#8CBF99"],["#2D1B33","#F36A71","#EE887A","#E4E391","#9ABC8A"],["#2B2726","#0A516D","#018790","#7DAD93","#BACCA4"],["#95A131","#C8CD3B","#F6F1DE","#F5B9AE","#EE0B5B"],["#360745","#D61C59","#E7D84B","#EFEAC5","#1B8798"],["#E3E8CD","#BCD8BF","#D3B9A3","#EE9C92","#FE857E"],["#807462","#A69785","#B8FAFF","#E8FDFF","#665C49"],["#4B1139","#3B4058","#2A6E78","#7A907C","#C9B180"],["#FC284F","#FF824A","#FEA887","#F6E7F7","#D1D0D7"],["#FFB884","#F5DF98","#FFF8D4","#C0D1C2","#2E4347"],["#027B7F","#FFA588","#D62957","#BF1E62","#572E4F"],["#80A8A8","#909D9E","#A88C8C","#FF0D51","#7A8C89"],["#A69E80","#E0BA9B","#E7A97E","#D28574","#3B1922"],["#A1DBB2","#FEE5AD","#FACA66","#F7A541","#F45D4C"],["#641F5E","#676077","#65AC92","#C2C092","#EDD48E"],["#FFF3DB","#E7E4D5","#D3C8B4","#C84648","#703E3B"],["#F5DD9D","#BCC499","#92A68A","#7B8F8A","#506266"],["#2B222C","#5E4352","#965D62","#C7956D","#F2D974"],["#D4F7DC","#DBE7B4","#DBC092","#E0846D","#F51441"],["#A32C28","#1C090B","#384030","#7B8055","#BCA875"],["#85847E","#AB6A6E","#F7345B","#353130","#CBCFB4"],["#E6B39A","#E6CBA5","#EDE3B4","#8B9E9B","#6D7578"],["#11644D","#A0B046","#F2C94E","#F78145","#F24E4E"],["#6D9788","#1E2528","#7E1C13","#BF0A0D","#E6E1C2"],["#23192D","#FD0A54","#F57576","#FEBF97","#F5ECB7"],["#EB9C4D","#F2D680","#F3FFCF","#BAC9A9","#697060"],["#D3D5B0","#B5CEA4","#9DC19D","#8C7C62","#71443F"],["#452E3C","#FF3D5A","#FFB969","#EAF27E","#3B8C88"],["#041122","#259073","#7FDA89","#C8E98E","#E6F99D"],["#B1E6D1","#77B1A9","#3D7B80","#270A33","#451A3E"],["#9D9E94","#C99E93","#F59D92","#E5B8AD","#D5D2C8"],["#FDCFBF","#FEB89F","#E23D75","#5F0D3B","#742365"],["#540045","#C60052","#FF714B","#EAFF87","#ACFFE9"],["#B7CBBF","#8C886F","#F9A799","#F4BFAD","#F5DABD"],["#280904","#680E34","#9A151A","#C21B12","#FC4B2A"],["#F0FFC9","#A9DA88","#62997A","#72243D","#3B0819"],["#429398","#6B5D4D","#B0A18F","#DFCDB4","#FBEED3"],["#E6EBA9","#ABBB9F","#6F8B94","#706482","#703D6F"],["#A3C68C","#879676","#6E6662","#4F364A","#340735"],["#44749D","#C6D4E1","#FFFFFF","#EBE7E0","#BDB8AD"],["#322938","#89A194","#CFC89A","#CC883A","#A14016"],["#CFB590","#9E9A41","#758918","#564334","#49281F"],["#FA6A64","#7A4E48","#4A4031","#F6E2BB","#9EC6B8"],["#1D1313","#24B694","#D22042","#A3B808","#30C4C9"],["#F6D76B","#FF9036","#D6254D","#FF5475","#FDEBA9"],["#E7EDEA","#FFC52C","#FB0C06","#030D4F","#CEECEF"],["#373737","#8DB986","#ACCE91","#BADB73","#EFEAE4"],["#161616","#C94D65","#E7C049","#92B35A","#1F6764"],["#26251C","#EB0A44","#F2643D","#F2A73D","#A0E8B7"],["#4B3E4D","#1E8C93","#DBD8A2","#C4AC30","#D74F33"],["#8D7966","#A8A39D","#D8C8B8","#E2DDD9","#F8F1E9"],["#F2E8C4","#98D9B6","#3EC9A7","#2B879E","#616668"],["#5CACC4","#8CD19D","#CEE879","#FCB653","#FF5254"]]')}}]);
//# sourceMappingURL=sourcemaps/477.c12bffcd12658ba11669.bundle.js.map