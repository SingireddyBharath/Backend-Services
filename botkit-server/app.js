var Application = require("./lib/app");
var Server = require("./lib/server");
var sdk = require("./lib/sdk");
var config = require("./config");

var app = new Application(null, config);
var server = new Server(config, app);

server.start();
// sdk.registerBot(require('./retailAssist.js'));
// sdk.registerBot(require("./RA_EX_Zebra_v2.1.js"));
sdk.registerBot(require("./UB_FTM.js"));
var routes = app.load();
module.exports = routes;
