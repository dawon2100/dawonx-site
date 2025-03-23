document.addEventListener("DOMContentLoaded", () => {

    const postList = document.getElementById("post-list");
    const urlParams = new URLSearchParams(window.location.search);
    const postParam = urlParams.get('post');
    
    // posts.json 파일 가져오기
    fetch('/posts/posts.json')
      .then(response => response.json())
      .then(posts => {
        // 날짜순 정렬 (최신순)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (postParam) {
          // 특정 포스트 표시 (URL에 ?post=파일명 파라미터가 있는 경우)
          displaySinglePost(postParam);
        } else {
          // 포스트 목록 표시
          displayPostList(posts, postList);
        }
      })
      .catch(error => console.error('포스트 로딩 중 오류:', error));

    // const postList = document.getElementById("post-list");

    // // 블로그 포스트 파일 목록 (GitHub Pages 경로 기준)
    // const posts = [
    //     "posts/sample_1.md",
    //     "posts/sample_2.md"
    // ];

    // posts.forEach(postUrl => {
    //     fetch(postUrl)
    //         .then(response => response.text())
    //         .then(data => {
    //             // Front Matter와 본문 분리
    //             const parts = data.split("---");
    //             const frontMatterRaw = parts[1].trim();
    //             const content = parts[2].trim();

    //             // Front Matter 파싱
    //             const frontMatter = {};
    //             frontMatterRaw.split("\n").forEach(line => {
    //                 const [key, value] = line.split(":").map(part => part.trim());
    //                 frontMatter[key] = value;
    //             });

    //             // Markdown을 HTML로 변환
    //             const htmlContent = marked.parse(content);

    //             // 포스트 항목 생성
    //             const postDiv = document.createElement("div");
    //             postDiv.className = "post-item";
    //             postDiv.innerHTML = `
    //                 <h3>${frontMatter.title}</h3>
    //                 <p class="post-date">${frontMatter.date}</p>
    //                 <div class="post-content">${htmlContent}</div>
    //             `;
    //             postList.appendChild(postDiv);
    //         })
    //         .catch(error => console.error("Error loading post:", error));
    // });




    

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



// 포스트 목록 표시 함수
function displayPostList(posts, container) {
    // 기존 내용을 비우고 다시 생성
    container.innerHTML = '';
    
    // 격자형 레이아웃을 위한 래퍼 추가
    const postGrid = document.createElement('div');
    postGrid.className = 'post-grid';
    container.appendChild(postGrid);
    
    posts.forEach(post => {
      // 포스트 카드 생성
      const postCard = document.createElement('div');
      postCard.className = 'post-item';
      
      // 포스트 제목
      const title = document.createElement('h3');
      title.textContent = post.title;
      
      // 메타 정보 (날짜 및 카테고리)
      const meta = document.createElement('div');
      meta.className = 'post-date';
      meta.textContent = `${post.date} · ${post.category}`;
      
      // 요약 내용
      const summary = document.createElement('div');
      summary.className = 'post-preview';
      summary.textContent = post.summary || post.title;
      
      // 더 읽기 버튼
      const button = document.createElement('button');
      button.className = 'read-more-btn';
      button.textContent = 'Read More';
      button.addEventListener('click', () => {
        window.location.href = `blog.html?post=${post.path}`;
      });
      
      // 포스트 카드 전체 영역 클릭 가능하게 만들기
      postCard.addEventListener('click', (e) => {
        // 버튼을 직접 클릭한 경우 중복 실행 방지
        if (e.target !== button) {
          window.location.href = `blog.html?post=${post.path}`;
        }
      });
      
      // 요소들 추가
      postCard.appendChild(title);
      postCard.appendChild(meta);
      postCard.appendChild(summary);
      postCard.appendChild(button);
      
      // 카드를 그리드에 추가
      postGrid.appendChild(postCard);
    });
  }
  
  // 단일 포스트 표시 함수 
  function displaySinglePost(postPath) {
    // 포스트 컨테이너 가져오기
    const postList = document.getElementById("post-list");
    
    // 블로그 제목 변경
    const blogTitle = document.querySelector('#blog h2');
    blogTitle.textContent = 'Article';
    
    // 마크다운 파일 가져오기
    fetch(`/posts/${postPath}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('포스트를 찾을 수 없습니다');
        }
        return response.text();
      })
      .then(markdown => {
        // 포스트 컨테이너 생성
        const postContainer = document.createElement('div');
        postContainer.className = 'single-post';
        
        // 뒤로가기 버튼
        const backButton = document.createElement('button');
        backButton.id = 'back-to-list';
        backButton.innerHTML = '← Back to Blog';
        backButton.addEventListener('click', () => {
          window.location.href = 'blog.html';
        });
        
        // 마크다운을 HTML로 변환 (marked.js 사용)
        const content = document.createElement('div');
        content.className = 'post-content';
        content.innerHTML = marked.parse(markdown);
        
        // 요소들 추가
        postContainer.appendChild(backButton);
        postContainer.appendChild(content);
        
        // 목록 대신 포스트 표시
        postList.innerHTML = '';
        postList.appendChild(postContainer);
        
        // 페이지 제목 업데이트 (첫 번째 H1 태그에서 가져옴)
        const firstHeading = content.querySelector('h1');
        if (firstHeading) {
          document.title = `DawonX | ${firstHeading.textContent}`;
        }
      })
      .catch(error => {
        console.error('포스트 로딩 중 오류:', error);
        postList.innerHTML = `
          <div class="error-message">
            <h3>포스트를 찾을 수 없습니다</h3>
            <p>${error.message}</p>
            <button id="back-to-list" onclick="window.location.href='blog.html'">← Back to Blog</button>
          </div>
        `;
      });
  }