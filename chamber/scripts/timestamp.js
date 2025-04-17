// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Display form data
document.getElementById('display-fname').textContent = urlParams.get('first-name') || 'Not provided';
document.getElementById('display-lname').textContent = urlParams.get('last-name') || 'Not provided';
document.getElementById('display-email').textContent = urlParams.get('email') || 'Not provided';
document.getElementById('display-phone').textContent = urlParams.get('phone') || 'Not provided';
document.getElementById('display-business').textContent = urlParams.get('business-name') || 'Not provided';


// Format timestamp with proper options
const timestamp = urlParams.get('timestamp');
if (timestamp) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    try {
        const date = new Date(parseInt(timestamp));
        if (isNaN(date)) throw new Error('Invalid timestamp');
        document.getElementById('display-date').textContent = date.toLocaleString('en-US', options);
    } catch (error) {
        console.error('Date parsing error:', error);
        document.getElementById('display-date').textContent = 'Invalid date format';
    }
} else {
    document.getElementById('display-date').textContent = 'No timestamp provided';
}

