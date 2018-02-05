/*
// This is an object
var myCat ={
    "name":"meowsalot",
    "species":"cat",
    "favFood":"tuna"
};

// This is an array

//var myFavColours = ["blue","green", "red"];
//console.log(myFavColours[2]);

// This is an array of objects
// JASON is objects and arrays nested inside one another Javascript Object Notation
var thePets = [
    {
        "name": "meowsalot",
        "species": "cat",
        "favFood": "tuna"
    },
    {
        "name":"Barky",
        "species":"dog",
        "favFood":"rabbits"
    },
    {
        "name":"Floppy",
        "species":"rabbit",
        "favFood":"steak"
    }];
console.log(thePets[0]["favFood"]);

//  https://learnwebcode.github.io/json-example/animals-1.json
var pageCounter = 1;
var animalContainer = document.getElementById('animal-info');
var btn = document.getElementById("btn");
btn.addEventListener('click', function () {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET','https://learnwebcode.github.io/json-example/animals-'+ pageCounter +'.json');
    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);
        //console.log(ourData[0]);
        renderHTML(ourData);
    };
    ourRequest.send();
    pageCounter++;
    if (pageCounter > 3 ){
        btn.classList.add("hide-me");
        //document.querySelector('.btn').style.display = 'none';
    }
});

    function renderHTML(data) {
        var htmlString = "This is text";
        for(i = 0; i < data.length; i++){
            htmlString += "<p>" + data[i].name + "is a " + data[i].species + ".</p>";
        }
        animalContainer.insertAdjacentHTML('beforeend',htmlString);
    
};
*/



var newRows = '';
function gridLogic() {
    var elems = document.getElementsByClassName('catch-me');
    for (var i=0, max=elems.length; i < max; i++) {

        //console.log(max);
        if(max % 3 === 0){
            newRows = '</div><div class="row">';

        }else {
            newRows = "";
        };
        return newRows;
    }

}
gridLogic();
console.log(newRows);