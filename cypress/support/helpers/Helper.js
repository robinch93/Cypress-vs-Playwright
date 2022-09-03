
class Helper {

    sortNumArray = (numArray) => {
        return Cypress._.sortBy(numArray, function (a, b) { return a - b; })
    }

    getRange = (filter) => {
        let rangeUnder = parseInt(filter.replace('Under ', ''))
        let rangeOver = parseInt(filter.replace('Over ', ''))
        let rangeBetween = filter.toString().split(' - ').map(num => parseInt(num))

        let range = filter.includes('Under') ? [1, rangeUnder] :
            filter == '1000.00 - 1200.00' ? [rangeBetween[0], rangeBetween[1]] :
                filter.includes('Over') ? [rangeOver, Infinity] : 'could not create range'
        return range
    }

    elementExists = (element) => {
        let exists = true
        return new Cypress.Promise((resolve) => {
            cy.get('body').then((body) => {
                let length = body.find(element).length
                exists = length > 0 ? true : false
            }).then(() => {
                resolve(exists)
            })
        })
    }
}

module.exports = { Helper }