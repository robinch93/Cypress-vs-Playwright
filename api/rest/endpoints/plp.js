const { getData, baseUrl } = require('../base')
const { getText } = require('../utils')
const router = require('express').Router()

const getProducts = async (productType) => {
    const $ = await getData(productType)
    let data = {}

    let products = {}

    let numberOfProducts = $('.product-item').length

    $('.item-box').each(function (i, element) {
        let productId = $(element).find('.product-item').attr('data-productid')
        let productTitle = $(element).find('.product-title a').text().trim()
        let productLink = baseUrl + $(element).find('.product-title a').attr('href')
        let productPicture = baseUrl + $(element).find('.picture a').attr('href')
        let productPrice = $(element).find('.actual-price').text()

        products[i + 1] = {
            productId,
            productTitle,
            productLink,
            productPicture,
            productPrice
        }
    })

    data = {
        numberOfProducts,
        products
    }

    return data
}

const getProduct = async (productId, productType) => {
    const $ = await getData(productType)
    let data = {}

    let element = $('.item-box').find(`[data-productid='${productId}']`).html()

    let productTitle = $(element).find('.product-title a').text().trim()
    let productLink = baseUrl + $(element).find('.product-title a').attr('href')
    let productPicture = baseUrl + $(element).find('.picture a').attr('href')
    let productPrice = $(element).find('.actual-price').text()

    data = {
        productId,
        productTitle,
        productLink,
        productPicture,
        productPrice
    }

    return data
}

const products = async (req, res) => {
    let productType = req.params.productType
    const data = await getProducts(productType)
    res.status(200).send(data)
}

const product = async (req, res) => {
    let id = req.params.productId
    let type = req.params.productType
    const data = await getProduct(id, type)
    res.status(200).send(data)
}

// Product Listing Page (PLP) routes
const plpRoutes = (app) => {
    router.get('/products/:productType', products)
    router.get('/:productType/product/:productId', product)
    app.use(router)
}

module.exports = { plpRoutes }