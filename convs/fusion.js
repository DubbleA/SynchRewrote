function fusconv() {
    const filepath = 'TestDashe.csv'
    const fs = require('fs');
    const csv = require('csvtojson');
    var states = require('us-state-codes');
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
                var bzip = ("00000" + jsonObj[i]["zipCode"]).substr(-5, 5);

                var szip = ("00000" + jsonObj[i]["billingZipCode"]).substr(-5, 5);
                var fullname = jsonObj[i]["firstName"] + " " + jsonObj[i]["lastName"];

                
                
                
                var shipaddy = {
                    firstName: jsonObj[i]["firstName"],
                    lastName: jsonObj[i]["lastName"],
                    address1: jsonObj[i]["address"],
                    address2: jsonObj[i]["apt"],
                    city: jsonObj[i]["city"],
                    state: states.getStateNameByStateCode(jsonObj[i]["state"]),
                    zipcode: ("00000" + jsonObj[i]["zipCode"]).substr(-5, 5),
                    country: jsonObj[i]["country"]
                }
                var baddy = {
                    firstName: jsonObj[i]["billingfirstName"],
                    lastName: jsonObj[i]["billinglastName"],
                    address1: jsonObj[i]["billingaddress"],
                    address2: jsonObj[i]["billingapt"],
                    city: jsonObj[i]["billingcity"],
                    state: states.getStateNameByStateCode(jsonObj[i]["billingState"]),
                    zipcode: ("00000" + jsonObj[i]["billingzipCode"]).substr(-5, 5),
                    country: jsonObj[i]["billingcountry"]
                }
                var pdeets = {
                    email: jsonObj[i]["email"],
                    phone: jsonObj[i]["phone"],
                    cardHolder: fullname,
                    cardNumber: jsonObj[i]["cardNumber"],
                    cvv: newCVV,
                    expMonth: exp_month,
                    expYear: exp_year
                }
                var pro = {
                        name: jsonObj[i]["profile"],
                        useOnce: oneUseOnly,
                        shippingAdress: shipaddy,
                        billingAddress: baddy,
                        paymentDetails: pdeets
                        };
                finaljson.push(JSON.stringify({
                    pro
                }, null, 2).slice(10, (JSON.stringify({
                    pro
                }, null, 2).length - 1)));
                }
            fs.writeFile('fusionProfiles.json', '{ "profiles": [' + finaljson.slice(0, jsonObj.length + 1) + ']}', 'utf8');
        });

};

fusconv();