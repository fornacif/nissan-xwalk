import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const content = document.createRange().createContextualFragment(`
        <section class="hero-news">
            <div class="hero-news-content">
                <div class="hero-news-subtitle">News & Innovations</div>
                <h1 class="hero-news-title">Discover the latest from Nissan</h1>
                <p class="hero-news-description">Stay informed about the latest innovations, events, and product launches from Nissan.</p>
            </div>
        </section>

        <div class="articles-container">
            <div class="articles-search">
                <input type="text" placeholder="Search articles...">
            </div>

            <div class="article-list">

            </div>
        </div>
    `);

    block.textContent = '';
    block.append(content);

    
}


