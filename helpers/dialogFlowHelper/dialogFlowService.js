const dialogflow = require('@google-cloud/dialogflow')
const uuid = require('uuid');
const languageCode = 'en-US'
const projectId = 'external-nlp';
const serviceFileName = "/data/Botkits/CommonBotkit/helpers/dialogFlowHelper/dialogFlow.json"
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: serviceFileName 
})
const sessionId = uuid.v4()
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId)

/**
 * This file uses dialog flow account using demo@kore.com email id | project name is External-NLP
 */

function DialogFlowService() {}
 
//Dialog Flow sdk call for intent recognization
DialogFlowService.prototype.detectIntent = async function getIntentFromDialogFlow(message){
    return new Promise(function(resolve, reject) {
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: languageCode
                }
            }
        }
    
        sessionClient.detectIntent(request, function(err, response) {
            if(err) {
                console.log(err)
                reject({ error: err })
            }
            resolve(response)
        })
    })
}

module.exports.getInstance = function getInstance() {
    return new DialogFlowService();
}