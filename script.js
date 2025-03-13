// 스크롤 비디오 제어 (OXMAN 스타일)
document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("[data-scroll-video]");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => observer.observe(video));
});