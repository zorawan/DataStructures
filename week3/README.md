## Week3 Project
1. Task1: Create a Texas A$M GeoServices account and use dotenv to save the API key.
2. Task2: Work on Starter code to require API by my [addressBook.txt]https://github.com/zorawan/DataStructures/blob/master/week2/addressBook.txt
   * Step1: Pplit address to each address
```javascript
  var array = data.split("\n");
```
   * Step2: Split address by , and keep only first part of the address then map to var addresses
```javascript
  addresses = array.map(item => item.split(",")[0]);
  console.log(addresses);
  loadApi();
```
   * Step3: I put everything in loadApi function to make sure the api call runs after the txt file been read.
```javascript
function loadApi() {}
```
3. Task3: Call the api by the starter code and format it into json format.
    * Step1: After parse the api request, I tamuGeo and it's key and values to construct a new data structure.
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
