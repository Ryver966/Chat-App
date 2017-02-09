// Initialize Firebase
const config = {
    apiKey: "AIzaSyDMu9HckPqtfindUTsuldrjIa4wce2jZ2g",
    authDomain: "chat-app-2fe3b.firebaseapp.com",
    databaseURL: "https://chat-app-2fe3b.firebaseio.com",
    storageBucket: "chat-app-2fe3b.appspot.com",
    messagingSenderId: "694196290722"
};
firebase.initializeApp(config);

const firebaseRef = firebase.database();
const modal = document.getElementsByClassName('modal')[0];
function addServerWindow(){
    modal.style.display = 'block';
};

window.onclick = function(event) {
    if(event.target === modal){
        modal.style.display = 'none';
    };
};

const modalContent = document.getElementsByClassName('modal-content')[0];
function createServerWindow() {
    modalContent.style.display = 'none';
    document.getElementsByClassName('create-server')[0].style.display = 'block';
};

function createServer() {
    const newServerName = document.getElementsByClassName('create-server-input')[0];
    if(newServerName.value.length !== 0){
        firebaseRef.ref('Servers/' + newServerName.value).set({Canals: 'Canals'});
        alert('Server Created')
    } else {
        alert("Server name field can't be empty");
    };
};