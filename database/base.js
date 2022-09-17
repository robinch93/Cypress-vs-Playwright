const axios = require('axios')

const baseUrl = 'http://localhost:3000/'

const getApiData = (apiUrl) => {
    const data = axios({
        method: 'GET',
        url: baseUrl + apiUrl,
        validateStatus: () => true
    }).then(function (response) {
        // console.log(response.data)
        return response.data
    }).catch(error => {
        if (error.response) {
            console.log(JSON.stringify(error))
        }
    })
    return data
}

// request interceptor
// axios.interceptors.request.use(
//     function (req) {
//         console.log(req)
//         req.time = { startTime: new Date() };
//         return req;
//     },
//     (err) => {
//         return Promise.reject(err);
//     }
// )

module.exports = { getApiData }