// Prototype content. Everything here is placeholder copy to be replaced
// with Salescap Media's real services, work, prices and articles.

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  included: string[];
  outcomes: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Content calendars, community management and growth on Facebook, Instagram and TikTok.",
    intro:
      "We plan, create and manage your social presence so every post has a job: build trust, start conversations, and move followers toward a purchase.",
    included: [
      "Monthly content strategy and calendar",
      "Reels, carousels and static posts",
      "Bangla and English copywriting",
      "Community and inbox management",
      "Monthly analytics report",
      "Influencer coordination",
    ],
    outcomes: [
      { value: "3x", label: "Typical engagement lift" },
      { value: "30", label: "Posts per month" },
      { value: "24h", label: "Inbox response time" },
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "Facebook, Instagram, TikTok and LinkedIn. We recommend focusing on the two where your buyers spend time." },
      { q: "Do you create the content too?", a: "Yes. Design, copy and short-form video are produced in-house." },
    ],
  },
  {
    slug: "meta-ads",
    title: "Facebook & Instagram Ads",
    short: "Full-funnel Meta campaigns built around cost per sale, not likes.",
    intro:
      "We structure Meta campaigns around your sales numbers, test creatives every week, and set up tracking so you know which taka produced which order.",
    included: [
      "Account audit and restructure",
      "Pixel and Conversions API setup",
      "Weekly creative testing",
      "Retargeting and lookalike audiences",
      "Messenger and WhatsApp lead campaigns",
      "Weekly performance check-ins",
    ],
    outcomes: [
      { value: "4.2x", label: "Average ROAS target" },
      { value: "-35%", label: "Typical cost per lead drop" },
      { value: "8+", label: "Creatives tested monthly" },
    ],
    faqs: [
      { q: "Is ad spend included?", a: "No. Ad spend is paid directly to Meta from your account. Our fee covers strategy, creative and management." },
      { q: "What budget do I need?", a: "We suggest at least ৳30,000/month in ad spend to get meaningful data." },
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    short: "Search, Performance Max and YouTube campaigns that capture buyers with intent.",
    intro: "Reach people at the exact moment they search for what you sell, with tight keyword control and clean conversion tracking.",
    included: ["Keyword research", "Search and Performance Max campaigns", "YouTube video ads", "GA4 and conversion tracking", "Landing page recommendations", "Monthly reporting"],
    outcomes: [
      { value: "2x", label: "Typical conversion rate lift" },
      { value: "100%", label: "Tracked conversions" },
      { value: "7d", label: "To first launch" },
    ],
    faqs: [{ q: "Search or Meta first?", a: "If people already search for your product, start with Google. If you create demand, start with Meta." }],
  },
  {
    slug: "seo",
    title: "SEO",
    short: "Technical fixes, local SEO and content that ranks and keeps bringing traffic.",
    intro: "Organic traffic compounds. We fix the technical foundations, then publish content that answers what your customers search for.",
    included: ["Technical SEO audit", "Keyword and topic research", "On-page optimization", "Google Business Profile", "4–8 articles per month", "Backlink outreach"],
    outcomes: [
      { value: "6mo", label: "Recommended runway" },
      { value: "+150%", label: "Typical organic traffic" },
      { value: "Top 3", label: "Target local rankings" },
    ],
    faqs: [{ q: "How long does SEO take?", a: "Expect early movement in 2–3 months and meaningful traffic in 6 months." }],
  },
  {
    slug: "content-video",
    title: "Content & Video Production",
    short: "Short-form video, product shoots and motion graphics made for social.",
    intro: "Scroll-stopping creative is the biggest lever in paid and organic social. We script, shoot and edit content built for performance.",
    included: ["Scriptwriting and storyboards", "Product and lifestyle shoots", "Reels and TikTok edits", "Motion graphics", "UGC-style ads", "Monthly content batches"],
    outcomes: [
      { value: "12+", label: "Videos per batch" },
      { value: "48h", label: "Edit turnaround" },
      { value: "9:16", label: "Mobile-first formats" },
    ],
    faqs: [{ q: "Do you shoot on location?", a: "Yes, in Dhaka and nearby. We also have a small in-house studio for product shoots." }],
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    short: "Logos, brand identity and design systems that look consistent everywhere.",
    intro: "A clear, consistent brand makes every ad and post work harder. We build identities that are simple to use day to day.",
    included: ["Logo and identity", "Colour and type system", "Brand guidelines", "Social media templates", "Packaging and print", "Pitch decks"],
    outcomes: [
      { value: "3", label: "Initial concepts" },
      { value: "4wk", label: "Typical timeline" },
      { value: "1", label: "Guideline document" },
    ],
    faqs: [{ q: "Can you refresh an existing brand?", a: "Yes. Many projects are refreshes rather than full rebrands." }],
  },
  {
    slug: "web-development",
    title: "Website Development",
    short: "Fast websites and landing pages built to convert visitors into enquiries.",
    intro: "Your website is where ads and content send people. We build fast, mobile-first sites with clear calls to action and proper tracking.",
    included: ["UX and wireframes", "Next.js or WordPress builds", "Landing pages for campaigns", "Shopify stores", "Speed and SEO setup", "Maintenance plans"],
    outcomes: [
      { value: "<2s", label: "Target load time" },
      { value: "95+", label: "Lighthouse score target" },
      { value: "100%", label: "Mobile responsive" },
    ],
    faqs: [{ q: "Will I be able to edit the site?", a: "Yes. We set up an easy editor and train your team." }],
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    short: "Campaigns, forms and follow-up flows that fill your sales pipeline.",
    intro: "We connect ads, landing pages, WhatsApp and your CRM so leads are captured, qualified and followed up quickly.",
    included: ["Lead magnet and offer design", "Lead form campaigns", "WhatsApp and Messenger automation", "CRM integration", "Lead qualification scripts", "Weekly lead quality review"],
    outcomes: [
      { value: "-40%", label: "Typical cost per lead" },
      { value: "5min", label: "Target response time" },
      { value: "100%", label: "Leads tracked to source" },
    ],
    faqs: [{ q: "Which industries does this suit?", a: "Real estate, education, healthcare, finance and any business with a sales team." }],
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  metric: string;
  metricLabel: string;
  summary: string;
  services: string[];
  challenge: string;
  approach: string[];
  results: { value: string; label: string }[];
  color: string;
};

// Sample case studies for layout only. Replace with real client work.
export const caseStudies: CaseStudy[] = [
  {
    slug: "fashion-brand-scale",
    client: "Sample Fashion Brand",
    industry: "E-commerce",
    metric: "4.1x",
    metricLabel: "ROAS",
    summary: "Scaling a local clothing label from ad-hoc boosts to a profitable always-on funnel.",
    services: ["Meta Ads", "Content & Video"],
    challenge: "Sales depended on boosted posts with no tracking, so the brand couldn't tell which spend was profitable.",
    approach: ["Installed Pixel + Conversions API", "Rebuilt the account into prospecting and retargeting", "Shot 20 UGC-style videos per month", "Weekly creative testing"],
    results: [
      { value: "4.1x", label: "ROAS" },
      { value: "+210%", label: "Monthly orders" },
      { value: "-38%", label: "Cost per purchase" },
    ],
    color: "#2e8b57",
  },
  {
    slug: "real-estate-leads",
    client: "Sample Real Estate Developer",
    industry: "Real Estate",
    metric: "-45%",
    metricLabel: "Cost per lead",
    summary: "Qualified apartment buyer leads at almost half the previous cost.",
    services: ["Lead Generation", "Google Ads"],
    challenge: "High lead volume but poor quality. The sales team was wasting time on unqualified enquiries.",
    approach: ["Added qualifying questions to lead forms", "WhatsApp auto-reply with project brochure", "Search campaigns for project-name keywords", "Weekly feedback loop with sales"],
    results: [
      { value: "-45%", label: "Cost per lead" },
      { value: "2.3x", label: "Site visits booked" },
      { value: "5min", label: "Avg. response time" },
    ],
    color: "#b8860b",
  },
  {
    slug: "clinic-local-seo",
    client: "Sample Healthcare Clinic",
    industry: "Healthcare",
    metric: "+180%",
    metricLabel: "Organic traffic",
    summary: "From invisible to top-3 local rankings for key treatments in Dhaka.",
    services: ["SEO", "Website Development"],
    challenge: "A slow, outdated website and no Google Business Profile meant patients found competitors first.",
    approach: ["Rebuilt the site in Next.js", "Created treatment pages for each service", "Optimised Google Business Profile", "Published two articles per week"],
    results: [
      { value: "+180%", label: "Organic traffic" },
      { value: "Top 3", label: "Local rankings" },
      { value: "1.4s", label: "Page load time" },
    ],
    color: "#3f7d5a",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  body: { heading: string; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "facebook-ads-budget-bangladesh",
    title: "How Much Should a Bangladeshi Business Spend on Facebook Ads?",
    excerpt: "A practical way to set your first Meta ads budget without wasting money on boosts.",
    category: "Paid Ads",
    date: "2026-11-05",
    readTime: 6,
    author: "Salescap Team",
    body: [
      { heading: "Start from your numbers", text: "Work backwards from your average order value and margin. If you earn ৳500 profit per order, you can afford to pay up to that to acquire a customer, and less if you want profit on the first sale." },
      { heading: "Give the algorithm enough data", text: "Meta needs roughly 50 conversions a week per ad set to optimise well. Budget so at least one ad set can reach that." },
      { heading: "Stop boosting posts", text: "Boosts optimise for engagement, not sales. Use proper conversion campaigns with the Pixel and Conversions API installed." },
    ],
  },
  {
    slug: "whatsapp-for-sales",
    title: "Using WhatsApp to Close More Sales",
    excerpt: "Quick replies, catalogs and click-to-WhatsApp ads: a simple playbook.",
    category: "Lead Generation",
    date: "2026-10-28",
    readTime: 5,
    author: "Salescap Team",
    body: [
      { heading: "Speed wins", text: "Leads contacted within five minutes are far more likely to convert. Set up quick replies and a greeting message." },
      { heading: "Use the catalog", text: "WhatsApp Business catalogs let customers browse without leaving the chat." },
      { heading: "Click-to-WhatsApp ads", text: "Send ad traffic straight into a conversation instead of a form when your product needs explanation." },
    ],
  },
  {
    slug: "local-seo-dhaka",
    title: "Local SEO Checklist for Dhaka Businesses",
    excerpt: "Ten things to fix this month so nearby customers find you on Google.",
    category: "SEO",
    date: "2026-10-15",
    readTime: 8,
    author: "Salescap Team",
    body: [
      { heading: "Claim your Google Business Profile", text: "Fill in every field, choose accurate categories, and add real photos." },
      { heading: "Collect reviews", text: "Ask happy customers for reviews and reply to every one, good or bad." },
      { heading: "Create location pages", text: "If you serve multiple areas, create a useful page for each one." },
    ],
  },
  {
    slug: "reels-that-sell",
    title: "Reels That Sell: A Simple Script Formula",
    excerpt: "Hook, problem, proof, offer. How to script short videos that drive orders.",
    category: "Content",
    date: "2026-10-02",
    readTime: 4,
    author: "Salescap Team",
    body: [
      { heading: "The first second", text: "Open with movement or a bold claim. You have under two seconds before people scroll." },
      { heading: "Show the product working", text: "Demonstrations beat descriptions. Show the before and after." },
      { heading: "End with one clear action", text: "Tell viewers exactly what to do next: order, message, or visit." },
    ],
  },
  {
    slug: "website-speed-matters",
    title: "Why Your Website Speed Is Costing You Sales",
    excerpt: "Most visitors are on mobile data. Every second of load time loses customers.",
    category: "Web",
    date: "2026-09-20",
    readTime: 5,
    author: "Salescap Team",
    body: [
      { heading: "Mobile first", text: "Most traffic in Bangladesh is mobile. Test your site on a mid-range phone over 4G." },
      { heading: "Images are usually the culprit", text: "Serve modern formats and correctly sized images." },
      { heading: "Measure it", text: "Use PageSpeed Insights and aim for a Largest Contentful Paint under 2.5 seconds." },
    ],
  },
  {
    slug: "branding-small-business",
    title: "Does a Small Business Really Need Branding?",
    excerpt: "Yes, but probably not the expensive kind. Here's what actually matters.",
    category: "Branding",
    date: "2026-09-08",
    readTime: 4,
    author: "Salescap Team",
    body: [
      { heading: "Consistency over perfection", text: "Using the same colours, fonts and tone everywhere builds recognition faster than a perfect logo." },
      { heading: "Start with templates", text: "A small set of social templates keeps every post on-brand." },
      { heading: "Grow into it", text: "Invest more in brand once your sales channels are working." },
    ],
  },
];

export const tiers = [
  {
    name: "Starter",
    price: "৳35,000",
    period: "/month",
    blurb: "For businesses starting with one channel.",
    features: ["1 ad platform (Meta or Google)", "8 designed creatives / month", "Social media management (1 page)", "Monthly report", "WhatsApp support"],
    popular: false,
  },
  {
    name: "Growth",
    price: "৳75,000",
    period: "/month",
    blurb: "Multi-channel growth with content production.",
    features: ["2–3 ad platforms", "16 creatives + 4 short videos / month", "Social media management (2 pages)", "Conversion tracking setup", "Bi-weekly strategy call", "Live dashboard"],
    popular: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    blurb: "A dedicated team for ambitious brands.",
    features: ["All channels incl. SEO", "Unlimited creative requests", "Dedicated account manager", "Weekly strategy call", "Landing pages & CRO", "Priority support"],
    popular: false,
  },
];

export const process = [
  { title: "Discovery", text: "A free consultation to understand your business, goals and current numbers." },
  { title: "Strategy", text: "A clear plan: channels, budget, content and the metrics we'll be judged on." },
  { title: "Launch", text: "Tracking, creatives and campaigns go live within the first two weeks." },
  { title: "Optimise", text: "Weekly testing of audiences, creatives and offers to lower costs." },
  { title: "Report", text: "Simple monthly reports tied to leads and revenue, not vanity metrics." },
];

export const faqs = [
  { q: "How much do your services cost?", a: "Retainers start at ৳35,000/month. Ad spend is separate and paid directly to the platforms. See the pricing page for details." },
  { q: "Is the consultation really free?", a: "Yes. It's a 30-minute call with no obligation. You'll leave with at least three ideas you can act on." },
  { q: "Is there a minimum contract?", a: "We recommend three months so campaigns have time to learn and improve, but you can cancel with 30 days' notice." },
  { q: "Do you work with businesses outside Dhaka?", a: "Yes. We work remotely with clients across Bangladesh and abroad." },
  { q: "How quickly can we start?", a: "Most campaigns launch within 7–14 days of the consultation." },
];

export const stats = [
  { value: 50, suffix: "+", label: "Brands served" },
  { value: 4, suffix: "x", label: "Average ROAS" },
  { value: 12, suffix: "", label: "Specialists" },
  { value: 98, suffix: "%", label: "Client retention" },
];

export const testimonials = [
  { quote: "Our cost per order dropped by a third in two months, and we finally understand where sales come from.", name: "Client name", role: "Founder, E-commerce brand" },
  { quote: "They reply on WhatsApp faster than my own team. The reporting is simple and honest.", name: "Client name", role: "Marketing Head, Real estate" },
  { quote: "The video content they produce is the best performing creative we've ever run.", name: "Client name", role: "Owner, Beauty brand" },
];

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
