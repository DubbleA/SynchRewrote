function genName(){
	var randomFullName = require('random-fullName');
	var ranName = [];
	const num = (document.getElementById('numberToGen').value);

    for (let i = 0; i < num; i++) {
        let randomName = randomFullName();
        ranName.push(randomName);
    }
    return ranName.join('\n');
}

window.genName = genName