const { saveTopmenu, saveSubmenus } = require('./models/navigations')
const { saveProductsWithCategory } = require('./models/plp')
const { saveProductsWithName } = require('./models/pdp')
const { getAllProductLinksForCategory } = require('./common')
const { Utils } = require('../Utils')
require('./connection')

let computers = ["desktops", "notebooks", "accessories"]
let eletronics = ["camera-photo", "cell-phones"]
let categories = [
    "books",
    "apparel-shoes",
    "digital-downloads",
    "jewelry",
    "gift-cards",
    ...computers,
    ...eletronics
]

// Navigations
console.log('Saving data for Navigations menu')
saveTopmenu()
saveSubmenus('computers')
saveSubmenus('electronics')

// Product Listing Page
const savePlpData = async () => {
    for (let category of categories) {
        console.log('Saving data for ' + category + ' listing page.')
        saveProductsWithCategory(category)
    }
}
savePlpData()

// Product Description Page
const savePdpData = async () => {
    for (let category of categories) {
        let productLinks = await getAllProductLinksForCategory(category)
        console.log('Saving data for ' + category + ' category products: ')
        console.log(productLinks)
        for (let productLink of productLinks) {
            productLink = productLink.replace('https://demowebshop.tricentis.com/', '')
            await saveProductsWithName(Utils.getLowerCaseHyphen(productLink))
        }
    }
}
savePdpData()





