/* What's next?
    I haven't worked on it for a while. I just cleaned and commented the code. I need to go over it again.
    But what the app should do next, after listing the currencies and listing the movement over the given periods.
    The user enters the amount of each currency they own and click enter. A new row (under the currency) appears that displays the
    price in USD that they have lost/gained over the periods for that currency. They can do this for as many currencies as they like.
    At the bottom will be a totals row that will add each USD amount and show the user the total USD value lost or gained across all crypto-currencies entered.

*/
// Initialise variables
// Keep track of calls to call coin function (how many new nodes created)
var timesCalled = 0;

var oneHrArray = [];
var completeArray = [];

// Hack to add header to API response. I keep getting a CORS error due to no response. It's a public API
const proxyurl = "https://cors-anywhere.herokuapp.com/";
var url = 'https://api.coinmarketcap.com/v1/ticker/';

const addRow = document.getElementById('new_row');
var cryptoContainer = document.getElementById('crypto-container');
var valueInFiat ='';


// Currency icons
var bitCoin = document.getElementById("bitcoin");
bitCoin.addEventListener('click', function () {
url = url + 'bitcoin';
    callCoin();
    bitCoin.classList.add("hide-me");

});

var ethereum = document.getElementById("ethereum");
ethereum.addEventListener('click', function () {
    url = url + 'ethereum';
    callCoin();
    ethereum.classList.add("hide-me");
});

var litecoin = document.getElementById("litecoin");
litecoin.addEventListener('click', function () {
    url = url + 'litecoin';
    callCoin();
    litecoin.classList.add("hide-me");
});

var ripple = document.getElementById("ripple");
ripple.addEventListener('click', function () {
    url = url + 'ripple';
    callCoin();
    ripple.classList.add("hide-me");
});

// Get JSON, Render HTML (needs promises)
function callCoin(){

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);

    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);

        renderHTML(ourData);

       // createArray(ourData);
        changeRedGreen(ourData, timesCalled);

        url = ('https://api.coinmarketcap.com/v1/ticker/');
        timesCalled++;

    };
    ourRequest.send()

}
// Following function needs a more elegant solution, handlebars does not seem to have a way to render entire new HTML nodes
// there is new templating for ES6 using `` to encapsulate the string and ${variable} to insert vars
// Renders a new row
function renderHTML(data) {

    var htmlString = "";
    for(i = 0; i < data.length; i++){
        htmlString += "<tr id='row-id_"+ timesCalled +"'>" + "'<td class='box box-name'>"+ data[i].name +"<br /><img class='icons' src='./icons/" + data[i].id + ".png'></td>" +
            "<td class='box box-name'>" + data[i].price_usd +"</td>" +
            "<td id='percent_change_1h' class='box box-name percent_change_1h"+ timesCalled + "'>" + data[i].percent_change_1h +"</td>" +
            "<td id='percent_change_24h' class='box box-name percent_change_24h"+ timesCalled +"'>" + data[i].percent_change_24h +"</td>" +
            "<td id='percent_change_7d' class='box box-name percent_change_7d"+ timesCalled + "'>" + data[i].percent_change_7d +"</td>" +
            "<td class='input-amount'><input    type=\"text\" name=\"amount\" id='submit-amount'></td>" +
            "<td class='box box-name' ><form>\n" +
            "<input id='calculate1' type=\"button\" value=\"Enter\" onclick='calcTotalVal(completeArray)'>\n" +
            "</form></td></tr>";

    }

    addRow.insertAdjacentHTML('afterEnd',htmlString);

    return htmlString;


}

// Creates an array of all of the coins called.. Later to be used when calculating combined values.
function createArray(data) {
    for(i = 0; i < data.length; i++){
        // completeArray.push(data[0]);
        //console.log(completeArray);
       return completeArray;

    }

}

// Change response numbers to red or green if positive or negative int's
function changeRedGreen(data) {
// I was using data[i] below ?
    if (data[0].percent_change_24h[0] === "-") {

        var addRed = document.querySelectorAll(".percent_change_24h"+timesCalled);

        for (var ii = 0; ii < addRed.length; ii++) {
            var checkIfRed = document.querySelector('red');
            addRed[ii].classList.add('red');
        }

    } else {
        var addGreen = document.querySelectorAll(".percent_change_24h"+timesCalled);

        for (var ii = 0; ii < addGreen.length; ii++) {
            addGreen[ii].classList.add('green');
            var checkIfGreen = document.querySelector('green');
        }
    }

    if (data[0].percent_change_1h[0] === "-") {
        var addRed = document.querySelectorAll(".percent_change_1h"+timesCalled);

        for (var ii = 0; ii < addRed.length; ii++) {
            addRed[ii].classList.add('red');

        }

    } else {
        var addGreen = document.querySelectorAll(".percent_change_1h"+timesCalled);

        for (var ii = 0; ii < addGreen.length; ii++) {
            addGreen[ii].classList.add('green');
        }
    }
    if (data[0].percent_change_7d[0] === "-") {
        var addRed = document.querySelectorAll(".percent_change_7d"+timesCalled);

        for (var ii = 0; ii < addRed.length; ii++) {
            addRed[ii].classList.add('red');

        }

    } else {
        var addGreen = document.querySelectorAll(".percent_change_7d"+timesCalled);

        for (var ii = 0; ii < addGreen.length; ii++) {
            addGreen[ii].classList.add('green');
        }
    }
}

/* IGNORE THIS

   var valueInfiat = 0;
   var valueInCC = document.getElementById("submit-amount").value;
   //valueInFiat = valueInCC * completeArray.price;
   for (i = 0; valueInfiat.length; i++){
       console.log(data);
   }
*/

//header("Access-Control-Allow-Origin: *");
