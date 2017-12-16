const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3000;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//override with POST having ?_method = PUT
app.use(methodOverride('_method'));//HTML5 Method only have POST and GET

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./routes')(app);

app.listen(port, function() {
    console.log("Listening on PORT " + port);
});