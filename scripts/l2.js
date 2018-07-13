const prompt = require('prompt');
prompt.start();

// Get number of jigged l2s
function l2 () {
const randomstring = require('randomstring');
var l2s = [];
console.log('How many line 2 addys u want to make?');
prompt.get(['number'], (err, result) => {
    if (err) return console.log(err.message);

    // Log the results.
    console.log('Command-line input received:');
    console.log('  number: ' + result.number);
    
    const num = (result.number);

    for (let i = 0; i < num; i++) {
        // picks number between numbers 1-5
        var temp = (Math.random() *100) + 1;
        if (temp < 20) {
            // makes random 11 digit string
        let randstr = randomstring.generate({
            length: 4,
            charset: 'numeric'
        });
        let addys = `Room ${randstr}`;
        l2s.push(addys);
        console.log(addys);
        } else if (temp < 40) {
            let randstr = randomstring.generate({
                length: 3,
                charset: 'numeric'
            });
            let addys = `Apt ${randstr}`;
            l2s.push(addys);
            console.log(addys);
        } else if (temp < 50) {
            let randstr = randomstring.generate({
                length: 3,
                charset: 'numeric'
            });
            let addys = `Suite ${randstr}`;
            l2s.push(addys);
            console.log(addys);
        } else if (temp < 60) {
            let randstr = randomstring.generate({
                length: 3,
                charset: 'numeric'
            });
            let addys = `Ste ${randstr}`;
            l2s.push(addys);
            console.log(addys);
        }else if (temp < 80) {
            let randstr = randomstring.generate({
                length: 1,
                charset: 'alphabetic'
            });
            let addys = `Unit ${randstr}`;
            l2s.push(addys);
            console.log(addys);
        } else {
            let randstr = randomstring.generate({
                length: 1,
                charset: 'numeric'
            });
            let addys = `Floor ${randstr}`;
            l2s.push(addys);
            console.log(addys);
        }
        
    }

    document.getElementById("console_box").value = newl2s;
});
};
l2();