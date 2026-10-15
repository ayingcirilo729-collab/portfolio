// js/chatbot.js - the floating chatbot rule-based engine
import profile from "../data/profile.js";
const USE_AI = false;

function list(items) {
  if (items.length <= 1) return items.join("");
  return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
}

const qa = {
  greeting: {
    keywords: ["hello", "hi", "hey", "kumusta", "musta"],
    answer: `Hi! I'm ${profile.shortName}'s assistant. Ask me about skills, education, projects, or contact info.`
  },
  about: {
    keywords: ["about", "who", "yourself", "sino", "introduce"],
    answer: profile.about
  },
  skills: {
    keywords: ["skill", "good at", "know", "html", "css", "javascript", "tech"],
    answer: `${profile.shortName} works with ${list(profile.skills)}, and is currently learning ${list(profile.learning)}.`
  },
  education: {
    keywords: ["school", "study", "studies", "education", "grade", "strand", "aral"],
    answer: profile.education.map(e => `${e.level} at ${e.school} (${e.years})`).join("\n")
  },
  projects: {
    keywords: ["project", "built", "build", "made", "portfolio", "gawa"],
    answer: "Here are some projects:\n" + profile.projects.map(p => `${p.name}: ${p.description}`).join("\n")
  },
  contact: {
    keywords: ["contact", "email", "reach", "github", "message", "hire"],
    answer: `You can email ${profile.contact.email} or check GitHub: ${profile.contact.github}`
  }
};

const fallback = "Hmm, I'm not sure about that. Try asking about my skills, education, projects, or contact info!";

function getReply(userText) {
  const text = userText.toLowerCase();
  const words = text.split(/[^a-z0-9-]+/);
  let bestTopic = null;
  let bestScore = 0;
  for (const topic in qa) {
    let score = 0;
    for (const keyword of qa[topic].keywords) {
      const found = keyword.includes(" ") ? text.includes(keyword) : words.some(w => w === keyword);
      if (found) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }
  return bestTopic ? qa[bestTopic].answer : fallback;
}

// Chat UI bindings
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
  li.textContent = text;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
  return li;
}

function showTyping() {
  const li = document.createElement("li");
  li.className = "message bot typing";
  li.innerHTML = "<span></span><span></span><span></span>";
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
  return li;
}

function openChat() {
  panel.hidden = false;
  launcher.setAttribute("aria-expanded", "true");
  if (!greeted) {
    addMessage(qa.greeting.answer, "bot");
    greeted = true;
  }
  input.focus();
}

function closeChat() {
  panel.hidden = true;
  launcher.setAttribute("aria-expanded", "false");
  launcher.focus();
}

async function handleQuestion(userText) {
  userText = userText.trim();
  if (!userText) return;
  addMessage(userText, "user");
  input.value = "";
  sendBtn.disabled = true;
  const typing = showTyping();
  await new Promise(r => setTimeout(r, 500));
  typing.remove();
  const reply = getReply(userText);
  modeLabel.textContent = "Basic mode";
  addMessage(reply, "bot");
  sendBtn.disabled = false;
  input.focus();
}

launcher.addEventListener("click", () => (panel.hidden ? openChat() : closeChat()));
closeBtn.addEventListener("click", closeChat);
document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) closeChat(); });
document.querySelectorAll("[data-open-chat]").forEach(btn => btn.addEventListener("click", openChat));
form.addEventListener("submit", e => { e.preventDefault(); handleQuestion(input.value); });
document.querySelectorAll("#quick-replies button").forEach(btn => {
  btn.addEventListener("click", () => handleQuestion(btn.dataset.question));
});