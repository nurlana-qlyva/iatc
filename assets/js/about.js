import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove, get} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
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
    
    var tbody = document.querySelector("#push-inner");
    tbody.innerHTML = '';
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){
        var tr = document.createElement('tr');

        var headerTd = document.createElement('td');
        var textTd = document.createElement('td');
        var imageTd = document.createElement('td');
        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        headerTd.innerHTML = value.about_header;
        textTd.innerHTML = value.about_text;
        imageTd.innerHTML = value.about_image;

        count++;
        tdcount.innerHTML = count;

        headerTd.dataset.key = key;
        
        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(tdcount);
        tr.append(headerTd);
        tr.append(textTd);
        tr.append(imageTd);
        tr.append(edit);

        tbody.append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/about/main/' + this.dataset.key));
        }

    }
})
onValue(aboutBranch, function(snapshot){
    var arr = snapshot.val();

    for(let [key,value] of Object.entries(arr)){
        var div = $("<div>");

        div.html(`
            <div class="container">
                <div class="row about">
                    <div class="col-12 col-lg-6">
                        <div class="about-ourcourse">
                            <h2>${value.about_header}</h2>
                            <div>${value.about_text}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="image-ourcourse">
                            <img src="${value.about_image}" alt="iatc">
                        </div>
                    </div>
                </div>
            </div>
        `)
        $(".about-page-section").append(div);
    }
})