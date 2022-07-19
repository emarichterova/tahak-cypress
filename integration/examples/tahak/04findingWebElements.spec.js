/// <reference types="cypress" />

it('secondTest', () => {
       
    cy.visit('/')

    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')

    cy.contains('Sign in')

    cy.contains('[status="warning"]', 'Sign in')

    //we found an item with unique locator (id= "inputEmail3"), from this element we are traveling to it's parent 'form' (HTML tag), inside of form is a button (also HTML tag), this button should say 'Sign in' (assertion); now we want to find the checkbox: (continuing from were we ended) travel to the parent element (–> form), from that to 'nb-checkbox' (= the checkbox + the text form it) and we click on (so now it is checked)
    //find method can be only used when going from a parent element
    cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click()
    
    //we found an element with unique indentifier (= 'Horizontal form'), ten má rodiče 'nb-card', z toho hledám pole, které má parametr type="email"
    //eg. we found a 'nb-card', because there are many of nb-cards on this webpage, we specified that we are looking for the one with Horizontal form in it (= unique locator), now we can look for the e-mail input fiel with locator type="email"
    //this whole thing is a faster was of finding Horizontal form, from this travelling to the parent (nb-card) and from here to the thing we are looking for (–> type="email")
    //= hey cypress, find nb-card that contains Horizontal form, within nb-card find xxx
    cy.contains('nb-card','Horizontal form').find('[type="email"]')
    //line 24 does the same as line 23, but it's a bit shorter
    cy.contains('Horizontal form').parents('nb-card').find('[type="email"]')
})



