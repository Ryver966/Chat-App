const DBconfig = {
    apiKey: "AIzaSyDMu9HckPqtfindUTsuldrjIa4wce2jZ2g",
    authDomain: "chat-app-2fe3b.firebaseapp.com",
    databaseURL: "https://chat-app-2fe3b.firebaseio.com",
    storageBucket: "chat-app-2fe3b.appspot.com",
    messagingSenderId: "694196290722"
};
firebase.initializeApp(DBconfig);

const auth = firebase.auth();
const newAccModal = document.getElementsByClassName('created-acc-scr-modal')[0];

function pressEnter(event, element) {
    const x = event.keyCode;
    if (x === 13) {
        const button = document.getElementsByClassName(element)[0];
        button.click();
    };
};

const firebaseRef = firebase.database();

function signIn() {
    const userName = document.getElementsByName('userInput')[0];
    const pass = document.getElementsByName('userInput')[1];
    auth.signInWithEmailAndPassword(userName.value, pass.value)
        .then(function (success) {
            window.location.href = './chat.html';
        })
        .catch(function (error) {
            console.log(error);
            if (error.code === 'auth/wrong-password') {
                alert(error.message);
            }
        });
}

const signInForm = document.getElementsByClassName('sign-in-form')[0];
const signUpForm = document.getElementsByClassName('sign-up-form')[0];
const recPassForm = document.getElementsByClassName('recover-password-form')[0];

function setDisplayElem(displayElement, noDisplayElement) {
    document.getElementsByClassName(noDisplayElement)[0].style.display = 'none';
    document.getElementsByClassName(displayElement)[0].style.display = 'block';
};

function newAcc() {
    const newUserEmail = document.getElementsByName('signUpInput')[0];
    const newUserPass = document.getElementsByName('signUpInput')[1];
    const newUserConfPass = document.getElementsByName('signUpInput')[2];
    if (newUserEmail.value.length !== 0 && newUserConfPass.value.length !== 0 && newUserPass.value.length !== 0) {
        if (newUserPass.value !== newUserConfPass.value) {
            alert("Passwords aren't the same");
        } else {
            auth.createUserWithEmailAndPassword(newUserEmail.value, newUserPass.value)
                .then(function () {
                    newAccModal.style.display = 'block';
                })
                .catch(function (error) {
                    console.log('register error', error);
                    if (error.code === 'auth/email-already-in-use' || error.code === 'auth/weak-password') {
                        alert(error.message);
                    }
                });
        }
    } else {
        alert('Something gone wrong, check all fields')
    }
}

window.onclick = function (event) {
    if (event.target === newAccModal || event.target === document.getElementsByClassName('created-acc-scr')[0]) {
        location.reload();
    }
}