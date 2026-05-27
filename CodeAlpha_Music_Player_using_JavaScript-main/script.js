const music = new Audio();
const songs = [
    { name: 'Canadian Rockies', artist: 'Lawren Harris', cover: 'https://picsum.photos/id/1/200', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { name: 'Canadian Shield', artist: 'A.Y. Jackson', cover: 'https://picsum.photos/id/2/200', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { name: 'La Cloche hills', artist: 'Arthur Lismer', cover: 'https://picsum.photos/id/3/200', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
];

let songIndex = 0;
let isPlaying = false;

// DOM Elements
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');

// --- FUNCTIONS ---

function loadSong(song) {
    title.innerText = song.name;
    artist.innerText = song.artist;
    music.src = song.url;
    cover.src = song.cover;
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar & Time
function updateProgress(e) {
    if (isPlaying) {
        const { duration, currentTime } = music;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        
        if (durationSeconds) {
            durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar manually
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Volume
volumeSlider.addEventListener('input', (e) => {
    music.volume = e.target.value;
});

// --- EVENT LISTENERS ---
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
music.addEventListener('ended', nextSong); // Autoplay Next

// Initialize
loadSong(songs[songIndex]);

// Bonus: Render Playlist
const playlistEl = document.getElementById('playlist');
songs.forEach((song, index) => {
    const div = document.createElement('div');
    div.classList.add('playlist-item');
    div.innerText = `${song.name} - ${song.artist}`;
    div.onclick = () => {
        songIndex = index;
        loadSong(songs[songIndex]);
        playSong();
    };
    playlistEl.appendChild(div);
});