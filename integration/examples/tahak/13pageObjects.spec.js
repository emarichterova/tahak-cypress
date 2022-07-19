// I created folder page_objects into support folder. Into my folder I created file that organises navigation.
// Do složky support jsem si pro sérii lekcí na téma Page objects vytvořila stejnojmennou složku. Do té budu postupně tvořit soubory. Jedná se o takový outsourcing. V integration složce pak píšu test jako takový. Nejdřív vytvořím funkci, která mi pomůže ovládat lépe navigaci. Funci pojmenuji selectGroupMenuItem, do závorky jde groupName, což je proměnlivá věc. podstatou této funkce je následující: hledám odkaz, který má nějaký text, ten text je proměnlivý, takže teď tam dám to groupName, co na začátku. Tohle poleukládám do "menu". Převádím zpět na cypress a v této položce hledám věc s třídou expand-state a od toho jdu na potomka "g" a pak znova na potomka "g". Z toho invokuji atribut, který má nějaký data name, toto ukládám do "attr". Teď pokud má tento "attr" v sobě 'left', tak klikám na náš menu item (předtím samožřejmě převádím do cypressu). Funkce je hotova. Teď je tam nějaký export class NavigationPage (netuším co to je ale ok). Teď už jdeme na samotné zkratky. Vytvořím si nějaký název, dávám kulaté závorky a otevírám. Nyní volám nadefinovanou funkci a do závorek dám hodnotu, která se v selectGroupMenu dá na místo groupName. Ta hodnota je ta daná položka menu (na to, co chci kliknout). Teď se použije ta funkce. Dál vybírám na jaký prvek z podmenu klikám. V závěru píšu export const navigateTo = new NavigationPage() To navigateTo jsem si pojmenovala sama, butu tím pak v mém testu přivolávat ty jednotlivé kroky:  navigateTo.formLayoutsPage()

//z navigationPage.js
function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if( attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage{

    formLayoutsPage(){
        selectGroupMenuItem('Form') // calling the function and providing the name, that will be used instead of groupName in the function code above
        cy.contains('Form Layouts').click()
    }

    datepickerPage(){
        selectGroupMenuItem('Form')
        cy.contains('Datepicker').click({force: true})
    }

    toasterPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    toolTipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

}

export const navigateTo = new NavigationPage()