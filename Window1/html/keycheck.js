

function keycheck() {

const KEYGEN_ACCOUNT_ID = '55fd2307-f856-465c-b936-6c15d55e8fcf'
const KEYGEN_PRODUCT_ID = '441e6761-1e3e-44a4-8c49-8f25dd4133cc'
var key = document.getElementById('product_key').value


const fetch = require('node-fetch');
const res = fetch('https://api.keygen.sh/v1/accounts/55fd2307-f856-465c-b936-6c15d55e8fcf/licenses/actions/validate-key', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/vnd.api+json',
		'Accept': 'application/vnd.api+json'
	},
	body: JSON.stringify({
		meta: {
			scope: { product: KEYGEN_PRODUCT_ID },
			key: document.getElementById('product_key').value
		}
	})
})
.then(res => res.json())
.then(json => json.meta)
.then(meta => meta.valid)
.then(valid =>successfail(valid));


}
function successfail(valid) {
if (valid) {
	//go to window 1
	console.log("Key is valid!");
	location.replace("./Window1.html");
} else {
	console.log("oh fuck, it aint working")
	//show some sort of error message
}
}
window.keycheck = keycheck;