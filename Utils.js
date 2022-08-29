const path = require('path');
const fs = require('fs');
const readdir = require('@jsdevtools/readdir-enhanced')

const directoryPath = path.join(__dirname, 'browsers');

const folder = (folderName) => {
    let files = readdir.sync("browsers");
    const name = files.filter(function (name) {
        if (name.includes(folderName)) {
            return name
        }
    }).toString()
    return name
}

const findVersion = (browserName) => {
    const browser = folder(browserName)
    return browser.substring(browser.indexOf('-') + 1, browser.length)
}

module.exports = { findVersion }