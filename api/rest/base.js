const axios = require('axios')
const cheerio = require('cheerio')

let baseUrl = 'https://demowebshop.tricentis.com'

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 1000
})

let getData = async () => instance.get(baseUrl).then(response => {
    const $ = cheerio.load(response.data)
    return $
}).catch(function (e) {
    console.log(e)
})

module.exports = { getData, baseUrl }