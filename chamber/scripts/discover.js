document.addEventListener('DOMContentLoaded', () => {
  // Ensure the container's ID in your HTML is 'attractions-container'
  fetch('../chamber/data/discover.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('attractions-container');
      if (!container) {
        console.error("Container with ID 'attractions-container' not found.");
        return;
      }
      data.attractions.forEach(attraction => {
        const card = document.createElement('article');
        card.className = 'attraction-card';
        // Use the image property directly since JSON contains the full path
        card.innerHTML = `
          <figure>
            <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
          </figure>
          <h2>${attraction.name}</h2>
          <address>${attraction.address}</address>
          <p>${attraction.description}</p>
          <button>Learn More</button>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading discover JSON data:", error));

});
