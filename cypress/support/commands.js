// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Maria');
  cy.get('#lastName').type('Almeira');
  cy.get('#email').type('maria.almeira@teste.com');
  cy.get('#open-text-area').type('Maria é uma ótima funcionária');

  cy.get('button.button').contains('Enviar').click();
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitObject', (data) => {
  cy.get('#firstName').type(data.nome);
  cy.get('#lastName').type(data.sobrenome);
  cy.get('#email').type(data.email);
  cy.get('#open-text-area').type(data.texto);
  cy.get('button.button').contains('Enviar').click();
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitObjectStandard', (data = {
  nome: 'Alice',
  sobrenome: 'Medeiros',
  email: 'alice.medeiros@teste.com',
  texto: 'Alice Medeiros'
}) => {
  cy.get('#firstName').type(data.nome);
  cy.get('#lastName').type(data.sobrenome);
  cy.get('#email').type(data.email);
  cy.get('#open-text-area').type(data.texto);
  cy.get('button.button').contains('Enviar').click();
})


