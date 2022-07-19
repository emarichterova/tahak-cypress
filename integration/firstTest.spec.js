/// <reference types="cypress" />

describe('first test suite', () => {

    it('first test', () => {

        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        
        // search by tag name
        cy.get('input')

        // find by ID (put # in front of the ID value to tell cypress that it's an ID)
        cy.get('#inputEmail1')

        // by class (put . in front of)
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[placeholder]')

        // by attribute name and value
        cy.get('[placeholder="Email"]')

        // by class value (entire value for the class attribute)
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        // by two different attributes
        cy.get('[placeholder="Email"][type="email"]')
 
        // by tag name, attribute with value, ID and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // the most recommended by Cypress (create our own attributes)
        cy.get('[data-cy="imputEmail1"]')
    })

    it('secondTest', () => {
       
        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]', 'Sign in')

        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click()

        cy.contains('nb-card','Horizontal form').find('[type="email"]')
    })

    it('then and wrap methods', () => {
        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        /*cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')*/


        //cypress style
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })

        })

    })

    it('invoke command', () => {
        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //how to get text value:

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2 saving function, saving it as a "label", jquery method text to get the text from the label, assertion to "Email address"
        cy.get('[for="exampleInputEmail1"]').then ( label => {
            expect(label.text()).to.equal('Email address')
        })

        //3 similar as 2, but used cypress invoke method to get the text from the page, saved the text as a parameter into "text", assertion to found out if our "text" equals "Email address"
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain', 'checked') varianta 1
            .then(classValue => {
                expect(classValue).to.contain('checked')
            }) //varianta 2
    })

    it('assert property', () => {
        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Jun 17, 2022')
        })
    })

    it('radio button', () => {
        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons)
            .first()
            .check({force: true})
            .should('be.checked')

            cy.wrap(radioButtons)
            .eq(1)
            .check({force: true})
            .should('be.checked')

            cy.wrap(radioButtons)
            .first()
            .should('not.be.checked')

        cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled')
        })
    })

    it('checkbox', () => {
        cy.visit('/')

        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        //cy.get('[type="checkbox"]').check({force: true})

        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true})
    })

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

    it('Web tables', () => {
        cy.visit('/')

        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            //cy.wrap(tableRow).should('contain', '25') //tady říkáme, že ta řádka by měla obsahovat 25
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25') //tady říkáme, že ta jedna určitá buňka by měla obsahovat hodnotu 25. Eq je pořadí buňky v řádku. Začíná se číslem 0, takže pokud chci 7. buňku, eq = 6.
        }) //find table row that contains Larry, save this parameter as tableRow

        //2
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
        
        //3
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

        /*cy.get('thead [placeholder="Age"').type('20')
        cy.wait(500)
        cy.get('tbody tr').each( tableRow => {
            cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
        })*/
    })

    it('Web datepickers', () => {
        cy.visit('/')
    
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        let date = new Date()
        date.setDate(date.getDate() + 3)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', {month: 'short'})

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted")').contains(futureDay).click()
                }
            })
        })
    })

    it('assert property / Datepicker', () => {

        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en-US', {month: 'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted').contains(futureDay).click()
                }
            })
            return dateAssert
        }
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input =>{
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(300)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        })
    })


    it('PopUps and ToolTips', () => {
        cy.visit('/')
    
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

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
        //if the window didn't show up, barg will be empty (empty object of window:confirm event). When we'll try to gelCall for bagr, we won't have any message that it'll be called with
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

    it.only('assertions', () => {
        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')

        cy.get('[for="exampleInputEmail1"]').then ( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })
    })
})

