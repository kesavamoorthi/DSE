document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Hamburger Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent this click from being caught by the 'document' click listener immediately
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Toggle body scroll to prevent scrolling when mobile menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // --- Services Dropdown Toggle (Click-activated) ---
    const servicesMainLink = document.querySelector('.nav-link.services-main-link');
    if (servicesMainLink) {
        const dropdownMenu = servicesMainLink.nextElementSibling;

        if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
            servicesMainLink.addEventListener('click', function(event) {
                event.preventDefault(); // Makes the main 'Services' link a toggle
                event.stopPropagation(); // Prevent 'document' click listener from closing it right away

                const isExpanded = this.getAttribute('aria-expanded') === 'true';

                // Close any other open dropdowns before opening a new one
                closeAllDropdowns();

                if (!isExpanded) { // If it was closed, open it
                    this.setAttribute('aria-expanded', 'true');
                    dropdownMenu.classList.add('active');
                    this.classList.add('active-main-link');
                }
            });
        }
    }
    
    // Function to close all open dropdowns
    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-menu.active').forEach(openMenu => {
            openMenu.classList.remove('active');
            const toggle = openMenu.previousElementSibling;
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('active-main-link');
            }
        });
    };

    // --- Close Menus when clicking outside ---
    document.addEventListener('click', function(event) {
        // Close Services Dropdown if click is outside
        const openServicesDropdown = document.querySelector('.dropdown-menu.active');
        if (openServicesDropdown && !openServicesDropdown.closest('.nav-item.dropdown').contains(event.target)) {
            closeAllDropdowns();
        }

        // Close Mobile Nav Menu if click is outside
        if (navMenu && navMenu.classList.contains('active') && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Close mobile menu when a link inside it is clicked ---
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    const isServicesToggle = link.classList.contains('services-main-link');
                    // Close menu if it's NOT the services toggle link (which has its own logic)
                    if(!isServicesToggle) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    }

    // --- FAQ and Service Detail Page Collapsible/Accordion ---
    const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');
    collapsibleTriggers.forEach(trigger => {
        const panel = trigger.nextElementSibling;
        const icon = trigger.querySelector('.faq-toggle-icon');

        trigger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!isExpanded));

            if (panel) {
                if (!isExpanded) {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    if (icon) { icon.style.transform = 'rotate(45deg)'; }
                } else {
                    panel.style.maxHeight = null;
                    if (icon) { icon.style.transform = 'rotate(0deg)'; }
                }
            }
        });
    });

    // --- Dynamic Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // --- Other scripts from your original file (Smooth Scroll, Animations, etc.) ---

    // Smooth scrolling for on-page anchor links (e.g. href="#contact")
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                try {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        e.preventDefault();
                        const navbar = document.querySelector('.navbar');
                        const navbarHeight = navbar ? navbar.offsetHeight : 0;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                } catch (error) {
                    // Fail silently if selector is invalid, allows normal link behavior
                }
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 15, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.9)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const animateObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const animateElements = document.querySelectorAll('.service-card, .process-card, .feature-card, .stat-card, .country-card, .feature-card-detailed, .benefit-card, .about-us-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animateObserver.observe(el);
    });

    //Display Your global partner for apparel sourcing text word by word after each 300ms
    const heroTitle = document.getElementById("animated-title");

    const titleWords = [
        "YOUR",
        "<span class='gradient-text'>GLOBAL</span>",
        "<span class='gradient-text'>PARTNER</span>",
        "<br>",
        "FOR",
        "APPAREL",
        "SOURCING"
    ];

    if (heroTitle) {
        let delay = 0;
        const delayPerLetter = 50;

        titleWords.forEach((word) => {
            if (word === "<br>") {
                heroTitle.appendChild(document.createElement("br"));
                return;
            }

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = word;
            const child = tempDiv.firstElementChild;

            // Nếu là thẻ có class (vd: span.gradient-text)
            if (child && child.tagName) {
                child.style.opacity = "0";
                child.style.transform = "translateY(20px)";
                child.style.display = "inline-block";
                child.style.transition = "opacity 0.6s ease, transform 0.6s ease";

                heroTitle.appendChild(child);

                setTimeout(() => {
                    requestAnimationFrame(() => {
                        child.style.opacity = "1";
                        child.style.transform = "translateY(0)";
                    });
                }, delay);

                delay += 400; // delay thêm cho khối nguyên từ
            } else {
                // Với từ thường, tách từng ký tự
                const letters = word.split("");
                const wrapper = document.createElement("span");
                wrapper.style.display = "inline-block";
                heroTitle.appendChild(wrapper);

                letters.forEach((letter) => {
                    const span = document.createElement("span");
                    span.textContent = letter;
                    span.style.opacity = "0";
                    span.style.display = "inline-block";
                    span.style.transform = "translateY(20px)";
                    span.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                    span.style.willChange = "opacity, transform";

                    wrapper.appendChild(span);

                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            span.style.opacity = "1";
                            span.style.transform = "translateY(0)";
                        });
                    }, delay);

                    delay += delayPerLetter;
                });

                // Thêm khoảng trắng
                const space = document.createElement("span");
                space.textContent = " ";
                wrapper.appendChild(space);
            }
        });
    }

    // --- Contact Form Submission with EmailJS ---
    const contactForm = document.querySelector('#contact-page .contact-form');
    function setupContactForm() {
        if (contactForm && typeof window.emailjs !== 'undefined') {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const formObj = {};
                formData.forEach((value, key) => { formObj[key] = value; });
                // Replace these with your actual EmailJS values
                const serviceID = 'service_q1vy7ng'; // TODO: Replace with your EmailJS service ID
                const templateID = 'template_7no7q72'; // TODO: Replace with your EmailJS template ID
                emailjs.send(serviceID, templateID, formObj)
                    .then(function(response) {
                        alert('Your inquiry has been sent successfully!');
                        contactForm.reset();
                    }, function(error) {
                        alert('There was an error sending your inquiry. Please try again later.');
                    });
            });
        }
    }

    // Wait for EmailJS to be loaded before setting up the form
    function waitForEmailJSAndSetupForm() {
        if (typeof window.emailjs !== 'undefined') {
            setupContactForm();
        } else {
            // Poll every 100ms until emailjs is loaded (max 5s)
            let waited = 0;
            const interval = setInterval(() => {
                if (typeof window.emailjs !== 'undefined') {
                    clearInterval(interval);
                    setupContactForm();
                } else if ((waited += 100) > 5000) {
                    clearInterval(interval);
                    // Optionally, show an error or fallback
                }
            }, 100);
        }
    }
    waitForEmailJSAndSetupForm();

}); // End of DOMContentLoaded

// === Product Category Slideshow ===
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('slideshow-modal');
    const closeBtn = document.querySelector('.close-slideshow');
    const prevBtn = document.querySelector('.slideshow-prev');
    const nextBtn = document.querySelector('.slideshow-next');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const caption = document.querySelector('.slideshow-caption');
    let currentSlide = 0;
    let slides = [];
    let captions = [];

    // Images for each category
    const categoryImages = {
        casuals: [
            {src: 'images/casuals/Casual1.png', caption: 'Casual Wear 1'},
            {src: 'images/casuals/Casual2.png', caption: 'Casual Wear 2'}
        ],
        sports: [
            {src: 'images/Sports/Sports1.png', caption: 'Sportswear 1'},
            {src: 'images/Sports/Sports2.png', caption: 'Sportswear 2'},
            {src: 'images/Sports/Sports3.png', caption: 'Sportswear 3'},
            {src: 'images/Sports/Sports4.png', caption: 'Sportswear 4'},
            {src: 'images/Sports/Sports5.png', caption: 'Sportswear 5'},
            {src: 'images/Sports/Sport6.png', caption: 'Sportswear 6'}
        ],
        workwear: [
            {src: 'images/WorkWear/Workwear.png', caption: 'Workwear & Uniforms'}
        ],
        fashion: [
            {src: 'images/Fashion/Fashion1.png', caption: 'Fashion Apparel 1'},
            {src: 'images/Fashion/Fashion2.png', caption: 'Fashion Apparel 2'},
            {src: 'images/Fashion/Fashion3.png', caption: 'Fashion Apparel 3'},
            {src: 'images/Fashion/Fashion4.png', caption: 'Fashion Apparel 4'}
        ],
        outerwear: [
            {src: 'images/OuterWear/Outerwear1.png', caption: 'Outerwear 1'},
            {src: 'images/OuterWear/Outerwear2.png', caption: 'Outerwear 2'}
        ],
        innerwear: [
            {src: 'images/InnerWear/Innerwear.png', caption: 'Undergarments & Intimates'}
        ]
    };

    // Open modal and show slides for a category
    function openSlideshow(category) {
        slides = categoryImages[category] || [];
        if (!slides.length) return;
        slideshowContainer.innerHTML = '';
        captions = [];
        slides.forEach((img, idx) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slideshow-slide' + (idx === 0 ? ' active' : '');
            const image = document.createElement('img');
            image.src = img.src;
            image.alt = img.caption;
            image.className = 'slideshow-image';
            slideDiv.appendChild(image);
            slideshowContainer.appendChild(slideDiv);
            captions.push(img.caption);
        });
        currentSlide = 0;
        updateSlideshow();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSlideshow() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateSlideshow() {
        const allSlides = slideshowContainer.querySelectorAll('.slideshow-slide');
        allSlides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentSlide);
        });
        caption.textContent = captions[currentSlide] || '';
    }

    function showPrev() {
        if (!slides.length) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlideshow();
    }
    function showNext() {
        if (!slides.length) return;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideshow();
    }

    // Event listeners
    document.querySelectorAll('.product-category-card[data-category="casuals"]').forEach(card => {
        card.addEventListener('click', function() {
            openSlideshow('casuals');
        });
    });
    closeBtn && closeBtn.addEventListener('click', closeSlideshow);
    prevBtn && prevBtn.addEventListener('click', showPrev);
    nextBtn && nextBtn.addEventListener('click', showNext);
    // Close modal on outside click
    modal && modal.addEventListener('click', function(e) {
        if (e.target === modal) closeSlideshow();
    });
    // Close on ESC
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active') && e.key === 'Escape') closeSlideshow();
    });

    // Event listeners for all product category cards
    const categoryMap = {
        casuals: 'casuals',
        'sportswear-activewear': 'sports',
        'workwear-uniforms': 'workwear',
        'fashion-apparel': 'fashion',
        outerwear: 'outerwear',
        'undergarments-intimates': 'innerwear'
    };
    // Attach click listeners
    document.querySelectorAll('.product-category-card').forEach(card => {
        let cat = card.getAttribute('data-category');
        if (!cat) {
            // fallback: try to infer from heading text
            const h3 = card.querySelector('h3');
            if (h3) {
                const text = h3.textContent.toLowerCase();
                if (text.includes('casual')) cat = 'casuals';
                else if (text.includes('sportswear')) cat = 'sports';
                else if (text.includes('workwear')) cat = 'workwear';
                else if (text.includes('fashion')) cat = 'fashion';
                else if (text.includes('outerwear')) cat = 'outerwear';
                else if (text.includes('undergarments') || text.includes('intimates')) cat = 'innerwear';
            }
        }
        if (cat && categoryImages[cat]) {
            card.addEventListener('click', function() {
                openSlideshow(cat);
            });
        }
    });
});

// --- Contact Form Submission with EmailJS ---