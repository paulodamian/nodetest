var express = require('express');
var router = express.Router();
let data = require("../data/dbData");


router.use(async (req, res, next) => {
    if (!req.headers.auth) {
        return res.status(403).json({error: 'No auth header sent!'});
    }
    
    let user = await data.getUser(req.headers.auth);

    if (!user) {
        return res.status(403).json({error: 'Bad user Id!'});
    }

    res.locals.userRol = user.role.toLowerCase();
    next();
});


router.get("/userbyid/:userId", async (req, res, next) => {
    try {
        let user = await data.getUserByProperty('id', req.params.userId);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});


router.get("/userbyname/:userName", async (req, res, next) => {
    try {
        let user = await data.getUserByProperty('name', req.params.userName);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});


module.exports = router;