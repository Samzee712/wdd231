document.addEventListener("DOMContentLoaded", () => {
    const spotlightContainer = document.getElementById("spotlight-container");
    const jsonUrl = "../chamber/data/members.json"; // Update with actual JSON file path

    async function fetchMembers() {
        try {
            const response = await fetch(jsonUrl);
            const members = await response.json();

            // Filter for Gold (1) and Silver (2) members
            const eligibleMembers = members.filter(member => member.membership === 1 || member.membership === 2);

            // Randomly select 3 members
            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = shuffled.slice(0, 3);

            displaySpotlights(selectedMembers);
        } catch (error) {
            console.error("Error fetching spotlight members:", error);
        }
    }

    function displaySpotlights(selectedMembers) {
        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            memberCard.innerHTML = `
                <img src="${member.imageurl}" alt="${member.name} Logo">
                <h2>${member.name}</h2>
                <p><strong>📍 Address:</strong> ${member.address}</p>
                <p><strong>📞 Phone:</strong> ${member.phone}</p>
                <p><a href="${member.website}" target="_blank">🌐 Visit Website</a></p>
                <span class="membership-level">${member.membership === 1 ? "Gold" : "Silver"} Member</span>
            `;

            spotlightContainer.appendChild(memberCard);
        });
    }

    fetchMembers();
});
