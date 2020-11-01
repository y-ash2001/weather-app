const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { get } = require('http');
const app = express();

//Define Paths for Express Configuration
const publicDir = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../src/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup Static Directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Yash Thakker',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		name: 'Yash Thakker',
		title: 'About me',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpful text',
		name: 'Yash Thakker',
		title: 'Help',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		res.send({
			error: 'You must provide an address',
		});
	} else {
		geocode(
			req.query.address,
			(error, { latitude, longitude, location } = {}) => {
				if (error) {
					return res.send({ error });
				}
				forecast(latitude, longitude, (error, forecastdata) => {
					if (error) {
						return res.send({ error });
					}
					res.send({ location, forecastdata });
				});
			}
		);
	}
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help Page not Found',
		name: 'Yash Thakker',
		message: 'Help Page not Found',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Yash Thakker',
		message: '404 Error! Page not Found',
	});
});

app.listen(3000, () => {
	console.log('Server is up on Port 3000');
});
