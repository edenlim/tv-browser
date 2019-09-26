// API Docs at:
// http://www.tvmaze.com/api
console.log("Working JS");
var title;
var image;
var summary;
var first = true;

var doSubmit = function(event){
    var shows = searchbar.value;
    var search = `http://api.tvmaze.com/search/shows?q=${shows}`
    var request = new XMLHttpRequest();
    request.open("GET", search);
    var respondHandler = function(){
        console.log("response text", this.responseText);
        response = JSON.parse( this.responseText );
        console.log( response );
        var arrLength = response.length;
        console.log(`spinner lenght: ${spinner.length}`);
        var lengthOfSpinner = spinner.length;
        for (var i = 0; i < lengthOfSpinner; i++){
            spinner.remove(0);
        }
        for(var i = 0; i < arrLength; i++){
            // var spinner = document.querySelector("#show-select");
            var option = document.createElement("option");
            option.id = i;
            option.text = response[i]["show"]["name"];
            console.log(`${response[i]["show"]["name"]}`);
            spinner.add(option);
        }
    }
    var requestFailed = function(){
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    }
    request.addEventListener("load", respondHandler);
    request.addEventListener("error",requestFailed);
    request.send();
}

var doShow = function(event){
    if(first){
        var id = spinner[spinner.selectedIndex].id;
        title = document.createElement("h1");
        image = document.createElement("img");
        summary = document.createElement("p");
        image.src = response[`${id}`]["show"]["image"]["medium"];
        title.innerHTML = response[`${id}`]["show"]["name"];
        summary.innerHTML = response[`${id}`]["show"]["summary"];
        document.body.appendChild(title);
        document.body.appendChild(image);
        document.body.appendChild(summary);
        first = false;
    } else {
        var id = spinner[spinner.selectedIndex].id;
        image.src = response[`${id}`]["show"]["image"]["medium"];
        title.innerHTML = response[`${id}`]["show"]["name"];
        summary.innerHTML = response[`${id}`]["show"]["summary"];
    }
}

var body = document.body;
var searchbar = document.querySelector("#show-search");
var submit = document.querySelector("#submit");
var spinner = document.querySelector("#show-select");
spinner.addEventListener("change", doShow)
submit.addEventListener("click",doSubmit);