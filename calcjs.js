var priceArray =[];
var timesCalled = 0;
var url = ('https://api.coinmarketcap.com/v1/ticker/');
var cryptoContainer = document.getElementById('crypto-container');
var catchThing = document.getElementById('row_'+ timesCalled + '"');
var bitCoin = document.getElementById("bitcoin");
var valueInFiat ='';
var newRows = "";
var newRowEnd = "";
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


function callCoin(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);
    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);

        renderHTML(ourData);


        createArray(ourData);
        changeRedGreen(ourData, timesCalled);

        url = ('https://api.coinmarketcap.com/v1/ticker/');
        timesCalled++;
    };
    ourRequest.send()

}


function renderHTML(data) {


    var htmlString = "";
    for(i = 0; i < data.length; i++){
        htmlString += "<div id='' class='flex-dir-column catch-me box small-11 large-3 medium-5 columns'><div class='box box-name'><img class='icons' src='./icons/" + data[i].id + ".png'> </br>" + data[i].name + "<br> " +
            "" + data[i].price_usd + " USD</div><div class='box'> 1 hour : </div>" +
            "<div id='percent_change_1h' class='box percent_change_1h"+ timesCalled + "'>"
            + data[i].percent_change_1h + " % </div><div> 24 hours :</div> " +
            "<div id='percent_change_24h' class='box percent_change_24h"+ timesCalled + "'>"
            + data[i].percent_change_24h + " %</div><div> 7 days:</div> " +
            "<div id='percent_change_7d' class='box percent_change_7d"+ timesCalled + "'>"
            + data[i].percent_change_7d + " %</div> <form name='quantity' method='get'>\n" +

            "  <label class='box'>Enter the amount of " + data[i].name + " you own? :</label>" +
            "        <input type=\"text\" name=\"amount\" id='submit-amount'><br>\n" +
            "\n" +
            "        <input id='calculate1' type=\"button\" value=\"Submit\" onclick='calcTotalVal()'>\n" +
            "    </form></div>";


    }

    cryptoContainer.insertAdjacentHTML('afterbegin',htmlString);


    return htmlString;



}
/*
function addRows() {
    var elems = document.getElementsByClassName('catch-me');
    for (var i = 0, max=elems.length + 1; i < max; i++) {

        if(max % 3 === 0 || timesCalled === 0) {
            //console.log(max);

                var beginRow = '<div class="row" id="row_'+ timesCalled + '">';
                var endRow = '</div>';
                console.log('hit');
                var cunt = [beginRow,endRow];


            break;

        }else{

            console.log(max);
            console.log('miss');
            break;
        }

    }
   // return cunt;
}
*/

var oneHrArray = [];
var completeArray = [];

function createArray(data) {
    for(i = 0; i < data.length; i++){
        completeArray.push(data[0]);
        return completeArray;

    }

}
//Math for this again price of CC * price USD
function calcTotalVal(data){
    var valueInfiat = 0;
    var valueInCC = document.getElementById("submit-amount").value;
    //valueInFiat = valueInCC * completeArray.price;
    for (i = 0; valueInfiat.length; i++){
        console.log(data);
    }




}
function changeRedGreen(data) {

    if (data[i].percent_change_24h[0] === "-") {

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

    if (data[i].percent_change_1h[0] === "-") {
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
    if (data[i].percent_change_7d[0] === "-") {
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


//header("Access-Control-Allow-Origin: *");
