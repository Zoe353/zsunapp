!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){async function n(t){const{headers:e}=t,n=e.get("content-type");if(n.includes("application/json")){const e=await t.json();return JSON.stringify(e)}if(n.includes("application/text")){return await t.text()}if(n.includes("text/html")){return await t.text()}return await t.text()}links=[{name:"apple",url:"https://en.wikipedia.org/wiki/Apple"},{name:"orange",url:"https://en.wikipedia.org/wiki/Orange_(fruit)"},{name:"grape",url:"https://en.wikipedia.org/wiki/Grape"}],social_links=["https://www.linkedin.com/in/zhimin-sun-1b98a1193/","https://github.com/Zoe353"],social_icons=["https://simpleicons.org/icons/linkedin.svg","https://simpleicons.org/icons/github.svg"],addEventListener("fetch",async t=>{const{url:e,method:r}=t.request;e.endsWith("/links")?respBody=JSON.stringify(links):respBody=async function(t){const e=await fetch(t);return await n(e)}("https://static-links-page.signalnerve.workers.dev"),t.respondWith(async function(){const t=await respBody;if(e.endsWith("/links")){return new Response(t,{headers:{"content-type":"application/json;charset=UTF-8"}})}{const e=(new HTMLRewriter).on("div#links",new i("a")).on("div#profile",new i("style")).on("img#avatar",new i("src")).on("h1#name",new i("text")).on("div#social",new i("style")).on("title",new i).on("body",new i("style"));return init={headers:{"content-type":"text/html;charset=UTF-8"}},res=new Response(t,init),transres=e.transform(res),transres}}())});class i{constructor(t){this.attributeName=t}async element(t){const e=t.getAttribute(this.attributeName);if("profile"==t.getAttribute("id"))t.setAttribute(this.attributeName,e.replace("display: none"," "));else if("links"==t.getAttribute("id"))for(var n in links)t.append("<a href="+links[n].url+">",{html:!0}),t.append(links[n].name),t.append("</a>",{html:!0});else if("avatar"==t.getAttribute("id"))t.setAttribute(this.attributeName,"https://avatars3.githubusercontent.com/u/57512523?s=400&u=68eaf359f978644a532e126842bbf4e93dbb780f&v=4");else if("name"==t.getAttribute("id"))t.append("Zhimin Sun");else if("social"==t.getAttribute("id"))for(var n in t.setAttribute(this.attributeName,e.replace("display: none"," ")),social_links)t.append("<a href="+social_links[n]+">",{html:!0}),t.append("<svg>",{html:!0}),t.append("<img src="+social_icons[n]+">",{html:!0}),t.append("</svg>",{html:!0}),t.append("</a>",{html:!0});else"body"==t.tagName&&t.setAttribute(this.attributeName,"background-color: #455A64")}text(t){t.text.includes("Lots of links")&&!t.removed&&t.replace("Zhimin Sun")}}}]);