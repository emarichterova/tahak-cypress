/// <reference types="cypress" />

it('lists and dropdowns', () => {
    cy.visit('/')
    
    //1
    //clicking on the element, finding the list item containing "Dark", verifying the text, verifying that it did what it was meant to do
    /*cy.get('nav nb-select').click()
    cy.get('.options-list').contains('Dark').click() //not an assertion
    cy.get('nav nb-select').should('contain', 'Dark').click() //this is an assertion
    cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')*/ 

    //2
    //if we had "select" instead of "nb-select" we could use method select
    //we get an item, we save this into dropdown, in order to use dropdown we have to wrap it (make it cypress again), than we get the list items and we say that every thing is a listItem, we get the text from each of them and save it to itemText, than we specify colours, clicking on the item, verifying that it is displayed in input field of our menu, veryfying for each thing; because we don't want the test to end with open dropdown, we specify that we click on "dropdown" only 3 times
    cy.get('nav nb-select').then( dropdown => {
        cy.wrap(dropdown).click()
        //options-list je třída pro celé ul, nb-option je "html značka" pro jednotlivé položky
        cy.get('.options-list nb-option').each( (listItem, index) => {
            const itemText = listItem.text().trim() //by using trim, we remove the spacing in front of the word (we have it there)

            const colors = {
                "Light": "rgb(255, 255, 255)",
                "Dark": "rgb(34, 43, 69)",
                "Cosmic": "rgb(50, 50, 89)",
                "Corporate": "rgb(255, 255, 255)"
            }

            cy.wrap(listItem).click()
            cy.wrap(dropdown).should('contain', itemText)
            cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
            if(index < 3){
                cy.wrap(dropdown).click()
            }
            
        })
    })
})