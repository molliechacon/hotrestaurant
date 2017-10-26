// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
// NEED TO DEFINE PORT THIS WAY AS A HEROKU REQUIREMENT!!!
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//adding dummy data to being with
var reservationsData = [
    {
        name: "Jim",
        phone: "303.555.2525",
        email: "jim@real.com",
        id: "242"
    }
];

var waitlistData = [
    {
        name: "Jill",
        phone: "303.555.5555",
        email: "jill@notreal.com",
        id: "5"
    }
];


// Routes
// =============================================================

// html routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});
  
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
  
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// if no matching route is found, default to home
// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "home.html"));
// });


// Routes that display reserved and waitlist data as JSON objects
app.get("/api/tables", function(req, res) {
    res.json(reservationsData);
});

app.get("/api/waitlist", function(req, res) {
    res.json(waitlistData);
});


// Create new reservations (if more than 5 exist, add to waitlist) - takes in JSON

app.post("/api/tables", function (req, res) {
    if (reservationsData.length < 5) {
        reservationsData.push(req.body);
        res.json(true);
    } else {
        waitlistData.push(req.body);
        res.json(false);
    }
});
// html routes



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});