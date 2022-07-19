
export class formLayoutsPage{

    //here we say that we are going to use something we called name and email in this function, we that put it where we want to use it, when calling the function in our test, we write the values in the order we specified it in line 5
    submitInlineFormWithNameAndEmail(name, email){
        cy.contains('nb-card', 'Inline form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            cy.wrap(form).submit() //can be used when the html tag form is used (we could also click on the submit button, but this is easier)
        })
    }

    submitBasicFormWithEmailAndPassword(email, password){
        cy.contains('nb-card', 'Basic form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force:true}) //here we have to locate it with type checkbox otherwise it'll think it isn't a checkbox
            cy.wrap(form).submit()
        })
    }

}

//I'll "call" the function with onFormsLayoutsPage and then select that I want to use the submitInlineFormWithNameAndEmail
export const onFormsLayoutsPage = new formLayoutsPage()