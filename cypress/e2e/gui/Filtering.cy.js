const { ProductListingPage } = require('../../support/pageObjects/ProductListingPage')
const { Helper } = require('../../support/helpers/Helper')

context('Filtering', () => {

    const plp = new ProductListingPage()
    const helper = new Helper()

    beforeEach(() => {
        cy.visit('/')
    })

    it('Check if correct sorting order is applied for "Price: Low to High"', () => {

        let visitingUrls = ['books', 'desktops', 'cell-phones', 'apparel-shoes', 'digital-downloads', 'jewelry', 'gift-cards']

        let option = 'Price: Low to High'

        visitingUrls.forEach(async (url) => {
            cy.visit('/' + url)
            plp.getSortByDropDown().select(option)
            let prices = await plp.getProductPrices()
            const sorted = helper.sortNumArray(prices)
            expect(sorted).to.deep.equal(prices)

        })
    })

    it('Check if correct price filter is applied for COMPUTERS- DESKTOPS', () => {

        let filterByPrice = ['Under 1000.00', '1000.00 - 1200.00', 'Over 1200.00']

        filterByPrice.forEach(async (filter) => {
            cy.visit('/' + 'desktops')
            plp.getFilterByPrice().contains(filter).click()
            let prices = await plp.getProductPrices()
            let range = helper.getRange(filter)
            if (prices.length > 0) {
                prices.forEach((price) => {
                    expect(parseInt(price)).to.be.within(range[0], range[1])
                })
            }
        })
    })

    it('Check if correct price filter is applied for Books', () => {

        let filterByPrice = ['Under 25.00', '25.00 - 50.00', 'Over 50.00']

        filterByPrice.forEach(async (filter) => {
            cy.visit('/' + 'books')
            plp.getFilterByPrice().contains(filter).click()
            let prices = await plp.getProductPrices()
            let range = helper.getRange(filter)
            if (prices.length > 0) {
                prices.forEach((price) => {
                    expect(parseInt(price)).to.be.within(range[0], range[1])
                })
            }
        })
    })

})