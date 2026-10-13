(() => {
    'use strict';
    const USERS_KEY = 'studenthub-demo-users';
    const SESSION_KEY = 'studenthub-session';
    const NEXT_KEY = 'studenthub-next';
    const PUBLIC_PAGES = ['index.html', 'about.html', 'faq.html', 'contact.html', 'feedback.html'];
    const STUDENT_PAGES = ['dashboard.html', 'events.html', 'profile.html'];
    const ADMIN_PAGES = ['admin.html'];
    const demoUsers = [
        {
            name: 'Demo Student',
            email: 'student@demo.com',
            password: 'Student123!',
            role: 'student',
            id: 'student-demo'
        },
        {
            name: 'Demo Admin',
            email: 'admin@demo.com',
            password: 'Admin123!',
            role: 'admin',
            id: 'admin-demo'
        }
    ];
    function users() {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        }
        catch {
            return [];
        }
    }
    async function hashPassword(password) {
        const bytes = new TextEncoder().encode(password);
        const digest = await crypto.subtle.digest('SHA-256', bytes);
        return Array.from(new Uint8Array(digest))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
    }
    function session() {
        try {
            const value = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
            return value && (value.role === 'student' || value.role === 'admin') ? value : null;
        }
        catch {
            return null;
        }
    }
    function pageForRole(role) {
        return role === 'admin' ? 'admin.html' : 'dashboard.html';
    }
    function safeDestination(candidate, role) {
        if (role === 'admin' && ADMIN_PAGES.includes(candidate))
            return candidate;
        if (role === 'student' && STUDENT_PAGES.includes(candidate))
            return candidate;
        return pageForRole(role);
    }
    function redirectForPage() {
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        const currentSession = session();
        if (ADMIN_PAGES.includes(currentPage)) {
            if (!currentSession) {
                sessionStorage.setItem(NEXT_KEY, currentPage);
                location.replace('login.html');
                return false;
            }
            if (currentSession.role !== 'admin') {
                location.replace('dashboard.html');
                return false;
            }
        }
        if (STUDENT_PAGES.includes(currentPage)) {
            if (!currentSession) {
                sessionStorage.setItem(NEXT_KEY, currentPage);
                location.replace('login.html');
                return false;
            }
            if (currentSession.role !== 'student') {
                location.replace('admin.html');
                return false;
            }
        }
        if (currentPage === 'login.html' && currentSession) {
            location.replace(pageForRole(currentSession.role));
            return false;
        }
        return true;
    }
    function renderNavigation(currentSession) {
        const nav = document.querySelector('[data-nav-links]');
        if (!nav)
            return;
        const themeButton = nav.querySelector('[data-theme-toggle]');
        nav.querySelectorAll('a').forEach((link) => link.remove());
        const links = [
            ['index.html', 'Home'],
            ['about.html', 'About'],
            ['faq.html', 'FAQ'],
            ['contact.html', 'Contact'],
            ['feedback.html', 'Feedback']
        ];
        if (currentSession?.role === 'student') {
            links.push(['dashboard.html', 'Dashboard'], ['events.html', 'Events'], ['profile.html', 'Profile']);
        }
        else if (currentSession?.role === 'admin') {
            links.push(['admin.html', 'Admin Dashboard']);
        }
        else {
            links.push(['login.html', 'Login'], ['register.html', 'Register']);
        }
        if (currentSession)
            links.push(['login.html', 'Logout', 'logout']);
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        links.forEach(([href, label, action]) => {
            const link = document.createElement('a');
            link.href = href;
            link.textContent = label;
            if (action === 'logout') {
                link.dataset.logout = '';
            }
            else {
                link.dataset.activeNav = '';
                if (href === currentPage)
                    link.classList.add('active');
            }
            if (themeButton)
                nav.insertBefore(link, themeButton);
            else
                nav.appendChild(link);
        });
    }
    window.StudentAuth = {
        session,
        logout() {
            localStorage.removeItem(SESSION_KEY);
            sessionStorage.removeItem(NEXT_KEY);
            location.href = 'login.html';
        },
        async login(identity, password, role, remember) {
            const storedUsers = users();
            const normalizedIdentity = identity.toLowerCase();
            const demoUser = demoUsers.find((user) => (user.email.toLowerCase() === normalizedIdentity || user.username === identity) &&
                user.password === password && user.role === role);
            let user = demoUser;
            if (!user) {
                const digest = await hashPassword(password);
                user = storedUsers.find((item) => (item.email.toLowerCase() === normalizedIdentity || item.username === identity) &&
                    item.passwordHash === digest && item.role === role);
            }
            if (!user)
                return false;
            localStorage.setItem(SESSION_KEY, JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                remember: Boolean(remember)
            }));
            return true;
        },
        async register(data) {
            const allUsers = [...demoUsers, ...users()];
            if (allUsers.some((user) => user.email.toLowerCase() === data.email.toLowerCase())) {
                return false;
            }
            const passwordHash = await hashPassword(data.password);
            const newUser = {
                id: `user-${Date.now()}`,
                name: data.name,
                email: data.email,
                username: data.username,
                passwordHash,
                role: 'student',
                mobile: data.mobile,
                course: data.course,
                year: data.year
            };
            const storedUsers = users();
            storedUsers.push(newUser);
            localStorage.setItem(USERS_KEY, JSON.stringify(storedUsers));
            return true;
        },
        requireRole(role) {
            const currentSession = session();
            if (!currentSession || (role && currentSession.role !== role)) {
                location.href = 'login.html';
                return null;
            }
            return currentSession;
        }
    };
    // Run a second guard after the page DOM is available as a fallback to the early guard.
    if (!redirectForPage())
        return;
    renderNavigation(session());
    document.querySelectorAll('[data-session-name]').forEach((element) => {
        const currentSession = session();
        element.textContent = currentSession ? currentSession.name : 'Guest';
    });
    document.querySelectorAll('[data-session-role]').forEach((element) => {
        const currentSession = session();
        element.textContent = currentSession ? currentSession.role : 'Not signed in';
    });
    document.querySelectorAll('[data-logout]').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.StudentAuth.logout();
        });
    });
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const role = formData.get('role');
            const identity = formData.get('identity').trim();
            const success = await window.StudentAuth.login(identity, formData.get('password'), role, formData.has('remember'));
            const message = document.querySelector('#login-message');
            if (!success) {
                message.textContent = `Incorrect ${role} demonstration credentials. Please check the README.`;
                message.className = 'notice error-box';
                return;
            }
            const requestedPage = sessionStorage.getItem(NEXT_KEY);
            sessionStorage.removeItem(NEXT_KEY);
            location.href = safeDestination(requestedPage, role);
        });
    }
    const registerForm = document.querySelector('#register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!registerForm.reportValidity())
                return;
            const password = registerForm.elements.password.value;
            const confirmPassword = registerForm.elements.confirmPassword.value;
            const message = document.querySelector('#register-message');
            if (password !== confirmPassword) {
                message.textContent = 'Passwords do not match.';
                message.className = 'notice error-box';
                registerForm.elements.confirmPassword.focus();
                return;
            }
            if (!/^[6-9]\d{9}$/.test(registerForm.elements.mobile.value)) {
                message.textContent = 'Enter a valid 10-digit Indian mobile number beginning with 6–9.';
                message.className = 'notice error-box';
                registerForm.elements.mobile.focus();
                return;
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
                message.textContent = 'Password must be 8+ characters with uppercase, lowercase, number and special character.';
                message.className = 'notice error-box';
                registerForm.elements.password.focus();
                return;
            }
            const data = {
                name: registerForm.elements.fullName.value.trim(),
                email: registerForm.elements.email.value.trim(),
                password,
                username: registerForm.elements.email.value.trim(),
                mobile: registerForm.elements.mobile.value,
                course: registerForm.elements.course.value,
                year: registerForm.elements.year.value
            };
            if (!await window.StudentAuth.register(data)) {
                message.textContent = 'An account with this email already exists.';
                message.className = 'notice error-box';
                return;
            }
            message.textContent = 'Registration saved in this browser. You can now log in with your new student account.';
            message.className = 'notice';
            registerForm.reset();
        });
    }
})();
