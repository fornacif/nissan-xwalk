import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
    const config = readBlockConfig(block);

    const content = document.createRange().createContextualFragment(`
        <div>HERO</div>
    `);

    block.textContent = '';
    block.append(content);
}