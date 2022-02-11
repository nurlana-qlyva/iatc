import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove, get} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

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
export { getFirestore };

// elaqe sehifesindeki melumarin daxil edilmesi ucun

const registerBranch = ref(db, '/iatc/register');

$('#registerBtn').on('click', function(e){
    e.preventDefault();

    var programName = $('#program-name').val();
    var userName = $('#user-name').val();
    var phoneNumber = $('#phone-number').val();
    var emailAddress = $('#email-address').val();
    var aboutUser = $('#about-user').val();

    var registerArr = push(registerBranch);

    set(registerArr, {
        program_name: programName,
        user_name: userName,
        phone_number: phoneNumber,
        email_address: emailAddress,
        about_user: aboutUser,
    });
});

onValue(registerBranch, function(snapshot){
    var objBanner = snapshot.val();
    
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){
        var tr = document.createElement('tr');

        var programTd = document.createElement('td');
        var userTd = document.createElement('td');
        var phoneTd = document.createElement('td');
        var emailTd = document.createElement('td');
        var aboutTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        programTd.innerHTML = value.program_name;
        userTd.innerHTML = value.user_name;
        emailTd.innerHTML = value.email_address;
        phoneTd.innerHTML = value.phone_number;
        aboutTd.innerHTML = value.about_user;

        count++;
        tdcount.innerHTML = count;

        userTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(programTd);
        tr.append(userTd);
        tr.append(emailTd);
        tr.append(phoneTd);
        tr.append(aboutTd);
        tr.append(edit);

        $("#push-inner").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/contact/' + this.dataset.key));
        }
    }
});
