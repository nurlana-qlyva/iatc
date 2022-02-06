import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

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
export{ref, set, push};

//Home page

const homeBannerBranch = ref(db, '/iatc/home/banner');

$('#bannerBtn').on('click', function(){
    var bannerİmage = $('#banner-image').val();

    set(homeBannerBranch, {
        banner_image: bannerİmage,
    });
});

const homePartnersBranch = ref(db, '/iatc/home/partnership/');

// var partnershipİmage;

// $('#partnershipBtn').on('click', function(){
//     partnershipİmage = $('#home-partnership-image').val();

//     arr.push({partnership_image: partnershipİmage})

//     set(homePartnersBranch, arr);
//     console.log(arr.length)
// });


const homeAccountBranch = ref(db, '/iatc/home/accounts');

$('#iatcAccountBtn').on('click', function(){
    var iatcFbAccount = $('#iatc-fb-url').val();
    var iatcTwitterAccount = $('#iatc-twitter-url').val();
    var iatcLinkedinAccount = $('#iatc-linkedin-url').val();
    var iatcInstagramAccount = $('#iatc-instagram-url').val();

    set(homeAccountBranch, {
        iatcFbAccountUrl: iatcFbAccount,
        iatcTwitterAccountUrl: iatcTwitterAccount,
        iatcLinkedinAccountUrl: iatcLinkedinAccount,
        iatcInstagramAccountUrl: iatcInstagramAccount,
    });
});


// About səhifəsindəki melumatlari daxil etmek üçün

const aboutMainBranch = ref(db, '/iatc/about/main');

$('#aboutMainBtn').on('click', function(){
    var aboutText = $('#about-text').val();
    var aboutİmage = $('#about-image').val();

    set(aboutMainBranch, {
        about_text: aboutText,
        about_image: aboutİmage,
    });
});

const aboutBranch = ref(db, '/iatc/about/section');

$('#aboutBtn').on('click', function(){
    var memberName = $('#team-member').val();
    var memberProfession = $('#member-profession').val();
    var fbAccount = $('#fb-url').val();
    var twitterAccount = $('#twitter-url').val();
    var linkedinAccount = $('#linkedin-url').val();
    var instagramAccount = $('#instagram-url').val();

    set(aboutBranch, {
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

$('#courseBtn').on('click', function(){
    var courseName = $('#course-name').val();
    var courseİmage = $('#course-image').val();
    var teacherName = $('#course-teacher').val();
    var courseTerm = $('#course-term').val();
    var courseStudentNumber = $('#course-student').val();
    var courseStudentSkill = $('#course-student-skill').val();
    var courseLanguage = $('#course-language').val();
    var courseTeacherExperience = $('#course-teacher-experience').val();

    set(courseBranch, {
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

$('#courseAboutBtn').on('click', function(){
    var courseAboutText = $('#course-about-text').val();
    var courseParticipant = $('#course-participant').val();
    var courseProgram = $('#course-program').val();
    var courseSkill = $('#course-skill').val();

    set(courseAboutBranch, {
        course_about_text: courseAboutText,
        course_participant: courseParticipant,
        course_program: courseProgram,
        course_skill: courseSkill,
    });
});

//Tedbirlerimiz sehifesindeki melumatlarin daxil edilmesi ucun

const eventsBranch = ref(db, '/iatc/events');

$('#eventBtn').on('click', function(){
    var eventImage = $('#event-image').val();
    var eventHeader = $('#event-header').val();
    var eventText = $('#event-text').val();

    set(eventsBranch, {
        event_image: eventImage,
        event_header: eventHeader,
        event_text: eventText,
    });
});

//Elaqe sehifesindeki melumatlarin daxil edilmesi ucun

const contactBranch = ref(db, '/iatc/contact');

$('#contactBtn').on('click', function(){
    var contactAddress = $('#contact-address').val();
    var emailAddress = $('#contact-email').val();
    var phoneNUmber = $('#contact-phone').val();

    set(contactBranch, {
        contact_address: contactAddress,
        email_address: emailAddress,
        phone_number: phoneNUmber,
    });
});