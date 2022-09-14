const { getData, baseUrl } = require('../base')
const { ApiError } = require('../errors')
const router = require('express').Router()

const getProducts = async (productType) => {
    const $ = await getData(productType)
    let data = {}

    if ($.hasOwnProperty('errorMessage')) {
        return data = $
    }

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

    if ($.hasOwnProperty('errorMessage')) {
        return data = $
    }

    let element = $('.item-box').find(`[data-productid='${productId}']`).html()

    if (element == null) {
        return {
            errorMessage: `Product with id '${productId}' is not found for category '${productType}'`,
            errorStatusCode: '404',
            errorStatusText: 'Not Found'
        }
    }

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

const products = async (req, res, next) => {
    let productType = req.params.productType
    const data = await getProducts(productType)
    if (data.hasOwnProperty('errorMessage')) {
        next(ApiError.notFound(`Product type '${productType}' not found`))
        return
    } else {
        res.status(200).send(data)
    }
}

const product = async (req, res, next) => {
    let productId = req.params.productId
    let productType = req.params.productType
    const data = await getProduct(productId, productType)

    if (data.hasOwnProperty('errorMessage')) {
        if (data['errorMessage'].includes(productId)) {
            next(ApiError.notFound(data['errorMessage']))
            return
        } else {
            next(ApiError.notFound(`Product type '${productType}' not found`))
            return
        }
    } else {
        res.status(200).send(data)
    }
}

// Product Listing Page (PLP) routes
const plpRoutes = (app) => {
    router.get('/products/:productType', products)
    router.get('/:productType/product/:productId', product)
    app.use(router)
}

module.exports = { plpRoutes }