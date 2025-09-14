document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    const ctaButton = document.querySelector('.cta-button');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');

            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            menuCategories.forEach(category => {
                if (category.id === targetCategory) {
                    category.classList.remove('hidden');
                } else {
                    category.classList.add('hidden');
                }
            });
        });
    });

    ctaButton.addEventListener('click', function() {
        document.getElementById('menu').scrollIntoView({
            behavior: 'smooth'
        });
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px var(--shadow)';

            const image = this.querySelector('.menu-item-image');
            if (image) {
                image.style.transform = 'scale(1.1) rotate(2deg)';
            }
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';

            const image = this.querySelector('.menu-item-image');
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        item.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });

    function createFloatingElements() {
        const hero = document.querySelector('.hero');
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.innerHTML = ['🌸', '🍃', '✨'][Math.floor(Math.random() * 3)];
            element.style.position = 'absolute';
            element.style.fontSize = '1.5rem';
            element.style.opacity = '0.3';
            element.style.pointerEvents = 'none';
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
            element.style.animationDelay = Math.random() * 2 + 's';
            hero.appendChild(element);
        }
    }

    createFloatingElements();

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInFromBottom 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.menu-section, .about-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });

    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image');

        if (hero && heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }

    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    function update() {
        parallaxEffect();
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (window.scrollY > 100) {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.transform = 'translateY(0)';
        } else {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }

        requestTick();
    });
});