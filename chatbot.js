/* =====================================================================
   সহায়ক চ্যাট (FAQ chatbot) — কোনো সার্ভার বা এআই-কী লাগে না।
   প্রথমে সাধারণ প্রশ্নের উত্তর দেয়; সমাধান না হলে হোয়াটসঅ্যাপে পাঠায়।
   নতুন প্রশ্ন-উত্তর যোগ করতে নিচের KB তালিকায় একটি { ... }, লাইন কপি করুন:
     k = কীওয়ার্ড (বাংলা/ইংরেজি/Banglish)   a = উত্তর   l = লিংক [[লেখা,'#পাতা']]
   হোয়াটসঅ্যাপ নম্বর, ফোন, ইমেইল — config.js থেকে আসে।
   ===================================================================== */
(function(){
const C=(typeof CONFIG!=='undefined'?CONFIG:{}),F=C.forms||{};
const wnum=(C.whatsapp||'').replace(/\D/g,'');
const form=k=>F[k]||'';
const KB=[
 {id:'join',k:['যোগ দিন','যোগদান','সৈনিক','সদস্য','সদস্যপদ','নাম লেখ','নাম লিখ','মেম্বার','join','member','soldier','sainik'],
  a:()=>'হিন্দু ওবিসি সৈনিক হতে চাইলে গুগল ফর্মে নাম, ফোন, জেলা ও ব্লকের তথ্য দিন। কার্যালয় থেকে আপনার সঙ্গে যোগাযোগ করা হবে।',
  l:()=>[form('join')&&['সৈনিক হওয়ার ফর্ম',form('join')],['সৈনিকের কাজ কী','#citizen/join']].filter(Boolean)},
 {id:'unit',k:['ইউনিট','শাখা','কমিটি','সংগঠন গড়','গড়ুন','গঠন','unit','branch','committee'],
  a:()=>'নিজের গ্রাম, ওয়ার্ড বা ব্লকে ইউনিট গড়তে: ১) একটি ছোট নিষ্ঠাবান দল তৈরি করুন, ২) ইউনিট গঠনের ফর্ম পূরণ করুন, ৩) রাজ্য কার্যালয় যোগাযোগ করবে এবং কাঠামো অনুযায়ী ইউনিট নিবন্ধিত হবে।',
  l:()=>[form('unit')&&['ইউনিট গঠনের ফর্ম',form('unit')],['বিস্তারিত দেখুন','#citizen/unit']].filter(Boolean)},
 {id:'donate',k:['অনুদান','দান','ডোনেশন','চাঁদা','রসিদ','ইউপিআই','upi','donat','receipt','টাকা পাঠ','টাকা দিত'],
  a:()=>'অনুদান সম্পূর্ণ স্বেচ্ছাপ্রণোদিত এবং সচেতনতা, নথিভুক্তি, মাসিক পত্রিকা ও সমাজসেবার কাজে ব্যবহৃত হয়। শুধুমাত্র ওয়েবসাইটে প্রকাশিত অফিসিয়াল তথ্যেই দান করুন। রসিদের জন্য অনুদান ফর্ম পূরণ করুন। অন্য কারও নম্বরে টাকা পাঠানোর আগে কার্যালয়ে নিশ্চিত হয়ে নিন।',
  l:()=>[['অনুদান পাতা','#donate'],form('donation')&&['রসিদের ফর্ম',form('donation')]].filter(Boolean)},
 {id:'fee',k:['ফি লাগ','ফি আছে','কত টাকা','কত খরচ','মূল্য','fee','charge','cost','free'],
  a:()=>'সদস্য হতে বা ইউনিট গড়তে কোনো ফি বা চাঁদা লাগে কি না — এই তথ্য ওয়েবসাইটে প্রকাশিত নেই। ভুল তথ্য এড়াতে এটি কার্যালয় থেকে সরাসরি জেনে নিন।',need:true},
 {id:'cert',k:['শংসাপত্র','সার্টিফিকেট','সার্টিফিকেট','সনদ','certificate','obc','ওবিসি','জাতিগত','ক্যাস্ট'],
  a:()=>'ফ্রন্ট ওবিসি শংসাপত্র বা সংরক্ষণের সুবিধার নিশ্চয়তা দেয় না — শংসাপত্র ও সুবিধা আইন অনুযায়ী সংশ্লিষ্ট সরকারি কর্তৃপক্ষই স্থির করে। আবেদনের পদ্ধতি ও কাগজপত্র বুঝতে "গাইডলাইন ও নথি" পাতার ওবিসি শংসাপত্র গাইডলাইন দেখুন।',
  l:()=>[['ওবিসি শংসাপত্র গাইডলাইন','#knowledge/guides'],['সাধারণ প্রশ্নোত্তর','#knowledge']]},
 {id:'deed',k:['দলিল','জমির কাগজ','deed','dolil'],
  a:()=>'দলিল জমা দেওয়া বাধ্যতামূলক নয়। কারও কাছে থাকলে সহায়ক নথি হিসেবে কীভাবে ব্যবহার করা যায়, তা "গাইডলাইন ও নথি" পাতার দলিল-সংক্রান্ত নির্দেশিকায় আছে। নির্দিষ্ট ক্ষেত্রে কী লাগবে, তা সংশ্লিষ্ট কর্তৃপক্ষের কাছে নিশ্চিত করে নিন।',
  l:()=>[['গাইডলাইন ও নথি','#knowledge/guides']]},
 {id:'bylaws',k:['বাইলজ','নিয়মাবলি','নিয়মাবলী','সংবিধান','গঠনতন্ত্র','bylaw','bilaw','constitution','rules'],
  a:()=>'ফ্রন্টের গঠন, সদস্যপদ, ইউনিট ও কাজের নিয়মাবলি "গাইডলাইন ও নথি" পাতায় বাইলজ কার্ডে PDF বা ছবি হিসেবে দেখা ও ডাউনলোড করা যাবে।',
  l:()=>[['বাইলজ দেখুন','#knowledge/guides']]},
 {id:'orders',k:['আদেশ','বিজ্ঞপ্তি','নোটিফিকেশন','অর্ডার','জিও','order','notification','notice','gazette'],
  a:()=>'বিভিন্ন সরকারি আদেশ ও বিজ্ঞপ্তির কপি "গাইডলাইন ও নথি" পাতায় PDF বা ছবি হিসেবে পাওয়া যায়। সরকারি তালিকা ও বিজ্ঞপ্তির জন্য সবসময় পশ্চিমবঙ্গ সরকারের পশ্চাৎপদ শ্রেণি কল্যাণ দপ্তরের সঙ্গে মিলিয়ে নিন।',
  l:()=>[['আদেশ ও বিজ্ঞপ্তি','#knowledge/guides'],['সংগ্রহশালা','#archive']]},
 {id:'memo',k:['স্মারকলিপি','ডেপুটেশন কীভাবে','দাবিপত্র','memorandum','memo','deputation'],
  a:()=>'স্মারকলিপি তৈরির আগে চারটি প্রশ্নের উত্তর ঠিক করুন: ১) সমস্যাটি কী? ২) কারা ক্ষতিগ্রস্ত (অনুমান নয়, নথিভুক্ত)? ৩) কী প্রতিকার চাওয়া হচ্ছে? ৪) কোন প্রমাণ আছে? বিজ্ঞপ্তি, আদেশ, সমীক্ষা বা নথি জুড়ে দিন।',
  l:()=>[['প্রশ্নোত্তর','#knowledge'],['কর্মসূচি দেখুন','#events']]},
 {id:'history',k:['ইতিহাস','নথিভুক্ত','নথিভুক্তি','প্রমাণ','history','document'],
  a:()=>'ঐতিহাসিক নথি, সরকারি বিজ্ঞপ্তি, জনগণনার তথ্য, কমিশনের রিপোর্ট, ছবি ও মৌখিক ইতিহাস সংগ্রহ করুন। কোথায় আপনার সমাজের মানুষ থাকেন, কী পেশা, শিক্ষার স্তর এবং সরকারি প্রকল্প পেতে কী অসুবিধা — লিখে রাখুন।',
  l:()=>[['প্রশ্নোত্তর','#knowledge']]},
 {id:'journal',k:['পত্রিকা','ম্যাগাজিন','প্রবন্ধ','লেখা পাঠ','লেখা দিত','লিখতে','journal','magazine','patrika','article','issue','সংখ্যা'],
  a:()=>'আমাদের মাসিক পত্রিকা "দেশ আমার, মাটি আমার"-এর সংখ্যাগুলি PDF হিসেবে পড়া যায়। নিজের লেখা পাঠাতে চাইলে গুগল ফর্মে নাম, ফোন, লেখার শিরোনাম ও লেখা জমা দিন; প্রকাশের আগে সম্পাদকমণ্ডলী যোগাযোগ করবে। তথ্যনির্ভর, সূত্র সহ লেখা পাঠানো ভালো।',
  l:()=>[['সংখ্যাগুলি দেখুন','#journal/issues'],['লেখা পাঠান','#journal/write']]},
 {id:'about',k:['ফ্রন্ট কী','কারা','পরিচয়','সম্পর্কে','লক্ষ্য','উদ্দেশ্য','কী করেন','কাজ কী','about','who are','mission','aim'],
  a:()=>'হিন্দু ওবিসি ফ্রন্ট একটি সামাজিক মঞ্চ, যা ভারতের সংবিধানের মধ্যে থেকে হিন্দু ওবিসি ও অন্যান্য পশ্চাৎপদ সম্প্রদায়ের সচেতনতা, ঐক্য, তথ্যপ্রমাণ, কল্যাণ ও আইনসম্মত প্রতিনিধিত্বের জন্য কাজ করে।',
  l:()=>[['আমাদের সম্পর্কে','#about/story'],['লক্ষ্য ও উদ্দেশ্য','#about/vision'],['আমাদের কাজ','#about/work']]},
 {id:'rani',k:['রাসমণি','রানি','ধাম','দক্ষিণেশ্বর','rani','rashmoni','rasmoni'],
  a:()=>'লোকমাতা রানি রাসমণি জনহিতৈষণা ও সমাজসেবার প্রতীক। ২০২৬ সালের সেপ্টেম্বরে তাঁর ২৩৩তম জন্মবার্ষিকীতে ফ্রন্ট কলকাতার রবীন্দ্র সদনে সম্মেলন করেছে এবং প্রস্তাবিত রানি রাসমণি ধামের একটি মডেল সরকারের কাছে জমা দেওয়ার জন্য হস্তান্তর করা হয়েছে; প্রস্তাবটি সরকারের বিবেচনাধীন।',
  l:()=>[['লোকমাতা রানি রাসমণি','#about/rani'],['সম্মেলনের ছবি ও বিবরণ','#event/e1']]},
 {id:'events',k:['কর্মসূচি','অনুষ্ঠান','সম্মেলন','বৈঠক','ছবি','গ্যালারি','event','program','photo','gallery','meeting'],
  a:()=>'ফ্রন্টের কর্মসূচি — সম্মেলন, বিডিও অফিসে ডেপুটেশন, মন্ত্রী ও কমিশনের সঙ্গে বৈঠক, বৃক্ষরোপণ ও রাখি বন্ধন — বিবরণ ও ছবি সহ দেখা যাবে।',
  l:()=>[['কর্মসূচি ও লেখা','#events'],['ছবির ঘর','#gallery'],['সংগ্রহশালা','#archive']]},
 {id:'contact',k:['যোগাযোগ','ফোন','নম্বর','মোবাইল','ইমেইল','মেইল','ঠিকানা','অফিস','কার্যালয়','কোথায়','contact','phone','email','mail','address','office','location'],
  a:()=>['কার্যালয়ের তথ্য:',C.phone&&'☎ '+C.phone,C.email&&'✉ '+C.email,C.address&&'📍 '+C.address].filter(Boolean).join('\n'),
  l:()=>[['যোগাযোগ পাতা','#contact'],form('contact')&&['বার্তা পাঠানোর ফর্ম',form('contact')]].filter(Boolean)},
 {id:'lang',k:['ভাষা','অনুবাদ','ট্রান্সলেট','হিন্দি','ইংরেজি','english','hindi','translate','language'],
  a:()=>'সাইটের একদম ওপরের বারে "Select Language" ড্রপডাউন থেকে নিজের ভাষা বেছে নিলে পুরো সাইট সেই ভাষায় অনুবাদ হয় (গুগল অনুবাদের মাধ্যমে, স্বয়ংক্রিয়ভাবে — কিছু শব্দ ভিন্ন হতে পারে)।'},
 {id:'trust',k:['বিশ্বাস','ভুয়ো','প্রতারণা','নকল','সত্যি','fake','fraud','scam','genuine','trust'],
  a:()=>'ফ্রন্ট কখনও যাচাইহীন পরিসংখ্যান, ভুয়ো বিজ্ঞপ্তি, বিভ্রান্তিকর আইনি পরামর্শ বা ব্যক্তিগত আক্রমণ প্রকাশ করে না। টাকা পাঠানোর আগে শুধুমাত্র ওয়েবসাইটে প্রকাশিত অফিসিয়াল তথ্য ব্যবহার করুন এবং কার্যালয়ে ফোনে নিশ্চিত হয়ে নিন।',
  l:()=>[['যোগাযোগ','#contact']]}
];
const CHIPS=[['যোগ দিন / সৈনিক হোন','join'],['ইউনিট গঠন','unit'],['অনুদান','donate'],['ওবিসি শংসাপত্র','cert'],['মাসিক পত্রিকা','journal'],['যোগাযোগ ও ঠিকানা','contact'],['ফ্রন্ট সম্পর্কে','about']];
const $=s=>document.querySelector(s);
let open=false,miss=0,pending=[],log=[];
const norm=s=>String(s).toLowerCase().replace(/[?।!,.;:()"'“”]/g,' ').replace(/\s+/g,' ').trim();
function find(q){const t=norm(q);let best=null,bs=0;KB.forEach(e=>{let s=0;e.k.forEach(w=>{if(t.includes(norm(w)))s+=norm(w).length});if(s>bs){bs=s;best=e}});return bs>=3?best:null}
const waUrl=()=>{const q=pending.length?pending.join(' | '):(log.filter(x=>x.u).map(x=>x.u).join(' | ')||'');const m='নমস্কার, ওয়েবসাইটের সহায়ক চ্যাটে আমার প্রশ্নের সমাধান হয়নি।'+(q?'\nআমার প্রশ্ন: '+q:'')+'\n(www.hinduobcfront.in থেকে)';return 'https://wa.me/'+wnum+'?text='+encodeURIComponent(m)};
const root=document.createElement('div');root.id='cb';root.innerHTML=`
<button type="button" id="cb-open" class="cb-launch" aria-haspopup="dialog" aria-controls="cb-panel" aria-expanded="false"><span class="cb-ic" aria-hidden="true">💬</span><span class="cb-lb">প্রশ্ন করুন</span></button>
<div id="cb-tip" class="cb-tip" hidden><button type="button" id="cb-tipx" aria-label="বন্ধ করুন">✕</button>কিছু জানতে চান? আমাকে জিজ্ঞাসা করুন 🙏</div>
<section id="cb-panel" class="cb-panel" role="dialog" aria-label="সহায়ক চ্যাট" hidden>
 <header><span class="cb-av" aria-hidden="true">ॐ</span><div><b>ফ্রন্ট সহায়ক</b><small>সাধারণ প্রশ্নের দ্রুত উত্তর</small></div><button type="button" id="cb-close" aria-label="চ্যাট বন্ধ করুন">✕</button></header>
 <div id="cb-log" class="cb-log" role="log" aria-live="polite"></div>
 <div id="cb-chips" class="cb-chips"></div>
 <form id="cb-form" class="cb-form" autocomplete="off"><label for="cb-in" class="cb-sr">আপনার প্রশ্ন লিখুন</label><input id="cb-in" type="text" placeholder="আপনার প্রশ্ন লিখুন…" maxlength="200"><button type="submit" aria-label="পাঠান">➤</button></form>
 <p class="cb-note">এটি স্বয়ংক্রিয় সহায়ক — সাধারণ তথ্য মাত্র, আইনি পরামর্শ নয়। আপনার লেখা কোথাও জমা হয় না।</p>
</section>`;
document.body.appendChild(root);
const L=$('#cb-log');
function add(cls,node){const d=document.createElement('div');d.className='cb-m '+cls;d.appendChild(node);L.appendChild(d);L.scrollTop=L.scrollHeight;return d}
function txt(s){const p=document.createElement('div');p.className='cb-t';p.textContent=s;return p}
function bot(s,links){const w=document.createElement('div');w.appendChild(txt(s));if(links&&links.length){const r=document.createElement('div');r.className='cb-links';links.forEach(([t,h])=>{const a=document.createElement('a');a.textContent=t+' →';a.href=h;if(/^https?:/.test(h)){a.target='_blank';a.rel='noopener'}else a.addEventListener('click',()=>{if(innerWidth<700)close()});r.appendChild(a)});w.appendChild(r)}return add('bot',w)}
function user(s){log.push({u:s});add('me',txt(s))}
function feedback(){const w=document.createElement('div');w.className='cb-fb';w.innerHTML='<span>আপনার সমস্যার সমাধান হয়েছে?</span>';const y=document.createElement('button');y.type='button';y.textContent='✅ হ্যাঁ';const n=document.createElement('button');n.type='button';n.textContent='🙋 না, আরও সাহায্য চাই';
 y.onclick=()=>{w.remove();pending=[];miss=0;bot('ধন্যবাদ! 🙏 আর কিছু জানতে চাইলে নিচে লিখুন বা বিষয় বেছে নিন।')};n.onclick=()=>{w.remove();handoff('ঠিক আছে, আপনাকে সরাসরি কার্যালয়ের সঙ্গে যুক্ত করছি।')};w.append(y,n);add('fb',w)}
function handoff(msg){bot(msg||'এই প্রশ্নের উত্তর আমার কাছে নেই। কার্যালয়ের সঙ্গে সরাসরি কথা বলুন।');const w=document.createElement('div');w.className='cb-ho';
 if(wnum){const a=document.createElement('a');a.className='cb-wa';a.href=waUrl();a.target='_blank';a.rel='noopener';a.innerHTML='<span aria-hidden="true">🟢</span> হোয়াটসঅ্যাপে কার্যালয়কে জানান';w.appendChild(a)}
 if(C.phone){const a=document.createElement('a');a.className='cb-call';a.href='tel:'+C.phone.replace(/[^\d+]/g,'');a.textContent='📞 ফোন করুন: '+C.phone;w.appendChild(a)}
 if(!wnum&&!C.phone&&F.contact){const a=document.createElement('a');a.className='cb-call';a.href=F.contact;a.target='_blank';a.rel='noopener';a.textContent='✉ বার্তা পাঠান';w.appendChild(a)}
 const note=document.createElement('small');note.textContent='হোয়াটসঅ্যাপ খুললে আপনার প্রশ্ন আগে থেকেই লেখা থাকবে — শুধু "Send" চাপুন।';w.appendChild(note);add('bot',w)}
function answer(e,q){const a=typeof e.a=='function'?e.a():e.a,l=e.l?e.l():null;miss=0;bot(a,l);if(e.need){pending.push(q);handoff('এই বিষয়ে নিশ্চিত উত্তরের জন্য:')}else feedback()}
function ask(q){q=q.trim();if(!q)return;L.querySelectorAll('.cb-m.fb').forEach(x=>x.remove());user(q);
 const t=norm(q);
 if(/^(নমস্কার|নমস্তে|প্রণাম|হ্যালো|হাই|হেলো|hi|hello|hey|namaste|namaskar)\b/.test(t)&&t.length<20){bot('নমস্কার 🙏 আমি আপনাকে কীভাবে সাহায্য করতে পারি? নিচের বিষয়গুলি থেকে বেছে নিন বা প্রশ্ন লিখুন।');return}
 if(/^(ধন্যবাদ|thanks|thank you|ok|okay|ঠিক আছে)/.test(t)&&t.length<20){bot('আপনাকেও ধন্যবাদ! 🙏 জয় সনাতন।');return}
 const e=find(q);
 if(e){answer(e,q);return}
 miss++;pending.push(q);
 if(miss>=2){handoff('দুঃখিত, আমি আপনার প্রশ্নটি বুঝতে পারিনি। কার্যালয়ের সঙ্গে সরাসরি কথা বলুন:')}
 else bot('দুঃখিত, প্রশ্নটি ঠিক বুঝতে পারিনি। অন্য শব্দে লিখে দেখুন (যেমন: "সৈনিক", "অনুদান", "শংসাপত্র", "পত্রিকা", "ঠিকানা"), অথবা নিচের কোনো বিষয় বেছে নিন।')}
const CH=$('#cb-chips');CHIPS.forEach(([t,id])=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.onclick=()=>{user(t);answer(KB.find(x=>x.id==id),t)};CH.appendChild(b)});
const wb=document.createElement('button');wb.type='button';wb.className='cb-wchip';wb.textContent='🟢 সরাসরি কার্যালয়ে জানান';wb.onclick=()=>{user('সরাসরি কার্যালয়ে জানাতে চাই');handoff('ঠিক আছে — কার্যালয়ের সঙ্গে যুক্ত হন:')};CH.appendChild(wb);
$('#cb-form').addEventListener('submit',e=>{e.preventDefault();const i=$('#cb-in');const v=i.value;i.value='';ask(v)});
function openIt(){open=true;$('#cb-panel').hidden=false;$('#cb-open').setAttribute('aria-expanded','true');$('#cb-tip').hidden=true;root.classList.add('on');if(!L.children.length)bot('নমস্কার 🙏 আমি হিন্দু ওবিসি ফ্রন্টের সহায়ক। সদস্য হওয়া, ইউনিট গঠন, অনুদান, নথি ও গাইডলাইন নিয়ে সাধারণ প্রশ্নের উত্তর দিতে পারি। সমাধান না হলে কার্যালয়ের হোয়াটসঅ্যাপে যুক্ত করে দেব।');setTimeout(()=>$('#cb-in').focus(),50);try{sessionStorage.setItem('cbTip','1')}catch(e){}}
function close(){open=false;$('#cb-panel').hidden=true;$('#cb-open').setAttribute('aria-expanded','false');root.classList.remove('on');$('#cb-open').focus()}
$('#cb-open').onclick=()=>open?close():openIt();$('#cb-close').onclick=close;$('#cb-tipx').onclick=()=>{$('#cb-tip').hidden=true;try{sessionStorage.setItem('cbTip','1')}catch(e){}};
document.addEventListener('keydown',e=>{if(e.key=='Escape'&&open)close()});
window.cbOpen=openIt;
setTimeout(()=>{let s=0;try{s=sessionStorage.getItem('cbTip')}catch(e){}if(!s&&!open)$('#cb-tip').hidden=false},5000);
})();
