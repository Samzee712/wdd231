document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events-container");

    if (!eventsContainer) {
        console.error("Error: Events container not found.");
        return;
    }

    const events = [
        { name: "Business Networking Meetup", date: "2025-04-10", location: "Timbuktu Convention Center" },
        { name: "Economic Growth Summit", date: "2025-04-15", location: "City Hall" },
        { name: "Tech Startups Expo", date: "2025-04-20", location: "Innovation Hub" },
    ];

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

    function loadEvents() {
        eventsContainer.innerHTML = ""; // Clear existing content

        // Sort events by date (upcoming events first)
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        events.forEach((event, index) => {
            const eventItem = document.createElement("div");
            eventItem.classList.add("event-item");

            // Highlight the nearest upcoming event
            if (index === 0) {
                eventItem.classList.add("highlight-event"); // Add a special CSS class for emphasis
            }

            eventItem.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Date:</strong> ${formatDate(event.date)}</p>
                <p><strong>Location:</strong> ${event.location}</p>
            `;

            eventsContainer.appendChild(eventItem);
        });
    }

    loadEvents();
});
