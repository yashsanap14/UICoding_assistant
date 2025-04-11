/**
 * Tests for the templates.js functionality
 */

// Mock jQuery and DOM
document.body.innerHTML = `
<div>
  <select id="componentType"></select>
  <select id="styleType"></select>
  <div id="codeOutput"></div>
</div>
`;

// Mock jQuery
global.$ = jest.fn().mockImplementation((selector) => {
  return {
    val: jest.fn().mockImplementation(() => {
      if (selector === '#componentType') return 'form';
      if (selector === '#styleType') return 'bootstrap';
      return '';
    }),
    text: jest.fn(),
    attr: jest.fn(),
    addClass: jest.fn(),
    removeClass: jest.fn(),
    prop: jest.fn(),
    is: jest.fn().mockReturnValue(true),
    find: jest.fn().mockReturnThis(),
    html: jest.fn(),
    append: jest.fn(),
    on: jest.fn(),
    click: jest.fn(),
    data: jest.fn().mockReturnValue('login'),
    empty: jest.fn()
  };
});

// Mock Prism
global.Prism = {
  highlightElement: jest.fn()
};

// Mock bootstrap Modal
global.bootstrap = {
  Modal: jest.fn().mockImplementation(() => {
    return {
      show: jest.fn(),
      hide: jest.fn()
    };
  })
};

// Import the functions to test
const { handleGeneration } = require('../src/js/templates.js');

describe('Component Templates', () => {
  test('handleGeneration returns a string for form components', () => {
    // Set up the test environment
    document.getElementById = jest.fn().mockImplementation(() => {
      return { value: 'form' };
    });
    
    // Call the function with a mock input
    const result = handleGeneration('I need a login form');
    
    // Assert that the result is a non-empty string
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
  
  test('handleGeneration recognizes login form requests', () => {
    // Set up the test environment
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === 'componentType') return { value: 'custom' };
      if (id === 'styleType') return { value: 'bootstrap' };
      return {};
    });
    
    global.$ = jest.fn().mockImplementation((selector) => {
      return {
        val: jest.fn().mockImplementation(() => {
          if (selector === '#componentType') return 'custom';
          if (selector === '#styleType') return 'bootstrap';
          return '';
        }),
      };
    });
    
    // Call the function with a login form request
    const result = handleGeneration('I need a login form');
    
    // Assert that the result contains login form elements
    expect(result.toLowerCase()).toContain('login');
    expect(result.toLowerCase()).toContain('password');
  });
  
  test('handleGeneration recognizes signup form requests', () => {
    // Set up the test environment
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === 'componentType') return { value: 'custom' };
      if (id === 'styleType') return { value: 'bootstrap' };
      return {};
    });
    
    global.$ = jest.fn().mockImplementation((selector) => {
      return {
        val: jest.fn().mockImplementation(() => {
          if (selector === '#componentType') return 'custom';
          if (selector === '#styleType') return 'bootstrap';
          return '';
        }),
      };
    });
    
    // Call the function with a signup form request
    const result = handleGeneration('I need a sign up form');
    
    // Assert that the result contains signup form elements
    expect(result.toLowerCase()).toContain('create');
    expect(result.toLowerCase()).toContain('account');
  });
  
  test('handleGeneration returns a placeholder for unrecognized requests', () => {
    // Set up the test environment
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === 'componentType') return { value: 'custom' };
      if (id === 'styleType') return { value: 'bootstrap' };
      return {};
    });
    
    global.$ = jest.fn().mockImplementation((selector) => {
      return {
        val: jest.fn().mockImplementation(() => {
          if (selector === '#componentType') return 'custom';
          if (selector === '#styleType') return 'bootstrap';
          return '';
        }),
      };
    });
    
    // Call the function with an unrecognized request
    const result = handleGeneration('I need something completely unique');
    
    // Assert that the result contains the placeholder message
    expect(result.toLowerCase()).toContain('custom component');
    expect(result.toLowerCase()).toContain('placeholder');
  });
});