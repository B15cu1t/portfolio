document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        { title: "Subdomain Enumerator", desc: "A python script that lists through a wordlist and finds existing subdomains on a website.", tech: "Python", type: "main", link: "https://github.com/B15cu1t/Subdomain_Enumerator" },
        { title: "DNS enumerator", desc: "A python script that finds record types for a website.", tech: "Python", type: "main", link: "https://github.com/B15cu1t/DNS_Enumerator" },
        { title: "Client-Server Communication", desc: "A local based server, with a local communication between users.", tech: "Python", type: "main", link: "https://github.com/B15cu1t/Client-Server-Communication" },
        { title: "Desktop File Organizer", desc: "Automates desktop cleanup by detecting file types and sorting them.", tech: "Python", type: "main", link: "https://github.com/B15cu1t/Desktop-File-Organizer-Automation-Script-" },
        { title: "Phishing Site", desc: "A PHP-based fake login page that sends captured data to a Discord webhook.", tech: "PHP", type: "side", link: "https://github.com/B15cu1t/Phishing_Website/" },
        { title: "Password Cracker", desc: "A Batch script that brute-forces passwords for ZIP files using a wordlist.", tech: "Batch", type: "side", link: "https://github.com/B15cu1t/Password_Cracker" },
        { title: "Geo-Locator", desc: "A C# WinForms app that uses a public API to locate servers via DNS or IP.", tech: "C#", type: "side", link: "#" },
        { title: "Tetris Game", desc: "A classic Tetris game implemented using Tkinter.", tech: "Python", type: "side", link: "https://github.com/B15cu1t/Tetris_Game" },
        { title: "QR Code Generator", desc: "Generates QR codes from any input text or URL.", tech: "Python", type: "side", link: "#" },
        { title: "GIF Creator", desc: "Combines multiple images to create animated GIFs.", tech: "Python", type: "side", link: "#" },
        { title: "Guess the Word", desc: "A word-guessing game with a fancy UI.", tech: "Python", type: "side", link: "#" },
        { title: "Discord Tag Bot", desc: "A bot to automate tagging friends on Discord.", tech: "Python", type: "side", link: "#" },
        { title: "Neon Chase", desc: "Python mini-game about a square being chased by a circle.", tech: "Python", type: "side", link: "#" }
    ];

    const mainRow = document.getElementById("main-projects-row");
    const sideRow = document.getElementById("side-projects-row");

    projects.forEach(p => {
        const div = document.createElement("div");
        const isMain = p.type === "main";
        div.className = isMain ? "col-lg-6 col-12" : "col-lg-4 col-md-6 col-12";
        div.innerHTML = `
            <div class="module-card ${isMain ? 'featured-module' : 'side-module'}">
                <div class="mb-3"><span class="tech-tag">${p.tech}</span></div>
                <h3 class="h5 fw-bold mb-3">./${p.title}</h3>
                <p class="text-dim small mb-4">${p.desc}</p>
                <a href="${p.link}" target="_blank" class="text-accent text-decoration-none small fw-bold">EXECUTE_VIEW →</a>
            </div>`;
        if (isMain) mainRow.appendChild(div); else sideRow.appendChild(div);
    });

    // Watch Dogs Glitch
    const target = document.getElementById("glitch-name");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let interval = null;

    function startGlitch() {
        let iteration = 0;
        clearInterval(interval);
        interval = setInterval(() => {
            target.innerText = target.innerText.split("").map((letter, index) => {
                if(index < iteration) return target.dataset.value[index];
                return letters[Math.floor(Math.random() * 42)]
            }).join("");
            if(iteration >= target.dataset.value.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    }
    startGlitch();

    // Smart Contact Form Redirect (PC vs Mobile Logic)
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value.toLowerCase();
        const msg = document.getElementById('message').value;
        const myEmail = "teogjurevski097@gmail.com";
        const subject = `Inquiry_from_${name}`;
        const body = encodeURIComponent(msg);

        // Check for Mobile Devices
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Mobile: Use mailto protocol to trigger native Gmail/Mail app
            window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
        } else {
            // PC: Open web-based composer based on user's email provider
            let webmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${body}`;
            
            if (userEmail.includes("@yahoo")) {
                webmailUrl = `https://compose.mail.yahoo.com/?to=${myEmail}&subject=${subject}&body=${body}`;
            } else if (userEmail.includes("@outlook") || userEmail.includes("@hotmail") || userEmail.includes("@live")) {
                webmailUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${myEmail}&subject=${subject}&body=${body}`;
            }
            window.open(webmailUrl, '_blank');
        }
        
        const btn = e.target.querySelector('button');
        btn.innerText = isMobile ? "OPENING_APP..." : "REDIRECTED_TO_WEBMAIL";
        setTimeout(() => { btn.innerText = "SEND_PACKET"; }, 3000);
    });

    // Botnet Background
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#a100f2" },
            "opacity": { "value": 0.4 },
            "size": { "value": 2 },
            "line_linked": { "enable": true, "distance": 150, "color": "#a100f2", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 1.2 }
        },
        "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" } } }
    });
});
