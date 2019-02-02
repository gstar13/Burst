
$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDgIKRNjqoDiYu9sEu1qHn7cm_ANv2Fkhw",
        authDoain: "burst-bef24.firebaseapp.com",
        databaseURL: "https://burst-bef24.firebaseio.com",
        projectId: "burst-bef24",
        storageBucket: "burst-bef24.appspot.com",
        messagingSenderId: "987925212265"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    //Get Elements
    var btnLogin = $("#sign-in-button");
    var btnSignUp = $('#sign-up-button');
    var btnLogout = $("#sign-out-button");

   



    //Add login Event
    btnLogin.click(e => {
        //Get email and pass
        var email = $("#email-input").val().trim();
        var pass = $("#password-input").val().trim();
        console.log(pass , "is the pw");
        console.log(email, "is the email");
        var auth = firebase.auth();
        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

        $("#sign-in-button").on("click", function () {
            if (email && pass){ 
            $("#sign-in-page").css("display", "none");
            $("#burst-home-page").css("display", "inherit");
            }
            else {
                return;
            }
        });

    });
    //Add Sign Up event
    btnSignUp.click(e => {
        //Get email and pass
        //TODO: check for real email
        var email = $("#email-input").val().trim();
        var pass = $("#password-input").val().trim();
        console.log(pass , "is the pw");
        console.log(email, "is the email");
        var auth = firebase.auth();
        //Sign In
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise
            .catch(e => console.log(e.message));
    });



    //create a logout event
    btnLogout.click(e => {
        console.log('hello');
        firebase.auth().signOut();
        $("#email-input").val("");
        $("#password-input").val("");
    })
    //Add a realitime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            console.log("logged in");
            $("#sign-in-page").css("display", "none");
            $("#burst-home-page").css("display", "inherit");
        } else {
            console.log('not logged in');
            $("#sign-in-page").css("display", "inherit");
            $("#burst-home-page").css("display", "none");
            
        }
    })













//put the paintings onto the page
$("#start").on("click", function () {
    renderPainting();

})

function renderPainting() {
    var paintings = ["SK-C-216", "SK-A-4717", "SK-A-3089", "SK-A-2257", "SK-A-1796", "SK-A-1299", "SK-A-4908", "SK-A-1355", "SK-A-4844", "SK-C-177",
        "SK-C-301", "sk-c-5"];
    var rand = paintings[Math.floor(Math.random() * paintings.length)];
    var queryURL = "https://www.rijksmuseum.nl/api/en/collection/" + rand + "?key=CAoioqgR&format=json";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var $painting = $("<img>");
        $painting.addClass("contemplate");
        var $titlediv = $("<div>");
        $titlediv.addClass("details");
        var paintingURL = response.artObject.webImage.url;
        var paintingName = response.artObject.titles[0];
        var paintingDate = response.artObject.dating.presentingDate;
        var paintingArtist = response.artObject.principalMaker;
        console.log(paintingURL);
        $painting.attr("src", paintingURL);
        $("#adds").append($painting);
        $("#painting-title").append("Title: " + paintingName + "");
        $("#artist-name").append("Artist: " + paintingArtist + "");
        $("#painting-date").append("Date: " + paintingDate);
    })
}
function getObjectNumbers (){
    
}

})


