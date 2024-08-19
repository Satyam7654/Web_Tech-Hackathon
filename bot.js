var sendBtn = document.getElementById('send_button');
var messageContainer = document.getElementById('message_container');
var textBox = document.getElementById('input');
var sentMessage = document.getElementsByClassName('sent_message')[0];
var recievedMessage = document.getElementsByClassName('recieved_message')[0];

function userMessage(messageText){
    var messageElement = document.createElement('div');
    messageElement.classList.add('sent_message')
    messageElement.innerHTML = `<span>${messageText}</span>`;
    messageElement.animate([{easing:"ease-in", opacity:0.4},{opacity:1}],{duration:300});
    messageContainer.appendChild(messageElement);

}



function botMessage(messageText){
    var messageElement = document.createElement('div');
    messageElement.classList.add('recieved_message')
    messageElement.innerHTML = `<span>${messageText}</span>`;
    messageElement.animate([{easing:"ease-in", opacity:0.4},{opacity:1}],{duration:300});
    messageContainer.appendChild(messageElement);
}

setTimeout(function(){
    botMessage("Welcome to E-Vadiya Chat Bot..")
    },5000);



sendBtn.addEventListener('click', function(e){
    if(textBox.value == ""){
        alert('Please Type a Message!!!')
    }
    else{
        let messageText = textBox.value;
        userMessage(messageText);
        if(textBox.value.toLowerCase() === "hello" || textBox.value.toLowerCase() === "hi" ){
            setTimeout(function(){
                botMessage("How can I help You!!")
                },1000);
        }
        else
        {
            setTimeout(function(){
                botMessage("Sorry for the inconvinence")
                botMessage("All the features of bot will be available soon...")
                },1000);
        }
        textBox.value = "";
    }

});
