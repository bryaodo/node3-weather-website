const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=0cbe25a3c2cdd853691b04b603f79f5d&query=37.8267,-122.4233&units=f'

// request({url: url, json: true }, (error, response) => {
//     // console.log(response.body.current)
//     if (error) {
//         console.log('cant connect to weather service')
//     } 
//     else if (response.body.error) {
//         console.log("unable to find location")
//     } 
//     else {
//     console.log(response.body.current.weather_descriptions[0] + '. it is currently ' + response.body.current.temperature + " degrees out. it feels like " + response.body.current.feelslike + " degrees out.")
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0cbe25a3c2cdd853691b04b603f79f5d&query=' + latitude + ',' + longitude + '&units=f' 
    request({url, json: true }, (error, { body }) => {
        if (error) {
            callback('cant connect to weather service', undefined)
        } 
        else if (body.error) {
            callback("unable to find location", undefined)
        } 
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + " degrees out. it feels like " + body.current.feelslike + " degrees out."
            )
        }
    })
}



module.exports = forecast