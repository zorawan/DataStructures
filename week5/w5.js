var blogEntries = [];

class BlogEntry {
  constructor(primaryKey, book, pYear, author, description, rate, rYear, like, comment) {
    this.pk = {};
    this.pk.N = primaryKey.toString();
    this.book = {};
    this.book.S = book;
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

blogEntries.push(new BlogEntry(0,"NoSQL and SQL Data Modeling: Bringing Together Data, Semantics, and Software", '2016', "Ted Hills", "How do we design for data when traditional design techniques cannot extend to new database technologies? In this era of big data and the Internet of Things, it is essential that we have the tools we need to understand the data coming to us faster than ever before, and to design databases and data processing systems that can adapt easily to ever-changing data schemas and ever-changing business requirements. There must be no intellectual disconnect between data and the software that manages it. It must be possible to extract meaning and knowledge from data to drive artificial intelligence applications. Novel NoSQL data organization techniques must be used side-by-side with traditional SQL databases. Are existing data modeling techniques ready for all of this? The Concept and Object Modeling Notation (COMN) is able to cover the full spectrum of analysis and design. A single COMN model can represent the objects and concepts in the problem space, logical data design, and concrete NoSQL and SQL document, key-value, columnar, and relational database implementations. COMN models enable an unprecedented level of traceability of requirements to implementation. COMN models can also represent the static structure of software and the predicates that represent the patterns of meaning in databases.", 4, "2021", true, "This is the textbook for Data Structure, which I learned the SQL and No SQL concepts from."));

blogEntries.push(new BlogEntry(1,"How Chart Lie", '2020', "Alberto Cairo", "We've all heard that a picture is worth 1,000 words, but what if we don't understand what we're looking at? Social media has made charts, infographics, and diagrams ubiquitous - and easier to share than ever. We associate charts with science and reason; the flashy visuals are both appealing and persuasive. Pie charts, maps, bar and line graphs, and scatter plots (to name a few) can better inform us, revealing patterns and trends hidden behind the numbers we encounter in our lives. In short, good charts make us smarter - if we know how to read them.", 4, "2021", true));

blogEntries.push(new BlogEntry(2, "The Remains Of The Day", '2012', "Kazuo Ishiguro", "Here is Kazuo Ishiguro's profoundly compelling portrait of Stevens, the perfect butler, and of his fading, insular world in post-World War II England. Stevens, at the end of three decades of service at Darlington Hall, spending a day on a country drive, embarks as well on a journey through the past in an effort to reassure himself that he has served humanity by serving the 'great gentleman,' Lord Darlington. But lurking in his memory are doubts about the true nature of Lord Darlington's 'greatness,' and much graver doubts about the nature of his own life.", 4, "2021", true));

blogEntries.push(new BlogEntry(3, "The Shape of a Pocket", '2003', "John Berger", "The pocket in question is a small pocket of resistance. A pocket is formed when two or more people come together in agreement. The resistance is against the inhumanity of the New World Economic Order. The people coming together are the reader, me, and those the essays are about–Rembrandt, Paleolithic cave painters, a Romanian peasant, ancient Egyptians, an expert in the loneliness of a certain hotel bedroom, dogs at dusk, a man in a radio station. And unexpectedly, our exchanges strengthen each of us in our conviction that what is happening in the world today is wrong, and that what is often said about it is a lie. I’ve never written a book with a greater sense of urgency.", 4, "2020", true));

console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

for (var i=0; i< blogEntries.length; i++){
var params = {};
params.Item = blogEntries[1]; 
params.TableName = "processblog";

var dynamodb = new AWS.DynamoDB();
dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
}