// Initialize Firebase
const config = {
    apiKey: "AIzaSyDMu9HckPqtfindUTsuldrjIa4wce2jZ2g",
    authDomain: "chat-app-2fe3b.firebaseapp.com",
    databaseURL: "https://chat-app-2fe3b.firebaseio.com",
    storageBucket: "chat-app-2fe3b.appspot.com",
    messagingSenderId: "694196290722"
};
firebase.initializeApp(config);

const DBRef = firebase.database();
modal = document.getElementsByClassName('modal')[0];
modalContent = document.getElementsByClassName('modal-content')[0];
userName = document.getElementsByName('userInput')[0];
auth = firebase.auth();
nameInput = document.getElementsByClassName('welcome-scr-form-input')[0];
createServerScr = document.getElementsByClassName('create-server')[0];
joinServerScr = document.getElementsByClassName('join-server')[0];
serverId = document.getElementsByName('channels')[0];
msgPlace = document.getElementsByClassName('messages-place')[0];

function pressEnter(event, element) {
    if (event.keyCode === 13) {
        console.log(event.keyCode)
        document.getElementsByClassName(element)[0].click();
    }
}

function goChat() {
    if (nameInput.value.length === 0) {
        alert('You must input name');
    } else {
        document.getElementsByClassName('welcome-scr')[0].style.display = 'none';
        document.getElementsByName('ToolbarTxt')[0].innerHTML = `You are logged as: <span style='color:#F97400;'>${nameInput.value}</span>`
    }
}

function addServerWindow() {
    modal.style.display = 'block';
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        createServerScr.style.display = 'none';
        modalContent.style.display = 'block';
    };
};

function createServerWindow() {
    modalContent.style.display = 'none';
    createServerScr.style.display = 'block';
};

function addServerBtnToList() {
    DBRef.ref('Servers/').on('child_added', function (snapshot) {
        const snap = snapshot.val();
        const list = document.getElementsByClassName('servers-and-user')[0];
        const newServerBtn = document.createElement('input');
        newServerBtn.type = 'button';
        newServerBtn.className = 'server-btn';
        newServerBtn.name = snap.Name;
        newServerBtn.onclick = goToServer;
        newServerBtn.value = snap.Name.charAt(0).toUpperCase();
        list.appendChild(document.createElement('br'));
        list.appendChild(newServerBtn);
    });
};
function newServer(name) {
    if (name.length !== 0) {
        DBRef.ref('Servers/' + name).set({
            Name: name,
            messages: 'messages'
        });
        alert('Server Created')
    } else {
        alert("Server name field can't be empty");
    };
};
addServerBtnToList();

function createServer() {
    const newServerName = document.getElementsByClassName('create-server-input')[0];
    newServer(newServerName.value);
}

function createMsgInDatabase(name, msg) {
    DBRef.ref(`Servers/${serverId.innerHTML}/messages`).push({
        UserName: name,
        Msg: msg
    })
};

function displayMsg() {
    DBRef.ref(`Servers/${serverId.innerHTML}/messages`).on('child_added', function (snapshot) {
        const snap = snapshot.val();
        console.log(snapshot.key);
        const message = document.createElement('p');
        message.name = snapshot.key;
        message.className = 'msg';
        message.innerHTML = `<span style='color:#F97400;'>${snap.UserName}:</span> ${snap.Msg}`;
        msgPlace.appendChild(message);
    });
}

function sendMsg() {
    const msgInput = document.getElementsByName('ChatInput')[0];
    const serverId = document.getElementsByName('channels')[0];
    createMsgInDatabase(nameInput.value, msgInput.value);
    msgInput.value = '';
}

function goToServer() {
    if (this.name !== serverId.innerHTML) {
        serverId.innerHTML = this.name;
        msgPlace.innerHTML = '';
        DBRef.ref(`Servers/${serverId.innerHTML}/messages`).off('child_added');
        displayMsg();
    } else {
        console.log('nothing');
    }

}

function signOut() {
    auth.signOut();
    window.location.href = './login_screen.html';
}