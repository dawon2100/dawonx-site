document.addEventListener("DOMContentLoaded", () => {
    // 애니메이션
    const animatedElements = document.querySelectorAll("[data-animate]");
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => animateObserver.observe(el));

    // 부드러운 해시 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                history.pushState(null, null, this.getAttribute("href"));
            }
        });
    });

    // 페이지 로드 시 해시 처리
    window.addEventListener("load", () => {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});