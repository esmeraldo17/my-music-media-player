// slecting all required tags and elements

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area"),
repeatBtn = wrapper.querySelector("#repeat-plist"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = wrapper.querySelector("#close"),
ulTag = wrapper.querySelector("ul");

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


// update progress bar width according to de music
mainAudio.addEventListener("timeupdate", (e) => {
     const { currentTime } = e.target;
     const { duration } = e.target;
     let progressWidth = (currentTime / duration) * 100;
     progressBar.style.width = `${progressWidth}%`;

     let musicCurrentTime = wrapper.querySelector(".current"),
     musicDuration = wrapper.querySelector(".duration");

     mainAudio.addEventListener("loadeddata", () => {
        //update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if(totalSec < 10){
            totalSec= `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    })
    
    //update song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec= `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
})

// update progress bar width according to his width
progressArea.addEventListener("click", (e) => {
    let progressWidthValue = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidthValue) * songDuration;
    playMusic();
})

//change repeat button icon and title
repeatBtn.addEventListener("click", () => {
    let getRepeatBtnText = repeatBtn.innerText;

    switch(getRepeatBtnText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
})

//after the song ended 
mainAudio.addEventListener("ended", () => {
    let getRepeatBtnText = repeatBtn.innerText;

    switch(getRepeatBtnText){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex)
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1 );
            console.log(randIndex);
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1 );
            }while(musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
})

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
})

hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
})

allMusic.map((e) => {
    let litag = `<li>
      <div class="row">
          <span>${e.name}</span>
          <p>${e.artist}</p>
      </div>
      <audio class="${e.src}" src="songs/${e.src}.mp3"></audio>
      <span id="${e.src}"class="audio-duration">4:20</span>
    </li>`;

    ulTag.insertAdjacentHTML("beforeend", litag);

    let liAudioTag = ulTag.querySelector(`.${e.src}`);
    let liAudioDuration = ulTag.querySelector(`#${e.src}`);

    liAudioTag.addEventListener("loadeddata", () =>{
        let { duration } = liAudioTag;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if(totalSec < 10){
            totalSec= `0${totalSec}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    })
})
