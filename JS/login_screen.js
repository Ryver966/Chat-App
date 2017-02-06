function pressEnter(event, element){
    const x = event.keyCode;
    if(x === 13){
        const button = document.getElementsByClassName(element)[0];
        button.click();
    };
};

function signIn (){
    const firebaseRef = firebase.database().ref();
    firebaseRef.child('User').set('value');
}