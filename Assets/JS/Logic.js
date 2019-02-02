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

   $("#sign-in-button").on("click", function() {
     $("#sign-in-page").css("display", "none");
   });