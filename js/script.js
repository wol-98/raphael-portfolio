// ======================================
// DOM CONTENT LOADED
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // MOBILE NAVIGATION
    // ======================================
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
        
        // Close menu on link click
        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }

    // ======================================
    // DEVELOPER CONSOLE LOGIC
    // ======================================
    const terminalBody = document.getElementById("terminal-body");
    
    const terminalSequence = [
        { type: "input", text: "whoami" },
        { type: "output", text: "Raphael Wol-IT Professional & Student" },
        { type: "input", text: "cat /etc/os-release" },
        { type: "output", text: "NAME=\"Linux Mint\"\nPRETTY_NAME=\"Linux Mint 21\"" },
        { type: "input", text: "./check_status.sh" },
        { type: "log", status: "OK", text: "Java & Spring Boot backend initialized." },
        { type: "log", status: "OK", text: "Flutter mobile framework verified." },
        { type: "log", status: "OK", text: "Arduino IoT sensors responding." },
        { type: "log", status: "WARN", text: "Cybersecurity XDR protocols active." },
        { type: "input", text: "echo $MISSION" },
        { type: "output", text: "\"Building secure, scalable applications at the intersection of hardware and software.\"" }
    ];

    let currentStep = 0;
    let isTerminalRunning = false;

    function runTerminalSequence() {
        if (isTerminalRunning || !terminalBody) return;
        isTerminalRunning = true;
        
        const activeLine = document.querySelector(".terminal-active-line");
        
        function processNextStep() {
            if (currentStep >= terminalSequence.length) return;
            
            const step = terminalSequence[currentStep];
            const newLine = document.createElement("div");
            newLine.className = "terminal-line";
            
            if (step.type === "input") {
                newLine.innerHTML = `<span class="prompt">raphael@linux-mint:~$</span> <span class="typing-cmd"></span>`;
                terminalBody.insertBefore(newLine, activeLine);
                typeCommand(newLine.querySelector(".typing-cmd"), step.text, processNextStep);
            } else if (step.type === "output") {
                newLine.innerHTML = `<span style="color: #cbd5e1; white-space: pre-line;">${step.text}</span>`;
                terminalBody.insertBefore(newLine, activeLine);
                setTimeout(processNextStep, 400); 
            } else if (step.type === "log") {
                const time = new Date().toISOString().split('T')[1].substring(0,8);
                const statusClass = step.status === "OK" ? "log-success" : "log-warning";
                newLine.innerHTML = `<span class="log-time">[${time}]</span> <span class="${statusClass}">[${step.status}]</span> <span>${step.text}</span>`;
                terminalBody.insertBefore(newLine, activeLine);
                setTimeout(processNextStep, 300);
            }
            
            currentStep++;
        }
        
        processNextStep();
    }

    function typeCommand(element, text, callback) {
        let charIndex = 0;
        function typeChar() {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, Math.random() * 50 + 30); 
            } else {
                setTimeout(callback, 400); 
            }
        }
        typeChar();
    }

    const consoleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(runTerminalSequence, 500); 
                consoleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const terminalSection = document.querySelector(".developer-console");
    if (terminalSection) {
        consoleObserver.observe(terminalSection);
    }

    // ======================================
    // DARK MODE
    // ======================================
    const themeToggle = document.getElementById("theme-toggle");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }

    // ======================================
    // TYPING ANIMATION
    // ======================================
    const typingText = document.querySelector(".typing-text");
    const words = [
        "IT Professional",
        "Web Developer",
        "Linux Enthusiast",
        "IoT Tinkerer"
    ];
    let wordIndex = 0;
    let charIndex = 0;

    function typeEffect() {
        if (!typingText) return;

        if (charIndex < words[wordIndex].length) {
            typingText.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(eraseEffect, 1500);
        }
    }

    function eraseEffect() {
        if (!typingText) return;

        if (charIndex > 0) {
            typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 30);
        } else {
            wordIndex++;
            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
            setTimeout(typeEffect, 500);
        }
    }

    typeEffect();

    // ======================================
    // LOADING SCREEN
    // ======================================
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 800);
    }

    // ======================================
    // CUSTOM CURSOR
    // ======================================
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", (e) => {
        if (!cursorDot || !cursorOutline) return;
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    const hoverElements = document.querySelectorAll("a, button, input, textarea, select");
    hoverElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            if (cursorOutline) {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
            }
        });
        element.addEventListener("mouseleave", () => {
            if (cursorOutline) {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
            }
        });
    });

    // ======================================
    // SCROLL TO TOP BUTTON
    // ======================================
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ======================================
    // COUNTERS (requestAnimationFrame)
    // ======================================
    const counters = document.querySelectorAll(".counter");
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        
        counters.forEach(counter => {
            counter.innerText = "0";
            const target = +counter.getAttribute("data-target");
            const duration = 2000; 
            let startTime = null;

            function updateCounter(currentTime) {
                if (!startTime) startTime = currentTime;
                const progress = currentTime - startTime;
                const current = Math.min((progress / duration) * target, target);
                
                counter.innerText = Math.ceil(current) + (current >= target ? "+" : "");

                if (progress < duration) {
                    requestAnimationFrame(updateCounter);
                }
            }
            requestAnimationFrame(updateCounter);
        });
        countersStarted = true;
    }

    // ======================================
    // INTERSECTION OBSERVER
    // ======================================
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const navItems = document.querySelectorAll(".nav-links a");
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navItems.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, { root: null, threshold: 0.5, rootMargin: "0px" });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                entry.target.classList.remove("hidden");
                
                if (entry.target.classList.contains("stats")) {
                    startCounters();
                }
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    const cards = document.querySelectorAll(".project-card, .skill-group-card, .service-card, .certificate-card");
    sections.forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
        if(section.hasAttribute("id")) {
            navObserver.observe(section);
        }
    });

    cards.forEach(card => {
        card.classList.add("hidden");
        observer.observe(card);
    });

    // ======================================
    // PARALLAX & SCROLL TOP BTN
    // ======================================
    const hero = document.querySelector(".hero");
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (scrollTopBtn) {
                    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
                }
                if (hero) {
                    hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ======================================
    // CONTACT FORM BUTTON STATE
    // ======================================
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    if (contactForm && submitBtn) {
        contactForm.addEventListener("submit", function() {
            const btnText = submitBtn.querySelector(".btn-text");
            const btnIcon = submitBtn.querySelector(".btn-icon");

            if (btnText) btnText.textContent = "Sending...";
            if (btnIcon) {
                btnIcon.classList.remove("fa-paper-plane");
                btnIcon.classList.add("fa-spinner");
            }
            
            submitBtn.style.opacity = "0.7";
            submitBtn.style.cursor = "not-allowed";
        });
    }

    // ======================================
    // PARTICLE BACKGROUND
    // ======================================
    try {
        if (typeof particlesJS !== "undefined") {
            particlesJS("particles-js", {
                particles: {
                    number: { value: 80 },
                    color: { value: "#38bdf8" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5 },
                    size: { value: 3 },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#38bdf8",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 3
                    }
                }
            });
        }
    } catch (error) {
        console.log("Particles.js failed to load.");
    }

    // ======================================
    // GITHUB API INTEGRATION
    // ======================================
    const githubUsername = "wol-98"; 
    const profileContainer = document.getElementById("github-profile");
    const reposContainer = document.getElementById("github-repos");

    function getLanguageColor(language) {
        const colors = {
            "Java": "#b07219",
            "Dart": "#00B4AB",
            "HTML": "#e34c26",
            "CSS": "#563d7c",
            "JavaScript": "#f1e05a",
            "C++": "#f34b7d",
            "Shell": "#89e051"
        };
        return colors[language] || "var(--primary-color)";
    }

    async function fetchGitHubData() {
        if (!profileContainer || !reposContainer) return;

        try {
            const profileRes = await fetch(`https://api.github.com/users/${githubUsername}`);
            if (!profileRes.ok) throw new Error("GitHub API rate limit exceeded");
            const profile = await profileRes.json();

            profileContainer.innerHTML = `
                <img src="${profile.avatar_url}" alt="GitHub Avatar" class="github-avatar">
                <div class="github-stats-container">
                    <h3>${profile.name || profile.login}</h3>
                    <div class="github-badges">
                        <span><i class="fas fa-book-open"></i> ${profile.public_repos} Repos</span>
                        <span><i class="fas fa-users"></i> ${profile.followers} Followers</span>
                    </div>
                </div>
            `;

            const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
            const repos = await reposRes.json();

            reposContainer.innerHTML = "";

            repos.forEach(repo => {
                const langColor = getLanguageColor(repo.language);
                const desc = repo.description ? repo.description : "No description provided.";
                
                const card = document.createElement("div");
                card.className = "repo-card hidden"; 
                
                card.innerHTML = `
                    <div class="repo-header">
                        <h3><a href="${repo.html_url}" target="_blank"><i class="fas fa-folder-open" style="color: var(--primary-color); margin-right: 8px;"></i>${repo.name}</a></h3>
                    </div>
                    <p class="repo-desc">${desc}</p>
                    <div class="repo-footer">
                        <span>
                            <span class="language-dot" style="background-color: ${langColor};"></span>
                            ${repo.language || 'Unknown'}
                        </span>
                        <span><i class="far fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>
                `;
                
                reposContainer.appendChild(card);
                observer.observe(card);
            });

        } catch (error) {
            console.error("GitHub Fetch Error:", error);
            profileContainer.innerHTML = `<p style="color: #ff5f56;">Unable to load GitHub data. Check console for details.</p>`;
        }
    }

    const gitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fetchGitHubData();
                gitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const githubSection = document.getElementById("github");
    if (githubSection) {
        gitObserver.observe(githubSection);
    }

    // ======================================
    // SKILLS PROGRESS BAR ANIMATION
    // ======================================
    const skillBars = document.querySelectorAll(".skill-bar-fill");
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute("data-progress");
                    bar.style.width = progress;
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // ======================================
    // EXPANDABLE PROJECT MODALS & CASE STUDIES
    // ======================================
    const projectCaseStudies = {
        project1: {
            title: "Smart Streetlight System",
            tags: ["Arduino", "IoT", "C++", "Tinkercad", "Automation"],
            desc: "An intelligent public utility prototype designed to optimize energy distribution grid matrices. The node network continuously parses peripheral proximity patterns via low-latency ultrasonic arrays, instantly shifting luminous states from low-idle draw lines to 100% saturation limits upon vector capture.",
            blueprint: "[Ambient Light LDR] ──> [ADC Register] ──┐\n                                       v\n[Ultrasonic Sensor] ──> [GPIO Pin] ──> [Microcontroller] ──> [PWM Duty Cycle] ──> [LED Array Layer]",
            specs: {
                architecture: "Edge Computing Node Model",
                sensors: "Ultrasonic HC-SR04, Photoresistor LDR",
                hardware: "ATmega328P Microcontroller Platform",
                repository: "wol-98/Smart-Streetlight-Project"
            }
        },
        project2: {
            title: "SecureSentinel-XDR",
            tags: ["Docker", "Linux", "Cybersecurity", "Incident Logging", "Containers"],
            desc: "An enterprise-grade Extended Detection and Response (XDR) telemetry system built atop isolated system bounds. It maps and intercepts multi-vector threat signals, piping logs through strict permission matrices to create immutable system events.",
            blueprint: "[Network Traffic] ──> [Container Interface] ──┐\n                                              v\n[Immutable Logs] <── [Security Matrix] <── [Core XDR Engine]",
            specs: {
                architecture: "Containerized Micro-Services Architecture",
                security: "GPG Digital Signature Isolation Layer",
                environment: "Kali Linux / Linux Mint Server Cluster",
                repository: "wol-98/SecureSentinel-XDR"
            }
        },
        project3: {
            title: "Radio Kwizera Requisition System",
            tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "Workflows"],
            desc: "An internal, multi-tenant administrative system developed to handle workflow routing and asset management. Built with secure backend logic, it streamlines approval tracks, manages station spending matrices, and traces technical inventory with high relational precision.",
            blueprint: "[Client Client Request] ──> [Spring Security Layer] ──┐\n                                                       v\n[Relational Database] <── [Hibernate JPA] <── [REST Controller Class]",
            specs: {
                backend: "Java / Spring Boot Framework Stack",
                database: "MySQL Relational Node Cluster",
                security: "Role-Based Access Control (RBAC)",
                repository: "wol-98/radio-kwizera-requisition"
            }
        },
        project4: {
            title: "SmartStore POS",
            tags: ["Java", "Desktop Engine", "Inventory Tracking", "Relational Database"],
            desc: "A robust transactional node management engine designed to run secure local terminal workflows. Features highly optimized data access rings for inventory state synchronization, quick execution pipelines, and automated point-of-sale receipt layout printers.",
            blueprint: "[Barcode Scan Input] ──> [Inventory Check Engine] ──┐\n                                                     v\n[Transaction Ledger] <── [Local SQL Engine] <── [Core Payment Core Pipeline]",
            specs: {
                language: "Java SE Programming Core",
                database: "SQLite Local Ledger Storage File",
                peripherals: "Barcode Scanner Interfacing & ESC/POS Printers",
                repository: "wol-98/smartstore-pos"
            }
        },
        project5: {
            title: "Socket Mobile Project",
            tags: ["Flutter", "Dart", "WebSockets", "Socket Programming", "Asynchronous Systems"],
            desc: "A cross-platform mobile networking blueprint designed to handle multi-client real-time synchronization. Employs event-driven socket pipelines to stream state records across mobile end-points without polling overhead.",
            blueprint: "[Mobile Frontend View] <── [StreamController Model] ──┐\n                                                          v\n[Target Clients Cluster] <── [Full-Duplex Node Engine] <── [WebSocket Channel]",
            specs: {
                frontend: "Flutter UI Framework Engine (Android & iOS)",
                protocol: "RFC 6455 Duplex WebSockets Protocol",
                async: "Dart Streams & Asynchronous Event Processing",
                repository: "wol-98/socket-mobile-project"
            }
        },
        project6: {
            title: "Library Management System",
            tags: ["Java", "Relational Architecture", "Data Control", "Lease Systems"],
            desc: "A backend database tracking deployment designed to enforce transactional integrity across books and user indices. Optimizes relational inventory data lookups and uses safe verification paths to process member lease terms.",
            blueprint: "[User System Action] ──> [Business Validation Controller] ──┐\n                                                               v\n[Enforced State Ledger] <── [Relational Integrity Checks] <── [Database Core]",
            specs: {
                core: "Java Object-Oriented Framework Layer",
                database: "Structured Relational Database System",
                logic: "Lease Expiry Tracking Automations",
                repository: "wol-98/library_management"
            }
        }
    };

    const modalOverlay = document.getElementById("projectModal");
    const dynamicContainer = document.getElementById("modal-dynamic-content");
    const closeTrigger = document.querySelector(".modal-close-trigger");

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("view-details-trigger")) {
            const projectKey = e.target.getAttribute("data-project");
            const data = projectCaseStudies[projectKey];
            
            if (!data || !modalOverlay || !dynamicContainer) return;
            
            const tagsHTML = data.tags.map(tag => `<span class="modal-tech-badge">${tag}</span>`).join("");
            const specsHTML = Object.entries(data.specs).map(([key, value]) => `
                <div class="spec-list-item">
                    <strong>${key.replace(/_/g, " ")}</strong>
                    <span>${value}</span>
                </div>
            `).join("");

            dynamicContainer.innerHTML = `
                <div class="modal-header-block">
                    <h3>${data.title}</h3>
                    <div class="modal-meta-tags">${tagsHTML}</div>
                </div>
                <div class="modal-body-grid">
                    <div class="modal-main-desc">
                        <h4>System Architecture Blueprint</h4>
                        <pre class="architecture-blueprint-box"><code>${data.blueprint}</code></pre>
                        <br>
                        <h4>Project Case Summary</h4>
                        <p>${data.desc}</p>
                    </div>
                    <div class="modal-sidebar-spec">
                        <h4>Technical Specifications</h4>
                        <div class="specs-wrapper-div">${specsHTML}</div>
                    </div>
                </div>
            `;
            
            modalOverlay.classList.add("modal-active");
            document.body.style.overflow = "hidden"; 
        }
    });

    if (modalOverlay && closeTrigger) {
        const dismissModal = () => {
            modalOverlay.classList.remove("modal-active");
            document.body.style.overflow = "auto"; 
        };
        closeTrigger.addEventListener("click", dismissModal);
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) dismissModal();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modalOverlay.classList.contains("modal-active")) dismissModal();
        });
    }

    // ======================================
    // CERTIFICATE PREVIEW GALLERY MODAL
    // ======================================
    const certModal = document.getElementById("certModal");
    const certImg = document.getElementById("cert-modal-img");
    const certTitle = document.getElementById("cert-modal-title");
    const certOrg = document.getElementById("cert-modal-org");
    const certClose = document.querySelector(".cert-modal-close");

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("view-cert-trigger")) {
            const imgSrc = e.target.getAttribute("data-cert");
            const titleText = e.target.getAttribute("data-title");
            const orgText = e.target.getAttribute("data-org");

            if (!certModal || !certImg || !certTitle || !certOrg) return;

            // Set content streams dynamically
            certImg.src = imgSrc;
            certTitle.textContent = titleText;
            certOrg.textContent = orgText;

            // Reveal Overlay Panel
            certModal.classList.add("modal-active");
            document.body.style.overflow = "hidden"; // Intercept viewport main background scrolling
        }
    });

    if (certModal && certClose) {
        const dismissCertModal = () => {
            certModal.classList.remove("modal-active");
            document.body.style.overflow = "auto"; // Restore system background scroll capabilities
        };

        certClose.addEventListener("click", dismissCertModal);
        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) dismissCertModal();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && certModal.classList.contains("modal-active")) dismissCertModal();
        });
    }

    // ======================================
    // INTERACTIVE RESUME PANEL
    // ======================================
    const resumePanel = document.getElementById("resume-panel");
    const openResumeBtn = document.getElementById("open-resume-btn");
    const closeResumeBtn = document.querySelector(".resume-close");

    function toggleResume() {
        if (!resumePanel) return;
        if (resumePanel.classList.contains("active")) {
            resumePanel.classList.remove("active");
            document.body.style.overflow = "auto";
        } else {
            resumePanel.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }

    if (openResumeBtn) {
        openResumeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            toggleResume();
        });
    }

    if (closeResumeBtn) {
        closeResumeBtn.addEventListener("click", toggleResume);
    }

    if (resumePanel) {
        resumePanel.addEventListener("click", (e) => {
            if (e.target === resumePanel) toggleResume();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && resumePanel.classList.contains("active")) toggleResume();
        });
    }

    // ======================================
    // COMMAND PALETTE (Ctrl + K) ENGINE
    // ======================================
    const cpOverlay = document.getElementById("command-palette");
    const cpSearch = document.getElementById("cp-search");
    const cpList = document.getElementById("cp-list");
    let cpItems = cpList ? Array.from(cpList.querySelectorAll("li")) : [];
    let selectedIndex = 0;

    // Open/Close toggle
    function toggleCommandPalette() {
        if (!cpOverlay) return;
        const isActive = cpOverlay.classList.contains("active");
        
        if (isActive) {
            cpOverlay.classList.remove("active");
            document.body.style.overflow = "auto";
        } else {
            cpOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
            cpSearch.value = "";
            filterCommands("");
            setTimeout(() => cpSearch.focus(), 100);
        }
    }

    // Keyboard Shortcuts Listener
    document.addEventListener("keydown", (e) => {
        // Trigger on Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            toggleCommandPalette();
        }
        
        // Escape to close
        if (e.key === "Escape" && cpOverlay && cpOverlay.classList.contains("active")) {
            toggleCommandPalette();
        }

        // Arrow navigation inside palette
        if (cpOverlay && cpOverlay.classList.contains("active")) {
            const visibleItems = cpItems.filter(item => item.style.display !== "none");
            
            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % visibleItems.length;
                updateSelection(visibleItems);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + visibleItems.length) % visibleItems.length;
                updateSelection(visibleItems);
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (visibleItems[selectedIndex]) {
                    executeCommand(visibleItems[selectedIndex].getAttribute("data-action"));
                }
            }
        }
    });

    // Close on background click
    if (cpOverlay) {
        cpOverlay.addEventListener("click", (e) => {
            if (e.target === cpOverlay) toggleCommandPalette();
        });
    }

    // Filtering logic
    if (cpSearch) {
        cpSearch.addEventListener("input", (e) => {
            filterCommands(e.target.value);
        });
    }

    function filterCommands(query) {
        const lowerQuery = query.toLowerCase();
        let visibleCount = 0;
        
        cpItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(lowerQuery)) {
                item.style.display = "flex";
                visibleCount++;
            } else {
                item.style.display = "none";
            }
        });

        selectedIndex = 0;
        const visibleItems = cpItems.filter(item => item.style.display !== "none");
        updateSelection(visibleItems);
    }

    function updateSelection(visibleItems) {
        cpItems.forEach(item => item.classList.remove("selected"));
        if (visibleItems.length > 0 && visibleItems[selectedIndex]) {
            visibleItems[selectedIndex].classList.add("selected");
            visibleItems[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    // Command Execution Matrix
    function executeCommand(action) {
        toggleCommandPalette(); // Close palette first
        
        switch(action) {
            case "theme":
                document.getElementById("theme-toggle")?.click();
                break;
            case "scroll-projects":
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                break;
            case "github":
                window.open("https://github.com/wol-98", "_blank");
                break;
            case "resume":
                if(typeof toggleResume === 'function') toggleResume(); 
                break;
            case "contact":
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                break;
            case "top":
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
        }
    }

    // Mouse click execution
    cpItems.forEach(item => {
        item.addEventListener("click", () => {
            executeCommand(item.getAttribute("data-action"));
        });
        item.addEventListener("mouseenter", (e) => {
            const visibleItems = cpItems.filter(i => i.style.display !== "none");
            selectedIndex = visibleItems.indexOf(e.target);
            updateSelection(visibleItems);
        });
    });

});