//1. go to support folder, there is file commands.js
//2. there is some code (it's comented), start writing your commands under this code
//3. let's say we want to make a custom command to open the app:
                    //here is the name of our command
Cypress.Commands.add('openHomePage', () => {
    cy.visit('/') //the code we want to "shorten"
})

//in our test we acces this by: 
cy.openHomePage()