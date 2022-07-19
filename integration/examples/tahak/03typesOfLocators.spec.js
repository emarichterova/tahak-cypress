/// <reference types="cypress" />
//cypress reference above – so VSC will support IntelliSence which will help us with identifying the cypress methods

//to execute any cypress comand, you starty with "cy.", than you add the method you wan to use

//get any web element, 'provide a locator name', 
cy.get('')


//by tag name (=by HTML tag)
cy.get('input')

// find by ID (put # in front of the ID value to tell cypress that it's an ID)
cy.get('#inputEmail1')

// by class (put . in front of)
cy.get('.input-full-width')

// by attribute name
cy.get('[placeholder]')

// by attribute name and value
cy.get('[placeholder="Email"]')

// by class value (entire value for the class attribute)
cy.get('[class="input-full-width size-medium shape-rectangle"]')

// by tag name and attribute with value, we don't separate tag name form attribute value (by spacing...)
cy.get('input[placeholder="Email"]')

// by two different attributes
cy.get('[placeholder="Email"][type="email"]')

// by tag name, attribute with value, ID and class name
cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

// the most recommended by Cypress (create our own attributes – specially added for automation testing)
cy.get('[data-cy="imputEmail1"]')


describe('Our first test suite', () => {

    it('first test', () => {

        //visiting a website
        //if we specified baseUrl (–> "baseUrl": "http://localhost:4200"), we only use "/"
        cy.visit('/')

        //searching for any text; we are looking for a text "Forms", then looking for "Form Layouts"
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    })
    
})