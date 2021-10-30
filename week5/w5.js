var blogEntries = [];

class BlogEntry {
  constructor(rYear, book, author, description, rate, like, comment) {
    this.rYear = {}; 
    this.rYear.S = new Date(rYear).getYear().toString();
    this.book = {};
    this.book.S = book;
    this.author = {};
    this.author.S = author;
    this.description = {};
    this.description.S = description;
    this.rate = {};
    this.rate.N = rate.toString();
    this.like = {};
    this.like.BOOL = like; 
     if (comment != null) {
        this.comment = {};
        this.comment.S = comment; 
    }
  }
}

blogEntries.push(new BlogEntry("2021", "NoSQL and SQL Data Modeling: Bringing Together Data, Semantics, and Software", "Ted Hills", "How do we design for data when traditional design techniques cannot extend to new database technologies? In this era of big data and the Internet of Things, it is essential that we have the tools we need to understand the data coming to us faster than ever before, and to design databases and data processing systems that can adapt easily to ever-changing data schemas and ever-changing business requirements. There must be no intellectual disconnect between data and the software that manages it. It must be possible to extract meaning and knowledge from data to drive artificial intelligence applications. Novel NoSQL data organization techniques must be used side-by-side with traditional SQL databases. Are existing data modeling techniques ready for all of this? The Concept and Object Modeling Notation (COMN) is able to cover the full spectrum of analysis and design. A single COMN model can represent the objects and concepts in the problem space, logical data design, and concrete NoSQL and SQL document, key-value, columnar, and relational database implementations. COMN models enable an unprecedented level of traceability of requirements to implementation. COMN models can also represent the static structure of software and the predicates that represent the patterns of meaning in databases.", 4, true, "This is the textbook for Data Structure, which I learned the SQL and No SQL concepts from."));

blogEntries.push(new BlogEntry("2021", "How Chart Lie", "Alberto Cairo", "We've all heard that a picture is worth 1,000 words, but what if we don't understand what we're looking at? Social media has made charts, infographics, and diagrams ubiquitous - and easier to share than ever. We associate charts with science and reason; the flashy visuals are both appealing and persuasive. Pie charts, maps, bar and line graphs, and scatter plots (to name a few) can better inform us, revealing patterns and trends hidden behind the numbers we encounter in our lives. In short, good charts make us smarter - if we know how to read them.", 4, true));

blogEntries.push(new BlogEntry("2021", "The Remains Of The Day", "Kazuo Ishiguro", "Here is Kazuo Ishiguro's profoundly compelling portrait of Stevens, the perfect butler, and of his fading, insular world in post-World War II England. Stevens, at the end of three decades of service at Darlington Hall, spending a day on a country drive, embarks as well on a journey through the past in an effort to reassure himself that he has served humanity by serving the 'great gentleman,' Lord Darlington. But lurking in his memory are doubts about the true nature of Lord Darlington's 'greatness,' and much graver doubts about the nature of his own life.", 5, true));

blogEntries.push(new BlogEntry("2021", "The Shape of a Pocket", "John Berger", "The pocket in question is a small pocket of resistance. A pocket is formed when two or more people come together in agreement. The resistance is against the inhumanity of the New World Economic Order. The people coming together are the reader, me, and those the essays are about–Rembrandt, Paleolithic cave painters, a Romanian peasant, ancient Egyptians, an expert in the loneliness of a certain hotel bedroom, dogs at dusk, a man in a radio station. And unexpectedly, our exchanges strengthen each of us in our conviction that what is happening in the world today is wrong, and that what is often said about it is a lie. I’ve never written a book with a greater sense of urgency.", 4, true));

blogEntries.push(new BlogEntry("2020", "The Curious Incident of the Dog in the Night-Time", "Mark Haddon", "Christopher John Francis Boone knows all the countries of the world and their capitals and every prime number up to 7,057. He relates well to animals but has no understanding of human emotions. He cannot stand to be touched. And he detests the color yellow. This improbable story of Christopher's quest to investigate the suspicious death of a neighborhood dog makes for one of the most captivating, unusual, and widely heralded novels in recent years.", 5, true));

blogEntries.push(new BlogEntry("2020", "Lifelong Kindergarten: Cultivating Creativity through Projects, Passion, Peers, and Play (The MIT Press) Cultivating Creativity through Projects, Passion, Peers, and Play The MIT Press", "Mitchel Resnick", "How lessons from kindergarten can help everyone develop the creative thinking skills needed to thrive in today's society. In kindergartens these days, children spend more time with math worksheets and phonics flashcards than building blocks and finger paint. Kindergarten is becoming more like the rest of school. In Lifelong Kindergarten, learning expert Mitchel Resnick argues for exactly the opposite: the rest of school (even the rest of life) should be more like kindergarten. To thrive in today's fast-changing world, people of all ages must learn to think and act creatively—and the best way to do that is by focusing more on imagining, creating, playing, sharing, and reflecting, just as children do in traditional kindergartens.", 4, true));

blogEntries.push(new BlogEntry("2019", "Hooked: How to Build Habit-Forming Products", "Nir Eyal", "How do successful companies create products people can’t put down? Why do some products capture widespread attention while others flop? What makes us engage with certain products out of sheer habit? Is there a pattern underlying how technologies hook us? Nir Eyal answers these questions (and many more) by explaining the Hook Model—a four-step process embedded into the products of many successful companies to subtly encourage customer behavior. Through consecutive “hook cycles,” these products reach their ultimate goal of bringing users back again and again without depending on costly advertising or aggressive messaging.", 5, false));

blogEntries.push(new BlogEntry("2019", "100 Things Every Designer Needs to Know About People (Voices That Matter)", "Ph.D. Weinschenk, Susan", "We design to elicit responses from people. We want them to buy something, read more, or take action of some kind. Designing without understanding what makes people act the way they do is like exploring a new city without a map: results will be haphazard, confusing, and inefficient. This book combines real science and research with practical examples to deliver a guide every designer needs. With it you’ll be able to design more intuitive and engaging work for print, websites, applications, and products that matches the way people think, work, and play.", 5, true));

console.log(blogEntries);


var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

for (var i=0; i< blogEntries.length; i++){
var params = {};
params.Item = blogEntries[i]; 
params.TableName = "myBooks";
       
var dynamodb = new AWS.DynamoDB();
dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
}