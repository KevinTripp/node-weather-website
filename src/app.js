const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
app.use(express.static(path.join(__dirname, "../public")))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars views config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App', 
        name: 'Andrew Mead'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title:'Weather App', 
        help: 'FAQ',
        name: "Andrew Mead"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'Weather App', 
        name: 'Andrew Mead'
    })
})


app.get('/weather', (req, res) => {
    const location = req.query.address
    
    if(!location){
        return res.send({
            error:'Please provide an address!'
        })
    }


    geocode(location, (error, {latitude, longitude, location} = {} ) => {
        if (error){
            return res.send(error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }
            res.send({
                location, 
                forecastData
                 })
            })
        
        })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        error:'Help article not found',
        name:'andrew mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: '404 Page not found',
        name: 'Andrew Mead'
    })
})


app.listen(port, () => {
    console.log('server is up on port ' +port + '.')
})