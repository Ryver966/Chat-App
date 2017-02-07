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

function setDisplayElem(displayElement, noDisplayElement) {
    document.getElementsByClassName(noDisplayElement)[0].style.display = 'none';
    document.getElementsByClassName(displayElement)[0].style.display = 'block';
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

function recoveryPassword() {
    const userName = document.getElementsByName('recPassInput')[0];
    const userMail = document.getElementsByName('recPassInput')[1];
    const firebaseUserEmail = firebaseRef.ref('Users/' + userName.value + '/Email').on('value', snap => {
        const checkUserEmail = snap.val();
    });
    console.log(firebaseUserEmail.value);
}