const path = require('path');
const fs = require('fs');
const readdir = require('@jsdevtools/readdir-enhanced')

class Utils {
    directoryPath = path.join(__dirname, 'browsers')

    static folder = (folderName) => {
        let files = readdir.sync("browsers");
        const name = files.filter(function (name) {
            if (name.includes(folderName)) {
                return name
            }
        }).toString()
        return name
    }

    static findVersion = (browserName) => {
        const browser = this.folder(browserName)
        return browser.substring(browser.indexOf('-') + 1, browser.length)
    }

    static getLowerCaseHyphen = (string) => {
        return string.toLowerCase().replace(/[^a-zA-Z0-9\s]/, '').replace(/ +/g, ' ').replace(' ', '-')
    }

}

module.exports = { Utils }