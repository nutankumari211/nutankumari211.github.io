//This is a JavaScript code that updates the time every second and also checks if there is an alarm set at the current time.

const display = document.getElementById('clock');


// set audio for alarm
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');

// when audio.loop is true- It Indicates that the audio should start playing again when it is finished
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // Stores all the alarms being set 



// Plays the alarm audio at correct time
function ringing(now){
    //play() method starts playing the current audio.
    audio.play();
    alert(`Hey! it is ${now}`)
}


// updates time every second 
function updateTime() {
    //new Date() creates a date object with the current date and time
    var today = new Date();
    //getHours() returns the hour (0 to 23) of a date.
    const hour = formatTime(today.getHours());
    //getMinutes() returns the minutes (0 to 59) of a date.
    const minutes = formatTime(today.getMinutes());
    //getSeconds() returns the seconds (0 to 59) of a date.
    const seconds = formatTime(today.getSeconds());

    //The formatted hour, minute, and second values are then concatenated into a string with colons separating them,
    // and assigned to the variable now.
    const now = `${hour}:${minutes}:${seconds}`;

    //this now string is then used to update the innerText of an HTML element with 
    //the id "clock" on the web page, displaying the current time to the user.
    display.innerText=`${hour}:${minutes}:${seconds}`;
    
//     check if the alarmList includes the current time , "now"
//     if yes, ringing() is called
    if(alarmList.includes(now) ){
        ringing(now);
    } 
}


// This function is used to ensure that the hour, minute, and second values are always two digits.
// converts "1:2:3" to "01:02:03"
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


//  this function can be used to stop the currently playing alarm and clear any timeout set for the alarm. 
//It can be called when the user manually stops the alarm or when the alarm time is updated or changed.
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


// removes an alarm from the unordered list and the webpage when "Delete" is clicked
// this code adds a click event listener to an HTML element with the id myList and 
//removes an alarm element from the HTML when the corresponding "Delete" button is clicked.
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete " is clicked
//this function removes an alarm time from the alarmList array by creating a new array with all elements except the specified value,
// clearing the alarmList array, and adding all elements from the new array back to alarmList.
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}



////this function adds a new alarm element to the HTML unordered list by creating an HTML string 
//that represents the alarm element and appending it to the myList element on webpage.
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete</button>       
    </li>`
    myList.innerHTML += html
};


//This is an event listener for the submit event on the addAlarm form element.
// The purpose of the listener is to handle the submission of a new alarm time entered by the user whenever form is submitted.
addAlarm.addEventListener('submit', e=> {

    //The function first calls preventDefault() on the event object 
    //to prevent the default behavior of the form submission, which would cause the page to reload.
    e.preventDefault();

    //Then,the function extracts the user input for the alarm time from the form fields using addAlarm.a_hour.value,
    // addAlarm.a_min.value, and addAlarm.a_sec.value.
    // These values represent the hours, minutes, and seconds of the new alarm, respectively.
    //formatTime function is called each time to change 1 digit to 2,eg 0 to 00
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    
    //This represents the new alarm time in the format "HH:MM:SS".
    const newAlarm = `${new_h}:${new_m}:${new_s}`

//     add newAlarm to alarmList
//First,the function checks whether the newAlarm variable is not a number using isNaN()
    if(isNaN(newAlarm)){
        // If it is not a number, the function proceeds to check whether the alarmList array already includes the new alarm time using alarmList.includes()
        if(!alarmList.includes(newAlarm)){
        //If the new alarm time is not already in the list, the function adds it to the alarmList array using alarmList.push(),     
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            //add the new alarm time to the list displayed on the page. 
            showNewAlarm(newAlarm);
            //the function resets the form using addAlarm.reset().
            addAlarm.reset();
        } else{
            //If the new alarm time is already in the alarmList array, 
            //the function displays an alert message to the user indicating that an alarm for that time is already set.
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        //If the newAlarm variable is a number, the function displays an alert message to the user indicating that an invalid time was entered. 
        alert("Invalid Time Entered")
    }        
})


// calls updateTime() every second
setInterval(updateTime, 1000);
