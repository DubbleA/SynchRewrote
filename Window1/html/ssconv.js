function ssconv() {
const filepath = document.getElementById('file_input_file').files[0].path;
const fs = require('fs');
var states = require('us-state-codes');
const csv = require('csvtojson');

function ssconv1() {
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

                if (jsonObj[i]["billingMatch"] == "y" || jsonObj[i]["billingMatch"] == "yes" || jsonObj[i]["billingMatch"] == "true") {
                    jsonObj[i]["billingFirstName"] = "";
                    jsonObj[i]["billingLastName"] = "";
                    jsonObj[i]["billingAddress"] = "";
                    jsonObj[i]["billingApt"] = "";
                    jsonObj[i]["billingCity"] = "";
                    jsonObj[i]["billingState"] = "";
                    jsonObj[i]["billingZipCode"] = "";
                    jsonObj[i]["billingCountry"] = "";
                    jsonObj[i]["billingPhone"] = "";
                    jsonObj[i]["billingMatch"] = true;
                } else {
                    jsonObj[i]["billingMatch"] = false;
                }

                var sol = {
                    ProfileName: profString,
                    EmailAddress: jsonObj[i]["email"],
                    CardType: carddata,
                    CardNumber: numString,
                    cardCvv: newCVVString,
                    CardExpires: jsonObj[i]["cardExpiry"],
                    BillingCountry: jsonObj[i]["country"],
                    BillingPhone: phoString,
                    BillingFirst: jsonObj[i]["firstName"],
                    BillingLast: jsonObj[i]["lastName"],
                    BillingStreet1: jsonObj[i]["address"],
                    BillingStreet2: jsonObj[i]["apt"],
                    BillingZip: bzipString,
                    BillingCity: jsonObj[i]["city"],
                    BillingState: jsonObj[i]["state"],
                    ShippingCountry: jsonObj[i]["billingCountry"],
                    ShippingPhone: jsonObj[i]["billingPhone"],
                    ShippingFirst: jsonObj[i]["billingFirstName"],
                    ShippingLast: jsonObj[i]["billingLastName"],
                    ShippingStreet1: jsonObj[i]["billingAddress"],
                    ShippingStreet2: jsonObj[i]["billingApt"],
                    ShippingZip: jsonObj[i]["billingZipCode"],
                    ShippingCity: jsonObj[i]["billingCity"],
                    ShippingState: jsonObj[i]["billingState"]
                };


                finaljson.push(JSON.stringify({
                    sol
                }, null, 2).slice(10, (JSON.stringify({
                    sol
                }, null, 2).length - 1)));
            }
            fs.writeFile(document.getElementById('file_save').files[0].path + '/soleSlayerTemp.json', '[' + finaljson.slice(0, jsonObj.length + 1) + ']', 'utf8');
        })

};

function ssconv2() {
    const Json2csvParser = require('json2csv').Parser;
    const fs = require('fs');
    const myJson = require(document.getElementById('file_save').files[0].path + '/soleSlayerTemp.json')

    const fields = [{
        label: "Profile Name",
        value: "ProfileName"
    }, {
        label: "Email Address",
        value: "EmailAddress"
    }, {
        label: "Card Type",
        value: "CardType"
    }, {
        label: "Card Number",
        value: "CardNumber"
    }, {
        label: "Card CVV",
        value: "cardCvv"
    }, {
        label: "Card Expires",
        value: "CardExpires"
    }, {
        label: "Billing Country",
        value: "BillingCountry"
    }, {
        label: "Billing Phone",
        value: "BillingPhone"
    }, {
        label: "Billing First",
        value: "BillingFirst"
    }, {
        label: "Billing Last",
        value: "BillingLast"
    }, {
        label: "Billing Street 1",
        value: "BillingStreet1"
    }, {
        label: "Billing Street 2",
        value: "BillingStreet2",
    }, {
        label: "Billing Zip",
        value: "BillingZip"
    }, {
        label: "Billing City",
        value: "BillingCity"
    }, {
        label: "Billing State",
        value: "BillingState"
    }, {
        label: "Shipping Country",
        value: "ShippingCountry"
    }, {
        label: "Shipping Phone",
        value: "ShippingPhone"
    }, {
        label: "Shipping First",
        value: "ShippingFirst"
    }, {
        label: "Shipping Last",
        value: "ShippingLast"
    }, {
        label: "Shipping Street 1",
        value: "ShippingStreet1"
    }, {
        label: "Shipping Street 2",
        value: "ShippingStreet2"
    }, {
        label: "Shipping Zip",
        value: "ShippingZip"
    }, {
        label: "Shipping City",
        value: "ShippingCity"
    }, {
        label: "Shipping State",
        value: "ShippingState"
    }];
    const delimiter = fields.length;
    header = false;
    const json2csvParser = new Json2csvParser({
        fields,
        quote: '',
        delimiter: '\t'
    });
    const tsv = json2csvParser.parse(myJson);
    fs.writeFile(document.getElementById('file_save').files[0].path + '/soleSlayerProfiles.csv', tsv, 'utf8');
    fs.unlink(document.getElementById('file_save').files[0].path + "/soleSlayerTemp.json");
};

ssconv1();
setTimeout(ssconv2, 1500);
};

window.ssconv = ssconv;