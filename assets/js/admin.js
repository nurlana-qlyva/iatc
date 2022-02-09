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
                username: userName,
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

onValue(aboutMainBranch, function(banner){
    var objBanner = banner.val();
    
    var imageUl = document.querySelector('#about-image-list');
    imageUl.innerHTML = '';

    for(let [key,value] of Object.entries(objBanner)){
        var imageLi = document.createElement('li');
        imageLi.innerHTML = value.about_image;
        imageLi.classList.add('list-style');
        imageLi.dataset.key = key;
        
        let deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');

        imageLi.append(deleteList);
        imageUl.append(imageLi);
        imageUl.classList.add('banner-image-list');

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/about/main/' + this.dataset.key));
        }
    }
})

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

    var courseName = $('#course-name').val();
    var courseAboutText = $('#course-about-text').val();
    var courseShortİnfo = $('#course-info').val();
    var teacherInfo = $('#teacher-info').val();

    var courseAboutArr = push(courseAboutBranch);

    set(courseAboutArr, {
        course_name: courseName,
        course_about_text: courseAboutText,
        course_info: courseShortİnfo,
        teacher_info: teacherInfo,
    });
});

//course participant

const courseAboutParticipantBranch = ref(db, '/iatc/course/about/participants');

$('#courseAboutParticipantBtn').on('click', function(e){
    e.preventDefault();

    var courseParticipant = $('#course-participant').val();

    var courseAboutParticipantArr = push(courseAboutParticipantBranch);

    set(courseAboutParticipantArr, {
       course_participant: courseParticipant,
    });
});

onValue(courseAboutParticipantBranch, function(banner){
    var objBanner = banner.val();
    
    var ul = document.querySelector('#participant');
    ul.innerHTML = '';

    for(let [key,value] of Object.entries(objBanner)){
        var li = document.createElement('li');
        li.innerHTML = value.course_participant;
        li.classList.add('list-style');
        li.dataset.key = key;
        
        let deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');

        li.append(deleteList);
        ul.append(li);
        ul.classList.add('banner-image-list');

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/course/about/participants/' + this.dataset.key));
        }
    }
})

//course program

const courseAboutProgramBranch = ref(db, '/iatc/course/about/program');

$('#courseAboutProgramBtn').on('click', function(e){
    e.preventDefault();

    var courseProgram = $('#course-program').val();

    var courseAboutProgramArr = push(courseAboutProgramBranch);

    set(courseAboutProgramArr, {
       course_program: courseProgram,
    });
});

onValue(courseAboutProgramBranch, function(banner){
    var objBanner = banner.val();
    
    var ul = document.querySelector('#program');
    ul.innerHTML = '';

    for(let [key,value] of Object.entries(objBanner)){
        var li = document.createElement('li');
        li.innerHTML = value.course_program;
        li.classList.add('list-style');
        li.dataset.key = key;
        
        let deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');

        li.append(deleteList);
        ul.append(li);
        ul.classList.add('banner-image-list');

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/course/about/program/' + this.dataset.key));
        }
    }
})

//course skills

const courseAboutSkillBranch = ref(db, '/iatc/course/about/skill');

$('#courseAboutSkillBtn').on('click', function(e){
    e.preventDefault();

    var courseSkill = $('#course-skill').val();

    var courseAboutSkillArr = push(courseAboutSkillBranch);

    set(courseAboutSkillArr, {
       course_skill: courseSkill,
    });
});

onValue(courseAboutSkillBranch, function(banner){
    var objBanner = banner.val();
    
    var ul = document.querySelector('#skill');
    ul.innerHTML = '';

    for(let [key,value] of Object.entries(objBanner)){
        var li = document.createElement('li');
        li.innerHTML = value.course_skill;
        li.classList.add('list-style');
        li.dataset.key = key;
        
        let deleteList = document.createElement('span');
        deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteList.classList.add('delete-btn');

        li.append(deleteList);
        ul.append(li);
        ul.classList.add('banner-image-list');

        deleteList.dataset.key = key;

        deleteList.onclick = function(){
            remove(ref(db, '/iatc/course/about/skill/' + this.dataset.key));
        }
    }
})


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


//Home slider banner
const firestoreDB = firebase.firestore();


                function getEvent() {
                    firestoreDB.collection("events").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const div = document.createElement("div");
                            div.innerHTML = `
                                <a href="./tedbir.html?event=${doc.id}">
                                    <div class="card" style="width: 18rem;" style="display:none;">
                                        <img src="${doc.data().photo}" class="card-img-top" alt="">
                                        <div class="card-body">
                                            <h5 class="card-title">${doc.data().name}</h5>
                                            <p class="card-text">${doc.data().description}</p>
                                        </div>
                                    </div>
                                </a>
                            `
                            $("#events-card").append(div)
                        });
                    });
                }

                getEvent()