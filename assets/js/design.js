import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove, get} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

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


// kurslar barede melumarin daxil edilmesi ucun

const courseAboutDesignBranch = ref(db, '/iatc/course/about/Design/aboutCourse');

$('#courseAboutDesignBtn').on('click', function(e){
    e.preventDefault();

    var courseName = $('#course-nameDesign').val();
    var courseTerm = $('#course-termDesign').val();
    var courseStudent = $('#course-studentDesign').val();
    var courseImage = $('#course-imageDesign').val();
    var courseInfo = $('#course-infoDesign').val();
    var courseSummary = $('#course-about-textDesign').val();

    var courseAboutArr = push(courseAboutDesignBranch);

    set(courseAboutArr, {
        course_name: courseName,
        course_term: courseTerm,
        course_student: courseStudent,
        course_image: courseImage,
        course_info: courseInfo,
        course_summary: courseSummary,
    });
});

onValue(courseAboutDesignBranch, function(banner){
    var objBanner = banner.val();
    
    var tbody = document.querySelector("#push-innerDesign");
    tbody.innerHTML = '';
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

        tbody.append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/about/Design/aboutCourse/' + this.dataset.key));
        }
    }

})
onValue(courseAboutDesignBranch, function(snapshot){
    var arr = snapshot.val();

    for(let [key,value] of Object.entries(arr)){
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

const courseAboutParticipantDesignBranch = ref(db, '/iatc/course/about/Design/participants');

$('#courseAboutParticipantDesignBtn').on('click', function(e){
    e.preventDefault();

    var courseParticipant = $('#course-participantDesign').val();

    var courseAboutParticipantFrontArr = push(courseAboutParticipantDesignBranch);

    set(courseAboutParticipantFrontArr, {
       course_participant: courseParticipant,
    });
});

onValue(courseAboutParticipantDesignBranch, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#participantDesign');
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
            remove(ref(db, '/iatc/course/about/Design/participants/' + this.dataset.key));
        }
    }

})
onValue(courseAboutParticipantDesignBranch, function(snapshot){
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

const courseAboutProgramDesignBranch = ref(db, '/iatc/course/about/Design/program');

$('#courseAboutProgramDesignBtn').on('click', function(e){
    e.preventDefault();

    var courseProgram = $('#course-programDesign').val();

    var courseAboutProgramFrontArr = push(courseAboutProgramDesignBranch);

    set(courseAboutProgramFrontArr, {
       course_program: courseProgram,
    });
});

onValue(courseAboutProgramDesignBranch, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#programDesign');
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
            remove(ref(db, '/iatc/course/about/Design/program/' + this.dataset.key));
        }
    }
})

onValue(courseAboutProgramDesignBranch, function(snapshot){
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

const courseAboutSkillDesignBranch = ref(db, '/iatc/course/about/Design/skill');

$('#courseAboutSkillDesignBtn').on('click', function(e){
    e.preventDefault();

    var courseSkill = $('#course-skillDesign').val();

    var courseAboutSkillArr = push(courseAboutSkillDesignBranch);

    set(courseAboutSkillArr, {
       course_skill: courseSkill,
    });
});

onValue(courseAboutSkillDesignBranch, function(banner){
    var objBanner = banner.val();

    var ul = document.querySelector('#skillDesign');
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
            remove(ref(db, '/iatc/course/about/Design/skill/' + this.dataset.key));
        }
    }
})

onValue(courseAboutSkillDesignBranch, function(snapshot){
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

const courseAboutCardDesignBranch = ref(db, '/iatc/course/about/Design/card');

$('#courseAboutCardDesignBtn').on('click', function(e){
    e.preventDefault();

    var studentNum = $('#all-studentDesign').val();
    var lectures = $('#lecturesDesign').val();
    var quiz = $('#quizDesign').val();
    var duration = $('#durationDesign').val();
    var skill = $('#all-skillDesign').val();
    var language = $('#languageDesign').val();
    var assessment = $('#assessmentDesign').val();

    var courseAboutCardArr = push(courseAboutCardDesignBranch);

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

onValue(courseAboutCardDesignBranch, function(snapshot){
    var arr = snapshot.val();

    var tbody = document.querySelector("#push-cardDesign");
    tbody.innerHTML = '';
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

        tbody.append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/about/Design/card/' + this.dataset.key));
        }
    }
})
onValue(courseAboutCardDesignBranch, function(snapshot){
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

const courseAboutTeacherDesignBranch = ref(db, '/iatc/course/about/Design/teacher');

$('#courseAboutTeacherDesignBtn').on('click', function(e){
    e.preventDefault();

    var teacher = $('#teacherDesign').val();
    var image = $('#imageDesign').val();
    var experience = $('#experienceDesign').val();
    var info = $('#infoDesign').val();
    var profession = $('#professionDesign').val();

    var courseAboutTeacherArr = push(courseAboutTeacherDesignBranch);

    set(courseAboutTeacherArr, {
        teacher,
        image,
        profession,
        experience,
        info
    });
});

onValue(courseAboutTeacherDesignBranch, function(snapshot){
    let arr = snapshot.val();
    
    var tbody = document.querySelector("#push-teacherDesign");
    tbody.innerHTML = '';
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

        tbody.append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/about/Design/teacher/' + this.dataset.key));
        }
    }
})
onValue(courseAboutTeacherDesignBranch, function(snapshot){
    var arr = snapshot.val();

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