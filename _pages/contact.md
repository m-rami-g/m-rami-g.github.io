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

<script src="/assets/js/contact-button-final.js"></script>

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
