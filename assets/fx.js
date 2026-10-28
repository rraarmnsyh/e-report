(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,admin=!!$('.topbar');
/* toast & modal */
const toast=(m,ic='✓')=>{const w=$('.toasts')||document.body.appendChild(Object.assign(document.createElement('div'),{className:'toasts'})),t=document.createElement('div');t.className='toast-fx';t.innerHTML=`<span>${ic}</span>${m}`;w.append(t);setTimeout(()=>t.classList.add('out'),2600);setTimeout(()=>t.remove(),3100)};
const modal=h=>{const o=document.createElement('div');o.className='fx-modal';o.innerHTML=`<div class="fx-box"><button class="fx-x" aria-label="Tutup">×</button>${h}</div>`;document.body.append(o);requestAnimationFrame(()=>o.classList.add('on'));const c=()=>{o.classList.remove('on');setTimeout(()=>o.remove(),250)};o.onclick=e=>{if(e.target===o||e.target.closest('.fx-x'))c()};addEventListener('keydown',e=>e.key==='Escape'&&c(),{once:true})};
/* klik: percikan + ripple */
const burst=(x,y,n=8)=>{if(RM)return;for(let i=0;i<n;i++){const s=document.createElement('i'),a=6.28*i/n+Math.random(),d=28+Math.random()*50;s.className='spark';s.style.cssText=`left:${x}px;top:${y}px;--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px;background:${['#ffc857','#3b6cff','#7c5cff','#3bc8ff'][i%4]}`;document.body.append(s);setTimeout(()=>s.remove(),750)}};
document.addEventListener('click',e=>{
  burst(e.clientX,e.clientY);
  const t=e.target.closest('.btn,.faq-q,.menu-link,.service,.report,.stat-card');
  if(t){const r=t.getBoundingClientRect(),s=document.createElement('span'),d=Math.max(r.width,r.height)*2;s.className='rip';s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;t.append(s);setTimeout(()=>s.remove(),700)}
  /* transisi antar halaman */
  const a=e.target.closest('a[href]');
  if(a&&!e.defaultPrevented&&!a.target&&!e.metaKey&&!e.ctrlKey){const u=new URL(a.href,location);if(u.origin===location.origin&&u.pathname!==location.pathname&&/\.html$/.test(u.pathname)){e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,260)}}
});
addEventListener('pageshow',()=>document.body.classList.remove('leaving'));
/* gambar rusak -> placeholder gradient */
const bad=i=>{if(i.dataset.f)return;i.dataset.f=1;const d=document.createElement('div');d.style.cssText=`height:${i.height||180}px;border-radius:inherit;background:linear-gradient(135deg,#3b6cff,#7c5cff 60%,#ffc857);display:grid;place-items:center;font-size:2.4rem`;d.textContent='🌙';d.dataset.ph=1;i.replaceWith(d)};
document.addEventListener('error',e=>e.target.tagName==='IMG'&&bad(e.target),true);
addEventListener('load',()=>$$('img').forEach(i=>i.complete&&!i.naturalWidth&&bad(i)));
/* scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.hero .container>*,.about .container>*,.section-title,.section-sub,.service,.report,.faq-item,.foot-grid>div,main>.container>*,main>h2,main>p,main .stat-card,.tabel-laporan,main .card').forEach(el=>{if(el.closest('.fx-box'))return;el.classList.add('rv');el.style.setProperty('--d',[...el.parentNode.children].indexOf(el)*.09+'s');io.observe(el)});
/* header, scrollspy */
const hd=$('header');hd&&addEventListener('scroll',()=>hd.classList.toggle('scrolled',scrollY>10),{passive:true});
const links=$$('.nav ul a[href^="#"]');
if(links.length){const sp=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&links.forEach(a=>a.classList.toggle('act',a.hash==='#'+e.target.id))),{rootMargin:'-45% 0px -50%'});$$('section[id]').forEach(s=>sp.observe(s))}
/* tilt kartu */
if(!RM&&matchMedia('(hover:hover)').matches)$$('.service,.report,.stat-card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*7+'deg');c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*7+'deg')});c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
/* hitung naik + ring + bar */
const cu=(el)=>{const m=el.textContent.trim().match(/^(\D*)(\d+)(\D*)$/);if(!m)return;const n=+m[2],t0=performance.now();(function f(t){const k=Math.min((t-t0)/1200,1);el.textContent=m[1]+Math.round(n*(1-Math.pow(1-k,3)))+m[3];k<1&&requestAnimationFrame(f)})(t0)};
const st=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;st.unobserve(e.target);const c=e.target,h=$('h3',c),r=$('.lingkaran-progres',c),v=parseInt((($('.isi-lingkaran span',c)||{}).textContent)||0);h&&cu(h);r&&r.style.setProperty('--p',v);const b=$('.isi-garis',c);b&&(b.style.width=v+'%')}),{threshold:.3});
$$('.stat-card').forEach(c=>st.observe(c));
/* index: modal laporan */
$$('.report').forEach(c=>{const l=$('.link',c),g=s=>$(s,c),h=l.getAttribute('href');l.addEventListener('click',e=>{e.preventDefault();modal(`${(g('img')||g('[data-ph]')).outerHTML}<span class="tag">${g('.tag').textContent}</span><h3>${g('h5').textContent}</h3><div class="meta">${g('.meta').textContent}</div><p>${g('p').textContent}</p>${/\.html/.test(h)?`<a class="btn btn-fill" href="${h}">Buka halaman lengkap</a>`:''}`)})});
/* reports: filter + efek kirim */
const list=$('#list');
if(list){let cur='Semua';const bar=document.createElement('div');bar.className='chips';bar.innerHTML=['Semua','Akademik','Fasilitas','Kehilangan','Anonymous'].map((c,i)=>`<button type="button" class="chip${i?'':' on'}">${c}</button>`).join('');list.before(bar);
  const ap=()=>$$('.item',list).forEach((it,i)=>{it.style.setProperty('--i',i);it.hidden=cur!=='Semua'&&$('.tag',it).textContent!==cur});
  bar.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;cur=b.textContent;$$('.chip',bar).forEach(x=>x.classList.toggle('on',x===b));ap()};
  new MutationObserver(ap).observe(list,{childList:true});ap();
  $('#reportForm').addEventListener('submit',e=>{const r=e.target.querySelector('.btn').getBoundingClientRect();burst(r.left+r.width/2,r.top,24);toast('Laporan berhasil dikirim','📨')})}
/* admin: tabel, form, switch */
if(admin){
  const tb=$('.tabel-laporan tbody'),rn=()=>$$('tr',tb).forEach((r,i)=>r.cells[0].textContent=i+1),B=[['warning','Menunggu'],['success','Diterima'],['danger','Ditolak']];
  tb&&tb.addEventListener('click',e=>{const tr=e.target.closest('tr'),b=e.target.closest('.btn'),s=e.target.closest('.badge');
    if(s){const i=(B.findIndex(x=>s.classList.contains('text-bg-'+x[0]))+1)%3;s.className=`badge text-bg-${B[i][0]} pop`;s.textContent=B[i][1];toast('Status diubah: '+B[i][1],'🔄')}
    else if(b?.classList.contains('btn-danger')){tr.classList.add('gone');setTimeout(()=>{tr.remove();rn()},450);toast('Laporan dihapus','🗑️')}
    else if(b?.classList.contains('btn-warning')){const c=[...tr.cells].map(x=>x.textContent.trim());modal(`<h3>Detail Laporan</h3><p><b>Santri:</b> ${c[1]}</p><p><b>Jenis:</b> ${c[2]}</p><p><b>Tanggal:</b> ${c[3]}</p><p><b>Status:</b> ${c[4]}</p>`)}
    else if(b?.classList.contains('btn-info'))toast('Mengedit: '+tr.cells[1].textContent.trim(),'✏️')});
  $('.btn-success')?.addEventListener('click',()=>{const n=tb.rows[0].cloneNode(true);n.cells[1].textContent='Santri baru';n.cells[3].textContent=new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});tb.prepend(n);rn();n.classList.add('flash');toast('Laporan baru ditambahkan','➕')});
  $$('main form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const b=$('.btn',f);b.classList.add('load');setTimeout(()=>{b.classList.remove('load');toast('Perubahan disimpan','💾')},900)}));
  $('.form-switch input')?.addEventListener('change',e=>toast(e.target.checked?'Notifikasi aktif':'Notifikasi nonaktif','🔔'));
}
})();
