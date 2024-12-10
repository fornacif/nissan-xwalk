export default async function decorate(block) {

    const articles = [];

    [...block.children].forEach((row) => {
        const img = row.querySelector('img');
        const p = row.querySelector('p');

        const imageSrc = img ? img.src : "";
        const title = p ? p.textContent : "";

        articles.push(
            `<article class="article-card">
                <img scr="${imageSrc}" alt="Nissan Warranty" class="article-image">
                <div class="article-content">
                    <div class="article-date">December 9, 2024</div>
                    <span class="article-category">Services</span>
                    <h2 class="article-title">${title}</h2>
                    <p class="article-excerpt">Launched last year, the Nissan Privilege Warranty program has already rewarded 50,000 customers for their loyalty. Deployed across Nissan's dealer network, this offer has found widespread success.</p>
                    <a href="#" class="article-link">Read more</a>
                </div>
            </article>`)
      });

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
                ${articles.join('')}
            </div>
        </div>
    `);

    block.textContent = '';
    block.append(content);

    
}


