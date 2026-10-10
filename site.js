const $=s=>document.querySelector(s),A=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bn=n=>String(n).replace(/\d/g,d=>'০১২৩৪৫৬৭৮৯'[d]);
const C=CONFIG;
const MONTHS=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
function fmtDate(d){d=String(d||'');let m;if(m=d.match(/^(\d{4})-(\d{2})-(\d{2})$/))return `${bn(+m[3])} ${MONTHS[+m[2]-1]} ${bn(m[1])}`;if(m=d.match(/^(\d{4})-(\d{2})$/))return `${MONTHS[+m[2]-1]} ${bn(m[1])}`;return d}
const byDate=(a,b)=>String(b.d||'').localeCompare(String(a.d||''));

/* ---------- SVG graphics ---------- */
const IC={
 flag:'<path d="M5 22V3"/><path d="M5 4h13l-3 4.5L18 13H5"/>',
 temple:'<path d="M3 21h18M5 21V12h14v9M8 12V9l4-6 4 6v3M10 21v-5h4v5"/>',
 lamp:'<path d="M12 3c2 3 3 4.5 3 6.5a3 3 0 0 1-6 0C9 7.500 10 6 12 3z"/><path d="M4 14h16c0 4-3.500 6-8 6s-8-2-8-6z"/>',
 pen:'<path d="M4 20l1-4L16.500 4.500a2.100 2.100 0 0 1 3 3L8 19l-4 1z"/><path d="M14 7l3 3"/>',
 book:'<path d="M2 5c3-1 7-1 10 1 3-2 7-2 10-1v14c-3-1-7-1-10 1-3-2-7-2-10-1z"/><path d="M12 6v14"/>',
 users:'<circle cx="9" cy="8" r="3.500"/><path d="M2 21c0-4 3-6.500 7-6.500s7 2.500 7 6.500"/><circle cx="17.500" cy="9" r="2.500"/><path d="M17 14.500c3 0 5 2 5 5.500"/>',
 youth:'<circle cx="12" cy="7" r="3.500"/><path d="M5 21c0-4.500 3-7 7-7s7 2.500 7 7"/><path d="M12 14v7"/>',
 woman:'<circle cx="12" cy="6" r="3.200"/><path d="M12 9.500L6 19h12z"/><path d="M12 19v3"/>',
 work:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 13h18"/>',
 search:'<circle cx="10.500" cy="10.500" r="6.500"/><path d="M21 21l-5.500-5.500"/>',
 scale:'<path d="M12 3v18M6 21h12M4 7h16"/><path d="M4 7l-3 7a3.500 3.500 0 0 0 6 0zM20 7l-3 7a3.500 3.500 0 0 0 6 0z"/>',
 lotus:'<path d="M12 4c3 3 4 6 0 11-4-5-3-8 0-11z"/><path d="M4 8c4 0 7 2.500 8 7M20 8c-4 0-7 2.500-8 7"/><path d="M3 17c5 0 7 1.500 9 4 2-2.500 4-4 9-4"/>',
 mega:'<path d="M3 10v4h4l9 5V5L7 10z"/><path d="M19 9a4 4 0 0 1 0 6"/>',
 form:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
 heart:'<path d="M12 21C5 15.500 3 12 3 8.800A4.800 4.800 0 0 1 12 6.500 4.800 4.800 0 0 1 21 8.800C21 12 19 15.500 12 21z"/>'
};
const ico=(k)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;
function mandala(c='currentColor'){let p='';for(let i=0;i<16;i++)p+=`<ellipse cx="100" cy="46" rx="9" ry="26" transform="rotate(${i*22.5} 100 100)"/>`;for(let i=0;i<24;i++)p+=`<circle cx="100" cy="14" r="3.200" transform="rotate(${i*15} 100 100)"/>`;
 let q='';for(let i=0;i<8;i++)q+=`<ellipse cx="100" cy="72" rx="7" ry="16" transform="rotate(${i*45+22.5} 100 100)"/>`;
 return `<svg class="mand" viewBox="0 0 200 200" fill="${c}" stroke="${c}" aria-hidden="true"><g fill-opacity=".55" stroke-width="1">${p}</g><g fill-opacity=".8">${q}</g><circle cx="100" cy="100" r="95" fill="none" stroke-width="1.500"/><circle cx="100" cy="100" r="62" fill="none" stroke-width="1"/><circle cx="100" cy="100" r="18"/></svg>`}
const ORN=`<div class="orn">${ico('lotus')}</div>`;
const SKY=(cls='')=>`<svg class="sky ${cls}" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><use href="#sky"/></svg>`;

/* ---------- helpers ---------- */
const head=(t,s)=>`<div class="pg">${mandala('#fff')}<div class="w"><h1>${t}</h1><p>${s||''}</p></div>${SKY()}</div>`;
const ttl=(t,p)=>`<div class="ttl rv"><h2>${t}</h2>${ORN}${p?`<p>${p}</p>`:''}</div>`;
const tabs=(b,items,cur)=>`<div class="tabs">${items.map(([k,l])=>`<a href="#${b}/${k}" class="${k==cur?'on':''}">${l}</a>`).join('')}</div>`;
const paras=t=>esc(t).split(/\n\n+/).map(p=>`<p>${p}</p>`).join('');
const formBtn=(k,label)=>{const u=C.forms[k];return u?`<a class="btn big" href="${esc(u)}" target="_blank" rel="noopener">${label} →</a>`:`<span class="btn big" style="opacity:.55;cursor:not-allowed">${label} (শীঘ্রই চালু হবে)</span>`};
const formPanel=(k,icon,title,txt,label)=>`<div class="pan formcta"><div class="big-ic">${ico(icon)}</div><h3>${title}</h3><p>${txt}</p><p>${formBtn(k,label)}</p><p class="note">বোতামে চাপলে গুগল ফর্ম খুলবে। আপনার তথ্য শুধু সংগঠনের কার্যালয়ে পৌঁছায়, কখনও প্রকাশ করা হয় না।</p></div>`;

/* ---------- content (Bengali) ---------- */
const WORK=[['mega','ওবিসি সচেতনতা','অধিকার, প্রকল্প ও প্রক্রিয়া — সহজ ভাষায়।'],['book','শিক্ষা','দিশা, বৃত্তির তথ্য এবং শেখার ওপর দীর্ঘমেয়াদি বিনিয়োগ।'],['youth','যুব উন্নয়ন','নতুন প্রজন্মকে গঠনমূলক সামাজিক জীবনে যুক্ত করা।'],['woman','নারী ও সামাজিক উন্নয়ন','সমাজে নারীর অংশগ্রহণ ও নেতৃত্ব।'],['work','অর্থনৈতিক ও দক্ষতা উন্নয়ন','বিশ্বাসযোগ্য, বৈধ সুযোগের সঙ্গে নাগরিকদের যোগ।'],['search','গবেষণা ও নথিভুক্তি','সমীক্ষা, নথিপত্র, সংগ্রহশালা ও তথ্যভিত্তিক প্রতিবেদন।'],['scale','আইন ও সংবিধান সচেতনতা','সংবিধান, আইন ও প্রশাসনিক প্রক্রিয়া বোঝা।'],['temple','ঐতিহ্য ও সংস্কৃতি','সমাজের ইতিহাস, মৌখিক স্মৃতি ও বাংলার সামাজিক ঐতিহ্য রক্ষা।']];
const workGrid=()=>`<div class="work">${WORK.map(([i,a,b])=>`<div class="rv"><div class="wi">${ico(i)}</div><b>${a}</b><span>${b}</span></div>`).join('')}</div>`;
const VALUES=['সংবিধান-নিষ্ঠা','তথ্যপ্রমাণ','মর্যাদা','শিক্ষা','ঐক্য','স্বচ্ছতা','সেবা'];
const FAQ=[['ফ্রন্ট কি ওবিসি শংসাপত্র বা সংরক্ষণের সুবিধার নিশ্চয়তা দেয়?','না। ফ্রন্ট সচেতনতা ও আইনসম্মত প্রতিনিধিত্বের কাজ করে। শংসাপত্র ও সুবিধা আইন অনুযায়ী সংশ্লিষ্ট সরকারি কর্তৃপক্ষই স্থির করে। আমরা কখনও ফলাফলের প্রতিশ্রুতি দিই না।'],
['রাজ্যের ওবিসি তালিকায় এখন কী আছে?','ফ্রন্টের গবেষণা-নোট অনুযায়ী: পশ্চিমবঙ্গ পশ্চাৎপদ শ্রেণি কল্যাণ দপ্তরের ৯৪৫-বিসিডব্লিউ/এমআর-২৩/২০২৬ নং বিজ্ঞপ্তি (১৮ মে ২০২৬), যেখানে ২২ মে ২০২৪ তারিখের কলকাতা হাইকোর্টের রায়ের উল্লেখ আছে, জানায় যে রাজ্য তালিকায় পরিষেবা ও পদে ৭% সংরক্ষণের জন্য ৬৬টি শ্রেণি রয়েছে। অনুগ্রহ করে সবসময় পশ্চিমবঙ্গ সরকারের সরকারি ওয়েবসাইটে যাচাই করে নিন।'],
['সমাজের পক্ষ থেকে স্মারকলিপি কীভাবে তৈরি করব?','চারটি প্রশ্নের উত্তর দিন: সমস্যাটি কী? কারা ক্ষতিগ্রস্ত (অনুমান নয়, নথিভুক্ত)? কী প্রতিকার চাওয়া হচ্ছে? কোন প্রমাণ আছে? বিজ্ঞপ্তি, আদেশ, সমীক্ষা বা নথি জুড়ে দিন।'],
['আমার সমাজের ইতিহাস কীভাবে নথিভুক্ত করব?','ঐতিহাসিক নথি, সরকারি বিজ্ঞপ্তি, জনগণনার তথ্য, কমিশনের রিপোর্ট, ছবি ও মৌখিক ইতিহাস সংগ্রহ করুন। কোথায় আপনার সমাজের মানুষ থাকেন, কী পেশা, শিক্ষার স্তর এবং প্রকল্প পেতে কী অসুবিধা — লিখে রাখুন।'],
['দাবি, পদ্ধতি আর আইনি অধিকারের মধ্যে তফাত কী?','আইনি অধিকার মানে যা আইনে আগে থেকেই দেওয়া আছে; পদ্ধতি মানে কোনও কর্তৃপক্ষ কীভাবে আবেদন নিষ্পত্তি করে; আর দাবি মানে সমাজ যা চাইছে। আমরা প্রতিটিকে আলাদা করে স্পষ্ট লিখি।'],
['এই ওয়েবসাইট কখনও কী করবে না?','যাচাইহীন পরিসংখ্যান, ভুয়ো বিজ্ঞপ্তি, বিভ্রান্তিকর আইনি পরামর্শ, ব্যক্তিগত আক্রমণ, সাম্প্রদায়িক ঘৃণা, সহিংসতার ডাক বা কারও ব্যক্তিগত তথ্য প্রকাশ করবে না।']];

JOURNAL.sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))||(b.no-a.no));EVENTS.sort(byDate);BLOGS.sort(byDate);ARCHIVE.sort(byDate);
/* ---------- cards ---------- */
const imgTag=x=>x.img?`<img loading="lazy" src="${esc(x.img)}" alt="${esc(x.t)}">`:'ॐ';
const cards=(a,kind)=>a.length?`<div class="grid">${a.map(x=>`<a class="card rv" href="#${kind}/${x.id}"><div class="im">${imgTag(x)}</div><div class="b"><div class="meta">${esc([x.c,fmtDate(x.d)].filter(Boolean).join(' · '))}</div><h3>${esc(x.t)}</h3><div style="color:var(--mu);font-size:16px">${esc(x.b.slice(0,95))}…</div></div></a>`).join('')}</div>`:`<div class="empty">এখানে এখনও কিছু প্রকাশিত হয়নি। শীঘ্রই আবার দেখুন।</div>`;
const detail=(x,back)=>{const ph=(x.photos||[]).map(p=>({image:p,caption:x.t}));if(x.img)ph.unshift({image:x.img,caption:x.t});GL=ph;
return head(esc(x.t),esc([x.c,fmtDate(x.d)].filter(Boolean).join(' · ')))+`<div class="w" style="padding:34px 20px;max-width:960px">${x.img?`<img src="${esc(x.img)}" style="width:100%;border-radius:18px;margin-bottom:22px;box-shadow:var(--sh);cursor:zoom-in" onclick="lb(0)" alt="">`:''}<div class="art" style="max-width:860px">${paras(x.b)}</div>${x.file?`<p><a class="btn" href="${esc(x.file)}" target="_blank" rel="noopener">📄 সংযুক্ত ফাইল খুলুন</a></p>`:''}${(x.photos||[]).length?`<div class="ttl" style="margin-top:40px"><h2>ছবি (${bn(ph.length)}টি)</h2>${ORN}</div><div class="gal">${ph.map((g,i)=>`<figure onclick="lb(${i})"><img loading="lazy" src="${esc(g.image)}" alt=""></figure>`).join('')}</div>`:''}<p style="margin-top:30px"><a class="btn sm nv" href="#${back}">← ফিরে যান</a></p></div>`};
const jcard=j=>{const url=j.file?esc(j.file):'';const cov=j.cover?`<img loading="lazy" src="${esc(j.cover)}" alt="সংখ্যা ${bn(j.no)}">`:`<div class="jcov">${mandala('#ffd08a')}<small>দেশ আমার, মাটি আমার</small><b>মাসিক পত্রিকা</b><i>সংখ্যা ${bn(j.no)}</i><u>${esc(fmtDate(j.date))}</u></div>`;
 return `<${url?`a href="${url}" target="_blank" rel="noopener"`:'div'} class="card jc rv"><div class="im">${cov}<span class="badge">সংখ্যা ${bn(j.no)}</span></div><div class="b"><div class="meta">📅 ${esc(fmtDate(j.date))}</div><h3>${esc(j.title||('মাসিক পত্রিকা — সংখ্যা '+bn(j.no)))}</h3>${j.note?`<div style="color:var(--mu);font-size:16px">${esc(j.note)}</div>`:''}<p style="margin:10px 0 0"><span class="btn sm">${url?'📖 পত্রিকা পড়ুন':'শীঘ্রই আসছে'}</span></p></div></${url?'a':'div'}>`};
const jgrid=a=>a.length?`<div class="grid">${a.map(jcard).join('')}</div>`:`<div class="empty" style="font-size:20px">📖 প্রথম সংখ্যা শীঘ্রই আসছে।<br><a class="btn sm" href="#journal/write">আপনিও লিখুন</a></div>`;


/* ---------- দান / অনুদান ---------- */
const DIYA=`<svg class="diya" viewBox="0 0 64 64" aria-hidden="true"><g class="fl"><path d="M32 4c5 7 9 11 9 17a9 9 0 0 1-18 0c0-6 4-10 9-17z" fill="#ffb12b"/><path d="M32 15c2.600 3.600 4.200 5.600 4.200 8.200a4.200 4.200 0 0 1-8.400 0c0-2.600 1.600-4.600 4.200-8.200z" fill="#fff3c4"/></g><path d="M5 34h54c0 11-10.500 18-27 18S5 45 5 34z" fill="#d9a441"/><path d="M5 34h54" stroke="#8a1c12" stroke-width="2"/><path d="M14 40h36" stroke="#8a1c12" stroke-width="1.500" opacity=".5"/><ellipse cx="32" cy="57" rx="15" ry="3" fill="rgba(0,0,0,.28)"/></svg>`;
const pend=v=>!v||/under process|process|প্রক্রিয়াধীন/i.test(v);
function dnAmt(n,el){A('.amt button').forEach(b=>b.classList.toggle('on',b===el));const a=$('#dnu');if(a){a.href=a.dataset.base+(n?'&am='+n:'')}const t=$('#dnamt');if(t)t.textContent=n?('₹ '+bn(n)+' — এই পরিমাণ'):''}
function dnCopy(t,el){const o=el.textContent;const done=()=>{el.textContent='✓ কপি হয়েছে';setTimeout(()=>el.textContent=o,1800)};try{navigator.clipboard.writeText(t).then(done,done)}catch(e){done()}}
function dnGo(){const e=$('#dnhow');if(e)e.scrollIntoView({behavior:'smooth',block:'start'})}
const dnPay=()=>{const up=!pend(C.upi),bk=!pend(C.bank);
 const upi=up?`<div class="upi"><b>ইউপিআই আইডি</b><div class="uid"><code>${esc(C.upi)}</code><button class="btn sm" onclick="dnCopy('${esc(C.upi)}',this)">কপি করুন</button></div><div class="amt"><button onclick="dnAmt(0,this)" class="on">যেকোনো পরিমাণ</button>${[101,251,501,1001,2100].map(n=>`<button onclick="dnAmt(${n},this)">₹${bn(n)}</button>`).join('')}</div><p id="dnamt" class="note" style="margin:6px 0 10px"></p><a id="dnu" class="btn" data-base="upi://pay?pa=${encodeURIComponent(C.upi)}&pn=${encodeURIComponent('Hindu OBC Front')}&cu=INR" href="upi://pay?pa=${encodeURIComponent(C.upi)}&pn=${encodeURIComponent('Hindu OBC Front')}&cu=INR">📲 ইউপিআই অ্যাপে দান করুন</a><p class="note">মোবাইলে বোতামে চাপলে আপনার ইউপিআই অ্যাপ খুলবে।</p></div>`
 :`<div class="upi pend"><b>ইউপিআই</b><p>🪔 অফিসিয়াল ইউপিআই আইডি ও কিউআর কোড শীঘ্রই এখানে প্রকাশিত হবে।</p></div>`;
 const bank=bk?`<div class="upi"><b>ব্যাংক অ্যাকাউন্ট</b><p style="white-space:pre-line;margin:6px 0 0">${esc(C.bank)}</p></div>`:`<div class="upi pend"><b>ব্যাংক অ্যাকাউন্ট</b><p>অফিসিয়াল ব্যাংক অ্যাকাউন্টের তথ্য প্রক্রিয়াধীন — প্রকাশিত হলে এখানে জানানো হবে।</p></div>`;
 return upi+bank};
const P_donate=()=>`<div class="dn-hero">${mandala('#ffd08a')}<div class="w in"><div class="om">ॐ</div><h1>দানই সেবা, সেবাই ধর্ম</h1><p>সনাতন পরম্পরায় দান কেবল সাহায্য নয় — এ এক পবিত্র কর্তব্য। আপনার অনুদানে জ্বলুক সমাজসেবার প্রদীপ।</p><div class="diyas" aria-hidden="true">${DIYA}${DIYA}${DIYA}${DIYA}${DIYA}</div><a class="btn big" href="#donate" onclick="dnGo();return false">🪔 এখনই অনুদান দিন</a> <a class="btn o" href="${esc(C.forms.donation||'#contact')}" target="_blank" rel="noopener">রসিদের ফর্ম</a></div>${SKY()}</div>
<section class="s"><div class="w">${ttl('শাস্ত্র কী বলে','দানের মহিমা আমাদের ঐতিহ্যের মূলে')}<div class="shl">
<div class="rv"><div class="sa">यज्ञदानतपःकर्म न त्याज्यं कार्यमेव तत् ।</div><p class="bn">যজ্ঞ, দান ও তপস্যা — এই কর্ম ত্যাগ করা উচিত নয়; এগুলি অবশ্যই করণীয়।</p><small>— শ্রীমদ্ভগবদ্গীতা ১৮।৫</small></div>
<div class="rv"><div class="sa">धर्मो रक्षति रक्षितः ।</div><p class="bn">যে ধর্মকে রক্ষা করে, ধর্মও তাকে রক্ষা করে।</p><small>— মনুস্মৃতি ৮।১৫</small></div>
<div class="rv"><div class="sa">दानेन पाणिर्न तु कङ्कणेन ।</div><p class="bn">হাতের শোভা দানে, কঙ্কণে নয়।</p><small>— ভর্তৃহরি, নীতিশতক</small></div></div></div></section>
<section class="s alt"><div class="w split"><div class="rv"><span class="chip" style="background:#fff1df;color:var(--mr);border-color:var(--ln)">লোকমাতা রানি রাসমণি</span><h2 style="margin-top:12px">তাঁর পথেই আমাদের পথ</h2><div class="art"><p>দক্ষিণেশ্বর কালী মন্দির প্রতিষ্ঠা ও জনকল্যাণমূলক কাজের জন্য স্মরণীয় লোকমাতা রানি রাসমণি দেখিয়ে গেছেন — দেবসেবা আর জনসেবা একই সুতোয় বাঁধা।</p><p>সেই পরম্পরা স্মরণ করেই হিন্দু ওবিসি ফ্রন্ট সচেতনতা, নথিভুক্তি, মাসিক পত্রিকা ও সমাজসেবার কাজ এগিয়ে নিয়ে চলেছে। আপনার প্রতিটি দান সেই কাজেরই প্রদীপ।</p></div></div>
<div class="rv"><div class="quote">“একটি প্রদীপ আরেকটি প্রদীপ জ্বালালে তার আলো কমে না — দান করলে সমাজের আলোই বাড়ে।”</div></div></div></section>
<section class="s"><div class="w">${ttl('আপনার দান কোথায় যায়')}<div class="work">
<div class="rv"><div class="wi">${ico('search')}</div><b>সচেতনতা ও তথ্য</b><span>অধিকার, সরকারি প্রকল্প ও পদ্ধতি নিয়ে যাচাই করা তথ্য গ্রামে গ্রামে পৌঁছে দেওয়া।</span></div>
<div class="rv"><div class="wi">${ico('book')}</div><b>মাসিক পত্রিকা</b><span>“দেশ আমার, মাটি আমার” — ছাপা ও প্রকাশনার কাজ।</span></div>
<div class="rv"><div class="wi">${ico('users')}</div><b>ইউনিট ও সংগঠন</b><span>গ্রাম, ব্লক ও জেলায় স্থানীয় ইউনিট গড়ে তোলা।</span></div>
<div class="rv"><div class="wi">${ico('temple')}</div><b>সমাজসেবা ও সংস্কৃতি</b><span>বৃক্ষরোপণ, সামাজিক মিলন ও রানি রাসমণি স্মরণ কর্মসূচি।</span></div></div></div></section>
<section class="s alt" id="dnhow"><div class="w">${ttl('কীভাবে দান করবেন','আপনার সুবিধামতো যেকোনো পথে')}<div class="split" style="align-items:start"><div class="pan dnp rv"><h3>🪔 সরাসরি দান</h3>${dnPay()}</div><div class="rv"><div class="pan formcta"><div class="big-ic">${ico('heart')}</div><h3>রসিদ ও অনুদানের তথ্য</h3><p>দান করার পর বা আগে নাম ও ফোন নম্বর জানাতে গুগল ফর্মটি পূরণ করুন। কার্যালয় থেকে রসিদের জন্য যোগাযোগ করা হবে।</p>${formBtn('donation','ফর্ম পূরণ করুন')}</div><div class="pan" style="margin-top:20px;border-top-color:var(--gd)"><h3>🔒 সতর্কতা</h3><p class="note" style="margin:0">দান সম্পূর্ণ স্বেচ্ছাপ্রণোদিত। শুধুমাত্র এই ওয়েবসাইটে প্রকাশিত অফিসিয়াল তথ্যেই দান করুন। অন্য কোনো ব্যক্তির নম্বরে টাকা পাঠানোর আগে কার্যালয়ে (${esc(C.phone||'')}) নিশ্চিত হয়ে নিন।</p></div></div></div></div></section>
<div class="cta">${mandala('#fff')}<h2>আপনার দানে জ্বলুক সমাজসেবার প্রদীপ</h2><p>ধন্যবাদ — আপনার সহযোগিতাই আমাদের শক্তি। জয় মা, জয় সনাতন।</p><a class="btn big" href="#donate" onclick="dnGo();return false">🪔 অনুদান দিন</a></div>`;

/* ---------- জানুন › গাইডলাইন ও নথি ---------- */
const GIC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h8"/></svg>';
const gcard=g=>{const has=g.pdf||g.img;return `<div class="card gd rv"><div class="gd-top"><span class="gd-ic">${GIC}</span>${g.tag?`<span class="gd-tag">${esc(g.tag)}</span>`:''}</div><div class="b"><span class="pill">${esc(g.c)}</span><h3>${esc(g.t)}</h3><div style="color:var(--mu);font-size:16px">${esc(g.b||'')}</div>
<div class="gd-act">${g.pdf?`<a class="btn sm" href="${esc(g.pdf)}" target="_blank" rel="noopener">📄 PDF দেখুন</a><a class="btn sm nv" href="${esc(g.pdf)}" download>⬇ PDF</a>`:''}${g.img?`<button class="btn sm o2" onclick="lbOne('${esc(g.img)}','${esc(g.t)}')">🖼 ছবি দেখুন</button><a class="btn sm nv" href="${esc(g.img)}" download>⬇ ছবি</a>`:''}${has?'':'<span class="note">📎 ফাইল শীঘ্রই যোগ হবে</span>'}</div></div></div>`};
const guidesHtml=()=>`<div class="grid ggrid">${GUIDES.map((g,i)=>gcard(g).replace('<div class="gd-top">',`<div class="gd-top"><span class="gn sm">${bn(i+1)}</span>`)).join('')}</div>`;

/* ---------- pages ---------- */
const P={
donate(){return P_donate()},
home(){
 const sl=[...GALLERY.filter(g=>g.category=='সম্মেলন').slice(0,4),...GALLERY.filter(g=>g.category=='বৈঠক').slice(0,2)];
 const gs=GALLERY.filter(g=>g.category=='ডেপুটেশন').slice(0,4).concat(GALLERY.filter(g=>g.category=='কর্মসূচি').slice(0,4));
 const dham=GALLERY.find(g=>/ধাম/.test(g.caption));
 return `<div class="hero"><img class="bnr" src="images/banner.jpg" alt="হিন্দু ওবিসি ফ্রন্ট"></div>
<div class="mq"><span class="bn">ॐ &nbsp; জাগো হিন্দু • সংগঠিত হও • অধিকার নাও • রাষ্ট্র নির্মাণ করো &nbsp; ॐ &nbsp; সংবিধান জানুন • আইন জানুন • পদ্ধতি জানুন • প্রমাণ জানুন • তারপর স্মারকলিপি দিন &nbsp; ॐ</span></div>
<div class="herotxt">${mandala('#fff')}<div class="in"><span class="chip">সচেতনতা</span><span class="chip">ঐক্য</span><span class="chip">তথ্যপ্রমাণ</span><span class="chip">প্রতিনিধিত্ব</span><span class="chip">উন্নয়ন</span>
<h1>একটি সমাজের উদ্বেগ হয়ে উঠতে পারে সম্মিলিত কণ্ঠস্বর</h1><p>সচেতনতা, নথিভুক্তি, সামাজিক উন্নয়ন ও আইনসম্মত প্রতিনিধিত্বের মধ্য দিয়ে ওবিসি সমাজকে সংগঠিত করার এক গঠনমূলক মঞ্চ।</p>
<a class="btn big" href="#citizen/join">🚩 হিন্দু ওবিসি সৈনিক হোন</a> <a class="btn o" href="#about/story">আমাদের সম্পর্কে</a></div></div>
<div class="divsky"><svg viewBox="0 0 1200 60" preserveAspectRatio="none" style="background:var(--bg)"><use href="#sky" style="color:var(--mr)"/></svg></div>
<div class="w"><div class="act">
<a href="#citizen/join"><div class="ic">${ico('flag')}</div><b>সৈনিক হোন</b><span>আন্দোলনের স্বেচ্ছাসেবক হিসেবে যোগ দিন</span></a>
<a href="#citizen/unit"><div class="ic">${ico('temple')}</div><b>ইউনিট গড়ুন</b><span>গ্রাম, ব্লক বা জেলায় সংগঠন করুন</span></a>
<a href="#donate"><div class="ic">${ico('lamp')}</div><b>অনুদান</b><span>সচেতনতা ও গবেষণার কাজে সহায়তা</span></a>
<a href="#journal/write"><div class="ic">${ico('pen')}</div><b>পত্রিকায় লিখুন</b><span>দেশ আমার, মাটি আমার</span></a></div></div>
<section class="s"><div class="w split"><div class="rv"><div class="chip" style="background:#fff1df;color:var(--mr);border-color:var(--ln)">আমরা কারা</div><h2 style="margin-top:12px;font-size:clamp(26px,3.6vw,38px)">উদ্বেগ থেকে দায়িত্বশীল প্রতিনিধিত্বে</h2><div class="art"><p>পশ্চিমবঙ্গ জুড়ে হাজার হাজার পরিবারের ইতিহাস, পেশা, ঐতিহ্য ও পরিচয় আলাদা। অথচ শিক্ষা, কর্মসংস্থান, কল্যাণ প্রকল্প, সামাজিক অগ্রগতি, নথিপত্র ও প্রতিনিধিত্ব নিয়ে প্রশ্নগুলি অনেকটাই এক।</p><p>হিন্দু ওবিসি ফ্রন্ট সেই প্রশ্নগুলিকে এক গঠনমূলক জনমঞ্চে আনতে চায় — <b>উদ্বেগ থেকে সচেতনতা, সচেতনতা থেকে সংগঠন, সংগঠন থেকে প্রমাণ, প্রমাণ থেকে দায়িত্বশীল প্রতিনিধিত্ব।</b></p></div><a class="btn" href="#about/story">আমাদের সম্পর্কে পড়ুন</a></div>
<div class="logo-wrap rv">${mandala()}<img src="images/logo.jpg" alt="হিন্দু ওবিসি ফ্রন্ট"></div></div></section>
<section class="s dark"><div class="w"><div class="stats">
<div class="rv"><b data-n="৮">০</b><span>কর্মক্ষেত্র</span></div><div class="rv"><b data-n="৭">০</b><span>মূল আদর্শ</span></div><div class="rv"><b data-n="২৩৩">০</b><span>তম লোকমাতা রানি রাসমণি জন্মবার্ষিকী সম্মেলন</span></div><div class="rv"><b data-n="${bn(GALLERY.length)}">০</b><span>আলোকচিত্রে মুহূর্ত</span></div></div></div></section>
<section class="s alt"><div class="w">${ttl('আমাদের মূল আদর্শ')}<div class="vals rv">${VALUES.map(v=>`<div>${v}</div>`).join('')}</div></div></section>
<section class="s"><div class="w">${ttl('আমরা কী করি','আটটি কর্মক্ষেত্র, একটিই পথ: যুক্ত করা, নথিভুক্ত করা, সমন্বয় করা, প্রতিনিধিত্ব করা, পর্যালোচনা করা।')}${workGrid()}</div></section>
<section class="s dark"><div class="w split"><div class="rv"><h2 style="font-size:clamp(26px,3.6vw,38px)">লোকমাতা রানি রাসমণি</h2><p>জনহিতৈষণা, জনকল্যাণমূলক কাজ ও সমাজসেবার প্রতীক। ২০২৬ সালের সেপ্টেম্বরে তাঁর ২৩৩তম জন্মবার্ষিকীতে ফ্রন্ট কলকাতার রবীন্দ্র সদনে সম্মেলন করেছে এবং পশ্চিমবঙ্গের জন্য <b>রানি রাসমণি ধাম</b> গড়ার প্রস্তাব রেখেছে।</p><a class="btn o" href="#about/rani">আরও জানুন</a></div>${dham?`<img class="rv" src="${esc(dham.image)}" alt="" style="width:100%;border-radius:18px;border:5px solid #ffd08a;box-shadow:0 20px 50px rgba(0,0,0,.4)">`:''}</div></section>
<section class="s"><div class="w">${ttl('সাম্প্রতিক কর্মসূচি')}${cards(EVENTS.slice(0,3),'event')}<p style="text-align:center;margin-top:30px"><a class="btn" href="#events">সব কর্মসূচি ও লেখা</a></p></div></section>
<section class="s alt"><div class="w split"><div class="rv"><h2 style="font-size:clamp(26px,3.6vw,38px)">দেশ আমার, মাটি আমার</h2><p>আমাদের মাসিক পত্রিকায় থাকে প্রবন্ধ, গবেষণা, ইতিহাস ও সমাজের মানুষের কথা। পড়ুন — অথবা নিজের লেখা পাঠান।</p><a class="btn" href="#journal/issues">সংখ্যাগুলি দেখুন</a> <a class="btn nv" href="#journal/write">পত্রিকায় লিখুন</a></div>${JOURNAL.length?`<div style="max-width:340px;margin:auto">${jcard(JOURNAL[0])}</div>`:'<div class="empty rv" style="font-size:20px">📖 প্রথম সংখ্যা শীঘ্রই আসছে।</div>'}</div></section>
<section class="s"><div class="w">${ttl('মাঠের ছবি')}<div class="gal" style="columns:4 200px">${gs.map((g,i)=>`<figure class="rv" onclick="lbHome(${i})"><img loading="lazy" src="${esc(g.image)}" alt="${esc(g.caption)}"><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div><p style="text-align:center;margin-top:20px"><a class="btn" href="#gallery">পুরো ছবির ঘর</a></p></div></section>
<section class="s alt"><div class="w">${ttl('সংবাদমাধ্যমে আমরা')}${cards2(ARCHIVE.filter(a=>a.c=='সংবাদ'))}</div></section>
<section class="dnb"><div class="w split"><div class="rv"><span class="chip">🪔 সেবা • দান • ধর্ম</span><h2>একটি প্রদীপ থেকে জ্বলে ওঠে হাজার প্রদীপ</h2><p>আপনার ছোট্ট দানও সচেতনতা, নথিভুক্তি ও সমাজসেবার কাজে আলো ছড়ায়। রানি রাসমণির পথে — সমাজের জন্য এগিয়ে আসুন।</p><a class="btn big" href="#donate">🪔 অনুদান দিন</a></div><div class="diyas rv" aria-hidden="true">${DIYA}${DIYA}${DIYA}</div></div></section>
<div class="cta">${mandala('#fff')}<h2>আন্দোলনের অংশ হোন</h2><p>সচেতনতাই ক্ষমতায়নের প্রথম ধাপ। আমাদের সঙ্গে আসুন — সচেতন, সংগঠিত, সাংবিধানিক।</p><a class="btn big" href="#citizen/join">হিন্দু ওবিসি সৈনিক হোন</a></div>`;
},
about(t){t=t||'story';return head('আমাদের কথা','আমাদের সম্পর্কে, আমাদের লক্ষ্য এবং সামনের পথ')+`<div class="w">${tabs('about',[['story','আমাদের সম্পর্কে'],['vision','লক্ষ্য ও উদ্দেশ্য'],['work','আমাদের কাজ'],['rani','রানি রাসমণি']],t)}<div style="padding-bottom:50px">${{
story:`<div class="split"><div class="art"><h2>আমরা কারা</h2><p><b>হিন্দু ওবিসি ফ্রন্ট</b> একটি বৃহত্তর সামাজিক মঞ্চ, যা ভারতের সাংবিধানিক ও গণতান্ত্রিক কাঠামোর মধ্যে থেকে হিন্দু ওবিসি ও অন্যান্য পশ্চাৎপদ সম্প্রদায়ের সচেতনতা, কল্যাণ, উন্নয়ন ও আইনসম্মত প্রতিনিধিত্বের জন্য কাজ করে।</p><p>“ফ্রন্ট” শব্দটি সহযোগিতার প্রতীক: প্রতিটি সম্প্রদায় নিজের ইতিহাস, রীতি ও পরিচয় বজায় রেখেই শিক্ষা, কর্মসংস্থান, কল্যাণ-সচেতনতা, নথিভুক্তি, গবেষণা ও যথাযথ কর্তৃপক্ষের কাছে প্রতিনিধিত্বে একসঙ্গে কাজ করে।</p><p>আমরা বিশ্বাস করি <b>সচেতনতাই ক্ষমতায়নের প্রথম ধাপ</b>, প্রমাণ প্রতিনিধিত্বকে শক্তিশালী করে, আর শিক্ষা তৈরি করে সুযোগ।</p></div><img src="images/aim.jpg" alt="আমাদের লক্ষ্য" style="width:100%;border-radius:18px;box-shadow:var(--sh)"></div>
<div class="ttl" style="margin-top:50px"><h2>আমাদের পথচলা</h2>${ORN}</div><div class="tl"><div><b>উদ্বেগ</b> — সমাজের সাধারণ প্রশ্ন ও সমস্যা চিহ্নিত করা।</div><div><b>সচেতনতা</b> — অধিকার, প্রকল্প ও পদ্ধতি সহজ ভাষায় ছড়িয়ে দেওয়া।</div><div><b>সংগঠন</b> — গ্রাম-ব্লক-জেলা থেকে রাজ্য পর্যন্ত ইউনিট গড়া।</div><div><b>প্রমাণ</b> — নথি, সমীক্ষা ও ইতিহাস সংগ্রহ করা।</div><div><b>প্রতিনিধিত্ব</b> — শান্তিপূর্ণ ও আইনসম্মত স্মারকলিপি, ডেপুটেশন ও বৈঠক।</div></div>
<div class="ttl" style="margin-top:40px"><h2>আমাদের পদ্ধতি</h2>${ORN}</div><div class="quote">সংবিধান জানুন। আইন জানুন। পদ্ধতি জানুন। প্রমাণ জানুন। তারপর স্মারকলিপি দিন।</div><p class="note" style="margin-top:14px">কোনও বিষয় বিচারাধীন থাকলে আমরা তা বিচারাধীন বলেই লিখি; কোনও কিছু দাবি হলে তা দাবি বলেই লিখি; কোনও বিষয় বিতর্কিত হলে তাও স্পষ্ট করে জানাই।</p>`,
vision:`<div class="quote">একটি সামাজিকভাবে সচেতন, শিক্ষায় ক্ষমতায়িত, অর্থনৈতিকভাবে অগ্রসর ও সংবিধান-সচেতন ওবিসি সমাজ — যেখানে সম্প্রদায়গুলি নিজেদের অধিকার বোঝে, ঐতিহ্য রক্ষা করে, সরকারি প্রতিষ্ঠানে অংশ নেয় এবং মর্যাদার সঙ্গে উন্নয়নের পথে এগোয়।</div><div class="ttl" style="margin-top:46px"><h2>আমাদের উদ্দেশ্য</h2>${ORN}</div><div class="mis">${['ওবিসি সমাজে সচেতনতা বৃদ্ধি','শিক্ষা ও দক্ষতা উন্নয়নে উৎসাহ','গবেষণা ও নথিভুক্তিতে সহায়তা','সমাজের ইতিহাস ও ঐতিহ্য রক্ষা','সাংবিধানিক ও প্রশাসনিক প্রক্রিয়া ব্যাখ্যা','সমাজের প্রকৃত সমস্যা নথিভুক্ত করা','আইনসম্মত ও গণতান্ত্রিক প্রতিনিধিত্বে উৎসাহ','সমাজ সংগঠনগুলিকে যুক্ত করা','যুব ও নারীর অংশগ্রহণ বাড়ানো','সরকারি প্রকল্পের যাচাই করা তথ্য ছড়ানো','অর্থনৈতিক ও সামাজিক উন্নয়নে উৎসাহ','জনসম্পৃক্ততার জন্য একটি দায়িত্বশীল মঞ্চ দেওয়া'].map(m=>`<div class="rv">🔶 ${m}</div>`).join('')}</div><div class="ttl" style="margin-top:46px"><h2>মূল আদর্শ</h2>${ORN}</div><div class="vals">${[...VALUES,'দায়িত্বশীলতা'].map(v=>`<div>${v}</div>`).join('')}</div>`,
work:workGrid(),
rani:`<div class="split"><div class="art"><h2>লোকমাতা রানি রাসমণি</h2><p>রানি রাসমণি ইতিহাসে জনহিতৈষণা, জনকল্যাণমূলক কাজ এবং দক্ষিণেশ্বর কালী মন্দির প্রতিষ্ঠার জন্য পরিচিত। ফ্রন্ট তাঁর উত্তরাধিকারকে সাংস্কৃতিক কাজের কেন্দ্রে রাখে: <b>সেবা, সামাজিক দায়িত্ব, জনকল্যাণ ও সাংস্কৃতিক ঐতিহ্য।</b></p><p>তাঁর ২৩৩তম জন্মবার্ষিকী উপলক্ষে ফ্রন্ট কলকাতার রবীন্দ্র সদনে এক সম্মেলন করেছে, যেখানে রাজ্যের নানা প্রান্ত থেকে সমাজের মানুষ এসেছিলেন।</p><h3>রানি রাসমণি ধামের প্রস্তাব</h3><p>ফ্রন্ট প্রকাশ্যে পশ্চিমবঙ্গে রানি রাসমণি ধাম গড়ার ভাবনা তুলে ধরেছে এবং রাজ্য সরকারের কাছে জমা দেওয়ার জন্য একটি মডেল হস্তান্তর করেছে। এটি একটি <b>প্রস্তাব</b> মাত্র: প্রস্তাব → বিবেচনা → অনুমোদন → জমি → নির্মাণ।</p></div><div>${GALLERY.filter(x=>x.category=='সম্মেলন').slice(0,2).map(x=>`<img src="${esc(x.image)}" alt="" style="width:100%;border-radius:18px;margin-bottom:14px;box-shadow:var(--sh)">`).join('')}</div></div>`}[t]||''}</div></div>`},
events(){return head('কর্মসূচি ও লেখা','কর্মসূচি, ডেপুটেশন, সম্মেলন ও সমাজের কথা')+`<div class="w" style="padding:40px 20px"><div class="ttl"><h2>কর্মসূচি</h2>${ORN}</div>${cards(EVENTS,'event')}<div class="ttl" style="margin-top:56px"><h2>লেখা</h2>${ORN}</div>${cards(BLOGS,'event')}</div>`},
event(id){const x=[...EVENTS,...BLOGS].find(i=>i.id==id);return x?detail(x,'events'):P.events()},
archive(){return head('সংগ্রহশালা','সংবাদ, স্মারকলিপি, প্রতিবেদন ও নথি')+`<div class="w" style="padding:40px 20px 60px">${cards2(ARCHIVE)}</div>`},
journal(t){t=t||'issues';return head('মাসিক পত্রিকা','দেশ আমার, মাটি আমার')+`<div class="w" style="padding-bottom:50px">${tabs('journal',[['issues','সংখ্যাগুলি দেখুন'],['write','পত্রিকায় লিখুন']],t)}`+(t=='write'?`<div class="split" style="align-items:start"><div>${formPanel('journal','pen','আপনার লেখা পাঠান','নিচের বোতামে চাপলে গুগল ফর্ম খুলবে। সেখানে আপনার নাম, ফোন, লেখার শিরোনাম ও লেখা জমা দিন।','লেখা পাঠান')}</div><div class="pan art"><h3>লেখার নিয়ম</h3><p>ওবিসি সমাজ, শিক্ষা, ইতিহাস, ঐতিহ্য, সরকারি প্রকল্প ও সামাজিক উন্নয়ন নিয়ে লেখা আমরা স্বাগত জানাই।</p><p>অনুগ্রহ করে তথ্যনির্ভর লিখুন এবং সূত্র উল্লেখ করুন। ব্যক্তিগত আক্রমণ, সাম্প্রদায়িক ঘৃণা, যাচাইহীন পরিসংখ্যান বা কারও ব্যক্তিগত তথ্য আমরা প্রকাশ করি না।</p><p>প্রকাশের আগে সম্পাদকমণ্ডলী আপনার সঙ্গে যোগাযোগ করবে।</p></div></div>`:jgrid(JOURNAL))+`</div>`},
citizen(t){t=t||'join';if(t=='donate')return P_donate();const T={donate:['অনুদান','সচেতনতা, গবেষণা ও সমাজের কাজে সহায়তা করুন'],join:['হিন্দু ওবিসি সৈনিক হোন','আন্দোলনের পাশে দাঁড়ান — সংগঠিত, সচেতন, সাংবিধানিক'],unit:['স্থানীয় ইউনিট গড়ুন','গ্রাম থেকে জেলা, জেলা থেকে রাজ্য — সংগঠন গড়ে তুলুন']}[t]||['নাগরিক কোণ',''];
const bank=C.bank?`<p><b>ব্যাংকের তথ্য</b><br><span style="white-space:pre-line">${esc(C.bank)}</span></p>`:'';
const B={donate:`<div class="split" style="align-items:start"><div class="pan art"><h3>সমাজের কাজে সহায়তা করুন</h3><p>আপনার অনুদান সচেতনতা কর্মসূচি, সমাজ-সমীক্ষা, নথিভুক্তি, মাসিক পত্রিকা ও আইনসম্মত প্রতিনিধিত্বের কাজে ব্যবহার হয়।</p>${C.upi?`<p><b>ইউপিআই আইডি:</b> ${esc(C.upi)}</p>`:'<p class="note">অফিসিয়াল অনুদান অ্যাকাউন্টের তথ্য এখানে প্রকাশিত হবে।</p>'}${bank}<p class="note">অনুদান পাঠানোর আগে অনুগ্রহ করে ফ্রন্টের কার্যালয়ে অ্যাকাউন্টের তথ্য নিশ্চিত করে নিন।</p></div>${formPanel('donation','heart','অনুদান / রসিদের জন্য','রসিদ বা অনুদানের তথ্য জানতে গুগল ফর্মে আপনার নাম ও ফোন নম্বর দিন।','ফর্ম পূরণ করুন')}</div>`,
join:`<div class="split" style="align-items:start">${formPanel('join','flag','হিন্দু ওবিসি সৈনিক হিসেবে নাম লেখান','নাম, ফোন, জেলা ও ব্লকের তথ্য দিয়ে গুগল ফর্মটি পূরণ করুন। কার্যালয় থেকে আপনার সঙ্গে যোগাযোগ করা হবে।','সৈনিক হতে আবেদন করুন')}<div class="pan art pts"><h3>একজন সৈনিক কী করেন</h3><p><i>১</i><span>ওবিসি অধিকার ও সরকারি প্রকল্প নিয়ে যাচাই করা তথ্য ছড়িয়ে দেন।</span></p><p><i>২</i><span>প্রতিবেশীদের শংসাপত্র ও পদ্ধতি বুঝতে সাহায্য করেন।</span></p><p><i>৩</i><span>শান্তিপূর্ণ ও আইনসম্মতভাবে ডেপুটেশন, স্মারকলিপি ও সচেতনতা কর্মসূচিতে যোগ দেন।</span></p><p><i>৪</i><span>নিজের এলাকার সমাজের ইতিহাস ও প্রয়োজন নথিভুক্ত করেন।</span></p></div></div>`,
unit:`<div class="split" style="align-items:start">${formPanel('unit','temple','ইউনিট গঠনের আবেদন','আপনার গ্রাম, ওয়ার্ড বা ব্লকের তথ্য দিয়ে গুগল ফর্মটি পূরণ করুন। রাজ্য কার্যালয় আপনার সঙ্গে যোগাযোগ করবে।','ইউনিট গঠনের আবেদন')}<div class="pan"><h3>কীভাবে হয়</h3><div class="steps"><div>নিজেদের মধ্যে একটি ছোট, নিষ্ঠাবান দল গড়ুন।</div><div>গুগল ফর্মে আবেদন জমা দিন; রাজ্য কার্যালয় যোগাযোগ করবে।</div><div>জেলা থেকে রাজ্য কাঠামো অনুযায়ী আপনার ইউনিট নিবন্ধিত হবে।</div><div>সভা করুন, স্থানীয় সমস্যা নথিভুক্ত করুন এবং ফ্রন্টকে জানান।</div></div></div></div>`}[t];
return head(...T)+`<div class="w" style="padding-bottom:60px">${tabs('citizen',[['join','সৈনিক হোন'],['donate','অনুদান'],['unit','ইউনিট গড়ুন']],t)}${B}</div>`},
knowledge(t){t=t=='guides'?'guides':'faq';return head('জানুন','যাচাই করা তথ্য, সহজ ভাষায়')+`<div class="w" style="padding-bottom:60px">${tabs('knowledge',[['faq','প্রশ্নোত্তর'],['guides','গাইডলাইন ও নথি']],t)}`+(t=='guides'?`<p class="note" style="text-align:center;max-width:760px;margin:-8px auto 0">ওবিসি শংসাপত্র, দলিল, বাইলজ ও সরকারি আদেশের কপি এখানে PDF বা ছবি হিসেবে দেখা ও ডাউনলোড করা যাবে।</p>`+guidesHtml():`<div class="faq" style="max-width:920px;margin:auto">${FAQ.map(([q,a])=>`<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`)+`<p class="note" style="max-width:920px;margin:24px auto 0">এই পাতাটি সাধারণ তথ্য, আইনি পরামর্শ নয়। সরকারি তালিকা, প্রকল্প ও বিজ্ঞপ্তির জন্য সবসময় পশ্চিমবঙ্গ সরকারের পশ্চাৎপদ শ্রেণি কল্যাণ দপ্তরের সঙ্গে যোগাযোগ করুন।</p></div>`},
gallery(c){const cats=['সব',...new Set(GALLERY.map(g=>g.category))];c=decodeURIComponent(c||'সব');const L=c=='সব'?GALLERY:GALLERY.filter(g=>g.category==c);GL=L;
return head('ছবির ঘর','মাঠের কিছু মুহূর্ত')+`<div class="w" style="padding:36px 20px 60px"><div class="chips">${cats.map(x=>`<button class="${x==c?'on':''}" onclick="location.hash='#gallery/${encodeURIComponent(x)}'">${x}</button>`).join('')}</div><div class="gal">${L.map((g,i)=>`<figure onclick="lb(${i})"><img loading="lazy" src="${esc(g.image)}" alt="${esc(g.caption)}"><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div></div>`},
contact(){const l=contactBlock();return head('যোগাযোগ','ফ্রন্টের কার্যালয়ের সঙ্গে কথা বলুন')+`<div class="w" style="padding:44px 20px 60px"><div class="split" style="align-items:start">${formPanel('contact','mega','আমাদের বার্তা পাঠান','আপনার প্রশ্ন বা বার্তা গুগল ফর্মের মাধ্যমে আমাদের জানান।','বার্তা পাঠান')}<div class="pan art"><h3>কার্যালয়</h3>${l||'<p class="note">কার্যালয়ের তথ্য শীঘ্রই প্রকাশিত হবে।</p>'}</div></div></div>`}
};
function cards2(a){return `<div class="grid">${a.map(x=>`<div class="card rv"><div class="im" style="cursor:zoom-in" ${x.img?`onclick="lbOne('${esc(x.img)}','${esc(x.t)}')"`:''}>${imgTag(x)}</div><div class="b"><span class="pill">${esc(x.c)}</span> <span class="meta">${esc(fmtDate(x.d))}</span><h3 style="margin-top:6px">${esc(x.t)}</h3><div style="color:var(--mu);font-size:16px">${esc(x.b)}</div>${x.file?`<p><a class="btn sm" href="${esc(x.file)}" target="_blank" rel="noopener">📄 ফাইল খুলুন</a></p>`:''}</div></div>`).join('')}</div>`}
const SOC={facebook:['Facebook','<path d="M13.5 22v-8.5h2.9l.5-3.5h-3.4V7.9c0-1 .3-1.7 1.7-1.7H17V3.1C16.700 3.100 15.700 3 14.500 3c-2.600 0-4.300 1.600-4.300 4.400V10H7.300v3.500h2.900V22z"/>'],x:['X','<path d="M17.800 3h3.100l-6.800 7.700L22 21h-6.200l-4.900-6.300L5.300 21H2.200l7.300-8.300L2 3h6.400l4.400 5.800zm-1.100 16.200h1.700L7.400 4.700H5.600z"/>'],instagram:['Instagram','<path d="M12 7.500A4.500 4.500 0 1 0 12 16.500 4.500 4.500 0 0 0 12 7.500zm0 7.400a2.900 2.900 0 1 1 0-5.800 2.900 2.900 0 0 1 0 5.800zM17.200 6.100a1.050 1.050 0 1 0 0 2.100 1.050 1.050 0 0 0 0-2.100z"/><path d="M16 2.500H8A5.500 5.500 0 0 0 2.500 8v8A5.500 5.500 0 0 0 8 21.500h8a5.500 5.500 0 0 0 5.500-5.500V8A5.500 5.500 0 0 0 16 2.500zm3.900 13.500a3.900 3.900 0 0 1-3.900 3.900H8A3.900 3.900 0 0 1 4.100 16V8A3.900 3.900 0 0 1 8 4.100h8A3.900 3.900 0 0 1 19.900 8z"/>'],youtube:['YouTube','<path d="M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800C22 15.200 22 12 22 12s0-3.200-.4-4.800zM10 15V9l5.200 3z"/>']};
const socials=()=>{const l=['facebook','instagram','x','youtube'].filter(k=>C[k]).map(k=>`<a class="soc soc-${k}" href="${esc(C[k])}" target="_blank" rel="noopener" aria-label="${SOC[k][0]}" title="${SOC[k][0]}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SOC[k][1]}</svg></a>`);return l.length?`<div class="socs">${l.join('')}</div>`:''};
function contactBlock(){return [C.email&&`<p>✉ <a href="mailto:${esc(C.email)}">${esc(C.email)}</a></p>`,C.phone&&`<p>☎ ${esc(C.phone)}</p>`,C.address&&`<p>📍 <span style="white-space:pre-line">${esc(C.address)}</span></p>`,socials()].filter(Boolean).join('')}

/* ---------- lightbox ---------- */
let GL=[],li=0,lt=null;
function lb(i){li=i;show()}
function lbOne(u,c){GL=[{image:u,caption:c}];li=0;show()}
function lbHome(i){GL=GALLERY.filter(g=>g.category=='ডেপুটেশন').slice(0,4).concat(GALLERY.filter(g=>g.category=='কর্মসূচি').slice(0,4));li=i;show()}
function show(){const g=GL[li];$('#lbi').src=g.image;$('#lbd').href=g.image;$('#lbc').textContent=g.caption||'';$('#lb').classList.add('on');$('#lp').style.display=$('#ln').style.display=GL.length>1?'block':'none'}
$('#lp').onclick=e=>{e.stopPropagation();li=(li-1+GL.length)%GL.length;show()};$('#ln').onclick=e=>{e.stopPropagation();li=(li+1)%GL.length;show()};
$('#lb').onclick=()=>$('#lb').classList.remove('on');$('#lbd').onclick=e=>e.stopPropagation();$('#lx').onclick=()=>$('#lb').classList.remove('on');
addEventListener('keydown',e=>{if(!$('#lb').classList.contains('on'))return;if(e.key=='Escape')$('#lb').classList.remove('on');if(e.key=='ArrowRight')$('#ln').click();if(e.key=='ArrowLeft')$('#lp').click()});

/* ---------- animation ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);const n=e.target.querySelector('[data-n]');if(n)count(n)}}),{threshold:.12});
function count(el){const t=el.dataset.n,sfx=t.replace(/[০-৯]/g,''),num=+t.replace(/[০-৯]/g,d=>'০১২৩৪৫৬৭৮৯'.indexOf(d)).replace(/\D/g,'')||0;const num2=+[...t].map(d=>'০১২৩৪৫৬৭৮৯'.indexOf(d)).filter(x=>x>=0).join('');let s=null;const f=ts=>{s??=ts;const p=Math.min((ts-s)/1200,1);el.textContent=bn(Math.round(num2*p));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function observe(){A('.rv').forEach(x=>io.observe(x))}

/* ---------- router ---------- */
function route(){const [p,a]=(location.hash.slice(1)||'home').split('/');const fn=P[p]||P.home;GL=GALLERY;
 $('#app').innerHTML=fn(a);navActive(p,a);navCloseAll();scrollTo(0,0);observe();
 if(p=='gallery')GL=(a&&decodeURIComponent(a)!='সব')?GALLERY.filter(g=>g.category==decodeURIComponent(a)):GALLERY}
function chrome(){$('#topl').innerHTML=[C.phone&&'☎ '+esc(C.phone),C.email&&`✉ <a href="mailto:${esc(C.email)}">${esc(C.email)}</a>`].filter(Boolean).join(' &nbsp; ')+socials().replace('class="socs"','class="socs socs-top"')||'সচেতনতা • ঐক্য • তথ্যপ্রমাণ • প্রতিনিধিত্ব • উন্নয়ন';
 $('#ft2').innerHTML=contactBlock()||'<span style="color:#cdb59d">কার্যালয়ের তথ্য শীঘ্রই প্রকাশিত হবে।</span>';$('#yr').textContent=bn(new Date().getFullYear());
}
/* ---------- মেনু: ড্রপডাউন (হোভার + ক্লিক + কিবোর্ড) ---------- */
const NI=A('#nv .ni').filter(i=>i.querySelector('.dt')),mqDesk=matchMedia('(min-width:1180px)'),mqHover=matchMedia('(hover:hover)');
const hov=()=>mqDesk.matches&&mqHover.matches;
function niSet(i,o,pin){i.classList.toggle('open',o);i.querySelector('.dt').setAttribute('aria-expanded',o);i._pin=o?!!pin:false}
function niCloseAll(except){NI.forEach(i=>i!==except&&niSet(i,false))}
function navCloseAll(){niCloseAll();const n=$('#nv');if(n.classList.contains('open')){n.classList.remove('open');$('#mb').setAttribute('aria-expanded','false');$('#mb').setAttribute('aria-label','মেনু খুলুন');document.body.classList.remove('navopen')}}
function navActive(p,a){const DEF={about:'story',journal:'issues',knowledge:'faq',citizen:'join'};
 const key=(seg,sub)=>DEF[seg]?seg+'/'+((sub&&sub!='')?sub:DEF[seg]):seg;
 const cur=key(p=='event'?'events':p,DEF[p]?a:'');
 A('#nv a,.hact a').forEach(x=>{const h=x.getAttribute('href').slice(1),[s,u]=h.split('/'),on=key(s,u)==cur;
  x.classList.toggle('on',on);on?x.setAttribute('aria-current','page'):x.removeAttribute('aria-current')});
 A('#nv .ni').forEach(i=>i.querySelector('.dt')&&i.querySelector('.dt').classList.toggle('on',!!i.querySelector('.dd a.on')))}
NI.forEach(i=>{const b=i.querySelector('.dt'),L=()=>A('#'+i.querySelector('.dd').id+' a');
 b.addEventListener('click',e=>{e.stopPropagation();const o=i.classList.contains('open');if(o&&(i._pin||!hov()))niSet(i,false);else{niCloseAll(i);niSet(i,true,true)}});
 i.addEventListener('mouseenter',()=>{if(hov()){clearTimeout(i._t);niCloseAll(i);niSet(i,true,i._pin)}});
 i.addEventListener('mouseleave',()=>{if(hov()&&!i._pin)i._t=setTimeout(()=>niSet(i,false),200)});
 i.addEventListener('focusout',e=>{if(!i.contains(e.relatedTarget)&&hov()&&!i._pin)niSet(i,false)});
 i.addEventListener('keydown',e=>{const l=L(),k=e.key,cur=l.indexOf(document.activeElement),open=i.classList.contains('open');
  if(k=='Escape'&&open){e.preventDefault();niSet(i,false);b.focus()}
  else if(k=='ArrowDown'){e.preventDefault();if(!open){niCloseAll(i);niSet(i,true,true)}l[cur<0?0:Math.min(cur+1,l.length-1)].focus()}
  else if(k=='ArrowUp'&&open){e.preventDefault();cur<=0?b.focus():l[cur-1].focus()}
  else if(k=='Home'&&cur>=0){e.preventDefault();l[0].focus()}
  else if(k=='End'&&cur>=0){e.preventDefault();l[l.length-1].focus()}
  else if(k=='Tab'&&open&&cur>=0&&!e.shiftKey&&cur==l.length-1)niSet(i,false)})});
document.addEventListener('click',e=>{if(!e.target.closest('#nv')&&!e.target.closest('#mb')){niCloseAll();if(!mqDesk.matches)navCloseAll()}});
$('#mb').onclick=()=>{const n=$('#nv'),o=n.classList.toggle('open');$('#mb').setAttribute('aria-expanded',o);$('#mb').setAttribute('aria-label',o?'মেনু বন্ধ করুন':'মেনু খুলুন');document.body.classList.toggle('navopen',o);if(!o)niCloseAll()};
addEventListener('keydown',e=>{if(e.key=='Escape'&&$('#nv').classList.contains('open')&&!NI.some(i=>i.classList.contains('open'))){navCloseAll();$('#mb').focus()}});
(mqDesk.addEventListener?mqDesk.addEventListener('change',navCloseAll):mqDesk.addListener(navCloseAll));
addEventListener('hashchange',route);chrome();route();


