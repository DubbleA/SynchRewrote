function prefix() {
const randomstring = require('randomstring');
var prefx = [];
    const addyl1 = (document.getElementById('userInput1').value);
    const num = (document.getElementById('userInput2').value);

    for (let i = 0; i < num; i++) {
        // makes random 11 digit string
        let randstr = randomstring.generate({
            length: 4,
            charset: 'alphabetic'
        });
        let pre = `${randstr} ${addyl1}`;
        prefx.push(pre);
    }

    document.getElementById('placeholderText1').innerHTML = '';
    document.getElementById("genLine1").value = prefx.join('\n');
}

window.prefix = prefix;