// Open modal with keyboard support
function openModal(id) {
    let modal = document.getElementById(id);
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");

    // Focus on first element inside modal
    modal.querySelector("h3").focus();
}

// Close modal with Escape key
function closeModal(id) {
    let modal = document.getElementById(id);
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
}

// Add event listener for keyboard navigation
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        });
    }
});

// Auto-fill timestamp when page loads
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("timestamp").value = new Date().toISOString();
});
