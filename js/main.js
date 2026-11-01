// Theme toggle, footer year, active nav highlighting, and closing the mobile menu.

// ---------- Theme toggle ----------

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

// ---------- Footer year ----------

const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

// ---------- Active nav link ----------

// Highlight the nav link for the section currently in view.
const links = document.querySelectorAll(".site-nav .nav-link");

// Each nav link points at a section, so collect the sections the links point to.
const sections = [];
links.forEach((link) => {
  const section = document.querySelector(link.getAttribute("href"));
  if (section !== null) {
    sections.push(section);
  }
});

// Marks the link for the given section as active and clears the others.
function highlightLink(sectionId) {
  links.forEach((link) => {
    if (link.getAttribute("href") === "#" + sectionId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// The observer reports when a section enters or leaves the area it watches.
// The negative margins shrink that area to a thin strip near the middle of the
// screen, so a section counts as current when it crosses that strip.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      highlightLink(entry.target.id);
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach((section) => {
  observer.observe(section);
});

// ---------- Mobile menu ----------

// Close the mobile menu after picking a link.
const menu = document.getElementById("navLinks");

links.forEach((link) => {
  link.addEventListener("click", () => {
    // Bootstrap adds the "show" class to the menu while it's open.
    if (menu.classList.contains("show")) {
      // Bootstrap's collapse object is what opens and closes the menu.
      const collapse = bootstrap.Collapse.getOrCreateInstance(menu);
      collapse.hide();
    }
  });
});
