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

const contactBranch = ref(db, '/iatc/contact');

$('#contactBtn').on('click', function(e){
    e.preventDefault();

    var contactAddress = $('#contact-address').val();
    var emailAddress = $('#contact-email').val();
    var phoneNumber = $('#contact-phone').val();

    var contactArr = push(contactBranch);

    set(contactArr, {
        contact_address: contactAddress,
        email_address: emailAddress,
        phone_number: phoneNumber,
    });
});

onValue(contactBranch, function(banner){
    var objBanner = banner.val();
    
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){
        var tr = document.createElement('tr');

        var addressTd = document.createElement('td');
        var emailTd = document.createElement('td');
        var phoneTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        addressTd.innerHTML = value.contact_address;
        emailTd.innerHTML = value.email_address;
        phoneTd.innerHTML = value.phone_number;

        count++;
        tdcount.innerHTML = count;

        addressTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(addressTd);
        tr.append(emailTd);
        tr.append(phoneTd);
        tr.append(edit);

        $("#push-inner").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/contact/' + this.dataset.key));
        }
    }

    for( let [key, value] of Object.entries(objBanner)){
        var div = $("<div>");

        div.html(`
                <div class="col-12 col-md-9 col-lg-5">
                    <div class="d-flex justify-content-around contact-inner">
                        <i class="fa-solid fa-house-chimney"></i>
                        <div>
                            <h4>Ünvan:</h4>
                            <p>${value.contact_address}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="d-flex justify-content-around contact-inner">
                        <i class="fa-solid fa-envelope"></i>
                        <div>
                            <h4>E-Mail:</h4>
                            <p>${value.email_address}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="d-flex justify-content-around contact-inner">
                        <i class="fa-solid fa-mobile-screen-button"></i>
                        <div>
                            <h4>Telefon:</h4>
                            <p>${value.phone_number}</p>
                        </div>
                    </div>
                </div>
        `)

        div.attr('class', 'row contact');

        $(".contact-section").append(div);
    }
});
