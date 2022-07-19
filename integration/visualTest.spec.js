/// <reference types="cypress" />

//install a plugin from https://github.com/meinaart/cypress-plugin-snapshots
        //npm i cypress-plugin-snapshots -S
        //cypress.json –> "ignoreTestFiles": ["**/__snapshots__/*", "**/__image_snapshots__/*"]
        //cypress/plugins/index.js –> 
            //const { initPlugin } = require('cypress-plugin-snapshots/plugin'); 
            //module.exports = (on, config) => {initPlugin(on, config); return config;};
        //cypress/support/index.js –> import 'cypress-plugin-snapshots/commands';
        

    

describe('visual test', () => {

    it('visual test', () => {
        cy.openHomePage()

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').then( gridForm => {
            cy.wrap(gridForm).toMatchImageSnapshot() //first time using it makes a photo of the element, next time it uses this photo as reference
            cy.document().toMatchImageSnapshot() //make a snapshot of the whole page

        })

    })

    //another approach to visual testing is using Percy https://percy.io/
    //percy separates visual test from functional test (so functional test can pass but there can be difference in visual test, it'll stil pass)

    it.only('visual test with Percy', () => {
        cy.openHomePage()

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').then( gridForm => {
            cy.wait(1000)
            cy.percySnapshot('FormsLayouts') //FormsLayouts is the name of the snapshot
        })
    })
})
