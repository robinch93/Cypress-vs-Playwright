const mongoose = require('mongoose')
const { getApiData } = require('../apiCall')
const { Schema } = mongoose

const plpSchema = new Schema({
    category: { type: String, unique: true },
    numberOfProducts: { type: Number },
    products: [{
        productId: Number,
        productTitle: String,
        productLink: String,
        productPicture: String,
        discount: Boolean,
        price: mongoose.Types.Decimal128,
        prices: {
            oldPrice: mongoose.Types.Decimal128,
            currentPrice: mongoose.Types.Decimal128
        }
    }]
}, { collection: 'Product Listing Page' })

const Plp = mongoose.model('Product Listing Page', plpSchema)

const saveProductsWithCategory = async (endpoint) => {
    saveProducts('products/' + endpoint)
}

const saveProducts = async (endpoint) => {
    let apiData = await getApiData(endpoint)
    const nav = new Plp(apiData)
    await nav.save((err) => {
        if (err) { console.log(err) }
    })
}

module.exports = { saveProductsWithCategory, Plp }