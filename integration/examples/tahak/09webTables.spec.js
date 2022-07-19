/// <reference types="cypress" />

it.only('Web tables', () => {
    cy.visit('/')

    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1 changin value in a cell and verifying
    //Go to the body of the table and find the line which contains text Larry, save this information to tableRow. CLick on edit, find the cell for age (stil in the Larry line), clear the information, type 25. Now click on save. Verify that the value of the cell is now 25 (and not 18 that was there before).
    cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        //cy.wrap(tableRow).should('contain', '25') //tady říkáme, že ta řádka by měla obsahovat 25
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25') //tady říkáme, že ta jedna určitá buňka by měla obsahovat 25, to eq má 6, protože je 7. buňkou a začíná se číslovat 0
    })

    //2 adding a new line
    // go to the head of the table and click on + (= add a new line), new line is created, find this line and save this information to tableRow (e.g. how to locate this added line), fill in all of the cells and click on create. Verify that a new line with the information we typed in was created. (Go to table body, find a line, pick the first, find a cell and save this as tableColumns, verify that 3rd cell contains Emma...)
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then( tableRow => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Emma')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Wittenberg')
        cy.wrap(tableRow).find('[placeholder="Username"]').type('@e.witt')
        cy.wrap(tableRow).find('[placeholder="E-mail"]').type('emma.wittenberg@gmail.com')
        cy.wrap(tableRow).find('[placeholder="Age"]').type('23')
        cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then( tableColums => {
        cy.wrap(tableColums).eq(2).should('contain', 'Emma')
        cy.wrap(tableColums).eq(3).should('contain', 'Wittenberg')
    })
    

    //3a
    // go to the head of the table (we use it to search through the table) and type 20 into the column for age, wait 0.5 s (Cypress is too fash so we have to tell it to wait for the page to filter the result). Now verify that each of the results has 20 in the Age column.
    cy.get('thead [placeholder="Age"').type('20')
    cy.wait(500)
    cy.get('tbody tr').each( tableRow => {
        cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
    })

    //3b
    // we defined variable Age. We transfer it back to cypress and go to the head of the table and clear the data that is there (if there is any), the first value is typed. We wait for the app to filter the table and verify that each table row has the correct value in the Age column. Now we repeat the whole process all over again (with the other values).
    const Age = [20, 30, 40]

    cy.wrap(Age).each( Age => {
        cy.get('thead [placeholder="Age"').clear().type(Age)
        cy.wait(500)
        cy.get('tbody tr').each( tableRow => {
            cy.wrap(tableRow).find('td').eq(6).should('contain', Age)
        })
    })
    //3c
    // we defined variable Age. We transfer it back to cypress and go to the head of the table and clear the data that is there (if there is any), the first value is typed. Now we assert if this value is equal to 200. If it is, "No data found" should be displayed. If the age value doesn't equal 200 the "else" version is executed We wait for the app to filter the table and verify that each table row has the correct value in the Age column. Now we repeat the whole process all over again (with the other values). 
    const age = [20, 30, 40, 200]

    cy.wrap(age).each( age => {
        cy.get('thead [placeholder="Age"').clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each( tableRow => {
            if(age == 200){
                cy.wrap(tableRow).should('contain', 'No data found')
            } else {
                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
            }
        })
    })
})