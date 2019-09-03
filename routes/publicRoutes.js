var express = require('express');
var router = express.Router();

router.get("/", async (req, res, next) => {
    res.status(200).send('These are not the droids you are looking for');
});

module.exports = router;