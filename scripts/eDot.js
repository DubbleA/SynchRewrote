const prompt = require('prompt');
var jiggedm = [];
prompt.start();

// Get two properties
console.log('What is your gmail address before the @');
prompt.get(['mail', 'number'], (err, result) => {
    if (err) return console.log(err.message);

    // Log the results.
    console.log('Command-line input received:');
    console.log('  mail: ' + result.mail);
    console.log('  number: ' + result.number);

    var mail = (result.mail);
    const num = (result.number);

    var leng = mail.length

    for (let i = 1; i < num; i++) {
        if (!(i >= leng)) {
            if (mail.charAt(i - 1) != ' ' && mail.charAt(i) != ' ') {
                var start = mail.substr(0, i);
                var end = mail.substr(i);
                var new_str = start + "." + end;
                for (let j = i + 2; j < num + 2; j += 2) {
                    if (!(j + 1 >= leng * 2)) {
                        if (new_str.charAt(j - 1) != ' ' && new_str.charAt(j) != ' ') {
                            start = new_str.substr(0, j);
                            end = new_str.substr(j);
                            new_str = start + "." + end;
                            if (jiggedm.length != num) {
                                var username = new_str.replace(/\.+$/g, '');
                                jiggedm.push(username + '@gmail.com');
                            } else {
                                break;
                            }
                        }
                    }
                }

            }
        }
    }
    console.log(jiggedm);
});