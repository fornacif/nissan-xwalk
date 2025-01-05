import { isAuthorMode } from '../../scripts/utils.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
    let logoImage = isAuthorMode ? '/content/nissan-xwalk.resource/icons/logo.svg': '/icons/logo.svg';
    const urlExtension = isAuthorMode ? ".html" : "";

    const content = document.createRange().createContextualFragment(`
    <nav class="nav-menu">
        <a href="./home" class="nav-logo"><img src="${logoImage}"></img></a>
        <button class="hamburger">
        </button>
        <ul class="nav-items">
        </ul>
    </nav>
    `);

    block.textContent = '';
    block.append(content);

    const navFragment = await loadFragment("/nav");
    const navElements = navFragment.querySelectorAll('li');
    for (const navElement of navElements) {
        navElement.firstChild.className = "nav-item";
        navElement.firstChild.href += urlExtension;
    }

    const hamburgerElement = document.querySelector('button');
    for (let i = 0; i < navElements.length; i++) {
        const span = document.createElement('span');
        hamburgerElement.appendChild(span);
    }

    block.querySelector('.nav-items').append(...navElements);

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
