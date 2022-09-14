
const { Helper } = require('../../support/helpers/Helper')
const { Utils } = require('../../../Utils')

describe('Navigations API', () => {
    const helper = new Helper()
    const utils = new Utils()

    context('endpoint: /topmenu', () => {

        it('verify topmenu request returns JSON and 200 status code', () => {
            cy.request('http://localhost:3000/topmenu').its('headers').its('content-type').should('include', 'application/json')
            cy.request('http://localhost:3000/topmenu').its('status').should('be.equal', 200)
        })

        it('verify top menu fields and links has 7 matching items', async () => {

            let topmenu = [
                "Books",
                "Computers",
                "Electronics",
                "Apparel & Shoes",
                "Digital downloads",
                "Jewelry",
                "Gift Cards"
            ]

            let response = await helper.getApiResponse('http://localhost:3000/topmenu')
            let body = response.body

            // compare topmenu
            expect(body['topmenu']).to.have.length(7)
            expect(body['topmenu']).to.deep.eq(topmenu)

            // compare links
            let links = []
            for (const menu of topmenu) {
                links.push('https://demowebshop.tricentis.com/' + utils.getLowerCaseHyphen(menu))
            }

            assert.equal(Object.keys(body['links']).length, 7)
            expect(Object.values(body['links'])).to.deep.eq(links)
        })
    })

    context('endpoint: /menu/computers', () => {

        it('verify submenu request for computers returns JSON and 200 status code', () => {
            cy.request('http://localhost:3000/menu/computers').its('headers').its('content-type').should('include', 'application/json')
            cy.request('http://localhost:3000/menu/computers').its('status').should('be.equal', 200)
        })

        it('verify submenu for computers has 3 matching items and links', async () => {

            let submenuComputers = [
                "Desktops",
                "Notebooks",
                "Accessories"
            ]

            let response = await helper.getApiResponse('http://localhost:3000/menu/computers')
            let body = response.body

            // compare submenu for computers 
            expect(body['submenu']).to.have.length(3)
            expect(body['submenu']).to.deep.eq(submenuComputers)

            // compare submenu links for computers 
            let links = []
            for (const menu of submenuComputers) {
                links.push('https://demowebshop.tricentis.com/' + utils.getLowerCaseHyphen(menu))
            }

            assert.equal(Object.keys(body['links']).length, 3)
            expect(Object.values(body['links'])).to.deep.eq(links)
        })
    })


})
