document.addEventListener("DOMContentLoaded", () => {
    // 다크/라이트 모드
    const themeToggle = document.getElementById("theme-toggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
        }
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    // 초기 테마 설정
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        setTheme(savedTheme === "dark");
    } else {
        setTheme(prefersDark.matches);
    }

    prefersDark.addEventListener("change", e => setTheme(e.matches));

    themeToggle.addEventListener("click", () => {
        const isDark = body.classList.contains("dark-mode");
        setTheme(!isDark);
    });

    // 로고 클릭하여 home으로 이동
    const logo = document.querySelector(".logo");
    logo.addEventListener("click", () => {
        window.location.href = "/";
    });

    // 언어 전환
    const langButtons = document.querySelectorAll(".lang-btn");
    const langContents = {
        en: {
            home: "Welcome to DawonX",
            work: "Featured Projects",
            project1_title: "Parametric Pavilion",
            project1_desc: "Grasshopper-based structural optimization.",
            project2_title: "Algorithmic Patterns",
            project2_desc: "Python generative design.",
            mission: "Our Mission",
            mission_desc: "We aim to innovate design through computational tools, creating sustainable solutions.",
            contact: "Contact",
            contact_email: "Email: <a href='mailto:dawonx@example.com'>dawonx@example.com</a>"
        },
        ko: {
            home: "DawonX에 오신 것을 환영합니다",
            work: "주요 프로젝트",
            project1_title: "파라메트릭 파빌리온",
            project1_desc: "Grasshopper 기반 구조 최적화.",
            project2_title: "알고리즘 패턴",
            project2_desc: "Python 생성 디자인.",
            mission: "우리의 미션",
            mission_desc: "우리는 컴퓨테이셔널 도구를 통해 디자인을 혁신하여 지속 가능한 솔루션을 만듭니다.",
            contact: "연락처",
            contact_email: "이메일: <a href='mailto:dawonx@example.com'>dawonx@example.com</a>"
        }
    };

    function updateLanguage(lang) {
        document.querySelectorAll("[data-lang]").forEach(el => {
            const key = el.getAttribute("data-lang");
            el.innerHTML = langContents[lang][key.replace("-", "_")] || el.innerHTML;
        });
        localStorage.setItem("language", lang);
    }

    const savedLang = localStorage.getItem("language") || "en";
    updateLanguage(savedLang);
    langButtons.forEach(btn => {
        btn.classList.toggle("active", btn.id === `lang-${savedLang}`);
        btn.addEventListener("click", () => {
            langButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const lang = btn.id.split("-")[1];
            updateLanguage(lang);
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
    setInterval(updateBackground, 60000);

    // 모바일 메뉴 토글
    const menuToggle = document.getElementById("menu-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");
    menuToggle.addEventListener("click", () => {
        dropdownMenu.classList.toggle("active");
    });

    // html안보이게
    if (window.location.pathname.includes(".html") && !window.location.hash) {
        const cleanPath = window.location.pathname.replace(".html", "");
        window.history.replaceState({}, document.title, cleanPath);
    }
});