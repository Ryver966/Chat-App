window.onload = function () {
    const config = {
        apiKey: "AIzaSyDMu9HckPqtfindUTsuldrjIa4wce2jZ2g",
        authDomain: "chat-app-2fe3b.firebaseapp.com",
        databaseURL: "https://chat-app-2fe3b.firebaseio.com",
        storageBucket: "chat-app-2fe3b.appspot.com",
        messagingSenderId: "694196290722"
    };
    firebase.initializeApp(config);
}

function pressEnter(event, element){
    const x = event.keyCode();
    if(x === 13){
        const button = document.getElementsByClassName(element)[0];
        button.clicked();
    }
}