function eveConv() {
const filepath = 'TestDashe.csv'
const fs = require('fs');
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
            var json = jsonObj[i];
            var fullname = jsonObj[i]["billingFirstName"] + " " + jsonObj[i]["billingLastName"];
            var exp = jsonObj[i]["cardExpiry"].split("/");
            var exp_year = "20" + exp[1];
            var exp_month = exp[0];
            if (jsonObj[i]["oneUseOnly"] == "y" || jsonObj[i]["oneUseOnly"] == "yes" || jsonObj[i]["oneUseOnly"] == "true") {
                var oneUseOnly = true;
            } else {
                var oneUseOnly = false;
            }

            if (jsonObj[i]["billingMatch"] == "y" || jsonObj[i]["billingMatch"] == "yes" || jsonObj[i]["billingMatch"] == "true") {
                jsonObj[i]["billingMatch"] = true;
            } else {
                jsonObj[i]["billingMatch"] = false;
            }
            // detects card
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
            
            
            var prof = jsonObj[i]["profile"];
            var profString = prof.toString();
            
            var bzip = ("00000" + jsonObj[i]["zipCode"]).substr(-5, 5);
            var bzipString = bzip.toString();

            var szip = ("00000" + jsonObj[i]["billingZipCode"]).substr(-5, 5);
            var szipString = szip.toString();

            var pho = jsonObj[i]["phone"];
            var phoString = pho.toString();

            var bpho = jsonObj[i]["billingPhone"];
            var bphoString = bpho.toString();

            var newCVVString = newCVV.toString();


            var eve = {
                ProfileName: profString,
                BillingFirstName: jsonObj[i]["firstName"],
                BillingLastName: jsonObj[i]["lastName"],
                BillingAddressLine1: jsonObj[i]["address"],
                BillingAddressLine2: jsonObj[i]["apt"],
                BillingCity: jsonObj[i]["city"],
                BillingState: jsonObj[i]["state"],
                BillingCountryCode: "US",
                BillingZip: bzipString,
                BillingPhone: phoString,
                BillingEmail: jsonObj[i]["email"],
                ShippingFirstName: jsonObj[i]["billingFirstName"],
                ShippingLastName: jsonObj[i]["billingLastName"],
                ShippingAddressLine1: jsonObj[i]["billingAddress"],
                ShippingAddressLine2: jsonObj[i]["billingApt"],
                ShippingCity: jsonObj[i]["billingCity"],
                ShippingState: jsonObj[i]["billingState"],
                ShippingCountryCode: "US",
                ShippingZip: szipString,
                ShippingPhone: bphoString,
                ShippingEmail: jsonObj[i]["email"],
                NameOnCard: fullname,
                CreditCardNumber: numString,
                ExpirationMonth: exp_month,
                ExpirationYear: exp_year,
                Cvv: newCVVString,
                CardType: carddata,
                OneCheckoutPerWebsite: oneUseOnly,
                SameBillingShipping: jsonObj[i]["billingMatch"],
                BirthDay: "1",
                BirthMonth: "1",
                BirthYear: "1980"
            };
            
            finaljson.push(JSON.stringify({
                eve
            }, null, 2).slice(10, (JSON.stringify({
                eve
            }, null, 2).length - 1)));
        }
        fs.writeFile('EveProfiles.json', '[' + finaljson.slice(0, jsonObj.length + 1) + ']', 'utf8');
    });
};

eveConv();