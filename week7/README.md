## Week7
### Finish parsing and cleaning the rest of the AA data in all ten Manhattan "zones", and update/replace the data in Postgres table(s).
#### Step 1
* Create a SQL table with all the columns I need. In this case, I set queries for:
```javascript
var thisQuery = "CREATE TABLE aalocations (Title varchar(200), Building varchar(200), Address varchar(200), Latitude double precision, Longitude double precision, AddressDetail varchar(200), ScheduleDay varchar(100), ScheduleTimeFrom time, ScheduleTimeTo time, MeetingType varchar(200), MeetingDescription varchar(200), MeetingDetail varchar(200), WheelchairAccess varchar(100), SpecialInterest varchar(200));";
```
#### Step 2
* Create a test json file with all only two meetings with the same key name as the table's name. Then use the week4_b starter code to read the json and write the content into the table.
```javascript
var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.Title.replace("'","&#39;") + "', E'" + value.Building.replace("'","&#39;") + "', E'" + value.Address.replace("'","&#39;") + "', " + value.Latitude + ", " + value.Longitude + ", E'" + value.Ad1dressDetail + "', E'" + value.ScheduleDay + "', E'" + value.ScheduleTimeFrom + "', E'" + value.ScheduleTimeTo + "', '" + value.MeetingType + "', E'" + value.MeetingDescription + "', E'" + value.MeetingDetail.replace("'","&#39;") + "', E'" + value.WheelchairAccess + "', E'" + value.SpecialInterest + "');";
```
#### Step 3
* Once it success, I started work on parsing the 10 txt files with all the information I need, ex. address, building, title...
* By suing the week2 starter code, I read 10 txt files and file each elements one by one. Then use fs.writeFileSync to store it in to a json.
* My way to get each element:

** Meeting Title
```javascript
var Title = $(element).find('td')
                .first()
                .find('b')
                .text()
                .trim()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
        if (Title.endsWith(" -")){
            Title = Title.substring(0,Title.length-2);
        }
        meeting.Title = Title;
```

** Meeting Building
```javascript
var Building = $(element).find('h4').text()
                .trim()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
        //console.log(Building + "\n"); 
        meeting.Building = Building;
```

** Meeting Detail
```javascript
var MeetingDetail = $(element).find('div')
                            .addClass( "detailsBox" )
                            .text()
                            .trim()
                             .replace(/(\r\n|\n|\r|\t)/gm, '');
        meeting.MeetingDetail = MeetingDetail;
```

** Weelchair
```javascript
var Wheelchair = $(element).find('span').text()
                .trim()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
        meeting.Wheelchair = Wheelchair;
```

** Address
```javascript
var Address = $(element).find('td')
                .first().html().split("<br>")[2]
                .trim()
                .replace(/(\r\n|\n|\r|\t|,\s*$)/gm, '')
                .split(",")
                .shift();
                //.toString();
            meeting.Address = Address;
```

** Address Detail
```javascript
var AddressDetail = $(element).find('td')
                .first().html().split("<br>")[3]
                .trim()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
        meeting.AddressDetail = AddressDetail;
```

** For the <td> in the middle: Because I want to have flet structure as same as my table, so I need to assign each schedule to the same location and make it as multiple objets in my json. So the code looks like:
``` javascript
          var schedules = $(element).find('td')
                .next().html().trim().replace(/(\r\n|\n|\r|\t)/gm, '').split("<br>");
        var times = [];
        var start, end, day, type, special;
        for (var i = 0; i < schedules.length; i++) {
            var line = $(schedules[i]).text().trim().replace(/(\r\n|\n|\r|\t)/gm, '');
                if (line.indexOf("From") > 0) {
                var current = {};
                var startIndex = line.indexOf("From ");
                var endIndex = line.indexOf(" to");
                day = line.substring(0, startIndex-1);
                start = line.substring(startIndex + 6, endIndex);
                end = line.substring(endIndex + 4);
                    current.ScheduleDay = day;
                    current.ScheduleTimeFrom = start;
                    current.ScheduleTimeTo = end;
                    //type
                    var nextLine = $(schedules[i + 1]).text().trim().replace(/(\r\n|\n|\r|\t)/gm, '');  
                    type = nextLine.substring(13);  
                    current.MeetingType = type;
                    times.push(current);
                    //special interest
                    var next2line = $(schedules[i + 2]).text().trim().replace(/(\r\n|\n|\r|\t)/gm, '');  
                    special = next2line.substring(17);  
                    current.SpecialInterest = special;
              }
        }
        
            for (var i = 0; i < times.length; i++) {
                var newMeeting = {};
                newMeeting = Object.assign(newMeeting, meeting);
                newMeeting.ScheduleDay = times[i].ScheduleDay;
                newMeeting.ScheduleTimeFrom = times[i].ScheduleTimeFrom;
                newMeeting.ScheduleTimeTo = times[i].ScheduleTimeTo;
                newMeeting.MeetingType = times[i].MeetingType;
                newMeeting.SpecialInterest = times[i].SpecialInterest;
                meetingData.push(newMeeting);
            }
```

#### Step 4
* Once I have all the meetings with all the combination in the json file, I use it with the week3 starter code to get geo location. To add latlong to the json, I tried to use async to parse th json then I used for loop to parse the meeting one by one. To make sure I won't lost orginal information, I create:
 ```javascript
 var entry = {};
```
```javascript
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
```
#### Step 5
* Once I have my new json file, I use the week4_b to run the file so I can write all the meeting into database.

#### Step 6
* Used week4_b starter code to check the rows I have writeen to the database, which shows more than 850 rows. However, I couldn't varify because I have no idea how many rows in my json. So my next step will be checking the rows in my json and varify if it is same as it in the SQL database.
                                             
