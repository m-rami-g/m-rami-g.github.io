// Contact button functionality with canvas drawing
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
    
    // Function to generate obfuscated email image with distortion
    function generateEmailImage() {
        console.log('Generating distorted email image...');
        if (!emailCanvas || canvasGenerated) return;
        
        var ctx = emailCanvas.getContext('2d');
        if (!ctx) {
            console.error('Could not get canvas context');
            return;
        }
        
        var width = emailCanvas.width;
        var height = emailCanvas.height;
        
        console.log('Canvas dimensions:', width, 'x', height);
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw gradient background with noise
        for (var i = 0; i < width; i += 2) {
            for (var j = 0; j < height; j += 2) {
                var noise = Math.random() * 30;
                ctx.fillStyle = 'rgb(' + (230 + noise) + ',' + (230 + noise) + ',' + (230 + noise) + ')';
                ctx.fillRect(i, j, 2, 2);
            }
        }
        
        // Draw inner background with more noise
        ctx.fillStyle = 'rgb(245, 245, 245)';
        ctx.fillRect(15, 15, width - 30, height - 30);
        
        // Add random noise dots
        for (var i = 0; i < 200; i++) {
            var x = 15 + Math.random() * (width - 30);
            var y = 15 + Math.random() * (height - 30);
            var size = Math.random() * 3;
            var gray = 200 + Math.random() * 55;
            ctx.fillStyle = 'rgb(' + gray + ',' + gray + ',' + gray + ')';
            ctx.fillRect(x, y, size, size);
        }
        
        // Draw the email text with distortion - larger to fit width
        var emailText = 'm_rami_g at protonmail dot com';
        var emailChars = emailText.split('');
        
        // Calculate optimal font size to fit width
        var maxWidth = width - 100; // Leave 50px margin on each side
        var testFontSize = 24;
        var testCtx = document.createElement('canvas').getContext('2d');
        testCtx.font = testFontSize + 'px Arial';
        var textWidth = testCtx.measureText(emailText).width;
        
        // Adjust font size to fit
        var fontSize = Math.min(32, Math.floor(testFontSize * (maxWidth / textWidth)));
        if (fontSize < 20) fontSize = 20; // Minimum size
        
        console.log('Using font size:', fontSize, 'px to fit width:', maxWidth);
        
        var startX = (width - (textWidth * fontSize / testFontSize)) / 2;
        if (startX < 30) startX = 30;
        
        var x = startX;
        var y = height / 2;
        
        // Draw each character with distortion - PRIMARY LAYER
        for (var i = 0; i < emailChars.length; i++) {
            var char = emailChars[i];
            
            // Special handling for underscore to make it more visible
            var isUnderscore = (char === '_');
            
            // Slight font variations
            var charFontSize = fontSize + (Math.random() * 4 - 2);
            if (isUnderscore) {
                charFontSize += 4; // Make underscore larger
            }
            var fontFamily = Math.random() > 0.7 ? 'Courier New' : 'Arial';
            ctx.font = 'bold ' + charFontSize + 'px ' + fontFamily;
            
            // Color variations - darker for better visibility
            var grayValue = 20 + Math.random() * 40;
            if (isUnderscore) {
                grayValue = 10; // Make underscore darker
            }
            ctx.fillStyle = 'rgb(' + grayValue + ',' + grayValue + ',' + grayValue + ')';
            
            // Position distortion - less for underscore to keep it visible
            var offsetX = Math.random() * 3 - 1.5;
            var offsetY = Math.random() * 3 - 1.5;
            if (isUnderscore) {
                offsetX *= 0.5;
                offsetY *= 0.5;
            }
            
            // Rotation distortion - less for underscore
            var rotation = Math.random() * 0.2 - 0.1;
            if (isUnderscore) {
                rotation *= 0.3;
            }
            
            // Save context
            ctx.save();
            
            // Apply transformations
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(rotation);
            
            // Draw character
            ctx.fillText(char, 0, 0);
            
            // For underscore, draw an extra line below to emphasize it
            if (isUnderscore) {
                ctx.strokeStyle = 'rgb(' + grayValue + ',' + grayValue + ',' + grayValue + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-ctx.measureText(char).width/2, 5);
                ctx.lineTo(ctx.measureText(char).width/2, 5);
                ctx.stroke();
            }
            
            // Restore context
            ctx.restore();
            
            // Move to next position
            x += ctx.measureText(char).width + 1;
            
            // Extra space for underscores and spaces
            if (char === '_' || char === ' ') {
                x += 6; // More space for underscore
            }
        }
        
        // Draw duplicate layer with more distortion - SECONDARY LAYER
        x = startX + 1;
        y = height / 2 + 1;
        
        for (var i = 0; i < emailChars.length; i++) {
            var char = emailChars[i];
            var isUnderscore = (char === '_');
            
            var charFontSize = fontSize + (Math.random() * 6 - 3);
            if (isUnderscore) {
                charFontSize += 3;
            }
            ctx.font = charFontSize + 'px Arial';
            
            // Make underscore more visible in secondary layer
            if (isUnderscore) {
                ctx.fillStyle = 'rgba(30, 30, 30, 0.7)';
            } else {
                ctx.fillStyle = 'rgba(60, 60, 60, 0.5)';
            }
            
            var offsetX = Math.random() * 4 - 2;
            var offsetY = Math.random() * 4 - 2;
            var rotation = Math.random() * 0.3 - 0.15;
            
            ctx.save();
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(rotation);
            ctx.fillText(char, 0, 0);
            
            // Extra emphasis for underscore
            if (isUnderscore) {
                ctx.strokeStyle = 'rgba(30, 30, 30, 0.5)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-ctx.measureText(char).width/2, 6);
                ctx.lineTo(ctx.measureText(char).width/2, 6);
                ctx.stroke();
            }
            
            ctx.restore();
            
            x += ctx.measureText(char).width + 1;
            if (char === '_' || char === ' ') {
                x += 6;
            }
        }
        
        // Draw third layer with even more distortion - TERTIARY LAYER
        x = startX - 1;
        y = height / 2 - 1;
        
        for (var i = 0; i < emailChars.length; i++) {
            var char = emailChars[i];
            var isUnderscore = (char === '_');
            
            var charFontSize = fontSize + (Math.random() * 8 - 4);
            if (isUnderscore) {
                charFontSize += 2;
            }
            ctx.font = charFontSize + 'px Courier New';
            
            if (isUnderscore) {
                ctx.fillStyle = 'rgba(50, 50, 50, 0.4)';
            } else {
                ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
            }
            
            var offsetX = Math.random() * 5 - 2.5;
            var offsetY = Math.random() * 5 - 2.5;
            var rotation = Math.random() * 0.4 - 0.2;
            
            ctx.save();
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(rotation);
            ctx.fillText(char, 0, 0);
            ctx.restore();
            
            x += ctx.measureText(char).width + 1;
            if (char === '_' || char === ' ') {
                x += 6;
            }
        }
        
        // Draw special emphasis for underscores - EXTRA VISIBILITY LAYER
        // Find and emphasize the underscore positions
        var underscorePositions = [];
        var tempX = startX;
        for (var i = 0; i < emailChars.length; i++) {
            if (emailChars[i] === '_') {
                underscorePositions.push({
                    x: tempX,
                    index: i
                });
            }
            ctx.font = fontSize + 'px Arial';
            tempX += ctx.measureText(emailChars[i]).width + 1;
            if (emailChars[i] === '_' || emailChars[i] === ' ') {
                tempX += 6;
            }
        }
        
        // Draw emphasis around each underscore
        for (var i = 0; i < underscorePositions.length; i++) {
            var pos = underscorePositions[i];
            var emphasisX = pos.x;
            var emphasisY = height / 2;
            
            // Draw highlight box around underscore
            ctx.strokeStyle = 'rgba(255, 200, 100, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(emphasisX - 5, emphasisY - 20, 15, 30);
            
            // Draw arrows pointing to underscore
            ctx.fillStyle = 'rgba(255, 100, 100, 0.4)';
            ctx.font = '12px Arial';
            ctx.fillText('↓', emphasisX, emphasisY - 25);
            ctx.fillText('↑', emphasisX, emphasisY + 30);
        }
        
        // Draw interference lines over text area
        ctx.strokeStyle = 'rgba(180, 180, 180, 0.4)';
        ctx.lineWidth = 0.5 + Math.random() * 0.5;
        
        // Horizontal wavy lines through text
        for (var i = 0; i < 4; i++) {
            var lineY = height / 2 - 20 + i * 15;
            ctx.beginPath();
            for (var px = startX - 20; px < startX + (x - startX) + 20; px += 5) {
                var waveY = lineY + Math.sin(px * 0.05 + i) * 8;
                if (px === startX - 20) {
                    ctx.moveTo(px, waveY);
                } else {
                    ctx.lineTo(px, waveY);
                }
            }
            ctx.stroke();
        }
        
        // Diagonal crossing lines
        for (var i = 0; i < 3; i++) {
            var angle = Math.PI / 6 + (Math.random() * Math.PI / 3);
            var length = Math.min(width, height) * 0.8;
            var centerX = width / 2;
            var centerY = height / 2;
            
            ctx.beginPath();
            ctx.moveTo(
                centerX - Math.cos(angle) * length / 2,
                centerY - Math.sin(angle) * length / 2
            );
            ctx.lineTo(
                centerX + Math.cos(angle) * length / 2,
                centerY + Math.sin(angle) * length / 2
            );
            ctx.stroke();
        }
        
        // Add random dots and shapes over text area
        for (var i = 0; i < 80; i++) {
            var dotX = startX - 10 + Math.random() * (x - startX + 20);
            var dotY = height / 2 - 25 + Math.random() * 50;
            var size = 0.5 + Math.random() * 3;
            var gray = 120 + Math.random() * 100;
            var opacity = 0.2 + Math.random() * 0.4;
            
            ctx.fillStyle = 'rgba(' + gray + ',' + gray + ',' + gray + ',' + opacity + ')';
            
            if (Math.random() > 0.7) {
                // Draw circle
                ctx.beginPath();
                ctx.arc(dotX, dotY, size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Draw square
                ctx.fillRect(dotX, dotY, size, size);
            }
        }
        
        // Add scan line effect
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (var i = 0; i < 5; i++) {
            var scanY = 20 + Math.random() * (height - 40);
            ctx.beginPath();
            ctx.moveTo(20, scanY);
            ctx.lineTo(width - 20, scanY);
            ctx.stroke();
        }
        
        // Draw border with noise
        ctx.strokeStyle = '#bbbbbb';
        ctx.lineWidth = 1;
        ctx.strokeRect(15, 15, width - 30, height - 30);
        
        canvasGenerated = true;
        console.log('Distorted email image generated');
    }
    
    if (contactButton && contactDetails) {
        console.log('Adding click event listener');
        
        contactButton.addEventListener('click', function() {
            console.log('Button clicked!');
            
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
    }
});