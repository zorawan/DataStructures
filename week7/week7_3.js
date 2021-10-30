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
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx';

// geocode addresses
let meetingsData = [];
var newJson = [];

// read (.json)
fs.readFile('./meeting.json', 'utf8' , (err, rawdata) => {
  if (err) {
    console.error(err);
    return;
  }
  //split address to each address
//   var array = data.split("\n");
  
  let data = JSON.parse(rawdata);
 
//json
//   data.forEach(function(d, index){

 myasync();
 
    async function myasync(){

        var result = await myforloop();
        console.log( 'result',result);
    }

    async function myforloop(){
            
        for (let i in data){
            let d = data[i];
            setTimeout(function(){
                let query = {
                    streetAddress:  d.address,
                    city: "New York",
                    state: "NY",
                    apikey: API_KEY,
                    format: "json",
                    version: "4.01"
                };
             
        let apiRequest = API_URL + '?' + querystring.stringify(query);
           
            
            (async () => {
            	try{
            	const response = await got(apiRequest);
            	let tamuGeo = JSON.parse(response.body);
            		
            //use value and tamuGeo to construct a new data structure
                    var entry = {};
                	    
            		entry = {
            		    
            		    "Title" : d.Title,
            		    "Building": d.Building,
            		    "MeetingDetail": d.MeetingDetail,
            		    "Wheelchair": d.Wheelchair,
            		    "AddressDetail": d.AddressDetail,
            		    "ScheduleDay": d.ScheduleDay,
            		    "ScheduleTimeFrom":d.ScheduleTimeFrom,
            		    "ScheduleTimeTo": d.ScheduleTimeTo,
            		    "MeetingType": d.MeetingType,
            		    "SpecialInterest":d.SpecialInterest,
            		    "Address": d.Address + ", " + tamuGeo["InputAddress"]["StreetAddress"],
            		    "Latitude":tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Latitude"],
            		    "Longitude":tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]
            		};
                	
                	
                		
                	console.log("this is entry");
                	console.log(entry);
                		
                    newJson.push(entry);
                      
                    if (i == newJson.length-1 ){
                    console.log('save me !', newJson);
                          
                    let newJsonStr = JSON.stringify(newJson);
                    fs.writeFileSync('newJson.json', newJsonStr);
                    }
                
                    //meetingsData.push(format);
            	    } catch (error) {
            		//console.log(error.response.body);
                	}
	
                })();

        // sleep for a couple seconds before making the next request
            }, 2000); //end of settimeout

        } //end of for forloop -> go through each item in the json file
      
    return newJson;
    }//end of forloop function
    
});//end of readfile

//require API after loadAPI
function loadApi() {
    console.log("async");
    //eachSeries in the async module iterates over an array and operates on each item in the array in series
    async.eachSeries(Addresses, function(value, callback) {
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
    // console.log(apiRequest);
    
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
    		//console.log(error.response.body);
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
