class HomePage {

    getNaviationMenu() {
        return cy.get('.top-menu>li');
    }

}

module.exports = { HomePage }