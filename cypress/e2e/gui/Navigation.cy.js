const { HomePage } = require('../../support/pageObjects/HomePage')

context('Navigation', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Check if correct navigations are shown in the top menu', () => {

        let expectedTopNav = ['Books', 'Computers', 'Electronics', 'Apparel & Shoes', 'Digital downloads', 'Jewelry', 'Gift Cards']
        const home = new HomePage()

        home.getNaviationMenu().should('have.length', 7)

        home.getNaviationMenu().each((item, i) => {
            expect(item).to.contain.text(expectedTopNav[i])
        })
    })

    it('Check if correct sub navigations are shown for the top menu - COMPUTERS', () => {

        const home = new HomePage()
        home.getNaviationMenu().eq(1).trigger('mouseover')

        home.getNaviationMenu().get('ul.active>li')
            .should('have.length', 3)

        home.getNaviationMenu().get('ul.active>li').then(items => {
            expect(items[0]).to.contain.text('Desktops')
            expect(items[1]).to.contain.text('Notebooks')
            expect(items[2]).to.contain.text('Accessories')
        })
    })

    it('Check if correct sub navigations are shown for the top menu - ELECTRONICS', () => {

        const home = new HomePage()
        home.getNaviationMenu().eq(2).trigger('mouseover')

        home.getNaviationMenu().get('ul.active>li')
            .should('have.length', 2)

        home.getNaviationMenu().get('ul.active>li').then(items => {
            expect(items[0]).to.contain.text('Camera, photo')
            expect(items[1]).to.contain.text('Cell phones')
        })
    })

})