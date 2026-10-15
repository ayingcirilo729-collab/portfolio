# Portfolio Starter (HTML · CSS · JavaScript + Chatbot)
A modern, responsive personal portfolio with a floating chatbot.
The sample content is for a fictional student, **Juan Dela Cruz**. Replace it with your own.
**Live site:** https://<your-project>.vercel.app ← ✏️ update after deploying
## Features
- Sticky navbar, mobile hamburger menu, smooth scrolling, active-link highlight
- Hero with gradient accents, About, Skills chips, Education timeline, Project cards, Contact, Footer
- Dark/light mode: follows your system setting, and remembers your choice (localStorage)
- Subtle scroll animations (turned off automatically for "reduce motion" users)
- Floating chatbot with typing dots and quick-reply buttons
- **Basic mode:** a rule-based bot (keywords → answers), always works
- **AI mode (optional):** a free OpenRouter model via a Vercel serverless function (`api/chat.js`)
## Files
| File | What it is | Edit it? |
|---|---|---|
| `index.html` | Page content and structure | ✏️ Yes: your text, projects, links |
| `css/style.css` | All styles. Colors are in `:root` and `[data-theme="dark"]` | ✏️ Colors and fonts |
| `js/main.js` | Theme toggle, menu, animations | Read it; edit only if you want to |
| `js/chatbot.js` | Chat UI, rule-based bot, AI call | ✏️ Keywords in `qa` |
| `data/profile.js` | **Your info**. Both bots answer from this | ✏️ Yes, everything |
| `api/chat.js` | Server code that calls OpenRouter (Vercel only) | No |
| `package.json` | Tells Vercel/Node to use ES modules | No |
| `.gitignore` | Keeps secrets like `.env` out of Git | No |
## 1. Run it on your laptop
1. Open the folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
(Double-clicking the file won't work, because the chatbot uses JS modules, which need a server.)
3. The chatbot shows **⚡ Basic mode** locally. That's expected, because `/api/chat` only runs on Vercel.
## 2. Make it yours (checklist)
- [ ] `index.html`: `<title>`, name, tagline, about text, quick facts, skills, timeline, projects, links,
footer
- [ ] `data/profile.js`: every value (name, education, skills, projects, hobbies, goals, contact)
- [ ] `css/style.css`: try new `--accent`, `--accent-2` colors (light **and** dark)
- [ ] `js/chatbot.js`: add more keywords to `qa` (English + Taglish)
- [ ] Logo initials ("JD") and the chat title ("Juan's Assistant")
- [ ] ⚠️ No home address, phone number, birthday, school ID, or private photos. Everything here is public.
## 3. Deploy to Vercel (free Hobby plan)
1. Push this folder to a GitHub repo named `portfolio`.
2. Go to vercel.com → sign up with **Continue with GitHub** → Hobby plan.
3. **Add New… → Project** → Import `portfolio` → Framework Preset: **Other** → **Deploy**.
4. Every `git push` to `main` re-deploys automatically.
## 4. Optional: turn on AI mode (Week 2)



1. Get an OpenRouter API key (your supervisor may give you one with a credit limit).
2. Vercel → Project → **Settings → Environment Variables**:
- `OPENROUTER_API_KEY` = your key (Production + Preview)
- optional `OPENROUTER_MODEL` = a model id ending in `:free` (check
https://openrouter.ai/models?max_price=0, because model ids change)
3. **Redeploy**: Deployments → latest → ⋯ → Redeploy. Env vars only apply to new deployments.
4. Open your live site → chat → the status shows **✨ AI mode**. If the AI is busy or rate-limited, the bot
uses Basic mode automatically.
> 🚨 **Never put API keys in your code, in this repo, in screenshots, or in chats.**
> The key lives only in Vercel's Environment Variables. If a key leaks, tell your supervisor right away so
it can be revoked.
## Built with
HTML, CSS (variables, Grid, Flexbox, media queries), JavaScript (ES modules, DOM, fetch), Vercel,
OpenRouter (optional)
## Author
Juan Dela Cruz (example). ✏️ Replace with your name. Grade 12 Work Immersion Intern, 2026