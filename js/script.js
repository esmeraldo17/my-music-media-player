// slecting all required tags and elements

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next");

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

// playMusic function
const playMusic = () => {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

// puseMusic function
const pauseMusic = () => {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// nextMusic function
const nextMusic = () => {
    musicIndex ++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// prevMusic function
const prevMusic = () => {
    musicIndex --;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// play button event
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    //if isMusicPaused is true then call pauseMusic else call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
})

// next button event
nextBtn.addEventListener("click", () => {
    nextMusic();
})

// prev button event
prevBtn.addEventListener("click", () => {
    prevMusic();
})
