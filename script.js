// ===============================
// SMOOTH SCROLL
// ===============================
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  });
}

// ===============================
// TYPING ANIMATION
// ===============================
const textArray = [
  "Full Stack Developer",
  "Building Modern Web Apps",
  "Turning Ideas Into Reality",
];

let textIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  if (textIndex >= textArray.length) textIndex = 0;

  if (!isDeleting && charIndex <= textArray[textIndex].length) {
    currentText = textArray[textIndex].substring(0, charIndex++);
  } else if (isDeleting && charIndex >= 0) {
    currentText = textArray[textIndex].substring(0, charIndex--);
  }

  document.getElementById("typing").textContent = currentText;

  if (charIndex === textArray[textIndex].length) {
    isDeleting = true;
    setTimeout(() => {}, 800);
  }

  if (charIndex === 0 && isDeleting) {
    isDeleting = false;
    textIndex++;
  }

  setTimeout(typeEffect, isDeleting ? 70 : 120);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// ===============================
// PROJECT MODAL
// ===============================
function openModal(title, desc) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = desc;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// ===============================
// CONTACT FORM - PRO FETCH
// ===============================
const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const button = form.querySelector("button");
  button.innerHTML = "Sending...";
  button.disabled = true;

  try {
    const res = await fetch("https://devsani-backend.onrender.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert("🚀 Message sent successfully!");
      form.reset();
    } else {
      alert(data.message || "Error sending message");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Make sure backend is running.");
  }

  button.innerHTML = "Send Message";
  button.disabled = false;
});