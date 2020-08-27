const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

const author = 'Seong Lee';

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        author
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author,
        image: "/img/profile-image.jpeg"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author,
        message: 'This page is in development!'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) return res.send({ error: 'Address must be provided in the query!' });
    
    geoCode(address, (err, { latitude, longitude, location } = {}) => {
        if (err) return res.send({ err });
    
        forecast(latitude, longitude, (err, {description, temperature, feels_like, humidity} = {}) => {
            if (err) return res.send({ err });
            
            res.send({
                address,
                location,
                description,
                temperature,
                feels_like,
                humidity
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author,
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author,
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('App listening at http://localhost:' + port)
})