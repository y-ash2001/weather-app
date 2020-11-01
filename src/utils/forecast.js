const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'https://api.weatherbit.io/v2.0/current?lat=' +
		encodeURIComponent(latitude) +
		'&lon=' +
		encodeURIComponent(longitude) +
		'&key=c3534c84dab44ba3afe47b917d8de24e';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to Connect to Weather Service');
		} else if (body.error) {
			callback('Unable to Find Location');
		} else {
			callback(undefined, {
				temperature: body.data[0].temp,
				precipitation: body.data[0].precip,
				description: body.data[0].weather.description,
			});
		}
	});
};

module.exports = forecast;
