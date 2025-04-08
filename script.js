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
        
    }, 100); // Update every 100ms for smoother animation


    createParticles();
    
    // Cursor blink
    setInterval(() => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.classList.toggle('blink');
        }
    }, 500);


    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && 
            !navLinksContainer.contains(e.target) && 
            navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }, { passive: true });


    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('header');


    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
    dropbtn.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownContent.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!dropbtn.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.classList.remove('show');
        }
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (!this.classList.contains('dropbtn') && this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
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
            { name: 'Containerization', level: 60, category: 'DevOps', color: '#4169E1' } // Add this line
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
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


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
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-target');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
            modal.querySelector('.modal-content').classList.add('rotate-in');
        });
    });

    document.querySelectorAll('.modal-close').forEach(span => {
        span.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.querySelector('.modal-content').classList.remove('rotate-in');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modal = e.target;
            modal.querySelector('.modal-content').classList.remove('rotate-in');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });


    document.querySelectorAll('.certification-image').forEach(image => {
        image.removeEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });


    document.querySelectorAll('.open-blog-modal').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('blog-modal').style.display = 'block';
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

    let scene, camera, renderer, particles, particleSystem, controls;

    function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);


        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;


        renderer = new THREE.WebGLRenderer({ 
            antialias: true
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
        } else {
            console.error('Home section not found');
            return;
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
            color: 0x8A2BE2, // Purple color
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


        controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.noPan = true;
        controls.noZoom = true;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        

        renderer.domElement.addEventListener('touchstart', () => {}, { passive: true });
        renderer.domElement.addEventListener('touchmove', () => {}, { passive: true });
        

        renderer.domElement.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });


        window.addEventListener('resize', onWindowResize, false);

        animate();
    }

    function onWindowResize() {
        const homeSection = document.getElementById('home');
        if (homeSection) {
            camera.aspect = homeSection.offsetWidth / homeSection.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(homeSection.offsetWidth, homeSection.offsetHeight);
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        

        const time = Date.now() * 0.001;
        particleSystem.material.opacity = 0.6 + Math.sin(time) * 0.2;
        
        particleSystem.rotation.y += 0.001;

        controls.update();
        renderer.render(scene, camera);
    }

    init();
    initResponsive();


    function initResponsive() {

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        

        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-touch', isTouch);
        

        const modals = document.querySelectorAll('.modal');
        if(isMobile) {
          modals.forEach(modal => {
            modal.addEventListener('touchmove', e => {
              e.preventDefault();
            }, { passive: false });
          });
        }
        

        const images = document.querySelectorAll('img[data-src]');
        const loadImage = (img) => {
          const src = img.getAttribute('data-src');
          if(!src) return;
          img.src = src;
        };
        
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if(entry.isIntersecting) {
              loadImage(entry.target);
              imageObserver.unobserve(entry.target);
            }
          });
        });
        
        images.forEach(img => imageObserver.observe(img));
        

        const resizeChart = () => {
          if(window.ApexCharts) {
            const chart = document.querySelector('#skillsChart');
            if(chart) {
              chart.style.height = window.innerWidth < 768 ? '300px' : '350px';
            }
          }
        };
        
        window.addEventListener('resize', debounce(resizeChart, 250));
        resizeChart();
      }
      

      function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }


    const homeImage = document.querySelector('.profile-header-image');
    let lastScrollY = window.scrollY;
    
    function handleParallax() {
        if (homeImage) {
            const scrollY = window.scrollY;
            const speed = 0.5; // Adjust this value to change parallax intensity
            const offset = (scrollY - lastScrollY) * speed;
            const currentTransform = getComputedStyle(homeImage).transform;
            const matrix = new DOMMatrix(currentTransform);
            const currentY = matrix.m42;
            
            homeImage.style.transform = `perspective(1000px) rotateY(0deg) translateY(${currentY + offset}px)`;
            homeImage.style.transition = 'transform 0.3s ease-out';
            
            lastScrollY = scrollY;
        }
    }


    window.addEventListener('scroll', () => {

        requestAnimationFrame(handleParallax);
    }, { passive: true });


    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', async function() {
            const modalId = this.getAttribute('data-target');
            const modal = document.getElementById(modalId);
            if (modal) {

                modal.style.display = 'block';
                modal.classList.add('loading');
                

                await new Promise(resolve => setTimeout(resolve, 100));
                

                const images = modal.querySelectorAll('img');
                if (images.length) {
                    await Promise.all([...images].map(img => {
                        return new Promise((resolve) => {
                            if (img.complete) resolve();
                            else {
                                img.onload = resolve;
                                img.onerror = resolve;
                            }
                        });
                    }));
                }
                

                modal.classList.remove('loading');
                modal.querySelector('.modal-content').classList.add('rotate-in');
                

                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.scrollTop = 0;
                }
                

                document.body.style.overflow = 'hidden';
            }
        });
    });


    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });


    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = '';
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


                    const navLinksContainer = document.querySelector('.nav-links-container');
                    if (navLinksContainer.classList.contains('active')) {
                        navLinksContainer.classList.remove('active');
                        document.querySelector('.menu-toggle').classList.remove('active');
                        document.body.style.overflow = '';
                    }
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