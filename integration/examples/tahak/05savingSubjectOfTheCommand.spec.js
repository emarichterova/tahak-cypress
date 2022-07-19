/// <reference types="cypress" />

it('than and wrap method', () => {
    cy.visit('/')

    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //version 1 –> long
    /*cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')*/


    //version 2 –> short
    //first we found element nb-card that has Using the Grid in it (= unique locator), we saved the result of this into "firstForm"; then we call firstForm, from it we find element with locator for="inputEmail1", we get the text from it and we save the text into EmailLabelFirst; the same process is done for password; in the end we make an assertion – checking if the text we have in EmailLabelFirst equals to 'Email'
    //JQuery syntax
    cy.contains('nb-card', 'Using the Grid').then( firstForm => {
        const EmailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
        const PasswordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

        expect(EmailLabelFirst).to.equal('Email')
        expect(PasswordLabelFirst).to.equal('Password')

        //because we want to assert the result of PasswordLabelFirst with PasswordLabelSecond we have to put the PasswordLabelSecond (it is in another form) into the first function because the results of the function are only seen inside of the function
        cy.contains('nb-card', 'Basic form').then( secondForm => {
            const PasswordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text

            expect(PasswordLabelFirst).to.equal(PasswordLabelSecond)

            //if you want to convert the JQuery to cypress, use wrap function
            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
        })
    })

})

