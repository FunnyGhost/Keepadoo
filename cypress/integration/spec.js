/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Keepadoo', () => {
  const email = chance.email();
  const pass = 'ValidPassword23';

  beforeEach(() => {
    cy.visit('');
    cy.wait(1000);
  });

  describe('Homepage', () => {
    it('has a title', () => {
      cy.contains('Keepadoo');
    });

    it('should go to the login page', () => {
      cy.get('.login-button').click();
      cy.get('.login-form').should('exist');
    });
  });

  describe('User not logged in', () => {
    it('should show the login screen when the user wants to go to movie lists', () => {
      cy.get('.movies-lists-link')
        .contains('Movie lists')
        .click();

      cy.get('.login-form').should('exist');
    });

    it('should show the login screen when the user wants to go to tv-show lists', () => {
      cy.get('.tv-shows-lists-link')
        .contains('Tv show lists')
        .click();

      cy.get('.login-form').should('exist');
    });
  });
});
