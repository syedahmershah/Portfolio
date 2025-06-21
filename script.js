// Google Analytics Initialization has been removed

// Initialize console messages only once
(function() {
    if (window.consoleMessagesShown) return;
    window.consoleMessagesShown = true;

// Creator signature and welcome message
console.log("%c Made with ❤️ by Syed Ahmer Shah", "color: #ff6b6b; font-size: 14px; font-weight: bold;");
console.log("%c 👋 Hi there! Welcome to my portfolio. Feel free to explore!", "color: #4ecdc4; font-size: 12px;");

// Debug GA4 Events
console.log("%c 🔍 GA4 Debug Mode Enabled", "color: #4ecdc4; font-size: 12px;");
window.debugGA4 = function() {
    console.log('Testing GA4 Events...');
    // Test section view
    trackSectionView('about');
    console.log('Tracked section view: about');
    
    // Test project click
    trackProjectClick('project1');
    console.log('Tracked project click: project1');
    
    // Test certification view
    trackCertificationView('cert1');
    console.log('Tracked certification view: cert1');
    
    // Test blog view
    trackBlogView('blog1');
    console.log('Tracked blog view: blog1');
    
    // Test form submission
    trackFormSubmission('contact', 'success');
    console.log('Tracked form submission');
    
    console.log('GA4 Event tests complete. Check Real-time reports in GA4 dashboard.');
};

// Copyright warning
console.log("%c ⚠️ COPYRIGHT NOTICE", "color: #ff0000; font-size: 14px; font-weight: bold; text-decoration: underline;");
console.log("%c © All Rights Reserved - Unauthorized copying or reproduction of this code is strictly prohibited.", "color: #ff0000; font-size: 12px; font-weight: bold;");
})();

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
        "Java Developer",
        "Problem Solver",
        "C++ Programmer"
    ];
    
    // Name element styling
    nameEl.style.color = '#8A2BE2';
    nameEl.style.fontWeight = 'bold';
    nameEl.style.backgroundImage = 'linear-gradient(45deg, #8A2BE2, #9D4EDD, #B026FF)';
    nameEl.style.backgroundClip = 'text';
    nameEl.style.webkitBackgroundClip = 'text';
    nameEl.style.color = 'transparent';
    nameEl.style.textShadow = '0 0 10px #9D4EDD, 0 0 20px #B026FF';

    // Role element styling - Premium light neon blue
    roleEl.style.color = '#7DF9FF';  // Electric Blue
    roleEl.style.fontWeight = '600';
    roleEl.style.textShadow = '0 0 10px rgba(125, 249, 255, 0.8), 0 0 20px rgba(125, 249, 255, 0.6), 0 0 30px rgba(125, 249, 255, 0.4)';
    
    if (!document.getElementById('pulse-animation-style')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation-style';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { text-shadow: 0 0 10px #9D4EDD, 0 0 20px #B026FF; }
                50% { text-shadow: 0 0 15px #B026FF, 0 0 30px #8A2BE2; }
            }
            @keyframes roleGlow {
                0%, 100% { text-shadow: 0 0 10px rgba(125, 249, 255, 0.8), 0 0 20px rgba(125, 249, 255, 0.6), 0 0 30px rgba(125, 249, 255, 0.4); }
                50% { text-shadow: 0 0 15px rgba(125, 249, 255, 1), 0 0 25px rgba(125, 249, 255, 0.8), 0 0 35px rgba(125, 249, 255, 0.6); }
            }
        `;
        document.head.appendChild(style);
    }
    nameEl.style.animation = 'pulse 2s infinite';
    roleEl.style.animation = 'roleGlow 1.5s infinite alternate';
    
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
    
    // Rate limit checker function
    function isRateLimited() {
        const lastSubmissionTime = localStorage.getItem('lastFormSubmission');
        const cooldownPeriod = 60000; // 1 minute cooldown
        const currentTime = Date.now();
        
        console.log('Last submission:', lastSubmissionTime ? new Date(parseInt(lastSubmissionTime)).toLocaleString() : 'Never');
        console.log('Current time:', new Date(currentTime).toLocaleString());
        
        if (lastSubmissionTime) {
            const timeElapsed = currentTime - parseInt(lastSubmissionTime);
            console.log('Time elapsed:', Math.round(timeElapsed / 1000), 'seconds');
            console.log('Cooldown remaining:', Math.round((cooldownPeriod - timeElapsed) / 1000), 'seconds');
            return timeElapsed < cooldownPeriod;
        }
        return false;
    }
    
    contactForm._submitHandler = async function(e) {
        e.preventDefault();
        
        const formStatus = this.querySelector('.form-status');
        const loadingDots = this.querySelector('.loading-dots');
        const submitButton = this.querySelector('button[type="submit"]');
        const notificationContainer = document.querySelector('.notification-container');
        
        // Clear any existing notifications
        if (notificationContainer) {
            notificationContainer.innerHTML = '';
        }
        
        // Strict rate limit check
        if (isRateLimited()) {
            const lastSubmissionTime = parseInt(localStorage.getItem('lastFormSubmission'));
            const cooldownPeriod = 60000;
            const currentTime = Date.now();
            const remainingTime = Math.ceil((cooldownPeriod - (currentTime - lastSubmissionTime)) / 1000);
            
            // Disable the button
            submitButton.disabled = true;
            
            // Show rate limit message
            formStatus.textContent = `Please wait ${remainingTime} seconds before submitting again`;
            formStatus.classList.remove('success-status', 'sending-status');
            formStatus.classList.add('error-status');
            
            // Create rate limit notification
            const notification = document.createElement('div');
            notification.className = 'notification error';
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="notification-content">
                    <h3>Rate Limited</h3>
                    <p>Please wait ${remainingTime} seconds before sending another message.</p>
                </div>
            `;
            notificationContainer.appendChild(notification);
            
            // Animate the notification
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
            
            // Re-enable after cooldown
            setTimeout(() => {
                submitButton.disabled = false;
                formStatus.textContent = '';
                formStatus.classList.remove('error-status');
                console.log('Cooldown complete - form re-enabled');
            }, cooldownPeriod - (currentTime - lastSubmissionTime));
            
            console.log('Rate limited - submission blocked');
            return false;
        }
        
        // If not rate limited, proceed with submission
        submitButton.disabled = true; // Disable button during submission
        console.log('Setting submission time:', new Date().toLocaleString());
        localStorage.setItem('lastFormSubmission', Date.now().toString());
        
        if (loadingDots) {
            loadingDots.classList.add('show');
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
            }
            
            if (!response.ok) {
                console.log('Submission failed - removing timestamp');
                localStorage.removeItem('lastFormSubmission');
                submitButton.disabled = false; // Re-enable button on failure
                throw new Error('Network response was not ok');
            }
            
            // Success notification
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="notification-content">
                    <h3>Success!</h3>
                    <p>Thank you for your message! I will respond shortly.</p>
                </div>
            `;

            notificationContainer.appendChild(notification);
            console.log('Submission successful');

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

                this.reset();
            submitButton.disabled = true; // Keep button disabled during cooldown
            
        } catch (error) {
            console.log('Submission error - removing timestamp');
            localStorage.removeItem('lastFormSubmission');
            submitButton.disabled = false; // Re-enable button on error
            
            if (loadingDots) {
                loadingDots.classList.remove('show');
            }
            
            const notification = document.createElement('div');
            notification.className = 'notification error';
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="notification-content">
                    <h3>Error!</h3>
                    <p>There was an error sending your message. Please try again later.</p>
                </div>
            `;

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
            { 
                name: 'Frontend Development', 
                level: 65, 
                category: 'Development', 
                color: 'linear-gradient(45deg, #00ff88 0%, #00ffff 100%)',
                icon: 'fas fa-code'
            },
            { 
                name: 'Backend Development', 
                level: 70, 
                category: 'Development', 
                color: 'linear-gradient(45deg, #B026FF 0%, #ff00ff 100%)',
                icon: 'fas fa-server'
            },
            { 
                name: 'UI/UX Design', 
                level: 50, 
                category: 'Design', 
                color: 'linear-gradient(45deg, #ff00ff 0%, #00ffff 100%)',
                icon: 'fas fa-paint-brush'
            },
            { 
                name: 'Problem Solving & Analysis', 
                level: 60, 
                category: 'Core', 
                color: 'linear-gradient(45deg,rgb(255, 103, 0) 0%,rgb(255, 4, 0) 100%)',
                icon: 'fas fa-puzzle-piece'
            },
            { 
                name: 'Artificial Intelligence', 
                level: 45, 
                category: 'Technology', 
                color: 'linear-gradient(45deg, #8A2BE2 0%, #B026FF 100%)',
                icon: 'fas fa-brain'
            },
            { 
                name: 'SEO Optimization', 
                level: 75, 
                category: 'Marketing', 
                color: 'linear-gradient(45deg, #00FFD1 0%, #00ff88 100%)',
                icon: 'fas fa-search'
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
                    <div class="skill-meter-fill" style="background: ${skill.color}" data-level="${skill.level}">
                        <span class="skill-tooltip">${skill.level}%</span>
                    </div>
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
                            meter.querySelector('.skill-tooltip').textContent = `${currentLevel}%`;
                        }, 20);
                    });

                    observer.unobserve(entry.target);
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
                openModalAndHandleContent(modal);
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
                level: 65, 
                category: 'Development', 
                color: 'linear-gradient(45deg, #00ff88 0%, #00ffff 100%)',
                icon: 'fas fa-code'
            },
            { 
                name: 'Backend Development', 
                level: 70, 
                category: 'Development', 
                color: 'linear-gradient(45deg, #B026FF 0%, #ff00ff 100%)',
                icon: 'fas fa-server'
            },
            { 
                name: 'UI/UX Design', 
                level: 50, 
                category: 'Design', 
                color: 'linear-gradient(45deg, #ff00ff 0%, #00ffff 100%)',
                icon: 'fas fa-paint-brush'
            },
            { 
                name: 'Problem Solving & Analysis', 
                level: 60, 
                category: 'Core', 
                color: 'linear-gradient(45deg,rgb(255, 103, 0) 0%,rgb(255, 4, 0) 100%)',
                icon: 'fas fa-puzzle-piece'
            },
            { 
                name: 'Artificial Intelligence', 
                level: 45, 
                category: 'Technology', 
                color: 'linear-gradient(45deg, #8A2BE2 0%, #B026FF 100%)',
                icon: 'fas fa-brain'
            },
            { 
                name: 'SEO Optimization', 
                level: 75, 
                category: 'Marketing', 
                color: 'linear-gradient(45deg, #00FFD1 0%, #00ff88 100%)',
                icon: 'fas fa-search'
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
                    <div class="skill-meter-fill" style="background: ${skill.color}" data-level="${skill.level}">
                        <span class="skill-tooltip">${skill.level}%</span>
                    </div>
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
                            meter.querySelector('.skill-tooltip').textContent = `${currentLevel}%`;
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
            openModalAndHandleContent(modal);
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
    
    if (!skillsText || !skillsContainer) {
        console.error('Skills typing elements not found');
        return;
    }

    const skills = [
        "C++",
        "Java",
        "OOPS",
        "Python",
        "UI/UX",
    ];
    
    let currentSkillIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeSkill() {
            const currentSkill = skills[currentSkillIndex];
            
            if (isDeleting) {
                skillsText.textContent = currentSkill.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentSkillIndex = (currentSkillIndex + 1) % skills.length;
                setTimeout(typeSkill, 1000); // Pause before typing next word
                return;
            }
            
            setTimeout(typeSkill, 100); // Deletion speed
            } else {
                skillsText.textContent = currentSkill.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            
            if (currentCharIndex === currentSkill.length) {
                isDeleting = true;
                setTimeout(typeSkill, 2000); // Pause at the end of word
                return;
            }
            
            setTimeout(typeSkill, 200); // Typing speed
        }
    }
    
    // Start the typing animation
    setTimeout(typeSkill, 500);
}

// ParticleSystem definition
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

            const particleCount = 300;
            this.particles = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 8;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
            }

            this.particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const particleMaterial = new THREE.PointsMaterial({
                color: 0x8A2BE2,
                size: 0.15,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending,
                vertexColors: false,
                sizeAttenuation: true
            });

            this.particleSystem = new THREE.Points(this.particles, particleMaterial);
            this.scene.add(this.particleSystem);

            const ambientLight = new THREE.AmbientLight(0x9D4EDD, 0.4);
            this.scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0x8A2BE2, 0.8);
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
function openModalAndHandleContent(modal) {
    if (!modal) return;
    
    // Show loading state
    const loadingElement = modal.querySelector('.modal-loading');
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
    
    // Display modal
    modal.style.display = 'block';
    
    // Hide loading state after content is loaded
    if (loadingElement) {
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 500);
    }
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Initialize modal handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle opening modals
    document.addEventListener('click', function(event) {
        const openButton = event.target.closest('.open-modal');
        if (openButton) {
            event.preventDefault();
            const modalId = openButton.getAttribute('data-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModalAndHandleContent(modal);
            }
        }
        
        // Handle closing modals
        if (event.target.classList.contains('modal-close') || 
            event.target.classList.contains('modal')) {
            const modal = event.target.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="display: block"]');
            openModals.forEach(modal => closeModal(modal));
        }
    });
});

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

// Loading page handling
document.addEventListener('DOMContentLoaded', () => {
  // Add loading class to body
  document.body.classList.add('loading');
  
  // Remove loading class and hide loading page after content is loaded
  window.addEventListener('load', () => {
    // Small delay to ensure animations are smooth
    setTimeout(() => {
      document.body.classList.remove('loading');
      const loadingPage = document.querySelector('.loading-page');
      if (loadingPage) {
        loadingPage.classList.add('hidden');
      }
    }, 1500); // Reduced from 2000ms to 1500ms
  });

  // Optimize performance by preloading critical resources
  const preloadImages = () => {
    const images = document.querySelectorAll('img[loading="eager"]');
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  };

  // Call preload function
  preloadImages();
});

// Add passive event listeners for better scroll performance
document.addEventListener('scroll', () => {}, { passive: true });
document.addEventListener('touchstart', () => {}, { passive: true });
document.addEventListener('touchmove', () => {}, { passive: true });

// Performance check and device optimization
function checkDeviceMemory() {
  // Check if the deviceMemory API is available
  if ('deviceMemory' in navigator) {
    return navigator.deviceMemory; // Returns RAM in GB
  }
  
  // Fallback to performance.memory if available (Chrome)
  if (performance && 'memory' in performance) {
    const totalMemory = performance.memory.jsHeapSizeLimit;
    return totalMemory / (1024 * 1024 * 1024); // Convert to GB
  }
  
  // If no memory info available, check other performance indicators
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  
  // If it's mobile and has low CPU, assume it's a low-end device
  if (isMobile && hasLowCPU) {
    return 2;
  }
  
  return 4; // Default to assuming it's not a low-end device
}

function isLowEndDevice() {
  const ram = checkDeviceMemory();
  return ram <= 3; // Consider devices with 3GB or less as low-end
}

// Initialize performance mode immediately
function initPerformanceMode() {
  if (isLowEndDevice()) {
    console.log('Low-end device detected. Enabling performance mode...');
    
    // Add class to body immediately
    document.body.classList.add('low-end-device');
    
    // Disable 3D effects and heavy animations immediately
    const style = document.createElement('style');
    style.textContent = `
      #particles-js { display: none !important; }
      .profile-header-image { animation: none !important; }
      .circular-menu-button { transition: transform 0.2s ease-out !important; }
      * { animation-duration: 0.2s !important; }
    `;
    document.head.appendChild(style);
    
    // Set performance flag in localStorage
    localStorage.setItem('isLowEndDevice', 'true');
    
    // Show performance mode indicator
    const performanceNote = document.createElement('div');
    performanceNote.className = 'performance-note';
    performanceNote.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 9999;
        backdrop-filter: blur(5px);
      ">
        🚀 Basic animation mode enabled for better performance
      </div>
    `;
    document.body.appendChild(performanceNote);
    
    // Remove the note after 5 seconds
    setTimeout(() => {
      performanceNote.style.opacity = '0';
      setTimeout(() => performanceNote.remove(), 1000);
    }, 5000);
    
    // Disable Three.js if it exists
    if (window.THREE) {
      console.log('Disabling Three.js animations...');
      // Clean up Three.js resources
      if (window.threeJsScene) {
        window.threeJsScene.traverse(object => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      if (window.threeJsRenderer) {
        window.threeJsRenderer.dispose();
      }
    }
    
    return true;
  }
  return false;
}

// Run performance check before DOM loads
window.isPerformanceModeEnabled = initPerformanceMode();

// If it's a low-end device, prevent heavy animations from initializing
if (window.isPerformanceModeEnabled) {
  window.addEventListener('load', function() {
    // Double-check and enforce performance mode
    if (document.getElementById('particles-js')) {
      document.getElementById('particles-js').style.display = 'none';
    }
    
    // Replace heavy animations with basic ones
    const profileImage = document.querySelector('.profile-header-image');
    if (profileImage) {
      profileImage.style.animation = 'none';
      profileImage.style.transition = 'transform 0.2s ease-out';
      profileImage.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
      });
      profileImage.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
      });
    }
  });
}

// Prevent any future heavy animations from being added
if (window.isPerformanceModeEnabled) {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const element = mutation.target;
        if (element.style.animation && element.style.animation !== 'none') {
          element.style.animation = 'none';
        }
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['style']
  });
}

document.addEventListener('DOMContentLoaded', () => {
    // Track section views using Intersection Observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                trackSectionView(sectionId);
            }
        });
    }, { threshold: 0.5 }); // Track when section is 50% visible

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Track project clicks
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id') || card.querySelector('h3').textContent;
            trackProjectClick(projectId);
        });
    });

    // Track certification views
    document.querySelectorAll('.certification-card').forEach(cert => {
        cert.addEventListener('click', () => {
            const certId = cert.getAttribute('data-cert-id') || cert.querySelector('h3').textContent;
            trackCertificationView(certId);
        });
    });

    // Track blog post views
    document.querySelectorAll('.blog-card').forEach(blog => {
        blog.addEventListener('click', () => {
            const blogId = blog.getAttribute('data-blog-id') || blog.querySelector('h3').textContent;
            trackBlogView(blogId);
        });
    });

    // Track resume downloads
    document.querySelector('.resume-button').addEventListener('click', () => {
        trackDownload('resume');
    });

    // Track social media clicks
    document.querySelectorAll('.footer-social-media a').forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.getAttribute('aria-label').replace('Visit my ', '').replace(' profile', '');
            trackSocialClick(platform);
        });
    });

    // Track form submissions
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        const originalSubmitHandler = contactForm._submitHandler;
        contactForm._submitHandler = async function(e) {
            e.preventDefault();
            
            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // Track form submission status
                trackFormSubmission('contact', response.ok ? 'success' : 'error');

                // Continue with original handler
                if (originalSubmitHandler) {
                    return originalSubmitHandler.call(this, e);
                }
            } catch (error) {
                trackFormSubmission('contact', 'error');
                throw error;
            }
        };
    }
});