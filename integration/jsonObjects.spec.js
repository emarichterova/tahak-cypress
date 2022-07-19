/// <reference types="cypress" />

it('JSON objects', () => {
    cy.openHomePage()

    //you call the key and get the value
    const simpleObject = { "key": "value", "key2": "value2" }

    //arrays are in square brackets, values are in quotes and separated by comma
    const simpleArrayOfValues = [ "value1", "value2", "value3" ]

    const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}]

    //type of data, string is in quotes, numbers aren't
    const typeOfData = { "string": "this is string = text", "number": 3}

    const mix = {
        "FirstName": "Emma",
        "LastName": "Wittenberg",
        "Age": 24,
        "Students": [
            {
                "firstName": "Lea",
                "lastName": "Collins"
            },
            {
                "firstName": "Thomas",
                "lastName": "Brackets"
            }
        ]
    }

    //the value of 2nd key will be in console, the value is from our "simpleObject", the 2 methods do the same
    console.log(simpleObject.key2)
    console.log(simpleObject["key2"])

    //arrays
    console.log(simpleArrayOfValues[1]) //we put the index number into square braces, so in console will be value2 (we start from 0)

    console.log(arrayOfObjects[2].key3)

    //we don't put Students into brackets because they aren't in any
    console.log(mix.Students[0].firstName)

    const lastNameOfSecondStudent = mix.Students[1].lastName

})