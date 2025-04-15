// Google Analytics Initialization has been removed

if (typeof window.AppState === 'undefined') {
    window.AppState = {
        typingAnimationRunning: false,
        DOMCache: {
            elements: {},
            get: function(selector) {
                if (!this.elements[selector]) {
                    this.elements[selector] = document.querySelector(selector);
                }
                return this.elements[selector];
            }
        }
    };
}

if (typeof window.Utils === 'undefined') {
    window.Utils = {
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        getElement: function(selector, required = true) {
            const element = AppState.DOMCache.get(selector);
            if (required && !element) {
                console.error(`Element not found: ${selector}`);
                return null;
            }
            return element;
        },

        addSafeEventListener: function(element, event, handler) {
            if (!element) return;
            element.addEventListener(event, handler);
        },

        isMobileView: function() {
            return window.innerWidth < 992;
        },
        
        disableScroll: function() {
            // Save current scroll position
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            // Add styles to prevent scrolling
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollTop}px`;
            document.body.style.left = `-${scrollLeft}px`;
            document.body.style.width = '100%';
            document.body.dataset.scrollTop = scrollTop;
            document.body.dataset.scrollLeft = scrollLeft;
        },
        
        enableScroll: function() {
            // Restore scroll position
            const scrollTop = parseInt(document.body.dataset.scrollTop || '0', 10);
            const scrollLeft = parseInt(document.body.dataset.scrollLeft || '0', 10);
            
            // Remove styles that prevented scrolling
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.width = '';
            
            // Restore the scroll position
            window.scrollTo(scrollLeft, scrollTop);
            
            // Clean up data attributes
            delete document.body.dataset.scrollTop;
            delete document.body.dataset.scrollLeft;
        }
    };
}

if (typeof window.typingAnimationRunning === 'undefined') {
    window.typingAnimationRunning = false;
}

function handleLoading() {
    const loadingPage = document.querySelector('.loading-page');
    
    // Disable scrolling while loading
    Utils.disableScroll();
    
    setTimeout(() => {
        loadingPage.classList.add('hidden');
        document.body.classList.remove('loading');
        
        // Enable scrolling when loading is complete
        Utils.enableScroll();
        
        setTimeout(() => {
            loadingPage.style.display = 'none';
            const homeContent = document.querySelector('.home-content');
            if (homeContent) {
                requestAnimationFrame(() => {
                    homeContent.classList.add('visible');
                });
            }
        }, 1000);
    }, 5000);
}

window.addEventListener('load', () => {
    handleLoading();
    
    const sections = document.querySelectorAll('.section-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    let ticking = false;
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.style.opacity = '1';
                    scrollToTopBtn.style.visibility = 'visible';
                } else {
                    scrollToTopBtn.style.opacity = '0';
                    scrollToTopBtn.style.visibility = 'hidden';
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});


function initCircularSidebar() {
    const sidebarTrigger = document.getElementById('sidebar-trigger');
    const circularSidebar = document.getElementById('circular-sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const menuButtons = document.querySelectorAll('.circular-menu-button');
    const sidebarContent = document.querySelector('.sidebar-content');
    const profileCenter = document.querySelector('.profile-center');
    
    if (!sidebarTrigger || !circularSidebar || !closeSidebar) {
        console.error('Circular sidebar elements not found');
        return;
    }
    
    function positionButtons() {
        const radius = 110;
        
        if (profileCenter) {
            profileCenter.style.position = 'absolute';
            profileCenter.style.top = '50%';
            profileCenter.style.left = '50%';
            profileCenter.style.transform = 'translate(-50%, -50%)';
            profileCenter.style.zIndex = '20';
            profileCenter.style.margin = '0';
            profileCenter.style.padding = '0';
        }
        
        menuButtons.forEach(button => {
            const angle = parseInt(button.getAttribute('data-angle')) || 0;
            const radians = angle * (Math.PI / 180);
            
            const x = radius * Math.sin(radians);
            const y = -radius * Math.cos(radians);
            
            button.style.transform = 'scale(0)';
            button.style.transformOrigin = 'center center';
            button.style.left = `calc(50% + ${x}px)`;
            button.style.top = `calc(50% + ${y}px)`;
            button.style.margin = '-27px 0 0 -27px';
        });
    }
    
    positionButtons();
    
    function isMobileView() {
        return window.innerWidth < 992;
    }
    
    sidebarTrigger.addEventListener('click', function(e) {
        if (!isMobileView()) {
            return;
        }
        
        e.preventDefault();
        circularSidebar.classList.add('active');
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: sidebarContent,
                scale: [0, 1],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 800
            });
            
            anime({
                targets: profileCenter,
                scale: [0, 1],
                opacity: [0, 1],
                delay: 300,
                duration: 800,
                easing: 'easeOutElastic(1, .5)'
            });
            
            menuButtons.forEach(button => {
                const angle = parseInt(button.getAttribute('data-angle')) || 0;
                const delay = 400 + (angle / 360 * 600);
                
                anime({
                    targets: button,
                    scale: [0, 1],
                    opacity: [0, 1],
                    delay: delay,
                    duration: 800,
                    easing: 'easeOutElastic(1, .5)'
                });
            });
            
            anime({
                targets: closeSidebar,
                scale: [0, 1],
                rotate: ['0deg', '360deg'],
                opacity: [0, 1],
                delay: 300,
                duration: 800,
                easing: 'easeOutElastic(1, .5)'
            });
            
            anime({
                targets: '.sidebar-background',
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutQuad'
            });
        } else {
            menuButtons.forEach((button, index) => {
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 100 * index);
            });
        }
    });
    
    window.addEventListener('resize', function() {
        if (!isMobileView() && circularSidebar.classList.contains('active')) {
            closeCircularSidebar();
        }
        
        positionButtons();
    });
    
    closeSidebar.addEventListener('click', closeCircularSidebar);
    document.querySelector('.sidebar-background').addEventListener('click', closeCircularSidebar);
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                closeCircularSidebar();
            }, 300);
        });
    });
    
    function closeCircularSidebar() {
        if (typeof anime !== 'undefined') {
            menuButtons.forEach(button => {
                const angle = parseInt(button.getAttribute('data-angle')) || 0;
                const delay = (angle / 360 * 300);
                
                anime({
                    targets: button,
                    scale: 0,
                    opacity: 0,
                    duration: 600,
                    easing: 'easeInBack',
                    delay: delay
                });
            });
            
            anime({
                targets: sidebarContent,
                scale: 0,
                opacity: 0,
                duration: 800,
                delay: 300,
                easing: 'easeInQuad',
                complete: function() {
                    circularSidebar.classList.remove('active');
                }
            });
            
            anime({
                targets: '.sidebar-background',
                opacity: 0,
                duration: 800,
                easing: 'easeInQuad'
            });
            
            anime({
                targets: closeSidebar,
                scale: 0,
                rotate: '90deg',
                opacity: 0,
                duration: 400,
                easing: 'easeInBack'
            });
            
            anime({
                targets: profileCenter,
                scale: 0,
                opacity: 0,
                duration: 600,
                easing: 'easeInBack'
            });
        } else {
            menuButtons.forEach((button, index) => {
                setTimeout(() => {
                    button.style.transform = 'scale(0)';
                }, 50 * index);
            });
            
            setTimeout(() => {
                circularSidebar.classList.remove('active');
            }, 500);
        }
    }
    
    if (typeof anime !== 'undefined') {
        menuButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                anime({
                    targets: this.querySelector('i'),
                    scale: 1.2,
                    rotate: '15deg',
                    duration: 400,
                    easing: 'easeOutElastic(1, .5)'
                });
            });
            
            button.addEventListener('mouseleave', function() {
                anime({
                    targets: this.querySelector('i'),
                    scale: 1,
                    rotate: '0deg',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initCircularSidebar();

});


function setupTypingAnimation() {
    if (window.typingAnimationRunning) {
        
        return;
    }
    
    const greetingEl = document.getElementById('greeting-text');
    const nameEl = document.getElementById('name-text');
    const roleEl = document.getElementById('role-text');
    
    if (!greetingEl || !nameEl || !roleEl) {
        console.error('Typing elements not found');
        return;
    }
    
    
    window.typingAnimationRunning = true;
    
    greetingEl.textContent = '';
    nameEl.textContent = '';
    roleEl.textContent = '';
    
    const greeting = "Hi, I'm ";
    const name = "Ahmer";
    const roles = [
        "Software Engineer",
        "Web Developer",
        "AI/ML Enthusiast",
        "Problem Solver",
        "C++ Programmer"
    ];
    
    nameEl.style.color = '#8A2BE2';
    nameEl.style.fontWeight = 'bold';
    nameEl.style.backgroundImage = 'linear-gradient(45deg, #8A2BE2, #9D4EDD, #B026FF)';
    nameEl.style.backgroundClip = 'text';
    nameEl.style.webkitBackgroundClip = 'text';
    nameEl.style.color = 'transparent';
    nameEl.style.textShadow = '0 0 10px #9D4EDD, 0 0 20px #B026FF';
    
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
    
    function startAnimation() {
        typeWriter(greetingEl, greeting, 0, () => {
            typeWriter(nameEl, name, 0, () => {
                typingRoles();
            });
        });
    }
    
    function typingRoles() {
        const currentRole = roles[currentRoleIndex];
        
        typeWriter(roleEl, currentRole, 0, () => {
            setTimeout(() => {
                eraseText(roleEl, () => {
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                    setTimeout(typingRoles, 500);
                });
            }, 2000);
        });
    }
    
    setTimeout(startAnimation, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingPage = document.querySelector('.loading-page');
    const progressBar = document.querySelector('.progress-bar');
    const loadingQuote = document.querySelector('.loading-quote');
    
    initCircularSidebar();
    setupTypingAnimation();
    initSkillsTyping();
    
    setTimeout(() => {
        loadingQuote.style.opacity = '1';
    }, 500);

    let progress = 0;
    const minLoadTime = 4000;
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
    
    setInterval(() => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.classList.toggle('blink');
        }
    }, 500);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }, { passive: true });

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

    if (!document.querySelector('.notification-container')) {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm && contactForm._submitHandler) {
        contactForm.removeEventListener('submit', contactForm._submitHandler);
    }
    
    contactForm._submitHandler = async function(e) {
        e.preventDefault();
        
        const loadingDots = this.querySelector('.loading-dots');
        const submitButton = this.querySelector('button[type="submit"]');
        
        if (loadingDots) {
            loadingDots.classList.add('show');
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
                loadingDots.classList.remove('show');
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
                loadingDots.classList.remove('show');
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

            const notificationContainer = document.querySelector('.notification-container');
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
    
    if (contactForm) {
        contactForm.addEventListener('submit', contactForm._submitHandler);
    }

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
                // Use requestAnimationFrame for better performance
                requestAnimationFrame(() => {
                    modal.style.display = 'block';
                    modal.classList.add('loading');
                    
                    const modalContent = modal.querySelector('.modal-content');
                    if (modalContent) {
                        modalContent.style.overflowY = 'auto';
                        modalContent.style.webkitOverflowScrolling = 'touch';
                        modalContent.style.maxHeight = '90vh';
                        modalContent.style.margin = '5vh auto';
                    }
                });
                
                const images = modal.querySelectorAll('img');
                
                try {
                    if (images.length) {
                        // Optimize image loading by adding debounce
                        const loadingPromises = [...images].map(img => {
                            return new Promise((resolve) => {
                                if (img.complete) {
                                    img.classList.add('loaded');
                                    resolve();
                                } else {
                                    img.onload = () => {
                                        requestAnimationFrame(() => {
                                            img.classList.add('loaded');
                                            resolve();
                                        });
                                    };
                                    img.onerror = () => {
                                        console.error('Failed to load image:', img.src);
                                        img.classList.add('error');
                                        resolve();
                                    };
                                    // Force image load
                                    if (!img.src.includes('data:')) {
                                        const currentSrc = img.src;
                                        img.src = '';
                                        img.src = currentSrc;
                                    }
                                }
                            });
                        });
                        
                        await Promise.all(loadingPromises);
                    }
                    
                    requestAnimationFrame(() => {
                        modal.classList.remove('loading');
                        if (modalContent) {
                            modalContent.classList.add('rotate-in');
                            modalContent.style.opacity = '1';
                            // Add will-change for hardware acceleration
                            modalContent.style.willChange = 'transform, opacity';
                        }
                    });
                    
                } catch (error) {
                    console.error('Error loading modal images:', error);
                    modal.classList.remove('loading');
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
                    // Clean up will-change after animation
                    modalContent.addEventListener('transitionend', () => {
                        modalContent.style.willChange = 'auto';
                    }, { once: true });
                    
                    modalContent.classList.remove('rotate-in');
                    
                    // Use setTimeout to ensure animation completes
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 300);
                } else {
                    modal.style.display = 'none';
                }
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
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                modal.style.display = 'block';
                modal.classList.add('loading');
                
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.overflowY = 'auto';
                    modalContent.style.webkitOverflowScrolling = 'touch';
                    modalContent.style.maxHeight = '90vh';
                    modalContent.style.margin = '5vh auto';
                }
            });
            
            const images = modal.querySelectorAll('img');
            
            try {
                if (images.length) {
                    // Optimize image loading by adding debounce
                    const loadingPromises = [...images].map(img => {
                        return new Promise((resolve) => {
                            if (img.complete) {
                                img.classList.add('loaded');
                                resolve();
                            } else {
                                img.onload = () => {
                                    requestAnimationFrame(() => {
                                        img.classList.add('loaded');
                                        resolve();
                                    });
                                };
                                img.onerror = () => {
                                    console.error('Failed to load image:', img.src);
                                    img.classList.add('error');
                                    resolve();
                                };
                                // Force image load
                                if (!img.src.includes('data:')) {
                                    const currentSrc = img.src;
                                    img.src = '';
                                    img.src = currentSrc;
                                }
                            }
                        });
                    });
                    
                    await Promise.all(loadingPromises);
                }
                
                requestAnimationFrame(() => {
                    modal.classList.remove('loading');
                    if (modalContent) {
                        modalContent.classList.add('rotate-in');
                        modalContent.style.opacity = '1';
                        // Add will-change for hardware acceleration
                        modalContent.style.willChange = 'transform, opacity';
                    }
                });
                
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


function initSkillsTyping() {
    const skillsText = document.querySelector('.skills-typing-text');
    const skillsContainer = document.querySelector('.skills-typing');
    
    if (!skillsText || !skillsContainer) return;
    

    skillsContainer.style.margin = '0';
    skillsContainer.style.padding = '0';
    skillsContainer.style.display = 'inline-flex';
    skillsContainer.style.alignItems = 'center';
    skillsContainer.style.gap = '0.5rem';
    

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
    

    skillsText.style.minWidth = `${maxWidth}px`;
    skillsText.style.display = 'inline-block';
    skillsText.style.whiteSpace = 'nowrap';
    skillsText.style.margin = '0';
    skillsText.style.padding = '0';
    

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
            

            if (!isDeleting && currentCharIndex === currentSkill.length) {
                isDeleting = true;
                typingSpeed = 1500;
            } 

            else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentSkillIndex = (currentSkillIndex + 1) % skills.length;
                typingSpeed = 800;
            }
            
            lastTime = timestamp;
        }
        
        requestAnimationFrame(typeSkill);
    }
    

    requestAnimationFrame(typeSkill);
}


if (typeof window.ParticleSystem === 'undefined') {
    window.ParticleSystem = {
        scene: null,
        camera: null,
        renderer: null,
        particles: null,
        particleSystem: null,

        init() {
            if (typeof THREE === 'undefined') {
                console.error('Three.js is not loaded');
                return;
            }
            
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);

            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.z = 5;

            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true
            });
            
            const homeSection = document.getElementById('home');
            if (homeSection) {
                this.renderer.setSize(homeSection.offsetWidth, homeSection.offsetHeight);
                homeSection.appendChild(this.renderer.domElement);
                
                this.renderer.domElement.style.position = 'absolute';
                this.renderer.domElement.style.top = '0';
                this.renderer.domElement.style.left = '0';
                this.renderer.domElement.style.width = '100%';
                this.renderer.domElement.style.height = '100%';
                this.renderer.domElement.style.zIndex = '-1';
                this.renderer.domElement.style.pointerEvents = 'none';
            }

            const particleCount = 1000;
            this.particles = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 10;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            }

            this.particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const particleMaterial = new THREE.PointsMaterial({
                color: 0x8A2BE2,
                size: 0.1,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                vertexColors: false
            });

            this.particleSystem = new THREE.Points(this.particles, particleMaterial);
            this.scene.add(this.particleSystem);

            const ambientLight = new THREE.AmbientLight(0x9D4EDD, 0.5);
            this.scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0x8A2BE2, 1);
            pointLight.position.set(5, 5, 5);
            this.scene.add(pointLight);


            window.addEventListener('resize', () => {
                if (homeSection) {
                    this.camera.aspect = homeSection.offsetWidth / homeSection.offsetHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(homeSection.offsetWidth, homeSection.offsetHeight);
                }
            }, { passive: true });

            this.animate();
        },

        animate() {
            requestAnimationFrame(() => this.animate());
            
            if (this.particleSystem) {
                const time = Date.now() * 0.001;
                this.particleSystem.material.opacity = 0.6 + Math.sin(time) * 0.2;
                this.particleSystem.rotation.y += 0.001;
            }
            
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        }
    };
}


window.addEventListener('load', () => {
    if (typeof THREE !== 'undefined') {
        window.ParticleSystem.init();
    } else {
        console.error('Three.js is not loaded');
    }
});

// Contact Form Validation and Error Handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formStatus = document.querySelector('.form-status');
  const loadingDots = document.querySelector('.loading-dots');

  if (contactForm) {
    // Validate name
    nameInput.addEventListener('blur', function() {
      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your name';
        nameInput.classList.add('error');
      } else {
        nameError.textContent = '';
        nameInput.classList.remove('error');
      }
    });

    // Validate email
    emailInput.addEventListener('blur', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Please enter your email';
        emailInput.classList.add('error');
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.classList.add('error');
      } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
      }
    });

    // Validate message
    messageInput.addEventListener('blur', function() {
      if (messageInput.value.trim() === '') {
        messageError.textContent = 'Please enter your message';
        messageInput.classList.add('error');
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageInput.classList.add('error');
      } else {
        messageError.textContent = '';
        messageInput.classList.remove('error');
      }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all fields
      let isValid = true;
      
      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your name';
        nameInput.classList.add('error');
        isValid = false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Please enter your email';
        emailInput.classList.add('error');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.classList.add('error');
        isValid = false;
      }
      
      if (messageInput.value.trim() === '') {
        messageError.textContent = 'Please enter your message';
        messageInput.classList.add('error');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageInput.classList.add('error');
        isValid = false;
      }
      
      if (!isValid) {
        formStatus.textContent = 'Please correct the errors above';
        formStatus.classList.add('error-status');
        return;
      }
      
      // Show loading animation
      loadingDots.style.display = 'flex';
      formStatus.textContent = 'Sending...';
      formStatus.classList.remove('error-status');
      formStatus.classList.add('sending-status');
      
      // Submit form using fetch
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        // Hide loading animation
        loadingDots.style.display = 'none';
        
        // Show success message
        formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
        formStatus.classList.remove('sending-status');
        formStatus.classList.add('success-status');
        
        // Reset form
        contactForm.reset();
        
        // Clear status after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.classList.remove('success-status');
        }, 5000);
      })
      .catch(error => {
        // Hide loading animation
        loadingDots.style.display = 'none';
        
        // Show error message
        formStatus.textContent = 'There was a problem sending your message. Please try again later.';
        formStatus.classList.remove('sending-status');
        formStatus.classList.add('error-status');
        
        console.error('Error:', error);
      });
    });
  }
});

// Add a more efficient modal handler function
function initModalHandlers() {
    // Cache modal elements for better performance
    const modalButtons = document.querySelectorAll('.open-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    
    // Pre-cache all modal content elements
    const modalContents = {};
    modals.forEach(modal => {
        modalContents[modal.id] = modal.querySelector('.modal-content');
    });
    
    // Use event delegation instead of multiple event listeners
    document.addEventListener('click', function(event) {
        // Handle opening modals
        if (event.target.classList.contains('open-modal') || 
            event.target.closest('.open-modal')) {
            
            const button = event.target.classList.contains('open-modal') ? 
                event.target : event.target.closest('.open-modal');
            
            const modalId = button.getAttribute('data-target');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        }
        
        // Handle closing modals
        if (event.target.classList.contains('modal-close') || 
            event.target.closest('.modal-close')) {
            
            const modal = event.target.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        }
        
        // Handle clicking outside modal
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
    
    // Optimized modal opening function
    function openModal(modal) {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            modal.style.display = 'block';
            modal.classList.add('loading');
            
            const modalContent = modalContents[modal.id] || modal.querySelector('.modal-content');
            if (modalContent) {
                // Batch style changes together to reduce reflows
                Object.assign(modalContent.style, {
                    overflowY: 'auto',
                    webkitOverflowScrolling: 'touch',
                    maxHeight: '90vh',
                    margin: '5vh auto',
                    willChange: 'transform, opacity' // Hardware acceleration hint
                });
            }
            
            // Process images in the modal
            const images = modal.querySelectorAll('img');
            if (images.length) {
                Promise.all([...images].map(img => {
                    return new Promise((resolve) => {
                        if (img.complete) {
                            img.classList.add('loaded');
                            resolve();
                        } else {
                            img.onload = () => {
                                requestAnimationFrame(() => {
                                    img.classList.add('loaded');
                                    resolve();
                                });
                            };
                            img.onerror = () => {
                                img.classList.add('error');
                                resolve();
                            };
                        }
                    });
                })).then(() => {
                    requestAnimationFrame(() => {
                        modal.classList.remove('loading');
                        if (modalContent) {
                            modalContent.classList.add('rotate-in');
                            modalContent.style.opacity = '1';
                        }
                    });
                }).catch(error => {
                    console.error('Error loading modal images:', error);
                    modal.classList.remove('loading');
                });
            } else {
                // No images to load
                requestAnimationFrame(() => {
                    modal.classList.remove('loading');
                    if (modalContent) {
                        modalContent.classList.add('rotate-in');
                        modalContent.style.opacity = '1';
                    }
                });
            }
        });
    }
    
    // Optimized modal closing function
    function closeModal(modal) {
        const modalContent = modalContents[modal.id] || modal.querySelector('.modal-content');
        if (modalContent) {
            // Clean up will-change after animation completes
            modalContent.addEventListener('transitionend', () => {
                modalContent.style.willChange = 'auto';
            }, { once: true });
            
            modalContent.classList.remove('rotate-in');
            
            // Use setTimeout to ensure animation completes
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        } else {
            modal.style.display = 'none';
        }
    }
}

// Initialize modal handlers when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initModalHandlers);

// Performance optimization function
function optimizePerformance() {
    // Debounce scroll events for better performance
    let scrollTimeout;
    let lastKnownScrollPosition = 0;
    let ticking = false;
    
    // Use passive event listeners for scrolling
    window.addEventListener('scroll', function(e) {
        lastKnownScrollPosition = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Handle all scroll-dependent animations here in one go
                handleScrollAnimations(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
        
        // Debounce expensive operations
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle expensive operations that don't need to run on every scroll
            handleExpensiveScrollOperations(lastKnownScrollPosition);
        }, 100);
    }, { passive: true }); // passive: true improves scroll performance
    
    // Consolidated scroll animation handler
    function handleScrollAnimations(scrollPos) {
        // Handle parallax effects
        const parallaxLayers = document.querySelectorAll('.parallax__layer');
        parallaxLayers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const movement = -(scrollPos * depth);
            layer.style.transform = `translate3d(0, ${movement}px, 0)`;
        });
        
        // Handle scroll-to-top button visibility
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        if (scrollToTopBtn) {
            if (scrollPos > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        }
    }
    
    // Handler for expensive operations that don't need to run on every scroll frame
    function handleExpensiveScrollOperations(scrollPos) {
        // Any operations that are expensive but don't need to run on every scroll
        // For example, checking which section is currently in view
    }
    
    // Optimize image loading
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, { 
                rootMargin: '200px 0px' // Load images 200px before they come into view
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
            });
        }
    }
    
    // Execute optimization functions
    window.addEventListener('load', () => {
        lazyLoadImages();
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);