function dasheConv () {
const filepath = document.getElementById('file_input_file').files[0].path;
const fs = require('fs')
const csv = require('csvtojson')
csv({
        colParser: {
            "firstName": "string",
        },
        checkType: true,
        noheader: false,
        headers: ['profile', 'firstName', 'lastName', 'address', 'apt', 'city', 'state', 'zipCode', 'country', 'phone', 'billingMatch', 'billingFirstName', 'billingLastName', 'billingAddress', 'billingApt', 'billingCity', 'billingState', 'billingZipCode', 'billingCountry', 'billingPhone', 'email', 'cardName', 'cardNumber', 'cardExpiry', 'cardCvv', 'oneUseOnly']
    })
    .fromFile(filepath)
    .then((jsonObj) => {
        console.log(jsonObj);
        var finaljson = [];
        for (var i = 0; i < jsonObj.length; i++) {
            
            var json = jsonObj[i];
            var creditCardType = require('credit-card-type');
            var carNum = jsonObj[i]["cardNumber"];
            var numString = carNum.toString();
            var cards = creditCardType(numString);
            var cards = (cards[0].type);

            

            if (cards == "visa") {
                var carddata = "Visa";
                var newCVV = ("000" + jsonObj[i]["cardCvv"]).substr(-3, 3);
            } else if (cards == "american-express") {
                var carddata = "American Express"
                var newCVV = ("0000" + jsonObj[i]["cardCvv"]).substr(-4, 4);
            } else if (cards == "mastercard") {
                var carddata = "MasterCard";
                var newCVV = ("000" + jsonObj[i]["cardCvv"]).substr(-3, 3);
            } else if (cards == "jcb") {
                var carddata = "JCB";
                var newCVV = ("000" + jsonObj[i]["cardCvv"]).substr(-3, 3);
            } else if (cards == "discover") {
                var carddata = "Discover";
                var newCVV = ("000" + jsonObj[i]["cardCvv"]).substr(-3, 3);
            }


            var fs = require('fs');
            var profName = jsonObj[i]["profile"];
            jsonObj[i]["cardCvv"] = newCVV;
            if (jsonObj[i]["oneUseOnly"] == "y" || jsonObj[i]["oneUseOnly"] == "yes" || jsonObj[i]["oneUseOnly"] == "true") {
                var oneUseOnly = true;
            } else {
                var oneUseOnly = false;
            }
            if (jsonObj[i]["billingMatch"] == "y" || jsonObj[i]["billingMatch"] == "yes" || jsonObj[i]["billingMatch"] == "true") {
                jsonObj[i]["billingFirstName"] = "";
                jsonObj[i]["billingLastName"] = "";
                jsonObj[i]["billingAddress"] = "";
                jsonObj[i]["billingApt"] = "";
                jsonObj[i]["billingCity"] = "";
                jsonObj[i]["billingState"] = "";
                jsonObj[i]["billingZipCode"] = null;
                jsonObj[i]["billingCountry"] = "";
                jsonObj[i]["billingPhone"] = "";
                jsonObj[i]["billingMatch"] = true;
            } else {
                jsonObj[i]["billingMatch"] = false;
            }
            jsonObj[i]["oneUseOnly"] = oneUseOnly;
            json = jsonObj[i];
            finaljson.push(JSON.stringify({
                [profName]: json
            }, null, 2).slice(1, (JSON.stringify({
                [profName]: json
            }, null, 2).length - 1)));
        }
        fs.writeFile(document.getElementById('file_save').files[0].path + '/DasheProfiles.json', '{' + finaljson.slice(0, jsonObj.length + 1) + '}', 'utf8');
    });
    
};
window.dasheConv = dasheConv;