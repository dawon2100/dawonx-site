document.addEventListener("DOMContentLoaded", () => {
    // 다크/라이트 모드
    const themeToggle = document.getElementById("theme-toggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
        } else {
            body.classList.add("light-mode");
            body.classList.remove("dark-mode");
        }
    }

    setTheme(prefersDark.matches);
    prefersDark.addEventListener("change", e => setTheme(e.matches));

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        body.classList.toggle("light-mode");
    });

    // 언어 전환
    const langButtons = document.querySelectorAll(".lang-btn");
    const langContents = {
        en: {
            home: "Welcome to DawonX",
            work: "Featured Projects",
            mission: "Our Mission",
            contact: "Contact"
        },
        ko: {
            home: "DawonX에 오신 것을 환영합니다",
            work: "주요 프로젝트",
            mission: "우리의 미션",
            contact: "연락처"
        }
    };

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            langButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const lang = btn.id.split("-")[1];
            document.querySelector(".homepage h1")?.textContent = langContents[lang].home;
            document.querySelector(".work-page h2")?.textContent = langContents[lang].work;
            document.querySelector(".mission-page h2")?.textContent = langContents[lang].mission;
            document.querySelector(".contact-page h2")?.textContent = langContents[lang].contact;
        });
    });

    // 배경 이미지 시간에 따라 변경
    const background = document.querySelector(".background-image");
    function updateBackground() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) {
            background.style.backgroundImage = "url('assets/bg-day.jpg')";
        } else {
            background.style.backgroundImage = "url('assets/bg-night.jpg')";
        }
    }
    updateBackground();
    setInterval(updateBackground, 60000); // 1분마다 갱신

    // 모바일 메뉴 토글
    const menuToggle = document.getElementById("menu-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");
    menuToggle.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });
});