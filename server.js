const express = require('express')
const cors = require('cors')
const axios = require('axios')


const app = express();
app.use(cors());


const api_key = "83eaf893777c44e482d42521232706";


function getNews(cityName, api_key) {
    return axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${cityName}`)
}


app.get('/api/weather/:city', async (req, res) => {
    try {
        const cityName = req.params.city
        const response = await getNews(cityName, api_key)
        res.send(response.data)
    } catch (error) {
        console.log(error)
    }
})


app.listen(8040, function () {
    console.log("Server started on port 8040")
})