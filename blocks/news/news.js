export default async function decorate(block) {

    const articles = [];

    [...block.children].forEach((row) => {
        const img = row.querySelector('img');
        const p = row.querySelector('p');

        const imageSrc = img ? img.src : "";
        const title = p ? p.textContent : "";

        articles.push(
            `<article class="article-card" >
                <img src="${imageSrc}" alt="Nissan Warranty" class="article-image">
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
        <div>
            <div></div>
            <div><p>article 1</p></div>
          </div>
          <div>
            <div></div>
            <div><p>article 2</p></div>
          </div>
    `);

    //block.textContent = '';
    block.append(content);

    
}


