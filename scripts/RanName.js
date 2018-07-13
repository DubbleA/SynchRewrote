const prompt = require('prompt');
var randomFullName = require('random-fullName');
var ranName = [];

prompt.start();
console.log('how many random names do you want to generate?');
prompt.get(['number'], (err, result) => {
    if (err) return console.log(err.message);
    console.log('Command-line input received:');
    console.log('  number: ' + result.number);
    const num = (result.number);

    for (let i = 0; i < num; i++) {
        let randomName = randomFullName();
        ranName.push(randomName);
        console.log(randomName);
    }

});