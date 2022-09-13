const axios = require('axios')
const cheerio = require('cheerio')

let baseUrl = 'https://demowebshop.tricentis.com'

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 1000
})

let getData = async (url) => instance.get(baseUrl + '/' + url).then(response => {
    console.log(baseUrl + '/' + url)
    const $ = cheerio.load(response.data)
    return $
}).catch(function (e) {
    return {
        errorMessage: e.message,
        errorStatusCode: e.response.status,
        errorStatusText: e.response.statusText
    }
})

module.exports = { getData, baseUrl }