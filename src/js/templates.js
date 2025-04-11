/**
 * UI Code Assistant - Component Templates and Generation
 */

// Templates for UI components
const componentTemplates = {
    form: {
        login: {
            name: 'Login Form',
            description: 'Simple login form with email/username and password fields',
            image: 'login-form.png',
            bootstrap: `
<form class="p-4 border rounded shadow-sm">
  <h2 class="mb-4">Login</h2>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" required>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="rememberMe">
    <label class="form-check-label" for="rememberMe">Remember me</label>
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
  <div class="mt-3">
    <a href="#" class="text-decoration-none">Forgot password?</a>
  </div>
</form>`,
            tailwind: `
<form class="p-6 bg-white border rounded-lg shadow-md max-w-md mx-auto">
  <h2 class="text-2xl font-bold mb-6 text-gray-800">Login</h2>
  <div class="mb-4">
    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email address</label>
    <input type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" required>
    <p class="text-gray-600 text-xs italic mt-1">We'll never share your email with anyone else.</p>
  </div>
  <div class="mb-6">
    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
    <input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" required>
  </div>
  <div class="mb-6">
    <label class="flex items-center">
      <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
      <span class="ml-2 text-gray-700 text-sm">Remember me</span>
    </label>
  </div>
  <div class="flex items-center justify-between">
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
    <a href="#" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot password?</a>
  </div>
</form>`,
            plain: `
<form style="padding: 20px; border: 1px solid #ccc; border-radius: 5px; width: 350px; margin: 0 auto; box-shadow: 0 2px 5px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
  <h2 style="margin-bottom: 20px; color: #333;">Login</h2>
  <div style="margin-bottom: 15px;">
    <label for="email" style="display: block; margin-bottom: 5px; font-weight: bold;">Email address</label>
    <input type="email" id="email" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
    <small style="color: #666; font-size: 12px;">We'll never share your email with anyone else.</small>
  </div>
  <div style="margin-bottom: 15px;">
    <label for="password" style="display: block; margin-bottom: 5px; font-weight: bold;">Password</label>
    <input type="password" id="password" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
  </div>
  <div style="margin-bottom: 15px;">
    <label style="display: flex; align-items: center;">
      <input type="checkbox" id="rememberMe" style="margin-right: 8px;">
      <span>Remember me</span>
    </label>
  </div>
  <button type="submit" style="background-color: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer;">Login</button>
  <div style="margin-top: 15px;">
    <a href="#" style="color: #007bff; text-decoration: none;">Forgot password?</a>
  </div>
</form>`
        },
        signup: {
            name: 'Sign Up Form',
            description: 'Registration form with name, email, and password fields',
            image: 'signup-form.png',
            bootstrap: `
<form class="p-4 border rounded shadow-sm">
  <h2 class="mb-4">Create an Account</h2>
  <div class="row">
    <div class="col-md-6 mb-3">
      <label for="firstName" class="form-label">First Name</label>
      <input type="text" class="form-control" id="firstName" required>
    </div>
    <div class="col-md-6 mb-3">
      <label for="lastName" class="form-label">Last Name</label>
      <input type="text" class="form-control" id="lastName" required>
    </div>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" required>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" required>
    <div class="form-text">Password must be at least 8 characters long.</div>
  </div>
  <div class="mb-3">
    <label for="confirmPassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="confirmPassword" required>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="termsCheck" required>
    <label class="form-check-label" for="termsCheck">I agree to the Terms and Conditions</label>
  </div>
  <button type="submit" class="btn btn-primary">Create Account</button>
</form>`,
            tailwind: `
<form class="p-6 bg-white border rounded-lg shadow-md max-w-md mx-auto">
  <h2 class="text-2xl font-bold mb-6 text-gray-800">Create an Account</h2>
  <div class="flex flex-wrap -mx-3 mb-4">
    <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
      <label for="firstName" class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
      <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" required>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label for="lastName" class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
      <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" required>
    </div>
  </div>
  <div class="mb-4">
    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email address</label>
    <input type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" required>
  </div>
  <div class="mb-4">
    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
    <input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" required>
    <p class="text-gray-600 text-xs italic mt-1">Password must be at least 8 characters long.</p>
  </div>
  <div class="mb-6">
    <label for="confirmPassword" class="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
    <input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" required>
  </div>
  <div class="mb-6">
    <label class="flex items-center">
      <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600" required>
      <span class="ml-2 text-gray-700 text-sm">I agree to the Terms and Conditions</span>
    </label>
  </div>
  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Create Account</button>
</form>`,
            plain: `
<form style="padding: 20px; border: 1px solid #ccc; border-radius: 5px; width: 400px; margin: 0 auto; box-shadow: 0 2px 5px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
  <h2 style="margin-bottom: 20px; color: #333;">Create an Account</h2>
  <div style="display: flex; gap: 10px; margin-bottom: 15px;">
    <div style="flex: 1;">
      <label for="firstName" style="display: block; margin-bottom: 5px; font-weight: bold;">First Name</label>
      <input type="text" id="firstName" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
    </div>
    <div style="flex: 1;">
      <label for="lastName" style="display: block; margin-bottom: 5px; font-weight: bold;">Last Name</label>
      <input type="text" id="lastName" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
    </div>
  </div>
  <div style="margin-bottom: 15px;">
    <label for="email" style="display: block; margin-bottom: 5px; font-weight: bold;">Email address</label>
    <input type="email" id="email" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
  </div>
  <div style="margin-bottom: 15px;">
    <label for="password" style="display: block; margin-bottom: 5px; font-weight: bold;">Password</label>
    <input type="password" id="password" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
    <small style="color: #666; font-size: 12px;">Password must be at least 8 characters long.</small>
  </div>
  <div style="margin-bottom: 15px;">
    <label for="confirmPassword" style="display: block; margin-bottom: 5px; font-weight: bold;">Confirm Password</label>
    <input type="password" id="confirmPassword" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
  </div>
  <div style="margin-bottom: 15px;">
    <label style="display: flex; align-items: center;">
      <input type="checkbox" id="termsCheck" style="margin-right: 8px;" required>
      <span>I agree to the Terms and Conditions</span>
    </label>
  </div>
  <button type="submit" style="background-color: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; width: 100%;">Create Account</button>
</form>`
        }
    },
    navbar: {
        basic: {
            name: 'Basic Navbar',
            description: 'Simple navigation bar with logo and links',
            image: 'basic-navbar.png',
            bootstrap: `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Brand Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`,
            tailwind: `
<nav class="bg-white px-6 py-4 shadow">
  <div class="flex items-center justify-between">
    <div>
      <a href="#" class="text-lg font-bold text-gray-800">Brand Logo</a>
    </div>
    <div class="hidden md:block">
      <div class="flex items-center space-x-4">
        <a href="#" class="px-2 py-1 text-gray-700 font-medium hover:text-gray-900">Home</a>
        <a href="#" class="px-2 py-1 text-gray-700 font-medium hover:text-gray-900">Features</a>
        <a href="#" class="px-2 py-1 text-gray-700 font-medium hover:text-gray-900">Pricing</a>
        <a href="#" class="px-2 py-1 text-gray-700 font-medium hover:text-gray-900">About</a>
        <a href="#" class="px-2 py-1 text-gray-700 font-medium hover:text-gray-900">Contact</a>
      </div>
    </div>
    <div class="md:hidden">
      <button class="text-gray-700 focus:outline-none">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>
</nav>`,
            plain: `
<nav style="background-color: #f8f9fa; padding: 15px 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <a href="#" style="font-size: 1.25rem; font-weight: bold; color: #333; text-decoration: none;">Brand Logo</a>
    <button id="toggleNav" style="background: none; border: none; display: none; cursor: pointer;">
      <span style="display: block; width: 25px; height: 3px; background-color: #333; margin: 5px 0;"></span>
      <span style="display: block; width: 25px; height: 3px; background-color: #333; margin: 5px 0;"></span>
      <span style="display: block; width: 25px; height: 3px; background-color: #333; margin: 5px 0;"></span>
    </button>
    <ul id="navLinks" style="display: flex; list-style-type: none; margin: 0; padding: 0;">
      <li><a href="#" style="color: #007bff; text-decoration: none; padding: 0 15px;">Home</a></li>
      <li><a href="#" style="color: #333; text-decoration: none; padding: 0 15px;">Features</a></li>
      <li><a href="#" style="color: #333; text-decoration: none; padding: 0 15px;">Pricing</a></li>
      <li><a href="#" style="color: #333; text-decoration: none; padding: 0 15px;">About</a></li>
      <li><a href="#" style="color: #333; text-decoration: none; padding: 0 15px;">Contact</a></li>
    </ul>
  </div>
</nav>
<script>
  // Basic responsive behavior
  const toggleNav = document.getElementById('toggleNav');
  const navLinks = document.getElementById('navLinks');
  
  function handleResize() {
    if (window.innerWidth < 768) {
      toggleNav.style.display = 'block';
      navLinks.style.display = navLinks.classList.contains('show') ? 'flex' : 'none';
      navLinks.style.flexDirection = 'column';
    } else {
      toggleNav.style.display = 'none';
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'row';
    }
  }
  
  toggleNav.addEventListener('click', function() {
    navLinks.classList.toggle('show');
    navLinks.style.display = navLinks.classList.contains('show') ? 'flex' : 'none';
  });
  
  window.addEventListener('resize', handleResize);
  handleResize();
</script>`
        }
    }
};

// Function to populate templates in the modal
function populateTemplates() {
    const templatesList = $('#templatesList');
    templatesList.empty();
    
    const componentType = $('#componentType').val();
    const templates = componentTemplates[componentType];
    
    if (!templates) {
        templatesList.html('<p>No templates available for this component type</p>');
        return;
    }
    
    for (const [id, template] of Object.entries(templates)) {
        const card = `
            <div class="col-md-6 mb-4">
                <div class="card h-100 template-card" data-template-id="${id}">
                    <div class="card-body">
                        <h5 class="card-title">${template.name}</h5>
                        <p class="card-text small">${template.description}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <button class="btn btn-sm btn-outline-primary w-100 select-template" data-template-id="${id}">Select</button>
                    </div>
                </div>
            </div>
        `;
        
        templatesList.append(card);
    }
    
    // Add click event to template selection buttons
    $('.select-template').on('click', function() {
        const templateId = $(this).data('template-id');
        const componentType = $('#componentType').val();
        const styleType = $('#styleType').val();
        
        if (componentTemplates[componentType] && componentTemplates[componentType][templateId]) {
            const template = componentTemplates[componentType][templateId];
            let code = template[styleType] || template.bootstrap; // Default to bootstrap if selected style not available
            
            // Insert the template into the output
            $('#codeOutput').text(code.trim());
            $('#codeOutput').attr('class', 'language-markup');
            Prism.highlightElement(document.getElementById('codeOutput'));
            $('#copyBtn, #downloadBtn').prop('disabled', false);
            
            // Close the modal
            bootstrap.Modal.getInstance(document.getElementById('templatesModal')).hide();
        }
    });
}

// Function to handle generation of code based on user input
function handleGeneration(input) {
    const componentType = $('#componentType').val();
    const styleType = $('#styleType').val();
    
    // For this prototype, let's use templates for common patterns
    // In a real app, this would call an AI service to generate custom components based on the description
    
    if (componentType === 'custom') {
        // Simple rules-based generation for demonstration
        if (input.toLowerCase().includes('login') || input.toLowerCase().includes('sign in')) {
            return componentTemplates.form.login[styleType] || componentTemplates.form.login.bootstrap;
        } else if (input.toLowerCase().includes('sign up') || input.toLowerCase().includes('register')) {
            return componentTemplates.form.signup[styleType] || componentTemplates.form.signup.bootstrap;
        } else if (input.toLowerCase().includes('nav') || input.toLowerCase().includes('menu')) {
            return componentTemplates.navbar.basic[styleType] || componentTemplates.navbar.basic.bootstrap;
        } else {
            // Default response with customized message
            return `<!-- 
Based on your description: "${input}", 
I would generate a custom component. In a real implementation,
this would use an AI service to create the exact component you need.

For now, here's a placeholder structure that you can customize:
-->

<div class="component-container">
  <h2>Custom Component</h2>
  <div class="component-content">
    <p>This would be your custom component based on: "${input}"</p>
  </div>
</div>`;
        }
    } else {
        // Use the first template for the selected component type
        const templates = componentTemplates[componentType];
        if (templates) {
            const firstTemplateId = Object.keys(templates)[0];
            return templates[firstTemplateId][styleType] || templates[firstTemplateId].bootstrap;
        }
    }
    
    return '<!-- No matching template found -->';
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleGeneration,
        componentTemplates
    };
}