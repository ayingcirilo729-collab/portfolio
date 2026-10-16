// data/profile.js — YOUR info lives here. ✏️ Replace every value with your own.
// Used by BOTH chatbots: the rule-based bot (js/chatbot.js) and the AI (api/chat.js).
// ⚠️ This file is PUBLIC. Never add your home address, phone number, birthday,
// school ID, passwords, or API keys.
const profile = {
name: "Aying Cirilo", // EXAMPLE ONLY — change to your name
shortName: "Cirilo",
role: "Grade 12 student & aspiring web developer",
location: "Philippines",
about:
"I'm a Grade 12 ICT student who loves building things for the web. " +
"I'm currently a work immersion intern on a software and AI dev team.",
education: [
{
level: "Senior High School — ICT Strand",
school: "Sample Senior High School",
years: "2025 – 2027",
details: "Grade 12. Favorite subjects: programming and web design."
},
{
level: "Junior High School",
school: "Bagong Silangan HIGHSCHOOL",
years: "2021 – 2025",
details: "Helped fixing computers."
}
],
skills: ["HTML", "CSS", "JavaScript", "Git & GitHub", "Vercel", "Teamwork"],
learning: ["Responsive design", "APIs", "AI chatbots"],
projects: [
{
name: "Portfolio + Chatbot",
description: "This website! It has a chatbot that answers questions about me.",
tech: ["HTML", "CSS", "JavaScript", "Vercel"]
},
{
name: "OJT Journal",
description: "A Git repo where I log what I learn every day of my work immersion.",
tech: ["Git", "Markdown"]
},
{
name: "JavaScript Practice",
description: "Small exercises on variables, objects, functions, and DOM events.",
tech: ["JavaScript"]
}
],
hobbies: [ "mobile games", "playing basketball"],
goals: "I want to take up Computer Science in college and become a full-stack developer.",
ojt: "Work immersion intern (developer) with a software & AI dev team, Oct 12–30, 2026.",
contact: {
email: "ayingcirilo729@gmail.com", // use a school/public email only
github: "https://github.com/your-username"
}
};
export default profile;
