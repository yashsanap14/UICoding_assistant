/**
 * UI Code Assistant - Accessibility Check Functions
 */

// Function to analyze accessibility issues in UI code
function handleAccessibilityAnalysis(code) {
    // For the prototype, we'll simulate accessibility analysis with predefined responses
    // In a real implementation, this would use more sophisticated algorithms or AI services
    
    let analysisResults = '';
    const accessibilityLevel = $('#accessibilityLevel').val();
    const keyboardChecked = $('#keyboardCheck').is(':checked');
    const screenReaderChecked = $('#screenReaderCheck').is(':checked');
    const contrastChecked = $('#contrastCheck').is(':checked');
    const semanticsChecked = $('#semanticsCheck').is(':checked');
    
    // Check if it's HTML code
    if (code.toLowerCase().includes('<!doctype html>') || 
        code.toLowerCase().includes('<html') || 
        code.toLowerCase().includes('<body') || 
        code.toLowerCase().includes('<div')) {
        
        analysisResults += '<h4>Accessibility Analysis Results</h4>';
        
        // Semantic HTML analysis
        if (semanticsChecked) {
            analysisResults += '<div class="suggestion-item">';
            analysisResults += '<h5>Semantic HTML</h5>';
            
            if (!code.toLowerCase().includes('<h1') && !code.toLowerCase().includes('<h2')) {
                analysisResults += '<p>No heading elements (h1-h6) detected. Use proper headings to establish page structure and hierarchy.</p>';
            }
            
            if (code.toLowerCase().includes('<div class="header"') || 
                code.toLowerCase().includes('<div class="footer"') || 
                code.toLowerCase().includes('<div class="nav"')) {
                analysisResults += '<p>Generic divs used for structural elements. Consider using semantic HTML5 elements like &lt;header&gt;, &lt;footer&gt;, &lt;nav&gt;, &lt;main&gt;, and &lt;section&gt;.</p>';
            }
            
            if (code.toLowerCase().includes('<table') && !code.toLowerCase().includes('<th')) {
                analysisResults += '<p>Table missing header cells. Use &lt;th&gt; elements for table headers with appropriate scope attributes.</p>';
            }
            
            if (accessibilityLevel === "AAA") {
                if (!code.toLowerCase().includes('role=')) {
                    analysisResults += '<p>For enhanced accessibility, consider adding ARIA roles to clarify element purposes.</p>';
                }
            }
            
            analysisResults += '</div>';
        }
        
        // Keyboard navigation analysis
        if (keyboardChecked) {
            analysisResults += '<div class="warning-item">';
            analysisResults += '<h5>Keyboard Navigation</h5>';
            
            if (code.toLowerCase().includes('<a') && !code.toLowerCase().includes('tabindex=')) {
                analysisResults += '<p>Links are natively keyboard accessible, but complex interactive elements may need tabindex attributes for proper focus management.</p>';
            }
            
            if (code.toLowerCase().includes('onclick=') && !code.toLowerCase().includes('onkeypress=') && !code.toLowerCase().includes('onkeydown=')) {
                analysisResults += '<p>Mouse events detected without corresponding keyboard events. Ensure all interactive elements are usable with keyboard only.</p>';
            }
            
            if (code.toLowerCase().includes('tabindex="-1"')) {
                analysisResults += '<p>Elements with tabindex="-1" are detected. This removes elements from the natural tab order. Ensure this is intentional and doesn\'t prevent access to functionality.</p>';
            }
            
            if (accessibilityLevel === "AA" || accessibilityLevel === "AAA") {
                if (!code.toLowerCase().includes('focus')) {
                    analysisResults += '<p>Consider adding visible focus indicators for interactive elements. Use :focus CSS selectors to style focused elements.</p>';
                }
            }
            
            analysisResults += '</div>';
        }
        
        // Screen reader compatibility analysis
        if (screenReaderChecked) {
            analysisResults += '<div class="warning-item">';
            analysisResults += '<h5>Screen Reader Compatibility</h5>';
            
            if (code.toLowerCase().includes('<img') && !code.toLowerCase().includes('alt=')) {
                analysisResults += '<p>Images without alt attributes detected. All images must have alternative text or be marked as decorative with alt="".</p>';
            }
            
            if (code.toLowerCase().includes('<button') && !code.toLowerCase().includes('aria-label=') && !code.toLowerCase().includes('aria-labelledby=')) {
                if (code.toLowerCase().includes('<button></button>') || code.toLowerCase().includes('<button><i class=') || code.toLowerCase().includes('<button><span class=')) {
                    analysisResults += '<p>Buttons without text content detected. Add aria-label or aria-labelledby to provide accessible names.</p>';
                }
            }
            
            if (code.toLowerCase().includes('aria-hidden="true"') && code.toLowerCase().includes('tabindex=')) {
                analysisResults += '<p>Potential conflict: Elements marked as aria-hidden="true" should not be focusable or interactive.</p>';
            }
            
            if (accessibilityLevel === "AAA") {
                if (!code.toLowerCase().includes('aria-live=')) {
                    analysisResults += '<p>For dynamic content, consider using aria-live regions to announce changes to screen reader users.</p>';
                }
            }
            
            analysisResults += '</div>';
        }
        
        // Color contrast analysis
        if (contrastChecked) {
            analysisResults += '<div class="suggestion-item">';
            analysisResults += '<h5>Color and Contrast</h5>';
            
            if (code.toLowerCase().includes('#fff') || code.toLowerCase().includes('#ffffff')) {
                if (code.toLowerCase().includes('#eee') || code.toLowerCase().includes('#f0f0f0') || code.toLowerCase().includes('#fcfcfc')) {
                    analysisResults += '<p>Potential low contrast: Light colors on white backgrounds may not provide sufficient contrast.</p>';
                }
            }
            
            if (code.toLowerCase().includes('color:') && !code.toLowerCase().includes('background-color:')) {
                analysisResults += '<p>Color properties set without explicit background colors. Ensure sufficient contrast between text and background.</p>';
            }
            
            if (code.toLowerCase().includes('color: red') || code.toLowerCase().includes('color: green')) {
                analysisResults += '<p>Color alone used to convey information. Ensure information is also conveyed through other means like text or icons.</p>';
            }
            
            if (accessibilityLevel === "AA" || accessibilityLevel === "AAA") {
                analysisResults += '<p>For ' + accessibilityLevel + ' compliance, text should have a contrast ratio of at least ' + (accessibilityLevel === "AA" ? '4.5:1' : '7:1') + ' for normal text and ' + (accessibilityLevel === "AA" ? '3:1' : '4.5:1') + ' for large text.</p>';
            }
            
            analysisResults += '</div>';
        }
        
        // Additional checks based on WCAG level
        if (accessibilityLevel === "AA" || accessibilityLevel === "AAA") {
            analysisResults += '<div class="improvement-item">';
            analysisResults += '<h5>Additional ' + accessibilityLevel + ' Level Recommendations</h5>';
            
            if (!code.toLowerCase().includes('lang=')) {
                analysisResults += '<p>Missing language attribute. Add lang attribute to the html element (e.g., &lt;html lang="en"&gt;).</p>';
            }
            
            if (code.toLowerCase().includes('<form') && !code.toLowerCase().includes('aria-required=') && !code.toLowerCase().includes('required')) {
                analysisResults += '<p>Form fields should indicate required fields both visually and programmatically.</p>';
            }
            
            if (accessibilityLevel === "AAA") {
                analysisResults += '<p>For AAA compliance, consider adding:</p>';
                analysisResults += '<ul>';
                analysisResults += '<li>Sign language interpretation for prerecorded audio content</li>';
                analysisResults += '<li>Extended audio descriptions for video content</li>';
                analysisResults += '<li>Ability to disable animations and auto-playing content</li>';
                analysisResults += '</ul>';
            }
            
            analysisResults += '</div>';
        }
        
    } else {
        // Not recognized as HTML
        analysisResults += '<div class="alert alert-warning">The provided code doesn\'t appear to be valid HTML. Please provide valid HTML markup for accessibility analysis.</div>';
    }
    
    if (analysisResults === '<h4>Accessibility Analysis Results</h4>') {
        analysisResults += '<div class="alert alert-success">No significant accessibility issues found!</div>';
    }
    
    return analysisResults;
} 