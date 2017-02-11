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
const modalContent = document.getElementsByClassName('modal-content')[0];

function addServerWindow(){
    modal.style.display = 'block';
};

window.onclick = function(event) {
    if(event.target === modal){
        modal.style.display = 'none';
    };
};

function createServerWindow() {
    modalContent.style.display = 'none';
    document.getElementsByClassName('create-server')[0].style.display = 'block';
};

function addServerBtnToList(name){
    const list = document.getElementsByClassName('servers-and-user')[0];
    const newServerBtn = document.createElement('input');
    newServerBtn.type = 'button';
    newServerBtn.className = 'server-btn';
    newServerBtn.name = name;
    newServerBtn.value = name.charAt(0).toUpperCase();
    list.appendChild(document.createElement('br'));
    list.appendChild(newServerBtn);
};

function createServer() {
    const newServerName = document.getElementsByClassName('create-server-input')[0];
    if(newServerName.value.length !== 0){
        firebaseRef.ref('Servers/' + newServerName.value).set({
            Canals: 'Canals',
            Membres: 'Membres'
        });
        addServerBtnToList(newServerName.value);
        alert('Server Created')
    } else {
        alert("Server name field can't be empty");
    };
};

function joinServerWindow() {
    modalContent.style.display = 'none';
    document.getElementsByClassName('join-server')[0].style.display = 'block';
};