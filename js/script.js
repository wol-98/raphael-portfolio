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
    // DARK MODE
    // ======================================
    const themeToggle = document.getElementById("theme-toggle");

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            // Save preference
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

    // Expand cursor on clickable elements (now includes form inputs!)
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
            const duration = 2000; // Animation duration in ms
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
    // INTERSECTION OBSERVER (Scroll Animations)
    // ======================================
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    // Dedicated observer for navigation highlighting
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

    // General observer for revealing elements
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                entry.target.classList.remove("hidden");
                
                // Trigger counters when stats section comes into view
                if (entry.target.classList.contains("stats")) {
                    startCounters();
                }
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    const cards = document.querySelectorAll(".project-card, .skill-card, .service-card, .certificate-card");

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
    // PARALLAX & SCROLL TOP BTN (Optimized)
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

            // Change text and swap icon to a spinner
            if (btnText) btnText.textContent = "Sending...";
            if (btnIcon) {
                btnIcon.classList.remove("fa-paper-plane");
                btnIcon.classList.add("fa-spinner");
            }
            
            // Disable button to prevent double-clicks
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

});