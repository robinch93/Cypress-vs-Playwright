const { getData, baseUrl } = require('../base')
const { getText } = require('../utils')
const router = require('express').Router()

const getNavigations = async () => {
    const $ = await getData()
    let data = {}

    let topmenu = []
    let links = {}

    $('ul.top-menu li:not(ul.sublist li)').each(function (i, element) {
        let menuLink = $(element).find('a').attr('href')
        let menuName = $(element).find('a').text()
        menuName = getText(menuName)
        topmenu.push(menuName)
        links[menuName] = baseUrl + menuLink
    })

    data = {
        topmenu,
        links
    }

    return data
}

const navigations = async (req, res) => {
    const data = await getNavigations()
    res.status(200).send(data)
}

const navRoutes = (app) => {
    router.get('/topmenu', navigations)
    app.use(router)
}

module.exports = { navRoutes }