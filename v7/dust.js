(()=>{
if(!document.querySelector('.hero')||document.querySelector('#silver-dust'))return;
const canvas=document.createElement('canvas');canvas.id='silver-dust';canvas.setAttribute('aria-hidden','true');canvas.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';document.body.prepend(canvas);
const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
const style=document.createElement('style');style.textContent='body:has(#silver-dust){isolation:isolate;background:#020202}body:has(#silver-dust)>nav,body:has(#silver-dust)>main{position:relative;z-index:1}body:has(#silver-dust) .hero,body:has(#silver-dust) #work,body:has(#silver-dust) .work-folder{background:transparent!important}body:has(#silver-dust) .chrome-title{isolation:auto;mix-blend-mode:normal}body:has(#silver-dust)>main{background:transparent!important}body:has(#silver-dust) .chrome-title>canvas,body:has(#silver-dust) .chrome-title>img{mix-blend-mode:normal}';document.head.append(style);
const reduce=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');let w=innerWidth,h=innerHeight,raf=0,last=0,active=true,quality=1,slow=0;
const n=Math.min(fine.matches?14000:2600,Math.round(w*h*(fine.matches?.012:.004))),particles=new Float32Array(n*9);let seed=8321;
function random(){seed=(Math.imul(seed,1664525)+1013904223)|0;return (seed>>>0)/4294967296}
for(let i=0;i<n;i++){
 const k=i*9,u=random(),band=random()<.88;
 const spread=(random()+random()+random()-1.5)*(.055+.15*Math.abs(u-.58));
 const branch=random()<.22?Math.sin(u*8+1.5)*.12:0;
 const v=band?.83-u*.64+Math.sin(u*7.8)*.065+spread+branch:random();
 particles[k]=particles[k+4]=u*w;particles[k+1]=particles[k+5]=((v+1)%1)*h;
 particles[k+6]=.25+Math.pow(random(),2)*.42;
 const cluster=Math.exp(-Math.pow((u-.62)/.16,2));
 particles[k+7]=band?(.025+random()*.075)*(1+cluster*.75):.025+random()*.08;
 particles[k+8]=random()*6.28;
}
const brightness=new Float32Array(n);let mx=-1000,my=-1000,dx=0,dy=0,engaged=false,moved=0;const work=document.querySelector('#work');
function resize(){const nw=innerWidth,nh=innerHeight;for(let i=0;i<n;i++){const k=i*9;particles[k]*=nw/w;particles[k+4]*=nw/w;particles[k+1]*=nh/h;particles[k+5]*=nh/h}w=nw;h=nh;const d=Math.min(devicePixelRatio,1.5);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);resume()}
addEventListener('pointermove',e=>{if(reduce.matches)return;dx=Math.max(-22,Math.min(22,e.clientX-mx));dy=Math.max(-22,Math.min(22,e.clientY-my));mx=e.clientX;my=e.clientY;engaged=true;moved=performance.now()},{passive:true});addEventListener('pointerup',e=>{if(e.pointerType==='touch')engaged=false},{passive:true});document.addEventListener('pointerleave',()=>engaged=false);addEventListener('blur',()=>engaged=false);
function draw(now){raf=0;if(document.hidden||!active)return;const dt=last?Math.min(2,(now-last)/16.67):1;if(last&&now-last>30)slow++;else slow=Math.max(0,slow-1);if(slow>90){quality=.65;slow=0}last=now;ctx.clearRect(0,0,w,h);const still=now-moved>160;const radius=Math.min(290,w*.3);const parallax=scrollY*.07;
for(let i=0;i<n*quality;i++){const k=i*9;let x=particles[k],y=particles[k+1],vx=particles[k+2],vy=particles[k+3],glow=0;const phase=particles[k+8];if(!reduce.matches){const ax=particles[k+4]+Math.sin(now/14000+phase)*5,ay=particles[k+5]+Math.cos(now/17000+phase)*4;vx+=(ax-x)*.00075*dt;vy+=(ay-y)*.00075*dt;if(engaged){const ex=mx-x,ey=my-(((y-parallax)%h+h)%h),distance=Math.hypot(ex,ey),f=Math.max(0,1-distance/radius);if(f>0){const force=f*f;const soften=Math.min(1,distance/42);vx+=(still?ex*.00024*soften+ey*.00032:dx*.085-ey*.00055)*force*dt;vy+=(still?ey*.00024*soften-ex*.00032:dy*.085+ex*.00055)*force*dt;glow=force*(still?.40:.62)}}const speed=Math.hypot(vx,vy);if(speed>2.8){vx*=2.8/speed;vy*=2.8/speed}vx*=Math.pow(.975,dt);vy*=Math.pow(.975,dt);x+=vx*dt;y+=vy*dt;particles[k]=x;particles[k+1]=y;particles[k+2]=vx;particles[k+3]=vy;}brightness[i]+=(glow-brightness[i])*(glow>brightness[i]?.06:.012);const alpha=4.0*particles[k+7]*(.85+.15*Math.sin(now/5000+phase))+brightness[i];ctx.fillStyle='rgba(245,245,245,'+alpha.toFixed(3)+')';const yy=((y-parallax)%h+h)%h;ctx.beginPath();ctx.arc(x,yy,particles[k+6]*1.15,0,Math.PI*2);ctx.fill();}
dx*=.88;dy*=.88;if(!reduce.matches)raf=requestAnimationFrame(draw)}
function resume(){cancelAnimationFrame(raf);last=0;if(active&&!document.hidden)raf=requestAnimationFrame(draw)}
function check(){const next=work.getBoundingClientRect().bottom>0;if(next!==active){active=next;canvas.style.visibility=active?'visible':'hidden';resume()}}
addEventListener('resize',resize,{passive:true});addEventListener('scroll',check,{passive:true});document.addEventListener('visibilitychange',resume);reduce.addEventListener('change',resume);resize();
})();
