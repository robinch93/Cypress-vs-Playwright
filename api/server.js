const express = require('express')
const cors = require('cors')
const { navRoutes } = require('./rest/endpoints/navigations')
const { plpRoutes } = require('./rest/endpoints/plp')
const { pdpRoutes } = require('./rest/endpoints/pdp')
const { ApiError } = require('./rest/errors')

const PORT = process.env.PORT || 3000

const app = express()

var corsOptions = {
    origin: `http://localhost:${PORT}`
}

app.use(cors(corsOptions))

navRoutes(app)
plpRoutes(app)
pdpRoutes(app)

app.use((err, req, res, next) => {
    console.log(err)

    if (err instanceof ApiError) {
        res.status(err.code).send({ errorMessage: err.message })
        return
    }
    res.status(500).send({ message: 'Something went wrong.' })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})