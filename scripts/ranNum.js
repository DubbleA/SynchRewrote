const prompt = require('prompt');
var randomMobile = require('random-mobile');
var ranNum = [];

prompt.start();
console.log('how many phone numbers do you want to generate?');
prompt.get(['number'], (err, result) => {
    if (err) return console.log(err.message);
    console.log('Command-line input received:');
    console.log('  number: ' + result.number);
    const num = (result.number);

    for (let i = 0; i < num; i++) {
        let randnum = randomMobile();
        ranNum.push(randnum);
        console.log(randnum);
    }
    
});