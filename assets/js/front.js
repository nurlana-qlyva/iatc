import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove, get} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

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


// kurslar barede melumarin daxil edilmesi ucun

const courseAboutFrontBranch = ref(db, '/iatc/course/about/Front/aboutCourse');

$('#courseAboutFrontBtn').on('click', function(e){
    e.preventDefault();

    var courseName = $('#course-nameFront').val();
    var courseTerm = $('#course-termFront').val();
    var courseStudent = $('#course-studentFront').val();
    var courseImage = $('#course-imageFront').val();
    var courseInfo = $('#course-infoFront').val();
    var courseSummary = $('#course-about-textFront').val();

    var courseAboutArr = push(courseAboutFrontBranch);

    set(courseAboutArr, {
        course_name: courseName,
        course_term: courseTerm,
        course_student: courseStudent,
        course_image: courseImage,
        course_info: courseInfo,
        course_summary: courseSummary,
    });
});

onValue(courseAboutFrontBranch, function(banner){
    var objBanner = banner.val();
    
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){
        var tr = document.createElement('tr');

        var nameTd = document.createElement('td');
        var termTd = document.createElement('td');
        var studentTd = document.createElement('td');
        var imageTd = document.createElement('td');
        var infoTd = document.createElement('td');
        var summaryTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        nameTd.innerHTML = value.course_name;
        termTd.innerHTML = value.course_term;
        imageTd.innerHTML = value.course_image;
        studentTd.innerHTML = value.course_student;
        infoTd.innerHTML = value.course_info;
        summaryTd.innerHTML = value.course_summary;


        count++;
        tdcount.innerHTML = count;

        nameTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(nameTd);
        tr.append(termTd);
        tr.append(imageTd);
        tr.append(studentTd);
        tr.append(infoTd);
        tr.append(summaryTd);
        tr.append(edit);

        $("#push-innerFront").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/about/Front/aboutCourse/' + this.dataset.key));
        }
    }

    for(let [key,value] of Object.entries(objBanner)){
        var div = $("<div>");

        div.html(`
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-8">
                        <div class="text-course">
                            <h3>${value.course_name}</h3>
                            <ul class="unstyled-list list-inline">
                                <li class="list-inline-item">
                                    <i class="fa-regular fa-calendar"></i>
                                    <span>${value.course_term}</span>
                                </li>
                                <li class="list-inline-item">
                                    <i class="fa-regular fa-user"></i>
                                    <span>${value.course_student}</span>
                                </li>
                            </ul>
                            <div>${value.course_info}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="image-course">
                            <img src="${value.course_image}" alt="front">
                        </div>
                    </div>
                </div>
            </div>
        `)

        $(".about-course-section").append(div);

        var divText = $("#text-summary");

        divText.html(`${value.course_summary}`);
    }
})

// //course participant

const courseAboutParticipantFrontBranch = ref(db, '/iatc/course/about/Front/participants');

$('#courseAboutParticipantFrontBtn').on('click', function(e){
    e.preventDefault();

    var courseParticipant = $('#course-participantFront').val();

    var courseAboutParticipantFrontArr = push(courseAboutParticipantFrontBranch);

    set(courseAboutParticipantFrontArr, {
       course_participant: courseParticipant,
    });
});

onValue(courseAboutParticipantFrontBranch, function(banner){
    var objBanner = banner.val();

    for(let [key,value] of Object.entries(objBanner)){
        var ul = document.querySelector('#participantFront');

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
            remove(ref(db, '/iatc/course/about/Front/participants/' + this.dataset.key));
        }
    }

})
onValue(courseAboutParticipantFrontBranch, function(snapshot){
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();

        var li = $("<li>");

        li.html(childData.course_participant);

        $(".list-participant").append(li);
      });
    }, {
      onlyOnce: true
})

// //course program

const courseAboutProgramFrontBranch = ref(db, '/iatc/course/about/Front/program');

$('#courseAboutProgramFrontBtn').on('click', function(e){
    e.preventDefault();

    var courseProgram = $('#course-programFront').val();

    var courseAboutProgramFrontArr = push(courseAboutProgramFrontBranch);

    set(courseAboutProgramFrontArr, {
       course_program: courseProgram,
    });
});

onValue(courseAboutProgramFrontBranch, function(banner){
    var objBanner = banner.val();

    for(let [key,value] of Object.entries(objBanner)){
        var ul = document.querySelector('#programFront');

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
            remove(ref(db, '/iatc/course/about/Front/program/' + this.dataset.key));
        }
    }
})

onValue(courseAboutProgramFrontBranch, function(snapshot){
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();

        var li = $("<li>");

        li.html(childData.course_program);

        $(".list-program").append(li);
      });
    }, {
      onlyOnce: true
})

// //course skills

const courseAboutSkillFrontBranch = ref(db, '/iatc/course/about/Front/skill');

$('#courseAboutSkillFrontBtn').on('click', function(e){
    e.preventDefault();

    var courseSkill = $('#course-skillFront').val();

    var courseAboutSkillArr = push(courseAboutSkillFrontBranch);

    set(courseAboutSkillArr, {
       course_skill: courseSkill,
    });
});

onValue(courseAboutSkillFrontBranch, function(banner){
    var objBanner = banner.val();

    for(let [key,value] of Object.entries(objBanner)){
        var ul = document.querySelector('#skillFront');

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
            remove(ref(db, '/iatc/course/about/Front/skill/' + this.dataset.key));
        }
    }
})

onValue(courseAboutSkillFrontBranch, function(snapshot){
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();

        var li = $("<li>");

        li.html(childData.course_skill);

        $(".list-skill").append(li);
      });
    }, {
      onlyOnce: true
})

// card information

const courseAboutCardFrontBranch = ref(db, '/iatc/course/about/Front/card');

$('#courseAboutCardFrontBtn').on('click', function(e){
    e.preventDefault();

    var studentNum = $('#all-studentFront').val();
    var lectures = $('#lecturesFront').val();
    var quiz = $('#quizFront').val();
    var duration = $('#durationFront').val();
    var skill = $('#all-skillFront').val();
    var language = $('#languageFront').val();
    var assessment = $('#assessmentFront').val();

    var courseAboutCardArr = push(courseAboutCardFrontBranch);

    set(courseAboutCardArr, {
        student_num_card: studentNum,
        lecture_num: lectures,
        quiz_num: quiz,
        duration_num: duration,
        skill_level: skill,
        language_select: language,
        assessment_boolean: assessment,
    });
});

onValue(courseAboutCardFrontBranch, function(snapshot){
    var arr = snapshot.val();
    var count = 0;

    for(var [key,value] of Object.entries(arr)){
        var tr = document.createElement('tr');

        var studentTd = document.createElement('td');
        var lectureTd = document.createElement('td');
        var quizTd = document.createElement('td');
        var durationTd = document.createElement('td');
        var skillTd = document.createElement('td');
        var languageTd = document.createElement('td');
        var assessmentTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        studentTd.innerHTML = value.student_num_card;
        lectureTd.innerHTML = value.lecture_num;
        quizTd.innerHTML = value.quiz_num;
        durationTd.innerHTML = value.duration_num;
        skillTd.innerHTML = value.skill_level;
        languageTd.innerHTML = value.language_select;
        assessmentTd.innerHTML = value.assessment_boolean;

        count++;
        tdcount.innerHTML = count;

        studentTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(studentTd);
        tr.append(lectureTd);
        tr.append(quizTd);
        tr.append(durationTd);
        tr.append(skillTd);
        tr.append(languageTd);
        tr.append(assessmentTd);
        tr.append(edit);

        $("#push-cardFront").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/about/Front/card/' + this.dataset.key));
        }
    }
})
onValue(courseAboutCardFrontBranch, function(snapshot){
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();


        var div = document.createElement("div");

        div.innerHTML = (`
                <h4>Kurs Haqqında</h4>
                <div class="d-flex justify-content-between align-items-center">
                    <span><i class="fa-regular fa-user"></i> Student Enrolled:</span>
                    <span>${childData.student_num}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span><i class="fa-regular fa-note-sticky"></i> Lectures:</span>
                    <span>${childData.lecture_num}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span><i class="fa-regular fa-chess-pawn"></i> Quizzes:</span>
                    <span>${childData.quiz_num}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span><i class="fa-regular fa-bell"></i> Duration:</span>
                    <span>${childData.duration_num}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span><i class="fa-brands fa-codepen"></i> Skill Level:</span>
                    <span>${childData.skill_level}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span><i class="fa-regular fa-bell"></i> Language:</span>
                    <span>${childData.language_select}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span><i class="fa-regular fa-box-archive"></i> Assessment:</span>
                    <span>${childData.assessment_boolean}</span>
                </div>
        `)


        $(".card-box").append(div);
      });
    }, {
      onlyOnce: true
})

// about teacher

const courseAboutTeacherFrontBranch = ref(db, '/iatc/course/about/Front/teacher');

$('#courseAboutTeacherFrontBtn').on('click', function(e){
    e.preventDefault();

    var teacher = $('#teacherFront').val();
    var image = $('#imageFront').val();
    var experience = $('#experienceFront').val();
    var info = $('#infoFront').val();
    var profession = $('#professionFront').val();

    var courseAboutTeacherArr = push(courseAboutTeacherFrontBranch);

    set(courseAboutTeacherArr, {
        teacher,
        image,
        profession,
        experience,
        info
    });
});

onValue(courseAboutTeacherFrontBranch, function(snapshot){
    let arr = snapshot.val();
    
    var count = 0;

    for(let [key,value] of Object.entries(arr)){
        var tr = document.createElement('tr');

        var teacherTd = document.createElement('td');
        var imageTd = document.createElement('td');
        var professionTd = document.createElement('td');
        var experienceTd = document.createElement('td');
        var infoTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        teacherTd.innerHTML = value.teacher;
        imageTd.innerHTML = value.image;
        professionTd.innerHTML = value.profession;
        experienceTd.innerHTML = value.experience;
        infoTd.innerHTML = value.info;

        count++;
        tdcount.innerHTML = count;

        teacherTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(teacherTd);
        tr.append(imageTd);
        tr.append(professionTd);
        tr.append(experienceTd);
        tr.append(infoTd);
        tr.append(edit);

        $("#push-teacherFront").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/about/Front/teacher/' + this.dataset.key));
        }
    }

    for(let [key, value] of Object.entries(arr)){
        var div = $("<div>");

        div.html(`
            <div class="col-12 col-lg-8">
                <div class="teacher-content">
                    <div class="row">
                        <div class="col-4">
                            <div class="image-teacher">
                                <img src="${value.image}" alt="teacher">
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="text">
                                <h4>${value.teacher}</h4>
                                <ul class="unstyled-list list-inline">
                                    <li class="list-inline-item">${value.profession}</li>
                                    <li class="list-inline-item">${value.experience}</li>
                                </ul>
                                <div class="teacher-about">${value.info}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        div.attr('class', 'row');

        $(".teacher-information").append(div);
    }
})