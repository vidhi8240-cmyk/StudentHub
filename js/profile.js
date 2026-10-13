(() => {
    'use strict';
    const profileForm = document.querySelector('#profile-form');
    const storageKey = 'studenthub-profile';
    try {
        const savedProfile = JSON.parse(localStorage.getItem(storageKey) || 'null');
        if (savedProfile) {
            document.querySelector('#profile-name').value = savedProfile.name || '';
            document.querySelector('#profile-email').value = savedProfile.email || '';
            document.querySelector('#profile-mobile').value = savedProfile.mobile || '';
            document.querySelector('#profile-course').value = savedProfile.course || '';
            document.querySelector('#profile-year').value = savedProfile.year || '';
        }
    }
    catch {
        // Ignore malformed local demo data and let the user fill the form again.
    }
    profileForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!profileForm.reportValidity())
            return;
        const profile = {
            name: document.querySelector('#profile-name').value.trim(),
            email: document.querySelector('#profile-email').value.trim(),
            mobile: document.querySelector('#profile-mobile').value,
            course: document.querySelector('#profile-course').value,
            year: document.querySelector('#profile-year').value
        };
        localStorage.setItem(storageKey, JSON.stringify(profile));
        const message = document.querySelector('#profile-message');
        message.textContent = 'Profile saved in this browser.';
        message.className = 'notice';
    });
    profileForm?.addEventListener('reset', () => {
        setTimeout(() => {
            const message = document.querySelector('#profile-message');
            if (message)
                message.textContent = '';
        }, 0);
    });
})();
