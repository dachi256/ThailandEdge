// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Open video modal
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.btn[data-video]').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        modalVideo.src = this.dataset.video;
        videoModal.style.display = 'block';
    });
});



// Close video modal
closeBtn.addEventListener('click', () => {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
});

window.addEventListener('click', event => {
    if (event.target == videoModal) {
        videoModal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
});