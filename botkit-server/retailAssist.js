var config = require('./config.json');
var botId = Object.keys(config.credentials);
var botName = "test";
var sdk = require("./lib/sdk");

module.exports = {
    botId: botId,
    botName: botName,
    on_webhook: async function (requestId, data, componentName, callback) {
        var context = data.context;
        try {
            if (componentName === 'triggerIntent') {
                var triggeringIntent = context?.ambigiousIntents?.[0];
                console.log("Triggering : " , triggeringIntent);
                if(triggeringIntent){
                    data.message = triggeringIntent;
                     data.metaInfo = {
                        intentInfo: {
                            intent: triggeringIntent
                        }
                    }
                }
                return sdk.sendBotMessage(data,callback);
            }
        }
        catch (err) {
            console.log("Error in triggerIntent : ", err.message);
             return sdk.sendBotMessage(data,callback);
        }

    }
};


