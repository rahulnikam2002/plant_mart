// cypress/integration/admin-login.spec.js
describe('Admin Login', () => {
    it('should log in an admin with valid credentials', () => {
      // Visit the admin login page  

      // Find and type into the email input field
    //   cy.get('input[name="userName"]').type('admin@example.com'); // Replace with the actual name or selector of the email input field
  
      // Find and type into the password input field
      cy.get('input[name="password"]').type('adminPassword'); // Replace with the actual name or selector of the password input field
  
      // Find and click the login button
      cy.get('button').click(); // Replace with the actual selector of your login button
  
      // Optionally, you can add assertions to check if the login was successful
      cy.url().should('eq', '/dashboard'); // Replace with the URL of the admin dashboard page
      cy.contains('Welcome, Admin').should('exist'); // Replace with a relevant text on the admin dashboard
    });
  
    it('should show an error message for invalid credentials', () => {
      // Visit the admin login page
  
      // Find and type into the email input field
      cy.get('input[name="email"]').type('invalid@example.com'); // Replace with an invalid email
  
      // Find and type into the password input field
      cy.get('input[name="password"]').type('wrongPassword'); // Replace with an invalid password
  
      // Find and click the login button
      cy.get('button[type="submit"]').click(); // Replace with the actual selector of your login button
  
      // Add assertions to check if an error message is displayed
      cy.contains('Invalid email or password').should('exist'); // Replace with the error message text displayed on your login page for invalid credentials
    });
  });
  