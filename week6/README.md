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

### Part 2 - Query for my Book List data DynamoDB
* I Created two tables in DynamoDB which I set the pirmery key as number and string.
