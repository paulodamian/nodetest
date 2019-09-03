const express = require("express");

//let data = require("./data/jsonData");
let data = require("./data/dbData");

const app = express();
const port = "8000";

//Routes
app.use(require('./routes/publicRoutes'));
app.use(require('./routes/userRoutes'));
app.use(require('./routes/adminRoutes'));


//Server initializacion
app.listen(port, async () => {
    await data.initData();
    console.log(`Listening to requests on http://localhost:${port}`);
});


