(()=>{
const latest=new URL('v7/',document.baseURI);
document.querySelectorAll('a[href]').forEach(a=>{
  const raw=a.getAttribute('href');
  if(raw.startsWith('#')){
    a.href=location.pathname+location.search+raw;
    return;
  }
  const u=new URL(a.href);
  if(u.origin===location.origin&&/\/(?:index|works|case-[\w-]+)\.html$/.test(u.pathname)){
    const target=new URL(u.pathname.split('/').pop(),latest);
    target.search=u.search;target.hash=u.hash;a.href=target.href;
  }
});
})();
