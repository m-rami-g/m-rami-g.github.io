// Simple contact button functionality - debug version
console.log('Contact button script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    var contactButton = document.getElementById('contactButton');
    var contactDetails = document.getElementById('contactDetails');
    
    console.log('Button found:', contactButton);
    console.log('Details found:', contactDetails);
    
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