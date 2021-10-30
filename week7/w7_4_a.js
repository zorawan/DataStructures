const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'zorawan';
db_credentials.host = 'data-structures-zora.c9ulthq15q4o.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

//4a
// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table: 
var thisQuery = "CREATE TABLE aalocations (Title varchar(200), Building varchar(200), Address varchar(200), Latitude double precision, Longitude double precision, AddressDetail varchar(200), ScheduleDay varchar(100), ScheduleTimeFrom time, ScheduleTimeTo time, MeetingType varchar(200), MeetingDescription varchar(200), MeetingDetail varchar(200), WheelchairAccess varchar(100), SpecialInterest varchar(200));";
//Sample SQL statement to delete a table: 
//var thisQuery = "DROP TABLE aalocations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});