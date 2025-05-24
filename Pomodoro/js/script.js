//DOM
//Select elements
const workSwitch = document.getElementById("work");
const breakSwitch = document.getElementById("break");
const longBreakSwitch = document.getElementById("long-break");
const timerInput = document.getElementById("timer");
const taskTextBox = document.getElementById("enter-task-textbox");
const taskInput = document.getElementById("task-input");
let clockState = document.getElementById("clock-state");
const showSession = document.getElementById("show-session");
let showTask = document.getElementById("show-task");


//Timer
let timer;
let minutes;
let seconds;
let isPaused = false;
let currentTab;
let sessionCount = 1;

//Buttons
const startButton = document.getElementById("start-button");
const endButton = document.getElementById("end-button");

//Function for clock countdown
function startTimer() {
    timer = setInterval(timerCount, 1000);
    if (!currentTab) currentTab = "work";
    startButton.classList.remove("active");
    startButton.classList.add("inactive");
    endButton.classList.remove("inactive");
    endButton.classList.add("active");
}

function endTimer() {
    clearInterval(timer);
    showTask.innerHTML = "";
    taskInput.value = "";
    if (currentTab == "work") {
        workMode();
    }
    if (currentTab == "break") {
        breakMode();
    }
    if (currentTab == "long-break") {
        longBreakMode();
    }
    startButton.classList.remove("inactive");
    startButton.classList.add("active");
    endButton.classList.remove("active");
    endButton.classList.add("inactive");
}

function timerCount() {
    let targetedTab;
    console.log(minutes, seconds); // Debug
    if (minutes == 0 && seconds == 0) {
        console.log(currentTab);
        if (currentTab === "work") {
            if (sessionCount === 4) {
                currentTab = "long-break";
                sessionCount = 1;
                console.log("To long break count:" + sessionCount);
            } else {
                currentTab = "break";
                console.log("To break count:" + sessionCount);
            }
        } else if (currentTab === "break" || currentTab === "long-break") {
            currentTab = "work";
            sessionCount++;
            console.log("To work count:" + sessionCount);
        }
        showSession.innerHTML = "Work Session #" + sessionCount;
        switchMode(currentTab);
        console.log("After switch:" + currentTab);
        endTimer();
    return;
}
    if (seconds === 0) {
        if (minutes > 0) {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    timerInput.innerHTML = formatTime(minutes, seconds);
}

function switchMode(currentTab) {
    clearInterval(timer);
    if (currentTab === "work") {
        workMode();
        clockState.innerHTML = "Let's get to work!"
    } else if (currentTab === "break") {
        breakMode();
        clockState.innerHTML = "Time's up! Let's take a break!"
    }
    if (currentTab === "long-break") {
        longBreakMode();
        clockState.innerHTML = "Time to take a long break!"
    }
}

function workMode() {
    minutes = 0;
    seconds = 3;
    timerInput.innerHTML = formatTime(minutes, seconds);
}

function breakMode() {
    minutes = 0;
    seconds = 2;
    timerInput.innerHTML = formatTime(minutes, seconds);
}

function longBreakMode() {
    minutes = 0;
    seconds = 1;
    timerInput.innerHTML = formatTime(minutes, seconds);
}

function formatTime(minutes, seconds) {
    let result;
    result = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    return result;
}

function showTaskInput() {
    const input = taskInput.value;

    if (input.trim() === "") {
        "No task entered. Keep up with your work!"
    }
    else {
        showTask.innerHTML = input;
    }
}

//Event listeners
startButton.addEventListener ("click", () => {
    showTaskInput();
    startTimer();
});

endButton.addEventListener ("click", () =>{
    endTimer();
});

workSwitch.addEventListener ("click", () => {
    currentTab = "work";
    switchMode("work");
});

breakSwitch.addEventListener ("click", () => {
    currentTab = "break";
    switchMode("break");
});

longBreakSwitch.addEventListener ("click", () => {
    currentTab = "long-break";
    switchMode("long-break");
});

//Intial
currentTab = "work";
workMode();
showSession.innerHTML = "Work Session #" + sessionCount;