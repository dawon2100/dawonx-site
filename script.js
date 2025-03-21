document.addEventListener("DOMContentLoaded", () => {

    const postList = document.getElementById("post-list");

    // 블로그 포스트 파일 목록 (GitHub Pages 경로 기준)
    const posts = [
        "posts/sample_1.md",
        "posts/sample_2.md"
    ];

    posts.forEach(postUrl => {
        fetch(postUrl)
            .then(response => response.text())
            .then(data => {
                // Front Matter와 본문 분리
                const parts = data.split("---");
                const frontMatterRaw = parts[1].trim();
                const content = parts[2].trim();

                // Front Matter 파싱
                const frontMatter = {};
                frontMatterRaw.split("\n").forEach(line => {
                    const [key, value] = line.split(":").map(part => part.trim());
                    frontMatter[key] = value;
                });

                // Markdown을 HTML로 변환
                const htmlContent = marked.parse(content);

                // 포스트 항목 생성
                const postDiv = document.createElement("div");
                postDiv.className = "post-item";
                postDiv.innerHTML = `
                    <h3>${frontMatter.title}</h3>
                    <p class="post-date">${frontMatter.date}</p>
                    <div class="post-content">${htmlContent}</div>
                `;
                postList.appendChild(postDiv);
            })
            .catch(error => console.error("Error loading post:", error));
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

 
});