// js/main.js — page behavior: theme toggle, mobile menu, sticky nav, animations.
// You usually don't need to edit this file. Read it to learn how it works!
const root = document.documentElement;
// ---------- 1. Dark / light mode ----------
// The <head> script already picked a theme (saved choice OR the system setting).
const themeToggle = document.getElementById("theme-toggle");
function setTheme(theme) {
root.dataset.theme = theme;
themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}
setTheme(root.dataset.theme || "light");
themeToggle.addEventListener("click", function () {
const next = root.dataset.theme === "dark" ? "light" : "dark";
setTheme(next);
localStorage.setItem("theme", next); // remember the visitor's choice
});
// If the visitor never clicked the toggle, follow the system setting live
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
if (!localStorage.getItem("theme")) {
setTheme(event.matches ? "dark" : "light");
}
});
