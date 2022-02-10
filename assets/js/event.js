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

// tedbirlerimiz sehifesindeki melumarin daxil edilmesi ucun

const eventsBranch = ref(db, '/iatc/events');

$('#eventBtn').on('click', function(e){
    e.preventDefault();

    var eventImage = $('#event-image').val();
    var eventHeader = $('#event-header').val();
    var eventText = $('#event-text').val();

    var eventArr = push(eventsBranch);

    set(eventArr, {
        event_image: eventImage,
        event_header: eventHeader,
        event_text: eventText,
    });
});

onValue(eventsBranch, function(banner){
    var objBanner = banner.val();
    
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){
        var tr = document.createElement('tr');

        var headerTd = document.createElement('td');
        var textTd = document.createElement('td');
        var imageTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        headerTd.innerHTML = value.event_header;
        textTd.innerHTML = value.event_text;
        imageTd.innerHTML = value.event_image;

        count++;
        tdcount.innerHTML = count;

        headerTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(headerTd);
        tr.append(textTd);
        tr.append(imageTd);
        tr.append(edit);

        $("#push-inner").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/events/' + this.dataset.key));
        }
    }

    for(let [key, value] of Object.entries(objBanner)){
        const div = $("<div>");
            div.html(`
                <div class="news-card">
                    <a href="#">
                        <div class="body-card">
                            <div class="image-card">
                                <img src="${value.event_image}" class="card-img-top" alt="">
                            </div>
                            <div class="header-card">
                                <h4>${value.event_header}</h5>
                            </div>
                        </div>
                    </a>
                </div>
    `       );
            div.attr('class', 'col-md-4');
            $('.data').append(div);
    }
})