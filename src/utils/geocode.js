const request = require('request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoieWFzaC10aGFra2VyIiwiYSI6ImNrZ2Vwa2l2eTB2ZnMyemxlN3Mwem9pbnMifQ._XM5On8gnFUuzRce7pepmw&limit=1';
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!');
		} else if (body.message) {
			callback('Unable to find the Location! Try another Search!');
		} else {
			callback(undefined, {
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
