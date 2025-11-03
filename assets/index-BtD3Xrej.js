(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();const Ht=!1,zt=(e,t)=>e===t,we=Symbol("solid-proxy"),pt=typeof Proxy=="function",Nt=Symbol("solid-track"),pe={equals:zt};let bt=St;const Q=1,be=2,vt={owned:null,cleanups:null,context:null,owner:null};var L=null;let Le=null,jt=null,E=null,D=null,F=null,Pe=0;function de(e,t){const r=E,n=L,i=e.length===0,s=t===void 0?n:t,a=i?vt:{owned:null,cleanups:null,context:s?s.context:null,owner:s},o=i?e:()=>e(()=>se(()=>te(a)));L=a,E=null;try{return ae(o,!0)}finally{E=r,L=n}}function W(e,t){t=t?Object.assign({},pe,t):pe;const r={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},n=i=>(typeof i=="function"&&(i=i(r.value)),$t(r,i));return[xt.bind(r),n]}function z(e,t,r){const n=We(e,t,!1,Q);oe(n)}function Ge(e,t,r){bt=Gt;const n=We(e,t,!1,Q);n.user=!0,F?F.push(n):oe(n)}function Ae(e,t,r){r=r?Object.assign({},pe,r):pe;const n=We(e,t,!0,0);return n.observers=null,n.observerSlots=null,n.comparator=r.equals||void 0,oe(n),xt.bind(n)}function se(e){if(E===null)return e();const t=E;E=null;try{return e()}finally{E=t}}function Fe(e){return L===null||(L.cleanups===null?L.cleanups=[e]:L.cleanups.push(e)),e}function xt(){if(this.sources&&this.state)if(this.state===Q)oe(this);else{const e=D;D=null,ae(()=>xe(this),!1),D=e}if(E){const e=this.observers?this.observers.length:0;E.sources?(E.sources.push(this),E.sourceSlots.push(e)):(E.sources=[this],E.sourceSlots=[e]),this.observers?(this.observers.push(E),this.observerSlots.push(E.sources.length-1)):(this.observers=[E],this.observerSlots=[E.sources.length-1])}return this.value}function $t(e,t,r){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&ae(()=>{for(let i=0;i<e.observers.length;i+=1){const s=e.observers[i],a=Le&&Le.running;a&&Le.disposed.has(s),(a?!s.tState:!s.state)&&(s.pure?D.push(s):F.push(s),s.observers&&kt(s)),a||(s.state=Q)}if(D.length>1e6)throw D=[],new Error},!1)),t}function oe(e){if(!e.fn)return;te(e);const t=Pe;Rt(e,e.value,t)}function Rt(e,t,r){let n;const i=L,s=E;E=L=e;try{n=e.fn(t)}catch(a){return e.pure&&(e.state=Q,e.owned&&e.owned.forEach(te),e.owned=null),e.updatedAt=r+1,Ct(a)}finally{E=s,L=i}(!e.updatedAt||e.updatedAt<=r)&&(e.updatedAt!=null&&"observers"in e?$t(e,n):e.value=n,e.updatedAt=r)}function We(e,t,r,n=Q,i){const s={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:L,context:L?L.context:null,pure:r};return L===null||L!==vt&&(L.owned?L.owned.push(s):L.owned=[s]),s}function ve(e){if(e.state===0)return;if(e.state===be)return xe(e);if(e.suspense&&se(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Pe);)e.state&&t.push(e);for(let r=t.length-1;r>=0;r--)if(e=t[r],e.state===Q)oe(e);else if(e.state===be){const n=D;D=null,ae(()=>xe(e,t[0]),!1),D=n}}function ae(e,t){if(D)return e();let r=!1;t||(D=[]),F?r=!0:F=[],Pe++;try{const n=e();return _t(r),n}catch(n){r||(F=null),D=null,Ct(n)}}function _t(e){if(D&&(St(D),D=null),e)return;const t=F;F=null,t.length&&ae(()=>bt(t),!1)}function St(e){for(let t=0;t<e.length;t++)ve(e[t])}function Gt(e){let t,r=0;for(t=0;t<e.length;t++){const n=e[t];n.user?e[r++]=n:ve(n)}for(t=0;t<r;t++)ve(e[t])}function xe(e,t){e.state=0;for(let r=0;r<e.sources.length;r+=1){const n=e.sources[r];if(n.sources){const i=n.state;i===Q?n!==t&&(!n.updatedAt||n.updatedAt<Pe)&&ve(n):i===be&&xe(n,t)}}}function kt(e){for(let t=0;t<e.observers.length;t+=1){const r=e.observers[t];r.state||(r.state=be,r.pure?D.push(r):F.push(r),r.observers&&kt(r))}}function te(e){let t;if(e.sources)for(;e.sources.length;){const r=e.sources.pop(),n=e.sourceSlots.pop(),i=r.observers;if(i&&i.length){const s=i.pop(),a=r.observerSlots.pop();n<i.length&&(s.sourceSlots[a]=n,i[n]=s,r.observerSlots[n]=a)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)te(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)te(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Ft(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ct(e,t=L){throw Ft(e)}const Wt=Symbol("fallback");function tt(e){for(let t=0;t<e.length;t++)e[t]()}function Ut(e,t,r={}){let n=[],i=[],s=[],a=0,o=t.length>1?[]:null;return Fe(()=>tt(s)),()=>{let c=e()||[],u=c.length,f,l;return c[Nt],se(()=>{let m,g,h,p,y,v,x,w,M;if(u===0)a!==0&&(tt(s),s=[],n=[],i=[],a=0,o&&(o=[])),r.fallback&&(n=[Wt],i[0]=de(H=>(s[0]=H,r.fallback())),a=1);else if(a===0){for(i=new Array(u),l=0;l<u;l++)n[l]=c[l],i[l]=de(d);a=u}else{for(h=new Array(u),p=new Array(u),o&&(y=new Array(u)),v=0,x=Math.min(a,u);v<x&&n[v]===c[v];v++);for(x=a-1,w=u-1;x>=v&&w>=v&&n[x]===c[w];x--,w--)h[w]=i[x],p[w]=s[x],o&&(y[w]=o[x]);for(m=new Map,g=new Array(w+1),l=w;l>=v;l--)M=c[l],f=m.get(M),g[l]=f===void 0?-1:f,m.set(M,l);for(f=v;f<=x;f++)M=n[f],l=m.get(M),l!==void 0&&l!==-1?(h[l]=i[f],p[l]=s[f],o&&(y[l]=o[f]),l=g[l],m.set(M,l)):s[f]();for(l=v;l<u;l++)l in h?(i[l]=h[l],s[l]=p[l],o&&(o[l]=y[l],o[l](l))):i[l]=de(d);i=i.slice(0,a=u),n=c.slice(0)}return i});function d(m){if(s[l]=m,o){const[g,h]=W(l);return o[l]=h,t(c[l],g)}return t(c[l])}}}function C(e,t){return se(()=>e(t||{}))}function ue(){return!0}const De={get(e,t,r){return t===we?r:e.get(t)},has(e,t){return t===we?!0:e.has(t)},set:ue,deleteProperty:ue,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:ue,deleteProperty:ue}},ownKeys(e){return e.keys()}};function Te(e){return(e=typeof e=="function"?e():e)?e:{}}function Qt(){for(let e=0,t=this.length;e<t;++e){const r=this[e]();if(r!==void 0)return r}}function rt(...e){let t=!1;for(let a=0;a<e.length;a++){const o=e[a];t=t||!!o&&we in o,e[a]=typeof o=="function"?(t=!0,Ae(o)):o}if(pt&&t)return new Proxy({get(a){for(let o=e.length-1;o>=0;o--){const c=Te(e[o])[a];if(c!==void 0)return c}},has(a){for(let o=e.length-1;o>=0;o--)if(a in Te(e[o]))return!0;return!1},keys(){const a=[];for(let o=0;o<e.length;o++)a.push(...Object.keys(Te(e[o])));return[...new Set(a)]}},De);const r={},n=Object.create(null);for(let a=e.length-1;a>=0;a--){const o=e[a];if(!o)continue;const c=Object.getOwnPropertyNames(o);for(let u=c.length-1;u>=0;u--){const f=c[u];if(f==="__proto__"||f==="constructor")continue;const l=Object.getOwnPropertyDescriptor(o,f);if(!n[f])n[f]=l.get?{enumerable:!0,configurable:!0,get:Qt.bind(r[f]=[l.get.bind(o)])}:l.value!==void 0?l:void 0;else{const d=r[f];d&&(l.get?d.push(l.get.bind(o)):l.value!==void 0&&d.push(()=>l.value))}}}const i={},s=Object.keys(n);for(let a=s.length-1;a>=0;a--){const o=s[a],c=n[o];c&&c.get?Object.defineProperty(i,o,c):i[o]=c?c.value:void 0}return i}function Zt(e,...t){const r=t.length;if(pt&&we in e){const i=r>1?t.flat():t[0],s=t.map(a=>new Proxy({get(o){return a.includes(o)?e[o]:void 0},has(o){return a.includes(o)&&o in e},keys(){return a.filter(o=>o in e)}},De));return s.push(new Proxy({get(a){return i.includes(a)?void 0:e[a]},has(a){return i.includes(a)?!1:a in e},keys(){return Object.keys(e).filter(a=>!i.includes(a))}},De)),s}const n=[];for(let i=0;i<=r;i++)n[i]={};for(const i of Object.getOwnPropertyNames(e)){let s=r;for(let c=0;c<t.length;c++)if(t[c].includes(i)){s=c;break}const a=Object.getOwnPropertyDescriptor(e,i);!a.get&&!a.set&&a.enumerable&&a.writable&&a.configurable?n[s][i]=a.value:Object.defineProperty(n[s],i,a)}return n}function nt(e){const t="fallback"in e&&{fallback:()=>e.fallback};return Ae(Ut(()=>e.each,e.children,t||void 0))}const Kt=new Set(["innerHTML","textContent","innerText","children"]),Xt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),qt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Yt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},He=e=>Ae(()=>e());function Jt(e,t,r){let n=r.length,i=t.length,s=n,a=0,o=0,c=t[i-1].nextSibling,u=null;for(;a<i||o<s;){if(t[a]===r[o]){a++,o++;continue}for(;t[i-1]===r[s-1];)i--,s--;if(i===a){const f=s<n?o?r[o-1].nextSibling:r[s-o]:c;for(;o<s;)e.insertBefore(r[o++],f)}else if(s===o)for(;a<i;)(!u||!u.has(t[a]))&&t[a].remove(),a++;else if(t[a]===r[s-1]&&r[o]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(r[o++],t[a++].nextSibling),e.insertBefore(r[--s],f),t[i]=r[s]}else{if(!u){u=new Map;let l=o;for(;l<s;)u.set(r[l],l++)}const f=u.get(t[a]);if(f!=null)if(o<f&&f<s){let l=a,d=1,m;for(;++l<i&&l<s&&!((m=u.get(t[l]))==null||m!==f+d);)d++;if(d>f-o){const g=t[a];for(;o<f;)e.insertBefore(r[o++],g)}else e.replaceChild(r[o++],t[a++])}else a++;else t[a++].remove()}}}const it="_$DX_DELEGATE";function er(e,t,r,n={}){let i;return de(s=>{i=s,t===document?e():A(t,e(),t.firstChild?null:void 0,r)},n.owner),()=>{i(),t.textContent=""}}function R(e,t,r,n){let i;const s=()=>{const o=document.createElement("template");return o.innerHTML=e,o.content.firstChild},a=()=>(i||(i=s())).cloneNode(!0);return a.cloneNode=a,a}function ce(e,t=window.document){const r=t[it]||(t[it]=new Set);for(let n=0,i=e.length;n<i;n++){const s=e[n];r.has(s)||(r.add(s),t.addEventListener(s,lr))}}function re(e,t,r){r==null?e.removeAttribute(t):e.setAttribute(t,r)}function tr(e,t,r,n){n==null?e.removeAttributeNS(t,r):e.setAttributeNS(t,r,n)}function rr(e,t,r){r?e.setAttribute(t,""):e.removeAttribute(t)}function P(e,t){t==null?e.removeAttribute("class"):e.className=t}function nr(e,t,r,n){if(n)Array.isArray(r)?(e[`$$${t}`]=r[0],e[`$$${t}Data`]=r[1]):e[`$$${t}`]=r;else if(Array.isArray(r)){const i=r[0];e.addEventListener(t,r[0]=s=>i.call(e,r[1],s))}else e.addEventListener(t,r,typeof r!="function"&&r)}function ir(e,t,r={}){const n=Object.keys(t||{}),i=Object.keys(r);let s,a;for(s=0,a=i.length;s<a;s++){const o=i[s];!o||o==="undefined"||t[o]||(st(e,o,!1),delete r[o])}for(s=0,a=n.length;s<a;s++){const o=n[s],c=!!t[o];!o||o==="undefined"||r[o]===c||!c||(st(e,o,!0),r[o]=c)}return r}function sr(e,t,r){if(!t)return r?re(e,"style"):t;const n=e.style;if(typeof t=="string")return n.cssText=t;typeof r=="string"&&(n.cssText=r=void 0),r||(r={}),t||(t={});let i,s;for(s in r)t[s]==null&&n.removeProperty(s),delete r[s];for(s in t)i=t[s],i!==r[s]&&(n.setProperty(s,i),r[s]=i);return r}function or(e,t={},r,n){const i={};return z(()=>typeof t.ref=="function"&&ze(t.ref,e)),z(()=>ar(e,t,r,!0,i,!0)),i}function ze(e,t,r){return se(()=>e(t,r))}function A(e,t,r,n){if(r!==void 0&&!n&&(n=[]),typeof t!="function")return $e(e,t,n,r);z(i=>$e(e,t(),i,r),n)}function ar(e,t,r,n,i={},s=!1){t||(t={});for(const a in i)if(!(a in t)){if(a==="children")continue;i[a]=ot(e,a,null,i[a],r,s,t)}for(const a in t){if(a==="children")continue;const o=t[a];i[a]=ot(e,a,o,i[a],r,s,t)}}function cr(e){return e.toLowerCase().replace(/-([a-z])/g,(t,r)=>r.toUpperCase())}function st(e,t,r){const n=t.trim().split(/\s+/);for(let i=0,s=n.length;i<s;i++)e.classList.toggle(n[i],r)}function ot(e,t,r,n,i,s,a){let o,c,u,f;if(t==="style")return sr(e,r,n);if(t==="classList")return ir(e,r,n);if(r===n)return n;if(t==="ref")s||r(e);else if(t.slice(0,3)==="on:"){const l=t.slice(3);n&&e.removeEventListener(l,n,typeof n!="function"&&n),r&&e.addEventListener(l,r,typeof r!="function"&&r)}else if(t.slice(0,10)==="oncapture:"){const l=t.slice(10);n&&e.removeEventListener(l,n,!0),r&&e.addEventListener(l,r,!0)}else if(t.slice(0,2)==="on"){const l=t.slice(2).toLowerCase(),d=qt.has(l);if(!d&&n){const m=Array.isArray(n)?n[0]:n;e.removeEventListener(l,m)}(d||r)&&(nr(e,l,r,d),d&&ce([l]))}else if(t.slice(0,5)==="attr:")re(e,t.slice(5),r);else if(t.slice(0,5)==="bool:")rr(e,t.slice(5),r);else if((f=t.slice(0,5)==="prop:")||(u=Kt.has(t))||(o=e.nodeName.includes("-")||"is"in a))f&&(t=t.slice(5),c=!0),t==="class"||t==="className"?P(e,r):o&&!c&&!u?e[cr(t)]=r:e[t]=r;else{const l=t.indexOf(":")>-1&&Yt[t.split(":")[0]];l?tr(e,l,t,r):re(e,Xt[t]||t,r)}return r}function lr(e){let t=e.target;const r=`$$${e.type}`,n=e.target,i=e.currentTarget,s=c=>Object.defineProperty(e,"target",{configurable:!0,value:c}),a=()=>{const c=t[r];if(c&&!t.disabled){const u=t[`${r}Data`];if(u!==void 0?c.call(t,u,e):c.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&s(t.host),!0},o=()=>{for(;a()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const c=e.composedPath();s(c[0]);for(let u=0;u<c.length-2&&(t=c[u],!!a());u++){if(t._$host){t=t._$host,o();break}if(t.parentNode===i)break}}else o();s(n)}function $e(e,t,r,n,i){for(;typeof r=="function";)r=r();if(t===r)return r;const s=typeof t,a=n!==void 0;if(e=a&&r[0]&&r[0].parentNode||e,s==="string"||s==="number"){if(s==="number"&&(t=t.toString(),t===r))return r;if(a){let o=r[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),r=K(e,r,n,o)}else r!==""&&typeof r=="string"?r=e.firstChild.data=t:r=e.textContent=t}else if(t==null||s==="boolean")r=K(e,r,n);else{if(s==="function")return z(()=>{let o=t();for(;typeof o=="function";)o=o();r=$e(e,o,r,n)}),()=>r;if(Array.isArray(t)){const o=[],c=r&&Array.isArray(r);if(Ne(o,t,r,i))return z(()=>r=$e(e,o,r,n,!0)),()=>r;if(o.length===0){if(r=K(e,r,n),a)return r}else c?r.length===0?at(e,o,n):Jt(e,r,o):(r&&K(e),at(e,o));r=o}else if(t.nodeType){if(Array.isArray(r)){if(a)return r=K(e,r,n,t);K(e,r,null,t)}else r==null||r===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);r=t}}return r}function Ne(e,t,r,n){let i=!1;for(let s=0,a=t.length;s<a;s++){let o=t[s],c=r&&r[e.length],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=Ne(e,o,c)||i;else if(u==="function")if(n){for(;typeof o=="function";)o=o();i=Ne(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||i}else e.push(o),i=!0;else{const f=String(o);c&&c.nodeType===3&&c.data===f?e.push(c):e.push(document.createTextNode(f))}}return i}function at(e,t,r=null){for(let n=0,i=t.length;n<i;n++)e.insertBefore(t[n],r)}function K(e,t,r,n){if(r===void 0)return e.textContent="";const i=n||document.createTextNode("");if(t.length){let s=!1;for(let a=t.length-1;a>=0;a--){const o=t[a];if(i!==o){const c=o.parentNode===e;!s&&!a?c?e.replaceChild(i,o):e.insertBefore(i,r):c&&o.remove()}else s=!0}}else e.insertBefore(i,r);return[i]}const ur=!1;function fr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function hr(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var dr=(function(){function e(r){var n=this;this._insertTag=function(i){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(i,s),n.tags.push(i)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(hr(this));var i=this.tags[this.tags.length-1];if(this.isSpeedy){var s=fr(i);try{s.insertRule(n,s.cssRules.length)}catch{}}else i.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){var i;return(i=n.parentNode)==null?void 0:i.removeChild(n)}),this.tags=[],this.ctr=0},e})(),V="-ms-",Se="-moz-",$="-webkit-",Pt="comm",Ue="rule",Qe="decl",gr="@import",At="@keyframes",mr="@layer",yr=Math.abs,Be=String.fromCharCode,wr=Object.assign;function pr(e,t){return I(e,0)^45?(((t<<2^I(e,0))<<2^I(e,1))<<2^I(e,2))<<2^I(e,3):0}function Bt(e){return e.trim()}function br(e,t){return(e=t.exec(e))?e[0]:e}function S(e,t,r){return e.replace(t,r)}function je(e,t){return e.indexOf(t)}function I(e,t){return e.charCodeAt(t)|0}function ne(e,t,r){return e.slice(t,r)}function _(e){return e.length}function Ze(e){return e.length}function fe(e,t){return t.push(e),e}function vr(e,t){return e.map(t).join("")}var Ee=1,Y=1,Et=0,N=0,O=0,J="";function Oe(e,t,r,n,i,s,a){return{value:e,root:t,parent:r,type:n,props:i,children:s,line:Ee,column:Y,length:a,return:""}}function ee(e,t){return wr(Oe("",null,null,"",null,null,0),e,{length:-e.length},t)}function xr(){return O}function $r(){return O=N>0?I(J,--N):0,Y--,O===10&&(Y=1,Ee--),O}function j(){return O=N<Et?I(J,N++):0,Y++,O===10&&(Y=1,Ee++),O}function G(){return I(J,N)}function ge(){return N}function le(e,t){return ne(J,e,t)}function ie(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ot(e){return Ee=Y=1,Et=_(J=e),N=0,[]}function Lt(e){return J="",e}function me(e){return Bt(le(N-1,Re(e===91?e+2:e===40?e+1:e)))}function Sr(e){for(;(O=G())&&O<33;)j();return ie(e)>2||ie(O)>3?"":" "}function kr(e,t){for(;--t&&j()&&!(O<48||O>102||O>57&&O<65||O>70&&O<97););return le(e,ge()+(t<6&&G()==32&&j()==32))}function Re(e){for(;j();)switch(O){case e:return N;case 34:case 39:e!==34&&e!==39&&Re(O);break;case 40:e===41&&Re(e);break;case 92:j();break}return N}function Cr(e,t){for(;j()&&e+O!==57;)if(e+O===84&&G()===47)break;return"/*"+le(t,N-1)+"*"+Be(e===47?e:j())}function Pr(e){for(;!ie(G());)j();return le(e,N)}function Ar(e){return Lt(ye("",null,null,null,[""],e=Ot(e),0,[0],e))}function ye(e,t,r,n,i,s,a,o,c){for(var u=0,f=0,l=a,d=0,m=0,g=0,h=1,p=1,y=1,v=0,x="",w=i,M=s,H=n,k=x;p;)switch(g=v,v=j()){case 40:if(g!=108&&I(k,l-1)==58){je(k+=S(me(v),"&","&\f"),"&\f")!=-1&&(y=-1);break}case 34:case 39:case 91:k+=me(v);break;case 9:case 10:case 13:case 32:k+=Sr(g);break;case 92:k+=kr(ge()-1,7);continue;case 47:switch(G()){case 42:case 47:fe(Br(Cr(j(),ge()),t,r),c);break;default:k+="/"}break;case 123*h:o[u++]=_(k)*y;case 125*h:case 59:case 0:switch(v){case 0:case 125:p=0;case 59+f:y==-1&&(k=S(k,/\f/g,"")),m>0&&_(k)-l&&fe(m>32?lt(k+";",n,r,l-1):lt(S(k," ","")+";",n,r,l-2),c);break;case 59:k+=";";default:if(fe(H=ct(k,t,r,u,f,i,o,x,w=[],M=[],l),s),v===123)if(f===0)ye(k,t,H,H,w,s,l,o,M);else switch(d===99&&I(k,3)===110?100:d){case 100:case 108:case 109:case 115:ye(e,H,H,n&&fe(ct(e,H,H,0,0,i,o,x,i,w=[],l),M),i,M,l,o,n?w:M);break;default:ye(k,H,H,H,[""],M,0,o,M)}}u=f=m=0,h=y=1,x=k="",l=a;break;case 58:l=1+_(k),m=g;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&$r()==125)continue}switch(k+=Be(v),v*h){case 38:y=f>0?1:(k+="\f",-1);break;case 44:o[u++]=(_(k)-1)*y,y=1;break;case 64:G()===45&&(k+=me(j())),d=G(),f=l=_(x=k+=Pr(ge())),v++;break;case 45:g===45&&_(k)==2&&(h=0)}}return s}function ct(e,t,r,n,i,s,a,o,c,u,f){for(var l=i-1,d=i===0?s:[""],m=Ze(d),g=0,h=0,p=0;g<n;++g)for(var y=0,v=ne(e,l+1,l=yr(h=a[g])),x=e;y<m;++y)(x=Bt(h>0?d[y]+" "+v:S(v,/&\f/g,d[y])))&&(c[p++]=x);return Oe(e,t,r,i===0?Ue:o,c,u,f)}function Br(e,t,r){return Oe(e,t,r,Pt,Be(xr()),ne(e,2,-2),0)}function lt(e,t,r,n){return Oe(e,t,r,Qe,ne(e,0,n),ne(e,n+1,-1),n)}function q(e,t){for(var r="",n=Ze(e),i=0;i<n;i++)r+=t(e[i],i,e,t)||"";return r}function Er(e,t,r,n){switch(e.type){case mr:if(e.children.length)break;case gr:case Qe:return e.return=e.return||e.value;case Pt:return"";case At:return e.return=e.value+"{"+q(e.children,n)+"}";case Ue:e.value=e.props.join(",")}return _(r=q(e.children,n))?e.return=e.value+"{"+r+"}":""}function Or(e){var t=Ze(e);return function(r,n,i,s){for(var a="",o=0;o<t;o++)a+=e[o](r,n,i,s)||"";return a}}function Lr(e){return function(t){t.root||(t=t.return)&&e(t)}}function Tr(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var Mr=function(t,r,n){for(var i=0,s=0;i=s,s=G(),i===38&&s===12&&(r[n]=1),!ie(s);)j();return le(t,N)},Ir=function(t,r){var n=-1,i=44;do switch(ie(i)){case 0:i===38&&G()===12&&(r[n]=1),t[n]+=Mr(N-1,r,n);break;case 2:t[n]+=me(i);break;case 4:if(i===44){t[++n]=G()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=Be(i)}while(i=j());return t},Vr=function(t,r){return Lt(Ir(Ot(t),r))},ut=new WeakMap,Dr=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,i=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!ut.get(n))&&!i){ut.set(t,!0);for(var s=[],a=Vr(r,s),o=n.props,c=0,u=0;c<a.length;c++)for(var f=0;f<o.length;f++,u++)t.props[u]=s[c]?a[c].replace(/&\f/g,o[f]):o[f]+" "+a[c]}}},Hr=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};function Tt(e,t){switch(pr(e,t)){case 5103:return $+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return $+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return $+e+Se+e+V+e+e;case 6828:case 4268:return $+e+V+e+e;case 6165:return $+e+V+"flex-"+e+e;case 5187:return $+e+S(e,/(\w+).+(:[^]+)/,$+"box-$1$2"+V+"flex-$1$2")+e;case 5443:return $+e+V+"flex-item-"+S(e,/flex-|-self/,"")+e;case 4675:return $+e+V+"flex-line-pack"+S(e,/align-content|flex-|-self/,"")+e;case 5548:return $+e+V+S(e,"shrink","negative")+e;case 5292:return $+e+V+S(e,"basis","preferred-size")+e;case 6060:return $+"box-"+S(e,"-grow","")+$+e+V+S(e,"grow","positive")+e;case 4554:return $+S(e,/([^-])(transform)/g,"$1"+$+"$2")+e;case 6187:return S(S(S(e,/(zoom-|grab)/,$+"$1"),/(image-set)/,$+"$1"),e,"")+e;case 5495:case 3959:return S(e,/(image-set\([^]*)/,$+"$1$`$1");case 4968:return S(S(e,/(.+:)(flex-)?(.*)/,$+"box-pack:$3"+V+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+$+e+e;case 4095:case 3583:case 4068:case 2532:return S(e,/(.+)-inline(.+)/,$+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(_(e)-1-t>6)switch(I(e,t+1)){case 109:if(I(e,t+4)!==45)break;case 102:return S(e,/(.+:)(.+)-([^]+)/,"$1"+$+"$2-$3$1"+Se+(I(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~je(e,"stretch")?Tt(S(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(I(e,t+1)!==115)break;case 6444:switch(I(e,_(e)-3-(~je(e,"!important")&&10))){case 107:return S(e,":",":"+$)+e;case 101:return S(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+$+(I(e,14)===45?"inline-":"")+"box$3$1"+$+"$2$3$1"+V+"$2box$3")+e}break;case 5936:switch(I(e,t+11)){case 114:return $+e+V+S(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return $+e+V+S(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return $+e+V+S(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return $+e+V+e+e}return e}var zr=function(t,r,n,i){if(t.length>-1&&!t.return)switch(t.type){case Qe:t.return=Tt(t.value,t.length);break;case At:return q([ee(t,{value:S(t.value,"@","@"+$)})],i);case Ue:if(t.length)return vr(t.props,function(s){switch(br(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return q([ee(t,{props:[S(s,/:(read-\w+)/,":"+Se+"$1")]})],i);case"::placeholder":return q([ee(t,{props:[S(s,/:(plac\w+)/,":"+$+"input-$1")]}),ee(t,{props:[S(s,/:(plac\w+)/,":"+Se+"$1")]}),ee(t,{props:[S(s,/:(plac\w+)/,V+"input-$1")]})],i)}return""})}},Nr=[zr],jr=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(h){var p=h.getAttribute("data-emotion");p.indexOf(" ")!==-1&&(document.head.appendChild(h),h.setAttribute("data-s",""))})}var i=t.stylisPlugins||Nr,s={},a,o=[];a=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(h){for(var p=h.getAttribute("data-emotion").split(" "),y=1;y<p.length;y++)s[p[y]]=!0;o.push(h)});var c,u=[Dr,Hr];{var f,l=[Er,Lr(function(h){f.insert(h)})],d=Or(u.concat(i,l)),m=function(p){return q(Ar(p),d)};c=function(p,y,v,x){f=v,m(p?p+"{"+y.styles+"}":y.styles),x&&(g.inserted[y.name]=!0)}}var g={key:r,sheet:new dr({key:r,container:a,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:c};return g.sheet.hydrate(o),g};function Rr(e){for(var t=0,r,n=0,i=e.length;i>=4;++n,i-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(i){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var _r={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Gr=/[A-Z]|^ms/g,Fr=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Mt=function(t){return t.charCodeAt(1)===45},ft=function(t){return t!=null&&typeof t!="boolean"},Me=Tr(function(e){return Mt(e)?e:e.replace(Gr,"-$&").toLowerCase()}),ht=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(Fr,function(n,i,s){return U={name:i,styles:s,next:U},i})}return _r[t]!==1&&!Mt(t)&&typeof r=="number"&&r!==0?r+"px":r};function ke(e,t,r){if(r==null)return"";var n=r;if(n.__emotion_styles!==void 0)return n;switch(typeof r){case"boolean":return"";case"object":{var i=r;if(i.anim===1)return U={name:i.name,styles:i.styles,next:U},i.name;var s=r;if(s.styles!==void 0){var a=s.next;if(a!==void 0)for(;a!==void 0;)U={name:a.name,styles:a.styles,next:U},a=a.next;var o=s.styles+";";return o}return Wr(e,t,r)}}var c=r;if(t==null)return c;var u=t[c];return u!==void 0?u:c}function Wr(e,t,r){var n="";if(Array.isArray(r))for(var i=0;i<r.length;i++)n+=ke(e,t,r[i])+";";else for(var s in r){var a=r[s];if(typeof a!="object"){var o=a;t!=null&&t[o]!==void 0?n+=s+"{"+t[o]+"}":ft(o)&&(n+=Me(s)+":"+ht(s,o)+";")}else if(Array.isArray(a)&&typeof a[0]=="string"&&(t==null||t[a[0]]===void 0))for(var c=0;c<a.length;c++)ft(a[c])&&(n+=Me(s)+":"+ht(s,a[c])+";");else{var u=ke(e,t,a);switch(s){case"animation":case"animationName":{n+=Me(s)+":"+u+";";break}default:n+=s+"{"+u+"}"}}}return n}var dt=/label:\s*([^\s;{]+)\s*(;|$)/g,U;function Ie(e,t,r){if(e.length===1&&typeof e[0]=="object"&&e[0]!==null&&e[0].styles!==void 0)return e[0];var n=!0,i="";U=void 0;var s=e[0];if(s==null||s.raw===void 0)n=!1,i+=ke(r,t,s);else{var a=s;i+=a[0]}for(var o=1;o<e.length;o++)if(i+=ke(r,t,e[o]),n){var c=s;i+=c[o]}dt.lastIndex=0;for(var u="",f;(f=dt.exec(i))!==null;)u+="-"+f[1];var l=Rr(i)+u;return{name:l,styles:i,next:U}}function It(e,t,r){var n="";return r.split(" ").forEach(function(i){e[i]!==void 0?t.push(e[i]+";"):i&&(n+=i+" ")}),n}var Ur=function(t,r,n){var i=t.key+"-"+r.name;t.registered[i]===void 0&&(t.registered[i]=r.styles)},Qr=function(t,r,n){Ur(t,r);var i=t.key+"-"+r.name;if(t.inserted[r.name]===void 0){var s=r;do t.insert(r===s?"."+i:"",s,t.sheet,!0),s=s.next;while(s!==void 0)}};function gt(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function mt(e,t,r){var n=[],i=It(e,n,r);return n.length<2?r:i+t(n)}var Zr=function(t){var r=jr(t);r.sheet.speedy=function(o){this.isSpeedy=o},r.compat=!0;var n=function(){for(var c=arguments.length,u=new Array(c),f=0;f<c;f++)u[f]=arguments[f];var l=Ie(u,r.registered,void 0);return Qr(r,l),r.key+"-"+l.name},i=function(){for(var c=arguments.length,u=new Array(c),f=0;f<c;f++)u[f]=arguments[f];var l=Ie(u,r.registered),d="animation-"+l.name;return gt(r,{name:l.name,styles:"@keyframes "+d+"{"+l.styles+"}"}),d},s=function(){for(var c=arguments.length,u=new Array(c),f=0;f<c;f++)u[f]=arguments[f];var l=Ie(u,r.registered);gt(r,l)},a=function(){for(var c=arguments.length,u=new Array(c),f=0;f<c;f++)u[f]=arguments[f];return mt(r.registered,n,Kr(u))};return{css:n,cx:a,injectGlobal:s,keyframes:i,hydrate:function(c){c.forEach(function(u){r.inserted[u]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:It.bind(null,r.registered),merge:mt.bind(null,r.registered,n)}},Kr=function e(t){for(var r="",n=0;n<t.length;n++){var i=t[n];if(i!=null){var s=void 0;switch(typeof i){case"boolean":break;case"object":{if(Array.isArray(i))s=e(i);else{s="";for(var a in i)i[a]&&a&&(s&&(s+=" "),s+=a)}break}default:s=i}s&&(r&&(r+=" "),r+=s)}}return r},Xr=Zr({key:"css"}),B=Xr.css,qr=R("<svg stroke-width=0>");function Z(e,t){const r=rt(e.a,t),[n,i]=Zt(r,["src"]),[s,a]=W(""),o=Ae(()=>t.title?`${e.c}<title>${t.title}</title>`:e.c);return Ge(()=>a(o())),Fe(()=>{a("")}),(()=>{var c=qr();return or(c,rt({get stroke(){return e.a?.stroke},get color(){return t.color||"currentColor"},get fill(){return t.color||"currentColor"},get style(){return{...t.style,overflow:"visible"}}},i,{get height(){return t.size||"1em"},get width(){return t.size||"1em"},xmlns:"http://www.w3.org/2000/svg",get innerHTML(){return s()}}),!0),A(c,()=>ur),c})()}function Yr(e){return Z({a:{viewBox:"0 0 496 512"},c:'<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>'},e)}function Jr(e){return Z({a:{viewBox:"0 0 320 512"},c:'<path d="M2 334.5c-3.8 8.8-2 19 4.6 26l136 144c4.5 4.8 10.8 7.5 17.4 7.5s12.9-2.7 17.4-7.5l136-144c6.6-7 8.4-17.2 4.6-26S305.5 320 296 320h-72V32c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v288H24c-9.6 0-18.2 5.7-22 14.5z"/>'},e)}function en(e){return Z({a:{viewBox:"0 0 512 512"},c:'<path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6S320 110.5 320 120v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h288v72c0 9.6 5.7 18.2 14.5 22z"/>'},e)}function tn(e){return Z({a:{viewBox:"0 0 640 512"},c:'<path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z"/>'},e)}function rn(e){return Z({a:{viewBox:"0 0 576 512"},c:'<path d="M192 32c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v128l44.4 14.8c23.1 7.7 29.5 37.5 11.5 53.9l-101 92.6c-16.2 9.4-34.7 15.1-50.9 15.1-19.6 0-40.8-7.7-59.2-20.3-22.1-15.5-51.6-15.5-73.7 0-17.1 11.8-38 20.3-59.2 20.3-16.2 0-34.7-5.7-50.9-15.1L40 308.7c-18-16.5-11.6-46.2 11.5-53.9L96 240V112c0-26.5 21.5-48 48-48h48V32zm-32 186.7 107.8-35.9c13.1-4.4 27.3-4.4 40.5 0L416 218.7V128H160v90.7zm146.5 203.2c22.5 15.5 50 26.1 77.5 26.1 26.9 0 55.4-10.8 77.4-26.1 11.9-8.5 28.1-7.8 39.2 1.7 14.4 11.9 32.5 21 50.6 25.2 17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25-29 15.6-61.5 25.9-94.5 25.9-31.9 0-60.6-9.9-80.4-18.9-5.8-2.7-11.1-5.3-15.6-7.7-4.5 2.4-9.7 5.1-15.6 7.7-19.8 9-48.5 18.9-80.4 18.9-33 0-65.5-10.3-94.5-25.8-13.4 8.4-33.7 19.3-58.2 25-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2 11.1-9.4 27.3-10.1 39.2-1.7 22.1 15.2 50.5 26 77.4 26 27.5 0 55-10.6 77.5-26.1 11.1-7.9 25.9-7.9 37 0z"/>'},e)}function Vt(e){return Z({a:{viewBox:"0 0 448 512"},c:'<path d="M224 256a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z"/>'},e)}const b={primary:"#60a5fa",secondary:"#f8fafc",ship:"#334155",hover:"#cbd5e1",grid:"#1e293b",emptyHit:"#10b981",shipHit:"#f59e0b",shipSunk:"#f43f5e",outOfBounds:"#fda4af"},T={sm:"@media (min-width: 40rem)",md:"@media (min-width: 48rem)",lg:"@media (min-width: 64rem)",mouse:"@media (hover: hover)"};var nn=R('<footer>© 2023 - 2025<a title=Source target=_blank type=text/html rel="noreferrer external author"href=https://github.com/eldarlrd/ts-battleship> eldarlrd');const sn=()=>(()=>{var e=nn(),t=e.firstChild,r=t.nextSibling,n=r.firstChild;return A(r,C(Yr,{}),n),z(i=>{var s=B`
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 1rem;
      gap: 0.5rem;
    `,a=B`
        border-radius: 0.125rem;
        text-decoration: none;
        color: inherit;
        transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

        &:active {
          color: ${b.grid};
        }

        ${T.mouse} {
          &:hover {
            color: ${b.grid};
          }
        }

        svg {
          vertical-align: top;
        }
      `;return s!==i.e&&P(e,i.e=s),a!==i.t&&P(r,i.t=a),i},{e:void 0,t:void 0}),e})();var on=R("<header>TS Battleship");const an=()=>(()=>{var e=on();return z(()=>P(e,B`
      font-size: 2.5rem;
      font-weight: 600;
      margin: 1rem;
    `)),e})();class yt{grid;impacts;shipsPlaced;constructor(){this.grid=Array.from({length:10},()=>Array(10).fill(null)),this.impacts=[],this.shipsPlaced=0}place(t,r,n){if(!this.isPlaceable(t,r,n))return!1;const{row:i,col:s}=r,a=n?1:0;for(let o=0;o<t.length;o++)this.grid[i+o*a][s+o*(1-a)]=t;return!0}fire(t){const{row:r,col:n}=t,i=this.grid[r][n];return this.impacts.some(a=>a.row===r&&a.col===n)?!1:(i?(i.hit(),this.impacts.push(t)):this.impacts.push(t),!0)}hitAdjacent(t){return this.getAdjacent(t).filter(r=>{const{row:n,col:i}=r;return this.grid[n][i]===null?(this.fire(r),!0):!1})}isGameOver(){return this.grid.flat().filter(t=>t!==null).every(t=>t.sunk)}isPlaceable(t,r,n){const{row:i,col:s}=r,a=n?1:0;for(let o=0;o<t.length;o++){const c=i+o*a,u=s+o*(1-a);if(c<0||c>=10||u<0||u>=10||this.grid[c][u]!==null||this.isAdjacent(c,u))return!1}return!0}getAdjacent(t){const{row:r,col:n}=t;return[{row:-1,col:0},{row:1,col:0},{row:0,col:-1},{row:0,col:1},{row:-1,col:-1},{row:-1,col:1},{row:1,col:-1},{row:1,col:1}].map(s=>({row:r+s.row,col:n+s.col})).filter(s=>s.row>=0&&s.row<this.grid.length&&s.col>=0&&s.col<this.grid[0].length)}isAdjacent(t,r){return this.getAdjacent({row:t,col:r}).some(n=>this.grid[n.row][n.col]!==null)}}const cn="/ts-battleship/assets/ship-hit-CyPyMOYX.opus",ln="/ts-battleship/assets/ship-sunk-BM6d-FLc.opus";class X{length;sunk;coords;isVertical;hits;constructor(t=2){this.length=t,this.sunk=!1,this.coords={row:0,col:0},this.isVertical=!1,this.hits=0}hit(){this.sunk||(this.hits++,this.isSunk())}isSunk(){const t=new Audio(cn);this.hits===this.length?(this.sunk=!0,new Audio(ln).play()):t.play()}}class Ce{playerVictorious;playerBoard;computerBoard;isCurrPlayerOne;targetMode;targetQueue;hitHistory;currentDirection;remainingShipLengths;useParity;parityOffset;constructor(t=!1){this.playerVictorious=0,this.playerBoard=new yt,this.computerBoard=new yt,t&&this.randomPlace(this.playerBoard),this.randomPlace(this.computerBoard),this.isCurrPlayerOne=!0,this.targetMode=!1,this.targetQueue=[],this.hitHistory=[],this.currentDirection=null,this.remainingShipLengths=[5,4,3,3,2],this.useParity=!0,this.parityOffset=Math.random()<.5?0:1}takeTurn(t){return(this.isCurrPlayerOne?this.computerBoard:this.playerBoard).fire(t)?(this.checkVictory(),this.isCurrPlayerOne=!this.isCurrPlayerOne,!0):!1}computerTurn(){return this.targetMode?this.smartTarget():this.hitWithHeatmap()}successfullyPlace(t,r,n,i=0,s=0,a=!1){let o;if(n){let c=Math.random()<.5;for(o={row:~~(Math.random()*10),col:~~(Math.random()*10)};!t.place(r,o,c);)c=Math.random()<.5,o={row:~~(Math.random()*10),col:~~(Math.random()*10)};r.isVertical=c}else{if(o={row:i,col:s},!t.place(r,o,a))return!1;r.isVertical=a}return r.coords=o,t.place(r,o,r.isVertical),!0}generateHeatmap(){const t=Array.from({length:10},()=>Array(10).fill(0)),r=n=>Math.pow(n,1.5);for(const n of this.remainingShipLengths){const i=r(n);for(let s=0;s<10;s++)for(let a=0;a<=10-n;a++)if(this.canPlaceShip(s,a,n,!1))for(let o=0;o<n;o++)t[s][a+o]+=i;for(let s=0;s<=10-n;s++)for(let a=0;a<10;a++)if(this.canPlaceShip(s,a,n,!0))for(let o=0;o<n;o++)t[s+o][a]+=i}return t}canPlaceShip(t,r,n,i){for(let s=0;s<n;s++){const a=i?t+s:t,o=i?r:r+s;if(this.playerBoard.impacts.some(u=>u.row===a&&u.col===o)&&this.playerBoard.grid[a][o]===null)return!1}return!0}matchesParity(t){return(t.row+t.col)%2===this.parityOffset}hitWithHeatmap(){const t=this.generateHeatmap();let r=-1;const n=[];Math.min(...this.remainingShipLengths)>2&&(this.useParity=!1);for(let o=0;o<10;o++)for(let c=0;c<10;c++){const u={row:o,col:c};this.useParity&&!this.matchesParity(u)||this.isValidTarget(u)&&(t[o][c]>r?(r=t[o][c],n.length=0,n.push(u)):t[o][c]===r&&n.push(u))}if(n.length===0&&this.useParity)return this.useParity=!1,this.hitWithHeatmap();const s=n[~~(Math.random()*n.length)]||this.getRandomValidTarget();this.takeTurn(s);const a=this.playerBoard.grid[s.row][s.col];return a!==null&&!a.sunk&&(this.targetMode=!0,this.useParity=!1,this.hitHistory.push(s),this.addCardinalDirections(s)),s}getRandomValidTarget(){let t;do t={row:~~(Math.random()*10),col:~~(Math.random()*10)};while(!this.isValidTarget(t));return t}smartTarget(){let t=null;for(;this.targetQueue.length>0;){const n=this.targetQueue.shift();if(this.isValidTarget(n)){t=n;break}}if(t===null){if(this.currentDirection!==null&&this.hitHistory.length>0)for(this.reverseDirection();this.targetQueue.length>0;){const n=this.targetQueue.shift();if(this.isValidTarget(n)){t=n;break}}if(t===null)return this.resetTargetMode(),this.hitWithHeatmap()}const r=this.playerBoard.grid[t.row][t.col];if(this.takeTurn(t),r!==null)if(this.hitHistory.push(t),r.sunk){const n=r.length,i=this.remainingShipLengths.indexOf(n);i>-1&&this.remainingShipLengths.splice(i,1),this.resetTargetMode()}else this.updateTargetStrategy(t);else this.currentDirection!==null&&this.hitHistory.length>0&&this.reverseDirection();return t}updateTargetStrategy(t){if(this.hitHistory.length===1)this.addCardinalDirections(t);else if(this.hitHistory.length===2){const r=this.hitHistory[0],n=this.hitHistory[1];r.row===n.row?this.currentDirection={row:0,col:n.col>r.col?1:-1}:this.currentDirection={row:n.row>r.row?1:-1,col:0},this.targetQueue=[],this.continueInDirection(t)}else this.continueInDirection(t)}addCardinalDirections(t){const r=[{row:-1,col:0},{row:1,col:0},{row:0,col:-1},{row:0,col:1}];this.targetQueue=r.map(n=>({row:t.row+n.row,col:t.col+n.col})).filter(n=>this.isValidTarget(n))}continueInDirection(t){if(this.currentDirection===null)return;const r={row:t.row+this.currentDirection.row,col:t.col+this.currentDirection.col};this.isValidTarget(r)&&this.targetQueue.unshift(r)}reverseDirection(){if(this.currentDirection===null||this.hitHistory.length===0)return;this.currentDirection={row:-this.currentDirection.row,col:-this.currentDirection.col};let r={...this.hitHistory[0]};for(this.targetQueue=[];r={row:r.row+this.currentDirection.row,col:r.col+this.currentDirection.col},!!this.isValidTarget(r);)this.targetQueue.push({...r})}isValidTarget(t){const{row:r,col:n}=t;return r<0||r>=10||n<0||n>=10?!1:!this.playerBoard.impacts.some(i=>i.row===r&&i.col===n)}resetTargetMode(){if(this.targetMode=!1,this.targetQueue=[],this.hitHistory=[],this.currentDirection=null,this.remainingShipLengths.length>0){const t=Math.min(...this.remainingShipLengths);this.useParity=t===2}}randomPlace(t,r=!0){const n=new X(5),i=new X(4),s=new X(3),a=new X(3),o=new X(2);this.successfullyPlace(t,n,r),this.successfullyPlace(t,i,r),this.successfullyPlace(t,s,r),this.successfullyPlace(t,a,r),this.successfullyPlace(t,o,r)}checkVictory(){if(this.playerBoard.isGameOver())return this.playerVictorious=2,!0;if(this.computerBoard.isGameOver())return this.playerVictorious=1,!0}}var un=R("<button type=button>New Game");const Dt=e=>(()=>{var t=un();return t.$$click=()=>{e.setGame(new Ce),e.setIsControlUp(!0),e.overlay&&(e.overlay.style.display="none")},z(()=>P(t,B`
      border: 0;
      border-radius: 0.125rem;
      cursor: pointer;
      font-size: 1.5rem;
      font-weight: 500;
      padding: 0.75rem;
      min-width: 7.625rem;
      background: ${b.secondary};
      color: ${b.grid};
      outline: 2px solid ${b.grid};
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

      &:active {
        background: ${b.hover};
      }

      ${T.mouse} {
        &:hover {
          background: ${b.hover};
        }
      }
    `)),t})();ce(["click"]);function fn(e){return Z({a:{viewBox:"0 0 512 512"},c:'<path d="M440.88 129.37 288.16 40.62a64.14 64.14 0 0 0-64.33 0L71.12 129.37a4 4 0 0 0 0 6.9L254 243.85a4 4 0 0 0 4.06 0L440.9 136.27a4 4 0 0 0-.02-6.9ZM256 152c-13.25 0-24-7.16-24-16s10.75-16 24-16 24 7.16 24 16-10.75 16-24 16ZM238 270.81 54 163.48a4 4 0 0 0-6 3.46v173.92a48 48 0 0 0 23.84 41.39L234 479.48a4 4 0 0 0 6-3.46V274.27a4 4 0 0 0-2-3.46ZM96 368c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm96-32c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24ZM458 163.51 274 271.56a4 4 0 0 0-2 3.45V476a4 4 0 0 0 6 3.46l162.15-97.23A48 48 0 0 0 464 340.86V167a4 4 0 0 0-6-3.49ZM320 424c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm96 32c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Z"/>'},e)}function hn(e){return Z({a:{viewBox:"0 0 512 512"},c:'<rect width="448" height="80" x="32" y="48" rx="32" ry="32"/><path d="M74.45 160a8 8 0 0 0-8 8.83l26.31 252.56a1.5 1.5 0 0 0 0 .22A48 48 0 0 0 140.45 464h231.09a48 48 0 0 0 47.67-42.39v-.21l26.27-252.57a8 8 0 0 0-8-8.83Zm248.86 180.69a16 16 0 1 1-22.63 22.62L256 318.63l-44.69 44.68a16 16 0 0 1-22.63-22.62L233.37 296l-44.69-44.69a16 16 0 0 1 22.63-22.62L256 273.37l44.68-44.68a16 16 0 0 1 22.63 22.62L278.62 296Z"/>'},e)}const dn="/ts-battleship/assets/new-game-BcxqpOfL.opus";var gn=R("<button type=button>");const Ve=e=>(()=>{var t=gn();return t.$$click=()=>{e.handleAction()},A(t,()=>e.icon),z(r=>{var n=e.title,i=B`
      border: 0;
      border-radius: 0.125rem;
      cursor: pointer;
      font-size: 1.375rem;
      font-weight: 500;
      line-height: 1rem;
      padding: 0.5rem;
      background: ${b.secondary};
      color: ${b.grid};
      outline: 2px solid ${b.grid};
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

      &:active {
        background: ${b.hover};
      }

      ${T.mouse} {
        &:hover {
          background: ${b.hover};
        }
      }

      ${T.md} {
        font-size: 1.5rem;
        padding: 0.75rem;
      }

      ${T.lg} {
        font-size: 1.625rem;
      }
    `;return n!==r.e&&re(t,"title",r.e=n),i!==r.t&&P(t,r.t=i),r},{e:void 0,t:void 0}),t})();ce(["click"]);const mn=["5 Carrier","4 Battleship","3 Destroyer","3 Submarine","2 Patrol Boat"];var yn=R("<section>"),wn=R("<button type=button>");const _e=e=>{const t=(s,a)=>{if(e.game.playerBoard.shipsPlaced>=5)return;const c=[5,4,3,3,2][e.game.playerBoard.shipsPlaced],u=new X(c);if(e.game.successfullyPlace(e.game.playerBoard,u,!1,s,a,e.isVertical)){const f=e.isPlayerBoard?"p1-":"p2-",l=e.game.playerBoard.grid[s][a];if(l)for(let d=0;d<l.length;d++){const m=l.isVertical?l.coords.row+d:s,g=l.isVertical?a:l.coords.col+d,h=document.getElementById(f+(m*10+g).toString());h&&(h.style.backgroundColor=b.ship,h.style.cursor="default")}e.game.playerBoard.shipsPlaced++,e.game.playerBoard.shipsPlaced>=5&&e.startButton&&(e.startButton.disabled=!1),e.shipInfo&&(e.shipInfo.innerText=e.game.playerBoard.shipsPlaced>=5?"All Ships Ready!":mn[e.game.playerBoard.shipsPlaced])}},r=(s,a)=>{if(e.game.playerVictorious)return;e.game.takeTurn({row:s,col:a})&&(n(s,a),document.dispatchEvent(new Event("attack")),e.game.playerVictorious||setTimeout(()=>{const u=e.game.computerTurn();n(u.row,u.col),document.dispatchEvent(new Event("attack"))},150))},n=(s,a)=>{const o=e.game.isCurrPlayerOne?"p1-":"p2-",c=e.game.isCurrPlayerOne?e.game.playerBoard:e.game.computerBoard,u=document.getElementById(o+(s*10+a).toString());c.impacts.forEach(f=>{const{row:l,col:d}=f,m=c.grid[l][d];if(!m)c.impacts.some(g=>g.row===s&&g.col===a)&&u&&(u.style.backgroundColor=b.emptyHit,u.style.cursor="default");else if(c.impacts.some(g=>g.row===s&&g.col===a)&&u){if(m.sunk)for(let g=0;g<m.length;g++){const h=m.isVertical?m.coords.row+g:l,p=m.isVertical?d:m.coords.col+g,y=document.getElementById(o+(h*10+p).toString());y&&(y.style.backgroundColor=b.shipSunk,c.hitAdjacent({row:h,col:p}).forEach(x=>{const w=document.getElementById(o+(x.row*10+x.col).toString());w&&(w.style.backgroundColor=b.emptyHit,w.style.cursor="default")}))}else u.style.backgroundColor=b.shipHit;u.style.cursor="default"}})},i=(s,a,o)=>{if(!e.isPlacing||!e.isPlayerBoard||e.game.playerBoard.shipsPlaced>=5)return;const u=[5,4,3,3,2][e.game.playerBoard.shipsPlaced],f="p1-";let l=!0;const d=[],m=[];for(let h=0;h<u;h++){const p=e.isVertical?s+h:s,y=e.isVertical?a:a+h;m.push({row:p,col:y})}for(const h of m){if(h.row>=10||h.col>=10){l=!1;break}if(e.game.playerBoard.grid[h.row][h.col]){l=!1;break}for(let p=h.row-1;p<=h.row+1;p++){for(let y=h.col-1;y<=h.col+1;y++)if(!(p===h.row&&y===h.col||p<0||p>=10||y<0||y>=10||m.some(x=>x.row===p&&x.col===y))&&e.game.playerBoard.grid[p][y]){l=!1;break}if(!l)break}if(!l)break}for(const h of m)if(h.row<10&&h.col<10){const p=f+(h.row*10+h.col).toString(),y=document.getElementById(p);y&&d.push(y)}const g=l?"valid":"invalid";d.forEach(h=>{o?h.dataset.shipHover=g:delete h.dataset.shipHover})};return(()=>{var s=yn();return A(s,C(nt,{get each(){return e.game.playerBoard.grid},children:(a,o)=>C(nt,{each:a,children:(c,u)=>(()=>{var f=wn();return f.addEventListener("mouseleave",()=>{i(o(),u(),!1)}),f.addEventListener("mouseenter",()=>{i(o(),u(),!0)}),f.$$click=()=>{e.isPlacing&&e.game.playerBoard.shipsPlaced<5&&t(o(),u()),e.isPlayerBoard||r(o(),u())},z(l=>{var d=`${e.isPlayerBoard?"p1-":"p2-"}${(o()*10+u()).toString()}`,m=B`
                  background: ${c&&e.isPlayerBoard?b.ship:b.secondary};
                  border: 1px solid ${b.grid};
                  padding: ${e.isPlacing?"14.5px":"15.5px"};
                  text-align: center;
                  cursor: ${(!e.isPlayerBoard||e.isPlacing&&!c)&&"pointer"};

                  &[data-ship-hover='valid'] {
                    background: ${b.hover};
                  }

                  &[data-ship-hover='invalid'] {
                    background: ${b.outOfBounds};
                  }

                  ${T.mouse} {
                    &:hover {
                      background: ${!e.isPlayerBoard&&b.hover};
                    }
                  }

                  ${T.sm} {
                    padding: ${e.isPlacing?"16.5px":"13.5px"};
                  }

                  ${T.md} {
                    padding: ${e.isPlacing?"18.5px":"16.5px"};
                  }

                  ${T.lg} {
                    padding: 1.25rem;
                  }
                `;return d!==l.e&&re(f,"id",l.e=d),m!==l.t&&P(f,l.t=m),l},{e:void 0,t:void 0}),f})()})})),z(()=>P(s,B`
        font-size: 2.5rem;
        font-weight: 600;
        display: grid;
        border: 1px solid ${b.grid};
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(10, 1fr);
        position: relative;
      `)),s})()};ce(["click"]);var pn=R("<div id=controls><section><h1>New Game</h1><span> Player</span><div id=panel><span id=ship-selection><span id=ship-info>5 Carrier</span></span><span></span></div><button type=button id=start-button>Start");const bn=e=>{const[t,r]=W(!1),[n,i]=W(!1),[s,a]=W([]),[o,c]=W([]),u=new Audio(dn);return Ge(()=>{a(document.getElementById("ship-info")),c(document.getElementById("start-button"))}),(()=>{var f=pn(),l=f.firstChild,d=l.firstChild,m=d.nextSibling,g=m.firstChild,h=m.nextSibling,p=h.firstChild,y=p.firstChild,v=p.nextSibling,x=h.nextSibling;return A(m,C(Vt,{}),g),A(l,C(_e,{isPlayerBoard:!0,isPlacing:!0,get isVertical(){return n()},get game(){return e.game},get shipInfo(){return s()},get startButton(){return o()}}),h),A(p,C(rn,{}),y),A(v,C(Ve,{handleAction:()=>{i(w=>!w)},get icon(){return He(()=>!!n())()?C(Jr,{}):C(en,{})},title:"Rotate"}),null),A(v,C(Ve,{handleAction:()=>{e.setGame(new Ce(!0)),e.game.playerBoard.shipsPlaced=5,r(!0),s().innerText="All Ships Ready!"},get icon(){return C(fn,{})},title:"Randomize"}),null),A(v,C(Ve,{handleAction:()=>{e.setGame(new Ce),r(!1),s().innerText="5 Carrier",o().disabled=!0},get icon(){return C(hn,{})},title:"Clear"}),null),x.$$click=()=>{e.setIsControlUp(!1),u.play().catch(w=>{w instanceof Error&&console.error(w)})},z(w=>{var M=B`
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      `,H=B`
          display: inherit;
          flex-direction: column;
          padding: 1rem;
          margin: 1rem;
          gap: 0.75rem;
          line-height: 1rem;
          background: ${b.primary};
          border: 2px solid ${b.secondary};
          border-radius: 0.125rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        `,k=B`
            text-align: center;
          `,Ke=B`
            font-size: 1.75rem;

            svg {
              font-size: 1.25rem;
            }
          `,Xe=B`
            display: inherit;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
          `,qe=B`
              font-size: 1.5rem;

              svg {
                font-size: 1rem;
                padding-right: 0.375rem;
              }

              ${T.md} {
                font-size: 1.625rem;

                svg {
                  font-size: 1.125rem;
                }
              }

              ${T.lg} {
                font-size: 1.75rem;

                svg {
                  font-size: 1.25rem;
                }
              }
            `,Ye=B`
              display: inherit;
              gap: 0.5rem;
            `,Je=!t(),et=B`
            border: 0;
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight: 500;
            min-width: 7.625rem;
            padding: 0.5rem;
            background: ${b.secondary};
            color: ${b.grid};
            outline: 2px solid ${b.grid};
            transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

            &:active {
              background: ${b.hover};
            }

            ${T.mouse} {
              &:hover {
                background: ${b.hover};
              }
            }

            &:disabled {
              cursor: not-allowed;
              background: ${b.hover};
            }

            ${T.md} {
              padding: 0.75rem;
            }
          `;return M!==w.e&&P(f,w.e=M),H!==w.t&&P(l,w.t=H),k!==w.a&&P(d,w.a=k),Ke!==w.o&&P(m,w.o=Ke),Xe!==w.i&&P(h,w.i=Xe),qe!==w.n&&P(p,w.n=qe),Ye!==w.s&&P(v,w.s=Ye),Je!==w.h&&(x.disabled=w.h=Je),et!==w.r&&P(x,w.r=et),w},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0}),f})()};ce(["click"]);const vn="/ts-battleship/assets/defeat-C87Eyhy9.opus",xn="/ts-battleship/assets/victory-Dc23dmXs.opus";var $n=R("<div id=overlay><section><h1 id=victor>");let he=document.getElementById("victor");const Sn=e=>{const t=new Audio(xn),r=new Audio(vn),n=i=>{i.play().catch(s=>{s instanceof Error&&console.error(s)})};return Ge(()=>{const i=()=>{e.game.playerVictorious&&(e.overlay.style.display="flex",e.game.playerVictorious===1?(he.innerText="Player Wins!",n(t)):(he.innerText="Computer Wins...",n(r)))};document.addEventListener("attack",i),Fe(()=>{document.removeEventListener("attack",i)})}),(()=>{var i=$n(),s=i.firstChild,a=s.firstChild,o=e.overlay;typeof o=="function"?ze(o,i):e.overlay=i;var c=he;return typeof c=="function"?ze(c,a):he=a,A(a,()=>e.game.playerVictorious),A(s,C(Dt,{get setGame(){return e.setGame},get setIsControlUp(){return e.setIsControlUp},get overlay(){return e.overlay}}),null),z(u=>{var f=B`
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        justify-content: center;
        align-items: center;
        z-index: 1;
      `,l=B`
          display: inherit;
          flex-direction: column;
          padding: 1rem;
          margin: 1rem;
          gap: 0.75rem;
          line-height: 1rem;
          background: ${b.primary};
          border: 2px solid ${b.secondary};
          border-radius: 0.125rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

          ${T.sm} {
            padding: 3rem;
          }

          ${T.md} {
            padding: 4rem;
          }

          ${T.lg} {
            padding: 5rem;
          }
        `,d=B`
            font-size: 2.5rem;
            text-align: center;
            line-height: 1em;
          `;return f!==u.e&&P(i,u.e=f),l!==u.t&&P(s,u.t=l),d!==u.a&&P(a,u.a=d),u},{e:void 0,t:void 0,a:void 0}),i})()};var kn=R("<div id=app>"),Cn=R("<main><div><span><span> Player</span></span><span><span> Computer");let Pn=document.getElementById("overlay");const An=()=>{const[e,t]=W(new Ce),[r,n]=W(!0);return(()=>{var i=kn();return A(i,C(Sn,{get game(){return e()},setGame:t,setIsControlUp:n,overlay:Pn}),null),A(i,C(an,{}),null),A(i,(()=>{var s=He(()=>!!r());return()=>s()&&C(bn,{get game(){return e()},setGame:t,setIsControlUp:n})})(),null),A(i,(()=>{var s=He(()=>!r());return()=>s()&&(()=>{var a=Cn(),o=a.firstChild,c=o.firstChild,u=c.firstChild,f=u.firstChild,l=c.nextSibling,d=l.firstChild,m=d.firstChild;return A(u,C(Vt,{}),f),A(c,C(_e,{isPlayerBoard:!0,isPlacing:!1,isVertical:!1,get game(){return e()}}),null),A(d,C(tn,{}),m),A(l,C(_e,{isPlayerBoard:!1,isPlacing:!1,isVertical:!1,get game(){return e()}}),null),A(a,C(Dt,{setGame:t,setIsControlUp:n}),null),z(g=>{var h=B`
            display: inherit;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 1.5rem auto;
          `,p=B`
              display: inherit;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              margin-bottom: 2rem;
              font-size: 1.75rem;
              gap: 1.5rem;

              ${T.sm} {
                flex-direction: row;
                gap: 2rem;
              }

              ${T.md} {
                gap: 2.5rem;
              }

              ${T.lg} {
                gap: 3rem;
              }
            `,y=B`
                display: inherit;
                flex-direction: column;
                justify-content: center;
                gap: 0.25rem;

                svg {
                  font-size: 1.25rem;
                }
              `,v=B`
                display: inherit;
                flex-direction: column;
                justify-content: center;
                gap: 0.25rem;

                svg {
                  font-size: 1.5rem;
                }
              `;return h!==g.e&&P(a,g.e=h),p!==g.t&&P(o,g.t=p),y!==g.a&&P(c,g.a=y),v!==g.o&&P(l,g.o=v),g},{e:void 0,t:void 0,a:void 0,o:void 0}),a})()})(),null),A(i,C(sn,{}),null),z(()=>P(i,B`
        font-family: 'Stick No Bills Variable', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        min-height: 100dvh;
        background: ${b.primary};
        accent-color: ${b.secondary};
        color: ${b.secondary};

        *::selection {
          background: ${b.secondary};
          color: ${b.primary};
        }
      `)),i})()};console.log("Pride of a nation, a beast made of steel!");const wt=document.getElementById("root");wt&&er(()=>C(An,{}),wt);const Bn=()=>{"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/ts-battleship/sw.js",{scope:"/ts-battleship/"}).catch(e=>{e instanceof Error&&console.error(e)})})};Bn();
