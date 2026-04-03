export interface BlogStat {
  label: string;
  value: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  dateISO: string;
  author: string;
  readTime: string;
  img: string;
  content: string;
  tags: string[];
  metaDescription: string;
  stats: BlogStat[];
  body: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "health-screening-koh-samui",
    title: "Your Complete Health Screening Guide for Living or Travelling in Koh Samui",
    category: "Preventive Care",
    date: "Mar 15, 2025",
    dateISO: "2025-03-15",
    author: "Samui Home Clinic Medical Team",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&h=500&fit=crop&auto=format",
    content:
      "Koh Samui recorded some of Thailand's highest dengue activity in 2024 — yet most tourists and new expats arrive without a single tropical disease screening. Here's exactly what health checks you need, what vaccines apply to island life, and how Samui Home Clinic can help you stay protected.",
    tags: ["Health Screening", "Koh Samui", "Tropical Disease Prevention", "Expat Health Thailand"],
    metaDescription:
      "Moving to or visiting Koh Samui? Find out which health screenings, vaccines, and tropical disease checks you need — including work permit medical certificates. Walk-in or book online at Samui Home Clinic.",
    stats: [
      { value: "44,387", label: "Dengue cases in Thailand (first 7 months of 2024)" },
      { value: "Zero", label: "Endemic malaria risk on Koh Samui" },
      { value: "3–6 hrs", label: "Typical time for a full health check-up" },
      { value: "3 clinics", label: "Samui Home Clinic locations on the island" },
    ],
    body: `<p>In 2024, Thailand recorded 44,387 dengue fever cases in the first seven months alone — the highest figures in recent years. Bangkok led the count, but Koh Samui, with its year-round tropical humidity and dense tourist population, sits squarely inside the risk zone. Yet the majority of people who arrive on this island — whether for a two-week holiday, a digital nomad stint, or a full relocation — do so without a single health screening.</p>
<p>That's a preventable problem. This guide covers exactly what checks you need, what vaccines actually apply to life on Koh Samui (it's different from mainland Thailand), and how to get it done without spending a day lost in a hospital queue.</p>
<h2>The Tropical Disease Landscape on Koh Samui</h2>
<p>One thing worth knowing upfront: <strong>Koh Samui has no endemic malaria risk</strong>. Unlike Thailand's northern border regions near Myanmar and Cambodia, the island itself is malaria-free — a common misconception that causes some travellers to over-prepare for the wrong threat.</p>
<p>What you <em>do</em> need to be aware of:</p>
<ul>
  <li><strong>Dengue fever</strong> — Transmitted by <em>Aedes</em> mosquitoes, peak risk is May through October during monsoon season. All four DENV strains are present in Thailand. The Qdenga vaccine now offers up to 80% protection and is available on the island.</li>
  <li><strong>Hepatitis A &amp; B</strong> — Hepatitis A spreads via contaminated food and water (relevant for street food regulars). Hepatitis B spreads via bodily fluids — a concern for longer-term residents.</li>
  <li><strong>Leptospirosis</strong> — A bacterial infection contracted through water or soil contaminated with animal urine. Monsoon flooding and outdoor activities (hiking, kayaking, rice field walks) elevate risk.</li>
  <li><strong>Zika virus</strong> — Low incidence but present in Thailand. Critically important for pregnant women or those planning pregnancy.</li>
  <li><strong>Chikungunya</strong> — Also mosquito-borne, causes fever and persistent joint pain that can last weeks to months.</li>
  <li><strong>Typhoid fever</strong> — Food and waterborne. More relevant for long-stay residents eating street food regularly.</li>
</ul>
<h2>Essential Vaccines for Koh Samui</h2>
<p>Whether you're arriving for two weeks or two years, these are the vaccines worth discussing with a doctor before or immediately after arrival:</p>
<ul>
  <li><strong>Hepatitis A &amp; B</strong> — Standard for all travellers to Southeast Asia. Hep A vaccine provides long-lasting protection after two doses.</li>
  <li><strong>Typhoid</strong> — Provides 2–3 years of coverage. Recommended for anyone eating local food regularly.</li>
  <li><strong>Japanese Encephalitis</strong> — Recommended for stays of one month or longer, or for those spending significant time outdoors or in rural areas.</li>
  <li><strong>Rabies (pre-exposure)</strong> — Koh Samui has stray dog and monkey populations. Pre-exposure prophylaxis buys you crucial time if you're bitten while far from a clinic.</li>
  <li><strong>Influenza</strong> — Year-round flu season in the tropics. Annual vaccination is sensible for expats and frequent visitors.</li>
  <li><strong>Dengue (Qdenga)</strong> — Now available in Thailand; consult a doctor about eligibility based on prior infection history.</li>
  <li><strong>MMR and Tetanus/Tdap</strong> — Ensure your routine vaccinations are current before any international travel.</li>
</ul>
<h2>Work Permit Health Certificate Requirements</h2>
<p>If you're working in Thailand on a non-immigrant B visa, you'll need a <strong>medical certificate issued by a licensed physician registered with the Medical Council of Thailand</strong>. The certificate must confirm you are free from the following conditions:</p>
<ul>
  <li>Leprosy</li>
  <li>Tuberculosis (chest X-ray required)</li>
  <li>Drug addiction</li>
  <li>Alcoholism</li>
  <li>Elephantiasis</li>
  <li>Stage 3 syphilis</li>
</ul>
<p>This requires both a physical examination and blood tests. The process typically takes a few hours. Samui Home Clinic's doctors are licensed with the Medical Council of Thailand and can issue the required certificate — walk-in or by appointment.</p>
<h2>What a Full Health Check-Up Includes</h2>
<p>A comprehensive health screening at Samui Home Clinic covers:</p>
<ul>
  <li>Physical examination and vital signs</li>
  <li>Complete blood count (CBC)</li>
  <li>Kidney and liver function panels</li>
  <li>Thyroid function (TSH)</li>
  <li>Blood glucose and lipid profile (cholesterol)</li>
  <li>Hepatitis B &amp; C screening</li>
  <li>STI and HIV testing</li>
  <li>Urinalysis</li>
  <li>Blood pressure, BMI, ECG (on request)</li>
</ul>
<p>A full check-up typically takes 3–6 hours depending on the package. Basic packages in Thailand start around 2,500–3,900 THB; comprehensive packages with cancer markers run higher. Our team will recommend the right level of screening based on your age, history, and time on the island.</p>
<h2>When Should You Get Screened?</h2>
<table>
  <thead><tr><th>Who you are</th><th>When to screen</th><th>Priority checks</th></tr></thead>
  <tbody>
    <tr><td>New expat or long-stay visa holder</td><td>Within first 4–6 weeks of arrival</td><td>Full blood panel, hepatitis, HIV, typhoid, work permit cert</td></tr>
    <tr><td>Tourist (2–4 weeks)</td><td>Before departure from home country</td><td>Vaccines (Hep A, typhoid), dengue awareness</td></tr>
    <tr><td>Long-term resident (1+ years)</td><td>Annual check-up</td><td>Full panel including cancer markers, cardiovascular risk</td></tr>
    <tr><td>Digital nomad (3–6 months)</td><td>At arrival + mid-stay</td><td>STI screen, blood panel, dental review</td></tr>
    <tr><td>Pregnant or planning pregnancy</td><td>Immediately</td><td>Zika, rubella immunity, full TORCH screen</td></tr>
  </tbody>
</table>
<h2>Don't Wait for Symptoms</h2>
<p>The challenge with tropical diseases — and many chronic conditions — is that symptoms often appear late, or are mistaken for something milder. Dengue starts like a bad flu. Early hepatitis B is frequently asymptomatic. The value of a health check isn't just what it finds; it's the baseline it establishes so that future changes are meaningful.</p>
<p>At Samui Home Clinic, we've been providing healthcare to Koh Samui's international community for over a decade. We have three clinic locations across the island, no appointment needed for most services, and English-speaking staff who understand the specific health landscape of island life in Thailand.</p>
<p><strong>Book a health screening at any of our Koh Samui locations — walk-in welcome, or book online 24/7.</strong></p>`,
  },
  {
    id: 2,
    slug: "telemedicine-thailand-guide",
    title: "Telemedicine in Thailand: What's Legal, What Works, and When to See a Doctor in Person on Koh Samui",
    category: "Digital Health",
    date: "Mar 08, 2025",
    dateISO: "2025-03-08",
    author: "Samui Home Clinic Medical Team",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&auto=format",
    content:
      "Thailand formally expanded telemedicine services in 2025 — but digital consultations have real limits for island life. This guide breaks down what's legal, which apps expats actually use, and when a walk-in clinic visit is the smarter call.",
    tags: ["Telemedicine Thailand", "Digital Health", "Koh Samui Healthcare", "Expat Healthcare Tips"],
    metaDescription:
      "Is telemedicine legal in Thailand? Which apps do Koh Samui expats use? This guide covers what virtual consultations can and can't do — and when you need to see a doctor in person on the island.",
    stats: [
      { value: "5%", label: "Target reduction in hospital outpatient visits by Thailand's MoPH (2025)" },
      { value: "300 THB", label: "Typical telemedicine GP consultation cost (Mordee)" },
      { value: "500+", label: "Physicians available on Mordee platform" },
      { value: "24/7", label: "Walk-in availability at Samui Home Clinic" },
    ],
    body: `<p>In March 2025, Thailand's Ministry of Public Health formally expanded its tele-healthcare programme, with a target of reducing hospital outpatient visits by 5% by September 2025. It's a meaningful policy shift — and for the expats, digital nomads, and tourists living on Koh Samui, it raises a practical question: when does telemedicine actually make sense, and when is it a shortcut that could cost you?</p>
<p>Here's an honest breakdown.</p>
<h2>Is Telemedicine Legal in Thailand?</h2>
<p>Yes — but with clear boundaries. Under Thailand's 2024 Telemedicine Service Standards, virtual consultations are legal when:</p>
<ul>
  <li>The service is provided by a licensed doctor registered with the <strong>Medical Council of Thailand</strong></li>
  <li>The platform operates under a <strong>licensed clinic or hospital</strong></li>
  <li>Patients provide informed consent and their identity is verified</li>
  <li>All documentation is traceable and securely stored (in compliance with national cybersecurity laws)</li>
</ul>
<p>DIY telehealth — where someone prescribes medication via WhatsApp or an unregistered platform — is not compliant. If you're using a service, check that a licensed Thai medical institution stands behind it.</p>
<h2>Apps Expats in Thailand Actually Use</h2>
<h3>Mordee (True Digital Group)</h3>
<p>One of the most widely used among expats. Mordee connects patients with 500+ general physicians and specialists, shows which hospital each doctor is affiliated with, and clearly indicates language capability. Costs: approximately <strong>300 THB for a GP</strong>, 500–1,500 THB for specialists. Consultations typically complete within an hour, and medication can be delivered to your door.</p>
<h3>Doctor Anywhere</h3>
<p>Operates across Southeast Asia (Singapore, Malaysia, Indonesia, Vietnam, Philippines, Thailand). Lists language capabilities for each provider — useful for finding confirmed English speakers. Covers general practitioners, specialists, and psychiatric consultations.</p>
<h3>Samitivej Virtual Hospital</h3>
<p>Thailand's first virtual hospital, run by the Samitivej hospital group. Higher trust factor for patients who prefer a hospital-backed platform.</p>
<h3>Bumrungrad Anywhere</h3>
<p>Telemedicine on demand from Bumrungrad International Hospital — one of Asia's most internationally recognised private hospitals.</p>
<h2>What Telemedicine Is Actually Good For</h2>
<ul>
  <li><strong>Prescription refills</strong> — Ongoing medications (blood pressure, contraception, thyroid, etc.) without a hospital visit</li>
  <li><strong>Mild infections</strong> — Urinary tract infections, mild respiratory infections, gastroenteritis</li>
  <li><strong>Chronic disease follow-ups</strong> — Diabetes management, blood pressure monitoring between in-person visits</li>
  <li><strong>Post-procedure check-ins</strong> — Following up on wound healing or recovery without travelling to a clinic</li>
  <li><strong>Mental health consultations</strong> — Therapy and counselling sessions work well via video; increasingly popular among expats</li>
</ul>
<h2>What Telemedicine Cannot Replace — Especially on an Island</h2>
<ul>
  <li><strong>Physical examination is impossible.</strong> A doctor cannot assess a dengue rash, palpate an abdomen, check lymph nodes, or examine a wound via camera.</li>
  <li><strong>Tropical disease diagnosis is unreliable remotely.</strong> Dengue, leptospirosis, and chikungunya all require blood tests — a video call can't order or interpret them in real time.</li>
  <li><strong>Wound care and IV therapy require hands.</strong> Sutures, dressings, IV drips, and injections are physically performed procedures. There is no virtual equivalent.</li>
  <li><strong>Emergency situations need in-person response.</strong> Chest pain, severe allergic reactions, head injuries, and serious injuries require immediate in-person care.</li>
  <li><strong>Accuracy decreases without vitals.</strong> Without blood pressure readings, temperature, and pulse oximetry, a doctor is working with less than half the picture.</li>
</ul>
<h2>Cost Comparison: Telemedicine vs. Clinic vs. Hospital on Koh Samui</h2>
<table>
  <thead><tr><th>Option</th><th>Cost (approx.)</th><th>Best for</th></tr></thead>
  <tbody>
    <tr><td>Telemedicine app (GP)</td><td>300–500 THB</td><td>Prescription refills, mild symptoms, follow-ups</td></tr>
    <tr><td>Telemedicine app (specialist)</td><td>500–1,500 THB</td><td>Ongoing specialist care, mental health</td></tr>
    <tr><td>Walk-in clinic (e.g. Samui Home Clinic)</td><td>Comparable to telemedicine GP</td><td>Anything requiring examination, tests, IV, wound care</td></tr>
    <tr><td>Private hospital</td><td>1,500+ THB</td><td>Complex procedures, emergency, imaging</td></tr>
  </tbody>
</table>
<h2>Samui Home Clinic's Hybrid Approach</h2>
<p>At Samui Home Clinic, we support the growth of digital health — and we also see, daily, the cases that telemedicine missed. Our home visit and hotel house call service was designed precisely to bridge this gap: for patients who can't get to a clinic, we come to you. For everything else, our three island locations are open with no appointment needed.</p>
<p>If you've had a telemedicine consultation and your symptoms aren't improving, or if you're dealing with anything involving a physical examination, a blood test, an IV drip, wound care, or a prescription that requires assessment — walk in, call ahead, or book online.</p>
<p><strong>Telemedicine is a tool, not a replacement. Know when to use it, and know where to go when you need more.</strong></p>`,
  },
  {
    id: 3,
    slug: "medical-wellness-koh-samui",
    title: "Beyond the Retreat: Why Medical Wellness in Koh Samui Starts at Your Clinic, Not Your Spa",
    category: "Wellness",
    date: "Feb 22, 2025",
    dateISO: "2025-02-22",
    author: "Samui Home Clinic Medical Team",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop&auto=format",
    content:
      "Koh Samui's wellness retreats are world-class — but a 7-day detox without baseline blood work or doctor oversight is a gamble. Here's how clinic-based medical wellness complements (not competes with) the island's retreat culture.",
    tags: ["Wellness Koh Samui", "IV Drip Therapy", "Medical Wellness Thailand", "Holistic Health Samui"],
    metaDescription:
      "Koh Samui is a world-class wellness destination — but retreats without clinical oversight carry real risks. Learn how IV drips, health checks, and medical wellness at Samui Home Clinic make every retreat more effective and safer.",
    stats: [
      { value: "41%", label: "More per trip spent by international wellness tourists vs. typical travellers" },
      { value: "2025", label: "Year Kamalaya launched its dedicated neuro-cognitive wellness facility" },
      { value: "4", label: "IV drip formulations most requested at Samui Home Clinic" },
      { value: "3-step", label: "Medical wellness framework: baseline, support, measure" },
    ],
    body: `<p>Koh Samui is Thailand's second-most visited island, and wellness tourism is one of the primary reasons people come. International wellness tourists spend, on average, <strong>41% more per trip</strong> than typical international travellers. The island has earned that reputation: Kamalaya launched a dedicated neuro-cognitive wellness facility in 2025, Absolute Sanctuary was named Best Global Yoga Retreat at the 2026 Global Spa Awards, and world-class detox programmes, yoga retreats, and holistic sanctuaries have made Samui a genuine wellness destination.</p>
<p>But there's a meaningful distinction between wellness tourism and medical wellness — and the line matters more than most retreat brochures will tell you.</p>
<h2>The Difference Between Wellness Tourism and Medical Wellness</h2>
<p><strong>Wellness tourism</strong> is choice-driven. It centres on rejuvenation, prevention, and experience. A detox retreat, a yoga immersion, a spa programme — these are about feeling better through lifestyle, environment, and practice. The destination itself is part of the therapy.</p>
<p><strong>Medical wellness</strong> is evidence-based. It uses clinical tools — blood panels, physician consultations, IV nutrition therapy, diagnostic imaging, dermatological assessment — to measure your actual physiological state and intervene with precision.</p>
<p>Neither replaces the other. But in 2025 the most effective wellness outcomes on Koh Samui are happening where both overlap: when a seven-day retreat is preceded by a baseline blood panel, or when an IV drip vitamin infusion is administered by a physician who reviewed your labs, not a wellness coordinator who asked how you're feeling.</p>
<h2>The Risks of Retreat-Only Wellness</h2>
<ul>
  <li><strong>Extended fasting or juice cleanses</strong> can cause dangerous electrolyte imbalances in people with underlying kidney or thyroid conditions they don't know they have.</li>
  <li><strong>Herbal supplement protocols</strong> used in some retreat programmes can interact with prescription medications — anticoagulants, thyroid drugs, antidepressants.</li>
  <li><strong>High-intensity fitness programmes</strong> at altitude or heat (even tropical heat) carry cardiovascular risk that a resting ECG would flag.</li>
  <li><strong>Fasting for weight loss</strong> without blood glucose monitoring is a genuine risk for those with pre-diabetic conditions.</li>
</ul>
<p>None of this means retreat-based wellness is dangerous. It means that a 15-minute GP consultation and a basic blood panel beforehand can make it dramatically safer — and more targeted.</p>
<h2>What Clinic-Based Wellness Looks Like at Samui Home Clinic</h2>
<h3>IV Drip Therapy</h3>
<p>One of our most requested services, and one where we see a meaningful difference between medical and non-medical delivery. Every IV drip at Samui Home Clinic begins with a physician consultation. We review your health history, current medications, and goals before selecting and customising your infusion. Our most common formulations include:</p>
<ul>
  <li><strong>Immune boost</strong> — High-dose Vitamin C, zinc, B-complex for immune resilience</li>
  <li><strong>Energy and recovery</strong> — B12, magnesium, amino acids for fatigue, jet lag, post-travel recovery</li>
  <li><strong>Skin brightening</strong> — Glutathione-based formulations popular among both locals and international visitors</li>
  <li><strong>Hangover and rehydration</strong> — Electrolyte and anti-nausea support after high-activity nights</li>
</ul>
<p>The difference between a clinic-administered drip and a hotel spa drip isn't just about sterility — it's about knowing your baseline before putting anything in your bloodstream.</p>
<h3>Preventive Health Checks</h3>
<p>We offer health screening packages that include cancer markers (AFP, CEA, PSA), cardiovascular risk panels, full metabolic panels, and hormone profiles. For expats and long-stay visitors, an annual check is the single highest-value wellness investment you can make in Thailand.</p>
<h3>Dermatology and Skin Centre</h3>
<p>The tropical climate of Koh Samui — intense UV exposure, heat, humidity, salt water, and chlorine — is uniquely hard on skin. Our skin centre handles acne treatment, pigmentation reduction, anti-aging procedures, and skin cancer screening (frequently overlooked by outdoor-active expats). Medical-grade technology, physician-supervised treatment.</p>
<h2>Who Benefits Most from Clinic-Based Wellness</h2>
<ul>
  <li><strong>Digital nomads on quarterly resets</strong> — IV drip, blood panel, prescription refills, skin check. A half-day investment that covers your bases before you move on.</li>
  <li><strong>Long-stay retreat guests</strong> — Pre-retreat health screening to identify contraindications; post-retreat check to measure outcomes.</li>
  <li><strong>Long-term expats</strong> — Annual preventive check with cancer markers, cardiovascular risk, and hormone panels.</li>
  <li><strong>Post-illness recovery</strong> — Dengue, gastroenteritis, or respiratory illness recovery often benefits from IV rehydration and nutritional support.</li>
</ul>
<h2>A Simple 3-Step Wellness Framework</h2>
<ol>
  <li><strong>Baseline first.</strong> Before any significant wellness programme (retreat, cleanse, fasting, new supplement protocol), get a blood panel. Know your starting point.</li>
  <li><strong>Clinical support during.</strong> If your programme is longer than 3–4 days or involves significant dietary restriction, schedule a mid-point check-in — IV support, symptom review.</li>
  <li><strong>Measure the outcome.</strong> A post-programme check (2–4 weeks later) tells you whether what you did actually moved the markers you care about.</li>
</ol>
<p>Koh Samui is one of the best places in the world to prioritise your health. The retreat culture here is real, the natural environment is restorative, and the cost of quality healthcare is a fraction of what you'd pay in Europe or North America. Make the most of all of it — starting with a medical foundation that makes every wellness investment more effective.</p>
<p><strong>Book a wellness consultation, IV drip, or preventive health check at any Samui Home Clinic location — walk-in welcome, or book online 24/7.</strong></p>`,
  },
  {
    id: 4,
    slug: "expat-mental-health-koh-samui",
    title: "Expat Mental Health on Koh Samui: What Nobody Talks About (And Where to Find Support)",
    category: "Mental Health",
    date: "Feb 10, 2025",
    dateISO: "2025-02-10",
    author: "Samui Home Clinic Medical Team",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&h=500&fit=crop&auto=format",
    content:
      "41% of digital nomads experience significant loneliness within their first few years abroad. On a small island like Koh Samui, expat mental health has unique pressures — and unique gaps in support. Here's an honest guide to what's available and how to build resilience before you need it.",
    tags: ["Mental Health Thailand", "Expat Wellbeing Koh Samui", "Digital Nomad Burnout", "Mental Health Support Thailand"],
    metaDescription:
      "Expat mental health on Koh Samui is rarely talked about. This honest guide covers the hidden pressures of island life, what support is actually available, crisis resources, and when to see a doctor.",
    stats: [
      { value: "41%", label: "Digital nomads who experience significant loneliness within 6 months–5 years" },
      { value: "02-113-6789", label: "Samaritans of Thailand crisis line (press 2 for English, 24/7, free)" },
      { value: "~฿3,000", label: "Typical online therapy session cost in Thailand" },
      { value: "3", label: "Samui Home Clinic locations — walk-in, no appointment needed" },
    ],
    body: `<p>Research into digital nomad wellbeing finds that 41% experience significant loneliness after six months to five years on the road. That statistic is notable on its own — but it sits differently when you're living on an island.</p>
<p>Koh Samui has a lot going for it: year-round warmth, natural beauty, a thriving international community, and world-class healthcare and wellness infrastructure. But it's also an island with a relatively small expat population, a transient tourist cycle that constantly refreshes your social circle back to zero, a significant language barrier, and a host culture that rarely discusses mental health at all. For the growing number of people who call Koh Samui home — whether for months or years — the emotional landscape is something worth understanding before it becomes a problem.</p>
<h2>The Hidden Pressures of Island Expat Life</h2>
<p>People who've written about expat experience in Thailand — in forums, blogs, and academic research — describe a consistent pattern that rarely shows up in the Instagram version of island life:</p>
<p><strong>Identity erosion.</strong> "In your home country you played many roles. In Thailand, you become 'the foreigner' first." The richness of your professional identity, your social roles, your history — all of it compresses into a single label when you relocate. The adjustment can be disorienting in ways that don't feel like "mental health" until they've been building for months.</p>
<p><strong>Routine collapse.</strong> The absence of a commute, office hours, and social obligation sounds like freedom until it isn't. Without structure, days blur. Sleep shifts. Energy patterns destabilise. What begins as decompression can tip, gradually, into low-grade depression.</p>
<p><strong>Transient communities.</strong> Island expat life is particularly vulnerable to social churn. The people you meet in January are often gone by April. Building deep, lasting connections takes longer when the community itself keeps refreshing. Loneliness can coexist with a very active social calendar.</p>
<p><strong>Alcohol as a coping mechanism.</strong> Koh Samui's nightlife culture and the low cost of alcohol make it an easy reach when you're stressed, bored, or lonely. The problem is that alcohol is a depressant — and patterns that feel like relaxation can quietly worsen anxiety and mood over time.</p>
<p><strong>Language isolation.</strong> Most expats on Koh Samui don't speak Thai. When every routine transaction — at the bank, the pharmacy, the landlord — takes significantly longer and involves more friction than it would at home, the cognitive load accumulates.</p>
<h2>Why Thailand's Mental Health Stigma Makes This Harder</h2>
<p>Thailand has a significant cultural stigma around mental health. Mental illness is widely regarded as a "minor personal problem" — a matter of character or willpower, not medicine. It is rarely discussed openly and is frequently associated with weakness or family shame.</p>
<p>For expats in relationships with Thai nationals, or those integrated into Thai social networks, this stigma becomes a direct barrier. Seeking therapy can be perceived as reflecting on a partner's inability to provide support, or as bringing shame to the household. The result is that many people who would seek help at home don't seek it here.</p>
<p>It's worth naming this clearly, because understanding the cultural context is the first step to not being silently shaped by it.</p>
<h2>What's Actually Available on Koh Samui</h2>
<p>Let's be honest: the island's mental health infrastructure for English speakers is limited compared to Bangkok. But there are options.</p>
<h3>Online Therapy (Most Accessible Option)</h3>
<p>For Koh Samui residents, teletherapy is the most practical starting point. Platforms like Doctor Anywhere and Psychological Services International (PSI) — which has served Bangkok's expat community since 2001 — offer licensed therapists and psychologists with online sessions available throughout Thailand. Costs typically run <strong>2,500–3,745 THB per session</strong> (approximately $70–105 USD), or from $60/session through some international platforms.</p>
<h3>Retreat-Based Mental Wellness</h3>
<p>Kamalaya Wellness Sanctuary runs a Balance &amp; Revitalise programme specifically targeting stress and burnout, as well as emotional wellness retreats for life transitions. Absolute Sanctuary offers anti-stress programmes. These can be valuable for acute periods of difficulty, but they're not a substitute for ongoing therapeutic support.</p>
<h3>Crisis Support</h3>
<p><strong>Samaritans of Thailand: 02-113-6789 (press 2 for English)</strong> — free, confidential, 24 hours. If you're in acute distress, this is where to start.</p>
<h3>Samui Home Clinic</h3>
<p>We are not a mental health clinic, and we want to be clear about that. But we are an accessible, English-speaking, non-judgmental first point of contact. Our doctors can conduct an initial assessment, distinguish between situational stress and clinical anxiety or depression, discuss whether medication may be indicated, and provide referrals to qualified mental health professionals. Many people find the first conversation the hardest — we can be that first conversation.</p>
<h2>Strategies That Actually Work for Island Expats</h2>
<ul>
  <li><strong>Build anchor routines.</strong> A consistent wake time, a fixed weekly commitment (a class, a regular café, a volunteer slot) gives days predictability. Structure is not a constraint on island freedom — it's the foundation that makes freedom sustainable.</li>
  <li><strong>Pursue intentional community.</strong> Meetup.com, co-working spaces, sports leagues, language exchanges — any activity that puts you in repeated contact with the same people over time. Depth of connection requires repetition, not just proximity.</li>
  <li><strong>Learn some Thai.</strong> Even basic functional Thai — ordering food, greeting neighbours, simple transactions — measurably reduces the outsider feeling that contributes to isolation. It also opens up the warmth that Thai culture genuinely offers when the language barrier drops.</li>
  <li><strong>Treat movement as non-negotiable.</strong> Regular physical activity is one of the most evidence-backed interventions for anxiety and depression available. Koh Samui has beaches, gyms, yoga studios, and hiking. Use them deliberately, not recreationally.</li>
  <li><strong>Be honest about alcohol.</strong> If your drinking has increased since arriving in Thailand, pay attention to that. It's a pattern that's easy to normalise in a beach bar culture and genuinely hard to reverse once it becomes habitual.</li>
</ul>
<h2>When to Seek Professional Help</h2>
<p>There's a difference between the normal difficulty of relocation and clinical anxiety or depression that warrants medical support. Consider speaking to a doctor if:</p>
<ul>
  <li>Low mood, hopelessness, or withdrawal from activities has persisted for more than two weeks</li>
  <li>You're experiencing sleep disruption (too much or too little) that isn't situational</li>
  <li>You're using alcohol, cannabis, or other substances regularly to manage your emotional state</li>
  <li>You're experiencing physical symptoms — headaches, fatigue, chest tightness, digestive issues — without a clear physical cause (chronic stress frequently presents somatically)</li>
  <li>You're having thoughts of self-harm</li>
</ul>
<p>These are not signs of weakness. They're data points that something needs attention.</p>
<p>You don't have to have it all figured out to walk through a door. Samui Home Clinic has English-speaking doctors who understand expat life on this island, and who will listen without judgement. Whether you need a referral, a first conversation, or support navigating what resources are available — we're here.</p>
<p><strong>Walk in to any of our three Koh Samui locations, or book an appointment online 24/7. You don't need to wait until it's a crisis.</strong></p>
<hr />
<p><em>In an emergency or immediate crisis, call Samaritans of Thailand: 02-113-6789 (press 2 for English). Free and confidential, 24 hours.</em></p>`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}
