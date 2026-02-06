---
layout: single
title: Contact
permalink: /contact/
---

<div class="contact-container" style="max-width: 600px; margin: 0 auto; padding: 2rem; text-align: center;">
    <button id="contactButton" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem;">
        <i class="fa fa-envelope" aria-hidden="true"></i> Click here for contact details
    </button>
    
        <div id="contactDetails" style="display: none; margin-top: 2rem;">
        <div class="email-image" style="margin-bottom: 1.5rem;">
            <p><strong>Email address:</strong></p>
            <div style="overflow-x: auto; margin: 0 -1rem; padding: 0 1rem;">
                <canvas id="emailCanvas" width="800" height="120" style="width: 100%; max-width: 800px; border: 1px solid #ddd; border-radius: 4px; background-color: white;"></canvas>
            </div>
        </div>
        
        <div class="instructions" style="margin-top: 1.5rem;">
            <p><strong>Instructions:</strong></p>
            <p>Replace "at" with "@" and "dot" with "." and eliminate spaces.</p>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    var contactButton = document.getElementById('contactButton');
    var contactDetails = document.getElementById('contactDetails');
    var emailCanvas = document.getElementById('emailCanvas');
    var canvasGenerated = false;
    
    // Function to generate obfuscated email image with distorted letters and random shapes
    function generateEmailImage() {
        if (!emailCanvas || canvasGenerated) return;
        
        var ctx = emailCanvas.getContext('2d');
        var width = emailCanvas.width;
        var height = emailCanvas.height;
        
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
        
        // Draw random shapes as background noise
        drawRandomShapes(ctx, width, height);
        
        // Draw distorted text
        drawDistortedText(ctx, width, height);
        
        // Draw more random shapes on top
        drawRandomShapes(ctx, width, height, true);
        
        // Add subtle overlay for blur effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, 0, width, height);
        
        canvasGenerated = true;
    }
    
    // Function to draw random shapes with more variety
    function drawRandomShapes(ctx, width, height, onTop = false) {
        var shapeCount = onTop ? 30 : 50; // Increased shape count
        
        for (var i = 0; i < shapeCount; i++) {
            var x = Math.random() * width;
            var y = Math.random() * height;
            var size = 3 + Math.random() * 20; // More size variation
            var opacity = onTop ? 0.08 : 0.04; // Adjusted opacity
            
            ctx.fillStyle = 'rgba(' + 
                Math.floor(Math.random() * 120) + ',' + 
                Math.floor(Math.random() * 120) + ',' + 
                Math.floor(Math.random() * 120) + ',' + 
                opacity + ')';
            
            var shapeType = Math.floor(Math.random() * 6); // 6 shape types now
            
            switch(shapeType) {
                case 0: // Circle
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 1: // Rectangle
                    ctx.fillRect(x, y, size, size * 0.7);
                    break;
                    
                case 2: // Triangle
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + size, y + size);
                    ctx.lineTo(x - size/2, y + size);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 3: // Diamond
                    ctx.beginPath();
                    ctx.moveTo(x, y - size);
                    ctx.lineTo(x + size, y);
                    ctx.lineTo(x, y + size);
                    ctx.lineTo(x - size, y);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 4: // Cross
                    ctx.fillRect(x - size/4, y - size/2, size/2, size);
                    ctx.fillRect(x - size/2, y - size/4, size, size/2);
                    break;
                    
                case 5: // Line
                    ctx.strokeStyle = ctx.fillStyle;
                    ctx.lineWidth = 0.5 + Math.random() * 3;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + size * 2, y + (Math.random() * size - size/2));
                    ctx.stroke();
                    break;
            }
        }
    }
    
        // Function to decrypt the obfuscated email text
        function decryptEmailText() {
            // Encrypted text using simple character code offset
            var encrypted = '119 42 105 42 124 42 107 42 119 42 115 42 105 42 113 42 42 42 107 42 126 42 42 42 122 42 124 42 121 42 126 42 121 42 120 42 119 42 107 42 115 42 118 42 42 42 110 42 121 42 126 42 42 42 109 42 121 42 119';
            var parts = encrypted.split(' ');
            var decrypted = '';
            
            // Simple offset decryption: subtract 10 from each character code
            for (var i = 0; i < parts.length; i++) {
                var charCode = parseInt(parts[i]) - 10;
                decrypted += String.fromCharCode(charCode);
            }
            
            return decrypted;
        }
        
        // Function to draw distorted text with increased distortion
        function drawDistortedText(ctx, width, height) {
            var text = decryptEmailText(); // Decrypt when needed
            var chars = text.split('');
        
        // Calculate total width to center the text
        ctx.font = '18px "DejaVu Sans", sans-serif'; // Slightly smaller font
        var totalWidth = 0;
        for (var i = 0; i < chars.length; i++) {
            totalWidth += ctx.measureText(chars[i]).width + 2;
            if (chars[i] === '_' || chars[i] === ' ') {
                totalWidth += 5;
            }
        }
        
        // Center the text horizontally
        var startX = Math.max(20, (width - totalWidth) / 2);
        var x = startX;
        var y = 60; // Moved down slightly
        
        // Draw each character with increased distortion
        for (var i = 0; i < chars.length; i++) {
            var char = chars[i];
            
            // Random color variation
            var grayValue = 20 + Math.floor(Math.random() * 60); // Increased variation
            ctx.fillStyle = 'rgb(' + grayValue + ',' + grayValue + ',' + grayValue + ')';
            
            // INCREASED position offset for distortion
            var offsetX = (Math.random() * 4 - 2); // -2 to 2 (increased)
            var offsetY = (Math.random() * 4 - 2); // -2 to 2 (increased)
            
            // INCREASED rotation for distortion
            var rotation = (Math.random() * 0.4 - 0.2); // -0.2 to 0.2 radians (increased)
            
            // Save context state
            ctx.save();
            
            // Apply transformations
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(rotation);
            
            // Draw character
            ctx.fillText(char, 0, 0);
            
            // Restore context
            ctx.restore();
            
            // Move to next character position
            x += ctx.measureText(char).width + 2;
            
            // Add extra space for underscores and spaces
            if (char === '_' || char === ' ') {
                x += 5;
            }
        }
        
        // Draw duplicate distorted version with MORE distortion
        ctx.fillStyle = 'rgba(80, 80, 80, 0.4)'; // Darker duplicate
        x = startX + 2;
        y = 62;
        
        for (var i = 0; i < chars.length; i++) {
            var char = chars[i];
            // EVEN MORE distortion for duplicate
            var offsetX = (Math.random() * 6 - 3); // -3 to 3
            var offsetY = (Math.random() * 6 - 3); // -3 to 3
            
            ctx.save();
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(Math.random() * 0.6 - 0.3); // -0.3 to 0.3 radians
            ctx.fillText(char, 0, 0);
            ctx.restore();
            
            x += ctx.measureText(char).width + 2;
            if (char === '_' || char === ' ') {
                x += 5;
            }
        }
        
        // Draw triple distorted version (very faint)
        ctx.fillStyle = 'rgba(120, 120, 120, 0.2)';
        x = startX - 2;
        y = 58;
        
        for (var i = 0; i < chars.length; i++) {
            var char = chars[i];
            var offsetX = (Math.random() * 8 - 4); // -4 to 4
            var offsetY = (Math.random() * 8 - 4); // -4 to 4
            
            ctx.save();
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(Math.random() * 0.8 - 0.4); // -0.4 to 0.4 radians
            ctx.fillText(char, 0, 0);
            ctx.restore();
            
            x += ctx.measureText(char).width + 2;
            if (char === '_' || char === ' ') {
                x += 5;
            }
        }
        
        // Draw more interference lines through text
        ctx.strokeStyle = 'rgba(180, 180, 180, 0.5)';
        ctx.lineWidth = 1;
        
        // Multiple wavy lines
        for (var line = 0; line < 3; line++) {
            ctx.beginPath();
            var lineY = 40 + line * 20;
            for (var i = startX; i < startX + totalWidth; i += 5) {
                var waveY = lineY + Math.sin(i * 0.03 + line) * 8;
                if (i === startX) {
                    ctx.moveTo(i, waveY);
                } else {
                    ctx.lineTo(i, waveY);
                }
            }
            ctx.stroke();
        }
        
        // Multiple diagonal lines
        for (var diag = 0; diag < 2; diag++) {
            ctx.beginPath();
            var startY = 30 + diag * 40;
            var endY = 90 - diag * 40;
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + totalWidth, endY);
            ctx.stroke();
        }
        
        // Random short lines through text
        ctx.strokeStyle = 'rgba(150, 150, 150, 0.3)';
        ctx.lineWidth = 0.5 + Math.random();
        for (var i = 0; i < 10; i++) {
            var lineX = startX + Math.random() * totalWidth;
            var lineY = 40 + Math.random() * 40;
            var lineLength = 10 + Math.random() * 30;
            var angle = Math.random() * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(lineX, lineY);
            ctx.lineTo(lineX + Math.cos(angle) * lineLength, lineY + Math.sin(angle) * lineLength);
            ctx.stroke();
        }
    }
    
    if (contactButton && contactDetails) {
        contactButton.addEventListener('click', function() {
            // Toggle display of contact details
            if (contactDetails.style.display === 'none') {
                contactDetails.style.display = 'block';
                contactButton.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i> Hide contact details';
                contactButton.classList.remove('btn-primary');
                contactButton.classList.add('btn-secondary');
                
                // Generate the image when details are shown
                setTimeout(generateEmailImage, 100);
            } else {
                contactDetails.style.display = 'none';
                contactButton.innerHTML = '<i class="fa fa-envelope" aria-hidden="true"></i> Click here for contact details';
                contactButton.classList.remove('btn-secondary');
                contactButton.classList.add('btn-primary');
            }
        });
    }
});
</script>

<style>
.btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
}

.btn:hover {
    background-color: #2980b9;
}

.btn-primary {
    background-color: #3498db;
}

.btn-secondary {
    background-color: #6c757d;
}

.btn-secondary:hover {
    background-color: #5a6268;
}
</style>
