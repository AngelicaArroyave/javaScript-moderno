const myModule=(()=>{"use strict";let e=[],t=["C","D","H","S"],l=["A","J","Q","K"],r=[],a=document.querySelector("#btnOrder"),d=document.querySelector("#btnStop"),n=document.querySelectorAll("small"),s=document.querySelectorAll(".divCards"),o=(t=2)=>{e=i(),r=[];for(let l=0;l<t;l++)r.push(0);n.forEach(e=>e.innerText=0),s.forEach(e=>e.innerText=""),a.disabled=!1,d.disabled=!1},i=()=>{e=[];for(let r=2;r<=10;r++)for(let a of t)e.push(r+a);for(let d of l)for(let n of t)e.push(d+n);return _.shuffle(e)},c=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},$=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:Number(t)},u=(e,t)=>(r[e]+=$(t),n[e].innerText=r[e],r[e]),f=(e,t)=>{let l=document.createElement("img");l.src=`assets/cartas/${e}.png`,l.classList.add("cards"),s[t].append(l)},h=()=>{let[e,t]=r;setTimeout(()=>{t===e?alert("Nadie gana"):e>21?alert("Gana computadora"):t>21?alert("Gana jugador"):alert("Gana computadora")},100)},b=e=>{let t=0;do{let l=c();t=u(r.length-1,l),f(l,r.length-1)}while(t<e&&e<=21);h()};return a.addEventListener("click",()=>{let e=c(),t=u(0,e);f(e,0),t>21&&(a.disabled=!0,d.disabled=!0,b(t)),21===t&&(a.disabled=!0,d.disabled=!0,b(t))}),d.addEventListener("click",()=>{a.disabled=!0,d.disabled=!0,b(r[0])}),{newGame:o}})();