(n=>{"use strict";let s,r,e;const l=["cdn.jsdelivr.net","fastly.jsdelivr.net","gcore.jsdelivr.net","testingcf.jsdelivr.net","./"],t="//",i=l[0],o=Date.now(),a=2e3,c="jsdelivr-auto-fallback",f="/gh/PipecraftNet/jsdelivr-auto-fallback@main/empty.css?",d=e=>e&&e.includes(t+i),m=e=>e.replace(t+i,t+s),u=window.setTimeout,v=n.querySelectorAll.bind(n),b=()=>{let e,t;for(e of v('link[rel="stylesheet"]'))t=e.href,d(t)&&!t.includes(f)&&(e.href=m(t));for(e of v("script"))if(t=e.src,d(t)){const s=n.createElement("script");s.src=m(t),e.defer=!0,e.src="",e.before(s),e.remove()}for(e of v("img"))t=e.src,d(t)&&(e.src="",e.src=m(t));for(e of v("*[style]"))t=e.getAttribute("style"),d(t)&&e.setAttribute("style",m(t));for(e of v("style"))t=e.innerHTML,d(t)&&(e.innerHTML=m(t))},h=()=>{!e&&r&&s&&(console.warn(i+" is not available. Use "+s),e=!0,u(b,0),u(b,20),setInterval(b,500))},g=(()=>{try{return Object.assign({},JSON.parse(localStorage.getItem(c)||"{}"))}catch{return{}}})(),y=()=>{g.time=o,g.failed=!1,g.fastNode=null;for(const t of l)((e,t)=>{let s;const r=n.createElement("link"),l=e=>{s&&(clearTimeout(s),s=0,e||(r.href="data:text/css;base64,"),r.remove(),t(e))};s=u(l,a),r.addEventListener("error",()=>l(!1)),r.addEventListener("load",()=>l(!0)),r.rel="stylesheet",r.text="text/css",r.href=e+f+o,n.head.insertAdjacentElement("afterbegin",r)})("https://"+t,e=>{e||t!==i||(r=!0,g.failed=!0),e&&!s&&(s=t),e&&!g.fastNode&&(g.fastNode=t),h()});u(()=>{r&&!s&&(s=l[1],h()),localStorage.setItem(c,JSON.stringify(g))},a+100)};if(g.time&&o-g.time<36e5&&g.failed&&g.fastNode)r=!0,s=g.fastNode,h(),u(y,1e3);else if(n.head)y();else{const j=new MutationObserver(()=>{n.head&&(j.disconnect(),y())});j.observe(n,{childList:!0,subtree:!0})}})(document);
export {default} from "./ed1dd995b673550f@317.js";
