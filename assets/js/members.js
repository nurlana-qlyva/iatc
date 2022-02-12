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

// komanda uzvleri

const memberBranch = ref(db, '/iatc/members');

$('#aboutMemebersBtn').on('click', function(e){
    e.preventDefault();

    var memberName = $('#team-member').val();
    var memberProfession = $('#member-profession').val();
    var memberImage = $('#member-image').val();
    var fbAccount = $('#iatc-fb-url').val();
    var twitterAccount = $('#iatc-twitter-url').val();
    var linkedinAccount = $('#iatc-linkedin-url').val();
    var instagramAccount = $('#iatc-instagram-url').val();

    var aboutArr = push(memberBranch);
 
    set(aboutArr, {
        member_name: memberName,
        member_profession: memberProfession,
        member_image: memberImage,
        fbAccountUrl: fbAccount,
        twitterAccountUrl: twitterAccount,
        linkedinAccountUrl: linkedinAccount,
        instagramAccountUrl: instagramAccount,
    });
});

onValue(memberBranch, function(banner){
    var objBanner = banner.val();
    
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){
        var tr = document.createElement('tr');

        var nameTd = document.createElement('td');
        var professionTd = document.createElement('td');
        var imageTd = document.createElement('td');
        var fbTd = document.createElement('td');
        var twitterTd = document.createElement('td');
        var linkedinTd = document.createElement('td');
        var instagramTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        nameTd.innerHTML = value.member_name;
        professionTd.innerHTML = value.member_profession;
        imageTd.innerHTML = value.member_image;
        fbTd.innerHTML = value.fbAccountUrl;
        twitterTd.innerHTML = value.twitterAccountUrl;
        linkedinTd.innerHTML = value.linkedinAccountUrl;
        instagramTd.innerHTML = value.instagramAccountUrl;

        count++;
        tdcount.innerHTML = count;

        nameTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(nameTd);
        tr.append(professionTd);
        tr.append(imageTd);
        tr.append(fbTd);
        tr.append(twitterTd);
        tr.append(linkedinTd);
        tr.append(instagramTd);
        tr.append(edit);

        $("#push-inner").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/members/' + this.dataset.key));
        }
    }
})
onValue(memberBranch, function (snapshot) {
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();

        var div = $("<div>");

        div.html(`
            <div class="member-image">
                <img src="${childData.member_image}" alt="course">
            </div>
            <div class="about-member">
                <h4><a href="#">${childData.member_name}</a></h4>
                <p>${childData.member_profession}</p>
                <ul>
                    <li>
                        <a href="${childData.fbAccountUrl}">
                            <i class="fa fa-brands fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="${childData.twitterAccountUrl}">
                            <i class="fa fa-brands fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="${childData.linkedinAccountUrl}">
                            <i class="fa fa-brands fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
        `);

        div.attr('class', 'members');

        $(".member-slider").append(div);
    });

    $('.member-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 3,
        accessibility: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
    })
}, {
    onlyOnce: true
})