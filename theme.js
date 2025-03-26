// theme.js

// Theme toggle
const toggleBtn = document.getElementById('mode-toggle');
const body = document.body;
toggleBtn?.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  toggleBtn.innerHTML = body.classList.contains('light-mode') ? '☀️' : '🌙';
});

document.querySelectorAll('.nav-animated').forEach(button => {
    button.addEventListener('mousemove', e => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      button.style.setProperty('--mouse-x', `${x}px`);
      button.style.setProperty('--mouse-y', `${y}px`);
    });
  });
  

// Flip card (only if present)
const flipCard = document.getElementById('flipCard');
if (flipCard) {
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    flipCard.addEventListener('click', () => {
      flipCard.classList.toggle('flipped');
    });
  } else {
    flipCard.addEventListener('mouseleave', () => {
      flipCard.classList.remove('flipped');
    });
  }
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// AOS animation
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: true,
  });
});

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
  
    if (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
  
        const formData = new FormData(form);
        const action = form.getAttribute("action");
  
        try {
          const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          });
  
          if (response.ok) {
            alert("Thanks for the message! I will get back to you shortly.");
            form.reset();
          } else {
            alert("Oops! There was a problem submitting your form.");
          }
        } catch (error) {
          alert("Something went wrong. Please try again later.");
        }
      });
    }
  });
  