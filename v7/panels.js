(()=>{
if('scrollRestoration' in history)history.scrollRestoration='manual';
const initialHash=location.hash;
scrollTo({top:0,behavior:'instant'});
function goToSection(id){const target=document.getElementById(id.slice(1));if(!target)return;const marker=document.getElementById('anchor-'+target.id);const y=marker?marker.getBoundingClientRect().top+scrollY+parseFloat(getComputedStyle(target).marginTop)-16:target.getBoundingClientRect().top+scrollY;scrollTo({top:Math.max(0,y),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
document.querySelectorAll('nav a').forEach(a=>{const url=new URL(a.href);if(url.pathname.endsWith('/index.html')&&url.hash)a.addEventListener('click',e=>{e.preventDefault();history.pushState(null,'',url.hash);goToSection(url.hash);});});
let navigationUsed=false;
document.querySelector('nav').addEventListener('click',()=>navigationUsed=true);
addEventListener('load',()=>{if(!navigationUsed){if(initialHash)goToSection(initialHash);else scrollTo({top:0,behavior:'instant'});}});
const heading=document.querySelector('.project-heading');
const moreIcon=document.createElement('img');moreIcon.src='assets/figma/read-more-arrow.svg';moreIcon.className='read-more-arrow';moreIcon.alt='';moreIcon.setAttribute('aria-hidden','true');document.querySelector('.project-link svg').replaceWith(moreIcon);
const serviceLine=document.createElement('p');serviceLine.className='project-services';heading.append(serviceLine);
function syncServices(){const i=Number(document.querySelector('#carousel-position').textContent.split('/')[0])-1;serviceLine.textContent=i===0?'IP设计/线上线下营销/衍生品设计/美陈设计':window.PORTFOLIO_PROJECTS[i].role;}
new MutationObserver(syncServices).observe(document.querySelector('#carousel-position'),{childList:true});syncServices();
const about=document.querySelector('#about');
about.innerHTML=`<header class="panel-title about-title">ABOUT ME <span>↙</span></header><div class="about-layout"><img class="portrait" src="assets/figma/portrait.png" alt="何金霖"><div class="biography"><h2>何金霖<br>资深创意设计师</h2><h3>品牌设计/营销设计/包装/AI创意</h3><p>10年品牌与商业创意设计经验，专注于品牌建设、IP视觉、营销传播与包装体系。擅长将品牌策略转化为系统化的视觉表达，并持续探索从品牌视觉到数字体验的创作边界。</p><p>在系统与灵感之间，在商业逻辑与自由表达之间，寻找新的可能性。</p></div><div class="career"><h3>EXPERIENCE</h3><dl><div><dt>美团·大众点评</dt><dd>2023-2026</dd></div><div><dt>盒马</dt><dd>2021-2022</dd></div><div><dt>亲宝宝</dt><dd>2020-2021</dd></div><div><dt>网易严选</dt><dd>2017-2020</dd></div></dl><h3 class="education">EDUCATION</h3><dl><div><dt>浙江工商大学</dt><dd>2011-2015</dd></div></dl></div></div>`;
const arrow=document.createElement('img');arrow.className='about-arrow';arrow.src='assets/figma/about-arrow.svg';arrow.alt='';arrow.setAttribute('aria-hidden','true');about.querySelector('.about-title span').replaceWith(arrow);
const brands=document.createElement('section');brands.id='brands';brands.innerHTML='<h2 class="panel-title ruled">KEY BRANDS</h2><img class="brand-strip" src="assets/figma/brands-latest.png" alt="合作品牌：大众点评、盒马、网易严选等">';about.after(brands);
const contact=document.querySelector('#contact');const resume=contact.querySelector('.resume-download');contact.innerHTML=`<h2 class="panel-title">LET’S CONNECT</h2><div class="contact-links"><a href="tel:15821787992">15821787992</a><a href="mailto:hedaxian2021@163.com">Hedaxian2021@163.com</a></div><a class="back-top" href="v7/index.html">BACK TO TOP ↑</a>`;if(resume)contact.querySelector('.back-top').before(resume);
const backTop=contact.querySelector('.back-top');
backTop.href=location.pathname+location.search;
backTop.addEventListener('click',event=>{
  event.preventDefault();
  history.replaceState(history.state,'',location.pathname+location.search);
  scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
const panels=[about,brands,contact];panels.forEach((panel,i)=>{panel.classList.add('floating-panel');panel.style.zIndex=i+2;const track=document.createElement('div');track.className='panel-track';panel.before(track);track.append(panel);});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let pending=false;
panels.forEach(panel=>{const marker=document.createElement('div');marker.id='anchor-'+panel.id;marker.setAttribute('aria-hidden','true');marker.style.cssText='display:block;height:0;margin:0;padding:0;pointer-events:none';panel.before(marker);});
addEventListener('hashchange',()=>{if(location.hash.length>1)goToSection(location.hash);});
function refresh(){pending=false;panels.forEach((p,i)=>{const top=Math.min(24,innerHeight-p.offsetHeight-24);p.style.top=top+'px';const next=panels[i+1];const cover=next?Math.max(0,Math.min(1,(innerHeight-next.getBoundingClientRect().top)/innerHeight)):0;p.style.setProperty('--covered',reduced.matches?0:cover);});}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(refresh);}},{passive:true});new ResizeObserver(refresh).observe(document.body);reduced.addEventListener('change',refresh);refresh();
})();
