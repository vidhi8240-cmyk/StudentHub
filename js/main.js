(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('studenthub-theme');
    if (savedTheme)
        root.dataset.theme = savedTheme;
    const themeButtons = document.querySelectorAll('[data-theme-toggle]');
    function syncThemeButtons() {
        themeButtons.forEach(b => {
            const dark = root.dataset.theme === 'dark';
            b.setAttribute('aria-pressed', String(dark));
            b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
            b.textContent = dark ? '🌙' : '🔆';
        });
    }
    syncThemeButtons();
    themeButtons.forEach(b => b.addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('studenthub-theme', root.dataset.theme);
        syncThemeButtons();
    }));
    const menu = document.querySelector('[data-menu-toggle]'), nav = document.querySelector('[data-nav-links]');
    if (menu && nav)
        menu.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            menu.setAttribute('aria-expanded', String(open));
        });
    const toast = document.querySelector('[data-toast]');
    window.StudentHub = {
        toast(message, kind = 'success') {
            let el = document.querySelector('.toast');
            if (!el) {
                el = document.createElement('div');
                el.className = 'toast';
                el.setAttribute('role', 'status');
                document.body.appendChild(el);
            }
            el.textContent = message;
            el.dataset.kind = kind;
            clearTimeout(window.__toastTimer);
            window.__toastTimer = setTimeout(() => el.remove(), 3600);
        }
    };
    document.querySelectorAll('[data-confirm]').forEach(el => el.addEventListener('click', e => {
        if (!confirm(el.dataset.confirm))
            e.preventDefault();
    }));
    document.querySelectorAll('[data-password-toggle]').forEach(btn => btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.passwordToggle);
        if (!input)
            return;
        input.type = input.type === 'password' ? 'text' : 'password';
        btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
    }));
    document.querySelectorAll('[data-accordion]').forEach(group => group.querySelectorAll('[data-accordion-trigger]').forEach(btn => btn.addEventListener('click', () => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        if (panel)
            panel.hidden = open;
    })));
    document.querySelectorAll('[data-active-nav]').forEach(a => {
        if (a.getAttribute('href') === location.pathname.split('/').pop())
            a.classList.add('active');
    });
})();
