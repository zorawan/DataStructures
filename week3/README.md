## Week3 Project
1. Task1: Create a Texas A$M GeoServices account and use dotenv to save the API key.
2. Task2: Work on Starter code to require API by my [addressBook.txt]https://github.com/zorawan/DataStructures/blob/master/week2/addressBook.txt
   Step1: Pplit address to each address
```javascript
  var array = data.split("\n");
```
   Step2: Split address by , and keep only first part of the address then map to var addresses
```javascript
  addresses = array.map(item => item.split(",")[0]);
  console.log(addresses);
  loadApi();
```
   Step3: I put everything in loadApi function to make sure the api call runs after the txt file been read.
```javascript
function loadApi() {}
```
3. Task3: Call the api by the starter code and format it into json format.
    Step1: After parse the api request, I tamuGeo and it's key and values to construct a new data structure.
```javascript
 (async () => {
        	try{
        		const response = await got(apiRequest);
        		let tamuGeo = JSON.parse(response.body);
        		console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        		//New data structure
        		var format = {};
        		format.address = tamuGeo["InputAddress"]["StreetAddress"];
        		var latLong ={};
        		latLong.Latitude = tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Latitude"];
        		latLong.Longitude = tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Longitude"];
        	    format.latong = latLong;
            
            	meetingsData.push(format);
        	} catch (error) {
        		console.log(error.response.body);
        	}
        })();
```



## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Collaboration](#collaboration)
5. [FAQs](#faqs)
### General Info
***
Write down general information about your project. It is a good idea to always put a project status in the readme file. This is where you can add it. 
### Screenshot
![Image text](https://www.united-internet.de/fileadmin/user_upload/Brands/Downloads/Logo_IONOS_by.jpg)
## Technologies
***
A list of technologies used within the project:
* [Technology name](https://example.com): Version 12.3 
* [Technology name](https://example.com): Version 2.34
* [Library name](https://example.com): Version 1234
## Installation
***
A little intro about the installation. 
```
$ git clone https://example.com
$ cd ../path/to/the/file
$ npm install
$ npm start
```
Side information: To use the application in a special environment use ```lorem ipsum``` to start
## Collaboration
***
Give instructions on how to collaborate with your project.
> Maybe you want to write a quote in this part. 
> Should it encompass several lines?
> This is how you do it.
## FAQs
***
A list of frequently asked questions
1. **This is a question in bold**
Answer to the first question with _italic words_. 
2. __Second question in bold__ 
To answer this question, we use an unordered list:
* First point
* Second Point
* Third point
3. **Third question in bold**
Answer to the third question with *italic words*.
4. **Fourth question in bold**
| Headline 1 in the tablehead | Headline 2 in the tablehead | Headline 3 in the tablehead |
|:--------------|:-------------:|--------------:|
| text-align left | text-align center | text-align right |
    
