const songs = [
    { file: 'storage/song.mp3', title: 'øfdream - thelema' },
    { file: 'storage/song7.mp3', title: 'niteboi - u.' },
    { file: 'storage/song3.mp3', title: 'mr.kitty - after dark' },
    { file: 'storage/song5.mp3', title: 'ari abdul - babydoll' },
    { file: 'storage/song2.mp3', title: 'crystal castles - transgender' },
    { file: 'storage/song8.mp3', title: 'artemas - i like the way you kiss me' },
    { file: 'storage/song4.mp3', title: 'darci - on my own' },
    { file: 'storage/song6.mp3', title: 'mgmt - little dark age' },
];


let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById('audioPlayer');
const songTitle = document.getElementById('songTitle');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.querySelector('.progress-container');

function handleEntry(e) {
    e.preventDefault();
    window.removeEventListener("touchstart", handleEntry);
    window.removeEventListener("click", handleEntry);
    
    document.querySelector(".before").remove();
    document.querySelector(".after").style.display = "block";
    document.querySelector(".music-player").style.display = "flex";
    
    audioPlayer.src = songs[currentSongIndex].file;
    songTitle.innerHTML = `<span>${songs[currentSongIndex].title}</span>`;
    audioPlayer.play().catch(error => console.log('Autoplay prevented:', error));
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

document.getElementById('prevBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSong();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSong();
});

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        audioPlayer.play().catch(error => console.log('Play failed:', error));
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

function updateSong() {
    audioPlayer.src = songs[currentSongIndex].file;
    songTitle.innerHTML = `<span>${songs[currentSongIndex].title}</span>`;
    if (isPlaying) {
        audioPlayer.play().catch(error => console.log('Autoplay prevented:', error));
    }
}

audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSong();
});

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

// Set progress bar on click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

// Play/Pause functionality
function togglePlay() {
    if (!isPlaying) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlaying = true;
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        isPlaying = false;
    }
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlay);
progressContainer.addEventListener('click', setProgress);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', () => {
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
    progressBar.style.width = '0%';
});

// Handle body click for initial play
document.querySelector('body').addEventListener('click', () => {
    if (!isPlaying) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        isPlaying = true;
        songTitle.textContent = 'Song playing';
    }
});

window.addEventListener("touchstart", handleEntry);
window.addEventListener("click", handleEntry);
