const path = require("path");
const express = require("express");
const axios = require('axios');
var _ = require('lodash');

const app = express();
const port = process.env.PORT || "8000";

app.get("/", async (req, res, next) => {
    res.status(200).send('These are not the droids you are looking for');
});


app.use(async (req, res, next) => {
    if (!req.headers.auth) {
        return res.status(403).json({error: 'No user sent!'});
    }

    //this is to fetch the clients just one time
    let clients = await fetchClients();
    clients = clients.data.clients; 
    
    let user = _.find(clients, {'id':req.headers.auth});
    if (!user) {
        return res.status(403).json({error: 'Bad user Id!'});
    }

    res.locals.clients = clients;
    res.locals.userRol = user.role.toLowerCase();
    next();
});


app.get("/userbyid/:userId", async (req, res, next) => {
    try {
        let user = findUser(res.locals.clients, 'id', req.params.userId);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});


app.get("/userbyname/:userName", async (req, res, next) => {
    try {
        let user = findUser(res.locals.clients, 'name', req.params.userName);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});


//Admin routes
app.use((req, res, next) => {
    if (res.locals.userRol !== 'admin') {
        return res.status(403).json({error: 'Forbiden!'});
    }
    next();
});


app.get("/policiesbyusername/:userName", async (req, res, next) => {
    try {
        let user = findUser(res.locals.clients, 'name', req.params.userName);
        let policies = await fetchPolicies();
        policies = _.filter(policies.data.policies, {'clientId':user.id});
        res.status(200).send(policies);
    } catch (err) {
        next(err);
    }
});


app.get("/userbypolicy/:policyNumber", async (req, res, next) => {
    try {
        let policies = await fetchPolicies();
        let policy = _.find(policies.data.policies, {'id':req.params.policyNumber});
        let user = findUser(res.locals.clients, 'id', policy.clientId);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});



//Server initializacion
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});


fetchClients = () => {
    try {
        return axios.get('http://www.mocky.io/V2/5808862710000087232b75ac');
    } catch(err) {
        console.error(err);
    }
}


fetchPolicies = () => {
    try {
        return axios.get('http://www.mocky.io/v2/580891a4100000e8242b75c5');
    } catch(err) {
        console.error(err);
    }
}


findUser = (users, field, value) => {
    let matches = _.find(users, (o) => {
        return o[field].toLowerCase() == value.toLowerCase();
    });

    if (!matches) {
        const err = new Error('User not found!');
        err.statusCode = 404;
        throw err;
    }

    return matches;
}