let anniversary = "2024-02-14";
let today = new Date();

// Parse the anniversary date
let date = new Date(anniversary);

// Calculate the difference in time
let differenceInTime = today.getTime() - date.getTime();

// Calculate the number of days
let days = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

// Function to calculate the exact difference in months and years
function getMonthAndYearDiff(startDate, endDate) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
    
    // Adjust months and years if necessary
    if (days < 0) {
        months--;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months };
}

// Get the exact difference in months and years
let dateDiff = getMonthAndYearDiff(date, today);

// Update the DOM with the calculated values
document.getElementById("days").textContent = days.toString();
document.getElementById("months").textContent = dateDiff.months.toString();
document.getElementById("years").textContent = dateDiff.years.toString();



let musicPlayer = document.querySelector(".music-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".trackname");
let trackArtist = document.querySelector(".trackartist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

let currentTrack = document.createElement("audio");
let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function() {
    isHidden = !isHidden;
    if(isHidden){
        musicPlayer.classList.remove("hide");
        togglePlayer.innerHTML = '<img class="w-[98%]" src="icons/close.svg">';
        trackInfo.style.transitionDelay = "0.4s";
        trackNav.style.transitionDelay = "0.4s";
    } else {
        musicPlayer.classList.add("hide");
        togglePlayer.innerHTML = '<img class="w-full" src="icons/plus.svg">';
        trackInfo.style.transitionDelay = "0s";
        trackNav.style.transitionDelay = "0s";
    }
});

let soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: "svg",
    loop: true,
    autoPLay: false,
    path: "https://lottie.host/9ec12a7e-e429-453a-9f22-a2af1dcb4dca/2zeuy4rwtP.json",
});


let trackList = [
    {
        name: "blue",
        artist: "yung kai",
        path: "./songs/blue.mp3",
    },
    {
        name: "home",
        artist: "luke chiang",
        path: "./songs/home.mp3",
    },
    {
        name: "ride",
        artist: "hybs",
        path: "./songs/ride.mp3",
    },
];

// EVENT LISTENERS
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

function loadTrack(trackIndex){
    currentTrack.src = trackList[trackIndex].path;
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.addEventListener("ended", nextTrack);
    currentTrack.load();
}

loadTrack(trackIndex);

function playPauseTrack(){
    if(isPlaying == false){
        playTrack();
    }else{
        pauseTrack();
    }
}

function playTrack(){
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/pause.svg">';
    soundBarsLottie.play();
}

function pauseTrack(){
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/play.svg">';
    soundBarsLottie.stop();
}

function nextTrack(){
    if(trackIndex < trackList.length - 1){
        trackIndex += 1;
        loadTrack(trackIndex);
        playTrack();
    }else{
        trackIndex = 0;
        loadTrack(trackIndex);
        playTrack();
    } 
}

function prevTrack(){
    if(trackIndex > 0){
        trackIndex -= 1;
        loadTrack(trackIndex);
        playTrack();
    }else{
        trackIndex = trackList.length - 1;
        loadTrack(trackIndex);
        playTrack();
    }
}