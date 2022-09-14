const { getData, baseUrl } = require('../base')
const router = require('express').Router()
const _ = require('lodash')
const { ApiError } = require('../errors')

const getNavigations = async () => {
    const $ = await getData('')
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

const getSubmenu = async (menuName) => {
    const $ = await getData(menuName)
    let data = {}

    if ($.hasOwnProperty('errorMessage')) {
        return data = $
    }

    let submenu = []
    let links = {}

    menuName = menuName == 'apparel-shoes' ? 'Apparel & Shoes' :
        menuName == 'digital-downloads' ? 'Digital downloads' :
            menuName == 'gift-cards' ? 'Gift Cards' : _.upperFirst(_.toLower(menuName))

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

const menuNavigations = async (req, res, next) => {
    let name = req.params.menuName

    if (name != null || name != undefined) {
        data = await getSubmenu(name)

        if (data.hasOwnProperty('errorMessage')) {
            next(ApiError.notFound(`Menu with name '${name}' not found`))
            return
        }
    } else {
        data = await getNavigations()
    }

    res.status(200).send(data)
}

const navRoutes = (app) => {
    router.get('/topmenu', menuNavigations)
    router.get('/menu/:menuName', menuNavigations)
    app.use(router)
}

module.exports = { navRoutes }