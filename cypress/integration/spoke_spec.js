describe('Anonymous', function(){
  it('home page <title> is correct', function(){
    cy.fixture('spoke.json').then((fixture) => {
      cy.visit(fixture.base_url)
      cy.title().should('eq', 'Spoke')
    })
  })
})

describe('Admin', function(){
  context('Campaign creation', function(){
    beforeEach(function(){
      cy.fixture('spoke.json').then((fixture) => {
        cy.visit(`${fixture.base_auth0_url}logout`)
        cy.visit(`${fixture.base_url}login`)
        cy.get('.auth0-lock-input-email input')
          .type(fixture.users.admin.email)
        cy.get('.auth0-lock-input-password input')
          .type(fixture.users.admin.pass)
        cy.get('.auth0-lock-submit').click()
      })
    })

    it('Log in works', function(){
      cy.get('#mount').should('contain', 'Campaigns')
    })

    it('Creating campaign works', function(){
      cy.get('#mount div div div:nth-child(2) div:nth-child(2) div div:nth-child(3) button').click()
      cy.get('#mount').should('contain', 'You need to complete all the sections below before you can start this campaign')
      var today = new Date();
      cy.get('input[name=title]')
        .type(`Automated Test Campaign ${today.toISOString()}`)
      cy.get('input[name=description]')
        .type(`Automated Test Description`)
      cy.get('input[name=dueBy]')
        .click()
      // TODO: make calendar elements reliably selectable so we can automate
      // clicks. See: https://github.com/MoveOnOrg/Spoke/issues/396
    })
  })
})
