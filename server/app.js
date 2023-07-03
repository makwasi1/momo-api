const express = require('express');
//const path = require('path');
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const cardRoute = require('./routes/cardRoute');



const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoute.routes, cardRoute.routes);
app.listen(config.port, () => {
    console.log("Service endpoint= %s", config.url);
});
module.exports = app;