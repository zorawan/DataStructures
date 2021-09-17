"use strict";

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      got = require('got'),
      async = require('async'),
      dotenv = require('dotenv');

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
console.log(API_KEY);
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// geocode addresses
let meetingsData = [];
var addresses = [];
fs.readFile('../week2/addressBook.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  //split address to each address
  var array = data.split("\n");
  //split address by , and keep only first part of the address then map to var addresses
  addresses = array.map(item => item.split(",")[0]);
  console.log(addresses);
  loadApi();
});
//require API after loadAPI
function loadApi() {
    console.log("async");
    //eachSeries in the async module iterates over an array and operates on each item in the array in series
     async.eachSeries(addresses, function(value, callback) {
         let query = {
             streetAddress: value,
             city: "New York",
             state: "NY",
             apikey: API_KEY,
             format: "json",
             version: "4.01"
         };
    
        //construct a querystring from the `query` object's values and append it to the api URL
        let apiRequest = API_URL + '?' + querystring.stringify(query);
        console.log(apiRequest);
    
        (async () => {
        	try{
        		const response = await got(apiRequest);
        		let tamuGeo = JSON.parse(response.body);
        		console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        		
        		//use value and tamuGeo to construct a new data structure
        		var format = {};
        		format.address = tamuGeo["InputAddress"]["StreetAddress"];
        		var latLong ={};
        		latLong.Latitude = tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Latitude"];
        		latLong.Longitude = tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Longitude"];
        	    format.latLong = latLong;
            
            	meetingsData.push(format);
        	} catch (error) {
        		console.log(error.response.body);
        	}
        })();
    
        // sleep for a couple seconds before making the next request
        setTimeout(callback, 2000);
    }, function() {
        fs.writeFileSync('data/addresses.json', JSON.stringify(meetingsData));
        console.log('*** *** *** *** ***');
        console.log(`Number of meetings in this zone: ${meetingsData.length}`);
    });
}
