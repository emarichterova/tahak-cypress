/// <reference types="cypress" />

it.only('Web datepickers', () => {

    function selectDayFromCurrent(day){
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('cs-CZ', {month: 'short'})
        let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
            if(!dateAttribute.includes(futureMonth)){
                cy.get('[data-name="chevron-right"]').click()
                //cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                selectDayFromCurrent()
            } else {
                cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted")').contains(futureDay).click()
            }
        })
        return dateAssert
    }

    cy.visit('/')

    cy.contains('Forms').click()
    cy.contains('Datepicker').click()    

    cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        let dateAssert = selectDayFromCurrent(20)
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    })
})