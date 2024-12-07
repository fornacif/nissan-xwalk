import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const image1Path = config.image1;
    const image2Path = config.image2;
    const image3Path = config.image3;

    const content = document.createRange().createContextualFragment(`
        <div class="hero-banner" id="hero-banner">
        <div class="slide active">
            <div class="slide-bg" style="background-image: url('${image2Path}')"></div>
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <div class="slide-text">
                    <h1 class="vehicle-title">The New GT-R</h1>
                    <p class="vehicle-subtitle">Performance Redefined</p>
                    <div class="vehicle-price">From €99,900</div>
                    <p class="vehicle-description">Experience the pinnacle of automotive engineering with the legendary GT-R. Unmatched performance meets cutting-edge technology.</p>
                    <div class="cta-buttons">
                        <button class="cta-button cta-primary">Discover More</button>
                        <button class="cta-button cta-secondary">Configure Now</button>
                    </div>
                </div>
                <img src="${image1Path}" alt="GT-R" class="vehicle-image">
            </div>
        </div>

        <div class="slide">
            <div class="slide-bg" style="background-image: url('${image2Path}')"></div>
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <div class="slide-text">
                    <h1 class="vehicle-title">Electric SUV</h1>
                    <p class="vehicle-subtitle">The Future of Mobility</p>
                    <div class="vehicle-price">From €59,900</div>
                    <p class="vehicle-description">Zero emissions meet infinite possibilities. Discover our most advanced electric SUV with up to 500km range.</p>
                    <div class="cta-buttons">
                        <button class="cta-button cta-primary">Discover More</button>
                        <button class="cta-button cta-secondary">Configure Now</button>
                    </div>
                </div>
                <img src="${image2Path}" alt="Electric SUV" class="vehicle-image">
            </div>
        </div>

        <div class="slide">
            <div class="slide-bg" style="background-image: url('${image3Path}'"></div>
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <div class="slide-text">
                    <h1 class="vehicle-title">Luxury Sedan</h1>
                    <p class="vehicle-subtitle">Elegance in Motion</p>
                    <div class="vehicle-price">From €79,900</div>
                    <p class="vehicle-description">Where luxury meets performance. Experience first-class comfort with revolutionary driving dynamics.</p>
                    <div class="cta-buttons">
                        <button class="cta-button cta-primary">Discover More</button>
                        <button class="cta-button cta-secondary">Configure Now</button>
                    </div>
                </div>
                <img src="${image3Path}" alt="Luxury Sedan" class="vehicle-image">
            </div>
        </div>

        <div class="carousel-arrows">
            <button class="arrow-button prev">
                <svg viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            <button class="arrow-button next">
                <svg viewBox="0 0 24 24">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
            </button>
        </div>

        <div class="carousel-nav">
            <div class="nav-dot active"></div>
            <div class="nav-dot"></div>
            <div class="nav-dot"></div>
        </div>
    </div>
    `);

    block.textContent = '';
    block.append(content);

    class CarouselHero {
        constructor() {
            this.currentSlide = 0;
            this.slides = document.querySelectorAll('.slide');
            this.dots = document.querySelectorAll('.nav-dot');
            this.autoplayInterval = 5000; // 5 seconds between slides
            this.autoplayTimer = null;
    
            this.init();
        }
    
        init() {
            document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
            document.querySelector('.next').addEventListener('click', () => this.nextSlide());
            
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
    
            this.startAutoplay();
    
            document.querySelector('.hero-banner').addEventListener('mouseenter', () => this.stopAutoplay());
            document.querySelector('.hero-banner').addEventListener('mouseleave', () => this.startAutoplay());
        }
    
        updateSlides() {
            this.slides.forEach((slide, index) => {
                slide.classList.remove('active');
                this.dots[index].classList.remove('active');
            });
    
            this.slides[this.currentSlide].classList.add('active');
            this.dots[this.currentSlide].classList.add('active');
        }
    
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlides();
        }
    
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.updateSlides();
        }
    
        goToSlide(index) {
            this.currentSlide = index;
            this.updateSlides();
        }
    
        startAutoplay() {
            this.autoplayTimer = setInterval(() => this.nextSlide(), this.autoplayInterval);
        }
    
        stopAutoplay() {
            clearInterval(this.autoplayTimer);
        }
    }

    new CarouselHero();
}



    

