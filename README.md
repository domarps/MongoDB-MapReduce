# mapReduce
CS 410 MP :  A Javascript implementation of MapReduce using the MongoDB

## Summary
A crawled dataset of resumes from [Indeed](www.indeed.com) is available in JSON format(file available on request). Implemented the MapReduce wordCount program using **partial computation** and formulated a **pointwise mutual information**(PMI) calculation algorithm to measure semantic similarity.

## Instructions
In order to import the JSON file into MongoDB, we use the following util :
```bash
mongoimport --db cs410mp3 --collection resumes --file resumes.json
```
Run any of the MR implementations in the *mongo shell* as follows:
```bash
load("PMI.js")
```
