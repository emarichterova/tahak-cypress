/// <reference types="cypress" />

it('than and wrap method', () => {
    cy.visit('/')

    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //there are 3 methods on how to get a text value from an element
    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2 saving function, saving it as a "label", jquery method text to get the text from the label, assertion to "Email address"
    cy.get('[for="exampleInputEmail1"]').then ( label => {
        expect(label.text()).to.equal('Email address')
    })

    //3 used cypress invoke method to get the text from the page, we saved this text into function we called "invokeFunction", in the end we made an assertion that the value in our function "text" equals to Email address
    cy.get('[for="exampleInputEmail1"]').invoke('text').then( invokeFunction => {
        expect(invokeFunction).to.equal('Email address')
    })

    cy.contains('nb-card', 'Basic form')
    .find('nb-checkbox')
    .click()
    .find('.custom-checkbox')
    .invoke('attr', 'class') //we want to invoke an atribute, that has class; this invoke function now has the value we want
    //.should('contain', 'checked') //one way to make an assertion using method should
    .then(classValue => {
        expect(classValue).to.equal('checked')
    }) //second way of making an assertion

})

it('assert property', () => {
    cy.visit('/')

    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Jun 17, 2022')
    })
})