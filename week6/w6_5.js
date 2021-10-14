// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

// var params = {
//     TableName : "processblog",
//     KeyConditionExpression: "pk GE :minKey",
//     ExpressionAttributeValues: {
//       // ":bk": "Data",
//       ":minKey": {N: "1"}

//     }
// };

var params = {
    TableName : "processblog",
    KeyConditionExpression: "pk = :ppk",
    // ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
    //     "#tp" : "pk"
    // },
    ExpressionAttributeValues: { // the query values
        ":ppk": {N: "*"},
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