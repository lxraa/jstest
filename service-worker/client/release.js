!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){let n;function r(){location.assign("./error.html")}function o(t){return encodeURIComponent(window.btoa(String.fromCharCode.apply(null,new Uint8Array(t))))}function i(t){let e=new Object;e.endpoint=t.endpoint,e.p256dh=o(t.getKey("p256dh")),e.auth=o(t.getKey("auth"));let r=new XMLHttpRequest;r.open("POST",n+"/setSubscription"),r.onreadystatechange=function(){4==r.readyState&&function(){let t=new URL(location.href).search,e="https://www.baidu.com";if(t){let n=t.substr(1).split("&");for(let t=0;t<n.length;t++){let r=n[t].split("=");if("subscription"==r[0]){e=r[1];break}}}location.assign(e)}()},r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");let i=`auth=${e.auth}&p256dh=${e.p256dh}&endpoint=${e.endpoint}`;return r.send(i),!0}n="http://127.0.0.1:3333",function(){if(!1 in navigator)return!1;navigator.serviceWorker.register("./service_worker.js").then(function(t){window.PushManager&&t.pushManager.getSubscription().then(function(e){e?i(e):function(t){const e=function(t){const e=(t+"=".repeat((4-t.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=window.atob(e),r=new Uint8Array(n.length);for(let t=0;t<n.length;t++)r[t]=n.charCodeAt(t);return r}("BN577ruXiNOXdDyoHi-wWvRDSaa7kcDa3-4PMs2uvm-aGu7SwSDJIwoNJi2SzyE869Dcd5rA4td408JLYhVkHHE");t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:e}).then(function(t){i(t)}).catch(function(t){r()})}(t)}).catch(function(t){r()})}).catch(function(t){r()})}()}]);