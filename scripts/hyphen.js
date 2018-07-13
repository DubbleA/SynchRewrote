const prompt = require('prompt');
var jigged = [];
prompt.start();

// Get two properties
console.log('What is your line 1 address');
prompt.get(['ad1', 'number'], (err, result) => {
    if (err) return console.log(err.message);

    // Log the results.
    console.log('Command-line input received:');
    console.log('  ad1: ' + result.ad1);
    console.log('  number: ' + result.number);

    var ad1 = (result.ad1);
    const num = (result.number);

    var leng = ad1.length

    for (let i = 1; i < num; i++) {
        if (!(i >= leng)) {
            if (ad1.charAt(i - 1) != ' ' && ad1.charAt(i) != ' ') {
                var start = ad1.substr(0, i);
                var end = ad1.substr(i);
                var new_str = start + "-" + end;
                for (let j = i + 2; j < num + 2; j += 2) {
                    if (!(j + 1 >= leng * 2)) {
                        if (new_str.charAt(j - 1) != ' ' && new_str.charAt(j) != ' ') {
                            start = new_str.substr(0, j);
                            end = new_str.substr(j);
                            new_str = start + "-" + end;
                            if (jigged.length != num) {
                                jigged.push(new_str.replace(/\-+$/g, ''));
                            } else {
                                break;
                            }
                        }
                    }
                }

            }
        }
    }
console.log(jigged);
});