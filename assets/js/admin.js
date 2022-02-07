import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
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
export{ref, set, push, onValue, update};
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

$('#bannerBtn').on('click', function(e){
    e.preventDefault();
    var bannerİmage = $('#banner-image').val();

    var homeBannerBranch = push(ref(db, '/iatc/home/banner'));

    set(homeBannerBranch, {banner_image: bannerİmage});
});

onValue(homeBannerBranch, function(banner){
    var objBanner = banner.val();
    
    console.log(banner);

    var key = Object.keys(objBanner)
    console.log(key)

})

const homePartnersBranch = ref(db, '/iatc/home/partnership/');  // error

var partnershipİmage;
var partnerArr = [];

$('#partnershipBtn').on('click', function(){
    partnershipİmage = $('#home-partnership-image').val();

    partnerArr.push({
        partnership_image: partnershipİmage
    });

    set(homePartnersBranch, partnerArr);
});


const homeAccountBranch = ref(db, '/iatc/home/accounts');
var iatcAccountArr = [];

$('#iatcAccountBtn').on('click', function(){
    var iatcFbAccount = $('#iatc-fb-url').val();
    var iatcTwitterAccount = $('#iatc-twitter-url').val();
    var iatcLinkedinAccount = $('#iatc-linkedin-url').val();
    var iatcInstagramAccount = $('#iatc-instagram-url').val();

    iatcAccountArr.push({
        iatcFbAccountUrl: iatcFbAccount,
        iatcTwitterAccountUrl: iatcTwitterAccount,
        iatcLinkedinAccountUrl: iatcLinkedinAccount,
        iatcInstagramAccountUrl: iatcInstagramAccount,
    });

    set(homeAccountBranch, partnerArr);

});


// About səhifəsindəki melumatlari daxil etmek üçün

const aboutMainBranch = ref(db, '/iatc/about/main');
var aboutMainArr = [];

$('#aboutMainBtn').on('click', function(){
    var aboutText = $('#about-text').val();
    var aboutİmage = $('#about-image').val();

    aboutMainArr.push({
        about_text: aboutText,
        about_image: aboutİmage,
    })

    set(aboutMainBranch, aboutMainArr);
});

const aboutBranch = ref(db, '/iatc/about/section');
var aboutArr = [];

$('#aboutBtn').on('click', function(){
    var memberName = $('#team-member').val();
    var memberProfession = $('#member-profession').val();
    var fbAccount = $('#fb-url').val();
    var twitterAccount = $('#twitter-url').val();
    var linkedinAccount = $('#linkedin-url').val();
    var instagramAccount = $('#instagram-url').val();

    aboutArr.push({
        member_name: memberName,
        member_profession: memberProfession,
        fbAccountUrl: fbAccount,
        twitterAccountUrl: twitterAccount,
        linkedinAccountUrl: linkedinAccount,
        instagramAccountUrl: instagramAccount,
    })

    set(aboutBranch, aboutArr);
});

//Kurslarimiz sehifesindeki melumatlarin daxil edilmesi ucun

const courseBranch = ref(db, '/iatc/course/main');
var courseArr = [];

$('#courseBtn').on('click', function(){
    var courseName = $('#course-name').val();
    var courseİmage = $('#course-image').val();
    var teacherName = $('#course-teacher').val();
    var courseTerm = $('#course-term').val();
    var courseStudentNumber = $('#course-student').val();
    var courseStudentSkill = $('#course-student-skill').val();
    var courseLanguage = $('#course-language').val();
    var courseTeacherExperience = $('#course-teacher-experience').val();

    courseArr.push({
        course_name: courseName,
        course_image: courseİmage,
        teacher_name: teacherName,
        course_term: courseTerm,
        student_number: courseStudentNumber,
        student_skill: courseStudentSkill,
        course_language:courseLanguage,
        course_teacher_experience: courseTeacherExperience,
    })

    set(courseBranch, courseArr);
});

// onValue(courseBranch, function(snapshot){
//     var obj = snapshot.val();
//     console.log(obj);
//     var img = $('<img>');
//     img.attr('src', obj.course_image);
//     $('.course-image').append(img);
// })

const courseAboutBranch = ref(db, '/iatc/course/about');
var courseAboutArr = [];

$('#courseAboutBtn').on('click', function(){
    var courseAboutText = $('#course-about-text').val();
    var courseParticipant = $('#course-participant').val();
    var courseProgram = $('#course-program').val();
    var courseSkill = $('#course-skill').val();

    courseAboutArr.push({
        course_about_text: courseAboutText,
        course_participant: courseParticipant,
        course_program: courseProgram,
        course_skill: courseSkill,
    })

    set(courseAboutBranch, courseAboutArr);
});

//Tedbirlerimiz sehifesindeki melumatlarin daxil edilmesi ucun

const eventsBranch = ref(db, '/iatc/events');
var eventArr = [];

$('#eventBtn').on('click', function(){
    var eventImage = $('#event-image').val();
    var eventHeader = $('#event-header').val();
    var eventText = $('#event-text').val();

    eventArr.push({
        event_image: eventImage,
        event_header: eventHeader,
        event_text: eventText,
    })

    set(eventsBranch, eventArr);
});

//Elaqe sehifesindeki melumatlarin daxil edilmesi ucun

const contactBranch = ref(db, '/iatc/contact');
var contactArr = [];

$('#contactBtn').on('click', function(){
    var contactAddress = $('#contact-address').val();
    var emailAddress = $('#contact-email').val();
    var phoneNUmber = $('#contact-phone').val();

    contactArr.push({
        contact_address: contactAddress,
        email_address: emailAddress,
        phone_number: phoneNUmber,
    })

    set(contactBranch, contactArr);
});