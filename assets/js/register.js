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

// elaqe sehifesindeki melumarin daxil edilmesi ucun

const registerBranch = ref(db, '/iatc/register');

$('#registerBtn').on('click', function(e){
    e.preventDefault();
    var programName = $('#program-name').val();
    var userName = $('#user-name').val();
    var phoneNumber = $('#phone-number').val();
    var emailAddress = $('#email-address').val();
    var aboutUser = $('#about-user').val();

    var regexpUser = new RegExp(/^[a-z, A-Z]+(\s)[a-z,A-Z]+$/);
    var regexpNum = new RegExp(/^[+]+\d+$/);
    var regexpMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if(!regexpUser.test(userName)){
            $("#user-name").attr('class', 'bdred');
            $("#error_name").show();
    }else{
        $("#user-name").attr('class', 'bdgreen');
        $("#error_name").hide();
    }

    if(!regexpNum.test(phoneNumber)){
            $('#phone-number').attr('class', 'bdred');
            $("#error_phone").show();
    }else{
        $('#phone-number').attr('class', 'bdgreen');
        $("#error_phone").hide();
    }
    
    if(!regexpMail.test(emailAddress)){
            $('#email-address').attr('class', 'bdred');
            $("#error_email").show();
    }else{
        $('#email-address').attr('class', 'bdgreen');
        $("#error_email").hide();
    }

    if(regexpUser.test(userName) && regexpNum.test(phoneNumber) && regexpMail.test(emailAddress)) {
        

        var registerArr = push(registerBranch);

        set(registerArr, {
            program_name: programName,
            user_name: userName,
            phone_number: phoneNumber,
            email_address: emailAddress,
            about_user: aboutUser,
        })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your form is accessed!',
            showConfirmButton: true,
        })

        window.setTimeout(function() {
            window.location.reload();
        }, 3000);
    }
});

onValue(registerBranch, function(snapshot){
    var objBanner = snapshot.val();
    
    var tbody = document.querySelector("#push-inner");
    tbody.innerHTML = '';
    var count = 0;

    for(let [key,value] of Object.entries(objBanner)){ 
        var tr = document.createElement('tr');

        var programTd = document.createElement('td');
        var userTd = document.createElement('td');
        var phoneTd = document.createElement('td');
        var emailTd = document.createElement('td');
        var aboutTd = document.createElement('td');

        var edit = document.createElement('td');
        var tdcount = document.createElement('td');

        programTd.innerHTML = value.program_name;
        userTd.innerHTML = value.user_name;
        emailTd.innerHTML = value.email_address;
        phoneTd.innerHTML = value.phone_number;
        aboutTd.innerHTML = value.about_user;

        count++;
        tdcount.innerHTML = count;

        userTd.dataset.key = key;

        edit.innerHTML = '<i class="fas fa-trash-alt"></i>';
        edit.classList.add('delete-btn');

        tr.append(count);
        tr.append(programTd);
        tr.append(userTd);
        tr.append(emailTd);
        tr.append(phoneTd);
        tr.append(aboutTd);
        tr.append(edit);

        tbody.append(tr);

        edit.dataset.key = key;

        edit.onclick = function(){
            remove(ref(db, '/iatc/register/' + this.dataset.key));
        }
    }
});