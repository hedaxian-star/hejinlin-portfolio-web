(() => {
if(window.__mercuryCursorLoaded)return;
window.__mercuryCursorLoaded=true;
const fine=matchMedia('(hover:hover) and (pointer:fine)');
if(!fine.matches)return;
const image=new Image();
const assetURL=new URL('assets/mercury-cursor.png',document.currentScript.src).href;
image.onload=()=>{
const N=128,source=document.createElement('canvas');source.width=source.height=N;const sc=source.getContext('2d',{willReadFrequently:true});sc.drawImage(image,0,0,N,N);const pixels=sc.getImageData(0,0,N,N).data;
const cursor=document.createElement('canvas');cursor.width=cursor.height=N;cursor.id='mercury-cursor';cursor.setAttribute('aria-hidden','true');cursor.style.cssText='position:fixed;left:0;top:0;width:40px;height:40px;z-index:2147483647;pointer-events:none;display:none';document.body.append(cursor);const ctx=cursor.getContext('2d');
const style=document.createElement('style');style.textContent='html.mercury-active,html.mercury-active *{cursor:none!important}html.mercury-active input,html.mercury-active textarea,html.mercury-active [contenteditable]:not([contenteditable=false]),html.mercury-active [contenteditable]:not([contenteditable=false]) *{cursor:text!important}';document.head.append(style);
const radii=new Float32Array(720),cx=48,cy=48;for(let a=0;a<720;a++){const angle=a/720*Math.PI*2;for(let r=0;r<120;r++){const x=Math.round(cx+Math.cos(angle)*r),y=Math.round(cy+Math.sin(angle)*r);if(x>=0&&x<N&&y>=0&&y<N&&pixels[(y*N+x)*4+3]>60)radii[a]=r}}
let mx=innerWidth*.7,my=innerHeight*.45,inside=false,done=false,textTarget=false;
const hero=document.querySelector('.hero .chrome-title'),intro=!!hero&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
let ox=mx,oy=my;if(hero){const b=hero.getBoundingClientRect();ox=b.left+b.width*.92;oy=b.top+b.height*.4}
function position(x,y,size){cursor.style.width=cursor.style.height=size+'px';cursor.style.left=(x-size*.18)+'px';cursor.style.top=(y-size*.2)+'px'}
function finish(){done=true;ctx.clearRect(0,0,N,N);ctx.drawImage(image,0,0,N,N);if(inside&&!textTarget&&fine.matches){cursor.style.display='block';document.documentElement.classList.add('mercury-active')}else hide();position(mx,my,40)}
function hide(){cursor.style.display='none';document.documentElement.classList.remove('mercury-active')}
function track(e){
 if(e.pointerType!=='mouse'||!fine.matches){inside=false;finish();return}
 inside=true;mx=e.clientX;my=e.clientY;
 textTarget=!!e.target.closest('input,textarea,select,[contenteditable]:not([contenteditable=false])');
 if(done){cursor.style.display=textTarget?'none':'block';document.documentElement.classList.toggle('mercury-active',!textTarget);position(mx,my,40)}
}
addEventListener('pointermove',track,{passive:true});
addEventListener('pointerdown',track,{passive:true});
document.addEventListener('pointerleave',()=>{inside=false;hide()});
addEventListener('blur',()=>{inside=false;hide()});
fine.addEventListener('change',()=>{if(!fine.matches){inside=false;hide()}});
if(!intro){finish();return}
let start;function frame(now){start??=now;const age=(now-start)/1000;if(done||!fine.matches){finish();return}cursor.style.display=document.hidden||textTarget?'none':'block';const t=Math.max(0,Math.min(1,(age-.35)/1.1)),p=t*t*(3-2*t),size=86-46*p,center=64+(48-64)*p,out=ctx.createImageData(N,N);
for(let y=0;y<N;y++)for(let x=0;x<N;x++){const dx=x-center,dy=y-center,angle=(Math.atan2(dy,dx)+Math.PI*2)%(Math.PI*2),R=radii[Math.floor(angle/(Math.PI*2)*720)]||1,rad=37*(1-p)+R*p,dist=Math.hypot(dx,dy),q=dist/rad;if(q>1)continue;const sx=Math.max(0,Math.min(127,Math.round(cx+Math.cos(angle)*q*R))),sy=Math.max(0,Math.min(127,Math.round(cy+Math.sin(angle)*q*R))),j=(sy*N+sx)*4,i=(y*N+x)*4;out.data[i]=pixels[j];out.data[i+1]=pixels[j+1];out.data[i+2]=pixels[j+2];out.data[i+3]=Math.min(1,(1-q)*rad)*((1-p)*255+p*pixels[j+3])}
ctx.putImageData(out,0,0);position(ox,oy,size);if(t<1)requestAnimationFrame(frame);else {const begin=performance.now();function join(n){if(done||!fine.matches){finish();return}const q=Math.min(1,(n-begin)/260),e=q*q*(3-2*q);position(ox+(mx-ox)*e,oy+(my-oy)*e,40);if(q<1)requestAnimationFrame(join);else finish()}requestAnimationFrame(join)}}
function begin(){const b=hero.getBoundingClientRect();if(b.bottom<=0){finish();return}ox=b.left+b.width*.92;oy=b.top+b.height*.4;requestAnimationFrame(frame)}
if(hero.dataset.titleReady==='true'||!hero.querySelector('.chrome-draw'))begin();else document.addEventListener('portfolio:title-ready',begin,{once:true});
};
image.src=assetURL;
})();
