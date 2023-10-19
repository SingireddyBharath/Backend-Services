var axios = require('axios');
var formurlencoded = require('form-urlencoded');
var config = require('../customConfig/translationApiConfig');
var translationUrl = config.translationUrl;
var translationApiKey = config.translationApiKey;
var detectionUrl = config.languageDetectionUrl;
var detectionApiKey = config.languageDetectionApiKey;
var googleTranslationUrl = config.googleTranslationUrl;
var googleDetectUrl = config.googleDetectUrl;
var googleKey = config.googleKey;

function TranslateService() {}

function googleDetect(text) {

    var config = {
        method: 'post',
        url: googleDetectUrl + '?key=' + googleKey,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "q": text
        })
    };
    return axios(config)
        .then(function (response) {
            if (response && response.data && response.data.data && response.data.data.detections && response.data.data.detections.length > 0 && response.data.data.detections[0].length > 0 && response.data.data.detections[0][0]['language']) {
                return {
                    languageCode: response.data.data.detections[0][0]['language'],
                    message: 'Detection Complete',
                    error: false
                }
            } else
                console.log('Lang resp not received')
        })
        .catch(function (error) {
            console.log('Error in googleDetect : ',error.message);
            return {
                error: true,
                message: error.message
            }
        });
}

function googleTranslate(sourceText, sourceLanguage, targetLanguage) {
    var config = {
        method: 'post',
        url: googleTranslationUrl+'?q='+encodeURI(sourceText)+'&target='+targetLanguage+'&source='+sourceLanguage+'&key=AIzaSyAKJKH3a4kHZsz0sOQQ8IUe_VkD-RtgBTQ',
        headers: {}
    };
    return axios(config)
        .then(function (response) {
            if (response && 
                response.data && 
                response.data.data && 
                response.data.data.translations.length>0) {
                return response.data.data.translations[0].translatedText;
            }else
                return 'The result was not translated into the target language'
        })
        .catch(function (error) {
            console.log('Error in googleTranslate : ',error.message);
            return sourceText;
        });
}

TranslateService.prototype.detect = async function detect(sourceText, service = 'google') {
    if (!sourceText) {
        console.log('No detection text provided')
        return {
            error: true,
            message: 'No detection text provided'
        }
    }
    if (service == 'google')
        return googleDetect(sourceText);

    var headers = {
        'content-type': 'application/json',
        'x-rapidapi-key': detectionApiKey,
        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com'
    }

    var options = {
        method: 'POST',
        url: detectionUrl,
        params: {
            'api-version': '3.0'
        },
        headers: headers,
        data: [{
            Text: sourceText
        }]
    };

    try {
        const detectionResponse = await axios(options)
        var data = detectionResponse.data
        if (!data || data.length == 0) {
            console.log('No data in response')
            return {
                error: true,
                message: 'No data in response'
            };
        }

        // if(data.detections[0][0].language == 'no') {
        //     console.log('Unknown Language')
        //     return { error: true, message: 'Unknown Language' }
        // }

        return {
            languageCode: data[0].language,
            message: 'Detection Complete',
            error: false
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message
        };
    }
}

TranslateService.prototype.translate = async function translate(sourceText, sourceLanguage, targetLanguage, service = 'google') {
    if (service == 'google')
        return googleTranslate(sourceText, sourceLanguage, targetLanguage);

    var headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'x-rapidapi-host': 'nlp-translation.p.rapidapi.com',
        'x-rapidapi-key': translationApiKey
    };
    var formData = formurlencoded({
        from: sourceLanguage,
        text: sourceText,
        to: targetLanguage
    });
    try {
        const translationResponse = await axios.post(translationUrl, formData, {
            headers: headers
        });
        const data = translationResponse.data;
        if (!data) {
            console.log('No translation data in response');
            return 'No translation data in response';
        }
        const translatedText = data.translated_text;
        if (!translatedText) {
            console.log('Missing translated_text in response');
            return 'Missing translated_text in response';
        }
        var targetTranslation = translatedText[targetLanguage];
        if (!targetTranslation) {
            console.log('The result was not translated into the target language');
            return 'The result was not translated into the target language';
        }
        return targetTranslation;
    } catch (error) {
        console.log(error);
        return "Error in translate : ", error.message;
    }
}

TranslateService.prototype.translateUsingGoogle = async function translate(sourceText, sourceLanguage, targetLanguage) {
    //using text translator by devisty
    var headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'x-rapidapi-key': 'a7bb3cc368mshd26b64a7c96343ap1aefcdjsne8cdbcc2a4cf',
        // 'accept-encoding': 'application/gzip',
    };
    // var formData = formurlencoded({
    //     q: sourceText,
    //     target: targetLanguage,
    //     source: sourceLanguage 
    // });
    //const encodedParams = new URLSearchParams();
    //      encodedParams.append("text", sourceText);
    //  encodedParams.append("to", targetLanguage);
    //  encodedParams.append("from", sourceLanguage);    
    try {
        const translationResponse = await axios.post('https://deep-translate1.p.rapidapi.com/language/translate/v2', {
            "q": sourceText,
            "source": sourceLanguage,
            "target": targetLanguage
        }, {
            headers: headers
        });
        const data = translationResponse.data;
        if (!data) {
            console.log('No translation data in response');
            return 'No translation data in response';
        }
        // console.log(data)
        const translatedText = data.data.translations.translatedText
        if (!translatedText) {
            console.log('Missing translatedText in response');
            return 'Missing translatedText in response';
        }
        return translatedText
    } catch (error) {
        console.log(error);
        return "Error in translate : ", error.message
    }
}

module.exports.getInstance = function getInstance() {
    return new TranslateService();
}