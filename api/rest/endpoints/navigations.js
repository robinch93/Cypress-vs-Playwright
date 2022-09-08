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
        let menuName = $(element).find('a:first').text().trim()
        topmenu.push(menuName)
        links[menuName] = baseUrl + menuLink
    })

    data = {
        topmenu,
        links
    }

    return data
}

const getMenuNav = async (menuName) => {
    const $ = await getData()
    let data = {}

    let submenu = []
    let links = {}
    let baseElement = $(`ul.top-menu li:contains("${menuName}")`).first().html()
    $(baseElement).find('ul.sublist li').each(function (i, element) {
        let menuLink = $(element).find('a').attr('href')
        let menuName = $(element).find('a').text().trim()
        submenu.push(menuName)
        links[menuName] = baseUrl + menuLink
    })

    data = {
        submenu,
        links
    }

    return data
}

const navigations = async (req, res) => {
    const data = await getNavigations()
    res.status(200).send(data)
}

const menuNavigations = async (req, res) => {
    let name = req.params.menuName
    const data = await getMenuNav(name)
    res.status(200).send(data)
}

const navRoutes = (app) => {
    router.get('/topmenu', navigations)
    router.get('/menu/:menuName', menuNavigations)
    app.use(router)
}

module.exports = { navRoutes }