হিন্দু ওবিসি ফ্রন্ট — স্ট্যাটিক ওয়েবসাইট (কোনো অ্যাডমিন প্যানেল বা সার্ভার লাগে না)

কোন ফাইলে কী বদলাবেন
  config.js   → Google Form লিংক, ফোন, WhatsApp, ইমেইল, UPI, সোশ্যাল লিংক
  content.js  → মাসিক পত্রিকার সংখ্যা, কর্মসূচি (ছবি সহ), লেখা, সংগ্রহশালা
  data.js     → ছবির ঘর (Gallery)-র ছবির তালিকা

কোন ফোল্ডারে কী রাখবেন
  journal/    → পত্রিকার PDF ও প্রচ্ছদ ছবি
  events/     → নতুন কর্মসূচির ছবি
  images/     → গ্যালারির ছবি

নতুন পত্রিকা যোগ:  journal/issue-02.pdf রেখে content.js এর JOURNAL-এ লিখুন
  {no:2, date:"2026-11-15", file:"journal/issue-02.pdf", note:"দ্বিতীয় সংখ্যা"},
নতুন গ্যালারি ছবি:  images/ এ ছবি রেখে data.js এ লিখুন
  {"image":"images/nam.jpg","caption":"ক্যাপশন","category":"ডেপুটেশন"},

গাইডলাইন ও নথি (জানুন › গাইডলাইন ও নথি)
  guides/obc-certificate, guides/deed, guides/bylaws, guides/orders → প্রতিটি বিভাগের ফোল্ডারে PDF/ছবি রাখুন
  content.js  → GUIDES তালিকায় pdf:"guides/…" এবং/অথবা img:"guides/…" লিখুন
অনুদান পাতা: config.js এ upi: "name@bank" ও bank: "…" বসালেই কপি বোতাম, পরিমাণ-বোতাম ও ইউপিআই-লিংক নিজে চালু হবে।
গুগল ট্রান্সলেট: ওপরের বারে স্বয়ংক্রিয়ভাবে আছে (ইন্টারনেট লাগে)।
