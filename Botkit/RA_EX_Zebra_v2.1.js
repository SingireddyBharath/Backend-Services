var botId = ["st-382ffb09-63d8-5bc3-b614-4b6a10b6fc83"];

var botName = "Definition Bot";
var sdk = require("./lib/sdk");
var _ = require("lodash");
//var logger = require('./helpers/CustomLogger.js')

const { validateSkuQuery, generateSkuQuery } = require("./sanitizeHelper.js");

module.exports = {
  botId: botId,
  botName: botName,
  on_user_message: function (requestId, data, callback) {
    if (validateSkuQuery(data.message, 1)) {
      var intentMessage = data;
      intentMessage.message = generateSkuQuery(data.message);
      //Sends back 'Hello' to user.
      console.log("\n\nFound SKU in Query: " + intentMessage.message);
      return sdk.sendBotMessage(intentMessage, callback);
    } else if (!data.agent_transfer) {
      //Forward theNon message to bot
      console.log("\n\nNon SKU Query: " + data.message);
      return sdk.sendBotMessage(data, callback);
    } else {
      data.message = "Agent Message";
      return sdk.sendUserMessage(data, callback);
    }
  },
  on_bot_message: function (requestId, data, callback) {
    if (data.message === "wer5345#$%#$%ert794 ") {
      data.message = "sku lg12345";
      sdk.sendBotMessage(data);
    }
    //Sends back the message to user

    return sdk.sendUserMessage(data, callback);
  },
};
