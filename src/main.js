let isRunning = false;
let startTime;
let currentTime = 0;
let timer = null;
let lastLap = 0;
let lapList = [];


const myDisplay = document.getElementById("myDisplay");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const lapValues = document.getElementById("lapValues");

function startTimer() {
  if (isRunning === false) {
    startTime = Date.now() - currentTime;
    timer = setInterval(update, 10);
    isRunning = true;
    startBtn.textContent = "Pause"
  } else {
    clearInterval(timer);
    elapsedTime = currentTime;
    startBtn.textContent = "Start";
    isRunning = false;
  }
}

function createLap() {
  let thisLap = currentTime - lastLap; // calculates time taken from last recorded lap to present recorded one.
  
  // Conversion from milliseconds to normal time units.
  let seconds = Math.floor(thisLap / 1000)%60;
  let minutes = Math.floor(thisLap / 60000)%60;
  let hours = Math.floor(thisLap / 3600000);
  
  seconds = String(seconds).padStart(2, "0")
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  
  lapList.push(`${hours} : ${minutes} : ${seconds}`);
  
  lapValues.textContent = ""; //resets screen
  lapList.forEach((lap, index) => { // creates new rows and pushes individual list items to each of the rows.
    let row = document.createElement("div");
    row.textContent = lap;
    row.className = "text-xl text-red-800 border-gray-500 p-5 shadow-lg shadow-gray-200 rounded-lg my-2";
    lapValues.append(row);
  })
  lastLap = currentTime; // current time the lap was recorded. to be subtracted from future current value to ascertain lap time.
}

function update() {
  currentTime = Date.now() - startTime;

  let seconds = Math.floor(currentTime / 1000);
  let minutes = Math.floor(currentTime / 60000);
  let hours = Math.floor(currentTime / 3600000);

  seconds = String(seconds).padStart(2, "0")
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");

  myDisplay.textContent = `${hours} : ${minutes} : ${seconds}`;
}

function endTimer() {
  // Set everything to default value.
  isRunning = false;
  clearInterval(timer);
  myDisplay.textContent = `00 : 00 : 00`
  startBtn.textContent = "Start";
  startTime = 0;
  currentTime = 0;
  timer = null;
  lastLap = 0;
  lapList = [];
}