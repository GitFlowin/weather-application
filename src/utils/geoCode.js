const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
                + encodeURIComponent(address) 
                + '.json?access_token=pk.eyJ1Ijoic2xlZTkyIiwiYSI6ImNrZTdsbzU1djBjY3gzM25qdzUwd2NyMjUifQ.4K_9U-ohfwCLl492NtzkSw&limit=1';

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('No matching locations!', undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;

            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    });
}

module.exports = geoCode;