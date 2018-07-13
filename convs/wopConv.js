function wopconv() {
const filepath = 'TestDashe.csv'
const fs = require('fs');
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
            var json = jsonObj[i];
            var exp = jsonObj[i]["cardExpiry"].split("/");
            var exp_year = exp[1];
            var exp_month = exp[0];
            if (jsonObj[i]["oneUseOnly"] == "y" || jsonObj[i]["oneUseOnly"] == "yes" || jsonObj[i]["oneUseOnly"] == "true") {
                var oneUseOnly = true;
            } else {
                var oneUseOnly = false;
            }
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
            
            if (jsonObj[i]["billingMatch"] == "y" || jsonObj[i]["billingMatch"] == "yes" || jsonObj[i]["billingMatch"] == "true") {
                jsonObj[i]["billingMatch"] = false;
            } else {
                jsonObj[i]["billingMatch"] = true;
            }
            var paypal = false;
        
            var wop = {
                profileName: jsonObj[i]["profile"],
                firstName: jsonObj[i]["firstName"],
                lastName: jsonObj[i]["lastName"],
                address: jsonObj[i]["address"],
                address2: jsonObj[i]["apt"],
                city: jsonObj[i]["city"],
                state: jsonObj[i]["state"],
                zipcode: jsonObj[i]["zipCode"],
                country: jsonObj[i]["country"],
                email: jsonObj[i]["email"],
                phone: jsonObj[i]["phone"],
                cardNumber: jsonObj[i]["cardNumber"],
                cardCVV: newCVV,
                cardExpMonth: exp_month,
                cardExpYear: exp_year,
                oneCheckout: oneUseOnly,
                altShipping: jsonObj[i]["billingMatch"],
                shipfirstName: jsonObj[i]["billingFirstName"],
                shiplastName: jsonObj[i]["billingLastName"],
                shipaddress: jsonObj[i]["billingAddress"],
                shipaddress2: jsonObj[i]["billingApt"],
                shipcity: jsonObj[i]["billingCity"],
                shipstate: jsonObj[i]["billingState"],
                shipzipcode: jsonObj[i]["billingZipCode"],
                shipcountry: jsonObj[i]["billingCountry"],
                shipphone: jsonObj[i]["billingPhone"],
                paypalCheckout: paypal
            };
            
            finaljson.push(JSON.stringify({
                wop
            }, null, 2).slice(10, (JSON.stringify({
                wop
            }, null, 2).length - 1)));
        }
        fs.writeFile('WopProfiles.json', '[' + finaljson.slice(0, jsonObj.length + 1) + ']', 'utf8');
    });

};

wopconv();