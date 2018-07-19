const prompt = require('prompt');
const randomstring = require('randomstring');
var prefx = [];
prompt.start();

// Get two properties
console.log('Input your line one address and how many prefix jigged addresses you want to generate');
prompt.get(['addyl1', 'number'], (err, result) => {
    if (err) return console.log(err.message);

    // Log the results.
    console.log('Command-line input received:');
    console.log('  addyl1: ' + result.addyl1);
    console.log('  number: ' + result.number);

    const addyl1 = (result.addyl1);
    const num = (result.number);

    for (let i = 0; i < num; i++) {
        // makes random 11 digit string
        let randstr = randomstring.generate({
            length: 4,
            charset: 'alphabetic'
        });
        let pre = `${randstr} ${addyl1}`;
        prefx.push(pre);
        console.log(pre);
    }
});