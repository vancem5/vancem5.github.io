// Theme toggle, footer year, and active nav highlighting.

(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const THEME_KEY = "theme";

  // Reading and writing saved settings can fail (for example in a private window),
  // so both are wrapped in try/catch and the site works without them.
  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      // The choice just won't be remembered.
    }
  }

  // Applies a theme to the page. The button offers the opposite theme.
  function showTheme(theme) {
    root.setAttribute("data-bs-theme", theme);

    if (theme === "dark") {
      toggle.textContent = "Light";
      toggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      toggle.textContent = "Dark";
      toggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  // Start with the saved theme. If there isn't one, follow the visitor's system setting.
  let startingTheme = getSavedTheme();
  if (startingTheme === null) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      startingTheme = "light";
    } else {
      startingTheme = "dark";
    }
  }
  showTheme(startingTheme);

  toggle.addEventListener("click", () => {
    let nextTheme;
    if (root.getAttribute("data-bs-theme") === "dark") {
      nextTheme = "light";
    } else {
      nextTheme = "dark";
    }

    showTheme(nextTheme);
    saveTheme(nextTheme);
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
