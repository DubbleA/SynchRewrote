function genNum(){
var randomMobile = require('random-mobile');
var ranNum = [];

    const num = (document.getElementById('numberToGen').value);

    for (let i = 0; i < num; i++) {
        let randnum = randomMobile();
        ranNum.push(randnum);
    }
    return ranNum.join('\n');
}
window.genNum = genNum