"use strict";(()=>{var s=document.querySelector('[zu-dylemat="font-plus"]'),c=document.querySelector('[zu-dylemat="font-minus"]'),r=12,l=24,n=document.body;function u(){let e=window.getComputedStyle(n,null).getPropertyValue("font-size"),t=parseFloat(e)+1;t<=l&&(n.style.fontSize=`${t}px`,i(t))}function S(){let e=window.getComputedStyle(n,null).getPropertyValue("font-size"),t=parseFloat(e)-1;t>=r&&(n.style.fontSize=`${t}px`,i(t))}function i(e){sessionStorage.setItem("fontSize",String(e))}function a(){let e=sessionStorage.getItem("fontSize");if(e){let o=parseFloat(e);n.style.fontSize=`${o}px`}}window.addEventListener("DOMContentLoaded",a);s.addEventListener("click",u);c.addEventListener("click",S);})();
