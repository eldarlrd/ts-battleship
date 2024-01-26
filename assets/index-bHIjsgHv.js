var Et=Object.defineProperty;var Pt=(e,t,r)=>t in e?Et(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var I=(e,t,r)=>(Pt(e,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();const Tt=(e,t)=>e===t,we=Symbol("solid-proxy"),Bt=Symbol("solid-track"),pe={equals:Tt};let ft=gt;const K=1,ve=2,ut={owned:null,cleanups:null,context:null,owner:null};var E=null;let Me=null,Mt=null,A=null,M=null,U=null,Ae=0;function me(e,t){const r=A,n=E,i=e.length===0,s=t===void 0?n:t,c=i?ut:{owned:null,cleanups:null,context:s?s.context:null,owner:s},o=i?e:()=>e(()=>Q(()=>Oe(c)));E=c,A=null;try{return ae(o,!0)}finally{A=r,E=n}}function re(e,t){t=t?Object.assign({},pe,t):pe;const r={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},n=i=>(typeof i=="function"&&(i=i(r.value)),mt(r,i));return[ht.bind(r),n]}function R(e,t,r){const n=De(e,t,!1,K);ce(n)}function dt(e,t,r){ft=jt;const n=De(e,t,!1,K);(!r||!r.render)&&(n.user=!0),U?U.push(n):ce(n)}function ne(e,t,r){r=r?Object.assign({},pe,r):pe;const n=De(e,t,!0,0);return n.observers=null,n.observerSlots=null,n.comparator=r.equals||void 0,ce(n),ht.bind(n)}function Q(e){if(A===null)return e();const t=A;A=null;try{return e()}finally{A=t}}function Ge(e){return E===null||(E.cleanups===null?E.cleanups=[e]:E.cleanups.push(e)),e}function ht(){if(this.sources&&this.state)if(this.state===K)ce(this);else{const e=M;M=null,ae(()=>$e(this),!1),M=e}if(A){const e=this.observers?this.observers.length:0;A.sources?(A.sources.push(this),A.sourceSlots.push(e)):(A.sources=[this],A.sourceSlots=[e]),this.observers?(this.observers.push(A),this.observerSlots.push(A.sources.length-1)):(this.observers=[A],this.observerSlots=[A.sources.length-1])}return this.value}function mt(e,t,r){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&ae(()=>{for(let i=0;i<e.observers.length;i+=1){const s=e.observers[i],c=Me&&Me.running;c&&Me.disposed.has(s),(c?!s.tState:!s.state)&&(s.pure?M.push(s):U.push(s),s.observers&&yt(s)),c||(s.state=K)}if(M.length>1e6)throw M=[],new Error},!1)),t}function ce(e){if(!e.fn)return;Oe(e);const t=Ae;Nt(e,e.value,t)}function Nt(e,t,r){let n;const i=E,s=A;A=E=e;try{n=e.fn(t)}catch(c){return e.pure&&(e.state=K,e.owned&&e.owned.forEach(Oe),e.owned=null),e.updatedAt=r+1,bt(c)}finally{A=s,E=i}(!e.updatedAt||e.updatedAt<=r)&&(e.updatedAt!=null&&"observers"in e?mt(e,n):e.value=n,e.updatedAt=r)}function De(e,t,r,n=K,i){const s={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:E,context:E?E.context:null,pure:r};return E===null||E!==ut&&(E.owned?E.owned.push(s):E.owned=[s]),s}function xe(e){if(e.state===0)return;if(e.state===ve)return $e(e);if(e.suspense&&Q(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Ae);)e.state&&t.push(e);for(let r=t.length-1;r>=0;r--)if(e=t[r],e.state===K)ce(e);else if(e.state===ve){const n=M;M=null,ae(()=>$e(e,t[0]),!1),M=n}}function ae(e,t){if(M)return e();let r=!1;t||(M=[]),U?r=!0:U=[],Ae++;try{const n=e();return Lt(r),n}catch(n){r||(U=null),M=null,bt(n)}}function Lt(e){if(M&&(gt(M),M=null),e)return;const t=U;U=null,t.length&&ae(()=>ft(t),!1)}function gt(e){for(let t=0;t<e.length;t++)xe(e[t])}function jt(e){let t,r=0;for(t=0;t<e.length;t++){const n=e[t];n.user?e[r++]=n:xe(n)}for(t=0;t<r;t++)xe(e[t])}function $e(e,t){e.state=0;for(let r=0;r<e.sources.length;r+=1){const n=e.sources[r];if(n.sources){const i=n.state;i===K?n!==t&&(!n.updatedAt||n.updatedAt<Ae)&&xe(n):i===ve&&$e(n,t)}}}function yt(e){for(let t=0;t<e.observers.length;t+=1){const r=e.observers[t];r.state||(r.state=ve,r.pure?M.push(r):U.push(r),r.observers&&yt(r))}}function Oe(e){let t;if(e.sources)for(;e.sources.length;){const r=e.sources.pop(),n=e.sourceSlots.pop(),i=r.observers;if(i&&i.length){const s=i.pop(),c=r.observerSlots.pop();n<i.length&&(s.sourceSlots[c]=n,i[n]=s,r.observerSlots[n]=c)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)Oe(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function zt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function bt(e,t=E){throw zt(e)}const It=Symbol("fallback");function We(e){for(let t=0;t<e.length;t++)e[t]()}function Rt(e,t,r={}){let n=[],i=[],s=[],c=0,o=t.length>1?[]:null;return Ge(()=>We(s)),()=>{let l=e()||[],f,a;return l[Bt],Q(()=>{let d=l.length,g,p,m,C,w,v,k,L,j;if(d===0)c!==0&&(We(s),s=[],n=[],i=[],c=0,o&&(o=[])),r.fallback&&(n=[It],i[0]=me(_=>(s[0]=_,r.fallback())),c=1);else if(c===0){for(i=new Array(d),a=0;a<d;a++)n[a]=l[a],i[a]=me(u);c=d}else{for(m=new Array(d),C=new Array(d),o&&(w=new Array(d)),v=0,k=Math.min(c,d);v<k&&n[v]===l[v];v++);for(k=c-1,L=d-1;k>=v&&L>=v&&n[k]===l[L];k--,L--)m[L]=i[k],C[L]=s[k],o&&(w[L]=o[k]);for(g=new Map,p=new Array(L+1),a=L;a>=v;a--)j=l[a],f=g.get(j),p[a]=f===void 0?-1:f,g.set(j,a);for(f=v;f<=k;f++)j=n[f],a=g.get(j),a!==void 0&&a!==-1?(m[a]=i[f],C[a]=s[f],o&&(w[a]=o[f]),a=p[a],g.set(j,a)):s[f]();for(a=v;a<d;a++)a in m?(i[a]=m[a],s[a]=C[a],o&&(o[a]=w[a],o[a](a))):i[a]=me(u);i=i.slice(0,c=d),n=l.slice(0)}return i});function u(d){if(s[a]=d,o){const[g,p]=re(a);return o[a]=p,t(l[a],g)}return t(l[a])}}}function N(e,t){return Q(()=>e(t||{}))}function ue(){return!0}const ze={get(e,t,r){return t===we?r:e.get(t)},has(e,t){return t===we?!0:e.has(t)},set:ue,deleteProperty:ue,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:ue,deleteProperty:ue}},ownKeys(e){return e.keys()}};function Ne(e){return(e=typeof e=="function"?e():e)?e:{}}function Vt(){for(let e=0,t=this.length;e<t;++e){const r=this[e]();if(r!==void 0)return r}}function Ke(...e){let t=!1;for(let c=0;c<e.length;c++){const o=e[c];t=t||!!o&&we in o,e[c]=typeof o=="function"?(t=!0,ne(o)):o}if(t)return new Proxy({get(c){for(let o=e.length-1;o>=0;o--){const l=Ne(e[o])[c];if(l!==void 0)return l}},has(c){for(let o=e.length-1;o>=0;o--)if(c in Ne(e[o]))return!0;return!1},keys(){const c=[];for(let o=0;o<e.length;o++)c.push(...Object.keys(Ne(e[o])));return[...new Set(c)]}},ze);const r={},n=Object.create(null);for(let c=e.length-1;c>=0;c--){const o=e[c];if(!o)continue;const l=Object.getOwnPropertyNames(o);for(let f=l.length-1;f>=0;f--){const a=l[f];if(a==="__proto__"||a==="constructor")continue;const u=Object.getOwnPropertyDescriptor(o,a);if(!n[a])n[a]=u.get?{enumerable:!0,configurable:!0,get:Vt.bind(r[a]=[u.get.bind(o)])}:u.value!==void 0?u:void 0;else{const d=r[a];d&&(u.get?d.push(u.get.bind(o)):u.value!==void 0&&d.push(()=>u.value))}}}const i={},s=Object.keys(n);for(let c=s.length-1;c>=0;c--){const o=s[c],l=n[o];l&&l.get?Object.defineProperty(i,o,l):i[o]=l?l.value:void 0}return i}function _t(e,...t){if(we in e){const i=new Set(t.length>1?t.flat():t[0]),s=t.map(c=>new Proxy({get(o){return c.includes(o)?e[o]:void 0},has(o){return c.includes(o)&&o in e},keys(){return c.filter(o=>o in e)}},ze));return s.push(new Proxy({get(c){return i.has(c)?void 0:e[c]},has(c){return i.has(c)?!1:c in e},keys(){return Object.keys(e).filter(c=>!i.has(c))}},ze)),s}const r={},n=t.map(()=>({}));for(const i of Object.getOwnPropertyNames(e)){const s=Object.getOwnPropertyDescriptor(e,i),c=!s.get&&!s.set&&s.enumerable&&s.writable&&s.configurable;let o=!1,l=0;for(const f of t)f.includes(i)&&(o=!0,c?n[l][i]=s.value:Object.defineProperty(n[l],i,s)),++l;o||(c?r[i]=s.value:Object.defineProperty(r,i,s))}return[...n,r]}function Ze(e){const t="fallback"in e&&{fallback:()=>e.fallback};return ne(Rt(()=>e.each,e.children,t||void 0))}const Gt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Dt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Gt]),Ht=new Set(["innerHTML","textContent","innerText","children"]),Ut=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Ft=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Wt(e,t){const r=Ft[e];return typeof r=="object"?r[t]?r.$:void 0:r}const Kt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Zt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function qt(e,t,r){let n=r.length,i=t.length,s=n,c=0,o=0,l=t[i-1].nextSibling,f=null;for(;c<i||o<s;){if(t[c]===r[o]){c++,o++;continue}for(;t[i-1]===r[s-1];)i--,s--;if(i===c){const a=s<n?o?r[o-1].nextSibling:r[s-o]:l;for(;o<s;)e.insertBefore(r[o++],a)}else if(s===o)for(;c<i;)(!f||!f.has(t[c]))&&t[c].remove(),c++;else if(t[c]===r[s-1]&&r[o]===t[i-1]){const a=t[--i].nextSibling;e.insertBefore(r[o++],t[c++].nextSibling),e.insertBefore(r[--s],a),t[i]=r[s]}else{if(!f){f=new Map;let u=o;for(;u<s;)f.set(r[u],u++)}const a=f.get(t[c]);if(a!=null)if(o<a&&a<s){let u=c,d=1,g;for(;++u<i&&u<s&&!((g=f.get(t[u]))==null||g!==a+d);)d++;if(d>a-o){const p=t[c];for(;o<a;)e.insertBefore(r[o++],p)}else e.replaceChild(r[o++],t[c++])}else c++;else t[c++].remove()}}}const qe="_$DX_DELEGATE";function Xt(e,t,r,n={}){let i;return me(s=>{i=s,t===document?e():P(t,e(),t.firstChild?null:void 0,r)},n.owner),()=>{i(),t.textContent=""}}function F(e,t,r){let n;const i=()=>{const c=document.createElement("template");return c.innerHTML=e,r?c.content.firstChild.firstChild:c.content.firstChild},s=t?()=>Q(()=>document.importNode(n||(n=i()),!0)):()=>(n||(n=i())).cloneNode(!0);return s.cloneNode=s,s}function le(e,t=window.document){const r=t[qe]||(t[qe]=new Set);for(let n=0,i=e.length;n<i;n++){const s=e[n];r.has(s)||(r.add(s),t.addEventListener(s,ir))}}function Ce(e,t,r){r==null?e.removeAttribute(t):e.setAttribute(t,r)}function Yt(e,t,r,n){n==null?e.removeAttributeNS(t,r):e.setAttributeNS(t,r,n)}function $(e,t){t==null?e.removeAttribute("class"):e.className=t}function Qt(e,t,r,n){if(n)Array.isArray(r)?(e[`$$${t}`]=r[0],e[`$$${t}Data`]=r[1]):e[`$$${t}`]=r;else if(Array.isArray(r)){const i=r[0];e.addEventListener(t,r[0]=s=>i.call(e,r[1],s))}else e.addEventListener(t,r)}function Jt(e,t,r={}){const n=Object.keys(t||{}),i=Object.keys(r);let s,c;for(s=0,c=i.length;s<c;s++){const o=i[s];!o||o==="undefined"||t[o]||(Ye(e,o,!1),delete r[o])}for(s=0,c=n.length;s<c;s++){const o=n[s],l=!!t[o];!o||o==="undefined"||r[o]===l||!l||(Ye(e,o,!0),r[o]=l)}return r}function er(e,t,r){if(!t)return r?Ce(e,"style"):t;const n=e.style;if(typeof t=="string")return n.cssText=t;typeof r=="string"&&(n.cssText=r=void 0),r||(r={}),t||(t={});let i,s;for(s in r)t[s]==null&&n.removeProperty(s),delete r[s];for(s in t)i=t[s],i!==r[s]&&(n.setProperty(s,i),r[s]=i);return r}function tr(e,t={},r,n){const i={};return n||R(()=>i.children=X(e,t.children,i.children)),R(()=>t.ref&&t.ref(e)),R(()=>rr(e,t,r,!0,i,!0)),i}function Xe(e,t,r){return Q(()=>e(t,r))}function P(e,t,r,n){if(r!==void 0&&!n&&(n=[]),typeof t!="function")return X(e,t,n,r);R(i=>X(e,t(),i,r),n)}function rr(e,t,r,n,i={},s=!1){t||(t={});for(const c in i)if(!(c in t)){if(c==="children")continue;i[c]=Qe(e,c,null,i[c],r,s)}for(const c in t){if(c==="children"){n||X(e,t.children);continue}const o=t[c];i[c]=Qe(e,c,o,i[c],r,s)}}function nr(e){return e.toLowerCase().replace(/-([a-z])/g,(t,r)=>r.toUpperCase())}function Ye(e,t,r){const n=t.trim().split(/\s+/);for(let i=0,s=n.length;i<s;i++)e.classList.toggle(n[i],r)}function Qe(e,t,r,n,i,s){let c,o,l,f,a;if(t==="style")return er(e,r,n);if(t==="classList")return Jt(e,r,n);if(r===n)return n;if(t==="ref")s||r(e);else if(t.slice(0,3)==="on:"){const u=t.slice(3);n&&e.removeEventListener(u,n),r&&e.addEventListener(u,r)}else if(t.slice(0,10)==="oncapture:"){const u=t.slice(10);n&&e.removeEventListener(u,n,!0),r&&e.addEventListener(u,r,!0)}else if(t.slice(0,2)==="on"){const u=t.slice(2).toLowerCase(),d=Kt.has(u);if(!d&&n){const g=Array.isArray(n)?n[0]:n;e.removeEventListener(u,g)}(d||r)&&(Qt(e,u,r,d),d&&le([u]))}else if(t.slice(0,5)==="attr:")Ce(e,t.slice(5),r);else if((a=t.slice(0,5)==="prop:")||(l=Ht.has(t))||!i&&((f=Wt(t,e.tagName))||(o=Dt.has(t)))||(c=e.nodeName.includes("-")))a&&(t=t.slice(5),o=!0),t==="class"||t==="className"?$(e,r):c&&!o&&!l?e[nr(t)]=r:e[f||t]=r;else{const u=i&&t.indexOf(":")>-1&&Zt[t.split(":")[0]];u?Yt(e,u,t,r):Ce(e,Ut[t]||t,r)}return r}function ir(e){const t=`$$${e.type}`;let r=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==r&&Object.defineProperty(e,"target",{configurable:!0,value:r}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return r||document}});r;){const n=r[t];if(n&&!r.disabled){const i=r[`${t}Data`];if(i!==void 0?n.call(r,i,e):n.call(r,e),e.cancelBubble)return}r=r._$host||r.parentNode||r.host}}function X(e,t,r,n,i){for(;typeof r=="function";)r=r();if(t===r)return r;const s=typeof t,c=n!==void 0;if(e=c&&r[0]&&r[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),c){let o=r[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),r=Z(e,r,n,o)}else r!==""&&typeof r=="string"?r=e.firstChild.data=t:r=e.textContent=t;else if(t==null||s==="boolean")r=Z(e,r,n);else{if(s==="function")return R(()=>{let o=t();for(;typeof o=="function";)o=o();r=X(e,o,r,n)}),()=>r;if(Array.isArray(t)){const o=[],l=r&&Array.isArray(r);if(Ie(o,t,r,i))return R(()=>r=X(e,o,r,n,!0)),()=>r;if(o.length===0){if(r=Z(e,r,n),c)return r}else l?r.length===0?Je(e,o,n):qt(e,r,o):(r&&Z(e),Je(e,o));r=o}else if(t.nodeType){if(Array.isArray(r)){if(c)return r=Z(e,r,n,t);Z(e,r,null,t)}else r==null||r===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);r=t}}return r}function Ie(e,t,r,n){let i=!1;for(let s=0,c=t.length;s<c;s++){let o=t[s],l=r&&r[s],f;if(!(o==null||o===!0||o===!1))if((f=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=Ie(e,o,l)||i;else if(f==="function")if(n){for(;typeof o=="function";)o=o();i=Ie(e,Array.isArray(o)?o:[o],Array.isArray(l)?l:[l])||i}else e.push(o),i=!0;else{const a=String(o);l&&l.nodeType===3&&l.data===a?e.push(l):e.push(document.createTextNode(a))}}return i}function Je(e,t,r=null){for(let n=0,i=t.length;n<i;n++)e.insertBefore(t[n],r)}function Z(e,t,r,n){if(r===void 0)return e.textContent="";const i=n||document.createTextNode("");if(t.length){let s=!1;for(let c=t.length-1;c>=0;c--){const o=t[c];if(i!==o){const l=o.parentNode===e;!s&&!c?l?e.replaceChild(i,o):e.insertBefore(i,r):l&&o.remove()}else s=!0}}else e.insertBefore(i,r);return[i]}const sr=!1;function or(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function cr(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var ar=function(){function e(r){var n=this;this._insertTag=function(i){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(i,s),n.tags.push(i)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(cr(this));var i=this.tags[this.tags.length-1];if(this.isSpeedy){var s=or(i);try{s.insertRule(n,s.cssRules.length)}catch{}}else i.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}(),B="-ms-",Se="-moz-",y="-webkit-",wt="comm",He="rule",Ue="decl",lr="@import",pt="@keyframes",fr="@layer",ur=Math.abs,Ee=String.fromCharCode,dr=Object.assign;function hr(e,t){return T(e,0)^45?(((t<<2^T(e,0))<<2^T(e,1))<<2^T(e,2))<<2^T(e,3):0}function vt(e){return e.trim()}function mr(e,t){return(e=t.exec(e))?e[0]:e}function b(e,t,r){return e.replace(t,r)}function Re(e,t){return e.indexOf(t)}function T(e,t){return e.charCodeAt(t)|0}function ie(e,t,r){return e.slice(t,r)}function G(e){return e.length}function Fe(e){return e.length}function de(e,t){return t.push(e),e}function gr(e,t){return e.map(t).join("")}var Pe=1,Y=1,xt=0,z=0,O=0,J="";function Te(e,t,r,n,i,s,c){return{value:e,root:t,parent:r,type:n,props:i,children:s,line:Pe,column:Y,length:c,return:""}}function ee(e,t){return dr(Te("",null,null,"",null,null,0),e,{length:-e.length},t)}function yr(){return O}function br(){return O=z>0?T(J,--z):0,Y--,O===10&&(Y=1,Pe--),O}function V(){return O=z<xt?T(J,z++):0,Y++,O===10&&(Y=1,Pe++),O}function H(){return T(J,z)}function ge(){return z}function fe(e,t){return ie(J,e,t)}function se(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function $t(e){return Pe=Y=1,xt=G(J=e),z=0,[]}function Ct(e){return J="",e}function ye(e){return vt(fe(z-1,Ve(e===91?e+2:e===40?e+1:e)))}function wr(e){for(;(O=H())&&O<33;)V();return se(e)>2||se(O)>3?"":" "}function pr(e,t){for(;--t&&V()&&!(O<48||O>102||O>57&&O<65||O>70&&O<97););return fe(e,ge()+(t<6&&H()==32&&V()==32))}function Ve(e){for(;V();)switch(O){case e:return z;case 34:case 39:e!==34&&e!==39&&Ve(O);break;case 40:e===41&&Ve(e);break;case 92:V();break}return z}function vr(e,t){for(;V()&&e+O!==57;)if(e+O===84&&H()===47)break;return"/*"+fe(t,z-1)+"*"+Ee(e===47?e:V())}function xr(e){for(;!se(H());)V();return fe(e,z)}function $r(e){return Ct(be("",null,null,null,[""],e=$t(e),0,[0],e))}function be(e,t,r,n,i,s,c,o,l){for(var f=0,a=0,u=c,d=0,g=0,p=0,m=1,C=1,w=1,v=0,k="",L=i,j=s,_=n,x=k;C;)switch(p=v,v=V()){case 40:if(p!=108&&T(x,u-1)==58){Re(x+=b(ye(v),"&","&\f"),"&\f")!=-1&&(w=-1);break}case 34:case 39:case 91:x+=ye(v);break;case 9:case 10:case 13:case 32:x+=wr(p);break;case 92:x+=pr(ge()-1,7);continue;case 47:switch(H()){case 42:case 47:de(Cr(vr(V(),ge()),t,r),l);break;default:x+="/"}break;case 123*m:o[f++]=G(x)*w;case 125*m:case 59:case 0:switch(v){case 0:case 125:C=0;case 59+a:w==-1&&(x=b(x,/\f/g,"")),g>0&&G(x)-u&&de(g>32?tt(x+";",n,r,u-1):tt(b(x," ","")+";",n,r,u-2),l);break;case 59:x+=";";default:if(de(_=et(x,t,r,f,a,i,o,k,L=[],j=[],u),s),v===123)if(a===0)be(x,t,_,_,L,s,u,o,j);else switch(d===99&&T(x,3)===110?100:d){case 100:case 108:case 109:case 115:be(e,_,_,n&&de(et(e,_,_,0,0,i,o,k,i,L=[],u),j),i,j,u,o,n?L:j);break;default:be(x,_,_,_,[""],j,0,o,j)}}f=a=g=0,m=w=1,k=x="",u=c;break;case 58:u=1+G(x),g=p;default:if(m<1){if(v==123)--m;else if(v==125&&m++==0&&br()==125)continue}switch(x+=Ee(v),v*m){case 38:w=a>0?1:(x+="\f",-1);break;case 44:o[f++]=(G(x)-1)*w,w=1;break;case 64:H()===45&&(x+=ye(V())),d=H(),a=u=G(k=x+=xr(ge())),v++;break;case 45:p===45&&G(x)==2&&(m=0)}}return s}function et(e,t,r,n,i,s,c,o,l,f,a){for(var u=i-1,d=i===0?s:[""],g=Fe(d),p=0,m=0,C=0;p<n;++p)for(var w=0,v=ie(e,u+1,u=ur(m=c[p])),k=e;w<g;++w)(k=vt(m>0?d[w]+" "+v:b(v,/&\f/g,d[w])))&&(l[C++]=k);return Te(e,t,r,i===0?He:o,l,f,a)}function Cr(e,t,r){return Te(e,t,r,wt,Ee(yr()),ie(e,2,-2),0)}function tt(e,t,r,n){return Te(e,t,r,Ue,ie(e,0,n),ie(e,n+1,-1),n)}function q(e,t){for(var r="",n=Fe(e),i=0;i<n;i++)r+=t(e[i],i,e,t)||"";return r}function Sr(e,t,r,n){switch(e.type){case fr:if(e.children.length)break;case lr:case Ue:return e.return=e.return||e.value;case wt:return"";case pt:return e.return=e.value+"{"+q(e.children,n)+"}";case He:e.value=e.props.join(",")}return G(r=q(e.children,n))?e.return=e.value+"{"+r+"}":""}function kr(e){var t=Fe(e);return function(r,n,i,s){for(var c="",o=0;o<t;o++)c+=e[o](r,n,i,s)||"";return c}}function Ar(e){return function(t){t.root||(t=t.return)&&e(t)}}function Or(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var Er=function(t,r,n){for(var i=0,s=0;i=s,s=H(),i===38&&s===12&&(r[n]=1),!se(s);)V();return fe(t,z)},Pr=function(t,r){var n=-1,i=44;do switch(se(i)){case 0:i===38&&H()===12&&(r[n]=1),t[n]+=Er(z-1,r,n);break;case 2:t[n]+=ye(i);break;case 4:if(i===44){t[++n]=H()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=Ee(i)}while(i=V());return t},Tr=function(t,r){return Ct(Pr($t(t),r))},rt=new WeakMap,Br=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,i=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!rt.get(n))&&!i){rt.set(t,!0);for(var s=[],c=Tr(r,s),o=n.props,l=0,f=0;l<c.length;l++)for(var a=0;a<o.length;a++,f++)t.props[f]=s[l]?c[l].replace(/&\f/g,o[a]):o[a]+" "+c[l]}}},Mr=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};function St(e,t){switch(hr(e,t)){case 5103:return y+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return y+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return y+e+Se+e+B+e+e;case 6828:case 4268:return y+e+B+e+e;case 6165:return y+e+B+"flex-"+e+e;case 5187:return y+e+b(e,/(\w+).+(:[^]+)/,y+"box-$1$2"+B+"flex-$1$2")+e;case 5443:return y+e+B+"flex-item-"+b(e,/flex-|-self/,"")+e;case 4675:return y+e+B+"flex-line-pack"+b(e,/align-content|flex-|-self/,"")+e;case 5548:return y+e+B+b(e,"shrink","negative")+e;case 5292:return y+e+B+b(e,"basis","preferred-size")+e;case 6060:return y+"box-"+b(e,"-grow","")+y+e+B+b(e,"grow","positive")+e;case 4554:return y+b(e,/([^-])(transform)/g,"$1"+y+"$2")+e;case 6187:return b(b(b(e,/(zoom-|grab)/,y+"$1"),/(image-set)/,y+"$1"),e,"")+e;case 5495:case 3959:return b(e,/(image-set\([^]*)/,y+"$1$`$1");case 4968:return b(b(e,/(.+:)(flex-)?(.*)/,y+"box-pack:$3"+B+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+y+e+e;case 4095:case 3583:case 4068:case 2532:return b(e,/(.+)-inline(.+)/,y+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(G(e)-1-t>6)switch(T(e,t+1)){case 109:if(T(e,t+4)!==45)break;case 102:return b(e,/(.+:)(.+)-([^]+)/,"$1"+y+"$2-$3$1"+Se+(T(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Re(e,"stretch")?St(b(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(T(e,t+1)!==115)break;case 6444:switch(T(e,G(e)-3-(~Re(e,"!important")&&10))){case 107:return b(e,":",":"+y)+e;case 101:return b(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+y+(T(e,14)===45?"inline-":"")+"box$3$1"+y+"$2$3$1"+B+"$2box$3")+e}break;case 5936:switch(T(e,t+11)){case 114:return y+e+B+b(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return y+e+B+b(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return y+e+B+b(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return y+e+B+e+e}return e}var Nr=function(t,r,n,i){if(t.length>-1&&!t.return)switch(t.type){case Ue:t.return=St(t.value,t.length);break;case pt:return q([ee(t,{value:b(t.value,"@","@"+y)})],i);case He:if(t.length)return gr(t.props,function(s){switch(mr(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return q([ee(t,{props:[b(s,/:(read-\w+)/,":"+Se+"$1")]})],i);case"::placeholder":return q([ee(t,{props:[b(s,/:(plac\w+)/,":"+y+"input-$1")]}),ee(t,{props:[b(s,/:(plac\w+)/,":"+Se+"$1")]}),ee(t,{props:[b(s,/:(plac\w+)/,B+"input-$1")]})],i)}return""})}},Lr=[Nr],jr=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(m){var C=m.getAttribute("data-emotion");C.indexOf(" ")!==-1&&(document.head.appendChild(m),m.setAttribute("data-s",""))})}var i=t.stylisPlugins||Lr,s={},c,o=[];c=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(m){for(var C=m.getAttribute("data-emotion").split(" "),w=1;w<C.length;w++)s[C[w]]=!0;o.push(m)});var l,f=[Br,Mr];{var a,u=[Sr,Ar(function(m){a.insert(m)})],d=kr(f.concat(i,u)),g=function(C){return q($r(C),d)};l=function(C,w,v,k){a=v,g(C?C+"{"+w.styles+"}":w.styles),k&&(p.inserted[w.name]=!0)}}var p={key:r,sheet:new ar({key:r,container:c,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return p.sheet.hydrate(o),p};function zr(e){for(var t=0,r,n=0,i=e.length;i>=4;++n,i-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(i){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Ir={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Rr=/[A-Z]|^ms/g,Vr=/_EMO_([^_]+?)_([^]*?)_EMO_/g,kt=function(t){return t.charCodeAt(1)===45},nt=function(t){return t!=null&&typeof t!="boolean"},Le=Or(function(e){return kt(e)?e:e.replace(Rr,"-$&").toLowerCase()}),it=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(Vr,function(n,i,s){return D={name:i,styles:s,next:D},i})}return Ir[t]!==1&&!kt(t)&&typeof r=="number"&&r!==0?r+"px":r};function oe(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return D={name:r.name,styles:r.styles,next:D},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)D={name:n.name,styles:n.styles,next:D},n=n.next;var i=r.styles+";";return i}return _r(e,t,r)}case"function":{if(e!==void 0){var s=D,c=r(e);return D=s,oe(e,t,c)}break}}if(t==null)return r;var o=t[r];return o!==void 0?o:r}function _r(e,t,r){var n="";if(Array.isArray(r))for(var i=0;i<r.length;i++)n+=oe(e,t,r[i])+";";else for(var s in r){var c=r[s];if(typeof c!="object")t!=null&&t[c]!==void 0?n+=s+"{"+t[c]+"}":nt(c)&&(n+=Le(s)+":"+it(s,c)+";");else if(Array.isArray(c)&&typeof c[0]=="string"&&(t==null||t[c[0]]===void 0))for(var o=0;o<c.length;o++)nt(c[o])&&(n+=Le(s)+":"+it(s,c[o])+";");else{var l=oe(e,t,c);switch(s){case"animation":case"animationName":{n+=Le(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var st=/label:\s*([^\s;\n{]+)\s*(;|$)/g,D,je=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var i=!0,s="";D=void 0;var c=t[0];c==null||c.raw===void 0?(i=!1,s+=oe(n,r,c)):s+=c[0];for(var o=1;o<t.length;o++)s+=oe(n,r,t[o]),i&&(s+=c[o]);st.lastIndex=0;for(var l="",f;(f=st.exec(s))!==null;)l+="-"+f[1];var a=zr(s)+l;return{name:a,styles:s,next:D}},Gr=!0;function At(e,t,r){var n="";return r.split(" ").forEach(function(i){e[i]!==void 0?t.push(e[i]+";"):n+=i+" "}),n}var Dr=function(t,r,n){var i=t.key+"-"+r.name;(n===!1||Gr===!1)&&t.registered[i]===void 0&&(t.registered[i]=r.styles)},Hr=function(t,r,n){Dr(t,r,n);var i=t.key+"-"+r.name;if(t.inserted[r.name]===void 0){var s=r;do t.insert(r===s?"."+i:"",s,t.sheet,!0),s=s.next;while(s!==void 0)}};function ot(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function ct(e,t,r){var n=[],i=At(e,n,r);return n.length<2?r:i+t(n)}var Ur=function(t){var r=jr(t);r.sheet.speedy=function(o){this.isSpeedy=o},r.compat=!0;var n=function(){for(var l=arguments.length,f=new Array(l),a=0;a<l;a++)f[a]=arguments[a];var u=je(f,r.registered,void 0);return Hr(r,u,!1),r.key+"-"+u.name},i=function(){for(var l=arguments.length,f=new Array(l),a=0;a<l;a++)f[a]=arguments[a];var u=je(f,r.registered),d="animation-"+u.name;return ot(r,{name:u.name,styles:"@keyframes "+d+"{"+u.styles+"}"}),d},s=function(){for(var l=arguments.length,f=new Array(l),a=0;a<l;a++)f[a]=arguments[a];var u=je(f,r.registered);ot(r,u)},c=function(){for(var l=arguments.length,f=new Array(l),a=0;a<l;a++)f[a]=arguments[a];return ct(r.registered,n,Fr(f))};return{css:n,cx:c,injectGlobal:s,keyframes:i,hydrate:function(l){l.forEach(function(f){r.inserted[f]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:At.bind(null,r.registered),merge:ct.bind(null,r.registered,n)}},Fr=function e(t){for(var r="",n=0;n<t.length;n++){var i=t[n];if(i!=null){var s=void 0;switch(typeof i){case"boolean":break;case"object":{if(Array.isArray(i))s=e(i);else{s="";for(var c in i)i[c]&&c&&(s&&(s+=" "),s+=c)}break}default:s=i}s&&(r&&(r+=" "),r+=s)}}return r},Wr=Ur({key:"css"}),S=Wr.css,Kr=F("<svg stroke-width=0>");function Be(e,t){const r=Ke(e.a,t),[n,i]=_t(r,["src"]),[s,c]=re(""),o=ne(()=>t.title?`${e.c}<title>${t.title}</title>`:e.c);return dt(()=>c(o())),Ge(()=>{c("")}),(()=>{var l=Kr();return tr(l,Ke({get stroke(){var f;return(f=e.a)==null?void 0:f.stroke},get color(){return t.color||"currentColor"},get fill(){return t.color||"currentColor"},get style(){return{...t.style,overflow:"visible"}}},i,{get height(){return t.size||"1em"},get width(){return t.size||"1em"},xmlns:"http://www.w3.org/2000/svg",get innerHTML(){return s()}}),!0,!0),P(l,()=>sr),l})()}function Zr(e){return Be({a:{viewBox:"0 0 496 512"},c:'<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>'},e)}function qr(e){return Be({a:{viewBox:"0 0 640 512"},c:'<path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z"/>'},e)}function Ot(e){return Be({a:{viewBox:"0 0 448 512"},c:'<path d="M224 256a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z"/>'},e)}var Xr=F('<footer>© 2023 - 2024<a title="Go to the Source"target=_blank type=text/html rel="noopener noreferrer nofollow external author"href=https://github.com/eldarlrd/ts-battleship> eldarlrd');const Yr=()=>(()=>{var e=Xr(),t=e.firstChild,r=t.nextSibling,n=r.firstChild;return $(e,S`
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 1.25rem;
        font-weight: 600;
        margin: 1rem;
        gap: 0.5rem;
      `),P(r,N(Zr,{}),n),R(()=>$(r,S`
          border-radius: 0.125rem;
          text-decoration: none;
          color: inherit;
          transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            color: ${h.grid};
          }

          svg {
            vertical-align: top;
          }
        `)),e})();var Qr=F("<header>TS Battleship");const Jr=()=>(()=>{var e=Qr();return $(e,S`
        font-size: 2.5rem;
        font-weight: 600;
        margin: 1rem;
      `),e})();function en(e){return Be({a:{viewBox:"0 0 512 512"},c:'<path d="M440.88 129.37 288.16 40.62a64.14 64.14 0 0 0-64.33 0L71.12 129.37a4 4 0 0 0 0 6.9L254 243.85a4 4 0 0 0 4.06 0L440.9 136.27a4 4 0 0 0-.02-6.9ZM256 152c-13.25 0-24-7.16-24-16s10.75-16 24-16 24 7.16 24 16-10.75 16-24 16ZM238 270.81 54 163.48a4 4 0 0 0-6 3.46v173.92a48 48 0 0 0 23.84 41.39L234 479.48a4 4 0 0 0 6-3.46V274.27a4 4 0 0 0-2-3.46ZM96 368c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm96-32c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24ZM458 163.51 274 271.56a4 4 0 0 0-2 3.45V476a4 4 0 0 0 6 3.46l162.15-97.23A48 48 0 0 0 464 340.86V167a4 4 0 0 0-6-3.49ZM320 424c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm96 32c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Zm0-88c-8.84 0-16-10.75-16-24s7.16-24 16-24 16 10.75 16 24-7.16 24-16 24Z"/>'},e)}var tn=F("<section>"),rn=F("<button type=button>");const _e=e=>{const t=(n,i)=>{if(e.game.playerVictorious)return;e.game.takeTurn({row:n,col:i})&&(r(n,i),document.dispatchEvent(new Event("attack")),e.game.pve&&!e.game.playerVictorious&&setTimeout(()=>{const c=e.game.computerTurn();r(c.row,c.col),document.dispatchEvent(new Event("attack"))},150))},r=(n,i)=>{const s=document.getElementById((e.game.isCurrPlayerOne?"p1-":"p2-")+(n*10+i));e.game.isCurrPlayerOne?e.game.playerOneBoard.impacts.forEach(c=>{const{row:o,col:l}=c,f=e.game.playerOneBoard.grid[o][l];if(!f)e.game.playerOneBoard.impacts.some(a=>a.row===n&&a.col===i)&&s&&(s.style.backgroundColor=h.emptyHit,s.style.cursor="default");else if(e.game.playerOneBoard.impacts.some(a=>a.row===n&&a.col===i)&&s){if(f.sunk)for(let a=0;a<f.length;a++){const u=f.isVertical?f.coords.row+a:o,d=f.isVertical?l:f.coords.col+a,g=document.getElementById("p1-"+(u*10+d));g&&(g.style.backgroundColor=h.shipSunk)}else s.style.backgroundColor=h.shipHit;s.style.cursor="default"}}):e.game.playerTwoBoard.impacts.forEach(c=>{const{row:o,col:l}=c,f=e.game.playerTwoBoard.grid[o][l];if(!f)e.game.playerTwoBoard.impacts.some(a=>a.row===n&&a.col===i)&&s&&(s.style.backgroundColor=h.emptyHit,s.style.cursor="default");else if(e.game.playerTwoBoard.impacts.some(a=>a.row===n&&a.col===i)&&s){if(f.sunk)for(let a=0;a<f.length;a++){const u=f.isVertical?f.coords.row+a:o,d=f.isVertical?l:f.coords.col+a,g=document.getElementById("p2-"+(u*10+d));g&&(g.style.backgroundColor=h.shipSunk)}else s.style.backgroundColor=h.shipHit;s.style.cursor="default"}})};return(()=>{var n=tn();return P(n,N(Ze,{get each(){return e.isPlayerOneBoard?e.game.playerOneBoard.grid:e.game.playerTwoBoard.grid},children:(i,s)=>N(Ze,{each:i,children:(c,o)=>(()=>{var l=rn();return l.$$click=()=>{!e.isPlayerOneBoard&&t(s(),o())},R(f=>{var a=`${e.isPlayerOneBoard?"p1-":"p2-"}${(s()*10+o()).toString()}`,u=S`
                  background-color: ${c&&e.isPlayerOneBoard?h.ship:h.secondary};
                  border: 1px solid ${h.grid};
                  padding: 13px;
                  text-align: center;
                  cursor: ${!e.isPlayerOneBoard&&"pointer"};

                  &:hover {
                    background-color: ${!e.isPlayerOneBoard&&h.hover};
                  }

                  ${W.md} {
                    padding: 1rem;
                  }

                  ${W.lg} {
                    padding: 1.25rem;
                  }
                `;return a!==f.e&&Ce(l,"id",f.e=a),u!==f.t&&$(l,f.t=u),f},{e:void 0,t:void 0}),l})()})})),R(()=>$(n,S`
        font-size: 2.5rem;
        font-weight: 600;
        display: grid;
        border: 1px solid ${h.grid};
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(10, 1fr);
      `)),n})()};le(["click"]);class at{constructor(){I(this,"grid");I(this,"impacts");this.grid=Array.from({length:10},()=>Array(10).fill(null)),this.impacts=[]}place(t,r,n){if(!this.isPlaceable(t,r,n))return!1;const{row:i,col:s}=r,c=n?1:0;for(let o=0;o<t.length;o++)this.grid[i+o*c][s+o*(1-c)]=t;return!0}fire(t){const{row:r,col:n}=t,i=this.grid[r][n];return this.impacts.some(c=>c.row===r&&c.col===n)?!1:(i?(i.hit(),this.impacts.push(t)):this.impacts.push(t),!0)}isGameOver(){return this.grid.flat().filter(t=>t!==null).every(t=>t==null?void 0:t.sunk)}isPlaceable(t,r,n){const{row:i,col:s}=r,c=n?1:0;for(let o=0;o<t.length;o++){const l=i+o*c,f=s+o*(1-c);if(l<0||l>=10||f<0||f>=10||this.grid[l][f]!==null||this.isAdjacent(l,f))return!1}return!0}isAdjacent(t,r){const n=[{row:-1,col:0},{row:1,col:0},{row:0,col:-1},{row:0,col:1},{row:-1,col:-1},{row:-1,col:1},{row:1,col:-1},{row:1,col:1}];for(const i of n){const s=t+i.row,c=r+i.col;if(s>=0&&s<10&&c>=0&&c<10&&this.grid[s][c])return!0}return!1}}class te{constructor(t=2){I(this,"length");I(this,"sunk");I(this,"coords");I(this,"isVertical");I(this,"hits");this.length=t,this.sunk=!1,this.coords={row:0,col:0},this.isVertical=!1,this.hits=0}hit(){this.sunk||(this.hits++,this.isSunk())}isSunk(){this.hits===this.length&&(this.sunk=!0)}}class ke{constructor(t=!1){I(this,"playerVictorious");I(this,"playerOneBoard");I(this,"playerTwoBoard");I(this,"isCurrPlayerOne");I(this,"pve");this.playerVictorious=null,this.playerOneBoard=new at,this.playerTwoBoard=new at,t&&this.randomPlace(this.playerOneBoard),this.randomPlace(this.playerTwoBoard),this.isCurrPlayerOne=!0,this.pve=!0}takeTurn(t){return(this.isCurrPlayerOne?this.playerTwoBoard:this.playerOneBoard).fire(t)?(this.checkVictory(),this.isCurrPlayerOne=!this.isCurrPlayerOne,!0):!1}computerTurn(){let t;do{const r=~~(Math.random()*10),n=~~(Math.random()*10);t={row:r,col:n}}while(!this.takeTurn(t));return t}randomPlace(t){const r=new te(5),n=new te(4),i=new te(3),s=new te(3),c=new te(2);this.successfullyPlace(t,r),this.successfullyPlace(t,n),this.successfullyPlace(t,i),this.successfullyPlace(t,s),this.successfullyPlace(t,c)}successfullyPlace(t,r){let n=Math.random()<.5,i={row:Math.floor(Math.random()*10),col:Math.floor(Math.random()*10)};for(;!t.place(r,i,n);)n=Math.random()<.5,i={row:~~(Math.random()*10),col:~~(Math.random()*10)};t.place(r,i,n),r.isVertical=n,r.coords=i}checkVictory(){if(this.playerOneBoard.isGameOver())return this.playerVictorious=2,!0;if(this.playerTwoBoard.isGameOver())return this.playerVictorious=1,!0}}var nn=F("<div id=controls><section><h1>New Game</h1><span> Player</span><div id=ship-panel><button type=button></button></div><button type=button>Start");const sn=e=>{const[t,r]=re(!1);return(()=>{var n=nn(),i=n.firstChild,s=i.firstChild,c=s.nextSibling,o=c.firstChild,l=c.nextSibling,f=l.firstChild,a=l.nextSibling;return $(n,S`
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      `),$(s,S`
            text-align: center;
          `),$(c,S`
            font-size: 1.75rem;

            svg {
              font-size: 1.25rem;
            }
          `),P(c,N(Ot,{}),o),P(i,N(_e,{isPlayerOneBoard:!0,get game(){return e.game}}),l),$(l,S`
            text-align: end;
          `),f.$$click=()=>{e.setGame(new ke(!0)),r(!0)},P(f,N(en,{})),a.$$click=()=>{e.setIsControlUp(!1)},R(u=>{var d=S`
          display: inherit;
          flex-direction: column;
          padding: 1rem;
          margin: 1rem;
          gap: 0.75rem;
          line-height: 1rem;
          background-color: ${h.primary};
          border: 2px solid ${h.secondary};
          border-radius: 0.125rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        `,g=S`
              border: 0;
              border-radius: 0.125rem;
              cursor: pointer;
              font-size: 1.5rem;
              font-weight: 500;
              line-height: 1rem;
              padding: 0.75rem;
              background-color: ${h.secondary};
              color: ${h.grid};
              outline: 2px solid ${h.grid};
              transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

              &:hover {
                background-color: ${h.hover};
              }
            `,p=!t(),m=S`
            border: 0;
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight: 500;
            min-width: 7.625rem;
            padding: 0.75rem;
            background-color: ${h.secondary};
            color: ${h.grid};
            outline: 2px solid ${h.grid};
            transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

            &:hover {
              background-color: ${h.hover};
            }

            &:disabled {
              cursor: not-allowed;
              background-color: ${h.hover};
            }
          `;return d!==u.e&&$(i,u.e=d),g!==u.t&&$(f,u.t=g),p!==u.a&&(a.disabled=u.a=p),m!==u.o&&$(a,u.o=m),u},{e:void 0,t:void 0,a:void 0,o:void 0}),n})()};le(["click"]);var on=F("<div id=overlay><section><h1 id=victor></h1><button type=button>New Game");let he=document.getElementById("victor");const cn=e=>(dt(()=>{const t=()=>{e.game.playerVictorious&&(e.overlay.style.display="flex",e.game.pve?he.innerText=e.game.playerVictorious===1?"Player Wins!":"Computer Wins...":he.innerText=e.game.playerVictorious===1?"Player 1 Wins!":"Player 2 Wins!")};document.addEventListener("attack",t),Ge(()=>{document.removeEventListener("attack",t)})}),(()=>{var t=on(),r=t.firstChild,n=r.firstChild,i=n.nextSibling,s=e.overlay;typeof s=="function"?Xe(s,t):e.overlay=t,$(t,S`
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
      `);var c=he;return typeof c=="function"?Xe(c,n):he=n,$(n,S`
            font-size: 2.5rem;
            text-align: center;
            line-height: 1em;
          `),P(n,()=>e.game.playerVictorious),i.$$click=()=>{e.setGame(new ke),e.overlay.style.display="none",e.setIsControlUp(!0)},R(o=>{var l=S`
          display: inherit;
          flex-direction: column;
          padding: 1rem;
          margin: 1rem;
          gap: 0.75rem;
          line-height: 1rem;
          background-color: ${h.primary};
          border: 2px solid ${h.secondary};
          border-radius: 0.125rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

          ${W.sm} {
            padding: 3rem;
          }

          ${W.md} {
            padding: 4rem;
          }

          ${W.lg} {
            padding: 5rem;
          }
        `,f=S`
            border: 0;
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.5rem;
            min-width: 7.625rem;
            font-weight: 500;
            padding: 0.75rem;
            background-color: ${h.secondary};
            color: ${h.grid};
            outline: 2px solid ${h.grid};
            transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

            &:hover {
              background-color: ${h.hover};
            }
          `;return l!==o.e&&$(r,o.e=l),f!==o.t&&$(i,o.t=f),o},{e:void 0,t:void 0}),t})());le(["click"]);var an=F("<div id=app>"),ln=F("<main><div><span><span> Player</span></span><span><span> Computer</span></span></div><button type=button>New Game");const h={primary:"#60a5fa",secondary:"#f8fafc",ship:"#334155",hover:"#cbd5e1",grid:"#1e293b",emptyHit:"#10b981",shipHit:"#f59e0b",shipSunk:"#f43f5e"},W={sm:"@media (min-width: 40rem)",md:"@media (min-width: 48rem)",lg:"@media (min-width: 64rem)"};let fn=document.getElementById("overlay");const un=()=>{const[e,t]=re(new ke),[r,n]=re(!0);return(()=>{var i=an();return P(i,N(cn,{get game(){return e()},setGame:t,setIsControlUp:n,overlay:fn}),null),P(i,N(Jr,{}),null),P(i,(()=>{var s=ne(()=>!!r());return()=>s()&&N(sn,{get game(){return e()},setGame:t,setIsControlUp:n})})(),null),P(i,(()=>{var s=ne(()=>!r());return()=>s()&&(()=>{var c=ln(),o=c.firstChild,l=o.firstChild,f=l.firstChild,a=f.firstChild,u=l.nextSibling,d=u.firstChild,g=d.firstChild,p=o.nextSibling;return $(c,S`
            display: inherit;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 1.5rem auto;
          `),$(l,S`
                display: inherit;
                flex-direction: column;
                justify-content: center;
                gap: 0.25rem;

                svg {
                  font-size: 1.25rem;
                }
              `),P(f,N(Ot,{}),a),P(l,N(_e,{isPlayerOneBoard:!0,get game(){return e()}}),null),$(u,S`
                display: inherit;
                flex-direction: column;
                justify-content: center;
                gap: 0.25rem;

                svg {
                  font-size: 1.5rem;
                }
              `),P(d,N(qr,{}),g),P(u,N(_e,{isPlayerOneBoard:!1,get game(){return e()}}),null),p.$$click=()=>{t(new ke),n(!0)},R(m=>{var C=S`
              display: inherit;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              font-size: 1.75rem;
              gap: 1.5rem;

              ${W.sm} {
                flex-direction: row;
                gap: 2rem;
              }

              ${W.md} {
                gap: 2.5rem;
              }

              ${W.lg} {
                gap: 3rem;
              }
            `,w=S`
              border: 0;
              border-radius: 0.125rem;
              cursor: pointer;
              font-size: 1.5rem;
              font-weight: 500;
              padding: 0.75rem;
              min-width: 7.625rem;
              margin-top: 2rem;
              background-color: ${h.secondary};
              color: ${h.grid};
              outline: 2px solid ${h.grid};
              transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

              &:hover {
                background-color: ${h.hover};
              }
            `;return C!==m.e&&$(o,m.e=C),w!==m.t&&$(p,m.t=w),m},{e:void 0,t:void 0}),c})()})(),null),P(i,N(Yr,{}),null),R(()=>$(i,S`
        font-family: 'Stick No Bills Variable', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        min-height: 100vh;
        min-height: 100svh;
        background-color: ${h.primary};
        accent-color: ${h.secondary};
        color: ${h.secondary};

        *::selection {
          background-color: ${h.secondary};
          color: ${h.primary};
        }
      `)),i})()};console.log("Pride of a nation, a beast made of steel!");le(["click"]);const lt=document.getElementById("root");lt&&Xt(()=>N(un,{}),lt);
