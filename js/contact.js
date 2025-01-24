// JavaScript file for Contact Page

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate form fields
        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Simulate form submission
        alert(`Thank you for reaching out, ${name}! Your message has been received.`);

        // Optionally reset the form
        form.reset();
    });
});
