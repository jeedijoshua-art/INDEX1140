// momjava.js – Handles interactions for formjava.html
'use strict';  // Helps catch errors and forces safer JavaScript rules

const nameInput = document.getElementById('name');             // Text box for name
const ratingSelect = document.getElementById('rating');        // Dropdown for rating
const submitBtn = document.getElementById('submitBtn');        // Submit button
const feedbackForm = document.getElementById('feedbackForm');  // The whole form
const ratingDisplay = document.getElementById('rating-display'); // Area to show selected rating
const thankyouMessage = document.getElementById('thankyou-message'); // Area to show thank-you text

// Get the main heading (h1 with class="white")
const heading = document.querySelector('h1.white');


let messageShown = false;

function showSelectedRating() {
    if (!ratingSelect) return; // If dropdown not found, stop
    const val = ratingSelect.value; // Get selected rating value

    // If valid rating selected, show it. If not, clear text.
    ratingDisplay.textContent = val && val !== 'select'
        ? `Selected rating: ${val}`
        : '';
}


function showThankYou(e) {
    if (e) e.preventDefault(); // Stop form from reloading the page
    if (messageShown) return;  // Prevent showing the message twice

    // Get user's name (or 'Guest' if empty)
    const name = nameInput && nameInput.value ? nameInput.value.trim() : 'Guest';

    // Get rating (or 'No rating' if nothing chosen)
    const rating = ratingSelect && ratingSelect.value && ratingSelect.value !== 'select'
        ? ratingSelect.value
        : 'No rating';

    // Display final thank-you message
    thankyouMessage.textContent = `Thank you, ${name}! You rated the cooking: ${rating}.`;

    // Set flag so message doesn't repeat
    messageShown = true;

    // Optional: clear the form after submission
    // feedbackForm.reset();
}

//-----------------------------------------------
// 🔹 5. Name field focus and blur events
//-----------------------------------------------
if (nameInput) {
    // When user clicks in the name box
    nameInput.addEventListener('focus', function () {
        nameInput.classList.add('highlight');   // Add a CSS class to highlight
        if (heading) heading.style.color = '#ff6f61'; // Change heading color
    });

    // When user clicks outside the name box
    nameInput.addEventListener('blur', function () {
        nameInput.classList.remove('highlight'); // Remove highlight
        if (heading) heading.style.color = '';   // Reset heading color
    });
}

//-----------------------------------------------
// 🔹 6. Rating dropdown change event
//-----------------------------------------------
if (ratingSelect) {
    ratingSelect.addEventListener('change', function () {
        showSelectedRating(); // Update displayed rating instantly
    });
}

//-----------------------------------------------
// 🔹 7. Submit button click event
//-----------------------------------------------
if (submitBtn) {
    submitBtn.addEventListener('click', function (ev) {
        ev.preventDefault(); // Stop form from navigating away
        showThankYou();      // Show thank-you message
    });
}

//-----------------------------------------------
// 🔹 8. Handle full form submission (Enter key)
//-----------------------------------------------
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (ev) {
        ev.preventDefault(); // Prevent page reload
        showThankYou();      // Show thank-you message
    });
}

//-----------------------------------------------
// 🔹 9. When the page loads, show initial rating
//-----------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    showSelectedRating(); // Run once on load
});
