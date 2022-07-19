import { on } from "cluster"
import { onDatepickerPage } from "../support/page_objects/datePickerPage"
import { onFormsLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo, onNavigationPage } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Object', () => {
    
    //before each test (it) is executed, this will execute first
    beforeEach('open app', () => {
        cy.openHomePage()
    })

    it('verify navigation accross the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.toolTipPage
    })

    it.only('should submit Inline and Basic form and select tomorrow in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormsLayoutsPage.submitInlineFormWithNameAndEmail('Ema', 'test@ema.io')
        onFormsLayoutsPage.submitBasicFormWithEmailAndPassword('bagr@testik.ovoce', 'babickaplakala')
        navigateTo.datepickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Emma', 'Wittenberg')
        onSmartTablePage.updateAgeByFirstName('Emma', 56)
        onSmartTablePage.deleteRowByIndex(1)
    })
})