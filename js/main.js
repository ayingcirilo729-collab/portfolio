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
// ---------- 2. Mobile menu (hamburger) ----------
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
menuBtn.addEventListener("click", function () {
const isOpen = navLinks.classList.toggle("open");
menuBtn.setAttribute("aria-expanded", String(isOpen));
});
// Close the menu after tapping a link
navLinks.querySelectorAll("a").forEach(function (link) {
link.addEventListener("click", function () {
navLinks.classList.remove("open");
menuBtn.setAttribute("aria-expanded", "false");
});
});
// ---------- 3. Navbar shadow when scrolling ----------
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
navbar.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });
// ---------- 4. Highlight the nav link of the section on screen ----------
const sections = document.querySelectorAll("main section[id]");
const linkFor = {};
navLinks.querySelectorAll("a").forEach(function (a) {
linkFor[a.getAttribute("href").slice(1)] = a;
});
const sectionObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return;
Object.values(linkFor).forEach(function (l) { l.classList.remove("active"); });
const link = linkFor[entry.target.id]; // the hero has no link, so nothing is highlighted there
if (link) link.classList.add("active");
});
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(function (s) { sectionObserver.observe(s); });
// ---------- 5. Fade-in animation when elements scroll into view ----------
const revealObserver = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
revealObserver.unobserve(entry.target); // animate only once
}
});
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });
// ---------- 6. Current year in the footer ----------
document.getElementById("year").textContent = new Date().getFullYear();