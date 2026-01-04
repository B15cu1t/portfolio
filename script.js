document.addEventListener("DOMContentLoaded", function () {
    // Boot sequence animation
    const bootOverlay = document.getElementById('boot-overlay');
    const bootBar = document.getElementById('boot-bar');
    const bootPercent = document.getElementById('boot-percent');
    
    let progress = 0;
    const bootInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        bootBar.style.width = progress + '%';
        bootPercent.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(bootInterval);
            setTimeout(() => {
                bootOverlay.style.opacity = '0';
                setTimeout(() => {
                    bootOverlay.style.display = 'none';
                }, 500);
            }, 800);
        }
    }, 100);

    AOS.init({ duration: 800, once: true, offset: 100 });

    const projects = [
        // Security Tools
        { 
            title: "DNS Enumerator", 
            desc: "Advanced DNS reconnaissance tool supporting A, MX, NS, TXT, and CNAME records with batch subdomain scanning capabilities.", 
            tech: "Python", 
            category: "security", 
            link: "https://github.com/B15cu1t/DNS_Enumerator" 
        },
        { 
            title: "Client-Server Communication", 
            desc: "Secure local network chat system with multi-client support, message encryption, and real-time broadcasting.", 
            tech: "Python", 
            category: "security", 
            link: "https://github.com/B15cu1t/Client-Server-Communication" 
        },
        { 
            title: "Password Cracker", 
            desc: "High-speed password recovery tool for ZIP files using optimized wordlist attacks and brute-force algorithms.", 
            tech: "Batch", 
            category: "security", 
            link: "https://github.com/B15cu1t/Password_Cracker" 
        },
        
        // Automation
        { 
            title: "Desktop File Organizer", 
            desc: "Intelligent file management system that auto-detects file types and organizes your desktop into categorized folders.", 
            tech: "Python", 
            category: "automation", 
            link: "https://github.com/B15cu1t/Desktop-File-Organizer-Automation-Script-" 
        },
        { 
            title: "QR Code Generator", 
            desc: "Fast QR code creation tool with customizable size, error correction levels, and batch processing support.", 
            tech: "Python", 
            category: "automation", 
            link: "https://github.com/B15cu1t" 
        },
        { 
            title: "GIF Creator", 
            desc: "Image-to-GIF converter with frame rate control, loop settings, and automatic optimization for web use.", 
            tech: "Python", 
            category: "automation", 
            link: "https://github.com/B15cu1t" 
        },
        
        // Experiments
        { 
            title: "Tetris Game", 
            desc: "Classic Tetris implementation with smooth controls, score tracking, and progressive difficulty levels.", 
            tech: "Python", 
            category: "experiment", 
            link: "https://github.com/B15cu1t/Tetris_Game" 
        },
        { 
            title: "Neon Chase", 
            desc: "Fast-paced arcade game featuring physics-based movement, collision detection, and increasing difficulty.", 
            tech: "Python", 
            category: "experiment", 
            link: "https://github.com/B15cu1t" 
        },
        { 
            title: "Guess the Word", 
            desc: "Interactive word puzzle game with hint system, difficulty levels, and modern UI design.", 
            tech: "Python", 
            category: "experiment", 
            link: "https://github.com/B15cu1t" 
        }
    ];

    const securityRow = document.getElementById("security-projects-row");
    const automationRow = document.getElementById("automation-projects-row");
    const experimentRow = document.getElementById("experiment-projects-row");

    projects.forEach((p, i) => {
        const div = document.createElement("div");
        div.className = "col-lg-4 col-md-6 col-12";
        div.setAttribute('data-aos', 'fade-up');
        div.setAttribute('data-aos-delay', (i % 3) * 100);
        
        div.innerHTML = `
            <div class="module-card d-flex flex-column h-100">
                <div class="mb-3"><span class="tech-tag">${p.tech}</span></div>
                <h3 class="h5 fw-bold mb-3">./${p.title}</h3>
                <p class="text-main small mb-4 flex-grow-1">${p.desc}</p>
                <a href="${p.link}" target="_blank" class="text-accent text-decoration-none small fw-bold mt-auto project-link">VIEW_PROJECT →</a>
            </div>`;
        
        if (p.category === "security") securityRow.appendChild(div);
        else if (p.category === "automation") automationRow.appendChild(div);
        else experimentRow.appendChild(div);
    });

    // Custom cursor - only on desktop
    if (window.matchMedia('(min-width: 992px)').matches) {
        const cursor = document.querySelector('.custom-cursor');
        const dot = document.querySelector('.cursor-dot');
        
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            cursor.animate({ left: `${x}px`, top: `${y}px` }, { duration: 400, fill: "forwards" });
        });

        const refreshCursor = () => {
            document.querySelectorAll('a, button, .module-card, .form-input, #terminal-input').forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
            });
        };
        refreshCursor();
    }

    // Glitch effect on hover
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
    
    target.addEventListener('mouseenter', startGlitch);
    setTimeout(startGlitch, 2000);

    // Interactive Terminal
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    const commands = {
        help: `Available commands:
  <span class="text-accent">whoami</span>     - Display user information
  <span class="text-accent">skills</span>     - List technical skills
  <span class="text-accent">projects</span>   - Show project summary
  <span class="text-accent">contact</span>    - Get contact information
  <span class="text-accent">cert</span>       - Display certifications
  <span class="text-accent">clear</span>      - Clear terminal
  <span class="text-accent">hack</span>       - Try it and see...`,
        
        whoami: `<span class="text-accent">Teo Gjurevski</span>
First-year Computer Science student at FINKI, Macedonia
Cybersecurity enthusiast | Python developer | CTF player
Currently learning: Penetration testing & network security`,
        
        skills: `<span class="text-accent">TECHNICAL SKILLS:</span>
→ Languages: Python, C#, PHP, Batch, C++
→ Security: Network recon, subdomain enumeration, penetration testing
→ Tools: Git, Linux CLI, threading, automation scripts
→ Currently exploring: Advanced Python, ethical hacking`,
        
        projects: `<span class="text-accent">PROJECT SUMMARY:</span>
[Security Tools]
→ Subdomain Enumerator (Python)
→ DNS Enumerator (Python)
→ Password Cracker (Batch)

[Automation]
→ Desktop File Organizer (Python)
→ QR Code Generator (Python)

[Experiments]
→ Tetris Game, Neon Chase, and more...

Type 'ls projects' to view all`,
        
        'ls projects': 'Redirecting to projects section...',
        
        contact: `<span class="text-accent">CONTACT CHANNELS:</span>
→ GitHub: https://github.com/B15cu1t
→ LinkedIn: https://www.linkedin.com/in/teo-gjurevski-865a273a2/
→ Email: Available via contact form below`,
        
        cert: `<span class="text-accent">CERTIFICATIONS:</span>
🛡️ Cyber Exercises and Experiential Education Program (CE3)
   Issued by: SANS & CRDFGLOBAL
   Event: Balkan Hacking CTF - Kosovo`,
        
        hack: `<span class="text-accent">ACCESS DENIED</span>
Nice try! But this terminal is read-only 😉
Try the Konami code instead... (↑↑↓↓←→←→BA)`,
        
        sudo: `<span class="text-accent">[sudo]</span> password for visitor: 
Sorry, you don't have sudo privileges here!`,
        
        clear: 'CLEAR_SCREEN'
    };
    
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value.trim().toLowerCase();
            const output = document.createElement('div');
            output.className = 'terminal-line';
            
            if (cmd) {
                output.innerHTML = `<span class="terminal-prompt">visitor@b15cu1t:~$</span> ${cmd}`;
                terminalOutput.appendChild(output);
                
                const response = document.createElement('div');
                response.className = 'terminal-response';
                
                if (cmd === 'clear') {
                    terminalOutput.innerHTML = '';
                } else if (cmd === 'ls projects') {
                    response.innerHTML = commands[cmd];
                    terminalOutput.appendChild(response);
                    setTimeout(() => {
                        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                } else if (commands[cmd]) {
                    response.innerHTML = commands[cmd];
                    terminalOutput.appendChild(response);
                } else {
                    response.innerHTML = `<span class="text-danger">Command not found: ${cmd}</span>
Type <span class="text-accent">help</span> for available commands`;
                    terminalOutput.appendChild(response);
                }
                
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
            
            terminalInput.value = '';
        }
    });
//aaaaa
    // Konami Code Easter Egg
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        const easterEgg = document.getElementById('easter-egg');
        easterEgg.classList.add('show');
        
        // Console surprise
        console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'font-size: 20px; color: #FF4F00; font-weight: bold;');
        console.log('%cYou found the secret! Here\'s something special:', 'font-size: 14px; color: #00ff41;');
        console.log('%c    ____  ________            __  __ ', 'color: #FF4F00;');
        console.log('%c   / __ )/_  ____/_  ______  /_ |/ /_', 'color: #FF4F00;');
        console.log('%c  / __  | / /_  / / / / __ \\| || __/', 'color: #FF4F00;');
        console.log('%c / /_/ / /_/ / / /_/ / /_/ / || |_  ', 'color: #FF4F00;');
        console.log('%c/_____/ ____/  \\__,_/\\____/|_/ \\__/', 'color: #FF4F00;');
        console.log('%c                                     ', 'color: #FF4F00;');
        console.log('%c"The best way to predict the future is to invent it." - Alan Kay', 'font-style: italic; color: #8b949e;');
        
        // Matrix effect
        document.body.style.animation = 'matrix-pulse 0.5s ease-in-out';
        
        setTimeout(() => {
            easterEgg.classList.remove('show');
        }, 4000);
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('button');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.innerText = "SENDING...";
        submitBtn.disabled = true;

        const formData = new FormData(this);
        
        try {
            const response = await fetch("https://formspree.io/f/mkogqrrz", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitBtn.innerText = "TRANSMISSION_SUCCESS";
                submitBtn.style.background = "#00ff41";
                submitBtn.style.color = "black";
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.style.background = "";
                    submitBtn.style.color = "";
                    submitBtn.innerText = "SEND_PACKET";
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error("Formspree Error");
            }
        } catch (error) {
            submitBtn.innerText = "UPLINK_FAILED";
            setTimeout(() => {
                submitBtn.innerText = "RETRYING_VIA_APP...";
                
                const name = document.getElementById('name').value;
                const msg = document.getElementById('message').value;
                const user = "teogjurevski097";
                const domain = "gmail.com";
                window.location.href = `mailto:${user}@${domain}?subject=Inquiry_from_${name}&body=${encodeURIComponent(msg)}`;
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "SEND_PACKET";
                }, 2000);
            }, 1500);
        }
    });

    // Optimized particles
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 30 },
            "color": { "value": "#FF4F00" },
            "opacity": { "value": 0.2, "random": true },
            "size": { "value": 2, "random": true },
            "line_linked": { 
                "enable": true, 
                "distance": 150, 
                "color": "#FF4F00", 
                "opacity": 0.15,
                "width": 1
            },
            "move": { 
                "enable": true, 
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        },
        "interactivity": { 
            "events": { 
                "onhover": { 
                    "enable": true, 
                    "mode": "grab" 
                } 
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                }
            }
        }
    });
});
