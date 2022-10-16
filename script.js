const number = document.querySelector("#number")
const done = document.querySelector("#done")
const keyWaiting = document.querySelector("#key-waiting")
const keyDialog = document.querySelector("#key-dialog")
const keyResult = document.querySelector("#key-result")

const apiUrlBody = "https://hq-keyserver.netlify.app/api"
const product = window.location.hash.substring(1)

let count = 30;
setInterval(() => {
    number.innerHTML = count
    count--;

    if(count <= 0) {
        done.style.display = "block"
    }
}, 1000);

let key;
//fetch("https://hq-keyserver.netlify.app/api?action=generate")

async function generateKey() {
    if(product == "") return

    keyWaiting.showModal()
    const f = await fetch(`${apiUrlBody}?action=generate&product=${product}`)
    const json = await f.json()

    key = json.result
    keyResult.innerHTML = key

    keyWaiting.close()
    keyDialog.showModal()
}

function copyKey() {
    navigator.clipboard.writeText(key)
}
