const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//defines paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup habdlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup directory to save
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'weather App',
        name: 'roe botte'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'about',
        name: 'roe botte'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'help page',
        name: 'roe botte'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ 
            error: 'you must provide an adress!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            }) 
        })
    })
    // res.send({
    //     forecast: 'it is snowing',
    //     location: 'Philadelphia'
    // })
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'roe botte',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'roe botte',
        errorMessage: 'page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})   