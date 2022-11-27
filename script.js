const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
msg.text = document.querySelector('[name="text"]').value;
// console.log(msg.text)
function populateVoices(){
    voices = this.getVoices();
    // console.log(voices)
    voicesDropdown.innerHTML = voices.map(element =>
        `<option value="${element.name}">${element.name} (${element.lang})</option>`
        ).join("");
    
}
function setVoice () {
    console.log(this.value)
    msg.voice= voices.find ( element => element.name === this.value)
    toggle();
}

function toggle (flag) {
    speechSynthesis.cancel();
    if(flag){
        speechSynthesis.speak(msg);
    }
    
}
function setOption () {
    console.log(this.name, this.value)
    msg[this.name] = this.value;
    toggle()
}


speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);

options.forEach(option => option.addEventListener("change", setOption));

speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", ()=>toggle(false))
