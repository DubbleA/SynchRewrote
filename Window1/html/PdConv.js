function pdConv() {
    const filepath = document.getElementById('file_input_file').files[0].path;
    const fs = require('fs');
    const randomstring = require('randomstring');
    var states = require('us-state-codes');
    const csv = require('csvtojson');
    csv({
            checkType: true,
            noheader: false,
            headers: ['profile', 'firstName', 'lastName', 'address', 'apt', 'city', 'state', 'zipCode', 'country', 'phone', 'billingMatch', 'billingFirstName', 'billingLastName', 'billingAddress', 'billingApt', 'billingCity', 'billingState', 'billingZipCode', 'billingCountry', 'billingPhone', 'email', 'cardName', 'cardNumber', 'cardExpiry', 'cardCvv', 'oneUseOnly']
        })
        .fromFile(filepath)
        .then((jsonObj) => {
            var finaljson = [];
            for (var i = 0; i < jsonObj.length; i++) {
                var fullname = jsonObj[i]["billingFirstName"] + " " + jsonObj[i]["billingLastName"];
                var creditCardType = require('credit-card-type');
                var carNum = jsonObj[i]["cardNumber"];
                var numString = carNum.toString();
                var cards = creditCardType(numString);
                var cards = (cards[0].type);
                
                let randlet = randomstring.generate({
                    length: 4,
                    charset: 'alphabetic'
                });
                let randnum = randomstring.generate({
                    length: 4,
                    charset: 'numeric'
                });
                var id = `${randlet}${randnum}`;


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
                var json = jsonObj[i];
                if (jsonObj[i]["billingMatch"] == "y" || jsonObj[i]["billingMatch"] == "yes" || jsonObj[i]["billingMatch"] == "true") {
                    jsonObj[i]["billingMatch"] = false;
                } else {
                    jsonObj[i]["billingMatch"] = true;
                }

                if (jsonObj[i]["oneUseOnly"] == "y" || jsonObj[i]["oneUseOnly"] == "yes" || jsonObj[i]["oneUseOnly"] == "true") {
                    var oneUseOnly = true;
                } else {
                    var oneUseOnly = false;
                }
                
                var exp = jsonObj[i]["cardExpiry"].split("/");
                var exp_year = exp[1];
                var exp_month = exp[0];
                var cardsp = `${exp_month} / ${exp_year}`
                

                var billing = {
                    address1: jsonObj[i]["billingAddress"],
                    address2: jsonObj[i]["billingApt"],
                    city: jsonObj[i]["billingCity"],
                    country: jsonObj[i]["billingCountry"],
                    firstName: jsonObj[i]["billingFirstName"],
                    lastName: jsonObj[i]["billingLastName"],
                    phone: jsonObj[i]["phone"],
                    state: states.getStateNameByStateCode(jsonObj[i]["billingState"]),
                    zipcode: ("00000" + jsonObj[i]["billingZipCode"]).substr(-5, 5),
                };

                var card = {
                    code: newCVV,
                    expire: cardsp,
                    name: fullname,
                    number: jsonObj[i]["cardNumber"]
                };

                var shipping = {
                    address1: jsonObj[i]["address"],
                    address2: jsonObj[i]["apt"],
                    city: jsonObj[i]["city"],
                    country: jsonObj[i]["country"],
                    firstName: jsonObj[i]["firstName"],
                    lastName: jsonObj[i]["lastName"],
                    phone: jsonObj[i]["phone"],
                    state: states.getStateNameByStateCode(jsonObj[i]["state"]),
                    zipcode: ("00000" + jsonObj[i]["zipCode"]).substr(-5, 5)
                };

                var pro = {
                    billing: billing,
                    card: card,
                    email: jsonObj[i]["email"],
                    id: id,
                    limit: oneUseOnly,
                    match: jsonObj[i]["billingMatch"],
                    shipping: shipping,
                    title: jsonObj[i]["profile"]
                
            };
                finaljson.push(JSON.stringify({
                    pro
                }, null, 2).slice(10, (JSON.stringify({
                    pro
                }, null, 2).length - 1)));
                }
                fs.writeFile(document.getElementById('file_save').files[0].path + '/pdProfiles.json', '[' + finaljson.slice(0, jsonObj.length + 1) + ']', 'utf8');
        })
};
window.pdConv = pdConv;