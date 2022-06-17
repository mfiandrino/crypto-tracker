const coinsUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'

async function getCoinList() {
    try {
        const response = await fetch(coinsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch(error) {
        console.error(`Could not get the coins: ${error}`);
    }
}

const jsonPromise = getCoinList();
jsonPromise.then((json) => console.log(json[0]));


const listaDesplegable = document.querySelector('#coin-select');

jsonPromise.then((json) => {
    for(let i in json) {
        addOption(listaDesplegable, json[i].id, json[i].name);
    }
});

function addOption(select,value,text) {
    const newOption = document.createElement('option');
    newOption.setAttribute('value',value);
    newOption.text = text

    select.appendChild(newOption);
}

