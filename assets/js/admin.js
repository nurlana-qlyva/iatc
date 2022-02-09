import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove, get} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA_gpkpE4lcPVf2qVJhfrrsnmfDsK_WEj4",
    authDomain: "israelwebsite-c76a9.firebaseapp.com",
    databaseURL: "https://israelwebsite-c76a9-default-rtdb.firebaseio.com",
    projectId: "israelwebsite-c76a9",
    storageBucket: "israelwebsite-c76a9.appspot.com",
    messagingSenderId: "471677978707",
    appId: "1:471677978707:web:a288d65ce26d2853809ea6",
    measurementId: "G-E5CMSTFBSE"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export{ref, set, push, onValue, update, remove, get};
export { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut};

// login admin

const auth = getAuth();

$("#signUp").on('click', function(e){
    e.preventDefault();

    var email = $("#email").val();
    var userName = $('#userName').val();
    var password = $("#password").val();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            
            set(ref(db, 'users/' + user.uid),{
                username: userName,
                email: email,
                password: password
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('errorMessage');
    });
})

$("#signInBtn").on('click', function(e){
      e.preventDefault();

        var email = $("#email").val();
        var password = $("#password").val();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const dt = new Date();

            update(ref(db, 'users/' + user.uid),{
                last_login: dt,
            })

            window.location.replace("../admin.html");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('errorMessage');
    });
})

const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
      // ...
    } else {
      // User is signed out
    }
});

$("#logout").on('click', function(){

    signOut(auth).then(() => {
        // Sign-out successful.

        window.location.assign("./admin/adminLogin.html");

    }).catch((error) => {
        // An error happened.
        alert('error');
    });
});