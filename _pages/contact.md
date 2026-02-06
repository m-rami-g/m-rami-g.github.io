---
layout: single
title: Contact
permalink: /contact/
---

## Contact

<div class="contact-form-container" id="contactFormContainer">
    <form id="contactForm" class="contact-form">
        <div class="form-group">
            <label for="name">Name *</label>
            <input type="text" id="name" name="name" required class="form-control">
        </div>
        
        <div class="form-group">
            <label for="email">Your Email *</label>
            <input type="email" id="email" name="email" required class="form-control">
        </div>
        
        <div class="form-group">
            <label for="subject">Subject *</label>
            <input type="text" id="subject" name="subject" required class="form-control">
        </div>
        
        <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="6" required class="form-control"></textarea>
        </div>
        
        <!-- Hidden field that will be populated with decoded email -->
        <input type="hidden" id="targetEmail" name="targetEmail">
        
        <button type="submit" class="btn btn-primary" id="submitBtn">
            <i class="fa fa-paper-plane" aria-hidden="true"></i> Send Message
        </button>
        
        <div id="formStatus" class="form-status" style="display: none;"></div>
        
        <!-- Email display for manual copy -->
        <div id="emailDisplaySection" class="email-display-section" style="display: none; margin-top: 1rem;">
            <p><strong>Email address:</strong> <code id="emailDisplay"></code></p>
            <button id="copyEmailBtn" class="btn btn-secondary">
                <i class="fa fa-copy" aria-hidden="true"></i> Copy Email
            </button>
        </div>
    </form>
    
    <div class="form-notice">
        <p><small>Your message will open in your email client. No third-party services are used.</small></p>
    </div>
</div>

<!-- Obfuscated email decoder (multi-layer protection) -->
<script>
(function() {
    'use strict';
    
    // Multi-layer obfuscated email storage
    var analyticsData = {
        metrics: [218, 165, 23, 220, 157],
        timestamps: [1738867200, 1738953600, 1739040000],
        ["bV9yYW1pX2c=", "QHByb3Rvbm1haWw=", "LmNvbQ=="]
    };
    
    // Decoding function
    function decodeEmail() {
        try {
            var dateKey = new Date().getDate();
            var result = '';
            
            for (var i = 0; i < analyticsData.userData.length; i++) {
                var encoded = atob(analyticsData.userData[i]);
                var decoded = '';
                
                for (var j = 0; j < encoded.length; j++) {
                    var charCode = encoded.charCodeAt(j);
                    decoded += String.fromCharCode(charCode ^ (dateKey + i + j));
                }
                
                result += decoded;
            }
            
            // Validate with checksum
            var checksum = 0;
            for (var k = 0; k < result.length; k++) {
                checksum += result.charCodeAt(k);
            }
            
            if ((checksum & 0xFF) === 45) {
                return result;
            }
        } catch (error) {
            console.error("Decoding error:", error);
        }
        return null;
    }
    
    // Form submission handler
    document.addEventListener('DOMContentLoaded', function() {
        var form = document.getElementById('contactForm');
        var targetEmailField = document.getElementById('targetEmail');
        var formStatus = document.getElementById('formStatus');
        var submitBtn = document.getElementById('submitBtn');
        var emailDisplaySection = document.getElementById('emailDisplaySection');
        var emailDisplay = document.getElementById('emailDisplay');
        var copyEmailBtn = document.getElementById('copyEmailBtn');
        
        console.log('Contact form initializing...');
        
        // Store decoded email globally for fallback
        var decodedEmail = null;
        
        if (form && targetEmailField && submitBtn) {
            // Decode email and set in hidden field
            decodedEmail = decodeEmail();
            targetEmailField.value = decodedEmail || "";
            console.log("Email decoded:", decodedEmail ? "Success - " + decodedEmail : "Failed");
            
            if (!decodedEmail) {
                showError('Could not initialize contact form. Please refresh the page.');
                submitBtn.disabled = true;
                return;
            }
            
            // Set up copy email button
            if (copyEmailBtn && emailDisplay) {
                emailDisplay.textContent = decodedEmail;
                copyEmailBtn.addEventListener('click', function() {
                    navigator.clipboard.writeText(decodedEmail).then(function() {
                        showSuccess('Email copied to clipboard!');
                        copyEmailBtn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i> Copied!';
                        copyEmailBtn.disabled = true;
                        setTimeout(() => {
                            copyEmailBtn.innerHTML = '<i class="fa fa-copy" aria-hidden="true"></i> Copy Email';
                            copyEmailBtn.disabled = false;
                        }, 2000);
                    }).catch(function(err) {
                        console.error('Copy failed:', err);
                        showError('Could not copy email. Please copy manually: ' + decodedEmail);
                    });
                });
            }
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                var name = document.getElementById('name').value.trim();
                var userEmail = document.getElementById('email').value.trim();
                var subject = document.getElementById('subject').value.trim();
                var message = document.getElementById('message').value.trim();
                var targetEmail = targetEmailField.value;
                
                console.log('Form submitted:', { name, userEmail, subject, message, targetEmail });
                
                // Validate form
                if (!name || !userEmail || !subject || !message) {
                    showError('Please fill in all required fields.');
                    return;
                }
                
                if (!targetEmail) {
                    showError('Error: Contact information not available.');
                    return;
                }
                
                // Validate email format
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(userEmail)) {
                    showError('Please enter a valid email address.');
                    return;
                }
                
                // Construct mailto link - SIMPLIFIED VERSION
                var emailBody = 'Name: ' + name + '\n' +
                               'From: ' + userEmail + '\n\n' +
                               'Message:\n' + message + '\n\n' +
                               '---\nSent via website contact form';
                
                var mailtoLink = 'mailto:' + targetEmail +
                                 '?subject=' + encodeURIComponent('Website Contact: ' + subject) +
                                 '&body=' + encodeURIComponent(emailBody);
                
                console.log('Mailto link created:', mailtoLink);
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Opening email...';
                submitBtn.disabled = true;
                
                // Try to open email client with multiple methods
                var emailOpened = false;
                
                // Method 1: Direct window.location
                try {
                    window.location.href = mailtoLink;
                    emailOpened = true;
                    console.log('Method 1: window.location succeeded');
                } catch (error) {
                    console.log('Method 1 failed:', error);
                }
                
                // Method 2: Create and click a link
                if (!emailOpened) {
                    setTimeout(function() {
                        try {
                            var mailtoAnchor = document.createElement('a');
                            mailtoAnchor.href = mailtoLink;
                            mailtoAnchor.style.display = 'none';
                            document.body.appendChild(mailtoAnchor);
                            mailtoAnchor.click();
                            document.body.removeChild(mailtoAnchor);
                            emailOpened = true;
                            console.log('Method 2: anchor click succeeded');
                        } catch (error) {
                            console.log('Method 2 failed:', error);
                        }
                        
                        // Method 3: window.open as fallback
                        if (!emailOpened) {
                            try {
                                window.open(mailtoLink, '_blank');
                                emailOpened = true;
                                console.log('Method 3: window.open succeeded');
                            } catch (error) {
                                console.log('Method 3 failed:', error);
                            }
                        }
                        
                         // Final result
                        if (emailOpened) {
                            showSuccess('Email client should open. If not, copy the email address below and send manually.');
                            console.log('Email client opened successfully');
                            
                            // Show email address as backup
                            if (emailDisplaySection) {
                                emailDisplaySection.style.display = 'block';
                            }
                            
                            // Reset form after delay
                            setTimeout(function() {
                                form.reset();
                                submitBtn.innerHTML = '<i class="fa fa-paper-plane" aria-hidden="true"></i> Send Message';
                                submitBtn.disabled = false;
                                hideStatus();
                                console.log('Form reset');
                            }, 5000);
                        } else {
                            showError('Could not open email client. Please copy the email address below and send manually.');
                            console.error('All email opening methods failed');
                            
                            // Show email address for manual copy
                            if (emailDisplaySection) {
                                emailDisplaySection.style.display = 'block';
                            }
                            
                            submitBtn.innerHTML = '<i class="fa fa-paper-plane" aria-hidden="true"></i> Send Message';
                            submitBtn.disabled = false;
                        }
                    }, 100);
                } else {
                    // If method 1 worked immediately
                    showSuccess('Email client opening... If it doesn\'t open, copy the email address below and send manually.');
                    
                    // Show email address as backup
                    if (emailDisplaySection) {
                        emailDisplaySection.style.display = 'block';
                    }
                    
                    // Reset form after delay
                    setTimeout(function() {
                        form.reset();
                        submitBtn.innerHTML = '<i class="fa fa-paper-plane" aria-hidden="true"></i> Send Message';
                        submitBtn.disabled = false;
                        hideStatus();
                        console.log('Form reset');
                    }, 5000);
                }
            });
            
            console.log('Contact form initialized successfully');
        } else {
            console.error('Form elements not found');
        }
        
        function showError(message) {
            console.error('Form error:', message);
            if (formStatus) {
                formStatus.textContent = message;
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
            }
        }
        
        function showSuccess(message) {
            console.log('Form success:', message);
            if (formStatus) {
                formStatus.textContent = message;
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
            }
        }
        
         function hideStatus() {
             if (formStatus) {
                 formStatus.style.display = 'none';
             }
         }
     });
 })();
</script>

<style>
.contact-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
}

.contact-form {
    background: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c3e50;
    font-size: 1rem;
}

.form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #ffffff;
    color: #495057;
    transition: border-color 0.15s ease-in-out;
}

.form-control:focus {
    border-color: #3498db;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(52,152,219,.25);
}

.btn-primary {
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

.btn-primary:hover {
    background-color: #2980b9;
}

.btn-primary:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

.btn-secondary:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
}

.form-status {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    display: none;
}

.form-status.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-status.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}



.form-notice {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: #e8f4fc;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #2c3e50;
    border-left: 4px solid #3498db;
}

 /* Ensure good contrast for all text */
.contact-form-container * {
    color: #2c3e50;
}

 /* Fix for any inherited white text */
input, textarea, select {
    color: #495057 !important;
 }
 
 /* Email display section */
.email-display-section {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    margin-top: 1rem;
}

.email-display-section code {
    background-color: #e9ecef;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: monospace;
    display: inline-block;
    margin: 0.5rem 0;
}
</style>
