// Move the arrow indicator down the shaft as the user scrolls
const arrowHead = document.querySelector('.arrow-head');

function updateArrowPosition() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  if (arrowHead) {
    arrowHead.style.top = `${progress * 100}%`;
  }
}

window.addEventListener('scroll', updateArrowPosition);
window.addEventListener('resize', updateArrowPosition);
updateArrowPosition();

// Basic join form handling (placeholder — connect to a real backend/Form service later)
const joinForm = document.querySelector('.join-form');
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = joinForm.querySelector('#name').value;
    alert(`Thanks, ${name}! Your application has been noted. (Connect this form to Google Forms, Formspree, or a backend to actually receive submissions.)`);
    joinForm.reset();
  });
}

// ---------- Custom Arrow Cursor ----------
const cursor = document.getElementById('customCursor');
const trail = document.getElementById('cursorTrail');

// Always initialize cursor tracking; CSS media queries handle hiding it
// on touch-only devices. Relying on matchMedia('pointer: fine') here was
// unreliable across some laptop trackpads/browsers and silently skipped
// the whole feature on desktop in some cases.
if (cursor && trail) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let trailX = mouseX;
  let trailY = mouseY;
  let lastX = mouseX;
  let lastY = mouseY;
  let currentAngle = -45; // default arrow heading (pointing up-right)

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hide cursor only when it actually leaves the browser window
  document.documentElement.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity = '0';
  });
  document.documentElement.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    trail.style.opacity = '0.35';
  });

  // Rotate the arrow to face the direction of travel
  function updateCursor() {
    const dx = mouseX - lastX;
    const dy = mouseY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only update angle when actually moving, to avoid jitter when still
    if (distance > 1.5) {
      const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      currentAngle = targetAngle;
    }

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    cursor.style.transform = `translate(-50%, -50%) rotate(${currentAngle + 45}deg)`;

    // Trailing dot eases toward the cursor position for a "comet tail" feel
    trailX += (mouseX - trailX) * 0.18;
    trailY += (mouseY - trailY) * 0.18;
    trail.style.left = `${trailX}px`;
    trail.style.top = `${trailY}px`;

    lastX = mouseX;
    lastY = mouseY;

    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // Slightly enlarge the cursor when hovering interactive elements
  const interactiveSelectors = 'a, button, input, select, .btn, label';
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
}