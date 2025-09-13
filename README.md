# UI Code Assistant

A prototype for an AI-like system that helps UI developers generate, analyze, and improve UI code. This project was created for GMU SWE632 assignment.

## Overview

UI Code Assistant is a tool designed to streamline the UI development process by providing automated assistance for component generation, design analysis, code optimization, and accessibility checking. It simulates AI-powered features to help developers create better user interfaces with less effort.

## Live - https://mason.gmu.edu/~ppatil8

## Features

1. **Component Generation**
   - Generate common UI components like forms, navigation bars, cards, etc.
   - Support for multiple styling frameworks (Bootstrap, Tailwind CSS, plain CSS)
   - Customization options based on user requirements
   - Template-based generation for login forms, signup forms, and navigation components

2. **Design Analysis**
   - Analyze layout structure
   - Evaluate color schemes
   - Check spacing and alignment
   - Assess responsiveness

3. **Code Analysis**
   - Identify performance issues
   - Suggest best practices
   - Check browser compatibility
   - Evaluate code maintainability

4. **Accessibility Checker**
   - Test against WCAG 2.1 standards (A, AA, AAA)
   - Check keyboard navigation
   - Verify screen reader compatibility
   - Evaluate color contrast
   - Assess semantic HTML usage

5. **AI Assistant Mode**
   - Simulated AI interaction for more complex requests
   - Configurable focus areas for specialized assistance


<div>
    <a href="https://www.loom.com/share/00c744d6c9244b6bba52770cedf5d362">
      <p>UI Code Assistant Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/00c744d6c9244b6bba52770cedf5d362">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/00c744d6c9244b6bba52770cedf5d362-9a0a66018fd53bbc-full-play.gif">
    </a>
  </div>

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ui-code-assistant
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open `http://localhost:8080` in your browser

## Usage

### Component Generation

1. Click on the "Generate Component" button in the sidebar
2. Select the component type and styling framework
3. Enter a description of what you need (e.g., "A login form with email and password fields")
4. Click "Submit" to generate the component
5. Copy or download the generated code

### Design/Code Analysis

1. Click on "Analyze UI Design" or "Analyze UI Code" in the sidebar
2. Paste your HTML/CSS/JavaScript code in the input area
3. Select the specific aspects you want to analyze
4. Click "Submit" to receive analysis results

### Accessibility Checking

1. Click on "Accessibility Check" in the sidebar
2. Paste your HTML code in the input area
3. Select the WCAG compliance level and specific checks to perform
4. Click "Submit" to receive accessibility recommendations

## Testing

The project includes Jest tests for component generation and other functionality.

Run all tests:
```
npm test
```

Run only unit tests:
```
npm run test:unit
```

## Project Structure

- `/src/js/` - JavaScript source files
  - `app.js` - Main application logic
  - `templates.js` - Component templates and generation logic
  - `accessibility.js` - Accessibility checking functionality
  - `analyzer.js` - Design and code analysis functions
  - `llm.js` - Simulated AI assistant functionality
- `/src/css/` - Stylesheets
- `/test/` - Jest test files

## Technologies Used

- HTML5
- CSS3
- JavaScript
- jQuery
- Bootstrap 5
- Jest (for testing)
- Selenium (for UI testing)
- Prism.js (for code highlighting)

## Future Enhancements

- Integration with actual AI services for more sophisticated analysis
- Support for additional frameworks (React, Vue, Angular)
- Performance optimization suggestions with code examples
- Expanded component library
- Real-time code validation and suggestions

## License

MIT
