var _ = require('lodash');
var rp = require('request-promise');

function getUserId(data) {
    var visitorId = _.get(data, 'channel.channelInfos.from');
    if (!visitorId) visitorId = _.get(data, 'channel.from');
    return visitorId;
}

function matchWords(subject, words) {
    var regex = new RegExp("\\b(?:" + words.join("|") + ")\\b", "gi");
    return subject.match(regex) || [];
}

function sendLATAMSMS(messageDetails) {
    var options = {
        'method': 'POST',
        'url': 'https://api.twilio.com/2010-04-01/Accounts/AC75e91a87a2c90b46c8ae3434d0f75b7b/Messages.json',
        'headers': {
            'Authorization': 'Basic QUM3NWU5MWE4N2EyYzkwYjQ2YzhhZTM0MzRkMGY3NWI3YjplMDk1YWZjMGZkZjdiMzA3OWUzNjY1MDNmNDE2YWU5MA==',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'From':messageDetails.from,
            'To': messageDetails.to,
            'Body': messageDetails.body
        }
    };
    return rp(options).then(function (response) {
        console.log("sent sms");
        return response;
    }).catch(function(err){
        console.log("Error in sending sms : ",err.message);
        return Promise.reject(err);
    });
}

function sendSMS(messageDetails) {
    var options = {
        'method': 'POST',
        'url': 'https://api.twilio.com/2010-04-01/Accounts/ACcea0991dae7309b636cbbc26e1eeff27/Messages.json',
        'headers': {
            'Authorization': 'Basic QUNjZWEwOTkxZGFlNzMwOWI2MzZjYmJjMjZlMWVlZmYyNzpkZWRkOWM5Y2M5Yjk0NDYxMWVmNjJkNDEzNTA4OWZjMw==',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'From':messageDetails.from,
            'To': messageDetails.to,
            'Body': messageDetails.body
        }
    };
    return rp(options).then(function (response) {
        console.log("sent sms");
        return response;
    }).catch(function(err){
        console.log("Error in sending sms : ",err.message);
        return Promise.reject(err);
    });
}

function sendSMSToIndianNumbers(messageDetails) {
    var options = {
        'method': 'POST',
        'url': 'https://www.fast2sms.com/dev/bulkV2',
        'headers': {
            'authorization': '6LeUQwz24vMkY7XrbyoIBgcDClnHsA5WPK3iRTF8p9udVtaOjmPH1AWayuhR4M2sr6EIo5jz8VvDQwLY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "message": messageDetails.body,
            "route": "v3",
            "numbers": messageDetails.to,
            "sender_id": "TXTIND"
          })
    };
    return rp(options).then(function (response) {
        console.log("sent sms : ",response);
        return response;
    }).catch(function(err){
        console.log("Error in sending sms : ",err.message);
        return Promise.reject(err);
    });
}

function sendEmail(toEmail, fromEmail, subject, body) {
    var options = {
        'method': 'POST',
        'url': 'https://api.sendgrid.com/v3/mail/send',
        'headers': {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "personalizations": [
                {
                    "to": [{
                        "email": toEmail
                    }]
                }
            ],
            "from": {
                "email": fromEmail
            },
            "subject": subject,
            "content": [
                {
                    "type": "text/html",
                    "value": body
                }
            ]
        })

    };
    return rp(options).then(function (response) {
        console.log("SendGridResponse : ", response);
    }).catch(function (err) {
        console.error("Error in sending email");
        return Promise.reject(err);
    });
}

function shortenUrl(longUrl) {
    var options = {
        'method': 'POST',
        'url': 'https://demo.kore.net/CustomServices/getShortUrl',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "longUrl": longUrl
          })
    };
    return rp(options).then(function (response) {
        console.log("shortenUrl : ", response);
        return response;
    }).catch(function (err) {
        console.error("Error in sending email");
        return Promise.reject(err);
    });
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = {
    getUserId,
    sendSMS,
    sendEmail,
    sendSMSToIndianNumbers,
    shortenUrl,
    sendLATAMSMS,
    isJson,
    matchWords
}