/// <reference types="cypress" />

//check method will only work with input elements type checkbox and radiobuttons
// - it can pick and check multiple checkboxes
// – can only check, can't uncheck

it('radio button', () => {
    cy.visit('/')

    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //looking for element with type="radio", that is inside nb-card (because non of those have an unique element, we used 'Using the Grid), result of this is saved into function radioButtons, now we are in JQuery so we have to 
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
        cy.wrap(radioButtons) //transform radioButtons from JQuery to cypress syntax
            .first() //select the first radiobutton; we could also use eq(0)
            .check({force: true}) //there is some invisible layer and cypress wouldn't naturally see it, so we have to force it, so it can select it
            .should('be.checked') //assertion

        cy.wrap(radioButtons) //we have to transform it every time
            .eq(1) //there isn't a "second" function, so we have to use eq(1)
            .check({force: true})
            .should('be.checked')

        cy.wrap(radioButtons)
            .first()
            .should('not.be.checked')

        cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled') //the last button should be disabled
    })
})

it('checkbox', () => {
    cy.visit('/')

    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    //if some checkbox is already checked, the check method won't ucheck it; it will check it, if it's unchecked
    //in order to uncheck you have to use click
    //cy.get('[type="checkbox"]').check({force: true})

    cy.get('[type="checkbox"]').eq(0).click()
    cy.get('[type="checkbox"]').eq(1).click({force: true})
})