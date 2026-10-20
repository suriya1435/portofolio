// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections as they enter the viewport
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Dynamic footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: prepares a message in the visitor's default email app.
// Change CONTACT_EMAIL to your real email address before publishing.
const CONTACT_EMAIL = "your.email@example.com";
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Hi Suriya,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

// Keep email displayed in the contact section consistent with CONTACT_EMAIL.
const emailLink = document.getElementById("emailLink");
emailLink.href = `mailto:${CONTACT_EMAIL}`;
emailLink.textContent = `${CONTACT_EMAIL} ↗`;

// Warn gently if the placeholder résumé has not been added.
const resumeLink = document.getElementById("resumeDownload");
resumeLink.addEventListener("click", (event) => {
  if (resumeLink.getAttribute("href").includes("Suriya%20V_Resume.pdf")) {
    document.getElementById("resumeHint").textContent =
      "If the download fails, confirm that assets/Suriya V_Resume.pdf exists on the server.";
  }
});
