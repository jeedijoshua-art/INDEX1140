// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form elements
    const nameField = document.getElementById('name');
    const departmentSelect = document.getElementById('department');
    const submitBtn = document.querySelector('.btn-primary');
    const formHeading = document.querySelector('.header h1');
    
    // Create display areas for messages
    const ratingDisplay = document.createElement('div');
    ratingDisplay.id = 'rating-display';
    ratingDisplay.style.cssText = 'margin-top: 10px; color: #4a90e2; font-weight: bold; font-size: 14px;';
    departmentSelect.parentNode.appendChild(ratingDisplay);
    
    const thankYouMessage = document.createElement('div');
    thankYouMessage.id = 'thank-you-message';
    thankYouMessage.style.cssText = 'margin-top: 15px; padding: 15px; background: #d4edda; color: #155724; border-radius: 6px; display: none;';
    submitBtn.parentNode.appendChild(thankYouMessage);
    
    // Name field focus - highlight it
    nameField.onfocus = function() {
        this.style.backgroundColor = '#fff3cd';
        this.style.borderColor = '#ffc107';
        formHeading.style.color = '#ffc107';
    };
    
    // Name field blur - remove highlight
    nameField.onblur = function() {
        this.style.backgroundColor = '';
        this.style.borderColor = '#ddd';
        formHeading.style.color = '';
    };
    
    // Department change - show selected option
    departmentSelect.onchange = function() {
        if (this.value) {
            ratingDisplay.textContent = 'Selected: ' + this.options[this.selectedIndex].text;
            ratingDisplay.style.display = 'block';
        } else {
            ratingDisplay.style.display = 'none';
        }
    };
    
    // Submit button click - show thank you message
    submitBtn.onclick = function(e) {
        e.preventDefault();
        
        const studentName = nameField.value.trim();
        const selectedDept = departmentSelect.value;
        
        if (studentName && selectedDept) {
            const deptName = departmentSelect.options[departmentSelect.selectedIndex].text;
            thankYouMessage.innerHTML = `
                <strong>Thank you, ${studentName}!</strong><br>
                Your registration for ${deptName} has been received. 
                We'll contact you soon with event details.
            `;
            thankYouMessage.style.display = 'block';
            
            // Hide form after submission
            setTimeout(() => {
                document.querySelector('form').style.opacity = '0.5';
            }, 1000);
        } else {
            alert('Please fill in your name and select a department first.');
        }
    };
    
});