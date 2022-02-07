import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYErBQaHHxypzk6StbhxxS39jFUlHRRT8",
  authDomain: "iatc-1434a.firebaseapp.com",
  databaseURL: "https://iatc-1434a-default-rtdb.firebaseio.com",
  projectId: "iatc-1434a",
  storageBucket: "iatc-1434a.appspot.com",
  messagingSenderId: "72320637329",
  appId: "1:72320637329:web:ff61126fda79621c1d6230",
  measurementId: "G-NN2Z8VWYVG"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export{ref, set, push, onValue, update, remove};
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

            window.location.replace("../admin.html");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('errorMessage');
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

        window.location.assign("./admin/adminLogin.html");

    }).catch((error) => {
        // An error happened.
        alert('error');
    });
})

//Home page

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

// About səhifəsindəki melumatlari daxil etmek üçün

const aboutMainBranch = ref(db, '/iatc/about/main');

$('#aboutMainBtn').on('click', function(e){
    e.preventDefault();
    var aboutText = $('#about-text').val();
    var aboutİmage = $('#about-image').val();

    var aboutMainArr = push(aboutMainBranch);

    set(aboutMainArr, {
        about_text: aboutText,
        about_image: aboutİmage,
    });
});

const aboutBranch = ref(db, '/iatc/about/section');

$('#aboutBtn').on('click', function(e){
    e.preventDefault();

    var memberName = $('#team-member').val();
    var memberProfession = $('#member-profession').val();
    var fbAccount = $('#fb-url').val();
    var twitterAccount = $('#twitter-url').val();
    var linkedinAccount = $('#linkedin-url').val();
    var instagramAccount = $('#instagram-url').val();

    var aboutArr = push(aboutBranch);

    set(aboutArr, {
        member_name: memberName,
        member_profession: memberProfession,
        fbAccountUrl: fbAccount,
        twitterAccountUrl: twitterAccount,
        linkedinAccountUrl: linkedinAccount,
        instagramAccountUrl: instagramAccount,
    });
});

//Kurslarimiz sehifesindeki melumatlarin daxil edilmesi ucun

const courseBranch = ref(db, '/iatc/course/main');

$('#courseBtn').on('click', function(e){
    e.preventDefault();

    var courseName = $('#course-name').val();
    var courseİmage = $('#course-image').val();
    var teacherName = $('#course-teacher').val();
    var courseTerm = $('#course-term').val();
    var courseStudentNumber = $('#course-student').val();
    var courseStudentSkill = $('#course-student-skill').val();
    var courseLanguage = $('#course-language').val();
    var courseTeacherExperience = $('#course-teacher-experience').val();

    var courseArr = push(courseBranch);

    set(courseArr, {
        course_name: courseName,
        course_image: courseİmage,
        teacher_name: teacherName,
        course_term: courseTerm,
        student_number: courseStudentNumber,
        student_skill: courseStudentSkill,
        course_language:courseLanguage,
        course_teacher_experience: courseTeacherExperience,
    });
});

const courseAboutBranch = ref(db, '/iatc/course/about');

$('#courseAboutBtn').on('click', function(e){
    e.preventDefault();

    var courseAboutText = $('#course-about-text').val();
    var courseParticipant = $('#course-participant').val();
    var courseProgram = $('#course-program').val();
    var courseSkill = $('#course-skill').val();

    var courseAboutArr = push(courseAboutBranch);

    set(courseAboutArr, {
        course_about_text: courseAboutText,
        course_participant: courseParticipant,
        course_program: courseProgram,
        course_skill: courseSkill,
    });
});

//Tedbirlerimiz sehifesindeki melumatlarin daxil edilmesi ucun

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

//Elaqe sehifesindeki melumatlarin daxil edilmesi ucun

const contactBranch = ref(db, '/iatc/contact');

$('#contactBtn').on('click', function(e){
    e.preventDefault();

    var contactAddress = $('#contact-address').val();
    var emailAddress = $('#contact-email').val();
    var phoneNUmber = $('#contact-phone').val();

    var contactArr = push(contactBranch);

    set(contactArr, {
        contact_address: contactAddress,
        email_address: emailAddress,
        phone_number: phoneNUmber,
    });
});