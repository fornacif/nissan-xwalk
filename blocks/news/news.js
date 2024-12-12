import { readBlockConfig } from '../../scripts/aem.js';
import { optimizeImageSrc } from '../../scripts/extension.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const articles = [];

        /*var article = document.createElement('article');
        article.className = 'article-card';
        article.innerHTML = `
            <img src="${imageSrc}" alt="Nissan Warranty" class="article-image">
            <div class="article-content">
                <div class="article-date">December 9, 2024</div>
                <span class="article-category">Services</span>
                <h2 class="article-title" data-aue-prop="title" data-aue-type="text">${title}</h2>
                <p class="article-excerpt">Launched last year, the Nissan Privilege Warranty program has already rewarded 50,000 customers for their loyalty. Deployed across Nissan's dealer network, this offer has found widespread success.</p>
                <a href="#" class="article-link">Read more</a>
            </div>`;
        moveInstrumentation(row, article);

        articles.push(article)*/


    const content = document.createRange().createContextualFragment(`
        <section class="hero-news">
            <div class="hero-news-content">
                <div class="hero-news-subtitle">News & Innovations</div>
                <h1 class="hero-news-title">${config.title}</h1>
                <p class="hero-news-description">${config.description}</p>
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

    const imageScr = optimizeImageSrc(config.image);
    const heroNews = content.querySelector('.hero-news');
    heroNews.style.backgroundImage = `url(${imageScr})`;
    heroNews.style.backgroundPosition = 'center';
    heroNews.style.backgroundSize = 'cover';

    const articleList = content.querySelector('.article-list');
    articles.forEach(article => articleList.append(article));

    block.append(content);
}


