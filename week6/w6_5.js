// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "bookList",
    KeyConditionExpression: "book = :book and begins_with(booksName, :beginsWith)", // the query expression
    // ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
    //     "#tp" : "topic"
    // },
    ExpressionAttributeValues: { // the query values
        ":book": {S: "book"},
        ":beginsWith":{"S":"T"}
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