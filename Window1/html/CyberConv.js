function CyberConv() {
const filepath = document.getElementById('file_input_file').files[0].path;
var fs = require('fs');
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
            var exp = jsonObj[i]["cardExpiry"].split("/");
            var exp_year = "20" + exp[1];
            var exp_month = exp[0];
            var cardjson = {
                name: fullname,
                number: jsonObj[i]["cardNumber"],
                exp_month: exp_month,
                exp_year: exp_year,
                cvv: newCVV
            };
            var payment = {
                email: jsonObj[i]["email"],
                phone: jsonObj[i]["phone"],
                card: cardjson
            };
            var delivery = {
                first_name: jsonObj[i]["firstName"],
                last_name: jsonObj[i]["lastName"],
                addr1: jsonObj[i]["address"],
                addr2: jsonObj[i]["apt"],
                zip: ("00000" + jsonObj[i]["zipCode"]).substr(-5, 5),
                city: jsonObj[i]["city"],
                country: jsonObj[i]["country"],
                state: states.getStateNameByStateCode(jsonObj[i]["state"])
            };
            if (jsonObj[i]["billingMatch"] == "y" || jsonObj[i]["billingMatch"] == "yes" || jsonObj[i]["billingMatch"] == "true") {
                jsonObj[i]["billingMatch"] = false;
            } else {
                jsonObj[i]["billingMatch"] = true;
            }
            var billing = {
                first_name: jsonObj[i]["billingFirstName"],
                last_name: jsonObj[i]["billingLastName"],
                addr1: jsonObj[i]["billingAddress"],
                addr2: jsonObj[i]["billingApt"],
                zip: ("00000" + jsonObj[i]["billingZipCode"]).substr(-5, 5),
                city: jsonObj[i]["billingCity"],
                country: jsonObj[i]["billingCountry"],
                state: states.getStateNameByStateCode(jsonObj[i]["billingState"]),
                same_as_del: jsonObj[i]["billingMatch"]
            };
            if (jsonObj[i]["oneUseOnly"] == "y" || jsonObj[i]["oneUseOnly"] == "yes" || jsonObj[i]["oneUseOnly"] == "true") {
                var oneUseOnly = true;
            } else {
                var oneUseOnly = false;
            }

            var profToWrite = {
                name: jsonObj[i]["profile"],
                payment: payment,
                delivery: delivery,
                billing: billing,
                one_checkout: oneUseOnly
            };
            finaljson.push(JSON.stringify({
                [jsonObj[i]["profile"]]: profToWrite
            }, null, 2).slice(1, (JSON.stringify({
                [jsonObj[i]["profile"]]: profToWrite
            }, null, 2).length - 1)));
        }
        fs.writeFile('CyberProfiles.json', '{' + finaljson.slice(0, jsonObj.length + 1) + '}', 'utf8');
    })};

window.CyberConv = CyberConv;
  