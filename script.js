document.addEventListener("DOMContentLoaded", function () {
    AOS.init({ duration: 1000, once: true, offset: 100 });

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

    projects.forEach((p, i) => {
        const div = document.createElement("div");
        const isMain = p.type === "main";
        div.className = isMain ? "col-lg-6 col-md-6 col-12" : "col-lg-4 col-md-6 col-12";
        div.setAttribute('data-aos', 'fade-up');
        div.setAttribute('data-aos-delay', (i % 3) * 50);
        
        div.innerHTML = `
            <div class="module-card ${isMain ? 'featured-module' : 'side-module'} d-flex flex-column h-100">
                <div class="mb-3"><span class="tech-tag">${p.tech}</span></div>
                <h3 class="h5 fw-bold mb-3 flex-grow-1">./${p.title}</h3>
                <p class="text-main small mb-4 flex-grow-1">${p.desc}</p>
                <a href="${p.link}" target="_blank" class="text-accent text-decoration-none small fw-bold mt-auto">EXECUTE_VIEW →</a>
            </div>`;
        if (isMain) mainRow.appendChild(div); else sideRow.appendChild(div);
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.cursor-dot');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX; const y = e.clientY;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        cursor.animate({ left: `${x}px`, top: `${y}px` }, { duration: 400, fill: "forwards" });
    });
    const refreshCursor = () => {
        document.querySelectorAll('a, button, .module-card, .form-input').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
        });
    };
    refreshCursor();

    // Glitch Effect
    const target = document.getElementById("glitch-name");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let interval = null;
    const startGlitch = () => {
        let iteration = 0;
        clearInterval(interval);
        interval = setInterval(() => {
            target.innerText = target.innerText.split("").map((letter, index) => {
                if(index < iteration) return target.dataset.value[index];
                return letters[Math.floor(Math.random() * letters.length)]
            }).join("");
            if(iteration >= target.dataset.value.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    };
    startGlitch();

    // FORMSPREE EMAIL LOGIC (PC & Mobile Friendly)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('button');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.innerText = "SENDING...";
        submitBtn.disabled = true;

        const formData = new FormData(this);
        
        // 1. Try Formspree (Background Send)
        try {
            // REPLACE 'YOUR_FORMSPREE_ID' BELOW WITH YOUR ACTUAL ID (e.g. 'xvqrlqbw')
            const response = await fetch("https://formspree.io/f/mkogqrrz", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitBtn.innerText = "TRANSMISSION_SUCCESS";
                submitBtn.style.background = "#00ff41"; // Success Green
                submitBtn.style.color = "black";
                contactForm.reset();
            } else {
                throw new Error("Formspree Error");
            }
        } catch (error) {
            // 2. Fallback if Formspree fails (or ID is missing)
            submitBtn.innerText = "UPLINK_FAILED";
            setTimeout(() => {
                submitBtn.innerText = "RETRYING_VIA_APP...";
                
                // Fallback to mailto logic
                const name = document.getElementById('name').value;
                const msg = document.getElementById('message').value;
                const myEmail = "teogjurevski097@gmail.com";
                window.location.href = `mailto:${myEmail}?subject=Inquiry_from_${name}&body=${encodeURIComponent(msg)}`;
                
                submitBtn.disabled = false;
                submitBtn.innerText = "SEND_PACKET";
            }, 1500);
        }
    });

    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 50 }, "color": { "value": "#FF4F00" },
            "opacity": { "value": 0.25 }, "size": { "value": 2 },
            "line_linked": { "enable": true, "distance": 150, "color": "#FF4F00", "opacity": 0.1 },
            "move": { "enable": true, "speed": 1 }
        },
        "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" } } }
    });
});
