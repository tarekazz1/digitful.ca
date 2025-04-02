document.addEventListener('DOMContentLoaded', function() {
  // Typewriter effect
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    const fullText = "You’ve tried the hacks. Guesswork ends here.";
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typewriter.textContent = fullText;
    } else {
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
  
  // Toggle Button Functionality for Contact Form - FIXED FOR MOBILE
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const helpWithInput = document.getElementById('help_with');
  const goalsInput = document.getElementById('goals');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
      this.classList.toggle('selected');
  
      // Force repaint by briefly toggling the animation
      this.style.animation = 'none';
      requestAnimationFrame(() => {
        this.style.animation = '';
      });
      this.blur();
  
      // Get parent fieldset legend
      const parentLegend = this.closest('fieldset').querySelector('legend').textContent.toLowerCase();
  
      const selectedValues = [...this.closest('.toggle-buttons').querySelectorAll('.toggle-btn.selected')]
        .map(btn => btn.dataset.value)
        .join(', ');
  
      if (parentLegend.includes('help')) {
        helpWithInput.value = selectedValues;
      } else if (parentLegend.includes('improve')) {
        goalsInput.value = selectedValues;
      }
    });
  });  
  // Automatically toggle the button based on the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    const targetButton = document.querySelector(`.toggle-btn[data-value="${serviceParam}"]`);
    if (targetButton) {
      targetButton.classList.add('selected');
    }
    // Store selected toggle values into hidden inputs
    const helpWithInput = document.getElementById('help_with');
    const goalsInput = document.getElementById('goals');

    const fieldsets = document.querySelectorAll('fieldset');

    fieldsets.forEach(fieldset => {
      const legend = fieldset.querySelector('legend');
      const toggleBtns = fieldset.querySelectorAll('.toggle-btn');

      toggleBtns.forEach(button => {
        button.addEventListener('click', () => {
          const selectedValues = [...fieldset.querySelectorAll('.toggle-btn.selected')]
            .map(btn => btn.dataset.value)
            .join(', ');

          if (legend.textContent.toLowerCase().includes('help')) {
            helpWithInput.value = selectedValues;
          } else if (legend.textContent.toLowerCase().includes('improve')) {
            goalsInput.value = selectedValues;
          }
        });
      });
    });
  }

  // Initialize Particles.js if available and if reduced motion is not preferred
  if (window.particlesJS && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 600) {
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
  }
})