"use strict";(self.webpackChunkpiclash=self.webpackChunkpiclash||[]).push([[622],{6026:function(e,t,n){n.r(t),n.d(t,{default:function(){return ue}});var r=n(2791),a=n(8290),o=n(4165),i=n(5861),s=n(9439),u=n(9434),l=n(5653),c=n(1176);var d=n(3433),m=n(1087),f=n(184),h="./img/avatars/default.png";function v(e){var t=e.username,n=e.postUrl;return(0,f.jsx)("header",{className:"flex border-b border-gray-primary h-4 p-4 py-8",children:(0,f.jsx)("div",{className:"flex items-center",children:(0,f.jsxs)(m.rU,{to:"/p/".concat(t),className:"flex items-center",children:[(0,f.jsx)("img",{className:"rounded-full h-8 w-8 flex mr-3",src:n||h,alt:"".concat(t," profile")}),(0,f.jsx)("p",{className:"font-bold",children:t})]})})})}var g=n(1088);function p(e){var t=e.docId,n=e.totalLikes,a=e.likedPost,o=e.handleFocus,i=e.votes,l=e.isAi,d=(0,u.v9)((function(e){return e.userModule.loggedInUser})).userId,m=void 0===d?"":d,h=(0,r.useState)(a),v=(0,s.Z)(h,2),p=v[0],b=v[1],x=(0,r.useState)(n),y=(0,s.Z)(x,2),w=y[0],j=y[1],M=function(){b((function(e){return!e})),j((function(e){return p?e-1:e+1})),c.W.toggleLiked(t,m,!p)};return(0,r.useEffect)((function(){j(n)}),[n]),(0,f.jsxs)("div",{className:"flex justify-between p-4",children:[(0,f.jsxs)("div",{className:"flex",children:[(0,f.jsx)(g.Z,{iconName:p?"unlike":"like",onClick:M,className:"w-8 mr-4 select-none cursor-pointer",onKeyDown:function(e){"Enter"===e.key&&M()},tabIndex:0}),(0,f.jsx)(g.Z,{iconName:"comments",className:"w-8 select-none cursor-pointer",onClick:o,onKeyDown:function(e){"Enter"===e.key&&o()},tabIndex:0})]}),(0,f.jsxs)("div",{className:"p-4 py-0 flex",children:[l&&(0,f.jsxs)("div",{className:"w-8 select-none flex font-bold mr-2",children:[(0,f.jsx)("p",{children:i||0}),(0,f.jsx)(g.Z,{iconName:i?"starFilled":"starEmpty"})]}),(0,f.jsxs)("p",{className:"font-bold",children:[w," ","like",1!==w?"s":""]})]})]})}function b(e){var t=e.username,n=e.comment;e.avatarUrl,e.isPreview;return(0,f.jsxs)("p",{className:"mb-1",children:[(0,f.jsx)(m.rU,{to:"/p/".concat(t),children:(0,f.jsx)("span",{className:"mr-1 font-bold",children:t})}),n]})}function x(e){var t=e.comments;return(0,f.jsx)("div",{className:"p-4 pt-1 pb-4",children:t.map((function(e,t){var n=e.username,r=e.comment,a=e.userId,o=e.avatarUrl;return(0,f.jsx)(b,{avatarUrl:o||null,username:n,comment:r},a||t)}))})}function y(e){var t=e.addComment,n=e.commentInput,a=e.hasUserCommented,o=(0,r.useState)(""),i=(0,s.Z)(o,2),u=i[0],l=i[1];return(0,f.jsx)("div",{className:"border-t border-gray-primary",children:(0,f.jsxs)("form",{className:"flex justify-between pl-4 pr-4",method:"POST",onSubmit:function(e){return function(e){e.preventDefault(),a||(t(u),l(""),n.current.focus())}(e)},children:[(0,f.jsx)("input",{"aria-label":"Add a comment",autoComplete:"off",className:"text-sm text-gray-base w-full mr-3 py-5 px-4",type:"text",name:"add-comment",placeholder:"Add a comment...",value:u,onChange:function(e){var t=e.target;return l(t.value)},ref:n}),(0,f.jsx)("button",{className:"text-sm font-bold text-blue-medium ".concat((!u||a)&&"opacity-25"),type:"submit",disabled:u.length<1||a,children:"Post"})]})})}var w={};function j(){return w}var M=n(1002);function N(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function k(e){N(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===(0,M.Z)(e)&&"[object Date]"===t?new Date(e.getTime()):"number"===typeof e||"[object Number]"===t?new Date(e):("string"!==typeof e&&"[object String]"!==t||"undefined"===typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function P(e,t){N(2,arguments);var n=k(e),r=k(t),a=n.getTime()-r.getTime();return a<0?-1:a>0?1:a}function S(e){N(1,arguments);var t=k(e);return function(e){N(1,arguments);var t=k(e);return t.setHours(23,59,59,999),t}(t).getTime()===function(e){N(1,arguments);var t=k(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(23,59,59,999),t}(t).getTime()}function D(e,t){N(2,arguments);var n,r=k(e),a=k(t),o=P(r,a),i=Math.abs(function(e,t){N(2,arguments);var n=k(e),r=k(t);return 12*(n.getFullYear()-r.getFullYear())+(n.getMonth()-r.getMonth())}(r,a));if(i<1)n=0;else{1===r.getMonth()&&r.getDate()>27&&r.setDate(30),r.setMonth(r.getMonth()-o*i);var s=P(r,a)===-o;S(k(e))&&1===i&&1===P(e,a)&&(s=!1),n=o*(i-Number(s))}return 0===n?0:n}var W={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(e){return e<0?Math.ceil(e):Math.floor(e)}},I="trunc";function Z(e,t,n){N(2,arguments);var r,a=function(e,t){return N(2,arguments),k(e).getTime()-k(t).getTime()}(e,t)/1e3;return((r=null===n||void 0===n?void 0:n.roundingMethod)?W[r]:W[I])(a)}var C={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},T=function(e,t,n){var r,a=C[e];return r="string"===typeof a?a:1===t?a.one:a.other.replace("{{count}}",t.toString()),null!==n&&void 0!==n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r};function U(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}var A={date:U({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:U({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:U({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},F={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},E=function(e,t,n,r){return F[e]};function O(e){return function(t,n){var r;if("formatting"===(null!==n&&void 0!==n&&n.context?String(n.context):"standalone")&&e.formattingValues){var a=e.defaultFormattingWidth||e.defaultWidth,o=null!==n&&void 0!==n&&n.width?String(n.width):a;r=e.formattingValues[o]||e.formattingValues[a]}else{var i=e.defaultWidth,s=null!==n&&void 0!==n&&n.width?String(n.width):e.defaultWidth;r=e.values[s]||e.values[i]}return r[e.argumentCallback?e.argumentCallback(t):t]}}var X={ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:O({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:O({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:O({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:O({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:O({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})};function Y(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],o=t.match(a);if(!o)return null;var i,s=o[0],u=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],l=Array.isArray(u)?function(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n;return}(u,(function(e){return e.test(s)})):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n;return}(u,(function(e){return e.test(s)}));return i=e.valueCallback?e.valueCallback(l):l,{value:i=n.valueCallback?n.valueCallback(i):i,rest:t.slice(s.length)}}}var q,J={ordinalNumber:(q={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(q.matchPattern);if(!n)return null;var r=n[0],a=e.match(q.parsePattern);if(!a)return null;var o=q.valueCallback?q.valueCallback(a[0]):a[0];return{value:o=t.valueCallback?t.valueCallback(o):o,rest:e.slice(r.length)}}),era:Y({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:Y({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:Y({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:Y({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:Y({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},H={code:"en-US",formatDistance:T,formatLong:A,formatRelative:E,localize:X,match:J,options:{weekStartsOn:0,firstWeekContainsDate:1}};function R(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function z(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var V=1440,L=2520,B=43200,Q=86400;function K(e,t,n){var r,a;N(2,arguments);var o=j(),i=null!==(r=null!==(a=null===n||void 0===n?void 0:n.locale)&&void 0!==a?a:o.locale)&&void 0!==r?r:H;if(!i.formatDistance)throw new RangeError("locale must contain formatDistance property");var s=P(e,t);if(isNaN(s))throw new RangeError("Invalid time value");var u,l,c=R(R({},n),{addSuffix:Boolean(null===n||void 0===n?void 0:n.addSuffix),comparison:s});s>0?(u=k(t),l=k(e)):(u=k(e),l=k(t));var d,m=Z(l,u),f=(z(l)-z(u))/1e3,h=Math.round((m-f)/60);if(h<2)return null!==n&&void 0!==n&&n.includeSeconds?m<5?i.formatDistance("lessThanXSeconds",5,c):m<10?i.formatDistance("lessThanXSeconds",10,c):m<20?i.formatDistance("lessThanXSeconds",20,c):m<40?i.formatDistance("halfAMinute",0,c):m<60?i.formatDistance("lessThanXMinutes",1,c):i.formatDistance("xMinutes",1,c):0===h?i.formatDistance("lessThanXMinutes",1,c):i.formatDistance("xMinutes",h,c);if(h<45)return i.formatDistance("xMinutes",h,c);if(h<90)return i.formatDistance("aboutXHours",1,c);if(h<V){var v=Math.round(h/60);return i.formatDistance("aboutXHours",v,c)}if(h<L)return i.formatDistance("xDays",1,c);if(h<B){var g=Math.round(h/V);return i.formatDistance("xDays",g,c)}if(h<Q)return d=Math.round(h/B),i.formatDistance("aboutXMonths",d,c);if((d=D(l,u))<12){var p=Math.round(h/B);return i.formatDistance("xMonths",p,c)}var b=d%12,x=Math.floor(d/12);return b<3?i.formatDistance("aboutXYears",x,c):b<9?i.formatDistance("overXYears",x,c):i.formatDistance("almostXYears",x+1,c)}var G=3;function $(e){var t=e.post,n=(0,r.useRef)(null),a=t.username,o=t.caption,i=t.userPostUrl,l=t.docId,m=t.likes,h=t.createdAt,g=t.comments,b=t.imgSrc,w=t.userLikedPost,j=t.votes,M=t.isAi,N=void 0!==M&&M,k=(0,r.useState)(g.slice(0,G-1)),P=(0,s.Z)(k,2),S=P[0],D=P[1],W=(0,u.v9)((function(e){return e.userModule.loggedInUser}));var I=g.some((function(e){return e.userId===(null===W||void 0===W?void 0:W.userId)}));return(0,f.jsxs)("div",{className:"mb-5 border bg-white border-gray-primary rounded-lg",children:[(0,f.jsx)(v,{username:a,postUrl:i}),(0,f.jsx)("img",{src:b,alt:o,className:"min-w-full"}),(0,f.jsx)(p,{docId:l,totalLikes:m.length,likedPost:w,handleFocus:function(){return n.current.focus()},votes:j.length,isAi:N}),(0,f.jsx)(x,{comments:[{username:a,comment:o,createdAt:h}]}),(0,f.jsx)(x,{comments:S}),g.length>G?(0,f.jsx)("p",{className:"text-gray-base uppercase text-xs mt-2 ml-4",children:(0,f.jsxs)("button",{type:"button",children:["View all ",g.length+S.length-G," comments"]})}):"",(0,f.jsxs)("p",{className:"text-gray-base uppercase text-xs mt-2 ml-4",children:[K(h,new Date)," ago"]}),(0,f.jsx)(y,{addComment:function(e){var t=null===W||void 0===W?void 0:W.userId;if(t){var n={comment:e,userId:t,username:W.username,createdAt:Date.now()};D([].concat((0,d.Z)(S),[n])),c.W.addComment(n,l,t)}},commentInput:n,hasUserCommented:I})]})}var _=4;function ee(){var e=function(){var e=(0,r.useState)(null),t=(0,s.Z)(e,2),n=t[0],a=t[1],l=(0,u.v9)((function(e){return e.userModule.loggedInUser}));return(0,r.useEffect)((function(){function e(){return(e=(0,i.Z)((0,o.Z)().mark((function e(){var t,n,r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l){e.next=2;break}return e.abrupt("return",null);case 2:if(t=l.following,n=l.userId,r=[],!(t.length>0)){e.next=8;break}return e.next=7,c.W.getPosts(n,t);case 7:r=e.sent;case 8:a(r);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[l]),{posts:n}}(),t=e.posts;return(0,f.jsx)("div",{className:"container max-w-xl rounded col-span-4",children:t?(null===t||void 0===t?void 0:t.length)>0?t.map((function(e){return(0,f.jsx)($,{post:e},e.docId)})):(0,f.jsx)("p",{className:"text-center text-2xl",children:"Follow people to see posts!"}):(0,f.jsx)(a.Z,{count:_,width:576,height:700,className:"mb-5"})})}var te=n(6249);function ne(e){var t=e.username,n=e.fullname,r=e.userId,o=e.avatarUrl;return t&&n&&r?(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,f.jsxs)(m.rU,{to:"/p/".concat(t),className:"flex items-center",children:[(0,f.jsx)("div",{className:"flex items-center mr-3",children:(0,f.jsx)("img",{className:"rounded-full w-16",src:o||"/img/avatars/default.png",alt:"Profile picture"})}),(0,f.jsxs)("div",{className:"ml-3",children:[(0,f.jsx)("p",{className:"font-bold text-sm",children:t}),(0,f.jsx)("p",{className:"text-sm",children:n})]})]}),(0,f.jsx)(m.rU,{to:te.ym,className:"text-blue-medium text-sm mr-3 font-bold ml-10",children:"switch"})]})}):(0,f.jsx)(a.Z,{count:1,height:61})}var re=(0,r.memo)(ne),ae="./img/avatars/default.png";function oe(e){var t=e.profileId,n=e.profileUsername,a=e.profilePostUrl,u=e.userId,c=(0,r.useState)(!1),d=(0,s.Z)(c,2),h=d[0],v=d[1];function g(){return(g=(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v((function(e){return!e})),e.next=3,(0,l.tV)(t,u,!h);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,f.jsxs)("div",{className:"flex flex-row items-center align-items justify-between",children:[(0,f.jsxs)("div",{className:"flex items-center justify-between",children:[(0,f.jsx)("img",{className:"rounded-full w-8 flex mr-4",src:a||ae,alt:"".concat(n," profile")}),(0,f.jsx)(m.rU,{to:"/p/".concat(n),className:"flex items-center",children:(0,f.jsx)("p",{className:"font-bold text-sm",children:n})})]}),(0,f.jsx)("button",{className:"text-xs font-bold text-blue-medium mr-4",onClick:function(){return g.apply(this,arguments)},children:h?"Unfollow":"Follow"})]})}function ie(e){var t=e.userId,n=e.following,u=(0,r.useState)(null),c=(0,s.Z)(u,2),d=c[0],m=c[1];return(0,r.useEffect)((function(){function e(){return(e=(0,i.Z)((0,o.Z)().mark((function e(){var r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,l.JU)(t,n);case 2:r=e.sent,m(r);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t&&function(){e.apply(this,arguments)}()}),[t]),d?d.length>0?(0,f.jsxs)("div",{className:"rounded flex flex-col",children:[(0,f.jsx)("div",{className:"text-sm flex items-center align-items justify-between mb-2",children:(0,f.jsx)("p",{className:"font-bold text-gray-base",children:"Suggested for you"})}),(0,f.jsx)("div",{className:"mt-4 grid gap-5",children:d.map((function(e){return(0,f.jsx)(oe,{profileId:e.userId,profileUsername:e.username,profilePostUrl:e.postUrl,userId:t},e.userId)}))})]}):null:(0,f.jsx)(a.Z,{count:1,height:150,className:"mt-5"})}var se=n(5076);function ue(){var e=(0,u.v9)((function(e){return e.userModule.loggedInUser})),t="".username,n="".fullname,a="".userId,o="".avatarUrl,i="".following;return e&&(t=e.username,n=e.fullname,a=e.userId,o=e.avatarUrl,i=e.following),(0,r.useEffect)((function(){document.title="Home - Piclash"}),[]),(0,f.jsx)(se.Z,{children:(0,f.jsxs)("div",{className:"flex mt-5 gap-5",children:[(0,f.jsx)(ee,{}),(0,f.jsxs)("div",{className:"hidden md:block",children:[(0,f.jsx)(re,{username:t,fullname:n,userId:a,avatarUrl:o}),(0,f.jsx)(ie,{userId:a||"",following:i||[]})]})]})})}},4925:function(e,t,n){function r(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}n.d(t,{Z:function(){return r}})},8290:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(9439),a=n(1413),o=n(4925),i=n(2791),s=["count","wrapper","className","containerClassName","containerTestId","circle","style"],u=i.createContext({}),l=!0;function c(e){for(var t,n,c,d=e.count,m=void 0===d?1:d,f=e.wrapper,h=e.className,v=e.containerClassName,g=e.containerTestId,p=e.circle,b=void 0!==p&&p,x=e.style,y=(0,o.Z)(e,s),w=i.useContext(u),j=(0,a.Z)({},y),M=0,N=Object.entries(y);M<N.length;M++){var k=(0,r.Z)(N[M],2),P=k[0];"undefined"===typeof k[1]&&delete j[P]}var S=(0,a.Z)((0,a.Z)((0,a.Z)({},w),j),{},{circle:b}),D=(0,a.Z)((0,a.Z)({},x),function(e){var t=e.baseColor,n=e.highlightColor,r=e.width,a=e.height,o=e.borderRadius,i=e.circle,s=e.direction,u=e.duration,c=e.enableAnimation,d=void 0===c?l:c,m={};return"rtl"===s&&(m["--animation-direction"]="reverse"),"number"===typeof u&&(m["--animation-duration"]="".concat(u,"s")),d||(m["--pseudo-element-display"]="none"),"string"!==typeof r&&"number"!==typeof r||(m.width=r),"string"!==typeof a&&"number"!==typeof a||(m.height=a),"string"!==typeof o&&"number"!==typeof o||(m.borderRadius=o),i&&(m.borderRadius="50%"),"undefined"!==typeof t&&(m["--base-color"]=t),"undefined"!==typeof n&&(m["--highlight-color"]=n),m}(S)),W="react-loading-skeleton";h&&(W+=" ".concat(h));for(var I=null!==(t=S.inline)&&void 0!==t&&t,Z=[],C=Math.ceil(m),T=0;T<C;T++){var U=D;if(C>m&&T===C-1){var A=null!==(n=U.width)&&void 0!==n?n:"100%",F=m%1,E="number"===typeof A?A*F:"calc(".concat(A," * ").concat(F,")");U=(0,a.Z)((0,a.Z)({},U),{},{width:E})}var O=i.createElement("span",{className:W,style:U,key:T},"\u200c");I?Z.push(O):Z.push(i.createElement(i.Fragment,{key:T},O,i.createElement("br",null)))}return i.createElement("span",{className:v,"data-testid":g,"aria-live":"polite","aria-busy":null!==(c=S.enableAnimation)&&void 0!==c?c:l},f?Z.map((function(e,t){return i.createElement(f,{key:t},e)})):Z)}}}]);
//# sourceMappingURL=622.bd1a3dab.chunk.js.map