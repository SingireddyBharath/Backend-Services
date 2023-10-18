var Application = require("../lib/app");
var Server = require("../lib/server");
var sdk = require("../lib/sdk");
var config = require("../config");
require("../helpers/CustomLogger.js");
const serverless = require("serverless-http");

var app = new Application(null, config);
var server = new Server(config, app);

server.start();

sdk.registerBot(require("../RA_EX_Zebra_v2.1.js"));
app.load();
app.use(`/.netlify/functions/api`, server);
module.exports.handler = serverless(app);
