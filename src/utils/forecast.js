const request = require('request');

const forecast = (longitude, latitude, callback) =>{
    const url = "https://api.darksky.net/forecast/e33f8ec19c0b1a53872a0bff80713385/" + latitude + "," + longitude

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!')
        } else if(body.error){
            callback('Unable to find location. Please try another search', undefined)
        }else{
            console.log(body)
            callback(undefined, {
                forecast: body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% change of rain."
                , humidity: body.currently.humidity
                , windSpeed: body.currently.windSpeed
            })
        }
    })
}

module.exports = forecast