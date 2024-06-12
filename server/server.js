const workRouter = require("./routers/workRouter.js");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

// create webserver
const app = express();
// set port
const port = 3030;

// set settings of webserver 
app.use(cors());
app.set('etag', false);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");                 
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Expose-Headers", "*"); 
    res.header("Accept-Language", "*");
    next();
});

app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use(bodyParser.json({limit: '200mb', extended: true}));
app.use(express.static(path.join(__dirname, '../my-map-project/build')));

// create sockets server
const http = require('http').Server(app);
const socketIo = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
    }
});

// routing
app.use("/api", workRouter);

// start server
http.listen(port, '0.0.0.0', function() {
    console.log(`+ Server listening at port:${port}`);
});

// catch wrong path
app.use(function(req, res, next) {
    console.log("error", req.url);
    res.status(404).send("Something error");
});

// start socket server for clients
exports.server_socket = require('./services/server_socket').server_socket;
exports.server_socket.create(socketIo);
