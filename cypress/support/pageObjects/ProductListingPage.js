const { Filters, Product } = require('../../../Locators/ProductListingPage');
const { Helper } = require('../../support/helpers/Helper');

class ProductListingPage {

    constructor(helper = new Helper()) {
        this.helper = helper
    }

    getSortByDropDown() {
        return cy.get(Filters.sortByDropdown);
    }

    getViewAs() {
        return cy.get(Filters.viewAs);
    }

    getFilterByPrice() {
        return cy.get(Filters.price)
    }

    getProductPrice() {
        return cy.get(Product.price);
    }

    getProductTitle() {
        return cy.get(Product.title);
    }

    getProductRating() {
        return cy.get(Product.rating);
    }

    getProductImage() {
        return cy.get(Product.image);
    }

    getProductPrices() {
        return this.getProductInfoList(Product.price)
    }

    getProductTitles() {
        return this.getProductInfoList(Product.title)
    }

    getProductInfoList = (productInfo) => {
        let infoArray = []
        return new Cypress.Promise(async (resolve) => {
            let exists = await this.helper.elementExists(productInfo)
            if (exists) {
                cy.log('comes here')
                cy.get(productInfo).each((info) => {
                    cy.get(info).invoke('text').then((text) => {
                        infoArray.push(text)
                    })
                }).then(() => {
                    resolve(infoArray)
                })
            }
        })
    }
}

module.exports = { ProductListingPage }