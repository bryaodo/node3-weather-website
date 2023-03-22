const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYnJ5YW4tb2Rvbm9naHVlIiwiYSI6ImNsZjl4cGQzcjFmd3YzcHBvZDN6bXh0ajgifQ.a6vA7s0xw7dpnzkJKI4Q7g'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to locaiton services', undefined)
        }
        else if (body.features.length === 0) {
            callback('unable to find location, try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode