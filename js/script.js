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