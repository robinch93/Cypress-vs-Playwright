getText = (string) => {
    return string.replace(/[^a-z0-9]+/gi, '')
}

module.exports = { getText }