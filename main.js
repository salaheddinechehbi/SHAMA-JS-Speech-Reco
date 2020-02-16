
const startTalk = document.querySelector('.startTalk');
const stopTalk = document.querySelector('.stopTalk');
const content = document.querySelector('.content');
const openBrowser = document.querySelector('.openBrowser');

const ataa = ['hello salah','hey good to see you again','hey salah i miss you'];
const greetings = ['Im good Asadiki and you','labas and you','leave me alone'];
const Weathers = ['Weather is fine','You need to go out and see'];
const mornings = ['good morning','good morning how are you'];
const helps = ['yes i am here for you','yes i am here for that','yes what do you need'];
var urls = {
    'Instagram':'https://www.instagram.com/?hl=fr',
    'Facebook':'https://fr-fr.facebook.com/',
    'Google':'https://www.google.fr/',
    'Youtube':'https://www.youtube.com/',
    'Tweeter':'https://twitter.com/login?lang=fr'
}

try {

    //The first thing we need to do is check if the user has access to the API and show an appropriate error message.
    //Unfortunately, the speech-to-text API is supported only in Chrome and Firefox (with a flag),
    //so a lot of people will probably see that message.
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    //The recognition variable will give us access to all the API's methods and properties.
    //There are various options available but we will only set recognition.continuous to true.
    //This will enable users to speak with longer pauses between words and phrases.
    recognition.continuous = true;

    
    //Before we can use the voice recognition, we also have to set up a couple of event handlers.
    //Most of them simply listen for changes in the recognition status:
    recognition.onstart = function(){
        console.log("voice activated !!!!!!");
    }
    
    //There is, however, a special onresult event that is very crucial.
    //It is executed every time the user speaks a word or several words in quick succession,
    //giving us access to a text transcription of what was said.

    //When we capture something with the onresult handler we save it in a global variable and display it in a textarea:
    
    recognition.onresult = function(event){
        //console.log(event);
        // event is a SpeechRecognitionEvent object.
        // It holds all the lines we have captured so far. 
        // We only need the current one.
        const current = event.resultIndex;
        // Get a transcript of what was said.
        const transcript = event.results[current][0].transcript;
        content.textContent = transcript;
        readOut(transcript);
    } 

    function readOut(message){

        const speech = new SpeechSynthesisUtterance();
        let url = "";
        console.log(message);
        let txt = "sorry what";
        let win;

        if(message.includes('hello shama') || message.includes('hello Shama') || message.includes('hello saba')|| message.includes('hey shama') || message.includes('hey Shama') || message.includes('hey saba') || message.includes('hey') || message.includes('Hello shama') || message.includes('Hello') || message.includes('Hello Shama')|| message.includes('Hey shama') || message.includes('Hey Shama') || message.includes('Hey saba') || message.includes('Hey') || message.includes('Hello Shama') ){
            txt =   ataa[Math.floor(Math.random() * ataa.length)];
        }else if(message.includes('good morning')){
            txt =   mornings[Math.floor(Math.random() * mornings.length)];
        }else if(message.includes('how are you')){
            txt =   greetings[Math.floor(Math.random() * greetings.length)];
        }else if(message.includes('need your help') || message.includes('can you help me')){
            txt =   helps[Math.floor(Math.random() * helps.length)];
        }else if(message.includes('i need you') || message.includes('I need you')){
            txt =   helps[Math.floor(Math.random() * helps.length)];
        }else if(message.includes('Instagram') || message.includes('open Instagram') || message.includes('open Insta')|| message.includes('Insta')|| message.includes('Open Instagram')){
            url = "https://www.instagram.com/?hl=fr";win = window.open(url, '_blank');win.focus();txt ="ok";
        }else if(message.includes('Facebook') || message.includes('open Facebook') || message.includes('open Face')|| message.includes('Face')|| message.includes('Open Facebook')){
            url = "https://fr-fr.facebook.com/";win = window.open(url, '_blank');win.focus();txt ="ok";
        }else if(message.includes('Twitter') || message.includes('open Twitter') || message.includes('Open Twitter')){
            url = "https://twitter.com/";win = window.open(url, '_blank');win.focus();txt ="ok";
        }else if(message.includes('YouTube') || message.includes('open YouTube') || message.includes('Open YouTube')){
            url = "https://www.youtube.com/";win = window.open(url, '_blank');win.focus();txt ="ok";
        }else if(message.includes('Google') || message.includes('open Google') || message.includes('Open Google')){
            url = "https://www.google.fr";win = window.open(url, '_blank');win.focus();txt ="ok";
        }else if(message.includes('Search for') || message.includes('search for')){
            //var res = str.slice(7,13);
            let search = message.slice(11);url = "https://www.google.com/search?q="+search;win = window.open(url, '_blank');win.focus();
            console.log(""+search);txt ="ok";
        }

        speech.text = txt;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        console.log(txt);
        window.speechSynthesis.speak(speech);
    }

    //add the listener to the btns

    //Once we have everything set up we can start using the browser's voice recognition feature.
    //To start it simply call the start() method:
    startTalk.addEventListener('click' , () => {
        recognition.start();
    });

    stopTalk.addEventListener('click' , () => {
        recognition.stop();
        console.log("voice desactivated !!!!!!");
    });

} catch (error) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}

