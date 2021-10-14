# Week 5 Assignment
### 5.1
* The drawing of the NOSQL model shows how I want to store my proceeblog data. My processblog data is about the books I read every year.
![My Reading Data with NoSQL Model](https://user-images.githubusercontent.com/6037803/136669281-56480b32-d33f-45b3-a70a-3508ca02fec4.png)
* Books content can be seen in the [DOC File](https://github.com/zorawan/DataStructures/blob/master/week5/2_Data%20Structure%205.1%20-%20My%20Annual%20Reading%20List%20Database.docx)
* The conent I want to store in the database list as following:
  * Book name
  * Publish Data
  * Author
  * Description
  * Rate
  * Read Year
  * My Comment
  
### 5.2
* In this section, I learned how to create a DynamoDB table by suing the javascript starter code. By using the class function, I can create a format to store content for an object.
* I updated the starter code to store my book list as shown below, I used book as the partition key and booksName as sort key:
```javascript
class BlogEntry {
  constructor(book, booksName, pYear, author, description, rate, rYear, like, comment) {
    this.book = {};
    this.book.S = book;
    this.booksName = {};
    this.booksName.S = booksName;
    this.pYear = {}; 
    this.pYear.S = new Date(pYear).getYear().toString();
    this.author = {};
    this.author.S = author;
    this.description = {};
    this.description.S = description;
    this.rate = {};
    this.rate.N = rate.toString();
    this.rYear = {}; 
    this.rYear.S = new Date(rYear).getYear().toString();
    this.like = {};
    this.like.BOOL = like; 
     if (comment != null) {
        this.comment = {};
        this.comment.S = comment; 
    }
  }
}
```
* I created a for loop to write all the objects at once into DynamoDB.
```javascript
for (var i=0; i< blogEntries.length; i++){
var params = {};
params.Item = blogEntries[i]; 
params.TableName = "processblog";

var dynamodb = new AWS.DynamoDB();
dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
}
```
* For the result, it shows up in the DynamoDB table:
<img width="1041" alt="5_2DynamoDB" src="https://user-images.githubusercontent.com/6037803/137336776-57b1a4c6-3114-4816-993e-fae359164c8f.png">
