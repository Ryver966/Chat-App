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
const userName = document.getElementsByName('UserNameInput')[0];

function pressEnter(event, element){
    if(event.keyCode === 13){
        console.log(event.keyCode)
        document.getElementsByClassName(element)[0].click();
    }
}
function signIn() {
    if(userName.value.length === 0){
        alert('You need to lead user name');
    } else {
        document.getElementsByClassName('welcome-scr')[0].style.display = 'none';
        document.getElementsByName('ToolbarTxt')[0].innerHTML = `You are logged as: ${userName.value}`;
        firebase.auth().signInAnonymously();
    }
}

firebase.auth().onAuthStateChanged(firebaseUser => {
    console.log(firebaseUser);
})

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
        firebaseRef.ref('Servers/' + newServerName.value).set({Canals: 'Canals'});
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

function joinServer(){
    const joinServerInput = document.getElementsByClassName('create-server-input')[1];
    firebaseRef.ref('Servers/' + joinServerInput + '/Members').set({})
}

function createMsgInDatabase(name, msg){
    firebaseRef.ref(`message`).push({
        UserName: name,
        Msg: msg
    })
};

function displayMsg(){
    firebaseRef.ref(`message`).on('child_added', function(snapshot) {
        const snap = snapshot.val();
        console.log(snap.Msg);
        const msgPlace = document.getElementsByClassName('messages-place')[0];
        const message = document.createElement('p');
        message.className = 'msg';
        message.innerHTML = `${snap.UserName}: ${snap.Msg}`;
        msgPlace.appendChild(message);
        msgPlace.appendChild(document.createElement('hr'));
    })
}

function sendMsg() {
    const msgInput = document.getElementsByName('ChatInput')[0];
    createMsgInDatabase(userName.value, msgInput.value);
    msgInput.value = '';
}
displayMsg();