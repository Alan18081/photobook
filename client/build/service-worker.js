"use strict";var precacheConfig=[["/main.a9a49191.css","c237d112ed3f8cb790c1043bc49e1f9b"],["/main.html","ab748466bffb480b36cd12bb8ab48ee4"],["/static/js/main.4f52a858.js","3eb371672189c0cd6469022527a62859"],["/static/media/PantonBold.933ee5c4.ttf","933ee5c4cbecc95e534338ecbe63336f"],["/static/media/PantonBold.adb708ea.eot","adb708ea535dd5fa72680a4c3022e1d9"],["/static/media/PantonBold.fd303139.woff","fd303139df83e7035d129a49e3259adc"],["/static/media/ProximaNovaLight.2d90110d.ttf","2d90110da3a51b53da3f20b2e42ece11"],["/static/media/ProximaNovaLight.979fbe01.eot","979fbe0131ad067f1388aa3fcb009bda"],["/static/media/ProximaNovaLight.c17c3074.woff","c17c30742fe8a753eb82a76dab15575b"],["/static/media/ProximaNovaLightItalic.0c6700a8.ttf","0c6700a8f83ce590eb8d67b259edc109"],["/static/media/ProximaNovaLightItalic.4c184bbb.eot","4c184bbbacab263ddc84d3fa42805305"],["/static/media/ProximaNovaLightItalic.b9e38897.woff","b9e388978a70cb2f6ecf811d57b05a36"],["/static/media/ProximaNovaSemibold.6a0e99ec.woff","6a0e99eca72fe99a69284e5f8aa006ce"],["/static/media/ProximaNovaSemibold.7afb75b3.eot","7afb75b34a693e1695c47317778739e2"],["/static/media/ProximaNovaSemibold.d810f726.ttf","d810f7261eed52127a3b035aa676d5b6"],["/static/media/auth-bg.59ef5d86.jpg","59ef5d86ec7fa590df75bd4fbcd0d0de"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));var r="/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});