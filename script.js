document.addEventListener("DOMContentLoaded", function () {
    try { document.documentElement.classList.remove('no-js'); document.documentElement.classList.add('js'); } catch(e){}

    try {
        const projectContainer = document.getElementById("project-container");
        const loadingEl = document.getElementById("project-loading");
        const fallbackEl = document.getElementById("project-fallback");
        const filterButtons = Array.from(document.querySelectorAll(".filter-buttons .btn"));
        const projectsSection = document.getElementById("projects");

        if (!projectContainer) {
            console.error("Project container not found - aborting project load.");
            if (fallbackEl) fallbackEl.style.display = "block";
            return;
        }

        const projects = [
            { "title": "Phishing Site", "description": "A PHP-based fake login page that sends captured data to a Discord webhook.", "category": "PHP", "link": "https://github.com/B15cu1t/Phishing_Website/", "image": "" },
            { "title": "Password Cracker", "description": "A Batch script that brute-forces passwords for ZIP files using a wordlist.", "category": "Batch", "link": "https://github.com/B15cu1t/Password_Cracker", "image": "" },
            { "title": "Subdomain Enumerator", "description": "A python script that lists through a wordlist and finds existing subdomains on a website and saves them into a file.", "category": "Python", "link": "https://github.com/B15cu1t/Subdomain_Enumerator", "image": "" },
            { "title": "DNS enumerator", "description": "A python script that finds record types for a website.", "category": "Python", "link": "https://github.com/B15cu1t/DNS_Enumerator", "image": "" },
            { "title": "Geo-Locator", "description": "A C# WinForms app that uses a public API to locate servers via DNS or IP.", "category": "C#", "link": "#", "image": "" },
            { "title": "Client-Server Communtication", "description": "A local based server, with a local communtication between users.", "category": "Python", "link": "https://github.com/B15cu1t/Client-Server-Communication", "image": "" },
            { "title": "Desktop File Organizer (Automation Script)", "description": "Automates desktop cleanup by detecting file types and sorting them into organized folders (Images, Videos, Music, Documents, Apps, Games).", "category": "Python", "link": "https://github.com/B15cu1t/Desktop-File-Organizer-Automation-Script-", "image": "" },
            { "title": "QR Code Generator", "description": "Generates QR codes from any input text or URL.", "category": "Python", "link": "#", "image": "" },
            { "title": "GIF Creator", "description": "Combines multiple images to create animated GIFs.", "category": "Python", "link": "#", "image": "" }, 
            { "title": "Guess the Word Game", "description": "A word-guessing game with a fancy UI.", "category": "Python", "link": "#", "image": "" },
            { "title": "Discord Tag Bot", "description": "A bot to automate tagging friends on Discord.", "category": "Python", "link": "#", "image": "" },
            { "title": "Tetris Game", "description": "A classic Tetris game implemented using Tkinter.", "category": "Python", "link": "https://github.com/B15cu1t/Tetris_Game", "image": "" },
            { "title": "Neon Chase", "description": "Python mini-game about a square being chased by a circle.", "category": "Python", "link": "#", "image": "" },
             ];

        function createProjectHTML(project) {
            const img = project.image && project.image.trim() ? project.image : "https://via.placeholder.com/600x340?text=No+Image";
            return `
                <div class="project-card card h-100">
                    <img src="${img}" class="card-img-top" alt="${project.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <div class="mt-3">
                            <a href="${project.link}" class="btn btn-accent">View Project</a>
                        </div>
                    </div>
                </div>
            `;
        }

        function displayProjects(filter) {
            projectContainer.innerHTML = "";
            const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);
            if (filtered.length === 0) {
                projectContainer.innerHTML = `<div class="col-12 text-center text-light"><p>No projects found.</p></div>`;
                return;
            }

            filtered.forEach((project, i) => {
                const col = document.createElement("div");
                col.className = "col-12 col-md-4 d-flex";
                col.innerHTML = createProjectHTML(project);
                projectContainer.appendChild(col);

                const card = col.querySelector(".project-card");
                if (card) {
                    card.classList.add("fade-in");
                    void card.offsetWidth;
                    setTimeout(() => {
                        card.style.opacity = "";
                    }, 50 + i * 80);
                }
            });
        }

        if (loadingEl) loadingEl.style.display = "none";
        if (fallbackEl) fallbackEl.style.display = "none";

        displayProjects("all");

        if (filterButtons.length) {
            filterButtons.forEach(btn => {
                btn.addEventListener("click", function () {
                    filterButtons.forEach(b => b.classList.remove("active"));
                    this.classList.add("active");
                    const filter = this.dataset.filter || "all";
                    displayProjects(filter);
                    if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
                });
            });
        }

        const fadeSections = Array.from(document.querySelectorAll(".fade-in-section"));
        fadeSections.forEach((el, idx) => {
            setTimeout(() => el.classList.add("visible"), 80 + idx * 80);
        });

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
            fadeSections.forEach(s => observer.observe(s));
        }

        const themeToggle = document.getElementById("theme-toggle");
        try {
            const stored = localStorage.getItem("teo_theme");
            if (stored === "light") document.body.classList.add("light-mode");
            if (themeToggle) {
                themeToggle.addEventListener("click", () => {
                    document.body.classList.toggle("light-mode");
                    const isLight = document.body.classList.contains("light-mode");
                    try { localStorage.setItem("teo_theme", isLight ? "light" : "dark"); } catch(e){}
                });
            }
        } catch (e) {
            console.warn("Theme persistence not available", e);
        }

        try {
            if (window.particlesJS && document.getElementById("particles-js")) {
                particlesJS("particles-js", {
                    "particles": {
                        "number": {"value": 40},
                        "size": {"value": 3},
                        "move": {"speed": 1},
                        "line_linked": {"enable": true, "distance": 120, "opacity": 0.06}
                    }
                });
            }
        } catch (e) {
            console.warn("Particles failed to initialize:", e);
        }

        const backToTop = document.getElementById("back-to-top");
        if (backToTop) {
            window.addEventListener("scroll", () => backToTop.classList.toggle("show", window.scrollY > 400));
            backToTop.addEventListener("click", (ev) => {
                ev.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

    } catch (err) {
        console.error("Error in portfolio script:", err);
        const fallback = document.getElementById("project-fallback");
        if (fallback) fallback.style.display = "block";
    }
});
