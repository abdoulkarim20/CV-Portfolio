(() => {
  const STORAGE_KEY = "portfolio-theme";

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const icon = document.querySelector("#themeToggle i");
    if (icon) {
      icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
    }
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
  }

  function initThemeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    applyTheme(getPreferredTheme());

    btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  function initYear() {
    const el = document.getElementById("currentYear");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function initSmoothAnchors() {
    function scrollToTarget(target, smooth = true) {
      const nav = document.querySelector(".mon-navbar");
      const navHeight = nav ? nav.offsetHeight : 0;
      const extraGap = 12;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - extraGap;
      window.scrollTo({ top: Math.max(top, 0), behavior: smooth ? "smooth" : "auto" });
    }

    document.addEventListener("click", (e) => {
      const a = e.target?.closest?.("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      scrollToTarget(target, true);
      history.pushState(null, "", href);
    });

    // Keep section position accurate when opening a URL with a hash.
    window.addEventListener("load", () => {
      if (!window.location.hash) return;
      const target = document.querySelector(window.location.hash);
      if (!target) return;
      scrollToTarget(target, false);
    });
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const nom = String(fd.get("nom") || "").trim();
      const prenoms = String(fd.get("prenoms") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const objet = String(fd.get("objet") || "").trim();
      const message = String(fd.get("message") || "").trim();

      const subject = encodeURIComponent(objet || "Contact depuis le portfolio");
      const body = encodeURIComponent(
        `Nom: ${nom}\nPrénoms: ${prenoms}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      // Fallback simple: ouvre le client mail.
      window.location.href = `mailto:abdoulkarimfoly1996@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  initThemeToggle();
  initYear();
  initSmoothAnchors();
  initContactForm();
})();

