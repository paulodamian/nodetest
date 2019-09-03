var express = require('express');
var router = express.Router();
let data = require("../data/jsonData");

router.use((req, res, next) => {
    if (res.locals.userRol !== 'admin') {
        return res.status(403).json({error: 'Forbiden!'});
    }
    next();
});


router.get("/policiesbyusername/:userName", async (req, res, next) => {
    try {
        let user = data.getUserByProperty('name', req.params.userName);
        policies = data.getUserPolicies(user);
        res.status(200).send(policies);
    } catch (err) {
        next(err);
    }
});


router.get("/userbypolicy/:policyNumber", async (req, res, next) => {
    try {
        let policy = data.getPolicy(req.params.policyNumber);
        let user = data.getUserByProperty('id', policy.clientId);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;