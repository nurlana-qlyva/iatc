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

        $("#push-inner").append(tr);

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
            <div class="course-image">
                <img src="${childData.course_image}" alt="course">
            </div>
            <div class="about-course">
                <h4>${childData.course_name}</h4>
                <p>${childData.teacher_name}</p>
                <ul>
                    <li><i class="fa fa-solid fa-laptop-code"></i> ${childData.course_term}</li>
                    <li><i class="fa fa-solid fa-user"></i> ${childData.student_number}</li>
                </ul>
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
              breakpoint: 1008,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 780,
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