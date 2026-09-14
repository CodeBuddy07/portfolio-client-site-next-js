export type ProjectKind = "web" | "mobile" | "ecommerce" | "marketing";

export type Project = {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  kind: ProjectKind;
  category: string;
  year: number;
  client: string;
  industry: string;
  role: string;
  summary: string;
  challenge: string;
  built: string[];
  results: { value: string; label: string }[];
  stack: string[];
  links: { live?: string; appStore?: string; playStore?: string; github?: string };
  /** "offline" hides the live link and shows a note instead of sending a client to a broken site. */
  liveStatus: "live" | "offline";
  image: { src: string; width: number; height: number };
  featured: boolean;
  quote?: { text: string; from: string };
};

export const projects: Project[] = [
  {
    slug: "termsheetgenie",
    name: "TermSheetGenie",
    title: "TermSheetGenie — VC and investment management platform",
    tagline: "Cap tables, exit waterfalls and fund management in one SaaS instead of three spreadsheets.",
    kind: "web",
    category: "Web platform",
    year: 2026,
    client: "Nitin Mani",
    industry: "Venture capital",
    role: "Full-stack engineer",
    summary:
      "A full-stack SaaS for investors, founders and students: a multi-step investment simulator, live cap-table generation, drag-and-drop seniority ranking and dynamic exit-waterfall charts, with fund and LP management behind it.",
    challenge:
      "Early-stage investors and founders were modelling rounds in spreadsheets that were inaccurate, hard to share, and disconnected from the real term-sheet parameters. Nothing combined fund management, LP tracking, cap-table modelling and exit simulation in one place.",
    built: [
      "A three-phase simulation engine covering SAFEs, priced rounds and debt, with the cap table regenerated live from the API on every change.",
      "Five fully scoped roles — investor, entrepreneur, student, admin and fund manager — each seeing only what it should.",
      "Drag-and-drop liquidation-preference ranking feeding a dynamic exit-waterfall chart.",
      "JWT auth with 2FA and OTP email, S3 document uploads, pipeline-company tracking and breakeven analysis.",
    ],
    results: [
      { value: "5", label: "Roles with fully scoped access" },
      { value: "3-phase", label: "Simulation engine (SAFEs, priced rounds, debt)" },
      { value: "100%", label: "Live API data — no placeholder content on any screen" },
      { value: "2FA + OTP", label: "Auth, with S3 uploads and real-time notifications" },
    ],
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS S3"],
    links: { live: "https://termsheetgenie.com/" },
    liveStatus: "live",
    image: { src: "/work/termsheetgenie.jpg", width: 928, height: 1152 },
    featured: true,
    quote: {
      text: "TermSheetGenie replaced the three spreadsheets I used to manage every deal. The simulation engine alone saves me hours on every new investment round.",
      from: "General Partner, early-stage fund",
    },
  },
  {
    slug: "feni-blood-line",
    name: "Feni Blood Line",
    title: "Feni Blood Line — community blood-donor platform",
    tagline: "Verified donors, live availability and emergency requests for a district that used to rely on phone calls.",
    kind: "web",
    category: "Web platform",
    year: 2026,
    client: "Feni community",
    industry: "Healthcare / community",
    role: "Full-stack engineer",
    summary:
      "A bilingual (English / বাংলা) platform where donors register with verified profiles and mark real-time availability, hospitals post emergency requests that appear live on the homepage, and local organisations manage their members from one dashboard.",
    challenge:
      "Finding a donor in an emergency in Feni District meant dozens of phone calls with no guarantee of a blood-group match. Families relied on personal networks and Facebook posts, and lost critical time doing it.",
    built: [
      "Verified donor profiles with blood group, last-donation date and a real-time availability toggle, searchable in a public directory.",
      "An emergency-request flow for hospitals that surfaces live on the homepage, 24/7.",
      "A partner-organisation dashboard so local groups manage members and donation drives without touching the admin.",
      "Bilingual UI and a mobile-first layout, because most searches happen on a phone in a hurry.",
    ],
    results: [
      { value: "100%", label: "Verified donor profiles" },
      { value: "24/7", label: "Emergency request system, live" },
      { value: "Since 2023", label: "Serving Feni District continuously" },
      { value: "Real-time", label: "Donor availability visible to anyone searching" },
    ],
    stack: ["TypeScript", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    links: { live: "https://fenibloodline.com/" },
    liveStatus: "live",
    image: { src: "/work/feni-blood-line.webp", width: 1376, height: 768 },
    featured: true,
    quote: {
      text: "We found a matching donor within minutes of posting an emergency request. Feni Blood Line is exactly what our community needed — fast, reliable, and built by people who care.",
      from: "Community member, Feni District",
    },
  },
  {
    slug: "mealbox",
    name: "MealBox",
    title: "MealBox — meal planning and delivery platform",
    tagline: "Chef-prepared meals, real customisation, Stripe checkout and order tracking on an architecture built to grow.",
    kind: "ecommerce",
    category: "E-commerce platform",
    year: 2025,
    client: "MealBox",
    industry: "Food delivery",
    role: "Full-stack engineer",
    summary:
      "A full-stack meal-delivery product: customers browse and filter chef-prepared meals, customise preferences, keep a persistent cart, pay through Stripe and track orders; providers manage their menu and fulfilment through role-based access.",
    challenge:
      "A delivery product has to feel effortless for customers and reliable for providers at the same time — fast browsing, real customisation, secure payment and order tracking — on an architecture that won't need a rewrite as the menu and user base grow.",
    built: [
      "Next.js + TypeScript front end on a Node.js API with JWT authentication and role-based access for providers and customers.",
      "Meal search and filtering, a persistent cart, order tracking and profile management.",
      "Stripe-powered payments with server-side verification.",
      "A clean, responsive UI with the data layer designed for the catalogue to scale.",
    ],
    results: [
      { value: "Stripe", label: "Secured payments, verified server-side" },
      { value: "JWT", label: "Role-based auth for providers and customers" },
      { value: "Live", label: "In production" },
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    links: { live: "https://mealbox-client-red.vercel.app/" },
    liveStatus: "live",
    image: { src: "/work/mealbox.webp", width: 800, height: 800 },
    featured: true,
  },
  {
    slug: "berzerker-furrey-comics",
    name: "Berzerker Furrey Comics",
    title: "Berzerker Furrey Comics — comic-book e-commerce store",
    tagline: "A full storefront for raw and graded comics: browsable collections, Stripe checkout, customer dashboard, admin inventory control.",
    kind: "ecommerce",
    category: "E-commerce platform",
    year: 2025,
    client: "Berzerker Furrey Comics",
    industry: "E-commerce",
    role: "Full-stack engineer",
    summary:
      "A Next.js storefront on a NestJS + PostgreSQL back end for a comic-book seller: collections by age and grading, secure checkout, an order dashboard for customers, and end-to-end inventory and order management for the store.",
    challenge:
      "Collectors had no dedicated, trustworthy storefront for this catalogue. The business needed discovery to be easy for customers — raw versus graded, by era, by grading company — while keeping complete control over inventory, pricing and fulfilment.",
    built: [
      "Category and grading taxonomy (raw / graded, CGC / CBCS / CBX, Golden to Modern Age) with fast filtering.",
      "Stripe checkout with transactional emails through Resend.",
      "A customer dashboard for order history and tracking, and an admin area for inventory and orders.",
      "CI/CD pipeline for deployments.",
    ],
    results: [
      { value: "Full", label: "Storefront with taxonomy-driven discovery" },
      { value: "Stripe", label: "Secure checkout and transactional email" },
      { value: "Self-serve", label: "Order management for customers and admins" },
    ],
    stack: ["Next.js", "NestJS", "Node.js", "PostgreSQL", "Stripe", "Resend", "Tailwind CSS", "CI/CD"],
    links: { live: "https://berzerkerfurreycomics.com/" },
    liveStatus: "offline",
    image: { src: "/work/berzerker-furrey-comics.webp", width: 800, height: 449 },
    featured: true,
  },
  {
    slug: "momentum-activity",
    name: "Momentum",
    title: "Momentum — a social app for real-world activities",
    tagline: "Discover, create and join local activities. On the App Store.",
    kind: "mobile",
    category: "Mobile app",
    year: 2025,
    client: "Momentum",
    industry: "Consumer / social",
    role: "Mobile + backend engineer",
    summary:
      "A cross-platform React Native app where people create, explore and join community activities — workshops, local sports, festivals — with maps, categories and a memories feed that rewards actually showing up.",
    challenge:
      "Communities are more connected online than ever and it's still hard to find something to do together offline. People needed a simple way to discover and join local activities near them.",
    built: [
      "React Native app with map-based discovery, category browsing and activity creation.",
      "A memories feed tied to attended activities, so participation is what gets rewarded.",
      "Node.js + MongoDB back end with auth, activity lifecycle and media handling.",
      "App Store release.",
    ],
    results: [
      { value: "iOS", label: "Live on the App Store" },
      { value: "Real-world", label: "Events, not just feeds" },
    ],
    stack: ["React Native", "TypeScript", "Node.js", "MongoDB"],
    links: { appStore: "https://apps.apple.com/us/app/momentum-activity/id6758025583" },
    liveStatus: "live",
    image: { src: "/work/momentum-activity.webp", width: 799, height: 800 },
    featured: true,
  },
  {
    slug: "hop-across-america",
    name: "Hop Across America",
    title: "Hop Across America — event hub and management suite",
    tagline: "One platform for a statewide multi-shop event: attendees, participating shops and logistics, across web and mobile.",
    kind: "mobile",
    category: "Event platform",
    year: 2025,
    client: "Hop Across America",
    industry: "Events",
    role: "Mobile + backend engineer",
    summary:
      "A mobile-and-web suite for a large statewide quilting event: attendees discover and follow the event, participating shops are coordinated in one place, and organisers manage logistics end to end.",
    challenge:
      "A multi-shop event spread across a whole state was being run on scattered tools and spreadsheets. It needed a single hub that worked for attendees, shops and organisers at the same time.",
    built: [
      "React Native app for attendees with event discovery, shop listings and following.",
      "Web management surface for organisers covering shops, logistics and schedule.",
      "Shared Node.js + MongoDB back end serving both.",
      "App Store release.",
    ],
    results: [
      { value: "Statewide", label: "Coverage" },
      { value: "Mobile + web", label: "One back end, two surfaces" },
      { value: "iOS", label: "Live on the App Store" },
    ],
    stack: ["React Native", "TypeScript", "Node.js", "MongoDB"],
    links: { appStore: "https://apps.apple.com/us/app/hop-across-america/id6758916033" },
    liveStatus: "live",
    image: { src: "/work/hop-across-america.webp", width: 1376, height: 768 },
    featured: false,
  },
  {
    slug: "hrlynx",
    name: "HRlynx",
    title: "HRlynx — AI HR personas for real-world guidance",
    tagline: "Practical, risk-aware HR guidance in the moment, from AI personas grounded in real HR experience.",
    kind: "mobile",
    category: "Mobile app · AI",
    year: 2025,
    client: "HRlynx",
    industry: "HR tech",
    role: "Mobile + AI integration",
    summary:
      "An iOS app built around AI-driven HR personas that give actionable, risk-aware guidance when a tricky people situation comes up — designed with HR professionals so it moves past theory.",
    challenge:
      "Most HR advice is either too theoretical or too slow to reach the person who needs it. Teams needed guidance at the moment a situation comes up, not a policy document to read later.",
    built: [
      "React Native app with persona-based conversations and structured guidance output.",
      "OpenAI integration with prompt design shaped by HR practitioners, on a Node.js back end.",
      "App Store release.",
    ],
    results: [
      { value: "AI personas", label: "Guidance grounded in real HR practice" },
      { value: "iOS", label: "Live on the App Store" },
    ],
    stack: ["React Native", "TypeScript", "Node.js", "OpenAI"],
    links: { appStore: "https://apps.apple.com/us/app/hrlynx/id6752120098" },
    liveStatus: "live",
    image: { src: "/work/hrlynx.webp", width: 800, height: 601 },
    featured: true,
  },
  {
    slug: "facesculpt-ai",
    name: "FaceSculpt AI",
    title: "FaceSculpt AI — real-time facial analysis on mobile",
    tagline: "Live on-device face detection that refuses a bad capture, then turns analysis into personalised guidance.",
    kind: "mobile",
    category: "Mobile app · AI",
    year: 2025,
    client: "FaceSculpt AI",
    industry: "Health & fitness",
    role: "Mobile engineer",
    summary:
      "A cross-platform React Native app that analyses facial structure from the live camera feed and delivers personalised jawline, posture and face-fitness guidance.",
    challenge:
      "Real-time face analysis on a phone is hard: detect a face from the live feed, confirm it's centred, visible and at the right distance, block capture until conditions are met — all without the lag that makes people give up.",
    built: [
      "Live face detection with framing and distance guidance, and capture gated on conditions being right.",
      "TensorFlow-based analysis feeding AI-generated, personalised guidance.",
      "Play Store release; iOS build.",
    ],
    results: [
      { value: "Real-time", label: "Face detection with capture gating" },
      { value: "iOS + Android", label: "Cross-platform" },
      { value: "Android", label: "Live on the Play Store" },
    ],
    stack: ["React Native", "TypeScript", "TensorFlow", "Python"],
    links: { playStore: "https://play.google.com/store/apps/details?id=com.AhmedReFu.facesculptai" },
    liveStatus: "live",
    image: { src: "/work/facesculpt-ai.webp", width: 800, height: 533 },
    featured: false,
  },
  {
    slug: "chatterbee",
    name: "ChatterBee",
    title: "ChatterBee — AAC communication and caregiver support",
    tagline: "An augmentative and alternative communication app for non-verbal users, with the caregivers around them built in.",
    kind: "mobile",
    category: "Mobile app",
    year: 2025,
    client: "ChatterBee",
    industry: "Accessibility",
    role: "Mobile engineer",
    summary:
      "An AAC app that helps non-verbal individuals communicate in everyday moments, paired with caregiver-facing tools so the people providing care stay involved.",
    challenge:
      "People who rely on AAC — and the caregivers supporting them — need tools that are accessible, dependable and simple in real moments, not clinical or complicated.",
    built: [
      "Accessibility-first communication interface tuned for reliability and large, forgiving touch targets.",
      "Caregiver support features alongside the user experience.",
      "App Store release.",
    ],
    results: [
      { value: "AAC + caregivers", label: "Both sides of the conversation" },
      { value: "iOS", label: "Live on the App Store" },
    ],
    stack: ["React Native", "TypeScript"],
    links: { appStore: "https://apps.apple.com/ca/app/chatterbee/id6761066125" },
    liveStatus: "live",
    image: { src: "/work/chatterbee.webp", width: 1317, height: 741 },
    featured: false,
  },
  {
    slug: "dollarcoin",
    name: "DollarCoin",
    title: "DollarCoin — marketing site for a digital-currency ecosystem",
    tagline: "Explain a complex product quickly and credibly, in a trust-sensitive market, without the jargon.",
    kind: "marketing",
    category: "Marketing website",
    year: 2025,
    client: "DollarCoin",
    industry: "Fintech",
    role: "Front-end engineer",
    summary:
      "A fast, fully responsive Next.js marketing site with a clear information hierarchy and a distinctive animated visual identity, so first-time visitors understand the concept and reach the resources that matter.",
    challenge:
      "A digital-currency project had to explain itself quickly to first-time visitors and stand out in a crowded, trust-sensitive space — without overwhelming people.",
    built: [
      "Next.js + Tailwind site with a clear hierarchy from concept to benefits to resources.",
      "An animated visual language kept performant.",
      "Fully responsive and fast on mobile.",
    ],
    results: [
      { value: "Live", label: "In production at dollarcoin.org" },
      { value: "Responsive", label: "Mobile-first" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: { live: "https://dollarcoin.org/" },
    liveStatus: "live",
    image: { src: "/work/dollarcoin.webp", width: 800, height: 800 },
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function adjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : undefined,
  };
}
