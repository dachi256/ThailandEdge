document.addEventListener('DOMContentLoaded', function() {
    // Image caching functionality
    const imagesToCache = document.querySelectorAll('img');
    
    // Create a cache for images
    if ('caches' in window) {
        // Open a cache named 'artistic-action-images'
        caches.open('artistic-action-images').then(cache => {
            // Add all images to cache
            imagesToCache.forEach(img => {
                const imgSrc = img.src;
                
                // Only cache images from our own domain (avoid caching external images)
                if (imgSrc && imgSrc.startsWith(window.location.origin)) {
                    // Create a request for the image
                    const imgRequest = new Request(imgSrc);
                    
                    // Check if the image is already in the cache
                    caches.match(imgRequest).then(response => {
                        if (!response) {
                            // If not cached, fetch it and add to cache
                            fetch(imgRequest).then(response => {
                                if (response.ok) {
                                    cache.put(imgRequest, response.clone());
                                }
                            }).catch(error => {
                                console.error('Failed to fetch image for caching:', error);
                            });
                        }
                    });
                }
            });
        });
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.getAttribute('data-src');
                    
                    if (dataSrc) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Convert normal images to lazy loaded images
        document.querySelectorAll('img:not([data-src])').forEach(img => {
            // Skip images that are already loaded
            if (img.complete && img.naturalHeight !== 0) return;
            
            const imgSrc = img.src;
            if (imgSrc) {
                img.setAttribute('data-src', imgSrc);
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                imageObserver.observe(img);
            }
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if(icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if(nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon i');
        
        header.addEventListener('click', () => {
            item.classList.toggle('active');
            
            if(item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                content.style.maxHeight = null;
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if(window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Handle modal for videos
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeBtn = document.querySelector('.close');
    
    // Open video modal
    document.querySelectorAll('.btn[data-video]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modalVideo.src = this.dataset.video;
            videoModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close video modal
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            videoModal.style.display = 'none';
            modalVideo.pause();
            modalVideo.currentTime = 0;
            document.body.style.overflow = 'auto';
        });
    }
    
    window.addEventListener('click', event => {
        if(event.target == videoModal) {
            videoModal.style.display = 'none';
            modalVideo.pause();
            modalVideo.currentTime = 0;
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add animation to elements on scroll
    const animateElements = document.querySelectorAll('.interview-item, .member-card, .resource-card, .accordion-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add scroll indicator to header
    function updateHeaderOnScroll() {
        const header = document.querySelector('header');
        
        if(window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll();
    
    // Initialize the typing animation after the page loads
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-content h1');
        if(heroTitle) {
            heroTitle.style.opacity = 1;
        }
    }, 500);
});