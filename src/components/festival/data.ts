import type { Event } from "./EventCard";
import type { Blog } from "./BlogCard";

/* Imagery uses Unsplash — direct, hot-linkable, free-to-use under the Unsplash license.
   Replace with festival-owned visuals when available. */

export const events: Event[] = [
  {
    id: "e1",
    title: "Cinema Under the Stars: A Tribute to Guru Dutt",
    category: "Film",
    date: "14 Nov 2026",
    city: "Mumbai · Bandra Fort",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=70",
    blurb: "An open-air retrospective screening 'Pyaasa' on 35mm with a live ghazal prelude by Radhika Chopra.",
    priceFrom: 499,
    featured: true,
  },
  {
    id: "e2",
    title: "Mehfil-e-Adab: An Evening of Hindi & Urdu Poetry",
    category: "Literature",
    date: "22 Nov 2026",
    city: "Delhi · India Habitat Centre",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=70",
    blurb: "Featuring Gulzar saab, Hussain Haidry and Sumita Beethi in an intimate baithak setting.",
    priceFrom: 350,
  },
  {
    id: "e3",
    title: "Brushstrokes of Bombay: A Living Art Walk",
    category: "Art",
    date: "30 Nov 2026",
    city: "Mumbai · Kala Ghoda",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=70",
    blurb: "A curator-led walk through 12 contemporary studios with live demos and limited editions.",
    priceFrom: 0,
  },
  {
    id: "e4",
    title: "Indie Frames: Short Film Showcase 2026",
    category: "Film",
    date: "06 Dec 2026",
    city: "Bengaluru · Suchitra",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=70",
    blurb: "24 selected shorts from across South Asia, followed by a director panel and chai.",
    priceFrom: 250,
  },
  {
    id: "e5",
    title: "Sufiana: A Qawwali Night",
    category: "Music",
    date: "12 Dec 2026",
    city: "Jaipur · Amer Fort",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=70",
    blurb: "Nizami Bandhu perform under the moonlit ramparts of Amer.",
    priceFrom: 899,
  },
  {
    id: "e6",
    title: "Rangmanch Natya: Theatre Festival",
    category: "Theatre",
    date: "19–22 Dec 2026",
    city: "Kolkata · Academy of Fine Arts",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=70",
    blurb: "Four nights, eight plays. From Manto to Mahasweta — voices that India still needs.",
    priceFrom: 200,
  },
];

export const blogs: Blog[] = [
  {
    id: "b1",
    title: "Why parallel cinema still matters in the age of OTT",
    excerpt: "From Shyam Benegal to Payal Kapadia — a quiet revolution is reshaping Indian storytelling.",
    author: "Aanya Sehgal",
    readMins: 7,
    category: "Film",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "b2",
    title: "The lost art of the literary baithak",
    excerpt: "How a 19th-century courtyard tradition is finding new audiences in 2026 Bombay.",
    author: "Rohan Mehta",
    readMins: 5,
    category: "Literature",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "b3",
    title: "Inside the studio: A morning with M.F. Husain's protégé",
    excerpt: "Pigments, prayer and palette knives — a conversation that became a manifesto.",
    author: "Ira Banerjee",
    readMins: 9,
    category: "Art",
    image: "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=1200&q=70",
  },
];

export const team = [
  { name: "Devika Iyer",   role: "Festival Director", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=70" },
  { name: "Karan Bhalla",  role: "Curator, Cinema",   image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=600&q=70" },
  { name: "Saba Qureshi",  role: "Curator, Literature", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=70" },
  { name: "Aniket Rao",    role: "Head of Production", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70" },
  { name: "Tanya Mathur",  role: "Outreach & Partnerships", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=70" },
  { name: "Vihaan Kapoor", role: "Brand & Design",    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=70" },
];

export const partners = [
  "Films Division of India",
  "Sahitya Akademi",
  "NCPA",
  "Jaipur Literature Festival",
  "Doordarshan Archives",
  "Prithvi Theatre",
  "Kala Ghoda Association",
  "FTII Pune",
];

export const magazineIssues = [
  {
    id: "m1",
    title: "Issue 12 · The Silence Between Frames",
    cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=70",
    date: "Oct 2026",
  },
  {
    id: "m2",
    title: "Issue 11 · Women Who Wrote India",
    cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=70",
    date: "Aug 2026",
  },
  {
    id: "m3",
    title: "Issue 10 · The Colour of Memory",
    cover: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=70",
    date: "Jun 2026",
  },
];
