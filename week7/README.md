## Week7
### Finish parsing and cleaning the rest of the AA data in all ten Manhattan "zones", and update/replace the data in Postgres table(s).
#### Step 1
* Create a SQL table with all the columns I need. In this case, I set queries for:
```javascript
var thisQuery = "CREATE TABLE aalocations (Title varchar(200), Building varchar(200), Address varchar(200), Latitude double precision, Longitude double precision, AddressDetail varchar(200), ScheduleDay varchar(100), ScheduleTimeFrom time, ScheduleTimeTo time, MeetingType varchar(200), MeetingDescription varchar(200), MeetingDetail varchar(200), WheelchairAccess varchar(100), SpecialInterest varchar(200));";
```
