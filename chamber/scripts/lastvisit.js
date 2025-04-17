document.addEventListener('DOMContentLoaded', () => {
  try {
    const visitorMessage = document.getElementById('visitor-message');
    if (!visitorMessage) return;

    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    // Message content
    let messageContent = '';
    if (!lastVisit) {
      messageContent = '<p>Welcome! Let us know if you have any questions.</p>';
    } else {
      const daysSince = Math.floor((currentDate - Number(lastVisit)) / oneDay);
      messageContent = daysSince === 0 
        ? '<p>Back so soon! Awesome!</p>' 
        : `<p>You last visited ${daysSince} ${daysSince === 1 ? 'day' : 'days'} ago.</p>`;
    }

    // Inject message
    const messageParagraph = document.createElement('div');
    messageParagraph.innerHTML = messageContent;
    visitorMessage.prepend(messageParagraph);

    // Close button functionality
    const closeBtn = visitorMessage.querySelector('.close-message');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        visitorMessage.style.display = 'none';
      });
    }

    // Store visit
    localStorage.setItem('lastVisit', currentDate);

  } catch (error) {
    console.error('Visit tracking error:', error);
  }
   // Add a class to visitor messages containing "Welcome"
   document.querySelectorAll('.visitor-message p').forEach(message => {
    if (message.textContent.includes('Welcome')) {
      message.parentElement.classList.add('welcome-message');
    }
  });
});