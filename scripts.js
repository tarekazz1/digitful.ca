// All functionality executes once the DOM is fully loaded.

/**
 * Initialize typewriter effect for the homepage
 */
function initTypewriter() {
  const typewriter = document.getElementById('typewriter');
  if (!typewriter) return; // Only run on pages with the typewriter element

  const fullText = "You've tried the hacks. Guesswork ends here."; // Text to be typed

  // Check if the user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // If reduced motion is preferred, display the full text immediately
    typewriter.textContent = fullText;
  } else {
    // Otherwise, start typing the text character by character
    typewriter.textContent = '';
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        typewriter.textContent += fullText.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
  }
}

/**
 * Initialize toggle buttons for the contact form
 */
function initToggleButtons() {
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  if (toggleButtons.length === 0) return; // Only run on pages with toggle buttons

  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const isPressed = this.classList.toggle('selected');
      // Update aria-pressed attribute for accessibility
      this.setAttribute('aria-pressed', isPressed);
      // Force repaint by briefly toggling the animation
      this.style.animation = 'none';
      requestAnimationFrame(() => {
        this.style.animation = '';
      });
      this.blur(); // optional, removes lingering focus state
    });
  });

  // Automatically toggle the button based on the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    const targetButton = document.querySelector(`.toggle-btn[data-value="${serviceParam}"]`);
    if (targetButton) {
      targetButton.classList.add('selected');
      targetButton.setAttribute('aria-pressed', 'true');
    }
  }
  
  // Add form submission handler to collect toggle button values
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Get all selected help_with buttons
      const helpWithButtons = document.querySelectorAll('fieldset:first-of-type .toggle-btn.selected');
      const helpWithValues = Array.from(helpWithButtons).map(btn => btn.dataset.value).join(', ');
      
      // Get all selected goals buttons
      const goalsButtons = document.querySelectorAll('fieldset:nth-of-type(2) .toggle-btn.selected');
      const goalsValues = Array.from(goalsButtons).map(btn => btn.dataset.value).join(', ');
      
      // Set the hidden input values
      document.getElementById('help_with').value = helpWithValues;
      document.getElementById('goals').value = goalsValues;
    });
  }
}

/**
 * Initialize particles.js background effect
 */
function initParticles() {
  // Initialize Particles.js if available and if reduced motion is not preferred
  if (window.particlesJS && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 600) {
    try {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "opacity": {
            "value": 0.2,
            "random": true
          },
          "size": {
            "value": 3,
            "random": true
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.1,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2
          }
        },
        "interactivity": {
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            }
          }
        }
      });
      console.log('Particles.js initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Particles.js:', error);
      // Fallback: Add a simple class to the background for a minimal effect
      const particlesContainer = document.getElementById('particles-js');
      if (particlesContainer) {
        particlesContainer.classList.add('particles-fallback');
      }
    }
  } else if (window.innerWidth <= 600) {
    // On mobile, add the fallback class without trying to initialize particles
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
      particlesContainer.classList.add('particles-fallback');
    }
  }
}

/**
 * Main initialization function
 * This is the entry point for all JavaScript functionality.
 * It ensures that all components are initialized after the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initTypewriter();  // Initialize typewriter effect on the homepage
  initToggleButtons(); // Initialize toggle buttons on the contact form
  initParticles();   // Initialize particles.js background effect
});

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (
      !hamburger.contains(e.target) &&
      !mobileNav.contains(e.target) &&
      mobileNav.classList.contains('active')
    ) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    }
  });
}

