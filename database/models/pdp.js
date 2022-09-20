const mongoose = require('mongoose')
const { getApiData } = require('../apiCall')
const { Schema } = mongoose

const pdpSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    category: { type: String },
    breadcrumb: [{ type: String }],
    shortDescription: { type: String },
    link: { type: String },
    picture: { type: String },
    discount: { type: Boolean },
    price: { type: mongoose.Types.Decimal128 },
    prices: {
        oldPrice: { type: mongoose.Types.Decimal128 },
        currentPrice: { type: mongoose.Types.Decimal128 }
    },
    available: { type: Boolean },
    rating: {
        stars: { type: String },
        numeric: { type: mongoose.Types.Decimal128 }
    },
    reviews: {
        number: { type: Number },
        link: { type: String }
    },
    size: { type: String },
    color: {
        options: { type: Array }
    },
    quantity: { type: String },
    fullDescription: { type: String },
    tags: { type: Object }
}, { collection: 'Product Description Page' })

const Pdp = mongoose.model('Product Description Page', pdpSchema)

const saveProductsWithName = async (endpoint) => {
    saveProducts('product/' + endpoint)
}

const saveProducts = async (endpoint) => {
    let apiData = await getApiData(endpoint)
    const nav = new Pdp(apiData)
    await nav.save((err) => {
        if (err) { console.log(err) }
    })
}

module.exports = { saveProductsWithName, Pdp }