## Week4 Assignment: Use Normalized Data Model to store the data from AA meeting website.

### Meeting Data with Hierarchical Model.png
* This drawing shows the model I used to store the dataset. I use normalized data model which I think is a hierarchical model to store the dataset.

### Meeting Data with COMN Model.png
* I practice the method which introduced in Holes book Chapter 16. I used the employee data table as a template to create a COMN model for AA meeting dataset.

### Data Structure 4.1 - AA Database.xlsx
* I use one table to show all the data listed in the html with the same hierarchy I draw in the Meeting [Data with Hierarchical Model.png](https://github.com/zorawan/DataStructures/blob/master/week4/1_Meeting%20Data%20with%20Hierarchical%20Model.png)

###### Reason to use ONE table
The AA meeting website is a small, simple website which doesn't have many data compared to other trending morden website. So to get data easily, I think it is better to store everything in one place.

###### Introduced hierarchy
However, the dataset from AA meeting website doesn't have a flat model has only two dementions. So, I introduced a hierarchy structure to show the dataset. Witch a root node on top, website builder can access the data types following through the hierarcy. 

###### A treatment for text format
Besides location, date, and time, a lot of information are described as text (sentence), without formatting. So I conver these information such as schedule condition, meeting detail into a hierarchical format. I think in this way, front-end developers can easiy grabe the data and have fiexbility to show meaningful, useful content to users.
