const j=new WeakMap;function z(t){return j.has(t)||j.set(t,{activeTransforms:[],activeAnimations:{},activeGenerators:{}}),j.get(t)}function tt(t,e){t.indexOf(e)===-1&&t.push(e)}const P=()=>{},E=t=>t,et=["","X","Y","Z"],it=["translate","scale","rotate","skew"],$={x:"translateX",y:"translateY",z:"translateZ"},U={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},nt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:U,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:E},skew:U},S=new Map,V=t=>`--motion-${t}`,D=["x","y","z"];it.forEach(t=>{et.forEach(e=>{D.push(t+e),S.set(V(t+e),nt[t])})});const st=(t,e)=>D.indexOf(t)-D.indexOf(e),rt=new Set(D),at=t=>rt.has(t),ot=(t,e)=>{const{activeTransforms:i}=z(t);tt(i,e),t.style.transform=ct(i)},ct=t=>t.sort(st).reduce(lt,"").trim(),lt=(t,e)=>`${t} ${e}(var(${V(e)}))`,k=t=>t.startsWith("--"),q=new Set;function ft(t){if(!q.has(t)){q.add(t);try{const{syntax:e,initialValue:i}=S.has(t)?S.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:i})}catch(e){}}}const M=t=>t*1e3;function L(t){try{t.playState!=="finished"&&t.commitStyles(),t.cancel()}catch(e){}}const ut=t=>Array.isArray(t)&&typeof t[0]=="number",F=t=>Array.isArray(t)&&typeof t[0]!="number",N=t=>typeof t=="object"&&Boolean(t.createAnimation),W=t=>ut(t)?ht(t):t,ht=([t,e,i,n])=>`cubic-bezier(${t}, ${e}, ${i}, ${n})`,_=t=>document.createElement("div").animate(t,{duration:.001}),B={cssRegisterProperty:()=>typeof CSS!="undefined"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{_({opacity:[1]})}catch(t){return!1}return!0},finished:()=>Boolean(_({opacity:[0,1]}).finished)},C={},I=Object.keys(B).reduce((t,e)=>(t[e]=()=>(C[e]===void 0&&(C[e]=B[e]()),C[e]),t),{}),dt=(t,e)=>i=>t.style.setProperty(e,i),pt=(t,e)=>i=>t.style[e]=i,d={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},K=(t,e,i)=>(((1-3*i+3*e)*t+(3*i-6*e))*t+3*e)*t,yt=1e-7,gt=12;function mt(t,e,i,n,s){let r,a,h=0;do a=e+(i-e)/2,r=K(a,n,s)-t,r>0?i=a:e=a;while(Math.abs(r)>yt&&++h<gt);return a}function w(t,e,i,n){if(t===e&&i===n)return E;const s=r=>mt(r,0,1,t,i);return r=>r===0||r===1?r:K(s(r),e,n)}const bt=(t,e,i)=>Math.min(Math.max(i,t),e),Tt=(t,e="end")=>i=>{i=e==="end"?Math.min(i,.999):Math.max(i,.001);const n=i*t,s=e==="end"?Math.floor(n):Math.ceil(n);return bt(0,1,s/t)},G={ease:w(.25,.1,.25,1),"ease-in":w(.42,0,1,1),"ease-in-out":w(.42,0,.58,1),"ease-out":w(0,0,.58,1)},vt=/\((.*?)\)/;function X(t){if(typeof t=="function")return t;if(Array.isArray(t))return w(...t);if(G[t])return G[t];if(t.startsWith("steps")){const e=vt.exec(t);if(e){const i=e[1].split(",");return Tt(parseFloat(i[0]),i[1].trim())}}return E}const Z=(t,e,i)=>-i*t+i*e+t,H=(t,e,i)=>e-t==0?1:(i-t)/(e-t),At=(t,e,i)=>{const n=e-t;return((i-t)%n+n)%n+t};function St(t,e){return F(t)?t[At(0,t.length,e)]:t}function J(t,e){const i=t[t.length-1];for(let n=1;n<=e;n++){const s=H(0,e,n);t.push(Z(i,1,s))}}function wt(t){const e=[0];return J(e,t-1),e}const xt=t=>Math.min(1,Math.max(t,0));function Ot(t,e=wt(t.length),i=E){const n=t.length,s=n-e.length;return s>0&&J(e,s),r=>{let a=0;for(;a<n-2&&!(r<e[a+1]);a++);let h=xt(H(e[a],e[a+1],r));return h=St(i,a)(h),Z(t[a],t[a+1],h)}}class Pt{constructor(e,i,{easing:n=d.easing,duration:s=d.duration,delay:r=d.delay,endDelay:a=d.endDelay,repeat:h=d.repeat,offset:g,direction:l="normal"}){this.startTime=0,this.rate=1,this.t=0,this.cancelT=0,this.playState="idle",this.finished=new Promise((b,f)=>{this.resolve=b,this.reject=f});const m=s*(h+1);N(n)&&(n="ease");const x=Ot(i,g,F(n)?n.map(X):X(n));this.tick=b=>{if(this.playState==="finished"){const O=x(1);e(O),this.resolve(O);return}this.pauseTime&&(b=this.pauseTime);let f=(b-this.startTime)*this.rate;this.t=f,f/=1e3,f=Math.max(f-r,0);const T=f/s;let p=Math.floor(T),y=T%1;!y&&T>=1&&(y=1),y===1&&p--;const u=p%2;(l==="reverse"||l==="alternate"&&u||l==="alternate-reverse"&&!u)&&(y=1-y);const o=f>=m?1:Math.min(y,1),v=x(o);e(v),f>=m+a?(this.playState="finished",this.resolve(v)):this.playState!=="idle"&&requestAnimationFrame(this.tick)},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime?this.startTime=e-(this.pauseTime-this.startTime):this.startTime||(this.startTime=e),this.pauseTime=void 0,requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=performance.now()}finish(){this.playState="finished",this.tick(0)}cancel(){this.playState="idle",this.tick(this.cancelT),this.reject(!1)}reverse(){this.rate*=-1}commitStyles(){this.cancelT=this.t}get currentTime(){return this.t}set currentTime(e){this.pauseTime||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}function Et(t,e=[0,1],i={}){return new Pt(t,e,i)}const R={get:(t,e)=>{let i=k(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!i&&i!==0){const n=S.get(e);n&&(i=n.initialValue)}return i}};function Dt(t,e,i){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:R.get(e,i));return t}const Mt=t=>Array.isArray(t)?t:[t];function Ft(t,e,i,n={}){let s,{duration:r=d.duration,delay:a=d.delay,endDelay:h=d.endDelay,repeat:g=d.repeat,easing:l=d.easing,direction:m,offset:x,allowWebkitAcceleration:b=!1}=n;const f=z(t);let T=I.waapi(),p=P;const y=at(e);y&&($[e]&&(e=$[e]),ot(t,e),e=V(e));const u=S.get(e);let c=Dt(Mt(i),t,e);if(N(l)){const o=l.createAnimation(c,()=>R.get(t,e),y,e,f);l=o.easing,o.keyframes&&(c=o.keyframes),o.duration&&(r=o.duration)}if(k(e)?(p=dt(t,e),I.cssRegisterProperty()?ft(e):T=!1):p=pt(t,e),Rt(f,e),T){u&&(c=c.map(A=>typeof A=="number"?u.toDefaultUnit(A):A)),!I.partialKeyframes()&&c.length===1&&c.unshift(R.get(t,e));const o={delay:M(a),duration:M(r),endDelay:M(h),easing:F(l)?void 0:W(l),direction:m,iterations:g+1,fill:"both"};s=t.animate({[e]:c,offset:x,easing:F(l)?l.map(W):void 0},o),s.finished||(s.finished=new Promise((A,O)=>{s.onfinish=A,s.oncancel=O}));const v=c[c.length-1];s.finished.then(()=>{p(v),s.cancel()}).catch(P),b||(s.playbackRate=1.000001)}else if(y&&c.every(jt)){if(c.length===1&&c.unshift(R.get(t,e)||(u==null?void 0:u.initialValue)||0),c=c.map(o=>typeof o=="string"?parseFloat(o):o),u){const o=p;p=v=>o(u.toDefaultUnit(v))}s=Et(p,c,Object.assign(Object.assign({},n),{duration:r,easing:l}))}else{const o=c[c.length-1];p(u&&typeof o=="number"?u.toDefaultUnit(o):o)}return f.activeAnimations[e]=s,s==null||s.finished.then(()=>Q(f,e)).catch(P),s}function Rt(t,e){t.activeAnimations[e]&&(L(t.activeAnimations[e]),Q(t,e))}function Q(t,e){t.activeGenerators[e]=t.activeAnimations[e]=void 0}const jt=t=>typeof t=="number",Vt=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function Ct(t,e){var i;return typeof t=="string"?e?((i=e[t])!==null&&i!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t)}const It=(t,e)=>new Proxy({animations:t,duration:e},zt),Y=t=>t.animations[0],zt={get:(t,e)=>{var i,n;switch(e){case"duration":return t.duration;case"currentTime":let s=((i=Y(t))===null||i===void 0?void 0:i[e])||0;return s?s/1e3:0;case"playbackRate":return(n=Y(t))===null||n===void 0?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map($t)).catch(P)),t.finished;case"stop":return()=>t.animations.forEach(L);default:return()=>t.animations.forEach(r=>r[e]())}},set:(t,e,i)=>{switch(e){case"currentTime":i=M(i);case"currentTime":case"playbackRate":for(let n=0;n<t.animations.length;n++)t.animations[n][e]=i;return!0}return!1}},$t=t=>t.finished;function Ut(t,e,i){return typeof t=="function"?t(e,i):t}function kt(t,e,i={}){var n;t=Ct(t);const s=[],r=t.length;for(let a=0;a<r;a++){const h=t[a];for(const g in e){const l=Vt(i,g);l.delay=Ut(l.delay,a,r);const m=Ft(h,g,e[g],l);m&&s.push(m)}}return It(s,(n=i.duration)!==null&&n!==void 0?n:d.duration)}export{kt as a};
