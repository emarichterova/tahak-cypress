/// <reference types="cypress" />

it('Dialog box', () => {
    cy.visit('/')

    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

   
    //1, this code is executed if the confirm window appears, if it doesn't appear, it's not going to be executed (and it won't fail which is wrong)
    // go to tr that is inside tbody, find the first tr. This tr has child element (= find) 
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => {
        expect(confirm).to.equal('Are you sure you want to delete?')
    })

    //2
    // if the window didn't show up, barg will be empty (empty object of window:confirm event). When we'll try to gelCall for bagr, we won't have any message that it'll be called with
    const bagr = cy.stub()
    cy.on('window:confirm', bagr)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        expect(bagr.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    //3 
    //the line is not deleted, on the pop up calcel was selected
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)
})