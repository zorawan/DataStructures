const { Client } = require('pg');
var async = require('async');  
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'zorawan';
db_credentials.host = 'data-structures-zora.c9ulthq15q4o.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;


const addressesForDb = require('../week3/newJson.json');


async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.Title.replace("'","&#39;") + "', E'" + value.Building.replace("'","&#39;") + "', E'" + value.Address.replace("'","&#39;") + "', " + value.Latitude + ", " + value.Longitude + ", E'" + value.Ad1dressDetail + "', E'" + value.ScheduleDay + "', E'" + value.ScheduleTimeFrom + "', E'" + value.ScheduleTimeTo + "', '" + value.MeetingType + "', E'" + value.MeetingDescription + "', E'" + value.MeetingDetail.replace("'","&#39;") + "', E'" + value.WheelchairAccess + "', E'" + value.SpecialInterest + "');";
    console.log(thisQuery);
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 

