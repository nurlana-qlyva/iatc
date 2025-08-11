import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove, get} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYErBQaHHxypzk6StbhxxS39jFUlHRRT8",
  authDomain: "iatc-1434a.firebaseapp.com",
  databaseURL: "https://iatc-1434a-default-rtdb.firebaseio.com",
  projectId: "iatc-1434a",
  storageBucket: "iatc-1434a.firebasestorage.app",
  messagingSenderId: "72320637329",
  appId: "1:72320637329:web:a867397b9d35734a1d6230",
  measurementId: "G-D1F49VM4VW"
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

            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'You are logged in!',
                showConfirmButton: false,
            })

            window.setTimeout(function() {
                window.location.href = './admin.html';
            }, 2000);

            // location.replace("./admin.html");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // alert('errorMessage');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your email or password is wrong!',
            })
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

        window.location.assign("./login.html");

    }).catch((error) => {
        // An error happened.
        alert('error');
    });
});