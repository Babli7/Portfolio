const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const show = category === "all" || card.dataset.category === category;
      card.style.display = show ? "block" : "none";
    });
  });
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:ah074023@gmail.com?subject=${subject}&body=${body}`;
  contactForm.reset();
});

const sections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.14 }
);

sections.forEach((section) => sectionObserver.observe(section));

const typingText = document.getElementById("typingText");
const typingLines = [
  "Passionate web developer crafting clean and user-friendly interfaces.",
  "Computer Science graduate with hands-on internship experience.",
  "Focused on modern frontend development and practical web solutions."
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const activeLine = typingLines[lineIndex];
  const visibleText = isDeleting
    ? activeLine.slice(0, charIndex--)
    : activeLine.slice(0, charIndex++);

  typingText.textContent = visibleText;

  let typingSpeed = isDeleting ? 28 : 45;

  if (!isDeleting && charIndex > activeLine.length + 1) {
    isDeleting = true;
    typingSpeed = 1100;
  }

  if (isDeleting && charIndex < 0) {
    isDeleting = false;
    lineIndex = (lineIndex + 1) % typingLines.length;
    typingSpeed = 280;
  }

  setTimeout(typeLoop, typingSpeed);
}

typeLoop();
