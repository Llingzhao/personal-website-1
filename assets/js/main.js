/* Ling Zhao — Personal Academic Website
   Mobile navigation, scroll-reveal animations, and the photo lightbox. */

(function () {
  "use strict";

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var links  = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✕" : "☰";
    });
    // Close the menu when a link is tapped
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Lightbox (beyond.html gallery) ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg    = document.getElementById("lb-img");
  var lbCap    = document.getElementById("lb-cap");
  var lbClose  = lightbox ? lightbox.querySelector(".lb-close") : null;

  function openLightbox(item) {
    var img = item.querySelector("img");
    var cap = item.querySelector(".g-cap");
    if (!img) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = cap ? cap.textContent : img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (lightbox && lbImg && lbClose) {
    document.querySelectorAll(".g-item").forEach(function (item) {
      item.addEventListener("click", function () { openLightbox(item); });
    });
    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  /* ---------- Music marquee (JS-driven seamless loop) ---------- */
  var reducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) {
    document.querySelectorAll(".marquee-track").forEach(function (track) {
      var group = track.querySelector(".marquee-group");
      if (!group) return;
      var dir = track.getAttribute("data-dir") === "right" ? 1 : -1;
      var half = group.getBoundingClientRect().width;
      var x = dir === 1 ? -half : 0;
      var paused = false;
      var marquee = track.closest(".marquee");
      if (marquee) {
        marquee.addEventListener("mouseenter", function () { paused = true; });
        marquee.addEventListener("mouseleave", function () { paused = false; });
      }
      var last = performance.now();
      var SPEED = 45; // px per second
      function tick(now) {
        var dt = (now - last) / 1000;
        last = now;
        if (half > 0) {
          if (!paused) {
            x += dir * SPEED * dt;
            if (dir === -1 && -x >= half) x += half;
            if (dir === 1 && x >= 0) x -= half;
            track.style.transform = "translateX(" + x + "px)";
          }
        }
        requestAnimationFrame(tick);
      }
      window.addEventListener("resize", function () {
        half = group.getBoundingClientRect().width;
      });
      requestAnimationFrame(tick);
    });
  }

  /* ---------- Active nav highlighting (works on any page) ---------- */
  var path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) {
      document.querySelectorAll(".nav-links a").forEach(function (x) { x.classList.remove("active"); });
      a.classList.add("active");
    }
  });
})();
