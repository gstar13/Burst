$(document).ready(function() {
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

  // Firebase database reference set into a variable.
  var database = firebase.database();

  //Get Elements
  var btnLogin = $("#sign-in-button");
  var btnSignUp = $("#sign-up-button");
  var btnLogout = $("#sign-out-button");

  //Add login Event
  btnLogin.click(e => {
    //Get email and pass
    var email = $("#email-input")
      .val()
      .trim();
    var pass = $("#password-input")
      .val()
      .trim();

    console.log(pass, "is the pw");
    console.log(email, "is the email");

    var auth = firebase.auth();

    //Sign In
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

    $("#sign-in-button").on("click", function() {
      if (email && pass) {
        console.log("this is the email inside the if statement: ", email);
        $("#sign-in-page").css("display", "none");
        $("#burst-home-page").css("display", "inherit");
      } else {
        return;
      }
    });
  });

  //Add Sign Up event
  btnSignUp.click(e => {
    //Get email and pass
    var email = $("#email-input")
      .val()
      .trim();
    var pass = $("#password-input")
      .val()
      .trim();
    $("#feed-page").css("display", "inherit");
    console.log(pass, "is the pw");
    console.log(email, "is the email");

    var auth = firebase.auth();

    //Sign In
    const promise = auth.createUserWithEmailAndPassword(email, pass);

    promise.catch(e => console.log(e.message));

    $("#sign-in-button").on("click", function() {
      if (email && pass) {
        $("#sign-in-page").css("display", "none");
        $("#burst-home-page").css("display", "inherit");
      } else {
        return;
      }
    });
  });

  //create a logout event
  btnLogout.click(e => {
    console.log("hello");
    firebase.auth().signOut();
    $("#email-input").val("");
    $("#password-input").val("");
    $("#burst-page").css("display", "none");
    $("#burst-section").empty();
  });

  //Add a real time listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      var email = $("#email-input")
        .val()
        .trim();
      console.log(firebaseUser);
      console.log("logged in");

      $("#sign-in-page").css("display", "none");
      $("#burst-home-page").css("display", "inherit");
      $("#user-name").text(email);
      database.ref("users/");
    } else {
      console.log("not logged in");

      $("#sign-in-page").css("display", "inherit");
      $("#burst-home-page").css("display", "none");
      $("#burst-page").css("display", "none");
    }
  });
  // --------------------------------------------------------------------
  //Location getter
  // --------------------------------------------------------------------
  $.getJSON("https://ipapi.co/json/", function (data) {
        var ipaddress = data.ip;
        console.log (ipaddress);
        city = data.city;
        var state=data.region;
        var country=data.country;
        console.log (city);
        console.log (state);
        console.log (country);
    });





  // --------------------------------------------------------------------
  // --------------------------------------------------------------------

  // ----------------------------------------
  // Global variables
  // ----------------------------------------\
  var paintingURL;
  var city;
  // ----------------------------------------
  // Jquery Event Handlers
  // ----------------------------------------
  $("#to-home").on("click", function() {
    $("#feed-page").css("display", "inherit");
    $("#burst-page").css("display", "none");
  });

  $("#create-burst-btn").on("click", function() {
    $("#feed-page").css("display", "none");
    $("#burst-page").css("display", "inherit");
    renderPainting();
  });

  $("#create-burst-btn2").on("click", function() {
    $("#title-input").val("");
    $("#text-area-input").val("");
    $("#feed-page").css("display", "none");
    $("#burst-page").css("display", "inherit");
    renderPainting();
  });

  $("#post-button").on("click", function() {
    $("#burst-btn-container").css("display", "inherit");
    $("#feed-page").css("display", "inherit");
    $("#call-to-action").css("display", "none");
    $("#burst-page").css("display", "none");
    $("#burst-section").css("display", "inherit");
    var userTitle = $("#title-input")
      .val()
      .trim();
    var userComment = $("#text-area-input")
      .val()
      .trim();
    $div = $("<div>");
    $div.addClass("post-container", "post-separation");
    $img = $("<img>");
    $img.addClass("img-in-post");
    $img.attr("src", paintingURL);
    $div1 = $("<div>");
    $div1.addClass("flex-container-column-in-post");
    $div2 = $("<div>");
    $div2.addClass("title-post-container");
    $h3Title = $("<h3>");
    $h3Title.addClass("post-title");
    $h3Title.text(userTitle);
    $h3Location = $("<h3>");
    $h3Location.addClass("post-location");
    $h3Location.text(city);
    $div3 = $("<div>");
    $pText = $("<p>");
    $pText.addClass("post-comment");
    $pText.text(userComment);

    // ---------------------------------
    $div.append($img);
    $div.append($div1);

    $div1.append($div2);
    $div1.append($div3);

    $div2.append($h3Title);
    $div2.append($h3Location);

    $div3.append($pText);

    // ----------------------------------
    
    $("#burst-section").append($div);
  });

  // ----------------------------------------
  // Function Grounds
  // ----------------------------------------

  function renderPainting() {
    var paintings = [
      "SK-C-216",
      "SK-A-4717",
      "SK-A-3089",
      "SK-A-2257",
      "SK-A-1796",
      "SK-A-1299",
      "SK-A-4908",
      "SK-A-1355",
      "SK-A-4844",
      "SK-C-177",
      "SK-C-301",
      "sk-c-5"
    ];

    var rand = paintings[Math.floor(Math.random() * paintings.length)];

    var queryURL =
      "https://www.rijksmuseum.nl/api/en/collection/" +
      rand +
      "?key=CAoioqgR&format=json";

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      paintingURL = response.artObject.webImage.url;
      // var paintingName = response.artObject.titles[0];
      // var paintingDate = response.artObject.dating.presentingDate;
      // var paintingArtist = response.artObject.principalMaker;
      console.log(paintingURL);
      $("#art-piece").attr("src", paintingURL);
      // $("#painting-title").append("Title: " + paintingName + "");
      // $("#artist-name").append("Artist: " + paintingArtist + "");
      // $("#painting-date").append("Date: " + paintingDate);
    });
  }

  function getObjectNumbers() {}
});
