const config = require("./config.json");
const botId = Object.keys(config.credentials);
var botName = "Equinix";
var sdk = require("./lib/sdk");
var _ = require("lodash");
const axios = require("axios");
const {
  validateSkuQuery,
  generateSkuQuery,
  extractSkuId,
} = require("./sanitizeHelper.js");

async function findIntent(userInput) {
  const url = "https://api.openai.com/v1/completions";
  const apiKey = "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";
  try {
    const response = await axios.post(
      url,
      {
        model: "ft:davinci-002:kore-ai-retail-assist::883RolO8",
        prompt: userInput + " $$",
        temperature: 0.57,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["END"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const data = response.data.choices[0]?.text || "";
    return data.trim();
  } catch (error) {
    console.error("\n\nError:", error);
    return null;
  }
}

retailUseCases = [
  "Product Price",
  "Product Inventory",
  "Product Location",
  "Product Info",
];

module.exports = {
  botId: botId,
  botName: botName,
  on_user_message: async function (requestId, data, callback) {
    console.log("\n\nUser Query : ", data.message);

    var intentFound = await findIntent(data.message);

    console.log("\n\nIdentified Intent : ", intentFound);
    if (!intentFound) return sdk.sendBotMessage(data, callback);
    intentFound = intentFound.replace(/^"|"$/g, "");
    data.metaInfo = {
      nlMeta: {
        intent: intentFound,
        isRefresh: false,
      },
    };
    if (retailUseCases.includes(intentFound)) {
      data.metaInfo.nlMeta.childBotName = "EX_Zebra_V2.1";
      // data.metaInfo = {
      //   nlMeta: {
      //     intent: intentFound,
      //     childBotName: "EX_Zebra_V2.1",
      //     isRefresh: false,
      //   },
      // };
      if (validateSkuQuery(data.message, 1)) {
        data.message = extractSkuId(data.message);
        console.log("\n\nFound SKU in Query: " + data.message);
        return sdk.sendBotMessage(data, callback);
      } else if (!data.agent_transfer) {
        console.log("\n\nNon SKU Query: " + data.message);
        return sdk.sendBotMessage(data, callback);
      } else {
        data.message = "Agent Message";
        return sdk.sendUserMessage(data, callback);
      }
    } else {
      return sdk.sendBotMessage(data, callback);
    }
  },
  on_bot_message: function (requestId, data, callback) {
    sdk.sendUserMessage(data, callback);
  },
};
