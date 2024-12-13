import { readBlockConfig } from '../../scripts/aem.js';
import { getValueByKey, getFormattedDate, transformImageSrc, loadArticles } from '../../scripts/utils.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const articles = await loadArticles();
    const articleElements = [];
    for (const article of articles) {
        var articleElement = document.createElement('article');
        articleElement.className = 'article-card';
        articleElement.setAttribute('data-aue-type', 'reference');
        articleElement.setAttribute('data-aue-filter', 'cf');
        articleElement.setAttribute('data-aue-label', 'Article');
        articleElement.setAttribute('data-aue-resource', `urn:aemconnection:${article['_path']}/jcr:content/data/master`);
        const imageScr = await transformImageSrc(article.image['_path']);
        const dateString = await getValueByKey(article['_metadata'].calendarMetadata, 'jcr:created', 'name');
        const formattedDate = getFormattedDate(dateString);
        articleElement.innerHTML = `
            <img src="${imageScr}" alt="Alt" class="article-image">
            <div class="article-content">
                <div class="article-date">${formattedDate}</div>
                <span class="article-category">Services</span>
                <h2 class="article-title" data-aue-prop="title" data-aue-type="text">${article.title}</h2>
                <p class="article-excerpt" data-aue-prop="description" data-aue-type="richtext">${article.description.plaintext}</p>
                <a href="#" class="article-link" data-aue-prop="cta" data-aue-type="text">${article.cta}</a>
            </div>`;
            articleElements.push(articleElement)
    }

    const content = document.createRange().createContextualFragment(`
        <section class="hero-news">
            <div class="hero-news-content">
                <div class="hero-news-subtitle">News & Innovations</div>
                <h1 class="hero-news-title" data-aue-prop="title" data-aue-type="text">${config.title}</h1>
                <p class="hero-news-description" data-aue-prop="description" data-aue-type="richtext">${config.description}</p>
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

    const imageScr = await transformImageSrc(config.image);
    const heroNews = content.querySelector('.hero-news');
    heroNews.style.backgroundImage = `url(${imageScr})`;
    heroNews.style.backgroundPosition = 'center';
    heroNews.style.backgroundSize = 'cover';

    const articleList = content.querySelector('.article-list');
    articleElements.forEach(articleElement => articleList.append(articleElement));

    block.append(content);
}


