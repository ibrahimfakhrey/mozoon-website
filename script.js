// MOOZEN Website JavaScript
// Professional, modern, and responsive functionality

// Hero Background Slider
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.slideTexts = document.querySelectorAll('.slide-text');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.slideDuration = 5000; // 5 seconds
        
        if (this.slides.length > 0 && this.slideTexts.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Initialize first slide and text as active
        this.slides[0].classList.add('active');
        this.slideTexts[0].classList.add('active');
        
        // Initialize typewriter for the first slide
        const firstTypewriter = this.slideTexts[0].querySelector('.typewriter-text');
        if (firstTypewriter && firstTypewriter.startTypewriter) {
            // Start the first typewriter immediately
            firstTypewriter.startTypewriter();
        }
        
        // Start automatic sliding
        this.startSlideshow();
        
        // Pause on hover (optional enhancement)
        const heroSection = document.querySelector('.hero-slider');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => this.pauseSlideshow());
            heroSection.addEventListener('mouseleave', () => this.startSlideshow());
        }
    }
    
    nextSlide() {
        // Reset typewriter for current slide
        const currentTypewriter = this.slideTexts[this.currentSlide].querySelector('.typewriter-text');
        if (currentTypewriter && currentTypewriter.resetTypewriter) {
            currentTypewriter.resetTypewriter();
        }
        
        // Remove active class from current slide and text
        this.slides[this.currentSlide].classList.remove('active');
        this.slideTexts[this.currentSlide].classList.remove('active');
        
        // Move to next slide
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        
        // Add active class to new slide and text
        this.slides[this.currentSlide].classList.add('active');
        this.slideTexts[this.currentSlide].classList.add('active');
        
        // Start typewriter for new slide
        setTimeout(() => {
            const newTypewriter = this.slideTexts[this.currentSlide].querySelector('.typewriter-text');
            if (newTypewriter && newTypewriter.startTypewriter) {
                newTypewriter.startTypewriter();
            }
        }, 300); // Small delay for smooth transition
    }
    
    startSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
        
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }
    
    pauseSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    destroy() {
        this.pauseSlideshow();
    }
}

// Interactive Particle Network Effect
class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.animationId = null;
        
        this.config = {
            particleCount: window.innerWidth > 768 ? 80 : 40,
            maxDistance: 120,
            mouseRadius: 150,
            particleSpeed: 0.5,
            particleSize: 2,
            lineOpacity: 0.3,
            particleOpacity: 0.8,
            mouseAttraction: 0.03,
            colors: {
                particles: 'rgba(212, 175, 55, 0.8)',
                lines: 'rgba(255, 255, 255, 0.2)',
                mouseLines: 'rgba(212, 175, 55, 0.4)'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    setupCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = this.canvas.clientWidth;
        const displayHeight = this.canvas.clientHeight;
        
        this.canvas.width = displayWidth * dpr;
        this.canvas.height = displayHeight * dpr;
        this.canvas.style.width = displayWidth + 'px';
        this.canvas.style.height = displayHeight + 'px';
        
        this.ctx.scale(dpr, dpr);
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.clientWidth,
                y: Math.random() * this.canvas.clientHeight,
                vx: (Math.random() - 0.5) * this.config.particleSpeed,
                vy: (Math.random() - 0.5) * this.config.particleSpeed,
                originalVx: (Math.random() - 0.5) * this.config.particleSpeed,
                originalVy: (Math.random() - 0.5) * this.config.particleSpeed,
                size: Math.random() * this.config.particleSize + 1
            });
        }
    }
    
    bindEvents() {
        // Mouse move event
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        // Mouse leave event
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        // Resize event
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.createParticles();
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Mouse attraction effect
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.mouseRadius) {
                    const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                    particle.vx += dx * force * this.config.mouseAttraction;
                    particle.vy += dy * force * this.config.mouseAttraction;
                }
            }
            
            // Apply velocity with damping
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Gradually return to original velocity
            particle.vx += (particle.originalVx - particle.vx) * 0.01;
            particle.vy += (particle.originalVy - particle.vy) * 0.01;
            
            // Boundary collision
            if (particle.x < 0 || particle.x > this.canvas.clientWidth) {
                particle.vx *= -1;
                particle.originalVx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.clientHeight) {
                particle.vy *= -1;
                particle.originalVy *= -1;
            }
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.clientWidth, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.clientHeight, particle.y));
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.config.colors.particles;
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        // Particle to particle connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.maxDistance) {
                    const opacity = (1 - distance / this.config.maxDistance) * this.config.lineOpacity;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = this.config.colors.lines.replace('0.2', opacity.toString());
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
        
        // Mouse to particle connections
        if (this.mouse.x !== null && this.mouse.y !== null) {
            this.particles.forEach(particle => {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.mouseRadius) {
                    const opacity = (1 - distance / this.config.mouseRadius) * 0.6;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = this.config.colors.mouseLines.replace('0.4', opacity.toString());
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.setupCanvas);
    }
}

// Enhanced Hero Section Effects
class HeroEffects {
    constructor() {
        this.init();
    }

    init() {
        this.initParallaxEffect();
        this.initTypewriterEffect();
        this.initScrollIndicator();
        this.initParticleInteraction();
        this.initHeroAnimations();
        this.initParticleNetwork(); // Initialize particle network
        this.initHeroSlider(); // Initialize hero slider
    }
    
    // Initialize hero background slider
    initHeroSlider() {
        this.heroSlider = new HeroSlider();
    }
    
    // Initialize particle network effect
    initParticleNetwork() {
        // Initialize particle network after a short delay to ensure canvas is ready
        setTimeout(() => {
            this.particleNetwork = new ParticleNetwork('particle-network-canvas');
        }, 100);
    }

    initParallaxEffect() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxHero = document.querySelector('.parallax-hero');
            
            // Disable parallax on mobile devices for better performance
            if (parallaxHero && window.innerWidth > 768) {
                const rate = scrolled * -0.5;
                parallaxHero.style.transform = `translateY(${rate}px)`;
            } else if (parallaxHero && window.innerWidth <= 768) {
                // Reset transform on mobile
                parallaxHero.style.transform = 'none';
            }
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
        
        // Handle resize events to toggle parallax
        window.addEventListener('resize', () => {
            const parallaxHero = document.querySelector('.parallax-hero');
            if (parallaxHero && window.innerWidth <= 768) {
                parallaxHero.style.transform = 'none';
            }
        });
    }

    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        if (!typewriterElements.length) return;

        // Initialize typewriter for each text element
        typewriterElements.forEach((element, index) => {
            this.setupTypewriter(element, index);
        });
    }

    setupTypewriter(element, slideIndex) {
        const text = element.getAttribute('data-text') || element.textContent.trim();
        if (!text) return;
        
        let currentIndex = 0;
        let isTyping = false;
        
        // Create methods for controlling the typewriter
        element.startTypewriter = () => {
            if (isTyping) return;
            
            isTyping = true;
            element.textContent = '';
            element.style.borderRight = '2px solid #FFD700';
            currentIndex = 0;
            
            const typeChar = () => {
                if (currentIndex < text.length) {
                    element.textContent += text.charAt(currentIndex);
                    currentIndex++;
                    setTimeout(typeChar, 80); // Consistent typing speed
                } else {
                    // Typing complete, remove cursor after delay
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                        isTyping = false;
                    }, 1000);
                }
            };
            
            typeChar();
        };
        
        element.resetTypewriter = () => {
            isTyping = false;
            element.textContent = '';
            element.style.borderRight = 'none';
            currentIndex = 0;
        };
        
        // For the first slide (index 0), start immediately
        if (slideIndex === 0) {
            // Show first text immediately without typing effect
            element.textContent = text;
            element.style.borderRight = 'none';
            element.style.color = '#FFD700'; // Uniform color scheme
        } else {
            // For other slides, prepare but don't start
            element.textContent = '';
            element.style.borderRight = 'none';
            element.style.color = '#FFD700'; // Uniform color scheme
        }
    }

    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (!scrollIndicator) return;

        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.services-overview');
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Hide scroll indicator when user scrolls
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    initParticleInteraction() {
        const particles = document.querySelectorAll('.particle');
        const shapes = document.querySelectorAll('.shape');
        
        // Only enable mouse interaction on desktop devices
        if (window.innerWidth > 768) {
            // Add mouse interaction to particles
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                particles.forEach((particle, index) => {
                    const speed = (index + 1) * 0.5;
                    const x = (mouseX - 0.5) * speed;
                    const y = (mouseY - 0.5) * speed;
                    
                    particle.style.transform = `translate(${x}px, ${y}px)`;
                });

                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.3;
                    const x = (mouseX - 0.5) * speed;
                    const y = (mouseY - 0.5) * speed;
                    
                    shape.style.transform += ` translate(${x}px, ${y}px)`;
                });
            });
        }
        
        // Handle resize to disable/enable interactions
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                // Reset transforms on mobile
                particles.forEach(particle => {
                    particle.style.transform = 'none';
                });
                shapes.forEach(shape => {
                    shape.style.transform = shape.style.transform.replace(/translate\([^)]*\)/g, '');
                });
            }
        });
    }

    initHeroAnimations() {
        // Animate hero content on load
        const heroContent = document.querySelector('.hero-content');
        const fadeElements = document.querySelectorAll('.fade-in-up');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 500);
        }

        // Stagger animation for fade-in-up elements
        fadeElements.forEach((element, index) => {
            element.style.animationDelay = `${0.5 + (index * 0.2)}s`;
        });
    }
}

// Initialize hero effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroEffects();
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initCounters();
    initContactForm();
    initSmoothScrolling();
    initMobileMenu();
    initBackToTop();
    initTestimonialSlider();
    initImageLazyLoading();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter animation for statistics
function initCounters() {
    const counters = document.querySelectorAll('.stats-number');
    const speed = 200;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/[^\d]/g, ''));
                const increment = target / speed;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current).toLocaleString();
                        setTimeout(updateCounter, 1);
                    } else {
                        counter.textContent = target.toLocaleString();
                        if (counter.textContent.includes('+')) {
                            counter.textContent += '+';
                        }
                        if (counter.textContent.includes('%')) {
                            counter.textContent += '%';
                        }
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');
        
        // Validate form
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
        // Show loading state
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button state
            btnText.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            submitBtn.disabled = false;
            
            // Show success message
            successMessage.classList.remove('d-none');
            form.reset();
            form.classList.remove('was-validated');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 2000);
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
}

// Back to top button
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length === 0) return;
    
    let currentIndex = 0;
    const totalCards = testimonialCards.length;
    
    // Auto-rotate testimonials
    setInterval(() => {
        testimonialCards[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalCards;
        testimonialCards[currentIndex].classList.add('active');
    }, 5000);
    
    // Initialize first testimonial as active
    if (testimonialCards[0]) {
        testimonialCards[0].classList.add('active');
    }
}

// Lazy loading for images
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Map loading functionality
function loadMap() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (!mapPlaceholder) return;
    
    // Replace with actual map implementation (Google Maps, Mapbox, etc.)
    mapPlaceholder.innerHTML = `
        <div class="map-content">
            <i class="fas fa-map-marked-alt"></i>
            <h3>Interactive Map Loading...</h3>
            <p>Map integration would be implemented here with Google Maps or similar service</p>
        </div>
    `;
    
    // Simulate map loading
    setTimeout(() => {
        mapPlaceholder.innerHTML = `
            <div class="map-content">
                <i class="fas fa-check-circle"></i>
                <h3>Map Loaded Successfully</h3>
                <p>Interactive map showing MOOZEN office locations across Saudi Arabia</p>
                <div class="mt-3">
                    <span class="badge bg-primary me-2">Riyadh HQ</span>
                    <span class="badge bg-secondary me-2">Jeddah Branch</span>
                    <span class="badge bg-info">Dammam Branch</span>
                </div>
            </div>
        `;
    }, 1500);
}

// Service card interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card, .detailed-service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Client logo hover effects
document.addEventListener('DOMContentLoaded', function() {
    const clientLogos = document.querySelectorAll('.client-logo');
    
    clientLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.filter = 'grayscale(0%)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'grayscale(100%)';
        });
    });
});

// FAQ accordion enhancements
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add smooth transition effect
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });
});

// Performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Preload critical images
    const criticalImages = [
        'logo mozoon.svg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollEffects() {
        // Update navbar and other scroll-dependent elements
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Implement error reporting if needed
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation support
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.tagName === 'A') {
                this.click();
            }
        });
    });
    
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Add CSS for back to top button and other dynamic elements
const dynamicStyles = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .navbar.scrolled .navbar-brand,
    .navbar.scrolled .nav-link {
        color: var(--dark-color) !important;
    }
    
    .testimonial-card {
        opacity: 0.7;
        transform: scale(0.95);
        transition: all 0.5s ease;
    }
    
    .testimonial-card.active {
        opacity: 1;
        transform: scale(1);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 1rem;
        }
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Language preference manager
class LanguagePreference {
    constructor() {
        this.languageMap = {
            index: { en: 'index.html', ar: 'index-ar.html' },
            services: { en: 'services.html', ar: 'services-ar.html' },
            about: { en: 'about.html', ar: 'about-ar.html' },
            clients: { en: 'clients.html', ar: 'clients-ar.html' },
            contact: { en: 'contact.html', ar: 'contact-ar.html' }
        };

        this.defaultPage = 'index.html';
    }

    init() {
        if (typeof window === 'undefined') return;

        const currentPath = window.location.pathname.split('/').pop() || this.defaultPage;
        const currentLanguage = this.detectLanguage(currentPath);
        const normalizedKey = this.normalizeKey(currentPath);
        const storedPreference = this.getStoredPreference();

        if (!storedPreference) {
            this.storePreference(currentLanguage);
        } else if (storedPreference !== currentLanguage) {
            const targetPage = this.getTargetPage(normalizedKey, storedPreference);
            if (targetPage && targetPage !== currentPath) {
                window.location.href = this.buildTargetUrl(targetPage);
                return;
            }
        }

        this.bindToggleHandlers();
    }

    detectLanguage(path) {
        return path.includes('-ar.html') ? 'ar' : 'en';
    }

    normalizeKey(path) {
        const fileName = path.replace('.html', '');
        return fileName.endsWith('-ar') ? fileName.replace('-ar', '') : fileName;
    }

    getTargetPage(key, language) {
        return this.languageMap[key]?.[language] || null;
    }

    buildTargetUrl(targetPage) {
        const segments = window.location.pathname.split('/');
        segments[segments.length - 1] = targetPage;
        return segments.join('/');
    }

    getStoredPreference() {
        try {
            return localStorage.getItem('preferredLanguage');
        } catch (error) {
            return null;
        }
    }

    storePreference(language) {
        try {
            localStorage.setItem('preferredLanguage', language);
        } catch (error) {
            // Ignore storage errors (e.g., privacy mode)
        }
    }

    bindToggleHandlers() {
        const toggles = document.querySelectorAll('.language-switch');
        if (toggles.length === 0) return;

        toggles.forEach((toggle) => {
            toggle.addEventListener('click', () => {
                const targetLanguage = toggle.dataset.language;
                if (targetLanguage) {
                    this.storePreference(targetLanguage);
                }
            });
        });
    }
}

// Initialize language preference manager immediately after definition
const languagePreference = new LanguagePreference();
languagePreference.init();

// Random Services Gallery Class
class RandomServicesGallery {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.shuffledImages = [];
        this.imageElement = null;
        this.counterElement = null;
        this.totalElement = null;
        this.progressElement = null;
        this.isInitialized = false;
    }

    init() {
        // Only initialize if we're on the services page
        if (!document.getElementById('randomServiceImage')) {
            return;
        }

        this.imageElement = document.getElementById('randomServiceImage');
        this.counterElement = document.getElementById('currentImageNumber');
        this.totalElement = document.getElementById('totalImages');
        this.progressElement = document.getElementById('imageProgress');

        // Generate image list (1.jpg to 12.jpg)
        for (let i = 1; i <= 12; i++) {
            this.images.push(`services/${i}.jpg`);
        }

        this.shuffleImages();
        this.setupEventListeners();
        this.displayCurrentImage();
        this.updateProgress();
        this.isInitialized = true;
    }

    shuffleImages() {
        // Fisher-Yates shuffle algorithm
        this.shuffledImages = [...this.images];
        for (let i = this.shuffledImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledImages[i], this.shuffledImages[j]] = [this.shuffledImages[j], this.shuffledImages[i]];
        }
        this.currentIndex = 0;
    }

    setupEventListeners() {
        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');
        const randomizeBtn = document.getElementById('randomizeImages');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousImage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }

        if (randomizeBtn) {
            randomizeBtn.addEventListener('click', () => this.randomizeImages());
        }

        // Auto-advance images every 5 seconds
        this.autoAdvanceInterval = setInterval(() => {
            this.nextImage();
        }, 5000);

        // Pause auto-advance on hover
        if (this.imageElement) {
            this.imageElement.parentElement.addEventListener('mouseenter', () => {
                clearInterval(this.autoAdvanceInterval);
            });

            this.imageElement.parentElement.addEventListener('mouseleave', () => {
                this.autoAdvanceInterval = setInterval(() => {
                    this.nextImage();
                }, 5000);
            });
        }
    }

    displayCurrentImage() {
        if (this.imageElement && this.shuffledImages.length > 0) {
            const currentImage = this.shuffledImages[this.currentIndex];
            
            // Add fade effect
            this.imageElement.style.opacity = '0';
            
            setTimeout(() => {
                this.imageElement.src = currentImage;
                this.imageElement.alt = `Service Image ${this.currentIndex + 1}`;
                this.imageElement.style.opacity = '1';
            }, 250);

            this.updateCounter();
            this.updateProgress();
        }
    }

    updateCounter() {
        if (this.counterElement) {
            this.counterElement.textContent = this.currentIndex + 1;
        }
        if (this.totalElement) {
            this.totalElement.textContent = this.shuffledImages.length;
        }
    }

    updateProgress() {
        if (this.progressElement) {
            const progress = ((this.currentIndex + 1) / this.shuffledImages.length) * 100;
            this.progressElement.style.width = `${progress}%`;
        }
    }

    nextImage() {
        if (this.shuffledImages.length === 0) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.shuffledImages.length;
        this.displayCurrentImage();
    }

    previousImage() {
        if (this.shuffledImages.length === 0) return;
        
        this.currentIndex = this.currentIndex === 0 ? this.shuffledImages.length - 1 : this.currentIndex - 1;
        this.displayCurrentImage();
    }

    randomizeImages() {
        this.shuffleImages();
        this.displayCurrentImage();
        
        // Visual feedback for randomization
        const randomizeBtn = document.getElementById('randomizeImages');
        if (randomizeBtn) {
            const originalText = randomizeBtn.innerHTML;
            randomizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Shuffling...';
            randomizeBtn.disabled = true;
            
            setTimeout(() => {
                randomizeBtn.innerHTML = originalText;
                randomizeBtn.disabled = false;
            }, 1000);
        }
    }

    destroy() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
        }
    }
}

// Initialize Random Services Gallery
document.addEventListener('DOMContentLoaded', function() {
    const gallery = new RandomServicesGallery();
    gallery.init();
    
    // Store reference for potential cleanup
    window.randomServicesGallery = gallery;
});
