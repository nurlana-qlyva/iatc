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

// kurslar barede melumarin daxil edilmesi ucun

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



// //course participant

// const courseAboutParticipantBranch = ref(db, '/iatc/course/about/participants');

// $('#courseAboutParticipantBtn').on('click', function(e){
//     e.preventDefault();

//     var courseParticipant = $('#course-participant').val();

//     var courseAboutParticipantArr = push(courseAboutParticipantBranch);

//     set(courseAboutParticipantArr, {
//        course_participant: courseParticipant,
//     });
// });

// onValue(courseAboutParticipantBranch, function(banner){
//     var objBanner = banner.val();
    
//     var ul = document.querySelector('#participant');
//     ul.innerHTML = '';

//     for(let [key,value] of Object.entries(objBanner)){
//         var li = document.createElement('li');
//         li.innerHTML = value.course_participant;
//         li.classList.add('list-style');
//         li.dataset.key = key;
        
//         let deleteList = document.createElement('span');
//         deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
//         deleteList.classList.add('delete-btn');

//         li.append(deleteList);
//         ul.append(li);
//         ul.classList.add('banner-image-list');

//         deleteList.dataset.key = key;

//         deleteList.onclick = function(){
//             remove(ref(db, '/iatc/course/about/participants/' + this.dataset.key));
//         }
//     }
// })

// //course program

// const courseAboutProgramBranch = ref(db, '/iatc/course/about/program');

// $('#courseAboutProgramBtn').on('click', function(e){
//     e.preventDefault();

//     var courseProgram = $('#course-program').val();

//     var courseAboutProgramArr = push(courseAboutProgramBranch);

//     set(courseAboutProgramArr, {
//        course_program: courseProgram,
//     });
// });

// onValue(courseAboutProgramBranch, function(banner){
//     var objBanner = banner.val();
    
//     var ul = document.querySelector('#program');
//     ul.innerHTML = '';

//     for(let [key,value] of Object.entries(objBanner)){
//         var li = document.createElement('li');
//         li.innerHTML = value.course_program;
//         li.classList.add('list-style');
//         li.dataset.key = key;
        
//         let deleteList = document.createElement('span');
//         deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
//         deleteList.classList.add('delete-btn');

//         li.append(deleteList);
//         ul.append(li);
//         ul.classList.add('banner-image-list');

//         deleteList.dataset.key = key;

//         deleteList.onclick = function(){
//             remove(ref(db, '/iatc/course/about/program/' + this.dataset.key));
//         }
//     }
// })

// //course skills

// const courseAboutSkillBranch = ref(db, '/iatc/course/about/skill');

// $('#courseAboutSkillBtn').on('click', function(e){
//     e.preventDefault();

//     var courseSkill = $('#course-skill').val();

//     var courseAboutSkillArr = push(courseAboutSkillBranch);

//     set(courseAboutSkillArr, {
//        course_skill: courseSkill,
//     });
// });

// onValue(courseAboutSkillBranch, function(banner){
//     var objBanner = banner.val();
    
//     var ul = document.querySelector('#skill');
//     ul.innerHTML = '';

//     for(let [key,value] of Object.entries(objBanner)){
//         var li = document.createElement('li');
//         li.innerHTML = value.course_skill;
//         li.classList.add('list-style');
//         li.dataset.key = key;
        
//         let deleteList = document.createElement('span');
//         deleteList.innerHTML = '<i class="fas fa-trash-alt"></i>';
//         deleteList.classList.add('delete-btn');

//         li.append(deleteList);
//         ul.append(li);
//         ul.classList.add('banner-image-list');

//         deleteList.dataset.key = key;

//         deleteList.onclick = function(){
//             remove(ref(db, '/iatc/course/about/skill/' + this.dataset.key));
//         }
//     }
// })