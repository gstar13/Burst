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

   $("#sign-in-button").on("click", function() {
     $("#sign-in-page").css("display", "none");
   });

  
    
    

    //Get Elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    //Add login Event
    btnLogin.addEventListener('click', e => {
        //Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    //Add Sign Up event
    btnSignUp.addEventListener('click', e => {
        //Get email and pass
        //TODO: check for real email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise
            .catch(e => console.log(e.message));
    });
    //create a logout event
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    })
    //Add a realitime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            console.log("logged in");
            btnLogout.classList.remove('hide');
        } else {
            console.log('not logged in');
        }
    })
  })