const express = require('express')
const cors = require('cors')
const { navRoutes } = require('./rest/endpoints/navigations')
const { plpRoutes } = require('./rest/endpoints/plp')

const PORT = process.env.PORT || 3000

const app = express()

var corsOptions = {
    origin: `http://localhost:${PORT}`
}
app.use(cors(corsOptions))

navRoutes(app)
plpRoutes(app)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})