(() => {
    const s = window.StudentAuth?.session?.();
    const name = document.querySelector('[data-dashboard-welcome]');
    if (name && s)
        name.textContent = `Hello, ${s.name}!`;
    const gate = document.body.dataset.requireRole;
    if (gate && window.StudentAuth) {
        const current = window.StudentAuth.requireRole(gate);
        if (current && name)
            name.textContent = `Hello, ${current.name}!`;
    }
    document.querySelectorAll('[data-logout]').forEach(b => b.addEventListener('click', () => window.StudentAuth?.logout()));
})();
