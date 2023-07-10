// slecting all required tags and elements

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector('.play-pause');

let musicIndex = 2;

window.addEventListener("load", () => {
    loadMusic(musicIndex);//call loadMusic function once winddow load
});

//load music function
const loadMusic = (index) => {
    musicName.innerText = allMusic[index - 1].name;
    musicArtist.innerText= allMusic[index - 1].artist;
    musicImg.src = `images/${allMusic[index -1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[index -1].src}.mp3`;
};

// playMusic
const playMusic = () => {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

// puseMusic
const pauseMusic = () => {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// play button
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    //if isMusicPaused is true then call pauseMusic else call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
})