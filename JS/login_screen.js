var config = {
    apiKey: "AIzaSyDMu9HckPqtfindUTsuldrjIa4wce2jZ2g",
    authDomain: "chat-app-2fe3b.firebaseapp.com",
    databaseURL: "https://chat-app-2fe3b.firebaseio.com",
    storageBucket: "chat-app-2fe3b.appspot.com",
    messagingSenderId: "694196290722"
};
firebase.initializeApp(config);
function pressEnter(event, element) {
    const x = event.keyCode;
    if (x === 13) {
        const button = document.getElementsByClassName(element)[0];
        button.click();
    };
};

const firebaseRef = firebase.database();

function signIn() {
    /*const firebaseRef = firebase.database().ref('user');
    console.log(firebaseRef);
    firebaseRef.set('test');*/
}

const signInForm = document.getElementsByClassName('sign-in-form')[0];
const signUpForm = document.getElementsByClassName('sign-up-form')[0];
const recPassForm = document.getElementsByClassName('recover-password-form')[0];

function signUp() {
    signInForm.style.display = 'none';
    signUpForm.style.display= 'block';
};

function backToSignIn() {
    signUpForm.style.display = 'none';
    signInForm.style.display = 'block';
    recPassForm.style.display = 'none';
};

function newAcc() {
    const newUserEmail = document.getElementsByName('signUpInput')[0];
    const newUserName = document.getElementsByName('signUpInput')[1];
    const newUserPass = document.getElementsByName('signUpInput')[2];
    if(newUserEmail.value.length !== 0 && newUserName.value.length !== 0 && newUserPass.value.length !== 0){
        firebaseRef.ref('Users/' + newUserName.value).set({
            Email: newUserEmail.value,
            Password: newUserName.value
        });
        alert('Your account has been created');
    } else {
        alert('Something gone wrong, check all fields')
    }
}

function recoverPassword() {
    signInForm.style.display = 'none';
    recPassForm.style.display = 'block';
}