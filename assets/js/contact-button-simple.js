// Simple contact button functionality - debug version
console.log('Contact button script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    var contactButton = document.getElementById('contactButton');
    var contactDetails = document.getElementById('contactDetails');
    var emailCanvas = document.getElementById('emailCanvas');
    var canvasGenerated = false;
    
    console.log('Button found:', contactButton);
    console.log('Details found:', contactDetails);
    console.log('Canvas found:', emailCanvas);
    
    // Function to generate obfuscated email image
    function generateEmailImage() {
        console.log('Generating email image...');
        if (!emailCanvas) {
            console.error('Canvas element not found!');
            return;
        }
        if (canvasGenerated) {
            console.log('Canvas already generated');
            return;
        }
        
        var ctx = emailCanvas.getContext('2d');
        if (!ctx) {
            console.error('Could not get canvas context!');
            return;
        }
        
        var width = emailCanvas.width;
        var height = emailCanvas.height;
        
        console.log('Canvas dimensions:', width, 'x', height);
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw gradient background
        var gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#f8f8f8');
        gradient.addColorStop(1, '#e8e8e8');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Draw inner background with subtle pattern
        ctx.fillStyle = 'white';
        ctx.fillRect(10, 10, width - 20, height - 20);
        
        // Draw some test text to verify canvas is working
        ctx.font = '18px Arial, sans-serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.fillText('Test email: user at example dot com', width / 2, height / 2);
        
        // Draw a border
        ctx.strokeStyle = '#dddddd';
        ctx.lineWidth = 1;
        ctx.strokeRect(10, 10, width - 20, height - 20);
        
        canvasGenerated = true;
        console.log('Canvas generated successfully');
    }
    
    if (contactButton && contactDetails) {
        console.log('Adding click event listener');
        
        contactButton.addEventListener('click', function() {
            console.log('Button clicked! Current display:', contactDetails.style.display);
            
            // Toggle display of contact details
            if (contactDetails.style.display === 'none' || !contactDetails.style.display) {
                contactDetails.style.display = 'block';
                contactButton.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i> Hide contact details';
                contactButton.classList.remove('btn-primary');
                contactButton.classList.add('btn-secondary');
                console.log('Details shown');
                
                // Generate the image when details are shown
                setTimeout(generateEmailImage, 100);
            } else {
                contactDetails.style.display = 'none';
                contactButton.innerHTML = '<i class="fa fa-envelope" aria-hidden="true"></i> Click here for contact details';
                contactButton.classList.remove('btn-secondary');
                contactButton.classList.add('btn-primary');
                console.log('Details hidden');
            }
        });
        
        console.log('Event listener added successfully');
    } else {
        console.error('Button or details element not found!');
        if (!contactButton) console.error('contactButton element missing');
        if (!contactDetails) console.error('contactDetails element missing');
    }
});