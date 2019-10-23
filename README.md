# nodetest

Challenge tasks: https://github.com/paulodamian/nodetest/blob/master/backend_tes%20NODE.pdf

## How to run the project

Just clone the repository install its dependencies and run the startup script.

Dependencies
```
npm install
```

Run the startup
```
npm run dev
```

The server will be running on http://localhost:8000

There are 5 endpoints:
* /
* /userbyid/{:userId}
* /userbyname/{:userName}
* /policiesbyusername/{:userName}
* /userbypolicy/{:policyId}

Each requets needs to send an **auth** header for access control purposes. The content of this header is just the id of the user that is making the request. In a real application the content of this header should be an acces token previously obteined by a login mechanism. 

The final version of the project fetch the data provided for the exercise and populate a sqlite db in memory. It is also possible to run the test without the database changing the required module from **dbData** to **jsonData** in the following files:
* index.js
* routes/userRoutes.js
* routes/adminRoutes.js
