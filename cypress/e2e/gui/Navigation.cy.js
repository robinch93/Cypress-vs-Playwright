const { Helper } = require('../../support/helpers/Helper')
const { HomePage } = require('../../support/pageObjects/HomePage')
const { ProductListingPage } = require('../../support/pageObjects/ProductListingPage')

context('Navigation', () => {

    const plp = new ProductListingPage()
    const home = new HomePage()
    const helper = new Helper()

    beforeEach(() => {
        cy.visit('/')
    })

    it('Check if expected urls and page title are redirected from top menu', () => {

        let expectedUrls = ['books', 'computers', 'electronics', 'apparel-shoes', 'digital-downloads', 'jewelry', 'gift-cards']

        home.getNaviationMenu().each((item, i) => {
            home.getNaviationMenu().eq(i).click()
            cy.url().should('contain', '/' + expectedUrls[i])
            plp.getPageTitle().invoke('text').then((title) => {
                title = title.toLowerCase().replace(/[^a-z0-9]+/gi, '')
                expect(title).to.be.equal(expectedUrls[i].replace(/[^a-z0-9]+/gi, ''))
            })
        })
    })

    it('Check if links navigate to correct landing pages and correct top menu is shown', () => {

        let expectedTopNav = ['Books', 'Computers', 'Electronics', 'Apparel & Shoes', 'Digital downloads', 'Jewelry', 'Gift Cards']

        home.getNaviationMenu().should('have.length', 7)

        home.getNaviationMenu().each((item, i) => {
            expect(item).to.contain.text(expectedTopNav[i])
            home.getNaviationMenu().eq(i).click()
            expect(item).to.contain.text(expectedTopNav[i])
        })
    })

    it('Check if correct sub navigations are shown for the top menu - COMPUTERS', () => {

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

        home.getNaviationMenu().eq(2).trigger('mouseover')

        home.getNaviationMenu().get('ul.active>li')
            .should('have.length', 2)

        home.getNaviationMenu().get('ul.active>li').then(items => {
            expect(items[0]).to.contain.text('Camera, photo')
            expect(items[1]).to.contain.text('Cell phones')
        })
    })

})