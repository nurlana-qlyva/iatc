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

// haqqimizda sehifesi ucun

const aboutBranch = ref(db, '/iatc/about/main');

$('#aboutMainBtn').on('click', function(e){
    e.preventDefault();

    var aboutHeader = $('#about-header').val();
    var aboutText = $('#about-text').val();
    var aboutİmage = $('#about-image').val();

    var aboutMainArr = push(aboutBranch);

    set(aboutMainArr, {
        about_header: aboutHeader,
        about_text: aboutText,
        about_image: aboutİmage,
    });
});

onValue(aboutBranch, function(banner){
    var objBanner = banner.val();
    
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){
        var headerTd = document.getElementById('header');
        var textTd = document.getElementById('text');
        var imageTd = document.getElementById('image');
        var edit = document.getElementById('edit');
        var tdcount = document.getElementById('count');

        headerTd.innerHTML = value.about_header;
        textTd.innerHTML = value.about_text;
        imageTd.innerHTML = value.about_image;

        count++;
        tdcount.innerHTML = count;

        headerTd.dataset.key = key;
        textTd.dataset.key = key;
        
        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/about/main/' + this.dataset.key));
        }
    }
})