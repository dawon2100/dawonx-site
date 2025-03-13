document.addEventListener("DOMContentLoaded", () => {
    // 스크롤 비디오 제어
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

    // 애니메이션 트리거
    const animatedElements = document.querySelectorAll("[data-animate]");
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => animateObserver.observe(el));
});