
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const ataa = ['hello salah','hello my love','hey good to see you again','hey salah i miss you'];
const greetings = ['Im goog you Asadiki ad you','labas and you','leave me alone'];
const Weathers = ['Weather is fine','You eed to go out and see'];
const mornings = ['good morning','good morning how are you'];
const helps = ['yes i am here for you','yes i am here for that','yes what do you need'];

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
    recognition.onstart = function() { 
        instructions.text('Voice recognition activated. Try speaking into the microphone.');
    }

    recognition.onspeechend = function() {
        instructions.text('You were quiet for a while so voice recognition turned itself off.');
    }
      
    recognition.onerror = function(event) {
        if(event.error == 'no-speech') {
          instructions.text('No speech was detected. Try again.');  
        };
    }

    //There is, however, a special onresult event that is very crucial.
    //It is executed every time the user speaks a word or several words in quick succession,
    //giving us access to a text transcription of what was said.

    //When we capture something with the onresult handler we save it in a global variable and display it in a textarea:
    
    recognition.onresult = function(event) {

        // event is a SpeechRecognitionEvent object.
        // It holds all the lines we have captured so far. 
        // We only need the current one.
        var current = event.resultIndex;
      
        // Get a transcript of what was said.
        var transcript = event.results[current][0].transcript;
      
        // Add the current transcript to the contents of our Note.
        content.textContent = transcript;

        readOut(transcript);
      }


    //The above code is slightly simplified. There is a very weird bug on Android devices that causes everything to be repeated twice.
    //There is no official solution yet but we managed to solve the problem without any obvious side effects.
    //With that bug in mind the code looks like this:

    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) {
        content.textContent = transcript;
    }

    //Once we have everything set up we can start using the browser's voice recognition feature.
    //To start it simply call the start() method:
    btn.addEventListener('click' , () => {
        recognition.start();
    });

    $('#pause-record-btn').on('click', function(e) {
        recognition.stop();
    });


    function readOut(message){

        const speech = new SpeechSynthesisUtterance();
        
        speech.text = 'i dont khow what you said';

        if(message.includes('hello sara' || 'hello saha' || 'hello saba'|| 'hey sara' || 'hey saha' || 'hey saba' || 'hey' )){
            const finalText0 =   ataa[Math.floor(Math.random() * greetings.length)];
            speech.text = finalTex0;
        }else if(message.includes('good morning')){
            const finalText1 =   ataa[Math.floor(Math.random() * greetings.length)];
            speech.text = finalTex1;
        }else if(message.includes('how are you')){
            const finalText2 =   greetings[Math.floor(Math.random() * greetings.length)];
            speech.text = finalText2;
        }else if(message.includes('need your help' || 'can you help me')){
            const finalText2 =   helps[Math.floor(Math.random() * greetings.length)];
            speech.text = finalText2;
        }

        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    }

    //recognition.onspeechend = function(event){
    //  console.log(event);
    //}

} catch (error) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}

