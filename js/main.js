// Theme toggle, footer year, and active nav highlighting.

(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const KEY = "theme";

  const getStored = () => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  };
  const store = (value) => {
    try { localStorage.setItem(KEY, value); } catch { /* storage unavailable */ }
  };

  const applyTheme = (theme) => {
    root.setAttribute("data-bs-theme", theme);
    const next = theme === "dark" ? "light" : "dark";
    toggle.textContent = next[0].toUpperCase() + next.slice(1);
    toggle.setAttribute("aria-label", `Switch to ${next} mode`);
  };

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(getStored() ?? (prefersLight ? "light" : "dark"));

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    store(next);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Highlight the nav link for the section currently in view.
  const links = [...document.querySelectorAll(".site-nav .nav-link")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach((section) => observer.observe(section));

  // Close the mobile menu after picking a link.
  const menu = document.getElementById("navLinks");
  links.forEach((link) =>
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    })
  );
})();
