document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events-container"); // Updated ID

    const events = [
        { name: "Business Networking Meetup", date: "2025-04-10", location: "Timbuktu Convention Center" },
        { name: "Economic Growth Summit", date: "2025-04-15", location: "City Hall" },
        { name: "Tech Startups Expo", date: "2025-04-20", location: "Innovation Hub" },
    ];

    function loadEvents() {
        eventsContainer.innerHTML = ""; // Clear existing content
        events.forEach(event => {
            const eventItem = document.createElement("div");
            eventItem.classList.add("event-item");
            eventItem.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
            `;
            eventsContainer.appendChild(eventItem);
        });
    }

    loadEvents();
});
