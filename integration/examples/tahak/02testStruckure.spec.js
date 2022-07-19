
//the simplest structure of a test
describe('Our first test suite', () => {

    it('first test', () => {

    })
    
})

//more complex structure with examples how can it look
                                    //opening callback function
describe('Describtion of the test suite', () => { //opening the body of the test

    describe('inserted describe', () => {

        beforeEach('code for every test', () => {
            //repetitive code – this is being executed before every it in this describe
            // eg. logging into an app
            //this code only applies for tests in this describe (–>inserted describe)
        })

        it('some test name eg. clicking the radio button', () => {

        })
    })

    it('description of this test', () => {
        // here is the actual code for the test
    })

    it('second test', () => {
        // here is the actual code for the test
    })

    it('third test', () => {
        // here is the actual code for the test
    })

})

describe('Second test suite', () => { //opening the body of the test

    it('first test', () => {
        // here is the actual code for the test
    })

    //here we can have second test, third test and so on

})
