import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./src/models/Post.js";

dotenv.config();

const posts = [
  // ── Technology ──────────────────────────────────────────────────────────
  {
    title: "Getting Started with React Hooks",
    author: "Sarah Johnson",
    category: "Technology",
    tags: ["react", "hooks", "javascript", "frontend"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    views: 1240,
    likes: 98,
    excerpt: "Learn how React Hooks revolutionized functional component development by replacing class-based lifecycle methods.",
    content: `React Hooks were introduced in React 16.8 and completely changed how we write React components. Before hooks, stateful logic could only live inside class components — which were verbose, harder to test, and notoriously difficult to share between components.

useState is the most fundamental hook. It lets you add state to a functional component with a single line: const [count, setCount] = useState(0). Calling setCount re-renders the component with the new value — no this.setState, no binding, no boilerplate.

useEffect replaces componentDidMount, componentDidUpdate, and componentWillUnmount all at once. You pass a function that runs after every render by default, or conditionally when specific values change. Returning a cleanup function handles teardown automatically.

useContext eliminates prop-drilling. Instead of passing values through multiple component layers, you read context directly with const theme = useContext(ThemeContext).

Custom hooks are where the real power lives. By composing built-in hooks into your own useFetch, useForm, or useDebounce hook, you extract and reuse stateful logic across components without any wrapper components or HOC patterns.

The rules of hooks — only call at the top level, only call from React functions — keep the internal linked-list stable across renders. ESLint's rules-of-hooks plugin enforces these at dev time.

If you are still writing class components in 2024, hooks are the migration path. Start with useState and useEffect, then reach for useCallback and useMemo to memoize expensive operations as your app grows.`,
  },

  {
    title: "Building REST APIs with Express.js and Node.js",
    author: "Michael Chen",
    category: "Technology",
    tags: ["nodejs", "express", "backend", "api", "rest"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    views: 980,
    likes: 74,
    excerpt: "A comprehensive guide to designing and building production-ready REST APIs using Express.js.",
    content: `Express.js is the de-facto web framework for Node.js. Its minimalist, unopinionated design lets you build anything from a simple JSON API to a full MVC application without forcing a particular structure on you.

Setting up is trivial: npm install express, create a server.js, and you have an HTTP server running in under ten lines of code. The real work is in structuring it well as the project grows.

Routing in Express is clean and expressive. app.get(), app.post(), app.put(), and app.delete() map HTTP verbs to handler functions. Router instances let you modularize routes by resource — a /routes/posts.js, a /routes/users.js — and mount them on the app with app.use('/api/posts', postRoutes).

Middleware is Express's killer feature. Every request passes through a pipeline of functions, each receiving req, res, and next. You use middleware for parsing JSON bodies (express.json()), logging (morgan), authentication (passport), validation (express-validator), and error handling.

A global error handler middleware — a function with four parameters (err, req, res, next) — catches any error thrown or passed to next() from any route. This single function is your safety net for consistent error responses across the entire API.

MongoDB with Mongoose pairs naturally with Express. Define a schema, export a model, and use it in controller functions. Keep controllers thin: validate input, call a service, return the response. Business logic lives in services, not controllers.

Always add rate limiting (express-rate-limit), helmet for security headers, and cors configured to your frontend origin before deploying. An API without these basics is not production-ready.`,
  },

  {
    title: "Understanding MongoDB Indexes for Performance",
    author: "Dev Kapoor",
    category: "Technology",
    tags: ["mongodb", "database", "performance", "indexing"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    views: 670,
    likes: 55,
    excerpt: "Deep dive into how MongoDB indexes work and how to use them to dramatically speed up your queries.",
    content: `Indexes are the single biggest lever for MongoDB query performance. Without an index, MongoDB performs a collection scan — reading every document to find matches. On a collection with millions of documents, this is catastrophically slow.

An index is a sorted data structure (a B-tree) that MongoDB maintains alongside your collection. It stores the values of a field (or fields) in sorted order with pointers to the full documents. A query on an indexed field walks the tree in O(log n) instead of scanning O(n) documents.

The _id index is created automatically on every collection. For everything else, you decide. db.posts.createIndex({ category: 1 }) creates an ascending index on category. Queries filtering by category now use the index instead of scanning.

Compound indexes cover multiple fields. createIndex({ status: 1, createdAt: -1 }) lets MongoDB satisfy queries that filter by status and sort by createdAt using a single index. The order matters — the index supports queries on status alone, or status + createdAt together, but not createdAt alone.

Text indexes power full-text search. createIndex({ title: 'text', content: 'text' }) lets you run db.posts.find({ $text: { $search: 'react hooks' } }) queries efficiently. Only one text index per collection is allowed.

Use explain('executionStats') to see whether a query uses an index (IXSCAN) or does a scan (COLLSCAN). If you see COLLSCAN on a hot query path, you need an index.

The tradeoff: indexes consume disk space and slow down writes because every insert, update, or delete must update the relevant indexes. Do not index every field — index the fields you query and sort on most frequently.`,
  },

  {
    title: "CSS Grid vs Flexbox: When to Use Which",
    author: "Priya Nair",
    category: "Technology",
    tags: ["css", "flexbox", "grid", "frontend", "layout"],
    status: "draft",
    coverImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800",
    views: 430,
    likes: 41,
    excerpt: "Stop guessing which layout tool to reach for — here's a clear mental model for choosing between CSS Grid and Flexbox.",
    content: `CSS Grid and Flexbox are both layout tools, but they solve different problems. Using the wrong one creates unnecessary complexity. Here is a clear mental model.

Flexbox is one-dimensional. It lays items out in a single row or column and lets you control alignment, spacing, and wrapping along that axis. Use it when you have a row of buttons, a navigation bar, a card's internal layout, or any time content flows in one direction.

Grid is two-dimensional. It lets you define explicit rows and columns and place items precisely within that structure. Use it for overall page layout — header, sidebar, main, footer — or any time you need items to align on both axes simultaneously.

A practical rule: if you are thinking about the layout from the container perspective and you know the structure in advance, reach for Grid. If you are thinking about how a set of items should be distributed along a line, reach for Flexbox.

They compose perfectly. A Grid defines your page sections. Inside each section, Flexbox handles the internal arrangement of elements. A nav inside a grid area uses display: flex to space its links evenly.

Grid's killer features: grid-template-areas for readable named layout zones, minmax() for fluid column sizing, and auto-fill / auto-fit for responsive grids without media queries — grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) creates a responsive card grid in one line.

Flexbox's killer features: flex-grow and flex-shrink for proportional sizing, align-items and justify-content for dead-simple centering, and gap for consistent spacing without margin hacks.

Learn both deeply. They are not competing — they are complementary tools that cover every layout scenario you will encounter.`,
  },

  // ── Travel ──────────────────────────────────────────────────────────────
  {
    title: "10 Hidden Gems in Southeast Asia You Must Visit",
    author: "Aisha Patel",
    category: "Travel",
    tags: ["travel", "asia", "adventure", "backpacking"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
    views: 2100,
    likes: 187,
    excerpt: "Skip the overcrowded tourist traps — these 10 under-the-radar destinations in Southeast Asia will take your breath away.",
    content: `Southeast Asia attracts millions of visitors every year, but most of them crowd into the same handful of spots. Bali, Bangkok, and Ha Long Bay are stunning, but they are also packed. Here are ten places that still feel genuinely undiscovered.

Kampot, Cambodia sits on a gentle river surrounded by pepper plantations and French colonial architecture. Rent a bicycle, cycle to the pepper farms, and watch fireflies light up the riverbanks at night. Accommodation is cheap, the food is incredible, and the pace of life is unhurried.

Hsipaw, Myanmar is a four-hour train ride from Mandalay on a route that crosses a legendary railway viaduct. The town itself is small, but the trekking into Shan hill-tribe villages through green valleys is unlike anything else in the region.

Con Dao, Vietnam was once a prison island and is now a national marine park. The beaches are pristine, the diving is world-class, and the history is sobering. Vietnamese tourists visit but international visitors are still rare.

Koh Rong Sanloem, Cambodia has the bioluminescent plankton that makes the water glow electric blue at night. Swim after dark and watch your arms trail light through the sea.

Vang Vieng, Laos has shed its party reputation and is now a base for kayaking, cave exploration, and cycling through limestone karst landscapes reflected in the Nam Song River.

The best time to visit most of Southeast Asia is November through February — dry, cooler, and manageable. Book accommodation ahead in the rare cases where there is limited supply. Mostly, just show up.`,
  },

  {
    title: "A Solo Traveler's Guide to Japan on a Budget",
    author: "Tomoko Harada",
    category: "Travel",
    tags: ["japan", "solo travel", "budget", "asia"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    views: 3400,
    likes: 302,
    excerpt: "Japan has a reputation for being expensive, but with the right strategies you can experience it on a surprisingly modest daily budget.",
    content: `Japan is one of the most rewarding travel destinations in the world, but its reputation for being expensive puts many people off. The reality is more nuanced — with smart choices, you can travel Japan comfortably for USD 60–80 per day including accommodation, food, and transport.

Stay in hostels or capsule hotels. A bunk in a clean, well-run Tokyo hostel costs 2,500–3,500 yen. Capsule hotels are a uniquely Japanese experience and often include shared baths, a common room, and surprisingly comfortable sleeping pods. Business hotels outside central areas offer private rooms around 5,000–7,000 yen.

Eat where locals eat. Convenience stores — 7-Eleven, Lawson, FamilyMart — sell freshly made onigiri, sandwiches, hot noodles, and bento boxes for 200–500 yen. A bowl of ramen at a neighborhood shop costs 800–1,200 yen. Gyudon chains like Yoshinoya serve a full meal for under 500 yen. Avoid the tourist trap restaurants near major shrines.

Buy a IC card (Suica or Pasmo) on arrival and load it with cash. It works on trains, subways, and buses in every major city, eliminates the need to buy individual tickets, and can pay at convenience stores. The Japan Rail Pass is only worth it if you are doing multiple long-distance shinkansen trips.

Temples and shrines are almost always free to enter the grounds — inner halls sometimes charge 300–600 yen. City and neighborhood parks are completely free. The best views of Mount Fuji are from public spots that cost nothing.

Download Google Maps offline before you land. Japanese address systems are famously confusing even to locals, and offline maps have saved countless confused tourists.`,
  },

  // ── Health ──────────────────────────────────────────────────────────────
  {
    title: "The Science Behind Quality Sleep",
    author: "Dr. Rahul Mehta",
    category: "Health",
    tags: ["sleep", "health", "wellness", "science"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800",
    views: 2340,
    likes: 211,
    excerpt: "Understanding the biology of sleep is the first step to actually fixing yours. Here is what the science says.",
    content: `Sleep is not passive rest. While you sleep, your brain consolidates memories, your immune system repairs damage, your cells secrete growth hormone, and your glymphatic system flushes out metabolic waste — including the amyloid plaques associated with Alzheimer's disease.

Sleep is structured in cycles of roughly 90 minutes, each containing light sleep (N1, N2), deep slow-wave sleep (N3), and REM sleep. You cycle through four to six of these per night. Deep sleep dominates the first half of the night; REM dominates the second half. This is why cutting your sleep from eight hours to six does not just cost you two hours — it disproportionately cuts REM sleep.

Circadian rhythm is your internal 24-hour clock governed by the suprachiasmatic nucleus in the hypothalamus. Light exposure is the primary zeitgeber — the cue that resets this clock. Morning sunlight (even 10 minutes outdoors) powerfully anchors your rhythm and makes falling asleep easier that evening. Evening blue light from screens delays melatonin onset by one to three hours, pushing your sleep phase later.

Adenosine is the sleep pressure molecule. It accumulates during waking hours and creates the mounting urge to sleep. Caffeine works by blocking adenosine receptors — it does not reduce adenosine, just masks it. When caffeine wears off, adenosine floods the receptors all at once, causing the crash. Caffeine's half-life is five to seven hours, meaning a 3pm coffee still has half its caffeine active at 8–10pm.

Core habits that the research consistently supports: consistent wake time (even weekends), cool bedroom temperature (16–19°C), complete darkness, no caffeine after early afternoon, and a wind-down routine starting 60 minutes before bed. These are not suggestions — they are the levers that determine sleep quality.`,
  },

  // ── Business ────────────────────────────────────────────────────────────
  {
    title: "How to Build a Personal Brand in the Age of AI",
    author: "Neha Gupta",
    category: "Business",
    tags: ["personal branding", "career", "linkedin", "ai"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
    views: 1560,
    likes: 143,
    excerpt: "In a world flooded with AI-generated content, authentic personal brands matter more than ever. Here is how to build one.",
    content: `AI can now produce passable blog posts, social media updates, and marketing copy in seconds. This creates a paradox: the volume of content online is exploding while the genuine human signal inside it is shrinking. The people who win in this environment are not those who use AI best — they are those who are most authentically themselves.

A personal brand is not a logo or a colour palette. It is the consistent answer to: what does this person know deeply, believe strongly, and deliver reliably? Everything else — the LinkedIn profile, the newsletter, the portfolio — is just evidence for that answer.

Start with a point of view, not a topic. There is an endless supply of people writing about "productivity" or "entrepreneurship." There is exactly one person who has your combination of experiences, failures, frameworks, and opinions. Lead with those. Specificity is what makes content worth sharing.

Consistency compounds. A newsletter sent every Tuesday for three years is worth more than a viral post that disappears from memory by Thursday. The audience you build slowly through consistent delivery is far more durable than one assembled through one lucky moment.

LinkedIn rewards depth over breadth right now. Long-form posts that share genuine mistakes, specific frameworks, or counter-intuitive observations consistently outperform generic motivational content. Write the post you wish someone had written for you three years ago.

The AI advantage: use AI for research, for editing, for repurposing long content into shorter formats. But the original idea, the lived experience, the specific opinion — that has to come from you. That is the part that cannot be generated.`,
  },

  // ── Lifestyle ───────────────────────────────────────────────────────────
  {
    title: "Minimalism Changed My Life: A Year-Long Experiment",
    author: "Sophie Laurent",
    category: "Lifestyle",
    tags: ["minimalism", "mindset", "declutter", "lifestyle"],
    status: "draft",
    coverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800",
    views: 1780,
    likes: 154,
    excerpt: "I spent a year systematically removing things from my life. Here is what happened — and what I unexpectedly miss.",
    content: `Twelve months ago, I started an experiment: for one year, I would not buy anything that was not a consumable or a direct replacement for something broken. Simultaneously, I would donate, sell, or discard anything I had not used in six months.

The first month was uncomfortable in a way I did not anticipate. Not because I wanted things — but because shopping, I realized, had been filling gaps: boredom on a Tuesday evening, the small excitement of a package arriving, the identity signal of owning certain brands. Removing it revealed the gaps clearly.

By month three, the flat looked different. Surfaces that had accumulated objects were clear. The mental effect was real and a little startling — the visual noise that I had completely stopped noticing had been costing me something.

I found that most things I thought I might need someday, I never needed. The rule I landed on: if I can replace it for under thirty euros within 24 hours, I do not need to own it indefinitely.

What I kept: things I use weekly, things with genuine sentimental value (a small box, not a storage unit), books I have actually re-read, cooking equipment I use regularly. Everything else left.

What I unexpectedly miss: nothing specific. I thought I would miss my collection of notebooks, my backup camera lenses, the kitchen gadgets. I do not.

What changed most: time. Without the low-level management of objects — maintaining them, finding them, moving them around — there is more of it. That was the surprise. Minimalism is not really about objects at all. It is about attention.`,
  },

  // ── Science ─────────────────────────────────────────────────────────────
  {
    title: "What Quantum Computing Actually Means for Everyday Tech",
    author: "Dr. Ananya Krishnan",
    category: "Science",
    tags: ["quantum computing", "science", "technology", "future"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    views: 890,
    likes: 77,
    excerpt: "Quantum computing is not about making your laptop faster. Here is what it actually is and why it matters.",
    content: `Quantum computing has a marketing problem. Headlines imply it will make everything faster — your phone, your apps, your downloads. It will not. Quantum computers are not general-purpose speed upgrades. They are specialized tools for specific categories of problems.

Classical computers store information as bits — each bit is either 0 or 1. Quantum computers use qubits. A qubit can be 0, 1, or a superposition of both simultaneously. Two qubits can represent four states at once. Three qubits can represent eight. The number of representable states doubles with each qubit added.

This does not mean a quantum computer simply tries all answers simultaneously. The key is interference — a carefully designed quantum algorithm manipulates probabilities so that wrong answers cancel out and correct answers reinforce each other. If the algorithm works, you measure the qubit state and find the answer with high probability.

The categories of problems where this helps: integer factorization (Shor's algorithm), which threatens most current encryption; unstructured search (Grover's algorithm), which gives a quadratic speedup; and quantum simulation, which is arguably the most practically important application — simulating molecular interactions for drug discovery and materials science in ways that classical computers cannot.

Current quantum computers are noisy — qubits decohere (lose their quantum state) from vibration, heat, and electromagnetic interference. Maintaining quantum coherence long enough to complete a useful computation requires extreme physical conditions, typically near absolute zero. Error correction overhead currently requires hundreds or thousands of physical qubits per reliable logical qubit.

For everyday tech in the next decade: expect quantum computing to run in the cloud, applied to specific optimization and simulation problems, not to replace classical computing. The smartphone in your pocket will remain classical. What changes is what specialized systems in research and industry can compute.`,
  },

  // ── Education ───────────────────────────────────────────────────────────
  {
    title: "How to Learn Anything Faster Using Spaced Repetition",
    author: "Arjun Sharma",
    category: "Education",
    tags: ["learning", "memory", "spaced repetition", "productivity"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    views: 3100,
    likes: 276,
    excerpt: "The most evidence-backed learning technique most people never use — and a practical system for implementing it.",
    content: `Hermann Ebbinghaus mapped the forgetting curve in the 1880s: without review, you forget roughly 50% of new information within an hour, 70% within a day, and 90% within a week. This is not a flaw to work around — it is how the brain allocates memory resources, deprioritizing information it has not seen recently.

Spaced repetition exploits the opposite principle: each time you successfully recall a piece of information, the optimal interval before the next review increases. Review something once and it consolidates a little. Review it again at the right moment — just before you would have forgotten it — and the consolidation deepens. The spacing gets longer with each successful recall: 1 day, 3 days, 1 week, 2 weeks, 1 month, 3 months.

This is why cramming fails for long-term retention. You review everything in one session, feel prepared, pass the exam, and forget most of it within two weeks. The information never made it to long-term memory.

Anki is the tool most serious learners use. It is free, open-source, and implements the SM-2 spaced repetition algorithm. You create flashcards (or download pre-made decks) and review them daily. The algorithm shows you cards at precisely the right interval based on how easily you recalled them.

The practical system: create cards the same day you learn something. Keep cards atomic — one fact per card. Use images where possible. Review daily without skipping, even if it is just 10 minutes. The daily review is what makes the system work — skipping creates a backlog that becomes demotivating.

Where it works best: language vocabulary, medical terminology, historical dates, legal definitions, coding syntax, and any domain requiring large volumes of factual recall. Where it helps less: conceptual understanding, which requires different techniques like elaborative interrogation and the Feynman method.`,
  },

  // ── Food ────────────────────────────────────────────────────────────────
  {
    title: "The Beginner's Guide to Fermentation at Home",
    author: "Yuki Tanaka",
    category: "Food",
    tags: ["fermentation", "food", "health", "diy", "kitchen"],
    status: "published",
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    views: 1450,
    likes: 132,
    excerpt: "Fermentation is easier than you think, the results are deeply delicious, and it costs almost nothing to start.",
    content: `Fermentation is one of humanity's oldest food preservation techniques — and experiencing a quiet renaissance in home kitchens. Kimchi, sourdough, kefir, miso, tempeh, and sauerkraut are all fermented foods, all made at home with basic equipment and a little patience.

The principle is simple. Beneficial bacteria (primarily lactobacillus) or yeasts consume sugars and produce lactic acid, acetic acid, or alcohol as byproducts. These lower the pH, creating an environment where harmful bacteria cannot survive. The food preserves itself.

Sauerkraut is the easiest starting point. Shred a cabbage. Massage in 2% salt by weight (roughly 20g of salt per kilogram of cabbage). The salt draws out moisture, creating the brine the cabbage ferments in. Pack it tightly into a clean jar, press it below the brine, and leave it at room temperature. After 3–7 days you have sauerkraut. It keeps in the fridge for months.

The only thing to watch: keep the cabbage submerged below the brine. Anything above the brine can develop mold (usually harmless but worth avoiding). A small zip-lock bag filled with water works as a weight. Genuine airlock lids exist but are unnecessary.

Lacto-fermented vegetables follow the same 2% brine principle. Make a brine (20g salt dissolved in 1 litre of water), submerge your vegetables — carrots, peppers, green beans, garlic — and wait 3–5 days. The result is crunchy, tangy, probiotic-rich, and utterly unlike anything pickled in vinegar.

Sourdough starter is flour plus water left to capture wild yeast from the air. Feed it equal parts flour and water daily. After five to seven days, it should double in size after feeding, smell pleasantly sour, and be ready to bake with. The starter is not perishable — people maintain them for decades.`,
  },

  // ── Entertainment ───────────────────────────────────────────────────────
  {
    title: "Why Video Games Are the Art Form of Our Generation",
    author: "Marcus Thompson",
    category: "Entertainment",
    tags: ["gaming", "culture", "art", "entertainment"],
    status: "archived",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    views: 2200,
    likes: 198,
    excerpt: "Games have surpassed cinema in cultural reach and creative ambition. Here is the case for taking them seriously as art.",
    content: `Every generation gets the art form it deserves. The 20th century belonged to cinema — the medium that could tell stories with sound, image, and time in ways the novel and theatre could not. The 21st century belongs to video games.

Consider the numbers. The global games industry generates more revenue than film and music combined. More people play games regularly than watch linear television. Among people under 35, gaming is the dominant leisure activity in most developed countries.

But the more interesting case is creative, not commercial. Games like The Last of Us, Disco Elysium, and Red Dead Redemption 2 demonstrate narrative sophistication that rivals the best literary fiction. Hollow Knight and Ori and the Blind Forest achieve visual beauty comparable to hand-crafted animation. Dark Souls builds a world so coherently realized through environmental storytelling that players have written thousands of words of analysis about its lore.

What games can do that no other medium can: they are the only art form where the audience is an active participant in the narrative. When Arthur Morgan's choices in Red Dead 2 have consequences, the player carries those consequences — not as an observer, but as the agent who made them. The emotional weight is fundamentally different.

The cultural gatekeeping around games — the assumption that they are inherently juvenile, that the medium cannot carry serious ideas — says more about critics than about games. Roger Ebert famously argued games could never be art. He died before the decade that proved him comprehensively wrong.

If you have not played a video game since the 1990s or have never played one at all, the landscape has changed beyond recognition. Start with Disco Elysium or The Last of Us. Come in with the same openness you would bring to a film by a director you do not know yet.`,
  },
];

// ─── Runner ─────────────────────────────────────────────────────────────────

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not set in .env");

    console.log("🔌  Connecting to MongoDB...");
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log(`✅  Connected to: ${mongoose.connection.host}`);

    console.log("\n🗑️   Clearing existing posts...");
    const { deletedCount } = await Post.deleteMany({});
    console.log(`    Deleted ${deletedCount} existing document(s)`);

    console.log("\n🌱  Seeding posts...");
    const inserted = await Post.insertMany(posts);
    console.log(`    Inserted ${inserted.length} posts:\n`);

    inserted.forEach((p, i) => {
      const status = p.status === "published" ? "✅" : p.status === "draft" ? "📝" : "📦";
      console.log(`    ${String(i + 1).padStart(2, "0")}. ${status} [${p.category.padEnd(14)}] ${p.title}`);
    });

    // Summary by status
    const published = inserted.filter((p) => p.status === "published").length;
    const draft = inserted.filter((p) => p.status === "draft").length;
    const archived = inserted.filter((p) => p.status === "archived").length;

    console.log(`
📊  Seed Summary
    Total      : ${inserted.length}
    Published  : ${published}
    Draft      : ${draft}
    Archived   : ${archived}

🎉  Database seeded successfully!
    `);
  } catch (err) {
    console.error("\n❌  Seeding failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌  Disconnected from MongoDB.\n");
  }
};

seedDB();