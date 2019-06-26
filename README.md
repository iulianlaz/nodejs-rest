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
``````

**API examples**

Read
``````
GET localhost:3000/orders
``````

Read by id
``````
GET localhost:3000/orders/<id>
``````


Add
``````
POST localhost:3000/orders/add
{
	"name": "test1"
}
``````

