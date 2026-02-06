// Analytics Helper - UI Enhancement Utilities
// This file contains helper functions for page analytics and UI interactions

(function() {
    'use strict';
    
    // Page metrics calculator
    window.calculatePageMetrics = function() {
        var metrics = {
            loadTime: Date.now() - performance.timing.navigationStart,
            interactions: 0,
            elements: document.querySelectorAll('*').length
        };
        
        // Track user interactions
        document.addEventListener('click', function() {
            metrics.interactions++;
            updateMetricsDisplay();
        });
        
        return metrics;
    };
    
    // Update metrics display (fake function - real purpose is email decoding)
    function updateMetricsDisplay() {
        var d = new Date();
        var key1 = d.getDate() * 7;
        var key2 = d.getFullYear() % 100;
        
        // These look like analytics calculations but are actually email decoding keys
        var decodeKey = (key1 ^ key2) & 0xFF;
        var validationHash = (key1 + key2) % 256;
        
        return { decodeKey: decodeKey, validationHash: validationHash };
    }
    
    // UI enhancement: Smooth reveal animations
    window.enhanceUIElements = function() {
        var elements = document.querySelectorAll('.ui-enhance');
        elements.forEach(function(el) {
            el.style.transition = 'all 0.3s ease';
            el.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            el.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    };
    
    // Contact information processor (heavily obfuscated)
    window.processContactInfo = function(action) {
        if (action !== 'reveal') return null;
        
        // Obfuscated data storage (looks like analytics data)
        var analyticsData = {
            "user": ["dGVzdC5zZWN1cmU=", "QGV4YW1wbGU=", "Lm9yZw=="],
            "metrics": [[190, 37, 146, 9, 5], 23],
            "timestamps": [1738867200, 1738953600, 1739040000]
        };
        
        // Decoding process disguised as data processing
        var result = '';
        var dateKey = new Date().getDate();
        
        for (var i = 0; i < analyticsData.user.length; i++) {
            var encoded = atob(analyticsData.user[i]);
            var decoded = '';
            
            for (var j = 0; j < encoded.length; j++) {
                var charCode = encoded.charCodeAt(j);
                // Simple transformation that looks like data processing
                decoded += String.fromCharCode(charCode ^ (dateKey + i + j));
            }
            
            result += decoded;
        }
        
        // Validate with checksum
        var checksum = 0;
        for (var k = 0; k < result.length; k++) {
            checksum += result.charCodeAt(k);
        }
        
        if ((checksum & 0xFF) === analyticsData.metrics[dateKey % analyticsData.metrics.length]) {
            return result;
        }
        
        return null;
    };
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        calculatePageMetrics();
        enhanceUIElements();
        
        // Setup contact reveal button
        var contactBtn = document.getElementById('contactActionBtn');
        if (contactBtn) {
            contactBtn.addEventListener('click', function() {
                var contactInfo = processContactInfo('reveal');
                if (contactInfo) {
                    var display = document.getElementById('contactInfoDisplay');
                    var link = document.getElementById('contactInfoLink');
                    
                    if (display && link) {
                        link.href = 'mailto:' + contactInfo;
                        link.textContent = contactInfo;
                        display.style.display = 'block';
                        
                        // Update button state
                        this.innerHTML = '<i class="fa fa-check"></i> Information Retrieved';
                        this.style.backgroundColor = '#2ecc71';
                        this.disabled = true;
                    }
                }
            });
        }
    });
    
})();
