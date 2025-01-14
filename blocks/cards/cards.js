import { moveInstrumentation } from '../../scripts/scripts.js';
import { transformImageSrc } from '../../scripts/utils.js';

export default async function decorate(block) {

  const cards = [];

   for (const row of block.children) {
    const img = row.querySelector('img');
    const pElements = row.getElementsByTagName('p');

    const imageSrc = img ? await transformImageSrc(img.src) : "";
    const title = pElements[0] ? pElements[0].textContent : "";
    const wide = pElements[1] && pElements[1].textContent == 'true' ? 'wide' : "";

    var card = document.createElement('div');
    card.className = `grid-box ${wide}`;
    card.innerHTML = `
        <div class="image-wrapper">
            <img loading="lazy" src="${imageSrc}" alt="Configure">
        </div>
        <div class="box-content">
            <h2 class="box-title" data-aue-prop="title" data-aue-type="text">${title}</h2>
            <div class="arrow"></div>
        </div>
    `;
    moveInstrumentation(row, card);

    cards.push(card)
  };

  const content = document.createRange().createContextualFragment(`
    <div class="grid-container"></div>
  `);

  const cardList = content.querySelector('.grid-container');
  cards.forEach(card => cardList.append(card));

  block.textContent = '';
  block.append(content);
}
