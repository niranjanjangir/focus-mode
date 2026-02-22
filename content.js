let isEnabled = false;

const overlay = document.createElement('div');
overlay.id = 'focus-mode-overlay';
document.body.appendChild(overlay);
overlay.style.display = 'none';

// Listen for the toggle message from background.js
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggleFocusMode") {
    isEnabled = !isEnabled;
    overlay.style.display = isEnabled ? 'block' : 'none';
  }
});

document.addEventListener('mousemove', (e) => {
  if (!isEnabled) return;

  const mouseY = e.clientY;
  const focusHeight = 100;

  overlay.style.clipPath = `polygon(
    0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, 
    0% ${mouseY - focusHeight}px, 
    100% ${mouseY - focusHeight}px, 
    100% ${mouseY + focusHeight}px, 
    0% ${mouseY + focusHeight}px, 
    0% ${mouseY - focusHeight}px
  )`;
});