#!/usr/bin/env node

const http = require('http');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { url } = require('./config');


const argv = yargs(hideBin(process.argv)).argv;
const cityName = argv._[0];
const requestURL = url + cityName;
console.log(requestURL);

http.get(requestURL, (res) => {
  const statusCode = res.statusCode;
  if (statusCode !== 200) {
    console.error(`Status code: ${statusCode}`);
    return;
  }
  res.setEncoding('utf-8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    let parsedData = JSON.parse(rawData);
    console.log(`Город: ${parsedData.location.name} Температура: ${parsedData.current.temperature}° Влажность: ${parsedData.current.humidity}% Давление: ${(parsedData.current.pressure / 1.33322).toFixed(2)}`);
  })
}).on('error', (e) => {
  console.error(`Error: ${e}`);
})
