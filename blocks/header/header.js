
export default async function decorate(block) {
    const UEAuthorMode = window.hlx.aemRoot || window.location.href.includes('.html');
    let logoImage = UEAuthorMode ? '/content/nissan-xwalk.resource/icons/logo.svg': '/icons/logo.svg';

    const content = document.createRange().createContextualFragment(`
    <nav class="nav-menu">
        <a href="./home.html" class="nav-logo"><img src="${logoImage}"></img></a>
        <button class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul class="nav-items">
            <li><a href="./news.html" class="nav-item">News</a></li>
            <li><a href="#" class="nav-item">Models</a></li>
            <li><a href="#" class="nav-item">Find a Dealer</a></li>
        </ul>
    </nav>
    `);

    block.textContent = '';
    block.append(content);

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
