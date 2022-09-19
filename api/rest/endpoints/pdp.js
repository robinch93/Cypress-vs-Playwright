const { getData, baseUrl } = require('../base')
const { ApiError } = require('../errors')
const router = require('express').Router()

const getProductDetails = async (productName) => {

    const $ = await getData(productName)
    let data = {}

    if ($.hasOwnProperty('errorMessage')) {
        return data = $
    }

    let breadcrumb = $('.breadcrumb a span').map((i, element) => {
        return $(element).text().trim()
    }).get()

    let category = breadcrumb.slice(-1)[0]

    let product = {}

    $('#product-details-form').each(function (i, element) {
        let id = parseInt($(element).find('div').attr('data-productid'))
        let name = $(element).find('.product-name h1').text().trim()
        let shortDescription = $(element).find('.short-description').text().trim()
        let inStock = $(element).find('.stock .value').text().trim()
        let available = inStock.length > 0 ? true : false
        let stars = $(element).find('.rating div').attr('style').replace(/[^0-9]+/gi, '')
        let numericRating = (100 / stars).toFixed(2)
        let rating = { stars: stars + '%', numeric: numericRating }
        let numberOfReviews = parseInt($(element).find('.product-review-links a').text().trim().replace(/[^0-9]+/gi, ''))
        let reviewLink = baseUrl + $(element).find('.product-review-links a').attr('href')
        let reviews = { number: numberOfReviews, link: reviewLink }

        let size = $(element).find('.attributes dd select option:selected').text().trim()

        let selectedColor = $(element).find('.color-squares .selected-value label span').attr('title')
        let colorOptions = $(element).find('.color-squares li span').map((i, item) => {
            return $(item).attr('title')
        }).get()
        let color = { selected: selectedColor, options: colorOptions }

        let link = baseUrl + $(element).find('.product-title a').attr('href')
        let picture = $(element).find('.picture img').attr('src')

        let oldPrice = parseFloat($(element).find('.old-product-price span').text())
        let currentPrice = parseFloat($(element).find('.product-price span').text())
        let prices = { oldPrice, currentPrice }
        let discount = isNaN(oldPrice) ? false : true

        let quantity = $(element).find('.qty-input').attr('value')
        let fullDescription = $(element).find('.full-description').text().trim()
        let tags = {}
        $(element).find('.product-tags-list .tag a').each((i, item) => {
            tags[$(item).text().trim()] = baseUrl + $(item).attr('href')
        })

        product = {
            id,
            name,
            category,
            breadcrumb,
            shortDescription,
            link,
            picture,
            discount,
            price: currentPrice,
            prices,
            available,
            rating,
            reviews,
            size: size.length == 0 ? null : size,
            color,
            quantity,
            fullDescription,
            tags
        }

    })

    data = {
        ...product
    }

    return data
}

const product = async (req, res, next) => {
    let productName = req.params.productName
    const data = await getProductDetails(productName)
    if (data.hasOwnProperty('errorMessage')) {
        next(ApiError.notFound(`Product with '${productName}' name not found`))
        return
    } else {
        res.status(200).send(data)
    }

}

// Product Description Page (PDP) routes
const pdpRoutes = (app) => {
    router.get('/product/:productName', product)
    app.use(router)
}

module.exports = { pdpRoutes }