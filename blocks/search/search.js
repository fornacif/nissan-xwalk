import { readBlockConfig } from '../../scripts/aem.js';
import { transformImageSrc } from '../../scripts/extension.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const background = await transformImageSrc(config.background);
    
    const content = document.createRange().createContextualFragment(`
        <section class="search-section" style="background: url('${background}') center/cover no-repeat">
            <div class="search-content">
                <h2 class="search-title" data-aue-prop="title" data-aue-type="text">${config.title}</h2>
                <p class="search-subtitle" data-aue-prop="subtitle" data-aue-type="text">Search through our extensive collection of premium vehicles</p>
                
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
    

