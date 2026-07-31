(() => {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  const header = document.querySelector(".site-header");
  const setHeaderHeight = () => {
    if (!header) return;
    document.documentElement.style.setProperty(
      "--header-h",
      `${header.offsetHeight}px`
    );
  };
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  const onScroll = () => {
    if (!header) return;
    header.style.boxShadow =
      window.scrollY > 8 ? "0 10px 30px rgba(11, 46, 42, 0.06)" : "none";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const sections = document.querySelectorAll(".section, .site-footer");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((section) => {
      section.classList.add("will-reveal");
      io.observe(section);
    });
  }

  const title = document.querySelector(".brand-hero");
  const subhead = document.querySelector(".hero-subhead");

  const fitSubheadTracking = () => {
    if (!title || !subhead) return;

    const target = title.getBoundingClientRect().width;
    if (!target) return;

    subhead.style.width = `${target}px`;
    subhead.style.letterSpacing = "0px";

    if (subhead.scrollWidth > target) {
      // Already wider than the title: keep snug tracking, allow wrap.
      subhead.style.whiteSpace = "normal";
      subhead.style.letterSpacing = "0.01em";
      return;
    }

    subhead.style.whiteSpace = "nowrap";

    let lo = 0;
    let hi = 24;
    for (let i = 0; i < 24; i += 1) {
      const mid = (lo + hi) / 2;
      subhead.style.letterSpacing = `${mid}px`;
      if (subhead.scrollWidth > target) hi = mid;
      else lo = mid;
    }

    subhead.style.letterSpacing = `${Math.max(0, lo)}px`;
  };

  const scheduleFit = () => {
    window.requestAnimationFrame(fitSubheadTracking);
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleFit);
  } else {
    scheduleFit();
  }

  window.addEventListener("resize", scheduleFit);
})();
