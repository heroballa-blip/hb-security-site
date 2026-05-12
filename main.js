// ── COMPONENT LOADER ──
const components = [
  'nav/nav',
  'hero/hero',
  'skills/skills',
  'experience/experience',
  'projects/projects',
  'dashboard/dashboard',
  'certs/certs',
  'contact/contact'
];

async function loadComponent(componentPath) {
  try {
    const response = await fetch(`components/${componentPath}.html`);
    const html = await response.text();
    
    // Inject HTML into main content landmark
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const mainContainer = document.getElementById('main-content') || document.body;
    mainContainer.insertAdjacentElement('beforeend', doc.body.firstElementChild);
    
    // Load associated CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `components/${componentPath}.css`;
    document.head.appendChild(link);
  } catch (error) {
    console.error(`Failed to load component ${componentPath}:`, error);
  }
}

// Load all components in order
async function initializeApp() {
  for (const component of components) {
    await loadComponent(component);
  }
  
  // Load effects after all components are loaded
  const effectsScript = document.createElement('script');
  effectsScript.src = 'effects.js';
  document.body.appendChild(effectsScript);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);