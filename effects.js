// ── SYSTEM INITIALIZATION & EFFECTS ──

// Boot sequence effect on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add boot animation to body
  const bodyElement = document.body;
  bodyElement.style.opacity = '0';
  
  setTimeout(() => {
    bodyElement.style.transition = 'opacity 0.8s ease';
    bodyElement.style.opacity = '1';
  }, 100);

  // Add glow effect to section labels
  const sectionLabels = document.querySelectorAll('.section-label');
  sectionLabels.forEach((label, index) => {
    label.style.animation = `fadeUp 0.6s ease forwards`;
    label.style.animationDelay = `${index * 0.1}s`;
  });

  // Add hover glow effect to all interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-links a, .contact-link');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.textShadow = '0 0 10px rgba(255, 165, 0, 0.5)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.textShadow = 'none';
    });
  });

  // Add subtle pulse to dashboard status indicators
  const dashDots = document.querySelectorAll('.dash-dot');
  dashDots.forEach(dot => {
    dot.style.animation = 'pulse 2s infinite';
  });

  // Initialize scroll-based reveal with enhanced effects
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.filter = 'drop-shadow(0 0 15px rgba(255, 165, 0, 0.1))';
        
        // Remove filter after animation
        setTimeout(() => {
          entry.target.style.filter = 'none';
        }, 600);
      }
    });
  }, { threshold: 0.1 });

  // Observe all cards for reveal animation
  const cards = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .cert-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, filter 0.5s ease';
    observer.observe(card);
  });

  // Add scanline effect overlay
  const scanlineOverlay = document.createElement('div');
  scanlineOverlay.className = 'scanline-overlay';
  scanlineOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    background-image: repeating-linear-gradient(
      0deg,
      rgba(255, 165, 0, 0.015),
      rgba(255, 165, 0, 0.015) 1px,
      transparent 1px,
      transparent 2px
    );
    background-size: 100% 4px;
    animation: scanlineScroll 8s linear infinite;
  `;
  document.body.appendChild(scanlineOverlay);

  // Add keyframe animation for scanlines
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scanlineScroll {
      0% { transform: translateY(0); }
      100% { transform: translateY(10px); }
    }
  `;
  document.head.appendChild(style);
});

// Smooth page transitions
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0.8';
});

// Add keyboard shortcuts for accessibility
document.addEventListener('keydown', (e) => {
  // Ctrl+K to jump to contact
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Alt+H to jump to hero
  if (e.altKey && e.key === 'h') {
    e.preventDefault();
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Parallax effect on mousemove for hero section
const heroSection = document.getElementById('hero');
if (heroSection) {
  document.addEventListener('mousemove', (e) => {
    const scanLine = heroSection.querySelector('.scan-line');
    if (scanLine) {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      scanLine.style.transform = `translateY(calc(-50% + ${y}px)) translateX(${x}px)`;
    }
  });
}