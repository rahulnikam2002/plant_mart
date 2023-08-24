/// <reference types="cypress" />

describe('Testing login functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Should show login form', () => {
    // cy.get('.input_inputText_dvJcV')
    cy.get('[data-cy=username]').type("8767213959")
    cy.get('.inputs_inputPass__raOsP').type("Rahulnikam@1979")
    cy.get('.inputs_inputPass__raOsP').click();
  })
})
