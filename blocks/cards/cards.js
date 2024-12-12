import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  const card = [];

  [...block.children].forEach((row) => {
    const img = row.querySelector('img');
    const p = row.querySelector('p');

    const imageSrc = img ? img.src : "";
    const title = p ? p.textContent : "";
    const wide = p ? p.textContent : "";

    var card = document.createElement('div');
    card.className = 'grid-box';
    card.innerHTML = `
        <div class="grid-box wide">
            <img src="${imageSrc}" alt="Image Alt">
            <div class="box-content">
                <h2 class="box-title">${title}</h2>
                <div class="arrow"></div>
            </div>
        </div>`
    moveInstrumentation(row, card);

    cards.push(card)
  });

  const content = document.createRange().createContextualFragment(`
    <div class="grid-container">
        <div class="grid-box wide">
            <img src="/api/placeholder/1400/400" alt="Business">
            <div class="box-content">
                <h2 class="box-title">Business</h2>
                <div class="arrow"></div>
            </div>
        </div>
        <div class="grid-box">
            <img src="/api/placeholder/600/400" alt="Used Vehicles">
            <div class="box-content">
                <h2 class="box-title">Used Vehicles</h2>
                <div class="arrow"></div>
            </div>
        </div>
        <div class="grid-box">
            <img src="/api/placeholder/600/400" alt="Accessories">
            <div class="box-content">
                <h2 class="box-title">Accessories</h2>
                <div class="arrow"></div>
            </div>
        </div>
        <div class="grid-box wide">
            <img src="/api/placeholder/1400/400" alt="Configure">
            <div class="box-content">
                <h2 class="box-title">Configure</h2>
                <div class="arrow"></div>
            </div>
        </div>
    </div>
  `);

  //block.textContent = '';
  //block.append(content);
}
