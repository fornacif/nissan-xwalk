import { isAuthorMode } from '../../scripts/utils.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
    let logoImage = isAuthorMode ? '/content/nissan-xwalk.resource/icons/logo.svg': '/icons/logo.svg';
    const urlExtension = isAuthorMode ? ".html" : "";

    const navFragment = await loadFragment("/nav");
    console.log(navFragment);

    const content = document.createRange().createContextualFragment(`
    <nav class="nav-menu">
        <a href="./home" class="nav-logo"><img src="${logoImage}"></img></a>
        <button class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul class="nav-items">
            <li><a href="./news" class="nav-item">News</a></li>
            <li><a href="#" class="nav-item">Models</a></li>
            <li><a href="#" class="nav-item">Find a Dealer</a></li>
        </ul>
    </nav>
    `);

    block.textContent = '';
    block.append(content);

    for (const aElement of block.querySelectorAll('a')) {
        aElement.href = aElement.href + urlExtension;
    }

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelector('.nav-items');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navItems.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navItems.contains(e.target) && navItems.classList.contains('active')) {
            hamburger.classList.remove('active');
            navItems.classList.remove('active');
        }
    });

    // Close mobile menu when clicking a nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navItems.classList.remove('active');
        });
    });
    }
