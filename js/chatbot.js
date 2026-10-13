// js/chatbot.js — the floating chatbot.
// 1st choice: AI reply from our Vercel function (/api/chat), if it's set up.
// Backup: rule-based reply from the qa object below (always works, even offline).
// ✏️ CUSTOMIZE: edit data/profile.js (your info) and the keywords below.
import profile from "../data/profile.js";
const USE_AI = true; // set to false to always use the rule-based bot
// ---------- 1. Helper: turn ["a", "b", "c"] into "a, b and c" ----------
function list(items) {
if (items.length <= 1) return items.join("");
return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
}
// ---------- 2. The rule-based "brain": topics → keywords + answer ----------
// Keywords are lowercase. Add English AND Taglish words people might use!
const qa = {
greeting: {
keywords: ["hello", "hi", "hey", "kumusta", "musta", "good morning", "good afternoon"],
answer: `Hi! 👋 I'm ${profile.shortName}'s assistant. Ask me about skills, education, projects, or
contact info.`
},
about: {
keywords: ["about", "who", "yourself", "sino", "introduce"],
answer: profile.about
},
skills: {
keywords: ["skill", "good at", "know", "html", "css", "javascript", "language", "tech", "galing"],
answer: `${profile.shortName} works with ${list(profile.skills)}, and is currently learning
${list(profile.learning)}.`
},
education: {
keywords: ["school", "study", "studies", "education", "grade", "strand", "aral", "nag-aaral",
"college"],
answer: profile.education.map(e => `🎓 ${e.level} at ${e.school} (${e.years})`).join("\n")
},
projects: {
keywords: ["project", "built", "build", "made", "portfolio", "gawa", "work"],
answer: "Here are some projects:\n" + profile.projects.map(p => `• ${p.name}:
${p.description}`).join("\n")
},
hobbies: {
keywords: ["hobby", "hobbies", "free time", "fun", "like to do", "libangan"],
answer: `In free time, ${profile.shortName} enjoys ${list(profile.hobbies)}.`
},
goals: {
keywords: ["goal", "dream", "future", "career", "plan", "pangarap"],
answer: profile.goals
},
ojt: {
keywords: ["ojt", "intern", "immersion", "company", "team"],
answer: profile.ojt
},
contact: {
keywords: ["contact", "email", "reach", "github", "message", "hire"],
answer: `You can email ${profile.contact.email} or check GitHub: ${profile.contact.github}`
},
thanks: {
keywords: ["thank", "thanks", "salamat", "ty"],
answer: "You're welcome! 😊 Anything else you'd like to know?"
}
};
const fallback = "Hmm, I'm not sure about that yet 🤔. Try asking about my skills, education, projects, or
how to contact me!";