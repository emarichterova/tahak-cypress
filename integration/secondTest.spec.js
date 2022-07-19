/// <reference types="cypress" />

describe('first test suite', () => {

    it.only('lists and dropdowns', () => {
        cy.visit('/')
        
        //1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click() //not an assertion
        cy.get('nav nb-select').should('contain', 'Dark').click() //this is an assertion
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        //2
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            //options-list je třída pro celé ul, nb-option je "html značka" pro jednotlivé položky
            cy.get('.options-list nb-option').each( listItem => {
                const itemText = listItem.text().trim() //by using trim, we remove the spacing in front of the word (we have it there)

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)",
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
            })
        })
    })
})