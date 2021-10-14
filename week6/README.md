# Week 6 Assignment
### Part 1 - Query for AA data PostgreSQL
* I learned to use starter code to query some particulat address in my aa meeting dataset. In my PostgreSQL dataset, there are only three columns when I created it last week. So I can only query address, latitude, or longitude for this week's task. I choose address, and query it with certain word ex. 13th, 22th st... and I got the result which shows the whole address in my list:
```javascript
ec2-user:~/environment/week6 (master) $ node w6_4.js
address                   
--------------------------
208 W 13TH ST New York NY 
208 W 13TH ST New York NY 
208 W 13TH ST New York NY 
208 W 13TH ST New York NY 
208 W 13TH ST New York NY 
208 W 13TH ST New York NY 
208 W 13TH ST New York NY 
208 W 13TH ST New York NY 
208 W 13TH ST New York NY 
208 W 13TH ST New York NY 
```
* I use LIKE instead of = to get the result, because the keyword I used for query is not equal to the address itself.
```javascript
var thisQuery = "SELECT address FROM aalocations WHERE address LIKE '%13TH ST%';";
```
### Part 2 - Query for my Book List data DynamoDB
* I modified var params in order to set an appropriate query for my book list. I found this website is really useful: [DynamoDB Advanced Queries: A Cheat Sheet](https://www.bmc.com/blogs/dynamodb-advanced-queries/)
* Because my partition key is book, which is equal to all the books in my list, so I can query all the book. To query a book(s), I use begins_with to find a book(s) with a title start with a/more letter(s).
```javascript
KeyConditionExpression: "book = :book and begins_with(booksName, :beginsWith)",
ExpressionAttributeValues: {
        ":book": {S: "book"},
        ":beginsWith":{"S":"T"}
```
* There are two books start with T in my book list, so the node result looks like this:
```javascript
ec2-user:~/environment/week6 (master) $ node w6_5.js
Query succeeded.
***** ***** ***** ***** ***** 
 {
  rate: { N: '5' },
  pYear: { S: '112' },
  book: { S: 'book' },
  booksName: { S: 'The Remains Of The Day' },
  like: { BOOL: true },
  rYear: { S: '121' },
  description: {
    S: "Here is Kazuo Ishiguro's profoundly compelling portrait of Stevens, the perfect butler, and of his fading, insular world in post-World War II England. Stevens, at the end of three decades of service at Darlington Hall, spending a day on a country drive, embarks as well on a journey through the past in an effort to reassure himself that he has served humanity by serving the 'great gentleman,' Lord Darlington. But lurking in his memory are doubts about the true nature of Lord Darlington's 'greatness,' and much graver doubts about the nature of his own life."
  },
  author: { S: 'Kazuo Ishiguro' }
}
***** ***** ***** ***** ***** 
 {
  rate: { N: '4' },
  pYear: { S: '103' },
  book: { S: 'book' },
  booksName: { S: 'The Shape of a Pocket' },
  like: { BOOL: true },
  rYear: { S: '120' },
  description: {
    S: 'The pocket in question is a small pocket of resistance. A pocket is formed when two or more people come together in agreement. The resistance is against the inhumanity of the New World Economic Order. The people coming together are the reader, me, and those the essays are about–Rembrandt, Paleolithic cave painters, a Romanian peasant, ancient Egyptians, an expert in the loneliness of a certain hotel bedroom, dogs at dusk, a man in a radio station. And unexpectedly, our exchanges strengthen each of us in our conviction that what is happening in the world today is wrong, and that what is often said about it is a lie. I’ve never written a book with a greater sense of urgency.'
  },
  author: { S: 'John Berger' }
}
```
