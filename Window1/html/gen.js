function gen(domain, number){
    const randomstring = require('randomstring');
    var newemails = [];
    const dom = (document.getElementById('domain').value);
    const num = (document.getElementById('numberToGen').value);

    for (let i = 0; i < num; i++) {
        let randstr = randomstring.generate({
            length: 11,
            charset: 'alphanumeric'
        });
        var email = `${randstr}@${dom}`;
        newemails.push(email);
    }
return newemails.join('\n');
}

window.gen = gen