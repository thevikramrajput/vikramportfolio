/* ============================================
   CUSTOM CURSOR — Navy Crosshair (Default) + Cyan Crosshair (Hover)
   ============================================ */

(function() {
  // ── Create cursor SVG as data URI ──
  const navyCrosshair = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cline x1='7' y1='0' x2='7' y2='5' stroke='%23003CD6' stroke-width='1.5'/%3E%3Cline x1='7' y1='9' x2='7' y2='14' stroke='%23003CD6' stroke-width='1.5'/%3E%3Cline x1='0' y1='7' x2='5' y2='7' stroke='%23003CD6' stroke-width='1.5'/%3E%3Cline x1='9' y1='7' x2='14' y2='7' stroke='%23003CD6' stroke-width='1.5'/%3E%3C/svg%3E") 7 7, crosshair`;

  const cyanCrosshair = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 14 14'%3E%3Cline x1='7' y1='0' x2='7' y2='5' stroke='%2300C2FF' stroke-width='1.5'/%3E%3Cline x1='7' y1='9' x2='7' y2='14' stroke='%2300C2FF' stroke-width='1.5'/%3E%3Cline x1='0' y1='7' x2='5' y2='7' stroke='%2300C2FF' stroke-width='1.5'/%3E%3Cline x1='9' y1='7' x2='14' y2='7' stroke='%2300C2FF' stroke-width='1.5'/%3E%3C/svg%3E") 9 9, crosshair`;

  // ── Trailing dot ──
  const trail = document.createElement('div');
  trail.id = 'cursor-trail';

  const style = document.createElement('style');
  style.textContent = `
    * { cursor: ${navyCrosshair} !important; }

    #cursor-trail {
      position: fixed;
      top: 0;
      left: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #003CD6;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: left 0.1s ease-out, top 0.1s ease-out, opacity 0.3s ease, width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
      opacity: 0.6;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(trail);

  // ── Track mouse ──
  document.addEventListener('mousemove', (e) => {
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.opacity = '0.6';
  });

  // ── Hover: switch to cyan + scale ──
  const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], .project-card, .stack-card, .timeline__card, .about__pointer, .contact__social-card, .nav__link';

  const hoverStyle = document.createElement('style');
  hoverStyle.id = 'cursor-hover-style';
  document.head.appendChild(hoverStyle);

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      hoverStyle.textContent = `
        * { cursor: ${cyanCrosshair} !important; }
        #cursor-trail {
          background: #00C2FF !important;
          width: 10px;
          height: 10px;
          opacity: 0.8;
        }
      `;
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      hoverStyle.textContent = '';
    }
  });

  // ── Fade trail when idle ──
  let idleTimer;
  document.addEventListener('mousemove', () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      trail.style.opacity = '0';
    }, 600);
  });

  document.addEventListener('mouseleave', () => { trail.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { trail.style.opacity = '0.6'; });
})();
