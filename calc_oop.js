
// Model Controller

let cryptoModel = (function () {
    let Currency;
let ourData;

function getAPIData(){
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = 'https://api.coinmarketcap.com/v1/ticker/bitcoin';

        return new Promise(function(resolve, reject) {
            // Do request
            var ourRequest = new XMLHttpRequest();
            ourRequest.open('GET', proxyurl + url);

            ourRequest.onload = function() {
                resolve(ourRequest.responseText);

                ourData = JSON.parse(ourRequest.responseText);
                console.log('Promise fulfilled');

            }
            ourRequest.onerror = function () {
                console.log('Promise rejected');
                reject(ourRequest.responseText);
            }

            ourRequest.send();

        });

    }

    // Construct objects from API data

    getAPIData()
        .then(function () {

            Currency = function (ourData) {
                this.id = ourData[0].id;
                this.name = ourData[0].name;
                this.percent_change_1h = ourData[0].percent_change_1h;
                this.percent_change_24h = ourData[0].percent_change_24h;
                this.percent_change_7d = ourData[0].percent_change_7d;
                this.price_usd = ourData[0].price_usd;

            };

            let newCurrency = new Currency(ourData);
            console.log(newCurrency);
            return newCurrency;
        }

)
   .catch()

    let x = 22;
    let add = function (a) {
        return x + a;
    }


    console.log(newCurrency);
})();

console.log(newCurrency);
let cryptoController = (function () {
    // controller code
})();

let cryptoUI = (function () {
    // UI code
})();


// This code is an attempt to practice concepts from lessons I took on, MVC, iifes, promises, function constructors
// and other advanced JS. The expected behaviour will be triggered from a click that should query the API,
// create a new object with the function constructor containing the data to pass to the UI and control module.
// The confusion is in returning or accessing variable "ourData" or the new function constructed object "newCurrency"
// from "getAPIData" function scope, so far I need it inside the model

// View Controller


// Control controller

