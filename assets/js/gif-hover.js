/**
 * GIF Hover Playback System
 * Shows static image by default, plays GIF on hover
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all GIF images on the page
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Check if image is a GIF
        const src = img.src.toLowerCase();
        const urlWithoutQuery = src.split('?')[0];
        
        if (urlWithoutQuery.endsWith('.gif')) {
            setupGifHover(img);
        }
    });
    
    // Also check for images with data-gif attribute
    document.querySelectorAll('img[data-gif]').forEach(setupGifHover);
});

function setupGifHover(img) {
    const originalSrc = img.src;
    
    // Check if there's a static version available
    // Convention: if GIF is "image.gif", static version is "image_static.png" or "image_static.jpg"
    const staticSrc = getStaticVersionPath(originalSrc);
    
    // Create image element to test if static version exists
    const testImg = new Image();
    testImg.onload = function() {
        // Static version exists, use it
        img.src = staticSrc;
        img.setAttribute('data-gif-original', originalSrc);
        img.setAttribute('data-gif-static', staticSrc);
        
        addHoverBehavior(img);
    };
    
    testImg.onerror = function() {
        // Static version doesn't exist, keep original GIF
        // but still add hover behavior if needed
        console.log('Static version not found for:', originalSrc);
    };
    
    testImg.src = staticSrc;
}

function getStaticVersionPath(gifPath) {
    // Convert GIF path to static version path
    // Example: images/example.gif -> images/example_static.png
    const pathParts = gifPath.split('.');
    if (pathParts.length < 2) return gifPath;
    
    const extension = pathParts.pop().toLowerCase();
    if (extension !== 'gif') return gifPath;
    
    const basePath = pathParts.join('.');
    
    // Try different static extensions
    const staticExtensions = ['_static.png', '_static.jpg', '_static.jpeg', '-static.png', '-static.jpg'];
    
    for (const ext of staticExtensions) {
        const staticPath = basePath + ext;
        // Check if this file exists by creating a test image
        const testImg = new Image();
        let exists = false;
        
        // Synchronous check (not ideal but works for our use case)
        testImg.onload = function() { exists = true; };
        testImg.onerror = function() { exists = false; };
        testImg.src = staticPath;
        
        // Small delay to allow onload/onerror to fire
        setTimeout(() => {
            if (exists) return staticPath;
        }, 10);
    }
    
    // Default fallback: try _static.png
    return basePath + '_static.png';
}

function addHoverBehavior(img) {
    let isAnimating = false;
    let hoverTimeout;
    
    // Mouse enter: play GIF
    img.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        
        if (!isAnimating) {
            const originalGif = img.getAttribute('data-gif-original');
            if (originalGif) {
                img.src = originalGif;
                isAnimating = true;
                
                // Add visual feedback
                img.style.transition = 'all 0.3s ease';
                img.style.filter = 'brightness(1.05)';
                img.style.cursor = 'pointer';
            }
        }
    });
    
    // Mouse leave: show static version
    img.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(() => {
            if (isAnimating) {
                const staticSrc = img.getAttribute('data-gif-static');
                if (staticSrc) {
                    img.src = staticSrc;
                    isAnimating = false;
                    
                    // Remove visual feedback
                    img.style.filter = '';
                }
            }
        }, 100); // Small delay to prevent flickering
    });
    
    // Touch support for mobile
    img.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (!isAnimating) {
            img.dispatchEvent(new Event('mouseenter'));
        }
    });
    
    img.addEventListener('touchend', function(e) {
        e.preventDefault();
        img.dispatchEvent(new Event('mouseleave'));
    });
    
    // Add CSS for better UX
    if (!document.querySelector('#gif-hover-css')) {
        const style = document.createElement('style');
        style.id = 'gif-hover-css';
        style.textContent = `
            img[data-gif-original] {
                cursor: pointer;
                transition: filter 0.3s ease, transform 0.3s ease;
            }
            img[data-gif-original]:hover {
                transform: scale(1.01);
            }
            .gif-hint {
                position: absolute;
                bottom: 5px;
                right: 5px;
                background: rgba(0, 0, 0, 0.6);
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 10px;
                font-family: Arial, sans-serif;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            img[data-gif-original]:hover .gif-hint {
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add hint text if not already present
    if (!img.parentNode.querySelector('.gif-hint')) {
        const hint = document.createElement('div');
        hint.className = 'gif-hint';
        hint.textContent = 'Hover to play';
        img.parentNode.style.position = 'relative';
        img.parentNode.appendChild(hint);
    }
}

// Export for manual control if needed
window.gifHoverSystem = {
    setupAll: function() {
        document.querySelectorAll('img').forEach(img => {
            const src = img.src.toLowerCase();
            if (src.endsWith('.gif')) {
                setupGifHover(img);
            }
        });
    },
    setupElement: function(imgElement) {
        setupGifHover(imgElement);
    }
};