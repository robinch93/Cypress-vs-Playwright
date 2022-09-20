const { getApiData } = require('./apiCall')

const getAllProductDetailsFor = async (field, endpoint) => {
    let productFieldArray = []
    let apiData = await getApiData('products/' + endpoint)
    if (apiData != undefined) {
        for (let productDetail of apiData['products']) {
            productFieldArray.push(productDetail[field])
        }
    }
    return productFieldArray
}

const getAllProductNamesForCategory = async (endpoint) => {
    return getAllProductDetailsFor('productTitle', endpoint)
}

const getAllProductIdsForCategory = async (endpoint) => {
    return getAllProductDetailsFor('productId', endpoint)
}

const getAllProductLinksForCategory = async (endpoint) => {
    return getAllProductDetailsFor('productLink', endpoint)
}

module.exports = { getAllProductNamesForCategory, getAllProductIdsForCategory, getAllProductLinksForCategory }