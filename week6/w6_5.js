// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "myBooks",
    KeyConditionExpression: "rYear = :rYear and begins_with(book, :beginsWith)", // 
    
    //the query expression
    // ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
    //     "#tp" : "topic"
    // },
    ExpressionAttributeValues: { // the query values
        ":rYear": {S: "121"},
        ":beginsWith":{"S":"N"}
        // ":minYear": {N: new Date("2016").valueOf().toString()},
        // ":maxYear": {N: new Date("2020").valueOf().toString()}
    }
};


dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});