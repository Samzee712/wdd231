 // Parse URL parameters
 const urlParams = new URLSearchParams(window.location.search);
    
 // Display form data
 document.getElementById('display-fname').textContent = urlParams.get('first-name') || 'Not provided';
 document.getElementById('display-lname').textContent = urlParams.get('last-name') || 'Not provided';
 document.getElementById('display-email').textContent = urlParams.get('email') || 'Not provided';
 document.getElementById('display-phone').textContent = urlParams.get('phone') || 'Not provided';
 document.getElementById('display-business').textContent = urlParams.get('business-name') || 'Not provided';
 
 // Format timestamp
 const timestamp = urlParams.get('timestamp');
 const submissionDate = timestamp ? new Date(parseInt(timestamp)).toLocaleString() : 'Not available';
 document.getElementById('display-date').textContent = submissionDate; 