var Lt=Object.defineProperty;var Mt=(e,t,r)=>t in e?Lt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var _=(e,t,r)=>(Mt(e,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();const Tt=(e,t)=>e===t,ve=Symbol("solid-proxy"),It=Symbol("solid-track"),xe={equals:Tt};let ht=bt;const K=1,$e=2,mt={owned:null,cleanups:null,context:null,owner:null};var L=null;let Me=null,Nt=null,B=null,N=null,W=null,Pe=0;function ye(e,t){const r=B,n=L,i=e.length===0,s=t===void 0?n:t,c=i?mt:{owned:null,cleanups:null,context:s?s.context:null,owner:s},o=i?e:()=>e(()=>re(()=>Ee(c)));L=c,B=null;try{return ue(o,!0)}finally{B=r,L=n}}function Z(e,t){t=t?Object.assign({},xe,t):xe;const r={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},n=i=>(typeof i=="function"&&(i=i(r.value)),yt(r,i));return[gt.bind(r),n]}function V(e,t,r){const n=Ue(e,t,!1,K);le(n)}function De(e,t,r){ht=jt;const n=Ue(e,t,!1,K);(!r||!r.render)&&(n.user=!0),W?W.push(n):le(n)}function J(e,t,r){r=r?Object.assign({},xe,r):xe;const n=Ue(e,t,!0,0);return n.observers=null,n.observerSlots=null,n.comparator=r.equals||void 0,le(n),gt.bind(n)}function re(e){if(B===null)return e();const t=B;B=null;try{return e()}finally{B=t}}function He(e){return L===null||(L.cleanups===null?L.cleanups=[e]:L.cleanups.push(e)),e}function gt(){if(this.sources&&this.state)if(this.state===K)le(this);else{const e=N;N=null,ue(()=>Se(this),!1),N=e}if(B){const e=this.observers?this.observers.length:0;B.sources?(B.sources.push(this),B.sourceSlots.push(e)):(B.sources=[this],B.sourceSlots=[e]),this.observers?(this.observers.push(B),this.observerSlots.push(B.sources.length-1)):(this.observers=[B],this.observerSlots=[B.sources.length-1])}return this.value}function yt(e,t,r){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&ue(()=>{for(let i=0;i<e.observers.length;i+=1){const s=e.observers[i],c=Me&&Me.running;c&&Me.disposed.has(s),(c?!s.tState:!s.state)&&(s.pure?N.push(s):W.push(s),s.observers&&pt(s)),c||(s.state=K)}if(N.length>1e6)throw N=[],new Error},!1)),t}function le(e){if(!e.fn)return;Ee(e);const t=Pe;zt(e,e.value,t)}function zt(e,t,r){let n;const i=L,s=B;B=L=e;try{n=e.fn(t)}catch(c){return e.pure&&(e.state=K,e.owned&&e.owned.forEach(Ee),e.owned=null),e.updatedAt=r+1,wt(c)}finally{B=s,L=i}(!e.updatedAt||e.updatedAt<=r)&&(e.updatedAt!=null&&"observers"in e?yt(e,n):e.value=n,e.updatedAt=r)}function Ue(e,t,r,n=K,i){const s={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:L,context:L?L.context:null,pure:r};return L===null||L!==mt&&(L.owned?L.owned.push(s):L.owned=[s]),s}function Ce(e){if(e.state===0)return;if(e.state===$e)return Se(e);if(e.suspense&&re(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Pe);)e.state&&t.push(e);for(let r=t.length-1;r>=0;r--)if(e=t[r],e.state===K)le(e);else if(e.state===$e){const n=N;N=null,ue(()=>Se(e,t[0]),!1),N=n}}function ue(e,t){if(N)return e();let r=!1;t||(N=[]),W?r=!0:W=[],Pe++;try{const n=e();return Vt(r),n}catch(n){r||(W=null),N=null,wt(n)}}function Vt(e){if(N&&(bt(N),N=null),e)return;const t=W;W=null,t.length&&ue(()=>ht(t),!1)}function bt(e){for(let t=0;t<e.length;t++)Ce(e[t])}function jt(e){let t,r=0;for(t=0;t<e.length;t++){const n=e[t];n.user?e[r++]=n:Ce(n)}for(t=0;t<r;t++)Ce(e[t])}function Se(e,t){e.state=0;for(let r=0;r<e.sources.length;r+=1){const n=e.sources[r];if(n.sources){const i=n.state;i===K?n!==t&&(!n.updatedAt||n.updatedAt<Pe)&&Ce(n):i===$e&&Se(n,t)}}}function pt(e){for(let t=0;t<e.observers.length;t+=1){const r=e.observers[t];r.state||(r.state=$e,r.pure?N.push(r):W.push(r),r.observers&&pt(r))}}function Ee(e){let t;if(e.sources)for(;e.sources.length;){const r=e.sources.pop(),n=e.sourceSlots.pop(),i=r.observers;if(i&&i.length){const s=i.pop(),c=r.observerSlots.pop();n<i.length&&(s.sourceSlots[c]=n,i[n]=s,r.observerSlots[n]=c)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)Ee(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function _t(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function wt(e,t=L){throw _t(e)}const Rt=Symbol("fallback");function Ye(e){for(let t=0;t<e.length;t++)e[t]()}function Gt(e,t,r={}){let n=[],i=[],s=[],c=0,o=t.length>1?[]:null;return He(()=>Ye(s)),()=>{let l=e()||[],u,a;return l[It],re(()=>{let d=l.length,h,v,m,$,C,g,S,w,M;if(d===0)c!==0&&(Ye(s),s=[],n=[],i=[],c=0,o&&(o=[])),r.fallback&&(n=[Rt],i[0]=ye(z=>(s[0]=z,r.fallback())),c=1);else if(c===0){for(i=new Array(d),a=0;a<d;a++)n[a]=l[a],i[a]=ye(f);c=d}else{for(m=new Array(d),$=new Array(d),o&&(C=new Array(d)),g=0,S=Math.min(c,d);g<S&&n[g]===l[g];g++);for(S=c-1,w=d-1;S>=g&&w>=g&&n[S]===l[w];S--,w--)m[w]=i[S],$[w]=s[S],o&&(C[w]=o[S]);for(h=new Map,v=new Array(w+1),a=w;a>=g;a--)M=l[a],u=h.get(M),v[a]=u===void 0?-1:u,h.set(M,a);for(u=g;u<=S;u++)M=n[u],a=h.get(M),a!==void 0&&a!==-1?(m[a]=i[u],$[a]=s[u],o&&(C[a]=o[u]),a=v[a],h.set(M,a)):s[u]();for(a=g;a<d;a++)a in m?(i[a]=m[a],s[a]=$[a],o&&(o[a]=C[a],o[a](a))):i[a]=ye(f);i=i.slice(0,c=d),n=l.slice(0)}return i});function f(d){if(s[a]=d,o){const[h,v]=Z(a);return o[a]=v,t(l[a],h)}return t(l[a])}}}function A(e,t){return re(()=>e(t||{}))}function he(){return!0}const Ve={get(e,t,r){return t===ve?r:e.get(t)},has(e,t){return t===ve?!0:e.has(t)},set:he,deleteProperty:he,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:he,deleteProperty:he}},ownKeys(e){return e.keys()}};function Te(e){return(e=typeof e=="function"?e():e)?e:{}}function Dt(){for(let e=0,t=this.length;e<t;++e){const r=this[e]();if(r!==void 0)return r}}function qe(...e){let t=!1;for(let c=0;c<e.length;c++){const o=e[c];t=t||!!o&&ve in o,e[c]=typeof o=="function"?(t=!0,J(o)):o}if(t)return new Proxy({get(c){for(let o=e.length-1;o>=0;o--){const l=Te(e[o])[c];if(l!==void 0)return l}},has(c){for(let o=e.length-1;o>=0;o--)if(c in Te(e[o]))return!0;return!1},keys(){const c=[];for(let o=0;o<e.length;o++)c.push(...Object.keys(Te(e[o])));return[...new Set(c)]}},Ve);const r={},n=Object.create(null);for(let c=e.length-1;c>=0;c--){const o=e[c];if(!o)continue;const l=Object.getOwnPropertyNames(o);for(let u=l.length-1;u>=0;u--){const a=l[u];if(a==="__proto__"||a==="constructor")continue;const f=Object.getOwnPropertyDescriptor(o,a);if(!n[a])n[a]=f.get?{enumerable:!0,configurable:!0,get:Dt.bind(r[a]=[f.get.bind(o)])}:f.value!==void 0?f:void 0;else{const d=r[a];d&&(f.get?d.push(f.get.bind(o)):f.value!==void 0&&d.push(()=>f.value))}}}const i={},s=Object.keys(n);for(let c=s.length-1;c>=0;c--){const o=s[c],l=n[o];l&&l.get?Object.defineProperty(i,o,l):i[o]=l?l.value:void 0}return i}function Ht(e,...t){if(ve in e){const i=new Set(t.length>1?t.flat():t[0]),s=t.map(c=>new Proxy({get(o){return c.includes(o)?e[o]:void 0},has(o){return c.includes(o)&&o in e},keys(){return c.filter(o=>o in e)}},Ve));return s.push(new Proxy({get(c){return i.has(c)?void 0:e[c]},has(c){return i.has(c)?!1:c in e},keys(){return Object.keys(e).filter(c=>!i.has(c))}},Ve)),s}const r={},n=t.map(()=>({}));for(const i of Object.getOwnPropertyNames(e)){const s=Object.getOwnPropertyDescriptor(e,i),c=!s.get&&!s.set&&s.enumerable&&s.writable&&s.configurable;let o=!1,l=0;for(const u of t)u.includes(i)&&(o=!0,c?n[l][i]=s.value:Object.defineProperty(n[l],i,s)),++l;o||(c?r[i]=s.value:Object.defineProperty(r,i,s))}return[...n,r]}function Xe(e){const t="fallback"in e&&{fallback:()=>e.fallback};return J(Gt(()=>e.each,e.children,t||void 0))}const Ut=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Ft=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Ut]),Wt=new Set(["innerHTML","textContent","innerText","children"]),Zt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Kt=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Yt(e,t){const r=Kt[e];return typeof r=="object"?r[t]?r.$:void 0:r}const qt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Xt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Qt(e,t,r){let n=r.length,i=t.length,s=n,c=0,o=0,l=t[i-1].nextSibling,u=null;for(;c<i||o<s;){if(t[c]===r[o]){c++,o++;continue}for(;t[i-1]===r[s-1];)i--,s--;if(i===c){const a=s<n?o?r[o-1].nextSibling:r[s-o]:l;for(;o<s;)e.insertBefore(r[o++],a)}else if(s===o)for(;c<i;)(!u||!u.has(t[c]))&&t[c].remove(),c++;else if(t[c]===r[s-1]&&r[o]===t[i-1]){const a=t[--i].nextSibling;e.insertBefore(r[o++],t[c++].nextSibling),e.insertBefore(r[--s],a),t[i]=r[s]}else{if(!u){u=new Map;let f=o;for(;f<s;)u.set(r[f],f++)}const a=u.get(t[c]);if(a!=null)if(o<a&&a<s){let f=c,d=1,h;for(;++f<i&&f<s&&!((h=u.get(t[f]))==null||h!==a+d);)d++;if(d>a-o){const v=t[c];for(;o<a;)e.insertBefore(r[o++],v)}else e.replaceChild(r[o++],t[c++])}else c++;else t[c++].remove()}}}const Qe="_$DX_DELEGATE";function Jt(e,t,r,n={}){let i;return ye(s=>{i=s,t===document?e():P(t,e(),t.firstChild?null:void 0,r)},n.owner),()=>{i(),t.textContent=""}}function D(e,t,r){let n;const i=()=>{const c=document.createElement("template");return c.innerHTML=e,r?c.content.firstChild.firstChild:c.content.firstChild},s=t?()=>re(()=>document.importNode(n||(n=i()),!0)):()=>(n||(n=i())).cloneNode(!0);return s.cloneNode=s,s}function fe(e,t=window.document){const r=t[Qe]||(t[Qe]=new Set);for(let n=0,i=e.length;n<i;n++){const s=e[n];r.has(s)||(r.add(s),t.addEventListener(s,cr))}}function se(e,t,r){r==null?e.removeAttribute(t):e.setAttribute(t,r)}function er(e,t,r,n){n==null?e.removeAttributeNS(t,r):e.setAttributeNS(t,r,n)}function k(e,t){t==null?e.removeAttribute("class"):e.className=t}function tr(e,t,r,n){if(n)Array.isArray(r)?(e[`$$${t}`]=r[0],e[`$$${t}Data`]=r[1]):e[`$$${t}`]=r;else if(Array.isArray(r)){const i=r[0];e.addEventListener(t,r[0]=s=>i.call(e,r[1],s))}else e.addEventListener(t,r)}function rr(e,t,r={}){const n=Object.keys(t||{}),i=Object.keys(r);let s,c;for(s=0,c=i.length;s<c;s++){const o=i[s];!o||o==="undefined"||t[o]||(et(e,o,!1),delete r[o])}for(s=0,c=n.length;s<c;s++){const o=n[s],l=!!t[o];!o||o==="undefined"||r[o]===l||!l||(et(e,o,!0),r[o]=l)}return r}function nr(e,t,r){if(!t)return r?se(e,"style"):t;const n=e.style;if(typeof t=="string")return n.cssText=t;typeof r=="string"&&(n.cssText=r=void 0),r||(r={}),t||(t={});let i,s;for(s in r)t[s]==null&&n.removeProperty(s),delete r[s];for(s in t)i=t[s],i!==r[s]&&(n.setProperty(s,i),r[s]=i);return r}function ir(e,t={},r,n){const i={};return n||V(()=>i.children=ee(e,t.children,i.children)),V(()=>t.ref&&t.ref(e)),V(()=>sr(e,t,r,!0,i,!0)),i}function Je(e,t,r){return re(()=>e(t,r))}function P(e,t,r,n){if(r!==void 0&&!n&&(n=[]),typeof t!="function")return ee(e,t,n,r);V(i=>ee(e,t(),i,r),n)}function sr(e,t,r,n,i={},s=!1){t||(t={});for(const c in i)if(!(c in t)){if(c==="children")continue;i[c]=tt(e,c,null,i[c],r,s)}for(const c in t){if(c==="children"){n||ee(e,t.children);continue}const o=t[c];i[c]=tt(e,c,o,i[c],r,s)}}function or(e){return e.toLowerCase().replace(/-([a-z])/g,(t,r)=>r.toUpperCase())}function et(e,t,r){const n=t.trim().split(/\s+/);for(let i=0,s=n.length;i<s;i++)e.classList.toggle(n[i],r)}function tt(e,t,r,n,i,s){let c,o,l,u,a;if(t==="style")return nr(e,r,n);if(t==="classList")return rr(e,r,n);if(r===n)return n;if(t==="ref")s||r(e);else if(t.slice(0,3)==="on:"){const f=t.slice(3);n&&e.removeEventListener(f,n),r&&e.addEventListener(f,r)}else if(t.slice(0,10)==="oncapture:"){const f=t.slice(10);n&&e.removeEventListener(f,n,!0),r&&e.addEventListener(f,r,!0)}else if(t.slice(0,2)==="on"){const f=t.slice(2).toLowerCase(),d=qt.has(f);if(!d&&n){const h=Array.isArray(n)?n[0]:n;e.removeEventListener(f,h)}(d||r)&&(tr(e,f,r,d),d&&fe([f]))}else if(t.slice(0,5)==="attr:")se(e,t.slice(5),r);else if((a=t.slice(0,5)==="prop:")||(l=Wt.has(t))||!i&&((u=Yt(t,e.tagName))||(o=Ft.has(t)))||(c=e.nodeName.includes("-")))a&&(t=t.slice(5),o=!0),t==="class"||t==="className"?k(e,r):c&&!o&&!l?e[or(t)]=r:e[u||t]=r;else{const f=i&&t.indexOf(":")>-1&&Xt[t.split(":")[0]];f?er(e,f,t,r):se(e,Zt[t]||t,r)}return r}function cr(e){const t=`$$${e.type}`;let r=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==r&&Object.defineProperty(e,"target",{configurable:!0,value:r}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return r||document}});r;){const n=r[t];if(n&&!r.disabled){const i=r[`${t}Data`];if(i!==void 0?n.call(r,i,e):n.call(r,e),e.cancelBubble)return}r=r._$host||r.parentNode||r.host}}function ee(e,t,r,n,i){for(;typeof r=="function";)r=r();if(t===r)return r;const s=typeof t,c=n!==void 0;if(e=c&&r[0]&&r[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),c){let o=r[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),r=q(e,r,n,o)}else r!==""&&typeof r=="string"?r=e.firstChild.data=t:r=e.textContent=t;else if(t==null||s==="boolean")r=q(e,r,n);else{if(s==="function")return V(()=>{let o=t();for(;typeof o=="function";)o=o();r=ee(e,o,r,n)}),()=>r;if(Array.isArray(t)){const o=[],l=r&&Array.isArray(r);if(je(o,t,r,i))return V(()=>r=ee(e,o,r,n,!0)),()=>r;if(o.length===0){if(r=q(e,r,n),c)return r}else l?r.length===0?rt(e,o,n):Qt(e,r,o):(r&&q(e),rt(e,o));r=o}else if(t.nodeType){if(Array.isArray(r)){if(c)return r=q(e,r,n,t);q(e,r,null,t)}else r==null||r===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);r=t}}return r}function je(e,t,r,n){let i=!1;for(let s=0,c=t.length;s<c;s++){let o=t[s],l=r&&r[e.length],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=je(e,o,l)||i;else if(u==="function")if(n){for(;typeof o=="function";)o=o();i=je(e,Array.isArray(o)?o:[o],Array.isArray(l)?l:[l])||i}else e.push(o),i=!0;else{const a=String(o);l&&l.nodeType===3&&l.data===a?e.push(l):e.push(document.createTextNode(a))}}return i}function rt(e,t,r=null){for(let n=0,i=t.length;n<i;n++)e.insertBefore(t[n],r)}function q(e,t,r,n){if(r===void 0)return e.textContent="";const i=n||document.createTextNode("");if(t.length){let s=!1;for(let c=t.length-1;c>=0;c--){const o=t[c];if(i!==o){const l=o.parentNode===e;!s&&!c?l?e.replaceChild(i,o):e.insertBefore(i,r):l&&o.remove()}else s=!0}}else e.insertBefore(i,r);return[i]}const ar=!1;function lr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function ur(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var fr=function(){function e(r){var n=this;this._insertTag=function(i){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(i,s),n.tags.push(i)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(ur(this));var i=this.tags[this.tags.length-1];if(this.isSpeedy){var s=lr(i);try{s.insertRule(n,s.cssRules.length)}catch{}}else i.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}(),I="-ms-",Ae="-moz-",b="-webkit-",vt="comm",Fe="rule",We="decl",dr="@import",xt="@keyframes",hr="@layer",mr=Math.abs,Be=String.fromCharCode,gr=Object.assign;function yr(e,t){return T(e,0)^45?(((t<<2^T(e,0))<<2^T(e,1))<<2^T(e,2))<<2^T(e,3):0}function $t(e){return e.trim()}function br(e,t){return(e=t.exec(e))?e[0]:e}function p(e,t,r){return e.replace(t,r)}function _e(e,t){return e.indexOf(t)}function T(e,t){return e.charCodeAt(t)|0}function oe(e,t,r){return e.slice(t,r)}function H(e){return e.length}function Ze(e){return e.length}function me(e,t){return t.push(e),e}function pr(e,t){return e.map(t).join("")}var Oe=1,te=1,Ct=0,j=0,O=0,ne="";function Le(e,t,r,n,i,s,c){return{value:e,root:t,parent:r,type:n,props:i,children:s,line:Oe,column:te,length:c,return:""}}function ie(e,t){return gr(Le("",null,null,"",null,null,0),e,{length:-e.length},t)}function wr(){return O}function vr(){return O=j>0?T(ne,--j):0,te--,O===10&&(te=1,Oe--),O}function R(){return O=j<Ct?T(ne,j++):0,te++,O===10&&(te=1,Oe++),O}function F(){return T(ne,j)}function be(){return j}function de(e,t){return oe(ne,e,t)}function ce(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function St(e){return Oe=te=1,Ct=H(ne=e),j=0,[]}function At(e){return ne="",e}function pe(e){return $t(de(j-1,Re(e===91?e+2:e===40?e+1:e)))}function xr(e){for(;(O=F())&&O<33;)R();return ce(e)>2||ce(O)>3?"":" "}function $r(e,t){for(;--t&&R()&&!(O<48||O>102||O>57&&O<65||O>70&&O<97););return de(e,be()+(t<6&&F()==32&&R()==32))}function Re(e){for(;R();)switch(O){case e:return j;case 34:case 39:e!==34&&e!==39&&Re(O);break;case 40:e===41&&Re(e);break;case 92:R();break}return j}function Cr(e,t){for(;R()&&e+O!==57;)if(e+O===84&&F()===47)break;return"/*"+de(t,j-1)+"*"+Be(e===47?e:R())}function Sr(e){for(;!ce(F());)R();return de(e,j)}function Ar(e){return At(we("",null,null,null,[""],e=St(e),0,[0],e))}function we(e,t,r,n,i,s,c,o,l){for(var u=0,a=0,f=c,d=0,h=0,v=0,m=1,$=1,C=1,g=0,S="",w=i,M=s,z=n,x=S;$;)switch(v=g,g=R()){case 40:if(v!=108&&T(x,f-1)==58){_e(x+=p(pe(g),"&","&\f"),"&\f")!=-1&&(C=-1);break}case 34:case 39:case 91:x+=pe(g);break;case 9:case 10:case 13:case 32:x+=xr(v);break;case 92:x+=$r(be()-1,7);continue;case 47:switch(F()){case 42:case 47:me(kr(Cr(R(),be()),t,r),l);break;default:x+="/"}break;case 123*m:o[u++]=H(x)*C;case 125*m:case 59:case 0:switch(g){case 0:case 125:$=0;case 59+a:C==-1&&(x=p(x,/\f/g,"")),h>0&&H(x)-f&&me(h>32?it(x+";",n,r,f-1):it(p(x," ","")+";",n,r,f-2),l);break;case 59:x+=";";default:if(me(z=nt(x,t,r,u,a,i,o,S,w=[],M=[],f),s),g===123)if(a===0)we(x,t,z,z,w,s,f,o,M);else switch(d===99&&T(x,3)===110?100:d){case 100:case 108:case 109:case 115:we(e,z,z,n&&me(nt(e,z,z,0,0,i,o,S,i,w=[],f),M),i,M,f,o,n?w:M);break;default:we(x,z,z,z,[""],M,0,o,M)}}u=a=h=0,m=C=1,S=x="",f=c;break;case 58:f=1+H(x),h=v;default:if(m<1){if(g==123)--m;else if(g==125&&m++==0&&vr()==125)continue}switch(x+=Be(g),g*m){case 38:C=a>0?1:(x+="\f",-1);break;case 44:o[u++]=(H(x)-1)*C,C=1;break;case 64:F()===45&&(x+=pe(R())),d=F(),a=f=H(S=x+=Sr(be())),g++;break;case 45:v===45&&H(x)==2&&(m=0)}}return s}function nt(e,t,r,n,i,s,c,o,l,u,a){for(var f=i-1,d=i===0?s:[""],h=Ze(d),v=0,m=0,$=0;v<n;++v)for(var C=0,g=oe(e,f+1,f=mr(m=c[v])),S=e;C<h;++C)(S=$t(m>0?d[C]+" "+g:p(g,/&\f/g,d[C])))&&(l[$++]=S);return Le(e,t,r,i===0?Fe:o,l,u,a)}function kr(e,t,r){return Le(e,t,r,vt,Be(wr()),oe(e,2,-2),0)}function it(e,t,r,n){return Le(e,t,r,We,oe(e,0,n),oe(e,n+1,-1),n)}function Q(e,t){for(var r="",n=Ze(e),i=0;i<n;i++)r+=t(e[i],i,e,t)||"";return r}function Pr(e,t,r,n){switch(e.type){case hr:if(e.children.length)break;case dr:case We:return e.return=e.return||e.value;case vt:return"";case xt:return e.return=e.value+"{"+Q(e.children,n)+"}";case Fe:e.value=e.props.join(",")}return H(r=Q(e.children,n))?e.return=e.value+"{"+r+"}":""}function Er(e){var t=Ze(e);return function(r,n,i,s){for(var c="",o=0;o<t;o++)c+=e[o](r,n,i,s)||"";return c}}function Br(e){return function(t){t.root||(t=t.return)&&e(t)}}function Or(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var Lr=function(t,r,n){for(var i=0,s=0;i=s,s=F(),i===38&&s===12&&(r[n]=1),!ce(s);)R();return de(t,j)},Mr=function(t,r){var n=-1,i=44;do switch(ce(i)){case 0:i===38&&F()===12&&(r[n]=1),t[n]+=Lr(j-1,r,n);break;case 2:t[n]+=pe(i);break;case 4:if(i===44){t[++n]=F()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=Be(i)}while(i=R());return t},Tr=function(t,r){return At(Mr(St(t),r))},st=new WeakMap,Ir=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,i=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!st.get(n))&&!i){st.set(t,!0);for(var s=[],c=Tr(r,s),o=n.props,l=0,u=0;l<c.length;l++)for(var a=0;a<o.length;a++,u++)t.props[u]=s[l]?c[l].replace(/&\f/g,o[a]):o[a]+" "+c[l]}}},Nr=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};function kt(e,t){switch(yr(e,t)){case 5103:return b+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return b+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return b+e+Ae+e+I+e+e;case 6828:case 4268:return b+e+I+e+e;case 6165:return b+e+I+"flex-"+e+e;case 5187:return b+e+p(e,/(\w+).+(:[^]+)/,b+"box-$1$2"+I+"flex-$1$2")+e;case 5443:return b+e+I+"flex-item-"+p(e,/flex-|-self/,"")+e;case 4675:return b+e+I+"flex-line-pack"+p(e,/align-content|flex-|-self/,"")+e;case 5548:return b+e+I+p(e,"shrink","negative")+e;case 5292:return b+e+I+p(e,"basis","preferred-size")+e;case 6060:return b+"box-"+p(e,"-grow","")+b+e+I+p(e,"grow","positive")+e;case 4554:return b+p(e,/([^-])(transform)/g,"$1"+b+"$2")+e;case 6187:return p(p(p(e,/(zoom-|grab)/,b+"$1"),/(image-set)/,b+"$1"),e,"")+e;case 5495:case 3959:return p(e,/(image-set\([^]*)/,b+"$1$`$1");case 4968:return p(p(e,/(.+:)(flex-)?(.*)/,b+"box-pack:$3"+I+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+b+e+e;case 4095:case 3583:case 4068:case 2532:return p(e,/(.+)-inline(.+)/,b+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(H(e)-1-t>6)switch(T(e,t+1)){case 109:if(T(e,t+4)!==45)break;case 102:return p(e,/(.+:)(.+)-([^]+)/,"$1"+b+"$2-$3$1"+Ae+(T(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~_e(e,"stretch")?kt(p(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(T(e,t+1)!==115)break;case 6444:switch(T(e,H(e)-3-(~_e(e,"!important")&&10))){case 107:return p(e,":",":"+b)+e;case 101:return p(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+b+(T(e,14)===45?"inline-":"")+"box$3$1"+b+"$2$3$1"+I+"$2box$3")+e}break;case 5936:switch(T(e,t+11)){case 114:return b+e+I+p(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return b+e+I+p(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return b+e+I+p(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return b+e+I+e+e}return e}var zr=function(t,r,n,i){if(t.length>-1&&!t.return)switch(t.type){case We:t.return=kt(t.value,t.length);break;case xt:return Q([ie(t,{value:p(t.value,"@","@"+b)})],i);case Fe:if(t.length)return pr(t.props,function(s){switch(br(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Q([ie(t,{props:[p(s,/:(read-\w+)/,":"+Ae+"$1")]})],i);case"::placeholder":return Q([ie(t,{props:[p(s,/:(plac\w+)/,":"+b+"input-$1")]}),ie(t,{props:[p(s,/:(plac\w+)/,":"+Ae+"$1")]}),ie(t,{props:[p(s,/:(plac\w+)/,I+"input-$1")]})],i)}return""})}},Vr=[zr],jr=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(m){var $=m.getAttribute("data-emotion");$.indexOf(" ")!==-1&&(document.head.appendChild(m),m.setAttribute("data-s",""))})}var i=t.stylisPlugins||Vr,s={},c,o=[];c=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(m){for(var $=m.getAttribute("data-emotion").split(" "),C=1;C<$.length;C++)s[$[C]]=!0;o.push(m)});var l,u=[Ir,Nr];{var a,f=[Pr,Br(function(m){a.insert(m)})],d=Er(u.concat(i,f)),h=function($){return Q(Ar($),d)};l=function($,C,g,S){a=g,h($?$+"{"+C.styles+"}":C.styles),S&&(v.inserted[C.name]=!0)}}var v={key:r,sheet:new fr({key:r,container:c,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return v.sheet.hydrate(o),v};function _r(e){for(var t=0,r,n=0,i=e.length;i>=4;++n,i-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(i){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Rr={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Gr=/[A-Z]|^ms/g,Dr=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Pt=function(t){return t.charCodeAt(1)===45},ot=function(t){return t!=null&&typeof t!="boolean"},Ie=Or(function(e){return Pt(e)?e:e.replace(Gr,"-$&").toLowerCase()}),ct=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(Dr,function(n,i,s){return U={name:i,styles:s,next:U},i})}return Rr[t]!==1&&!Pt(t)&&typeof r=="number"&&r!==0?r+"px":r};function ae(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return U={name:r.name,styles:r.styles,next:U},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)U={name:n.name,styles:n.styles,next:U},n=n.next;var i=r.styles+";";return i}return Hr(e,t,r)}case"function":{if(e!==void 0){var s=U,c=r(e);return U=s,ae(e,t,c)}break}}if(t==null)return r;var o=t[r];return o!==void 0?o:r}function Hr(e,t,r){var n="";if(Array.isArray(r))for(var i=0;i<r.length;i++)n+=ae(e,t,r[i])+";";else for(var s in r){var c=r[s];if(typeof c!="object")t!=null&&t[c]!==void 0?n+=s+"{"+t[c]+"}":ot(c)&&(n+=Ie(s)+":"+ct(s,c)+";");else if(Array.isArray(c)&&typeof c[0]=="string"&&(t==null||t[c[0]]===void 0))for(var o=0;o<c.length;o++)ot(c[o])&&(n+=Ie(s)+":"+ct(s,c[o])+";");else{var l=ae(e,t,c);switch(s){case"animation":case"animationName":{n+=Ie(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var at=/label:\s*([^\s;\n{]+)\s*(;|$)/g,U,Ne=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var i=!0,s="";U=void 0;var c=t[0];c==null||c.raw===void 0?(i=!1,s+=ae(n,r,c)):s+=c[0];for(var o=1;o<t.length;o++)s+=ae(n,r,t[o]),i&&(s+=c[o]);at.lastIndex=0;for(var l="",u;(u=at.exec(s))!==null;)l+="-"+u[1];var a=_r(s)+l;return{name:a,styles:s,next:U}},Ur=!0;function Et(e,t,r){var n="";return r.split(" ").forEach(function(i){e[i]!==void 0?t.push(e[i]+";"):n+=i+" "}),n}var Fr=function(t,r,n){var i=t.key+"-"+r.name;(n===!1||Ur===!1)&&t.registered[i]===void 0&&(t.registered[i]=r.styles)},Wr=function(t,r,n){Fr(t,r,n);var i=t.key+"-"+r.name;if(t.inserted[r.name]===void 0){var s=r;do t.insert(r===s?"."+i:"",s,t.sheet,!0),s=s.next;while(s!==void 0)}};function lt(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function ut(e,t,r){var n=[],i=Et(e,n,r);return n.length<2?r:i+t(n)}var Zr=function(t){var r=jr(t);r.sheet.speedy=function(o){this.isSpeedy=o},r.compat=!0;var n=function(){for(var l=arguments.length,u=new Array(l),a=0;a<l;a++)u[a]=arguments[a];var f=Ne(u,r.registered,void 0);return Wr(r,f,!1),r.key+"-"+f.name},i=function(){for(var l=arguments.length,u=new Array(l),a=0;a<l;a++)u[a]=arguments[a];var f=Ne(u,r.registered),d="animation-"+f.name;return lt(r,{name:f.name,styles:"@keyframes "+d+"{"+f.styles+"}"}),d},s=function(){for(var l=arguments.length,u=new Array(l),a=0;a<l;a++)u[a]=arguments[a];var f=Ne(u,r.registered);lt(r,f)},c=function(){for(var l=arguments.length,u=new Array(l),a=0;a<l;a++)u[a]=arguments[a];return ut(r.registered,n,Kr(u))};return{css:n,cx:c,injectGlobal:s,keyframes:i,hydrate:function(l){l.forEach(function(u){r.inserted[u]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:Et.bind(null,r.registered),merge:ut.bind(null,r.registered,n)}},Kr=function e(t){for(var r="",n=0;n<t.length;n++){var i=t[n];if(i!=null){var s=void 0;switch(typeof i){case"boolean":break;case"object":{if(Array.isArray(i))s=e(i);else{s="";for(var c in i)i[c]&&c&&(s&&(s+=" "),s+=c)}break}default:s=i}s&&(r&&(r+=" "),r+=s)}}return r},Yr=Zr({key:"css"}),E=Yr.css,qr=D("<svg stroke-width=0>");function Y(e,t){const r=qe(e.a,t),[n,i]=Ht(r,["src"]),[s,c]=Z(""),o=J(()=>t.title?`${e.c}<title>${t.title}</title>`:e.c);return De(()=>c(o())),He(()=>{c("")}),(()=>{var l=qr();return ir(l,qe({get stroke(){var u;return(u=e.a)==null?void 0:u.stroke},get color(){return t.color||"currentColor"},get fill(){return t.color||"currentColor"},get style(){return{...t.style,overflow:"visible"}}},i,{get height(){return t.size||"1em"},get width(){return t.size||"1em"},xmlns:"http://www.w3.org/2000/svg",get innerHTML(){return s()}}),!0,!0),P(l,()=>ar),l})()}function Xr(e){return Y({a:{viewBox:"0 0 496 512"},c:'<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>'},e)}function Qr(e){return Y({a:{viewBox:"0 0 320 512"},c:'<path d="M2 334.5c-3.8 8.8-2 19 4.6 26l136 144c4.5 4.8 10.8 7.5 17.4 7.5s12.9-2.7 17.4-7.5l136-144c6.6-7 8.4-17.2 4.6-26S305.5 320 296 320h-72V32c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v288H24c-9.6 0-18.2 5.7-22 14.5z"/>'},e)}function Jr(e){return Y({a:{viewBox:"0 0 512 512"},c:'<path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6S320 110.5 320 120v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h288v72c0 9.6 5.7 18.2 14.5 22z"/>'},e)}function en(e){return Y({a:{viewBox:"0 0 640 512"},c:'<path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z"/>'},e)}function tn(e){return Y({a:{viewBox:"0 0 576 512"},c:'<path d="M192 32c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v128l44.4 14.8c23.1 7.7 29.5 37.5 11.5 53.9l-101 92.6c-16.2 9.4-34.7 15.1-50.9 15.1-19.6 0-40.8-7.7-59.2-20.3-22.1-15.5-51.6-15.5-73.7 0-17.1 11.8-38 20.3-59.2 20.3-16.2 0-34.7-5.7-50.9-15.1L40 308.7c-18-16.5-11.6-46.2 11.5-53.9L96 240V112c0-26.5 21.5-48 48-48h48V32zm-32 186.7 107.8-35.9c13.1-4.4 27.3-4.4 40.5 0L416 218.7V128H160v90.7zm146.5 203.2c22.5 15.5 50 26.1 77.5 26.1 26.9 0 55.4-10.8 77.4-26.1 11.9-8.5 28.1-7.8 39.2 1.7 14.4 11.9 32.5 21 50.6 25.2 17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25-29 15.6-61.5 25.9-94.5 25.9-31.9 0-60.6-9.9-80.4-18.9-5.8-2.7-11.1-5.3-15.6-7.7-4.5 2.4-9.7 5.1-15.6 7.7-19.8 9-48.5 18.9-80.4 18.9-33 0-65.5-10.3-94.5-25.8-13.4 8.4-33.7 19.3-58.2 25-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2 11.1-9.4 27.3-10.1 39.2-1.7 22.1 15.2 50.5 26 77.4 26 27.5 0 55-10.6 77.5-26.1 11.1-7.9 25.9-7.9 37 0z"/>'},e)}function Bt(e){return Y({a:{viewBox:"0 0 448 512"},c:'<path d="M224 256a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z"/>'},e)}var rn=D('<footer>© 2023 - 2024<a title="Go to the Source"target=_blank type=text/html rel="noopener noreferrer nofollow external author"href=https://github.com/eldarlrd/ts-battleship> eldarlrd');const nn=()=>(()=>{var e=rn(),t=e.firstChild,r=t.nextSibling,n=r.firstChild;return k(e,E`
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 1.25rem;
        font-weight: 600;
        margin: 1rem;
        gap: 0.5rem;
      `),P(r,A(Xr,{}),n),V(()=>k(r,E`
          border-radius: 0.125rem;
          text-decoration: none;
          color: inherit;
          transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            color: ${y.grid};
          }

          svg {
            vertical-align: top;
          }
        `)),e})();var sn=D("<header>TS Battleship");const on=()=>(()=>{var e=sn();return k(e,E`
        font-size: 2.5rem;
        font-weight: 600;
        margin: 1rem;
      `),e})();class ft{constructor(){_(this,"grid");_(this,"impacts");_(this,"shipsPlaced");this.grid=Array.from({length:10},()=>Array(10).fill(null)),this.impacts=[],this.shipsPlaced=0}place(t,r,n){if(!this.isPlaceable(t,r,n))return!1;const{row:i,col:s}=r,c=n?1:0;for(let o=0;o<t.length;o++)this.grid[i+o*c][s+o*(1-c)]=t;return!0}fire(t){const{row:r,col:n}=t,i=this.grid[r][n];return this.impacts.some(c=>c.row===r&&c.col===n)?!1:(i?(i.hit(),this.impacts.push(t)):this.impacts.push(t),!0)}isGameOver(){return this.grid.flat().filter(t=>t!==null).every(t=>t==null?void 0:t.sunk)}isPlaceable(t,r,n){const{row:i,col:s}=r,c=n?1:0;for(let o=0;o<t.length;o++){const l=i+o*c,u=s+o*(1-c);if(l<0||l>=10||u<0||u>=10||this.grid[l][u]!==null||this.isAdjacent(l,u))return!1}return!0}isAdjacent(t,r){const n=[{row:-1,col:0},{row:1,col:0},{row:0,col:-1},{row:0,col:1},{row:-1,col:-1},{row:-1,col:1},{row:1,col:-1},{row:1,col:1}];for(const i of n){const s=t+i.row,c=r+i.col;if(s>=0&&s<10&&c>=0&&c<10&&this.grid[s][c])return!0}return!1}}const cn="/ts-battleship/assets/shipSunk-CyPyMOYX.opus";class X{constructor(t=2){_(this,"length");_(this,"sunk");_(this,"coords");_(this,"isVertical");_(this,"hits");this.length=t,this.sunk=!1,this.coords={row:0,col:0},this.isVertical=!1,this.hits=0}hit(){this.sunk||(this.hits++,this.isSunk())}isSunk(){this.hits===this.length&&(this.sunk=!0,new Audio(cn).play())}}class ke{constructor(t=!1){_(this,"playerVictorious");_(this,"playerBoard");_(this,"computerBoard");_(this,"isCurrPlayerOne");this.playerVictorious=0,this.playerBoard=new ft,this.computerBoard=new ft,t&&this.randomPlace(this.playerBoard),this.randomPlace(this.computerBoard),this.isCurrPlayerOne=!0}takeTurn(t){return(this.isCurrPlayerOne?this.computerBoard:this.playerBoard).fire(t)?(this.checkVictory(),this.isCurrPlayerOne=!this.isCurrPlayerOne,!0):!1}computerTurn(){let t;do{const r=~~(Math.random()*10),n=~~(Math.random()*10);t={row:r,col:n}}while(!this.takeTurn(t));return t}successfullyPlace(t,r,n,i=0,s=0,c=!1){let o;if(n){let l=Math.random()<.5;for(o={row:~~(Math.random()*10),col:~~(Math.random()*10)};!t.place(r,o,l);)l=Math.random()<.5,o={row:~~(Math.random()*10),col:~~(Math.random()*10)};r.isVertical=l}else{if(o={row:i,col:s},!t.place(r,o,c))return console.log("Invalid placement"),!1;r.isVertical=c}return r.coords=o,t.place(r,o,r.isVertical),!0}randomPlace(t,r=!0){const n=new X(5),i=new X(4),s=new X(3),c=new X(3),o=new X(2);this.successfullyPlace(t,n,r),this.successfullyPlace(t,i,r),this.successfullyPlace(t,s,r),this.successfullyPlace(t,c,r),this.successfullyPlace(t,o,r)}checkVictory(){if(this.playerBoard.isGameOver())return this.playerVictorious=2,!0;if(this.computerBoard.isGameOver())return this.playerVictorious=1,!0}}var an=D("<button type=button>New Game");const Ot=e=>(()=>{var t=an();return t.$$click=()=>{e.setGame(new ke),e.setIsControlUp(!0),e.overlay&&(e.overlay.style.display="none")},V(()=>k(t,E`
        border: 0;
        border-radius: 0.125rem;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: 500;
        padding: 0.75rem;
        min-width: 7.625rem;
        background-color: ${y.secondary};
        color: ${y.grid};
        outline: 2px solid ${y.grid};
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          background-color: ${y.hover};
        }
      `)),t})();fe(["click"]);function ln(e){return Y({a:{viewBox:"0 0 512 512"},c:'<path d="M440.88 129.37 288.16 40.62a64.14 64.14 0 0 0-64.33 0L71.12 129.37a4 4 0 0 0 0 6.9L254 243.85a4 4 0 0 0 4.06 0L440.9 136.27a4 4 0 0 0-.02-6.9ZM256 152c-13.25 0-24-7.16-24-16s10.75-16 24-16 24 7.16 24 16-10.75 16-24 16ZM238 270.81 54 163.48a4 4 0 0 0-6 3.46v173.92a48 48 0 0 0 23.84 41.39L234 479.48a4 4 0 0 0 6-3.46V274.27a4 4 0 0 0-2-3.46ZM96 368c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm96-32c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24ZM458 163.51 274 271.56a4 4 0 0 0-2 3.45V476a4 4 0 0 0 6 3.46l162.15-97.23A48 48 0 0 0 464 340.86V167a4 4 0 0 0-6-3.49ZM320 424c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm96 32c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Z"/>'},e)}function un(e){return Y({a:{viewBox:"0 0 512 512"},c:'<rect width="448" height="80" x="32" y="48" rx="32" ry="32"/><path d="M74.45 160a8 8 0 0 0-8 8.83l26.31 252.56a1.5 1.5 0 0 0 0 .22A48 48 0 0 0 140.45 464h231.09a48 48 0 0 0 47.67-42.39v-.21l26.27-252.57a8 8 0 0 0-8-8.83Zm248.86 180.69a16 16 0 1 1-22.63 22.62L256 318.63l-44.69 44.68a16 16 0 0 1-22.63-22.62L233.37 296l-44.69-44.69a16 16 0 0 1 22.63-22.62L256 273.37l44.68-44.68a16 16 0 0 1 22.63 22.62L278.62 296Z"/>'},e)}const fn="/ts-battleship/assets/restart-BmZYplRY.opus";var dn=D("<button type=button>");const ze=e=>(()=>{var t=dn();return t.$$click=()=>{e.handleAction()},P(t,()=>e.icon),V(r=>{var n=e.title,i=E`
        border: 0;
        border-radius: 0.125rem;
        cursor: pointer;
        font-size: 1.375rem;
        font-weight: 500;
        line-height: 1rem;
        padding: 0.5rem;
        background-color: ${y.secondary};
        color: ${y.grid};
        outline: 2px solid ${y.grid};
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          background-color: ${y.hover};
        }

        ${G.md} {
          font-size: 1.5rem;
          padding: 0.75rem;
        }

        ${G.lg} {
          font-size: 1.625rem;
        }
      `;return n!==r.e&&se(t,"title",r.e=n),i!==r.t&&k(t,r.t=i),r},{e:void 0,t:void 0}),t})();fe(["click"]);var hn=D("<section>"),mn=D("<button type=button>");const Ge=e=>{const t=(i,s)=>{if(e.game.playerBoard.shipsPlaced>=5)return;const o=[5,4,3,3,2][e.game.playerBoard.shipsPlaced],l=new X(o);if(e.game.successfullyPlace(e.game.playerBoard,l,!1,i,s,e.isVertical)){const u=e.isPlayerBoard?"p1-":"p2-",a=e.game.playerBoard.grid[i][s];if(a)for(let f=0;f<a.length;f++){const d=a.isVertical?a.coords.row+f:i,h=a.isVertical?s:a.coords.col+f,v=document.getElementById(u+(d*10+h));v&&(v.style.backgroundColor=y.ship)}if(e.game.playerBoard.shipsPlaced++,e.game.playerBoard.shipsPlaced===5&&e.startButton&&(e.startButton.disabled=!1),e.shipInfo){const f=["5 Carrier","4 Battleship","3 Destroyer","3 Submarine","2 Patrol Boat"];e.shipInfo.innerText=e.game.playerBoard.shipsPlaced===5?"All Placed":f[e.game.playerBoard.shipsPlaced]}}},r=(i,s)=>{if(e.game.playerVictorious)return;e.game.takeTurn({row:i,col:s})&&(n(i,s),document.dispatchEvent(new Event("attack")),e.game.playerVictorious||setTimeout(()=>{const o=e.game.computerTurn();n(o.row,o.col),document.dispatchEvent(new Event("attack"))},150))},n=(i,s)=>{const c=e.game.isCurrPlayerOne?"p1-":"p2-",o=e.game.isCurrPlayerOne?e.game.playerBoard:e.game.computerBoard,l=document.getElementById(c+(i*10+s));o.impacts.forEach(u=>{const{row:a,col:f}=u,d=o.grid[a][f];if(!d)o.impacts.some(h=>h.row===i&&h.col===s)&&l&&(l.style.backgroundColor=y.emptyHit,l.style.cursor="default");else if(o.impacts.some(h=>h.row===i&&h.col===s)&&l){if(d.sunk)for(let h=0;h<d.length;h++){const v=d.isVertical?d.coords.row+h:a,m=d.isVertical?f:d.coords.col+h,$=document.getElementById(c+(v*10+m));$&&($.style.backgroundColor=y.shipSunk)}else l.style.backgroundColor=y.shipHit;l.style.cursor="default"}})};return(()=>{var i=hn();return P(i,A(Xe,{get each(){return e.game.playerBoard.grid},children:(s,c)=>A(Xe,{each:s,children:(o,l)=>(()=>{var u=mn();return u.$$click=()=>{e.isPlacing&&e.game.playerBoard.shipsPlaced<5&&t(c(),l()),!e.isPlayerBoard&&r(c(),l())},V(a=>{var f=`${e.isPlayerBoard?"p1-":"p2-"}${c()*10+l()}`,d=E`
                  background-color: ${o&&e.isPlayerBoard?y.ship:y.secondary};
                  border: 1px solid ${y.grid};
                  padding: 13px;
                  text-align: center;
                  cursor: ${!e.isPlayerBoard&&"pointer"};

                  &:hover {
                    background-color: ${!e.isPlayerBoard&&y.hover};
                  }

                  ${G.md} {
                    padding: 1rem;
                  }

                  ${G.lg} {
                    padding: 1.25rem;
                  }
                `;return f!==a.e&&se(u,"id",a.e=f),d!==a.t&&k(u,a.t=d),a},{e:void 0,t:void 0}),u})()})})),V(()=>k(i,E`
        font-size: 2.5rem;
        font-weight: 600;
        display: grid;
        border: 1px solid ${y.grid};
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(10, 1fr);
      `)),i})()};fe(["click"]);var gn=D("<div id=controls><section><h1>New Game</h1><span> Player</span><div id=panel><span id=ship-selection><span id=ship-info>5 Carrier</span></span><span></span></div><button type=button id=start-button>Start");const yn=e=>{const[t,r]=Z(!1),[n,i]=Z(!1),[s,c]=Z([]),[o,l]=Z([]),u=new Audio(fn);return De(()=>{c(document.getElementById("ship-info")),l(document.getElementById("start-button"))}),(()=>{var a=gn(),f=a.firstChild,d=f.firstChild,h=d.nextSibling,v=h.firstChild,m=h.nextSibling,$=m.firstChild,C=$.firstChild,g=$.nextSibling,S=m.nextSibling;return k(a,E`
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      `),k(d,E`
            text-align: center;
          `),k(h,E`
            font-size: 1.75rem;

            svg {
              font-size: 1.25rem;
            }
          `),P(h,A(Bt,{}),v),P(f,A(Ge,{isPlayerBoard:!0,isPlacing:!0,get isVertical(){return n()},get game(){return e.game},get shipInfo(){return s()},get startButton(){return o()}}),m),k(m,E`
            display: inherit;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
          `),P($,A(tn,{}),C),k(g,E`
              display: inherit;
              gap: 0.5rem;
            `),P(g,A(ze,{handleAction:()=>{i(w=>!w)},get icon(){return J(()=>!!n())()?A(Qr,{}):A(Jr,{})},title:"Rotate"}),null),P(g,A(ze,{handleAction:()=>{e.setGame(new ke(!0)),e.game.playerBoard.shipsPlaced=5,r(!0),s().innerText="All Placed"},get icon(){return A(ln,{})},title:"Randomize"}),null),P(g,A(ze,{handleAction:()=>{e.setGame(new ke),r(!1),s().innerText="5 Carrier",o().disabled=!0},get icon(){return A(un,{})},title:"Clear"}),null),S.$$click=()=>{e.setIsControlUp(!1),u.play().catch(w=>{w instanceof Error&&console.error(w)})},V(w=>{var M=E`
          display: inherit;
          flex-direction: column;
          padding: 1rem;
          margin: 1rem;
          gap: 0.75rem;
          line-height: 1rem;
          background-color: ${y.primary};
          border: 2px solid ${y.secondary};
          border-radius: 0.125rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        `,z=E`
              font-size: 1.5rem;

              svg {
                font-size: 1rem;
                padding-right: 0.375rem;
              }

              ${G.md} {
                font-size: 1.625rem;

                svg {
                  font-size: 1.125rem;
                }
              }

              ${G.lg} {
                font-size: 1.75rem;

                svg {
                  font-size: 1.25rem;
                }
              }
            `,x=!t(),Ke=E`
            border: 0;
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight: 500;
            min-width: 7.625rem;
            padding: 0.5rem;
            background-color: ${y.secondary};
            color: ${y.grid};
            outline: 2px solid ${y.grid};
            transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

            &:hover {
              background-color: ${y.hover};
            }

            &:disabled {
              cursor: not-allowed;
              background-color: ${y.hover};
            }

            ${G.md} {
              padding: 0.75rem;
            }
          `;return M!==w.e&&k(f,w.e=M),z!==w.t&&k($,w.t=z),x!==w.a&&(S.disabled=w.a=x),Ke!==w.o&&k(S,w.o=Ke),w},{e:void 0,t:void 0,a:void 0,o:void 0}),a})()};fe(["click"]);const bn="/ts-battleship/assets/defeat-Dc1tOmBT.opus",pn="/ts-battleship/assets/victory-C0WdMNpp.opus";var wn=D("<div id=overlay><section><h1 id=victor>");let ge=document.getElementById("victor");const vn=e=>{const t=new Audio(pn),r=new Audio(bn),n=i=>{i.play().catch(s=>{s instanceof Error&&console.error(s)})};return De(()=>{const i=()=>{e.game.playerVictorious&&(e.overlay.style.display="flex",e.game.playerVictorious===1?(ge.innerText="Player Wins!",n(t)):(ge.innerText="Computer Wins...",n(r)))};document.addEventListener("attack",i),He(()=>{document.removeEventListener("attack",i)})}),(()=>{var i=wn(),s=i.firstChild,c=s.firstChild,o=e.overlay;typeof o=="function"?Je(o,i):e.overlay=i,k(i,E`
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        justify-content: center;
        align-items: center;
        z-index: 1;
      `);var l=ge;return typeof l=="function"?Je(l,c):ge=c,k(c,E`
            font-size: 2.5rem;
            text-align: center;
            line-height: 1em;
          `),P(c,()=>e.game.playerVictorious),P(s,A(Ot,{get setGame(){return e.setGame},get setIsControlUp(){return e.setIsControlUp},get overlay(){return e.overlay}}),null),V(()=>k(s,E`
          display: inherit;
          flex-direction: column;
          padding: 1rem;
          margin: 1rem;
          gap: 0.75rem;
          line-height: 1rem;
          background-color: ${y.primary};
          border: 2px solid ${y.secondary};
          border-radius: 0.125rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

          ${G.sm} {
            padding: 3rem;
          }

          ${G.md} {
            padding: 4rem;
          }

          ${G.lg} {
            padding: 5rem;
          }
        `)),i})()};var xn=D("<div id=app>"),$n=D("<main><div><span><span> Player</span></span><span><span> Computer");const y={primary:"#60a5fa",secondary:"#f8fafc",ship:"#334155",hover:"#cbd5e1",grid:"#1e293b",emptyHit:"#10b981",shipHit:"#f59e0b",shipSunk:"#f43f5e"},G={sm:"@media (min-width: 40rem)",md:"@media (min-width: 48rem)",lg:"@media (min-width: 64rem)"};let Cn=document.getElementById("overlay");const Sn=()=>{const[e,t]=Z(new ke),[r,n]=Z(!0);return(()=>{var i=xn();return P(i,A(vn,{get game(){return e()},setGame:t,setIsControlUp:n,overlay:Cn}),null),P(i,A(on,{}),null),P(i,(()=>{var s=J(()=>!!r());return()=>s()&&A(yn,{get game(){return e()},setGame:t,setIsControlUp:n})})(),null),P(i,(()=>{var s=J(()=>!r());return()=>s()&&(()=>{var c=$n(),o=c.firstChild,l=o.firstChild,u=l.firstChild,a=u.firstChild,f=l.nextSibling,d=f.firstChild,h=d.firstChild;return k(c,E`
            display: inherit;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 1.5rem auto;
          `),k(l,E`
                display: inherit;
                flex-direction: column;
                justify-content: center;
                gap: 0.25rem;

                svg {
                  font-size: 1.25rem;
                }
              `),P(u,A(Bt,{}),a),P(l,A(Ge,{isPlayerBoard:!0,isPlacing:!1,isVertical:!1,get game(){return e()}}),null),k(f,E`
                display: inherit;
                flex-direction: column;
                justify-content: center;
                gap: 0.25rem;

                svg {
                  font-size: 1.5rem;
                }
              `),P(d,A(en,{}),h),P(f,A(Ge,{isPlayerBoard:!1,isPlacing:!1,isVertical:!1,get game(){return e()}}),null),P(c,A(Ot,{setGame:t,setIsControlUp:n}),null),V(()=>k(o,E`
              display: inherit;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              margin-bottom: 2rem;
              font-size: 1.75rem;
              gap: 1.5rem;

              ${G.sm} {
                flex-direction: row;
                gap: 2rem;
              }

              ${G.md} {
                gap: 2.5rem;
              }

              ${G.lg} {
                gap: 3rem;
              }
            `)),c})()})(),null),P(i,A(nn,{}),null),V(()=>k(i,E`
        font-family: 'Stick No Bills Variable', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        min-height: 100vh;
        min-height: 100svh;
        background-color: ${y.primary};
        accent-color: ${y.secondary};
        color: ${y.secondary};

        *::selection {
          background-color: ${y.secondary};
          color: ${y.primary};
        }
      `)),i})()};console.log("Pride of a nation, a beast made of steel!");const dt=document.getElementById("root");dt&&Jt(()=>A(Sn,{}),dt);const An=()=>{"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/ts-battleship/sw.js",{scope:"/ts-battleship/"}).catch(e=>{e instanceof Error&&console.error(e)})})};An();
