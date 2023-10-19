//var configURL = "http://localhost/api/callback";
var configURL = "https://demo.kore.net/genericBotkit/callback";
var BotUserID = (window.location.href).split("uId=")[1];
console.log(BotUserID);

function PostToRoute(){
    $.ajax({
        type: 'POST',
        url: configURL,
        contentType: 'application/json',
        data: JSON.stringify({
            "uID": BotUserID
        }), // access in body
        success: function(response) {
            console.log("Next Call :" + JSON.stringify(response));
        },error:function(err){
            console.log("Submit call error ",err);
        }
    });
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
});

$(function() {
    $("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 300,
        labels: {
            finish: 'Submit'
        }
    });

    // Create Steps Image
    $('.steps ul li:last-child a').append('<img src="images/step-4.png" alt="">').append('<span class="step-order">Upload Images</span>');
    // Count input 

    $('a[href="#finish"]').click(async function() {
        //submit.
        var decoded = await toBase64(document.getElementById("bill").files[0]);
		console.log(BotUserID)
        $.ajax({
            type: 'POST',
            url: configURL,
            contentType: 'application/json',
            data: JSON.stringify({
                "uID": BotUserID,
                "imageData": decoded
            }), 
            success: function(response) {
                console.log("Reponse on Submit" + JSON.stringify(response));
                 window.close();
            },error:function(err){
                console.log("Submit call error ",err);
            }
        });
       
    });
})