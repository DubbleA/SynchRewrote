function kiconv() {
    const filepath = document.getElementById('file_input_file').files[0].path;
    const fs = require('fs');
    var states = require('us-state-codes');
    const csv = require('csvtojson');

    function kiconv1() {
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

                    var kic = {
                        ProfileName: profString,
                        BillingFirst: jsonObj[i]["firstName"],
                        BillingLast: jsonObj[i]["lastName"],
                        BillingPhone: phoString,
                        rfs: false,
                        rls: false,
                        rpn: false,
                        pnjo: "",
                        psjo: "",
                        BillingStreet1: jsonObj[i]["address"],
                        BillingStreet2: jsonObj[i]["apt"],
                        a3jo: "",
                        BillingCity: jsonObj[i]["city"],
                        BillingState: jsonObj[i]["state"],
                        BillingCountry: jsonObj[i]["country"],
                        BillingZip: bzipString,
                        Ctype: carddata,
                        CardNumber: numString,
                        cardCvv: newCVVString,
                        ExpiryMonth: exp_month,
                        ExpiryYear: exp_year,
                        aja: false
                    };


                    finaljson.push(JSON.stringify({
                        kic
                    }, null, 2).slice(10, (JSON.stringify({
                        kic
                    }, null, 2).length - 1)));
                }
                fs.writeFile(document.getElementById('file_save').files[0].path + '/kicTemp.json', '[' + finaljson.slice(0, jsonObj.length + 1) + ']', 'utf8');
            })

    };

    function kiconv2() {
        const Json2csvParser = require('json2csv').Parser;
        const fs = require('fs');
        const myJson = require(document.getElementById('file_save').files[0].path + '/kicTemp.json')

        const fields = [{
            label: "profile name",
            value: "ProfileName"
        }, {
            label: "first name",
            value: "BillingFirst"
        }, {
            label: "last name",
            value: "BillingLast"
        }, {
            label: "phone number",
            value: "BillingPhone"
        }, {
            label: "random first name",
            value: "rfs"
        }, {
            label: "random last name",
            value: "rls"
        }, {
            label: "random phone number",
            value: "rpn"
        }, {
            label: "phonetic name (japan only)",
            value: "pnjo"
        }, {
            label: "phonetic surname (japan only)",
            value: "psjo"
        }, {
            label: "address 1",
            value: "BillingStreet1"
        }, {
            label: "address 2",
            value: "BillingStreet2"
        }, {
            label: "address 3 (japan only)",
            value: "a3jo",
        }, {
            label: "city",
            value: "BillingCity"
        }, {
            label: "state",
            value: "BillingState"
        }, {
            label: "country",
            value: "BillingCountry"
        }, {
            label: "postal",
            value: "BillingZip"
        }, {
            label: "card type",
            value: "Ctype"
        }, {
            label: "card number",
            value: "CardNumber"
        }, {
            label: "card security code",
            value: "cardCvv"
        }, {
            label: "expire month",
            value: "ExpiryMonth"
        }, {
            label: "expire year",
            value: "ExpiryYear"
        }, {
            label: "automatically jig address",
            value: "aja"
        }];
        const delimiter = fields.length;
        header = false;
        const json2csvParser = new Json2csvParser({
            fields,
            quote: '',
            delimiter: ','
        });
        const csv = json2csvParser.parse(myJson);
        fs.writeFile(document.getElementById('file_save').files[0].path + '/kicProfiles.csv', csv, 'utf8');
        fs.unlink(document.getElementById('file_save').files[0].path + "/kicTemp.json");
    };

    kiconv1();
    setTimeout(kiconv2, 1500);
};

window.kiconv = kiconv;