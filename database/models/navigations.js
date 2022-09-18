const mongoose = require('mongoose')
const { getApiData } = require('../base')
const { Schema } = mongoose

const menuSchema = new Schema({
    navigationFor: { type: String, unique: true },
    navItems: [{ type: String }],
    links: {
        type: Object
    }
})

const Navigations = mongoose.model('Navigations', menuSchema)

const saveTopmenu = async () => {
    saveNavigations('topmenu')
}

const saveSubmenus = async (endpoint) => {
    saveNavigations('menu/' + endpoint)
}

const saveNavigations = async (endpoint) => {
    let apiData = await getApiData(endpoint)
    apiData['navigationFor'] = endpoint
    const nav = new Navigations(apiData)
    await nav.save((err) => {
        if (err) { console.log(err) }
    })
}

module.exports = { saveTopmenu, saveSubmenus }