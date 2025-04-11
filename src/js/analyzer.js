/**
 * UI Code Assistant - Code Analysis Functions
 */

// Function to analyze UI design
function handleDesignAnalysis(code) {
    // For the prototype, we'll simulate design analysis with predefined responses
    // In a real implementation, this would use more sophisticated algorithms or AI services
    
    let analysisResults = '';
    const layoutChecked = $('#layoutCheck').is(':checked');
    const colorsChecked = $('#colorsCheck').is(':checked');
    const spacingChecked = $('#spacingCheck').is(':checked');
    const responsivenessChecked = $('#responsivenessCheck').is(':checked');
    
    // Check if it's HTML code
    if (code.toLowerCase().includes('<!doctype html>') || 
        code.toLowerCase().includes('<html') || 
        (code.toLowerCase().includes('<body') && code.toLowerCase().includes('<head'))) {
        analysisResults += '<h4>Design Analysis Results</h4>';
        
        // Layout analysis
        if (layoutChecked) {
            analysisResults += '<div class="suggestion-item">';
            analysisResults += '<h5>Layout Structure</h5>';
            
            if (!code.toLowerCase().includes('display:') && !code.toLowerCase().includes('display=')) {
                analysisResults += '<p>Your design lacks explicit display properties. Consider using Flexbox or Grid for more complex layouts.</p>';
            }
            
            if (code.toLowerCase().includes('<table') && !code.toLowerCase().includes('data-table')) {
                analysisResults += '<p>Warning: Tables are detected in your design. If used for layout, consider using CSS Grid or Flexbox instead, as tables should primarily be used for tabular data.</p>';
            }
            
            if (!code.toLowerCase().includes('class="container') && !code.toLowerCase().includes('class="row')) {
                analysisResults += '<p>Consider using a container/row structure to achieve better layout organization.</p>';
            }
            
            analysisResults += '</div>';
        }
        
        // Color analysis
        if (colorsChecked) {
            analysisResults += '<div class="suggestion-item">';
            analysisResults += '<h5>Color Scheme</h5>';
            
            if (countOccurrences(code, 'color:') > 7 || countOccurrences(code, 'background-color:') > 7) {
                analysisResults += '<p>Your design uses many different colors. Consider using a more consistent color palette with 3-5 primary colors for better visual consistency.</p>';
            }
            
            if (!code.toLowerCase().includes('color:') && !code.toLowerCase().includes('background-color:')) {
                analysisResults += '<p>Your design lacks explicit color definitions. Adding a cohesive color scheme could improve the visual appeal.</p>';
            }
            
            analysisResults += '</div>';
        }
        
        // Spacing analysis
        if (spacingChecked) {
            analysisResults += '<div class="suggestion-item">';
            analysisResults += '<h5>Spacing & Alignment</h5>';
            
            if (!code.toLowerCase().includes('margin') && !code.toLowerCase().includes('padding')) {
                analysisResults += '<p>Your design lacks explicit margin or padding properties. Adding appropriate spacing can improve readability and visual hierarchy.</p>';
            }
            
            if (countOccurrences(code, 'px') > 15) {
                analysisResults += '<p>Consider using relative units (em, rem, %) instead of numerous pixel values for better scalability and maintenance.</p>';
            }
            
            analysisResults += '</div>';
        }
        
        // Responsiveness analysis
        if (responsivenessChecked) {
            analysisResults += '<div class="suggestion-item">';
            analysisResults += '<h5>Responsiveness</h5>';
            
            if (!code.toLowerCase().includes('@media')) {
                analysisResults += '<p>No media queries detected. Your design might not be responsive to different screen sizes.</p>';
            }
            
            if (code.toLowerCase().includes('width:') && !code.toLowerCase().includes('max-width:')) {
                analysisResults += '<p>Consider using max-width instead of fixed width for better responsiveness.</p>';
            }
            
            if (!code.toLowerCase().includes('viewport')) {
                analysisResults += '<p>Missing viewport meta tag. Add <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> for proper mobile rendering.</p>';
            }
            
            analysisResults += '</div>';
        }
    } else if (code.toLowerCase().includes('{') && code.toLowerCase().includes('}')) {
        // CSS-only code
        analysisResults += '<h4>CSS Analysis Results</h4>';
        analysisResults += '<div class="suggestion-item">';
        analysisResults += '<p>CSS-only analysis detected. For more comprehensive design analysis, please include the HTML structure as well.</p>';
        
        if (colorsChecked && countOccurrences(code, 'color:') > 7) {
            analysisResults += '<p>Multiple color definitions detected. Consider creating a more consistent color palette.</p>';
        }
        
        if (responsivenessChecked && !code.toLowerCase().includes('@media')) {
            analysisResults += '<p>No media queries detected. Consider adding responsive breakpoints.</p>';
        }
        
        analysisResults += '</div>';
    } else {
        // Not recognized as HTML or CSS
        analysisResults += '<div class="alert alert-warning">The provided code doesn\'t appear to be valid HTML or CSS. Please provide valid markup for design analysis.</div>';
    }
    
    return analysisResults;
}

// Function to analyze UI code
function handleCodeAnalysis(code) {
    // For the prototype, we'll simulate code analysis with predefined responses
    // In a real implementation, this would use more sophisticated algorithms or AI services
    
    let analysisResults = '';
    const performanceChecked = $('#performanceCheck').is(':checked');
    const bestPracticesChecked = $('#bestPracticesCheck').is(':checked');
    const compatibilityChecked = $('#compatibilityCheck').is(':checked');
    const maintainabilityChecked = $('#maintainabilityCheck').is(':checked');
    
    analysisResults += '<h4>Code Analysis Results</h4>';
    
    // Performance analysis
    if (performanceChecked) {
        analysisResults += '<div class="warning-item">';
        analysisResults += '<h5>Performance Issues</h5>';
        
        if (code.toLowerCase().includes('<script') && !code.toLowerCase().includes('defer') && !code.toLowerCase().includes('async')) {
            analysisResults += '<p>Scripts found without defer or async attributes. Add these attributes to non-critical scripts to improve page load performance.</p>';
            analysisResults += '<code>&lt;script <span class="highlight">defer</span> src="..."&gt;&lt;/script&gt;</code>';
        }
        
        if (code.toLowerCase().includes('document.write')) {
            analysisResults += '<p>Usage of document.write() detected, which can significantly slow down page rendering. Consider alternative DOM manipulation methods.</p>';
        }
        
        if (code.toLowerCase().includes('onload=') || code.toLowerCase().includes('onclick=')) {
            analysisResults += '<p>Inline event handlers detected. Consider using event listeners for better separation of concerns and performance.</p>';
        }
        
        analysisResults += '</div>';
    }
    
    // Best practices analysis
    if (bestPracticesChecked) {
        analysisResults += '<div class="suggestion-item">';
        analysisResults += '<h5>Best Practices</h5>';
        
        if (!code.toLowerCase().includes('<!doctype html>') && code.toLowerCase().includes('<html')) {
            analysisResults += '<p>Missing DOCTYPE declaration. Add <code>&lt;!DOCTYPE html&gt;</code> at the beginning of your HTML.</p>';
        }
        
        if (code.toLowerCase().includes('<img') && !code.toLowerCase().includes('alt=')) {
            analysisResults += '<p>Images without alt attributes detected. Add descriptive alt text for accessibility.</p>';
        }
        
        if (code.toLowerCase().includes('var ')) {
            analysisResults += '<p>Usage of var for variable declarations. Consider using let or const for better scoping.</p>';
        }
        
        if (code.toLowerCase().includes('function(') && !code.toLowerCase().includes('=>')) {
            analysisResults += '<p>Traditional function expressions detected. Consider using arrow functions where appropriate for cleaner syntax.</p>';
        }
        
        analysisResults += '</div>';
    }
    
    // Compatibility analysis
    if (compatibilityChecked) {
        analysisResults += '<div class="warning-item">';
        analysisResults += '<h5>Browser Compatibility</h5>';
        
        if (code.toLowerCase().includes('grid')) {
            analysisResults += '<p>CSS Grid usage detected. While widely supported in modern browsers, consider providing fallbacks for older browsers like IE11.</p>';
        }
        
        if (code.toLowerCase().includes('position: sticky')) {
            analysisResults += '<p>Sticky positioning detected. This isn\'t supported in older browsers. Consider polyfills or fallbacks.</p>';
        }
        
        if (code.toLowerCase().includes('fetch(')) {
            analysisResults += '<p>Fetch API usage detected. Not supported in IE. Consider adding a polyfill or using axios as an alternative.</p>';
        }
        
        analysisResults += '</div>';
    }
    
    // Maintainability analysis
    if (maintainabilityChecked) {
        analysisResults += '<div class="improvement-item">';
        analysisResults += '<h5>Code Maintainability</h5>';
        
        const cssClassCount = (code.match(/class=["'][^"']*["']/g) || []).length;
        if (cssClassCount > 10) {
            analysisResults += '<p>Multiple CSS classes detected. Consider using a methodical naming approach like BEM (Block, Element, Modifier) for better organization.</p>';
        }
        
        if ((code.match(/id=["'][^"']*["']/g) || []).length > 8) {
            analysisResults += '<p>Numerous IDs detected. Excessive ID usage can lead to maintenance issues. Consider using classes for styling.</p>';
        }
        
        if (code.toLowerCase().includes('!important')) {
            analysisResults += '<p>!important declarations found. These override the natural cascade of CSS and can cause maintenance headaches. Try to avoid when possible.</p>';
        }
        
        if (code.toLowerCase().includes('style="')) {
            analysisResults += '<p>Inline styles detected. For better maintainability, consider moving these to an external stylesheet.</p>';
        }
        
        analysisResults += '</div>';
    }
    
    if (analysisResults === '<h4>Code Analysis Results</h4>') {
        analysisResults += '<div class="alert alert-success">No significant issues found in the code!</div>';
    }
    
    return analysisResults;
}

// Helper function to count occurrences of a substring
function countOccurrences(string, subString) {
    return (string.match(new RegExp(subString, 'gi')) || []).length;
} 