// Single global variable to prevent multiple instances
if (typeof window.typingAnimationRunning === 'undefined') {
    window.typingAnimationRunning = false;
}

// COMPLETELY REWRITTEN TYPING ANIMATION
function setupTypingAnimation() {
    // Prevent multiple instances
    if (window.typingAnimationRunning) {
        console.log('Typing animation already running');
        return;
    }
    
    // Get elements
    const greetingEl = document.getElementById('greeting-text');
    const nameEl = document.getElementById('name-text');
    const roleEl = document.getElementById('role-text');
    
    // Verify elements exist
    if (!greetingEl || !nameEl || !roleEl) {
        console.error('Typing elements not found');
        return;
    }
    
    console.log('Setting up typing animation');
    window.typingAnimationRunning = true;
    
    // Empty all elements
    greetingEl.textContent = '';
    nameEl.textContent = '';
    roleEl.textContent = '';
    
    // Text to type
    const greeting = "Hi, I'm ";
    const name = "Ahmer";
    const roles = [
        "Software Engineer",
        "Web Developer",
        "AI/ML Enthusiast",
        "Problem Solver",
        "C++ Programmer"
    ];
    
    // Style the name element
    nameEl.style.color = '#8A2BE2';
    nameEl.style.fontWeight = 'bold';
    nameEl.style.backgroundImage = 'linear-gradient(45deg, #8A2BE2, #9D4EDD, #B026FF)';
    nameEl.style.backgroundClip = 'text';
    nameEl.style.webkitBackgroundClip = 'text';
    nameEl.style.color = 'transparent';
    nameEl.style.textShadow = '0 0 10px #9D4EDD, 0 0 20px #B026FF';
    
    // Add pulse animation
    if (!document.getElementById('pulse-animation-style')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation-style';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { text-shadow: 0 0 10px #9D4EDD, 0 0 20px #B026FF; }
                50% { text-shadow: 0 0 15px #B026FF, 0 0 30px #8A2BE2; }
            }
        `;
        document.head.appendChild(style);
    }
    nameEl.style.animation = 'pulse 2s infinite';
    
    // Helper functions
    let currentRoleIndex = 0;
    
    function typeWriter(element, text, i, callback) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1, callback), 150);
        } else if (callback) {
            callback();
        }
    }
    
    function eraseText(element, callback) {
        const text = element.textContent;
        if (text.length > 0) {
            element.textContent = text.substring(0, text.length - 1);
            setTimeout(() => eraseText(element, callback), 50);
        } else if (callback) {
            callback();
        }
    }
    
    // Animation sequence
    function startAnimation() {
        // First type greeting
        typeWriter(greetingEl, greeting, 0, () => {
            // Then type name
            typeWriter(nameEl, name, 0, () => {
                // Then start typing roles
                typingRoles();
            });
        });
    }
    
    function typingRoles() {
        const currentRole = roles[currentRoleIndex];
        
        // Type current role
        typeWriter(roleEl, currentRole, 0, () => {
            // Wait before erasing
            setTimeout(() => {
                // Erase current role
                eraseText(roleEl, () => {
                    // Move to next role
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                    // Wait before typing next role
                    setTimeout(typingRoles, 500);
                });
            }, 2000);
        });
    }
    
    // Start the animation
    setTimeout(startAnimation, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingPage = document.querySelector('.loading-page');
    const progressBar = document.querySelector('.progress-bar');
    const loadingQuote = document.querySelector('.loading-quote');
    
    // Call the setupTypingAnimation function
    setupTypingAnimation();
    
    // Initialize skills typing effect
    initSkillsTyping();
    
    // Original loading animation code
    setTimeout(() => {
        loadingQuote.style.opacity = '1';
    }, 500);

    let progress = 0;
    const minLoadTime = 4000; // Minimum loading time of 4 seconds
    const startTime = Date.now();
    
    const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        
        if (elapsedTime < minLoadTime) {
            progress = (elapsedTime / minLoadTime) * 70;
        } else {
            progress += (100 - progress) * 0.05;
        }

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingPage.classList.add('fade-out');
                setTimeout(() => {
                    loadingPage.style.display = 'none';
                }, 800);
            }, 500);
        }

        progressBar.style.width = `${progress}%`;
    }, 100);

    createParticles();
    
    // Cursor blink
    setInterval(() => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.classList.toggle('blink');
        }
    }, 500);

    // Update scroll event handling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }, { passive: true });

    // Update smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (!this.classList.contains('dropbtn') && this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, 300);
                }
            });
        },
        { threshold: 0.15 }
    );
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Notification container setup
    if (!document.querySelector('.notification-container')) {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm._submitHandler) {
        contactForm.removeEventListener('submit', contactForm._submitHandler);
    }
    
    contactForm._submitHandler = async function(e) {
        e.preventDefault();
        
        const loadingDots = this.querySelector('.loading-dots');
        const submitButton = this.querySelector('button[type="submit"]');
        
        if (loadingDots) {
            loadingDots.classList.add('show'); // Use classList instead of style
            submitButton.disabled = true;
        }
        
        try {
            const response = await fetch(this.action, {
                method: this.method,
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (loadingDots) {
                loadingDots.classList.remove('show'); // Use classList instead of style
                submitButton.disabled = false;
            }
            
            const notificationContainer = document.querySelector('.notification-container');
            while (notificationContainer.firstChild) {
                notificationContainer.removeChild(notificationContainer.firstChild);
            }

            const notification = document.createElement('div');
            notification.className = `notification ${response.ok ? 'success' : 'error'}`;
            notification.innerHTML = `
                <div class="notification-icon">
                    ${response.ok ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>'}
                </div>
                <div class="notification-content">
                    <h3>${response.ok ? 'Success!' : 'Error!'}</h3>
                    <p>${response.ok ? 'Thank you for your message! I will respond shortly.' : 'There was an error sending your message. Please try again later.'}</p>
                </div>
            `;

            notificationContainer.appendChild(notification);

            anime.timeline({
                targets: notification,
                easing: 'easeOutElastic(1, .8)',
            }).add({
                translateX: [-50, 0],
                opacity: [0, 1],
                duration: 800,
                begin: () => {
                    notification.classList.add('show');
                }
            }).add({
                delay: 3000,
                translateX: [0, 50],
                opacity: 0,
                duration: 800,
                complete: () => {
                    notification.classList.remove('show');
                    notification.classList.add('hide');
                    setTimeout(() => notification.remove(), 800);
                }
            });

            if (response.ok) {
                this.reset();
            }
        } catch (error) {
            if (loadingDots) {
                loadingDots.classList.remove('show'); // Use classList instead of style
                submitButton.disabled = false;
            }
            
            const notification = document.createElement('div');
            notification.className = 'notification error';
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="notification-content">
                    <h3>Error!</h3>
                    <p>Connection error. Please check your internet connection.</p>
                </div>
            `;

            notificationContainer.innerHTML = '';
            notificationContainer.appendChild(notification);

            anime.timeline({
                targets: notification,
                easing: 'easeOutElastic(1, .8)',
            }).add({
                translateX: [-50, 0],
                opacity: [0, 1],
                duration: 800
            }).add({
                delay: 3000,
                translateX: [0, 50],
                opacity: 0,
                duration: 800,
                complete: () => notification.remove()
            });
        }
    };
    
    contactForm.addEventListener('submit', contactForm._submitHandler);

    document.querySelectorAll('.open-modal, .dropbtn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.classList.contains('dropbtn')) {
                const dropdownContent = this.nextElementSibling;
                dropdownContent.classList.toggle('show');

                document.querySelectorAll('.dropdown-content').forEach(content => {
                    if (content !== dropdownContent) {
                        content.classList.remove('show');
                    }
                });
            } else {
                const modalId = this.getAttribute('data-target');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    modal.querySelector('.modal-content').classList.add('rotate-in');
                }
            }
        });
    });

    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function showSlide(index) {
        reviews.forEach((review, i) => {
            review.style.display = i === index ? 'block' : 'none';
            review.classList.remove('slide-in');
            if (i === index) {
                review.classList.add('slide-in');
            }
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % reviews.length;
        showSlide(currentIndex);
    }

    let slideInterval = setInterval(nextSlide, 3000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            currentIndex = index;
            slideInterval = setInterval(nextSlide, 3000);
        });
    });

    showSlide(currentIndex);

    const skillsChart = document.querySelector("#skillsChart");
    if (skillsChart && !skillsChart.hasChildNodes()) {
        const skillMetersContainer = document.createElement('div');
        skillMetersContainer.className = 'skill-meters-container';
    
        const skills = [
            { name: 'Frontend Development', level: 90, category: 'Development', color: '#00ff88' },
            { name: 'UI/UX Design', level: 85, category: 'Design', color: '#00ffff' },
            { name: 'Backend Development', level: 65, category: 'Development', color: '#ff00ff' },
            { name: 'AI/ML', level: 75, category: 'Technology', color: '#B026FF' },
            { name: 'Problem Solving', level: 80, category: 'Core', color: '#ff6700' },
            { name: 'SEO Optimization', level: 70, category: 'Marketing', color: '#ff037A' },
            { name: 'Containerization', level: 60, category: 'DevOps', color: '#4169E1' }
        ];
    
        skills.forEach(skill => {
            const meterContainer = document.createElement('div');
            meterContainer.className = 'skill-meter-container';
    
            const meterLabel = document.createElement('div');
            meterLabel.className = 'skill-meter-label';
            meterLabel.innerHTML = `
                <span>${skill.name}</span>
                <span class="skill-percentage">0%</span>
            `;
    
            const meter = document.createElement('div');
            meter.className = 'skill-meter';
            meter.innerHTML = `
                <div class="skill-meter-fill" style="background: linear-gradient(90deg, ${skill.color}, ${skill.color}cc)"></div>
            `;
    
            const meterFill = meter.querySelector('.skill-meter-fill');
            meterFill.style.width = '0%';
    
            meterFill.dataset.level = skill.level;
    
            meterContainer.appendChild(meterLabel);
            meterContainer.appendChild(meter);
            skillMetersContainer.appendChild(meterContainer);
        });
    
        skillsChart.appendChild(skillMetersContainer);
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const meters = entry.target.querySelectorAll('.skill-meter-fill');
                    meters.forEach(meter => {
                        const targetLevel = meter.dataset.level;
                        const label = meter.closest('.skill-meter-container').querySelector('.skill-percentage');
                        
                        let currentLevel = 0;
                        const animation = setInterval(() => {
                            if (currentLevel >= targetLevel) {
                                clearInterval(animation);
                                return;
                            }
                            currentLevel++;
                            meter.style.width = `${currentLevel}%`;
                            label.textContent = `${currentLevel}%`;
                        }, 20);
    
                        meter.style.boxShadow = '0 0 10px var(--neon-purple)';
                    });
                }
            });
        }, { threshold: 0.2 });
    
        observer.observe(skillMetersContainer);
    }

    // Update scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const parallaxLayers = document.querySelectorAll('.parallax__layer');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        parallaxLayers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const movement = -(scrollTop * depth);
            const translate3d = `translate3d(0, ${movement}px, 0)`;
            layer.style.transform = translate3d;
        });
    });

    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', async function() {
            const modalId = this.getAttribute('data-target');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                modal.classList.add('loading');
                
                // Enable scrolling on the modal content
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.overflowY = 'auto';
                    modalContent.style.webkitOverflowScrolling = 'touch'; // Enable smooth scrolling on iOS
                    modalContent.style.maxHeight = '90vh';
                    modalContent.style.margin = '5vh auto';
                }
                
                const images = modal.querySelectorAll('img');
                
                try {
                    if (images.length) {
                        await Promise.all([...images].map(img => {
                            return new Promise((resolve) => {
                                if (img.complete) {
                                    img.classList.add('loaded');
                                    resolve();
                                } else {
                                    img.onload = () => {
                                        img.classList.add('loaded');
                                        resolve();
                                    };
                                    img.onerror = () => {
                                        console.error('Failed to load image:', img.src);
                                        img.classList.add('error');
                                        resolve();
                                    };
                                    const currentSrc = img.src;
                                    img.src = '';
                                    img.src = currentSrc;
                                }
                            });
                        }));
                    }
                    
                    modal.classList.remove('loading');
                    if (modalContent) {
                        modalContent.classList.add('rotate-in');
                        modalContent.style.opacity = '1';
                    }
                    
                } catch (error) {
                    console.error('Error loading modal images:', error);
                    modal.classList.remove('loading');
                }
            }
        });
    });

    // Update modal close handlers
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.classList.remove('rotate-in');
                }
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    });

    // Handle modal background click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modalContent = e.target.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.remove('rotate-in');
            }
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 300);
        }
    });

    // Add touch event handling for modals
    document.querySelectorAll('.modal').forEach(modal => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            let startY;
            let startScrollTop;

            modalContent.addEventListener('touchstart', (e) => {
                startY = e.touches[0].pageY;
                startScrollTop = modalContent.scrollTop;
            }, { passive: true });

            modalContent.addEventListener('touchmove', (e) => {
                if (!startY) return;
                
                const y = e.touches[0].pageY;
                const walk = (startY - y);
                modalContent.scrollTop = startScrollTop + walk;
            }, { passive: true });

            modalContent.addEventListener('touchend', () => {
                startY = null;
                startScrollTop = null;
            });
        }
    });

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                const modalContent = openModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.maxHeight = '90vh';
                    modalContent.style.margin = '2vh auto';
                }
            }
        }, 250);
    });

    const blogLinks = document.querySelectorAll('.open-blog-modal');
    const blogModal = document.getElementById('blog-modal');

    blogLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (blogModal) {
                blogModal.style.display = 'block';
                const modalContent = blogModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.classList.add('rotate-in');
                }
            }
        });
    });

    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.classList.remove('rotate-in');
                }
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modalContent = e.target.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.remove('rotate-in');
            }
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 300);
        }
    });

    const createSkillMeters = () => {
        const skillsChart = document.querySelector("#skillsChart");
        if (!skillsChart || skillsChart.hasChildNodes()) return;

        const skillMetersContainer = document.createElement('div');
        skillMetersContainer.className = 'skill-meters-container';

        const skills = [
            { 
                name: 'Frontend Development', 
                level: 90, 
                category: 'Development', 
                color: 'linear-gradient(45deg, #00ff88 0%, #00ffff 100%)',
                icon: 'fas fa-code'
            },
            { 
                name: 'UI/UX Design', 
                level: 85, 
                category: 'Design', 
                color: 'linear-gradient(45deg, #ff00ff 0%, #00ffff 100%)',
                icon: 'fas fa-paint-brush'
            },
            { 
                name: 'Backend Development', 
                level: 65, 
                category: 'Development', 
                color: 'linear-gradient(45deg, #B026FF 0%, #ff00ff 100%)',
                icon: 'fas fa-server'
            },
            { 
                name: 'AI/ML', 
                level: 75, 
                category: 'Technology', 
                color: 'linear-gradient(45deg, #8A2BE2 0%, #B026FF 100%)',
                icon: 'fas fa-brain'
            },
            { 
                name: 'Problem Solving', 
                level: 80, 
                category: 'Core', 
                color: 'linear-gradient(45deg,rgb(255, 103, 0) 0%,rgb(255, 4, 0) 100%)',
                icon: 'fas fa-puzzle-piece'
            },
            { 
                name: 'SEO Optimization', 
                level: 70, 
                category: 'Marketing', 
                color: 'linear-gradient(45deg, #00FFD1 0%, #00ff88 100%)',
                icon: 'fas fa-search'
            },
            { 
                name: 'Containerization', 
                level: 60, 
                category: 'DevOps', 
                color: 'linear-gradient(45deg, #9D4EDD 0%, #B026FF 100%)',
                icon: 'fas fa-cube'
            }
        ];

        skills.forEach(skill => {
            const meterContainer = document.createElement('div');
            meterContainer.className = 'skill-meter-container';
            
            meterContainer.innerHTML = `
                <div class="skill-meter-label">
                    <span><i class="${skill.icon}"></i> ${skill.name}</span>
                    <span class="skill-percentage">0%</span>
                </div>
                <div class="skill-meter">
                    <div class="skill-meter-fill" style="background: ${skill.color}"></div>
                </div>
            `;

            skillMetersContainer.appendChild(meterContainer);
        });

        skillsChart.appendChild(skillMetersContainer);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const meters = entry.target.querySelectorAll('.skill-meter-fill');
                    const percentages = entry.target.querySelectorAll('.skill-percentage');
                    
                    meters.forEach((meter, index) => {
                        const targetLevel = skills[index].level;
                        let currentLevel = 0;
                        
                        const animation = setInterval(() => {
                            if (currentLevel >= targetLevel) {
                                clearInterval(animation);
                                return;
                            }
                            currentLevel++;
                            meter.style.width = `${currentLevel}%`;
                            percentages[index].textContent = `${currentLevel}%`;
                        }, 20);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(skillMetersContainer);
    };

    document.addEventListener('DOMContentLoaded', createSkillMeters);
});

document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', async function() {
        const modalId = this.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('loading');
            
            const images = modal.querySelectorAll('img');
            
            try {
                if (images.length) {
                    await Promise.all([...images].map(img => {
                        return new Promise((resolve) => {
                            if (img.complete) {
                                img.classList.add('loaded');
                                resolve();
                            } else {
                                img.onload = () => {
                                    img.classList.add('loaded');
                                    resolve();
                                };
                                img.onerror = () => {
                                    console.error('Failed to load image:', img.src);
                                    img.classList.add('error');
                                    resolve();
                                };
                                const currentSrc = img.src;
                                img.src = '';
                                img.src = currentSrc;
                            }
                        });
                    }));
                }
                
                modal.classList.remove('loading');
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.classList.add('rotate-in');
                    modalContent.style.opacity = '1';
                    modalContent.scrollTop = 0;
                }
                
                document.body.style.overflow = 'hidden';
                
            } catch (error) {
                console.error('Error loading modal images:', error);
                modal.classList.remove('loading');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function smoothScroll(target, duration = 500) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const headerOffset = 80;
        const distance = targetPosition - headerOffset;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (!this.classList.contains('dropbtn') && this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    smoothScroll(targetElement, 400); // Faster duration of 400ms
                }
            }
        });
    });

    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    scrollToTopBtn.addEventListener('click', () => {
        const duration = 300; // Reduce duration to 300ms for faster animation
        const start = window.pageYOffset;
        const startTime = performance.now();

        function scrollAnimation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            
            window.scrollTo(0, start * (1 - easing(progress)));

            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        requestAnimationFrame(scrollAnimation);
    });
});

window.addEventListener('load', () => {
    const progressBar = document.querySelector('.progress-bar');
    const loadingPage = document.querySelector('.loading-page');
    
    if (progressBar && loadingPage) {
        progressBar.style.width = '100%';
        setTimeout(() => {
            loadingPage.style.display = 'none';
        }, 1500);
    }
    
    // Only call setupTypingAnimation if it hasn't already been started
    if (typeof setupTypingAnimation === 'function' && !window.typingAnimationRunning) {
        setupTypingAnimation();
    }
});

setInterval(() => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.classList.toggle('blink');
    }
}, 500);

function createParticles() {
    const loadingContainer = document.querySelector('.loading-container');
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        particle.style.animationDelay = Math.random() + 's';
        
        loadingContainer.appendChild(particle);
    }
}

// Skills typing effect function
function initSkillsTyping() {
    const skillsText = document.querySelector('.skills-typing-text');
    const skillsContainer = document.querySelector('.skills-typing');
    
    if (!skillsText || !skillsContainer) return;
    
    // Add a slight gap between "I'm skilled in" and skills
    skillsContainer.style.margin = '0';
    skillsContainer.style.padding = '0';
    skillsContainer.style.display = 'inline-flex';
    skillsContainer.style.alignItems = 'center';
    skillsContainer.style.gap = '0.5rem';
    
    // Shorter skill names to prevent line breaks
    const skills = [
        "C++",
        "AI/ML",
        "React",
        "Node.js",
        "Python",
        "UI/UX",
        "DevOps",
        "Cloud"
    ];
    
    let currentSkillIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 300; // Much slower typing speed
    
    // Pre-calculate the maximum width to prevent layout shifts
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.font = window.getComputedStyle(skillsText).font;
    document.body.appendChild(tempSpan);
    
    const maxWidth = Math.max(...skills.map(skill => {
        tempSpan.textContent = skill;
        return tempSpan.offsetWidth;
    }));
    
    document.body.removeChild(tempSpan);
    
    // Set a fixed width and prevent line breaks
    skillsText.style.minWidth = `${maxWidth}px`;
    skillsText.style.display = 'inline-block';
    skillsText.style.whiteSpace = 'nowrap';
    skillsText.style.margin = '0';
    skillsText.style.padding = '0';
    
    // Use a more efficient animation approach
    let lastTime = 0;
    const minTypingInterval = 120; // Much slower minimum time between updates
    
    function typeSkill(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;
        
        if (elapsed >= 150) {
            const currentSkill = skills[currentSkillIndex];
            
            if (isDeleting) {
                skillsText.textContent = currentSkill.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 100;
            } else {
                skillsText.textContent = currentSkill.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 150;
            }
            
            // If word is complete
            if (!isDeleting && currentCharIndex === currentSkill.length) {
                isDeleting = true;
                typingSpeed = 1500;
            } 
            // If deletion is complete
            else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentSkillIndex = (currentSkillIndex + 1) % skills.length;
                typingSpeed = 800;
            }
            
            lastTime = timestamp;
        }
        
        requestAnimationFrame(typeSkill);
    }
    
    // Start the animation
    requestAnimationFrame(typeSkill);
}

// Three.js Particle Animation
let scene, camera, renderer, particles, particleSystem;

function initParticles() {
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded');
        return;
    }

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
    });
    
    const homeSection = document.getElementById('home');
    if (homeSection) {
        renderer.setSize(homeSection.offsetWidth, homeSection.offsetHeight);
        homeSection.appendChild(renderer.domElement);
        
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.zIndex = '-1';
        renderer.domElement.style.pointerEvents = 'none';
    }

    const particleCount = 1000;
    particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x8A2BE2,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        vertexColors: false
    });

    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    const ambientLight = new THREE.AmbientLight(0x9D4EDD, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8A2BE2, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Handle window resize
    window.addEventListener('resize', () => {
        if (homeSection) {
            camera.aspect = homeSection.offsetWidth / homeSection.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(homeSection.offsetWidth, homeSection.offsetHeight);
        }
    }, { passive: true });

    animateParticles();
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    
    if (particleSystem) {
        const time = Date.now() * 0.001;
        particleSystem.material.opacity = 0.6 + Math.sin(time) * 0.2;
        particleSystem.rotation.y += 0.001;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Initialize particles when the page loads
window.addEventListener('load', () => {
    if (typeof THREE !== 'undefined') {
        initParticles();
    } else {
        console.error('Three.js is not loaded');
    }
});