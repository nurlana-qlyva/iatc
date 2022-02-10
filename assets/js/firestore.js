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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


function getEvent() {


    // event
    db.collection("events").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const div = document.createElement("div");
            div.innerHTML = `
                    <div class="news-card">
                        <a href="./event.html?event=${doc.id}">
                            <div class="body-card">
                                <div class="image-card">
                                    <img src="${doc.data().photo}" class="card-img-top" alt="">
                                </div>
                                <div class="header-card">
                                    <h4>${doc.data().name}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
            `
            div.classList.add('col-md-4')
            document.querySelector('.data').appendChild(div);
        });
    });
}

getEvent()