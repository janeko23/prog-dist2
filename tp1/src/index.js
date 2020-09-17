const express = require('express');
const morgan = require('morgan');
const app = express();
const xmlparser = require("express-xml-bodyparser");
var xml2js = require("xml2js");
// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(xmlparser());

app.use(require('./routes'));
app.use('/api/videoClub', require('./routes/videoClub'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});