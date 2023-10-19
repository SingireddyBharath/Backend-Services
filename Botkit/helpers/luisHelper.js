var request = require('request-promise');

const appId = "826f1d92-85ba-4c47-a515-9d52a133e5a2"
const subscriptionKey = "d022c4e321fc4d90990be264e067b07a"
const baseUrl = "https://westus.api.cognitive.microsoft.com/"
const slot = "production"
/**
 * This file uses luis account using praveen@koredotai.onmicrosoft.com email id 
 * Project name is NLP integration test under the azureTTSLuis Authoring Resource
 */
function LuisService() {}

//Luis.ai function for entity recognization
LuisService.prototype.detectEntity = async function getEntitiesFromluis(message){
    return new Promise(function(resolve, reject) {
         request({
         // Update the below url with the Luis.ai bot configuration.
             url: baseUrl + 'luis/prediction/v3.0/apps/'+ appId+'/slots/'+ slot+'/predict?subscription-key='+subscriptionKey+'&verbose=true&show-all-intents=true&log=true&query='+message,
             method: 'GET'
         }, function(error, res) {
             if (error || !res.body) {
                 reject({error:error});
             }else{
                 resolve(JSON.parse(res.body));
      }
         });
         
     });
 }

 module.exports.getInstance = function getInstance() {
     return new LuisService();
 }