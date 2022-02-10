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
    // for(let [key,image] of Object.entries(objBanner)){
    //         const div = $("<div>");
    //         console.log(image)
    //         div.html(`
    //             <img src="${image.banner_image}" alt="banner">
    //             <div class="more-btn">
    //             <a href="#">Ətraflı
    //                     <i class="fa fa-solid fa-arrow-right"></i>
    //                 </a>
    //             </div>
    //         `);
    //         div.attr('class', 'banner-img');
    //         $('.banner-view').append(div);
    // }
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

const homeAccountBranch = ref(db, '/iatc/home/accounts');

$('#iatcAccountBtn').on('click', function(e){
    e.preventDefault();
    
    var iatcFbAccount = $('#iatc-fb-url').val();
    var iatcTwitterAccount = $('#iatc-twitter-url').val();
    var iatcLinkedinAccount = $('#iatc-linkedin-url').val();
    var iatcInstagramAccount = $('#iatc-instagram-url').val();

    var iatcAccountArr = push(homeAccountBranch);

    set(iatcAccountArr, {
        iatcFbAccountUrl: iatcFbAccount,
        iatcTwitterAccountUrl: iatcTwitterAccount,
        iatcLinkedinAccountUrl: iatcLinkedinAccount,
        iatcInstagramAccountUrl: iatcInstagramAccount,
    });
});

onValue(homeAccountBranch, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#fb-list');
    ul.innerHTML = '';

    for(let [key,account] of Object.entries(objBanner)){
        var tr = document.createElement('tr');

        var fbTd = document.createElement('td');
        var twitterTd = document.createElement('td');
        var linkedinTd = document.createElement('td');
        var instagramTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        fbTd.innerHTML = value.iatcFbAccountUrl;
        twitterTd.innerHTML = value.iatcTwitterAccountUrl;
        linkedinTd.innerHTML = value.iatcLinkedinAccountUrl;
        instagramTd.innerHTML = value.iatcInstagramAccountUrl;


        count++;
        tdcount.innerHTML = count;

        nameTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(fbTd);
        tr.append(twitterTd);
        tr.append(linkedinTd);
        tr.append(instagramTd);
        tr.append(edit);

        $("#push-inner").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/members/' + this.dataset.key));
        };
    }
})
