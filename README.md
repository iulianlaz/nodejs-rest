**Overview**

Simple Nodejs REST API Server

**Configuration**

Steps to follow in order to set a simple environment with: typescript, node and express app:
https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d

**Start server** 

``````
Compile application
-------------------
npm run tsc

Start server
------------
node build/index.js
OR in background
node build/index.js > log.txt 2>&1 &
``````

**API examples**

Read
``````
GET localhost:3000/orders
GET localhost:3000/orders?startTime=today
``````

Read by id
``````
GET localhost:3000/orders/<id>
``````


Add
``````
POST localhost:3000/orders
{
	"authorName": "Iulian",
	"location": "Trattoria 20"
}
``````

Update by id
``````
PUT localhost:3000/orders/5d147d24d2dcf06fcc45f1c0
{
    "authorName": "Iulian",
    "location": "Trattoria 20"
}
``````

**Models**

You can easily add your own entity CRUD service, by creating a new file (e.g. models/<your_entiy_name>) that should have the same structure as orders.ts file.

