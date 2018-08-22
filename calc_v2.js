
/*
I want to create this app using the advanced concepts I have learned. I want to use IIFE's
to keep the data in modules to avoid leaking data to the global scope and pass only the essential data
to the other modules.
Just imagine that I was working in a team or I wanted to scale up the project, maybe it's a part of a larger application like a
crypto currency wallet(not usually made with JS, but just imagine), perhaps it will be connected to a database
and has a login and keeps and displays historical data of the user.
So I build it like this and wish to learn these skills.

Considerations:
I have renamed the files calc_v1 for the beginner version and calc_v2 for the one I am working on now
The calc_v2 will function as the calc_v1.js (that was calcjs.js) There should be icons that will call the function to call the API
with the modified URL for the particular coin.
The stage it's in now is to test the API call to make sure I'm getting the data.

What should this code do NOW?:
1) This code should call the API
2) When the XML request returns it is dealt with by promises and passed to the first .then()
   to have the JSON parsed.
3) The second .then() creates the object. The 3rd .then() is probably not required.
4) Now I wish to pass this object with the currency data to the controller and UI modules.

Let's Run the code with some console messages:
So on page load the function cryptoModel() runs as it is an IIFE. Then the getAPIData() function is defined, ran and
begins the promise. While this is happening the code outside runs.
So anything defined using the data will return undefined or an error.
console.log(newCurrency); returns a blank object.
After the XML request returns it runs all .then()
and gives us our object.

What is next?:
I will try to use the click event to call the API. Looking at the budget_time app (on github app.js file) the event listeners
will be in the controller module(cryptoController). Because this budget app does not have an API call, I don't know if the promise
should be in the Model or controller.
The first question I have is, Should the API call be in the controller and then pass the object to the model to have calculations done?
Would a database query be done in Model or controller in MVC architecture?
I'm going to try to connect the API call to a click event, try to learn where it should be located.
Where I think I have trouble is passing data from the API to other modules because of the IIFE's and general architecture.
Objects may not be the best way to use this data because variables associated with objects refer to the place in memory where the object is stored.
In other words when I click a second currency the first currency might change to reflect the new API data. So somehow each object must be unique.
So it would be useful for you to understand the budget app to know how I am trying to write and what I am trying to learn.
https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/budgety-planning-guide.pdf
 */


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
                    console.log("XML request returned!");
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
    getAPIData(url)
        .then(function(response) {
        console.log("First .then() runs!");
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
        console.log("Second .then() creates the data object!");
        return {
            newCurrency : new Currency(ourData)

        }

    }).then(function (newCurrency) {
        console.log(newCurrency)
    })

    console.log("Outside the promise");
    console.log(newCurrency);
})();
console.log("Outside the MODULE");
 console.log(newCurrency);
//console.log("Outside the module", getAPIData.newCurrency)


let cryptoController = (function () {


    /*
    let bitCoin = document.getElementById("bitcoin");
    bitCoin.addEventListener('click', function () {
        //url = url + 'bitcoin';

        bitCoin.classList.add("hide-me");
        console.log('Button clicked');

    });
    /*
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

