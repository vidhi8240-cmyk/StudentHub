(() => {
    'use strict';
    const sessionKey = 'studenthub-session';
    const nextKey = 'studenthub-next';
    const page = location.pathname.split('/').pop() || 'index.html';
    const studentPages = ['dashboard.html', 'events.html', 'profile.html'];
    const adminPages = ['admin.html'];
    let currentSession = null;
    try {
        currentSession = JSON.parse(localStorage.getItem(sessionKey) || 'null');
    }
    catch {
        currentSession = null;
    }
    if (!currentSession || !['student', 'admin'].includes(currentSession.role)) {
        if (studentPages.includes(page) || adminPages.includes(page)) {
            sessionStorage.setItem(nextKey, page);
            location.replace('login.html');
        }
        return;
    }
    if (adminPages.includes(page) && currentSession.role !== 'admin') {
        location.replace('dashboard.html');
    }
    else if (studentPages.includes(page) && currentSession.role !== 'student') {
        location.replace('admin.html');
    }
})();
