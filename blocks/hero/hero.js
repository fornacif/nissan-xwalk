import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const image1Path = config.image1.replace('width=750', 'width=3000');
    const image2Path = config.image2.replace('width=750', 'width=3000');
    const image3Path = config.image3.replace('width=750', 'width=3000');

    const content = document.createRange().createContextualFragment(`
        <div class="hero-banner">
            <div class="carousel">
                <div class="slide active">
                    <img src="${image1Path}" alt="Luxury Sedan" class="slide-image">
                    <div class="slide-content">
                        <h2 class="slide-title">2024 Luxury Sedan</h2>
                        <p class="slide-price">Starting at $45,000</p>
                        <div class="cta-container">
                            <button class="cta-button cta-primary">Configure Now</button>
                            <button class="cta-button cta-secondary">Discover More</button>
                        </div>
                    </div>
                </div>
                <div class="slide">
                    <img src="${image2Path}" alt="Electric SUV" class="slide-image">
                    <div class="slide-content">
                        <h2 class="slide-title">Electric SUV</h2>
                        <p class="slide-price">Starting at $55,000</p>
                        <div class="cta-container">
                            <button class="cta-button cta-primary">Configure Now</button>
                            <button class="cta-button cta-secondary">Discover More</button>
                        </div>
                    </div>
                </div>
                <div class="slide">
                    <img src="${image3Path}" alt="Sports Car" class="slide-image">
                    <div class="slide-content">
                        <h2 class="slide-title">Sports Coupe</h2>
                        <p class="slide-price">Starting at $65,000</p>
                        <div class="cta-container">
                            <button class="cta-button cta-primary">Configure Now</button>
                            <button class="cta-button cta-secondary">Discover More</button>
                        </div>
                    </div>
                </div>
                <div class="carousel-nav">
                    <div class="carousel-dot active"></div>
                    <div class="carousel-dot"></div>
                    <div class="carousel-dot"></div>
                </div>
                <div class="carousel-arrows">
                    <button class="carousel-arrow" id="prevBtn">&#8249;</button>
                    <button class="carousel-arrow" id="nextBtn">&#8250;</button>
                </div>
            </div>
        </div>
    `);

    block.textContent = '';
    block.append(content);

    initCarousel();
}

function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoplay();
        });
    });

    // Start autoplay on page load
    startAutoplay();

    // Pause autoplay when hovering over the carousel
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
}
    

