<h2>Week2 Assignment</h2>

  * Goal: working on [m03.txt](https://github.com/zorawan/DataStructures/blob/master/week1/data/m03.txt) file to get "ONLY" address from https://parsons.nyc/aa/m03.html
  * Process: In the HTML structure, find children in tag <tbody> which is <tr> and run the function for each and remove all the tags. For each of the children, which is <td> show the first text and at the same time trim and replace all the space and break to reformat the address into 1 line. To make sure the txt file only contains addresses, I use if(line.length >0) to clean up the empty lines. Eventually, to remove the last line in the txt, I slice the address from the first line to the line before the last.
  * Outcome: See the [jsFile](https://github.com/zorawan/DataStructures/blob/master/week2/week2.js) and [addressBook](https://github.com/zorawan/DataStructures/blob/master/week2/addressBook.txt)
