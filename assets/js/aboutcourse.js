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

const courseAboutBranch = ref(db, '/iatc/course/about/backend/aboutCourse');

$('#courseAboutBackendBtn').on('click', function(e){
    e.preventDefault();

    var courseName = $('#course-name').val();
    var courseTerm = $('#course-term').val();
    var courseStudent = $('#course-student').val();
    var courseImage = $('#course-image').val();
    var courseInfo = $('#course-info').val();
    var courseSummary = $('#course-about-text').val();

    var courseAboutArr = push(courseAboutBranch);

    set(courseAboutArr, {
        course_name: courseName,
        course_term: courseTerm,
        course_student: courseStudent,
        course_image: courseImage,
        course_info: courseInfo,
        course_summary: courseSummary,
    });
});

onValue(courseAboutBranch, function(banner){
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

        $("#push-inner").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/about/backend/aboutCourse/' + this.dataset.key));
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
                            <img src="${value.course_image}" alt="backend">
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

const courseAboutParticipantBranch = ref(db, '/iatc/course/about/backend/participants');

$('#courseAboutParticipantBackendBtn').on('click', function(e){
    e.preventDefault();

    var courseParticipant = $('#course-participant').val();

    var courseAboutParticipantArr = push(courseAboutParticipantBranch);

    set(courseAboutParticipantArr, {
       course_participant: courseParticipant,
    });
});

onValue(courseAboutParticipantBranch, function(banner){
    var objBanner = banner.val();

    for(let [key,value] of Object.entries(objBanner)){
        var ul = document.querySelector('#skill');

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
            remove(ref(db, '/iatc/course/about/backend/participants/' + this.dataset.key));
        }
    }

})
onValue(courseAboutParticipantBranch, function(snapshot){
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

const courseAboutProgramBranch = ref(db, '/iatc/course/about/backend/program');

$('#courseAboutProgramBackendBtn').on('click', function(e){
    e.preventDefault();

    var courseProgram = $('#course-program').val();

    var courseAboutProgramArr = push(courseAboutProgramBranch);

    set(courseAboutProgramArr, {
       course_program: courseProgram,
    });
});

onValue(courseAboutProgramBranch, function(banner){
    var objBanner = banner.val();

    for(let [key,value] of Object.entries(objBanner)){
        var ul = document.querySelector('#program');

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
            remove(ref(db, '/iatc/course/about/backend/program/' + this.dataset.key));
        }
    }
})

onValue(courseAboutProgramBranch, function(snapshot){
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

const courseAboutSkillBranch = ref(db, '/iatc/course/about/backend/skill');

$('#courseAboutSkillBackendBtn').on('click', function(e){
    e.preventDefault();

    var courseSkill = $('#course-skill').val();

    var courseAboutSkillArr = push(courseAboutSkillBranch);

    set(courseAboutSkillArr, {
       course_skill: courseSkill,
    });
});

onValue(courseAboutSkillBranch, function(banner){
    var objBanner = banner.val();

    for(let [key,value] of Object.entries(objBanner)){
        var ul = document.querySelector('#skill');

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
            remove(ref(db, '/iatc/course/about/backend/skill/' + this.dataset.key));
        }
    }
})

onValue(courseAboutSkillBranch, function(snapshot){
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

const courseAboutCardBranch = ref(db, '/iatc/course/about/backend/card');

$('#courseAboutCardBackendBtn').on('click', function(e){
    e.preventDefault();

    var studentNum = $('#all-student').val();
    var lectures = $('#lectures').val();
    var quiz = $('#quiz').val();
    var duration = $('#duration').val();
    var skill = $('#all-skill').val();
    var language = $('#language').val();
    var assessment = $('#assessment').val();

    var courseAboutCardArr = push(courseAboutCardBranch);

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

onValue(courseAboutCardBranch, function(snapshot){
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

        $("#push-card").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/about/backend/card/' + this.dataset.key));
        }
    }
})
onValue(courseAboutCardBranch, function(snapshot){
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

const courseAboutTeacherBranch = ref(db, '/iatc/course/about/backend/teacher');

$('#courseAboutTeacherBackendBtn').on('click', function(e){
    e.preventDefault();

    var teacher = $('#teacher').val();
    var image = $('#image').val();
    var experience = $('#experience').val();
    var info = $('#info').val();
    var profession = $('#profession').val();

    var courseAboutTeacherArr = push(courseAboutTeacherBranch);

    set(courseAboutTeacherArr, {
        teacher,
        image,
        profession,
        experience,
        info
    });
});

onValue(courseAboutTeacherBranch, function(snapshot){
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

        $("#push-teacher").append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/about/backend/teacher/' + this.dataset.key));
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