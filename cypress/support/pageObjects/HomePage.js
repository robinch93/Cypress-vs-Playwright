const { Homepage } = require('../../../Locators/HomePage')

class HomePage {

    getNaviationMenu() {
        return cy.get(Homepage.topMenu);
    }

}

module.exports = { HomePage }