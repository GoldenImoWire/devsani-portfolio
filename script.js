  // Smooth scroll to contact section
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Typing headline animation
const textArray = [
  "Full Stack Developer",
  "Building Modern Web Apps",
  "Turning Ideas Into Reality"
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

  if (charIndex === textArray[textIndex].length) isDeleting = true;
  if (charIndex === 0 && isDeleting) {
    isDeleting = false;
    textIndex++;
  }

  setTimeout(typeEffect, isDeleting ? 80 : 120);
}
typeEffect();

// Modal project popups
function openModal(title, desc) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = desc;
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Contact form submission (frontend demo)
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Show loading spinner effect
  const button = this.querySelector("button");
  button.innerHTML = "Sending...";
  button.disabled = true;

  setTimeout(() => {
    alert("Message received. Dev|Sani will contact you soon.");
    button.innerHTML = "Send Message";
    button.disabled = false;
    this.reset();
  }, 1500);
});

document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;

  const button = this.querySelector("button");
  button.innerHTML = "Sending...";
  button.disabled = true;

  try {
    const response = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      alert("Message sent successfully! Dev|Sani will contact you soon.");
      this.reset();
    } else {
      alert("Oops! Something went wrong. Try again later.");
    }
  } catch (error) {
    alert("Error sending message. Please check your connection.");
  }

  button.innerHTML = "Send Message";
  button.disabled = false;
});