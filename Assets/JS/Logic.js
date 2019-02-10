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

    $("#sign-up-button").on("click", function() {
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
    postCreated = false;
  });

  function displayPosts(snapshot) {
    var posts = snapshot.val() || {};
    var postsKeys = Object.keys(posts);

    if (postsKeys.length) {
      $("#call-to-action").css("display", "none");
      $("#burst-section").css("display", "inherit");
      $("#burst-section").append("#create-burst-btn2");
    } else {
      $("#call-to-action").css("display", "block");
      $("#burst-section").css("display", "none");
    }

    // show posts;
    
    for (var i = 0; i < postsKeys.length; i++) {
      addPostToPage(posts[postsKeys[i]]);
    }
  }

  function getUsername() {
    var email = currentUser.email;
    var username = email.split('@')[0].replace(/[!.=|\\?]/g, '');
    return username;
  }

  function onLogin(firebaseUser) {
    var email = firebaseUser.email;
    // making global for use everywhere :(
    currentUser = firebaseUser;
    var username = getUsername();
    $("#sign-in-page").css("display", "none");
    $("#burst-home-page").css("display", "inherit");
    $("#user-name").text(username);
    database.ref('/users/' + username).once('value').then(displayPosts);
  }

  function onLogout(){
    console.log("not logged in");
    $("#sign-in-page").css("display", "inherit");
    $("#burst-home-page").css("display", "none");
    $("#burst-page").css("display", "none");
  }

  //Add a real time listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    // var func = firebaseUser ? onLogin.bind(null, firebaseUser) : onLogout;
    // func();

    if (firebaseUser) {
      onLogin(firebaseUser);
    } else {
      onLogout();
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
  // ----------------------------------------
  // var email
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
    $("#title-input").val("");
    $("#text-area-input").val("");
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
    postCreated = true;
    var userTitle = $("#title-input")
      .val()
      .trim();
    var userComment = $("#text-area-input")
      .val()
      .trim();
    // ----------------------------------
    var newBurst = {
      newTitle: userTitle,
      newComment: userComment,
      newLocation: city,
      newPainting: paintingURL
    };

    // Invoking addPostToPage function.
    addPostToPage(newBurst);

    var username = getUsername();
    database.ref('/users/' + username).push(newBurst);
    // ----------------------------------
  });

  /// @TODO: MAYBE DELETE ME
  // database.ref().on("child_added", function(snapshot) {
    // var post = snapshot.val();
    // addPostToPage(post);
  // });

  // ----------------------------------------
  // Function Grounds
  // ----------------------------------------









  function addPostToPage(post) {
    var $div = $("<div>").addClass("post-container", "post-separation");
    var $img = $("<img>").addClass("img-in-post").attr("src", post.newPainting);
    var $div1 = $("<div>").addClass("flex-container-column-in-post");
    var $div2 = $("<div>").addClass("title-post-container");
    var $h3Title = $("<h3>").addClass("post-title").text(post.newTitle);
    var $h3Location = $("<h3>").addClass("post-location").text(post.newLocation);
    var $div3 = $("<div>");
    var $pText = $("<p>").addClass("post-comment").text(post.newComment);
    // ---------------------------------
    $div.append($img)
      .append($div1);

    $div1.append($div2)
      .append($div3);

    $div2.append($h3Title)
      .append($h3Location);
      

    $div3.append($pText);

    $("#burst-section").append($div);
  }

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
      "SK-C-109",
      "SK-C-1367",
      "SK-C-5",
      "SK-A-3262",
      "SK-A-3948",
      "SK-A-742",
      "SK-A-1115"
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
  };

});
