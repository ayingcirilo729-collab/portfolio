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




const fallback = "Sorry, I don't understand. 😅 Ask me about skills, education, projects, or contact info.";


// ---------- 3. Find the best rule-based reply ----------
// Each topic gets a score = how many of its keywords appear. Highest score wins.
function getReply(userText) {
const text = userText.toLowerCase();
const words = text.split(/[^a-z0-9-]+/); // "What's your skill?" → ["what","s","your","skill",""]
let bestTopic = null;
let bestScore = 0;
for (const topic in qa) {
let score = 0;
for (const keyword of qa[topic].keywords) {
const found = keyword.includes(" ")
? text.includes(keyword) // phrase: "good at"
: words.some(w => w === keyword || (keyword.length >= 4 && w.startsWith(keyword))); // "skill" →
"skills"
if (found) score++;
}
if (score > bestScore) {
bestScore = score;
bestTopic = topic;
}
}
return bestTopic ? qa[bestTopic].answer : fallback;
}
// ---------- 4. Ask the AI (our own server — the API key is NOT in this file!) ----------
let aiAvailable = USE_AI;
async function getAIReply(userText) {
const response = await fetch("/api/chat", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ message: userText }),
signal: AbortSignal.timeout(20000)
});
// 404/405 = no server function (e.g. Live Server); 500 = key not set up yet.
// Stop trying the AI for this visit. 429 (busy) = just use the backup this time.
if ([404, 405, 500, 501].includes(response.status)) aiAvailable = false;
if (!response.ok) throw new Error("API error " + response.status);
const data = await response.json();
if (!data.reply) throw new Error("Empty reply");
return data.reply;
}
// ---------- 5. Chat UI ----------
const launcher = document.getElementById("chat-launcher");
const panel = document.getElementById("chat-panel");
const closeBtn = document.getElementById("chat-close");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send");
const messages = document.getElementById("chat-messages");
const modeLabel = document.getElementById("chat-mode");
let greeted = false;
function addMessage(text, sender) {
const li = document.createElement("li");
li.classList.add("message", sender);
li.textContent = text; // textContent = safe (no HTML injection)
messages.appendChild(li);
messages.scrollTop = messages.scrollHeight;
return li;
}
function showTyping(){
const li = document.createElement("li");
li.className = "message bot typing";
li.setAttribute("aria-label", "Typing");
}
li.innerHTML = "<span></span><span></span><span></span>";
messages.appendChild(li);
messages.scrollTop = messages.scrollHeight;
return li;

function setMode(text) { modeLabel.textContent = text; }
function openChat() {
panel.hidden = false;
launcher.setAttribute("aria-expanded", "true");
launcher.setAttribute("aria-label", "Close chat");
if (!greeted) {
addMessage(qa.greeting.answer, "bot");
greeted = true;
}
input.focus();
}
function closeChat() {
panel.hidden = true;
launcher.setAttribute("aria-expanded", "false");
launcher.setAttribute("aria-label", "Open chat");
launcher.focus();
}
// Change this on line 152 or 202
const waitDuration = 500;
async function handleQuestion(userText) {
userText = userText.trim();
if (userText === "") return; // ignore empty messages
addMessage(userText, "user");
input.value = "";
sendBtn.disabled = true;
const typing = showTyping();
let reply;
if (aiAvailable) {
try {
reply = await getAIReply(userText);
setMode("✨ AI mode");
} catch (error) {
console.log("AI unavailable, using rule-based bot:", error.message);
}
}
if (!reply) {
await wait(waitDuration); // small pause so it feels natural
reply = getReply(userText);
setMode("⚡ Basic mode");
}
typing.remove();
addMessage(reply, "bot");
sendBtn.disabled = false;
input.focus();
}

li.innerHTML = "<span></span><span></span><span></span>";
messages.appendChild(li);
messages.scrollTop = messages.scrollHeight;
return li;
{}
function setMode(text) { modeLabel.textContent = text; }
function openChat() {
panel.hidden = false;
launcher.setAttribute("aria-expanded", "true");
launcher.setAttribute("aria-label", "Close chat");
if (!greeted) {
addMessage(qa.greeting.answer, "bot");
greeted = true;
}
input.focus();
}
function closeChat() {
panel.hidden = true;
launcher.setAttribute("aria-expanded", "false");
launcher.setAttribute("aria-label", "Open chat");
launcher.focus();
}
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function handleQuestion(userText) {
userText = userText.trim();
if (userText === "") return; // ignore empty messages
addMessage(userText, "user");
input.value = "";
sendBtn.disabled = true;
const typing = showTyping();
let reply;
if (aiAvailable) {
try {
reply = await getAIReply(userText);
setMode("✨ AI mode");
} catch (error) {
console.log("AI unavailable, using rule-based bot:", error.message);
}
}
if (!reply) {
await wait(waitDuration); // small pause so it feels natural
reply = getReply(userText);
setMode("⚡ Basic mode");
}
typing.remove();
addMessage(reply, "bot");
sendBtn.disabled = false;
input.focus();
}
{
launcher.addEventListener("click", () => (panel.hidden ? openChat() : closeChat()));
closeBtn.addEventListener("click", closeChat);
document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) closeChat(); });
document.querySelectorAll("[data-open-chat]").forEach(btn => btn.addEventListener("click", openChat));
form.addEventListener("submit", function (event) {
event.preventDefault(); // stop the page from reloading
handleQuestion(input.value);
});
document.querySelectorAll("#quick-replies button").forEach(function (btn) {
btn.addEventListener("click", () => handleQuestion(btn.dataset.question));
});
}
