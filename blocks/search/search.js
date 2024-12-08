import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const content = document.createRange().createContextualFragment(`
        <section class="search-section">
            <div class="search-content">
                <h2 class="search-title">Find Your Perfect Vehicle</h2>
                <p class="search-subtitle">Search through our extensive collection of premium vehicles</p>
                
                <div class="search-container">
                    <input type="text" class="search-bar" placeholder="Search by model, year, or features...">
                </div>
                
                <div class="filter-container">
                    <button class="filter-button active">All Models</button>
                    <button class="filter-button">SUV</button>
                    <button class="filter-button">Sedan</button>
                    <button class="filter-button">Electric</button>
                    <button class="filter-button">Sports</button>
                    <button class="filter-button">Luxury</button>
                </div>
            </div>
        </section>
    `);

    block.textContent = '';
    block.append(content);

    initSearch();
}

function initSearch() {
    const filterButtons = document.querySelectorAll('.filter-button');
            
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
        });
    });
}
    

