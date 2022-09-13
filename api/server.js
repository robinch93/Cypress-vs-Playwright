const express = require('express')
const cors = require('cors')
const { navRoutes } = require('./rest/endpoints/navigations')
const { plpRoutes } = require('./rest/endpoints/plp')
const { pdpRoutes } = require('./rest/endpoints/pdp')

const PORT = process.env.PORT || 3000

const app = express()

var corsOptions = {
    origin: `http://localhost:${PORT}`
}

app.use(cors(corsOptions))

app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Something went wrong.' })
})

// global error handler
const use = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

use(navRoutes(app))
use(plpRoutes(app))
use(pdpRoutes(app))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})