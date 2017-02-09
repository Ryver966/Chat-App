// Initialize Firebase
const config = {
    apiKey: "AIzaSyDMu9HckPqtfindUTsuldrjIa4wce2jZ2g",
    authDomain: "chat-app-2fe3b.firebaseapp.com",
    databaseURL: "https://chat-app-2fe3b.firebaseio.com",
    storageBucket: "chat-app-2fe3b.appspot.com",
    messagingSenderId: "694196290722"
};
firebase.initializeApp(config);

const modal = document.getElementsByClassName('modal')[0];
function addServerWindow(){
    modal.style.display = 'block';
};

window.onclick = function(event) {
    if(event.target === modal){
        modal.style.display = 'none';
    }
}