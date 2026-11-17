(()=>{
const reduce=matchMedia('(prefers-reduced-motion:reduce)');if(reduce.matches)return;
const cards=[...document.querySelectorAll('.masonry .work-card')].filter(c=>!c.hidden);if(!cards.length)return;
const lefts=[...new Set(cards.map(c=>Math.round(c.getBoundingClientRect().left)))].sort((a,b)=>a-b),rows=new Map(),animations=[];
cards.forEach(card=>{const col=lefts.indexOf(Math.round(card.getBoundingClientRect().left)),row=rows.get(col)||0;rows.set(col,row+1);const order=lefts.length===3?[1,0,2][col]:col,delay=Math.min(360,order*120+row*35);const y=Math.min(innerHeight*.7,560)+order*30;animations.push(card.animate([{opacity:0,transform:`translate3d(${col===0?-14:col===2?14:0}px,${y}px,0)`},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:1140,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));});
function finish(){animations.forEach(a=>{if(a.playState!=='finished')a.finish();});}
addEventListener('wheel',finish,{once:true,passive:true});addEventListener('touchmove',finish,{once:true,passive:true});document.querySelector('.work-filters')?.addEventListener('click',finish,{once:true});reduce.addEventListener('change',e=>{if(e.matches)finish();});
})();
