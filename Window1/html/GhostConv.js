function ghconv() {
    const filepath = document.getElementById('file_input_file').files[0].path;
    const fs = require('fs');
    var states = require('us-state-codes');
    const csv = require('csvtojson');

    function ghconv1() {
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
                        jsonObj[i]["billingMatch"] = true;
                    } else {
                        jsonObj[i]["billingMatch"] = false;
                    }
    
                    var gho = {
                        ProfileName: profString,
                        BillingFirst: jsonObj[i]["firstName"],
                        BillingLast: jsonObj[i]["lastName"],
                        BillingStreet1: jsonObj[i]["address"],
                        BillingStreet2: jsonObj[i]["apt"],
                        BillingCity: jsonObj[i]["city"],
                        BillingState: jsonObj[i]["state"],
                        BillingZip: bzipString,
                        ShippingStreet1: jsonObj[i]["billingAddress"],
                        ShippingStreet2: jsonObj[i]["billingApt"],
                        ShippingCity: jsonObj[i]["billingCity"],
                        ShippingState: jsonObj[i]["billingState"],
                        ShippingZip: szipString,
                        BillingCountry: jsonObj[i]["country"],
                        BillingPhone: phoString,
                        CardNumber: numString,
                        Ctype: carddata,
                        cardCvv: newCVVString,
                        ExpiryMonth: exp_month,
                        ExpiryYear: exp_year,
                        BS: jsonObj[i]["billingMatch"]
                    };

                    finaljson.push(JSON.stringify({
                        gho
                    }, null, 2).slice(10, (JSON.stringify({
                        gho
                    }, null, 2).length - 1)));
                }
                fs.writeFile(document.getElementById('file_save').files[0].path + '/ghoTemp.json', '[' + finaljson.slice(0, jsonObj.length + 1) + ']', 'utf8');
            })

    };

    function ghconv2() {
        const Json2csvParser = require('json2csv').Parser;
        const fs = require('fs');
        const myJson = require('./ghoTemp.json')

        const fields = [{
            label: "Profile Name",
            value: "ProfileName"
        }, {
            label: "First Name",
            value: "BillingFirst"
        }, {
            label: "Last Name",
            value: "BillingLast"
        }, {
            label: "Shipping Address",
            value: "BillingStreet1"
        }, {
            label: "Shipping Apt",
            value: "BillingStreet2"
        }, {
            label: "Shipping City",
            value: "BillingCity"
        }, {
            label: "Shipping State",
            value: "BillingState"
        }, {
            label: "Shipping Zip",
            value: "BillingZip"
        }, {
            label: "Billing Address",
            value: "ShippingStreet1"
        }, {
            label: "Billing Apt",
            value: "ShippingStreet2"
        }, {
            label: "Billing City",
            value: "ShippingCity"
        }, {
            label: "Billing State",
            value: "ShippingState",
        }, {
            label: "Billing Zip",
            value: "ShippingZip"
        }, {
            label: "Country",
            value: "BillingCountry"
        }, {
            label: "Phone",
            value: "BillingPhone"
        }, {
            label: "Card Number",
            value: "CardNumber"
        }, {
            label: "Card Type",
            value: "Ctype"
        }, {
            label: "CVV",
            value: "cardCvv"
        }, {
            label: "Expiry Month",
            value: "ExpiryMonth"
        }, {
            label: "Expiry Year",
            value: "ExpiryYear"
        }, {
            label: "Same B&S",
            value: "BS"
        }];
        const delimiter = fields.length;
        header = false;
        const json2csvParser = new Json2csvParser({
            fields,
            quote: '',
            delimiter: ','
        });
        const csv = json2csvParser.parse(myJson);
        fs.writeFile(document.getElementById('file_save').files[0].path + '/ghoProfiles.csv', csv, 'utf8');
        fs.unlink("./ghoTemp.json");
    };

    ghconv1();
    setTimeout(ghconv2, 1500);
};

window.ghconv = ghconv;