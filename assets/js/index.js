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

//Home page

// banner sekiller ucun

var homeBannerBranch = ref(db, '/iatc/home/banner');

$('#bannerBtn').on('click', function(e){
    e.preventDefault();
    var bannerİmage = $('#banner-image').val();

    var bannerBranch = push(homeBannerBranch);

    set(bannerBranch, {banner_image: bannerİmage});
});

onValue(homeBannerBranch, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#banner-image-list');
    ul.innerHTML = '';

    for(let [key,image] of Object.entries(objBanner)){
        var li = document.createElement('li');
        li.innerHTML = image.banner_image;
        li.classList.add('list-style');
        li.dataset.key = key;
        var deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');
        li.append(deleteList);
        ul.append(li);
        ul.classList.add('banner-image-list')

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/home/banner/' + this.dataset.key));
        }
    }
})

//terefdas sirketlerin logosu ucun

const homePartnersBranch = ref(db, '/iatc/home/partnership/');

$('#partnershipBtn').on('click', function(e){
    e.preventDefault();
    var partnershipİmage = $('#home-partnership-image').val();

    var partnerBranch = push(homePartnersBranch);

    set(partnerBranch, {partnership_image: partnershipİmage});
});

onValue(homePartnersBranch, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#partner-image-list');
    ul.innerHTML = '';

    for(let [key,image] of Object.entries(objBanner)){
        var li = document.createElement('li');
        li.innerHTML = image.partnership_image;
        li.classList.add('list-style');
        li.dataset.key = key;
        var deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');
        li.append(deleteList);
        ul.append(li);
        ul.classList.add('banner-image-list')

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/home/partnership/' + this.dataset.key));
        }
    }
})

//merkezin sosial sebeke accountlari ucun linkler

const homeAccountBranch1 = ref(db, '/iatc/home/accounts/fb');
const homeAccountBranch2 = ref(db, '/iatc/home/accounts/twitter');
const homeAccountBranch3 = ref(db, '/iatc/home/accounts/linkedin');
const homeAccountBranch4 = ref(db, '/iatc/home/accounts/instagram');

// facebook account

$('#iatcAccountBtn1').on('click', function(e){
    e.preventDefault();
    var iatcFbAccount = $('#iatc-fb-url').val();

    var iatcAccountArr = push(homeAccountBranch1);

    set(iatcAccountArr, {
        iatcFbAccountUrl: iatcFbAccount,
    });
});

onValue(homeAccountBranch1, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#fb-list');
    ul.innerHTML = '';

    for(let [key,account] of Object.entries(objBanner)){
        var li = document.createElement('li');
        li.innerHTML = account.iatcFbAccountUrl;
        li.classList.add('list-style');
        li.dataset.key = key;
        var deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');
        li.append(deleteList);
        ul.append(li);
        ul.classList.add('banner-image-list');

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/home/accounts/fb/' + this.dataset.key));
        }
        console.log(account.iatcFbAccountUrl)
    }
})

// twitter account

$('#iatcAccountBtn2').on('click', function(e){
    e.preventDefault();
    var iatcTwitterAccount = $('#iatc-twitter-url').val();

    var iatcAccountArr = push(homeAccountBranch2);

    set(iatcAccountArr, {
        iatcTwitterAccountUrl: iatcTwitterAccount,
    });
});

onValue(homeAccountBranch2, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#twitter-list');
    ul.innerHTML = '';

    for(let [key,account] of Object.entries(objBanner)){
        var li = document.createElement('li');
        li.innerHTML = account.iatcTwitterAccountUrl;
        li.classList.add('list-style');
        li.dataset.key = key;
        var deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');
        li.append(deleteList);
        ul.append(li);
        ul.classList.add('banner-image-list');

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/home/accounts/twitter/' + this.dataset.key));
        }
    }
})

// linkedin account

$('#iatcAccountBtn3').on('click', function(e){
    e.preventDefault();
    var iatcLinkedinAccount = $('#iatc-linkedin-url').val();

    var iatcAccountArr = push(homeAccountBranch3);

    set(iatcAccountArr, {
        iatcLinkedinAccountUrl: iatcLinkedinAccount,
    });
});

onValue(homeAccountBranch3, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#linkedin-list');
    ul.innerHTML = '';

    for(let [key,account] of Object.entries(objBanner)){
        var li = document.createElement('li');
        li.innerHTML = account.iatcLinkedinAccountUrl;
        li.classList.add('list-style');
        li.dataset.key = key;
        var deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');
        li.append(deleteList);
        ul.append(li);
        ul.classList.add('banner-image-list');

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/home/accounts/linkedin/' + this.dataset.key));
        }
    }
});

// instagram account

$('#iatcAccountBtn4').on('click', function(e){
    e.preventDefault();
    var iatcInstagramAccount = $('#iatc-instagram-url').val();

    var iatcAccountArr = push(homeAccountBranch4);

    set(iatcAccountArr, {
        iatcInstagramAccountUrl: iatcInstagramAccount,
    });
});

onValue(homeAccountBranch4, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#instagram-list');
    ul.innerHTML = '';

    for(let [key, account] of Object.entries(objBanner)){
        var li = document.createElement('li');
        li.innerHTML = account.iatcInstagramAccountUrl;
        li.classList.add('list-style');
        li.dataset.key = key;
        var deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');
        li.append(deleteList);
        ul.append(li);
        ul.classList.add('banner-image-list');

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/home/accounts/instagram/' + this.dataset.key));
        }
    }
});