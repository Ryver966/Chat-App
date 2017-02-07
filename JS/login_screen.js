const config = {
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

function firebaseUser(name, msg, checker, userVal) {
    firebaseRef.ref('Users/' + name + '/' + userVal).on('value', (snapshot) => {
        if (checker !== (snapshot).val()) {
            return alert('Something gone wrong. Please check fields.');
        }
        alert(msg);
        if (userVal === 'Password') {
            window.location.href = './chat.html';
        }
    })

}

function signIn() {
    firebaseUser(
        document.getElementsByName('userInput')[0].value,
        'Logged in!',
        document.getElementsByName('userInput')[1].value,
        'Password'
    )
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
    if (newUserEmail.value.length !== 0 && newUserName.value.length !== 0 && newUserPass.value.length !== 0) {
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
    firebaseUser(document.getElementsByName('recPassInput')[0].value, 'Sent new password.',
        document.getElementsByName('recPassInput')[1].value, 'Email');
}