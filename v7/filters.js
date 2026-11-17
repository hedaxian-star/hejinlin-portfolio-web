(()=>{
const grid=document.querySelector('.archive .masonry');if(!grid)return;
const groups=[['all','全部',null],['ip','IP design & Campaign',['ip','seasonal','chicken','ip-merch']],['marketing','Brand Marketing',['detour','festival','awards']],['packaging','Brand & Packaging',['max','organic','daily','moon','tree-ripe']],['spatial','Spatial & Retail',['ip','street','chicken','awards','daily']],['ai','AI Lab',[]]];
const bar=document.createElement('div');bar.className='work-filters';bar.setAttribute('role','group');bar.setAttribute('aria-label','作品分类');grid.before(bar);
const empty=document.createElement('p');empty.className='work-empty';empty.textContent='AI Lab · 项目待更新';empty.setAttribute('role','status');grid.after(empty);
const cards=[...grid.querySelectorAll('.work-card')];
const buttons=groups.map(([key,label])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>{const url=new URL(location.href);if(key==='all')url.searchParams.delete('category');else url.searchParams.set('category',key);history.pushState(null,'',url);render(key);};bar.append(b);return b;});
function render(key){const group=groups.find(g=>g[0]===key)||groups[0];let count=0;cards.forEach(card=>{const slug=new URL(card.href).pathname.match(/case-(.+)\.html$/)?.[1];const show=!group[2]||group[2].includes(slug);card.hidden=!show;if(show){count++;card.classList.add('work-entered');}});buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(groups[i]===group)));empty.hidden=count>0;}
function restore(){render(new URL(location.href).searchParams.get('category')||'all');}addEventListener('popstate',restore);restore();
})();
