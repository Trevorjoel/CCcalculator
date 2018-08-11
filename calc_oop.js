
// Model Controller

let cryptoModel = (function () {

let Currency;
let ourData;
let newCurrency={};
    let url = 'https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/bitcoin';
   function getAPIData(url) {
        // Return a new promise.
        return new Promise(function(resolve, reject) {
            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = function() {
                // This is called even on 404 etc
                // so check the status
                if (req.status == 200) {
                    // Resolve the promise with the response text
                    resolve(req.response);
                }
                else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(req.statusText));
                }
            };

            // Handle network errors
            req.onerror = function() {
                reject(Error("Network Error"));
            };

            // Make the request
            req.send();
        });
    }
    getAPIData(url).then(function(response) {
        console.log("Then A!");
        ourData = JSON.parse(response);

            Currency = function (ourData) {
                this.id = ourData[0].id;
                this.name = ourData[0].name;
                this.percent_change_1h = ourData[0].percent_change_1h;
                this.percent_change_24h = ourData[0].percent_change_24h;
                this.percent_change_7d = ourData[0].percent_change_7d;
                this.price_usd = ourData[0].price_usd;

            };

    }, function(error) {
        console.error("Failed!", error);
    }).then(function (newCurrency){
        console.log("Then B");
        return {
            newCurrency : new Currency(ourData)

        }

    }).then(function (newCurrency) {
        console.log(newCurrency)
    })

    console.log("Outside the promise");
    console.log(newCurrency);
})(cryptoUI);

//console.log("Outside the module", getAPIData.newCurrency)


let cryptoController = (function (cryptMdl, cryptUI) {


    // controller code
    let bitCoin = document.getElementById("bitcoin");
    bitCoin.addEventListener('click', function () {
        //url = url + 'bitcoin';

        bitCoin.classList.add("hide-me");
        console.log('Button clicked');

    });
})(cryptoModel, cryptoUI);

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

