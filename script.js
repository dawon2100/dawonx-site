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


document.addEventListener("DOMContentLoaded", () => {
    // 기존 애니메이션 및 비디오 코드 유지

    // 아코디언 기능
    const accordionTriggers = document.querySelectorAll(".accordion-trigger");
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const content = trigger.nextElementSibling;
            const isActive = content.classList.contains("active");
            // 모든 아코디언 닫기
            document.querySelectorAll(".accordion-content").forEach(item => item.classList.remove("active"));
            if (!isActive) {
                content.classList.add("active");
            }
        });
    });
});