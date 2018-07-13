function gen(domain, number) {

    const randomstring = require('randomstring');
    var newemails = [];

    console.log('input everything after the "@" symbol in your domain');
    console.log('Command-line input received:');
    console.log('  domain: ' + domain);
    console.log('  number: ' + number);

    const dom = (domain);
    const num = (number);

    for (let i = 0; i < num; i++) {
        let randstr = randomstring.generate({
            length: 11,
            charset: 'alphanumeric'
        });
        var email = `${randstr}@${dom}`;
        newemails.push(email);
        console.log(email);
    }
    
    document.getElementById("console_box").value = newemails;
}