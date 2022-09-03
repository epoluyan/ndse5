require('dotenv').config();
var config = {};
config.url =  `http://api.weatherstack.com/current?access_key=${process.env.TOKEN_WEATHER}&query=`;
module.exports = config;