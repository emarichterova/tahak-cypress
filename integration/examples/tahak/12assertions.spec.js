/// <reference types="cypress" />

// https://docs.cypress.io/guides/references/assertions

/*
BDD assertions:
expecting value number one and something you want to do against value number two
    expect(name).to.not.equal('Jane')
    expect(42).to.equal(42)

TDD assertions:
assert is something
    assert.isOk('everything', 'everything is ok')

Chai-jQuery assertions:
expect element (as the parameter) and do something with it
    expect($el).to.have.css('background-color', 'rgb(0, 0, 0)')
    expect($el).to.have.class('foo')
    expect($el).to.have.text('I love testing')

Sinon-Chai assertions:
only wokrs with cy.stup() or cy.spy(), related to unit testing
    expect(spy).to.have.callCount(n)
*/

    cy.get('[for="exampleInputEmail1"]')
        .should('contain', 'Email address')
        .should('have.class', 'label')
