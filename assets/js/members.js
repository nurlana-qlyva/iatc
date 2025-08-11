import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove, get} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

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
    
    var tbody = document.querySelector("#push-inner");
    tbody.innerHTML = '';
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

        tbody.append(tr);

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
            <a href="#">
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
            </a>
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
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
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