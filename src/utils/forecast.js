const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bdbf9f945ada22ea46c662944187000e&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            var current = body.current;
            callback(undefined, current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' degress out. It feels like ' + current.feelslike + ' degrees out.');
        }
    })
}

module.exports = forecast;