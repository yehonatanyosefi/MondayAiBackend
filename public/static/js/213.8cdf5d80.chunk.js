"use strict";(self.webpackChunkpiclash=self.webpackChunkpiclash||[]).push([[213],{2498:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var r=t(3433),l=t(4165),s=t(5861),a=t(9439),o=t(2791),i=t(7689),c=t(5653),d=t(1176),u=t(5076),f=t(9434),m=t(8290),p=t(184);function h(){var e=(0,i.s0)(),n=(0,i.UO)().username,t=(0,o.useState)(null),h=(0,a.Z)(t,2),v=h[0],x=h[1],g=(0,o.useState)([]),b=(0,a.Z)(g,2),y=b[0],w=b[1],j=(0,f.v9)((function(e){return e.userModule.loggedInUser})),Z=(0,o.useState)(!1),N=(0,a.Z)(Z,2),k=N[0],I=N[1],C=(0,o.useCallback)((0,s.Z)((0,l.Z)().mark((function e(){return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(!k),e.next=3,(0,c.tV)(v.userId,j.userId,!k).catch((function(e){return console.error(e)}));case 3:case"end":return e.stop()}}),e)}))),[k,j,v]);return(0,o.useEffect)((function(){n&&(document.title="".concat(n," - Piclash"))}),[n]),(0,o.useEffect)((function(){function t(){return(t=(0,s.Z)((0,l.Z)().mark((function t(){var r;return(0,l.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,c.dQ)(n);case 3:(r=t.sent)||e("/404"),x(r),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[n,e]),(0,o.useEffect)((function(){function e(){return(e=(0,s.Z)((0,l.Z)().mark((function e(){var n;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.W.getPostsByUserId(v.userId);case 3:n=e.sent,w(n||[]),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}v&&j&&(I(null===v||void 0===v?void 0:v.followers.includes(null===j||void 0===j?void 0:j.userId)),function(){e.apply(this,arguments)}())}),[v,j]),(0,p.jsxs)(u.Z,{children:[(0,p.jsx)("div",{className:"flex flex-col items-center md:items-start pt-4 md:pt-10 max-w-xl mx-auto",children:(0,p.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center space-x-0 md:space-x-4 w-full",children:[(0,p.jsx)("img",{src:(null===v||void 0===v?void 0:v.avatarUrl)||"".concat("","/img/avatars/default.png"),alt:"".concat(null===v||void 0===v?void 0:v.username," avatar"),className:"h-32 w-32 md:h-40 md:w-40 rounded-full mx-auto md:mx-0"}),(0,p.jsxs)("div",{className:"flex-1 mt-4 md:mt-0",children:[(0,p.jsxs)("div",{className:"flex items-center justify-between",children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("h1",{className:"text-2xl font-bold",children:null===v||void 0===v?void 0:v.username}),(0,p.jsx)("h2",{className:"text-lg",children:null===v||void 0===v?void 0:v.fullname})]}),j&&(null===v||void 0===v?void 0:v.userId)!==j.userId&&(0,p.jsx)("button",{onClick:C,className:"bg-blue-medium text-white py-2 px-4 rounded-lg",children:k?"Unfollow":"Follow"})]}),(0,p.jsxs)("div",{className:"flex space-x-4 mt-2",children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("span",{className:"font-bold",children:null===y||void 0===y?void 0:y.length})," posts"]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("span",{className:"font-bold",children:null===v||void 0===v?void 0:v.followers.length})," followers"]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("span",{className:"font-bold",children:null===v||void 0===v?void 0:v.following.length})," following"]})]})]})]})}),(0,p.jsxs)("div",{className:"p-4 md:p-8 mt-8 md:mt-12",children:[(0,p.jsx)("h2",{className:"text-2xl font-bold",children:"Posts"}),v&&0===(null===y||void 0===y?void 0:y.length)&&(0,p.jsxs)("p",{children:[null===v||void 0===v?void 0:v.username," has no posts yet."]}),(0,p.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4",children:[y.length>0&&y.map((function(e,n){return(0,p.jsx)("img",{src:e.imgSrc,alt:e.caption,className:"w-full h-[300px] object-cover"},n)})),!v&&(0,r.Z)(Array(6)).map((function(e,n){return(0,p.jsx)(m.Z,{count:1,width:300,height:300,className:"w-full h-[300px] object-cover"},n)}))]})]})]})}},4925:function(e,n,t){function r(e,n){if(null==e)return{};var t,r,l=function(e,n){if(null==e)return{};var t,r,l={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}t.d(n,{Z:function(){return r}})},8290:function(e,n,t){t.d(n,{Z:function(){return d}});var r=t(9439),l=t(1413),s=t(4925),a=t(2791),o=["count","wrapper","className","containerClassName","containerTestId","circle","style"],i=a.createContext({}),c=!0;function d(e){for(var n,t,d,u=e.count,f=void 0===u?1:u,m=e.wrapper,p=e.className,h=e.containerClassName,v=e.containerTestId,x=e.circle,g=void 0!==x&&x,b=e.style,y=(0,s.Z)(e,o),w=a.useContext(i),j=(0,l.Z)({},y),Z=0,N=Object.entries(y);Z<N.length;Z++){var k=(0,r.Z)(N[Z],2),I=k[0];"undefined"===typeof k[1]&&delete j[I]}var C=(0,l.Z)((0,l.Z)((0,l.Z)({},w),j),{},{circle:g}),O=(0,l.Z)((0,l.Z)({},b),function(e){var n=e.baseColor,t=e.highlightColor,r=e.width,l=e.height,s=e.borderRadius,a=e.circle,o=e.direction,i=e.duration,d=e.enableAnimation,u=void 0===d?c:d,f={};return"rtl"===o&&(f["--animation-direction"]="reverse"),"number"===typeof i&&(f["--animation-duration"]="".concat(i,"s")),u||(f["--pseudo-element-display"]="none"),"string"!==typeof r&&"number"!==typeof r||(f.width=r),"string"!==typeof l&&"number"!==typeof l||(f.height=l),"string"!==typeof s&&"number"!==typeof s||(f.borderRadius=s),a&&(f.borderRadius="50%"),"undefined"!==typeof n&&(f["--base-color"]=n),"undefined"!==typeof t&&(f["--highlight-color"]=t),f}(C)),E="react-loading-skeleton";p&&(E+=" ".concat(p));for(var S=null!==(n=C.inline)&&void 0!==n&&n,P=[],U=Math.ceil(f),A=0;A<U;A++){var R=O;if(U>f&&A===U-1){var F=null!==(t=R.width)&&void 0!==t?t:"100%",M=f%1,T="number"===typeof F?F*M:"calc(".concat(F," * ").concat(M,")");R=(0,l.Z)((0,l.Z)({},R),{},{width:T})}var B=a.createElement("span",{className:E,style:R,key:A},"\u200c");S?P.push(B):P.push(a.createElement(a.Fragment,{key:A},B,a.createElement("br",null)))}return a.createElement("span",{className:h,"data-testid":v,"aria-live":"polite","aria-busy":null!==(d=C.enableAnimation)&&void 0!==d?d:c},m?P.map((function(e,n){return a.createElement(m,{key:n},e)})):P)}}}]);
//# sourceMappingURL=213.8cdf5d80.chunk.js.map