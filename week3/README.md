## Week3 Project

1.  Create a Texas A&M GeoServices account and use dotenv to save the API key.
2.  Work on Starter code to require API by my [addressBook.txt](https://github.com/zorawan/DataStructures/blob/master/week2/addressBook.txt)
3.  
   * Step1: Split address to each address

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


3. Call the api by the starter code and format it into json format.
  * Step1: After parse the api request, I create a format variable to store content as a jason format.
  * Step2: After review the json file, I decide I want to get the values from the key InputAddress then > StreetAddress, then add it into format.
  * Step3: Create a valuble latLong and store Latitude and Longitude information in the same way.
  * Step4: Write the latlong into format and combine two pieces of information.

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
