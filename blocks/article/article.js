import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const content = document.createRange().createContextualFragment(`
        <article class="article-card">
            <img src="/api/placeholder/300/300" alt="Nissan Warranty" class="article-image">
            <div class="article-content">
                <div class="article-date">December 9, 2024</div>
                <span class="article-category">Services</span>
                <h2 class="article-title">Nissan Privilege Warranty celebrates its first anniversary!</h2>
                <p class="article-excerpt">Launched last year, the Nissan Privilege Warranty program has already rewarded 50,000 customers for their loyalty. Deployed across Nissan's dealer network, this offer has found widespread success.</p>
                <a href="#" class="article-link">Read more</a>
            </div>
        </article>
    `);

    block.textContent = '';
    block.append(content);

    
}


