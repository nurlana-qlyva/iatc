import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

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
export{ref, set};

// About səhifəsindəki melumatlari daxil etmek üçün

const aboutBranch = ref(db, '/iatc/about');

$('#aboutBtn').on('click', function(){
    var aboutText = $('#about-text').val();
    var aboutİmage = $('#about-image').val();
    var memberName = $('#team-member').val();
    var memberProfession = $('#member-profession').val();
    var fbAccount = $('#fb-url').val();
    var twitterAccount = $('#twitter-url').val();
    var linkedinAccount = $('#linkedin-url').val();

    set(aboutBranch, {
        about_text: aboutText,
        about_image: aboutİmage,
        member_name: memberName,
        member_profession: memberProfession,
        fbAccountUrl: fbAccount,
        twitterAccountUrl: twitterAccount,
        linkedinAccountUrl: linkedinAccount,
    });
});

//Kurslarimiz sehifesindeki melumatlarin daxil edilmesi ucun

const courseBranch = ref(db, '/iatc/course');

$('#courseBtn').on('click', function(){
    var courseName = $('#course-name').val();
    var courseİmage = $('#course-image').val();
    var teacherName = $('#course-teacher').val();
    var courseTerm = $('#course-term').val();
    var courseStudentNumber = $('#course-student').val();
    var courseStudentSkill = $('#course-student-skill').val();
    var courseLanguage = $('#course-language').val();

    set(courseBranch, {
        course_name: courseName,
        course_image: courseİmage,
        teacher_name: teacherName,
        course_term: courseTerm,
        student_number: courseStudentNumber,
        student_skill: courseStudentSkill,
        course_language:courseLanguage
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