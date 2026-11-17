(()=>{
const fine=matchMedia('(hover:hover) and (pointer:fine)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
document.querySelectorAll('nav a').forEach(a=>{
 if(a.querySelector('.nav-magnet'))return;
 const outer=document.createElement('span'),inner=document.createElement('span');outer.className='nav-magnet';inner.className='nav-elastic';while(a.firstChild)inner.append(a.firstChild);outer.append(inner);a.append(outer);
 let bounds;
 function reset(){a.classList.remove('nav-pointer');outer.style.transform='translate(0px,0px)';bounds=null}
 a.addEventListener('pointerenter',e=>{if(e.pointerType!=='mouse'||!fine.matches)return;bounds=a.getBoundingClientRect();a.classList.add('nav-pointer')});
 a.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||!fine.matches||reduced.matches)return;if(!bounds)bounds=a.getBoundingClientRect();const x=Math.max(-6,Math.min(6,(e.clientX-bounds.left-bounds.width/2)*.2)),y=Math.max(-4,Math.min(4,(e.clientY-bounds.top-bounds.height/2)*.2));outer.style.transform=`translate(${x}px,${y}px)`});
 a.addEventListener('pointerleave',reset);a.addEventListener('pointercancel',reset);a.addEventListener('blur',reset);
 a.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')reset();if(reduced.matches)return;inner.getAnimations().forEach(animation=>animation.cancel());inner.animate([{transform:'scale(1)'},{transform:'scale(.96,1.04)',offset:.25},{transform:'scale(1.015,.99)',offset:.7},{transform:'scale(1)'}],{duration:400,easing:'ease-out'})});
 reduced.addEventListener('change',()=>{reset();inner.getAnimations().forEach(animation=>animation.cancel())});fine.addEventListener('change',reset);
});
})();
