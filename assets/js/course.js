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

// kurslarimiz sehifesindeki melumatlarin daxil edilmesi ucun

const courseBranch = ref(db, '/iatc/course/main');

$('#courseBtn').on('click', function(e){
    e.preventDefault();

    var courseName = $('#course-name').val();
    var courseİmage = $('#course-image').val();
    var teacherName = $('#course-teacher').val();
    var pageUrl = $('#course-page-url').val();
    var courseTerm = $('#course-term').val();
    var courseStudentNumber = $('#course-student').val();

    var courseArr = push(courseBranch);

    set(courseArr, {
        course_name: courseName,
        course_image: courseİmage,
        teacher_name: teacherName,
        page_url: pageUrl,
        course_term: courseTerm,
        student_number: courseStudentNumber,
    });
});

onValue(courseBranch, function(banner){
    var objBanner = banner.val();
    
    var tbody = document.querySelector("#push-inner");
    tbody.innerHTML = '';
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){
        var tr = document.createElement('tr');

        var nameTd = document.createElement('td');
        var teacherTd = document.createElement('td');
        var imageTd = document.createElement('td');
        var urlTd = document.createElement('td');
        var termTd = document.createElement('td');
        var numStudentTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        nameTd.innerHTML = value.course_name;
        teacherTd.innerHTML = value.teacher_name;
        imageTd.innerHTML = value.course_image;
        urlTd.innerHTML = value.page_url;
        termTd.innerHTML = value.course_term;
        numStudentTd.innerHTML = value.student_number;

        count++;
        tdcount.innerHTML = count;

        nameTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(nameTd);
        tr.append(teacherTd);
        tr.append(imageTd);
        tr.append(urlTd);
        tr.append(termTd);
        tr.append(numStudentTd);
        tr.append(edit);

        tbody.append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/main/' + this.dataset.key));
        }
    }
});
onValue(courseBranch, function (snapshot) {
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();

        var div = $("<div>");

        div.html(`
            
                            <div class="about-course">
                                <h4>${childData.course_name}</h4>
                                <p>${childData.teacher_name}</p>
                                <ul>
                                    <li><i class="fa fa-solid fa-laptop-code"></i> ${childData.course_term}</li>
                                    <li><i class="fa fa-solid fa-user"></i>  ${childData.student_number}</li>
                                </ul>
                            </div>
                            <div class="course-image">
                                <img src="${childData.course_image}" alt="course">
                            </div>
                            <div class="btn">
                                <a href="${childData.page_url}">Ətraflı</a>
                            </div>
        `);

        div.attr('class', 'course');

        $(".course-slider").append(div);
    });

    $('.course-slider').slick({
        infinite: true,
        slidesToShow: 3,
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
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
          ],
    });
}, {
    onlyOnce: true
})
const courseStudentBranch = ref(db, '/iatc/course/student');

$('#studentBtn').on('click', function(e){
    e.preventDefault();

    var studentName = $('#student-name').val();
    var studentİmage = $('#student-image').val();
    var studentWork = $('#student-work').val();
    var thought = $('#thought').val();

    var courseArr = push(courseStudentBranch);

    set(courseArr, {
        studentName,
        studentİmage,
        studentWork,
        thought
    });
});

onValue(courseStudentBranch, function(banner){
    var objBanner = banner.val();
    
    var tbody = document.querySelector("#push-inner-student");
    tbody.innerHTML = '';
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){
        var tr = document.createElement('tr');

        var nameTd = document.createElement('td');
        var imageTd = document.createElement('td');
        var workTd = document.createElement('td');
        var thoughtTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        nameTd.innerHTML = value.studentName;
        imageTd.innerHTML = value.studentİmage;
        workTd.innerHTML = value.studentWork;
        thoughtTd.innerHTML = value.thought;

        count++;
        tdcount.innerHTML = count;

        nameTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(nameTd);
        tr.append(imageTd);
        tr.append(workTd);
        tr.append(thoughtTd);
        tr.append(edit);

        tbody.append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/course/student/' + this.dataset.key));
        }
    }
});
onValue(courseStudentBranch, function (snapshot) {
    snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();

        var div = $("<div>");

        div.html(`
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="student-image">
                    <img src="${childData.studentİmage}" alt="student">
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-thought">
                    <h3>${childData.studentName}</h3>
                    <h6>${childData.studentWork}</h6>
                    <span>${childData.thought}</span>
                </div>
              </div>            
            </div>
        `);

        div.attr('class', 'thought');
        $('.student-slider').append(div)


    });
    $('.student-slider').slick({
        infinite: true,
        accessibility: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 2000,
    });
}, {
    onlyOnce: true
})