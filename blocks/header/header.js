import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';


export default async function decorate(block) {
  const content = document.createRange().createContextualFragment(`
    <nav class="nav-menu">
        <a href="#" class="nav-logo">AUTOBRAND</a>
        <ul class="nav-items">
            <li><a href="#" class="nav-item">Models</a></li>
            <li><a href="#" class="nav-item">Build & Price</a></li>
            <li><a href="#" class="nav-item">Shopping Tools</a></li>
            <li><a href="#" class="nav-item">Find a Dealer</a></li>
        </ul>
    </nav>
  `);

  block.textContent = '';
  block.append(content);
}
