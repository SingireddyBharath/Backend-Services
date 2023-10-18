let axios = require('axios');

function transcribe(obj) {
    let config = {
        method: 'post',
        url: 'https://demo.kore.net/CustomServices/transcribe',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "file": obj.url,
            "transcriptionEngine": obj.type
        })
    };
    console.log('obj : ', obj);
    return axios(config).then(function(response) {
        let text;
        if (response && response.data && response.data.text)
            text = response.data.text;
        if (!text)
            console.log("Failed to parse trascribed text : ", response.data)
        return text
    }).catch(function(error) {
        console.log("Error in transcribe : ", error.message);
    });
}

module.exports = {
    transcribe
}