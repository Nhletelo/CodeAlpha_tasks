let currentIndex = 0;
const images = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// --- the LIGHTBOX FUNCTIONS ---
function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "block";
    updateLightbox();
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function changeSlide(n) {
    currentIndex += n;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    updateLightbox();
}

function updateLightbox() {
    lightboxImg.src = images[currentIndex].src;
}

// --- the FILTER FUNCTIONS ---
function filterSelection(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.btn');

    // This is the method to set the active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === category) btn.classList.add('active');
    });

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

window.onclick = function(event) {
    if (event.target == lightbox) {
        closeLightbox();
    }
}