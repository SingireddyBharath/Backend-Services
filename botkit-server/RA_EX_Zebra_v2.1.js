var config = require("./config.json");
var botId = Object.keys(config.credentials);
var botName = "Definition Bot";
var sdk = require("./lib/sdk");
var _ = require("lodash");
const { validateSkuQuery, extractSkuId } = require("./sanitizeHelper.js");

module.exports = {
  botId: botId,
  botName: botName,
  on_user_message: function (requestId, data, callback) {
    if (validateSkuQuery(data.message, 1)) {
      finalUserMsg = extractSkuId(data.message);
      if (finalUserMsg) data.message = finalUserMsg;
      console.log("\n\nFound SKU in Query: " + data.message);
      return sdk.sendBotMessage(data, callback);
    } else if (!data.agent_transfer) {
      console.log("\n\nNon SKU Query: " + data.message);
      return sdk.sendBotMessage(data, callback);
    } else {
      data.message = "Agent Message";
      return sdk.sendUserMessage(data, callback);
    }
  },
  on_bot_message: function (requestId, data, callback) {
    return sdk.sendUserMessage(data, callback);
  },
};
