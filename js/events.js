(() => {
    const now = new Date();
    const day = (offset) => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); };
    const events = [
        { id: 'EVT001', title: 'CodeFest', description: 'An interdepartmental coding competition focused on problem solving, algorithms and teamwork.', department: 'Computer Engineering', institute: 'Institute of Engineering and Technology', category: 'Competition', startDate: day(7), startTime: '10:00', endDate: day(7), endTime: '16:00', venue: 'Main Auditorium', format: 'Offline', deadline: day(6), capacity: 100, registeredCount: 45, icon: '💻', added: 1, price: 'Free', organizer: 'Computer Engineering Office', contact: 'events@studenthub.demo' },
        { id: 'EVT002', title: 'AI and Machine Learning Workshop', description: 'Hands-on introduction to model training, responsible AI and practical machine-learning workflows.', department: 'Computer Science and Engineering', institute: 'Institute of Engineering and Technology', category: 'Workshop', startDate: day(1), startTime: '09:30', endDate: day(1), endTime: '15:30', venue: 'Computing Lab 2', format: 'Offline', deadline: day(0), capacity: 60, registeredCount: 38, icon: '🤖', added: 2, price: 'Free', organizer: 'CSE Department', contact: 'cse@studenthub.demo' },
        { id: 'EVT003', title: 'Web Development Bootcamp', description: 'Build an accessible responsive website using HTML, CSS and JavaScript with peer mentors.', department: 'Information Technology', institute: 'Institute of Computer Applications', category: 'Workshop', startDate: day(3), startTime: '11:00', endDate: day(3), endTime: '16:00', venue: 'Lab B-104', format: 'Offline', deadline: day(2), capacity: 50, registeredCount: 31, icon: '🌐', added: 3, price: 'Free', organizer: 'IT Student Chapter', contact: 'it@studenthub.demo' },
        { id: 'EVT004', title: 'Robotics Challenge', description: 'Design, build and test a robot in a friendly engineering challenge.', department: 'Mechanical Engineering', institute: 'Institute of Engineering and Technology', category: 'Competition', startDate: day(-3), startTime: '10:00', endDate: day(-3), endTime: '17:00', venue: 'Innovation Workshop', format: 'Offline', deadline: day(-4), capacity: 80, registeredCount: 80, icon: '🦾', added: 4, price: 'Paid', organizer: 'Mechanical Engineering', contact: 'mech@studenthub.demo' },
        { id: 'EVT005', title: 'Tech Symposium', description: 'Talks and panels about emerging technology, research and careers.', department: 'Electronics and Communication', institute: 'Institute of Engineering and Technology', category: 'Seminar', startDate: day(0), startTime: '00:00', endDate: day(0), endTime: '23:59', venue: 'Seminar Hall A', format: 'Offline', deadline: day(0), capacity: 200, registeredCount: 92, icon: '🎤', added: 5, price: 'Free', organizer: 'Institute Events Cell', contact: 'symposium@studenthub.demo' },
        { id: 'EVT006', title: 'Startup and Entrepreneurship Summit', description: 'Meet founders, explore early-stage ventures and learn about building a startup.', department: 'Business Administration', institute: 'Institute of Management Studies', category: 'Networking', startDate: day(12), startTime: '10:00', endDate: day(12), endTime: '16:00', venue: 'Management Block', format: 'Offline', deadline: day(10), capacity: 120, registeredCount: 67, icon: '🚀', added: 6, price: 'Paid', organizer: 'Institute of Management Studies', contact: 'ims@studenthub.demo' },
        { id: 'EVT007', title: 'Cultural Festival', description: 'A campus-wide celebration of music, dance, theatre, food and student creativity.', department: 'Central Student Activities and Cultural Committee', institute: 'Central Student Activities and Cultural Committee', category: 'Cultural', startDate: day(18), startTime: '16:00', endDate: day(19), endTime: '21:00', venue: 'Campus Grounds', format: 'Offline', deadline: day(16), capacity: 600, registeredCount: 240, icon: '🎭', added: 7, price: 'Free', organizer: 'Cultural Committee', contact: 'culture@studenthub.demo' },
        { id: 'EVT008', title: 'Science Exhibition', description: 'Student exhibits, demonstrations and interactive science projects for the campus community.', department: 'Science and Mathematics', institute: 'Institute of Science', category: 'Exhibition', startDate: day(-8), startTime: '09:00', endDate: day(-8), endTime: '14:00', venue: 'Science Building', format: 'Offline', deadline: day(-9), capacity: 150, registeredCount: 130, icon: '🔬', added: 8, price: 'Free', organizer: 'Institute of Science', contact: 'science@studenthub.demo' },
        { id: 'EVT009', title: 'Design Innovation Showcase', description: 'An exhibition of prototypes, visual communication projects and student-led design experiments.', department: 'Design', institute: 'Institute of Design', category: 'Exhibition', startDate: day(5), startTime: '12:00', endDate: day(5), endTime: '18:00', venue: 'Design Studio', format: 'Offline', deadline: day(4), capacity: 90, registeredCount: 22, icon: '🎨', added: 9, price: 'Free', organizer: 'Institute of Design', contact: 'design@studenthub.demo' },
        { id: 'EVT010', title: 'Cybersecurity Awareness Seminar', description: 'Practical advice on phishing, account security, privacy and safe computing.', department: 'Information Technology', institute: 'Institute of Computer Applications', category: 'Seminar', startDate: day(0), startTime: '08:00', endDate: day(0), endTime: '10:00', venue: 'Online meeting room', format: 'Online', deadline: day(0), capacity: 300, registeredCount: 175, icon: '🔐', added: 10, price: 'Free', organizer: 'IT Security Club', contact: 'security@studenthub.demo' },
        { id: 'EVT011', title: 'Green Campus Initiative', description: 'Join a campus clean-up, recycling awareness drive and sustainability discussion.', department: 'Civil Engineering', institute: 'Institute of Engineering and Technology', category: 'Community', startDate: day(9), startTime: '08:30', endDate: day(9), endTime: '12:00', venue: 'Main Gate', format: 'Offline', deadline: day(8), capacity: 100, registeredCount: 49, icon: '🌱', added: 11, price: 'Free', organizer: 'Civil Engineering Department', contact: 'civil@studenthub.demo' },
        { id: 'EVT012', title: 'Interdepartmental Sports Tournament', description: 'Teams from across campus compete in a day of friendly sport and fair play.', department: 'Central Student Activities and Cultural Committee', institute: 'Central Student Activities and Cultural Committee', category: 'Sports', startDate: day(-1), startTime: '09:00', endDate: day(-1), endTime: '18:00', venue: 'Sports Complex', format: 'Offline', deadline: day(-3), capacity: 240, registeredCount: 240, icon: '🏆', added: 12, price: 'Free', organizer: 'Student Activities Committee', contact: 'sports@studenthub.demo' }
    ];
    const DEPARTMENTS = ['Computer Engineering', 'Information Technology', 'Computer Science and Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Electronics and Communication', 'Chemical Engineering', 'Business Administration', 'Science and Mathematics', 'Design', 'Central Student Activities and Cultural Committee'];
    const INSTITUTES = ['Institute of Engineering and Technology', 'Institute of Computer Applications', 'Institute of Management Studies', 'Institute of Science', 'Institute of Design', 'Central Student Activities and Cultural Committee'];
    const REG_KEY = 'studenthub-event-registrations', CUSTOM_KEY = 'studenthub-custom-events';
    const getSession = () => { try {
        return JSON.parse(localStorage.getItem('studenthub-session') || 'null');
    }
    catch {
        return null;
    } };
    const getRegs = () => { try {
        return JSON.parse(localStorage.getItem(REG_KEY) || '{}');
    }
    catch {
        return {};
    } };
    const saveRegs = r => localStorage.setItem(REG_KEY, JSON.stringify(r));
    const getEvents = () => { let custom = []; try {
        custom = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
    }
    catch { } return [...events, ...custom]; };
    function status(e) { const start = new Date(`${e.startDate}T${e.startTime || '00:00'}:00`), end = new Date(`${e.endDate}T${e.endTime || '23:59'}:00`); return now < start ? 'Upcoming' : now > end ? 'Completed' : 'Ongoing'; }
    const qs = id => document.getElementById(id);
    const selectOptions = (el, items, label) => { if (!el)
        return; el.innerHTML = `<option value="">${label}</option>` + items.map(x => `<option>${x}</option>`).join(''); };
    function initFilters() { selectOptions(qs('department-filter'), DEPARTMENTS, 'All departments'); selectOptions(qs('institute-filter'), INSTITUTES, 'All institutes'); selectOptions(qs('category-filter'), [...new Set(getEvents().map(e => e.category))].sort(), 'All categories'); selectOptions(qs('format-filter'), ['Online', 'Offline'], 'Any format'); }
    function renderDepartments() { const wrap = qs('department-explorer'); if (!wrap)
        return; wrap.innerHTML = DEPARTMENTS.map((d, i) => `<button class="card department-card" data-dept-card="${d}" style="text-align:left;color:var(--text);display:block"><span class="icon-box">${['💻', '🌐', '🧠', '⚙️', '🏗️', '⚡', '📡', '🧪', '📈', '🔬', '🎨', '🎭'][i % 12]}</span><strong>${d}</strong><p>${getEvents().filter(e => e.department === d).length} events</p></button>`).join(''); }
    function renderInstitutes() { const wrap = qs('institute-explorer'); if (!wrap)
        return; wrap.innerHTML = INSTITUTES.map((ins, i) => { const es = getEvents().filter(e => e.institute === ins); return `<article class="card"><div class="icon-box">${['🏛️', '💻', '📊', '🔬', '🎨', '🎭'][i]}</div><h3>${ins}</h3><p>${es.filter(e => status(e) === 'Ongoing').length} ongoing · ${es.filter(e => status(e) === 'Upcoming').length} upcoming</p><button class="secondary" data-institute-card="${ins}">View institute events</button></article>`; }).join(''); }
    function renderStats() { const es = getEvents(); if (qs('total-stat'))
        qs('total-stat').textContent = es.length; if (qs('ongoing-stat'))
        qs('ongoing-stat').textContent = es.filter(e => status(e) === 'Ongoing').length; if (qs('upcoming-stat'))
        qs('upcoming-stat').textContent = es.filter(e => status(e) === 'Upcoming').length; if (qs('departments-stat'))
        qs('departments-stat').textContent = new Set(es.map(e => e.department)).size; }
    function renderNow() { const wrap = qs('happening-now'); if (!wrap)
        return; const active = getEvents().filter(e => status(e) === 'Ongoing'); wrap.innerHTML = active.length ? active.map(e => `<article class="card"><span class="badge ongoing">Ongoing Now</span><h3>${e.icon} ${e.title}</h3><p>${e.department} · ${e.institute}</p><p>📍 ${e.venue} · ${e.startTime}–${e.endTime}</p><button data-details="${e.id}">View details</button></article>`).join('') : '<div class="empty-state">No events are happening right now. Explore the upcoming events below to plan your next campus activity.</div>'; }
    function renderEvents() { const wrap = qs('events-list'); if (!wrap)
        return; let es = getEvents(); const search = (qs('event-search')?.value || '').trim().toLowerCase(), dept = qs('department-filter')?.value || '', ins = qs('institute-filter')?.value || '', cat = qs('category-filter')?.value || '', fmt = qs('format-filter')?.value || '', tab = document.querySelector('[data-status-tab].active')?.dataset.statusTab || 'All Events', sort = qs('sort-filter')?.value || 'soonest', date = qs('date-filter')?.value || ''; const mine = getRegs()[getSession()?.id || 'guest'] || []; es = es.filter(e => (!search || [e.title, e.description, e.department, e.institute, e.category, e.venue].join(' ').toLowerCase().includes(search)) && (!dept || e.department === dept) && (!ins || e.institute === ins) && (!cat || e.category === cat) && (!fmt || e.format === fmt) && (!date || e.startDate === date) && (tab === 'All Events' || (tab === 'My Events' ? mine.includes(e.id) : status(e) === tab))); es.sort((a, b) => sort === 'alpha' ? a.title.localeCompare(b.title) : sort === 'popular' ? b.registeredCount - a.registeredCount : sort === 'latest' ? b.added - a.added : new Date(a.startDate) - new Date(b.startDate)); if (qs('result-count'))
        qs('result-count').textContent = `${es.length} event${es.length === 1 ? '' : 's'} found`; wrap.innerHTML = es.length ? es.map(e => { const s = status(e), reg = mine.includes(e.id), full = e.registeredCount >= e.capacity, closed = new Date(`${e.deadline}T23:59:59`) < now; return `<article class="card event-card"><div class="event-cover" aria-label="Decorative event illustration">${e.icon}</div><div class="event-body"><span class="badge ${s.toLowerCase()}">${s}</span><h3 style="margin-top:10px">${e.title}</h3><p>${e.description}</p><div class="event-meta"><span>🏢 ${e.department}</span><span>🏛️ ${e.institute}</span><span>📅 ${e.startDate} · ${e.startTime}–${e.endTime}</span><span>📍 ${e.venue} · ${e.format}</span><span>👥 ${e.registeredCount}/${e.capacity} seats · deadline ${e.deadline}</span></div><div class="event-actions"><button class="secondary" data-details="${e.id}">View details</button>${reg ? `<button class="teal" data-cancel="${e.id}">Cancel registration</button>` : `<button data-register="${e.id}" ${s !== 'Upcoming' || closed || full ? 'disabled' : ''}>${full ? 'Full' : closed ? 'Registration closed' : 'Register now'}</button>`}</div></div></article>`; }).join('') : '<div class="empty-state"><h3>No events match your filters</h3><p>Try another search or clear the filters to see all campus events.</p><button class="secondary" id="empty-clear">Clear filters</button></div>'; renderStats(); renderNow(); }
    function details(id) { const e = getEvents().find(x => x.id === id); if (!e)
        return; const s = status(e), mine = getRegs()[getSession()?.id || 'guest'] || []; const body = qs('modal-content'); body.innerHTML = `<div class="modal-head"><div><span class="badge ${s.toLowerCase()}">${s}</span><h2>${e.icon} ${e.title}</h2></div><button class="modal-close" data-close-modal aria-label="Close details">×</button></div><p>${e.description}</p><div class="event-meta"><span><strong>Department:</strong> ${e.department}</span><span><strong>Institute:</strong> ${e.institute}</span><span><strong>Schedule:</strong> ${e.startDate} ${e.startTime} to ${e.endDate} ${e.endTime}</span><span><strong>Venue:</strong> ${e.venue} (${e.format})</span><span><strong>Category:</strong> ${e.category}</span><span><strong>Registration deadline:</strong> ${e.deadline}</span><span><strong>Capacity:</strong> ${e.registeredCount}/${e.capacity}</span><span><strong>Organizer:</strong> ${e.organizer || e.department}</span><span><strong>Contact:</strong> ${e.contact || 'events@studenthub.demo'}</span><span><strong>Eligibility:</strong> Current students; follow organizer guidance</span></div><p class="small-note">Illustrative event data for the StudentHub prototype.</p><div class="event-actions">${mine.includes(e.id) ? `<button data-cancel="${e.id}">Cancel registration</button>` : `<button data-register="${e.id}" ${s !== 'Upcoming' || e.registeredCount >= e.capacity ? 'disabled' : ''}>Register now</button>`}<button class="secondary" data-close-modal>Close</button></div>`; qs('event-modal').classList.remove('hidden'); qs('event-modal').setAttribute('aria-hidden', 'false'); qs('event-modal').querySelector('button').focus(); }
    function closeModal() { qs('event-modal')?.classList.add('hidden'); qs('event-modal')?.setAttribute('aria-hidden', 'true'); }
    function register(id) { const e = getEvents().find(x => x.id === id); if (!e)
        return; const s = getSession(); if (!s) {
        if (confirm('Please log in to register for campus events. Go to Login now?'))
            location.href = 'login.html';
        return;
    } if (status(e) !== 'Upcoming') {
        StudentHub.toast('Registration is only available for upcoming events.', 'error');
        return;
    } if (new Date(`${e.deadline}T23:59:59`) < now) {
        StudentHub.toast('The registration deadline has passed.', 'error');
        return;
    } if (e.registeredCount >= e.capacity) {
        StudentHub.toast('This event has reached its participant limit.', 'error');
        return;
    } const regs = getRegs(), mine = regs[s.id] || []; if (mine.includes(id)) {
        StudentHub.toast('You are already registered for this event.');
        return;
    } if (!confirm(`Register for ${e.title}?`))
        return; regs[s.id] = [...mine, id]; saveRegs(regs); StudentHub.toast(`Registration confirmed for ${e.title}.`); renderEvents(); if (!qs('event-modal').classList.contains('hidden'))
        details(id); }
    function cancel(id) { const s = getSession(); if (!s) {
        StudentHub.toast('Please log in first.', 'error');
        return;
    } if (!confirm('Cancel your event registration?'))
        return; const regs = getRegs(); regs[s.id] = (regs[s.id] || []).filter(x => x !== id); saveRegs(regs); StudentHub.toast('Registration cancelled.'); renderEvents(); if (!qs('event-modal').classList.contains('hidden'))
        details(id); }
    document.addEventListener('click', e => { const t = e.target.closest('button'); if (!t)
        return; if (t.dataset.details)
        details(t.dataset.details); if (t.dataset.register)
        register(t.dataset.register); if (t.dataset.cancel)
        cancel(t.dataset.cancel); if (t.hasAttribute('data-close-modal'))
        closeModal(); if (t.id === 'empty-clear' || t.id === 'clear-filters') {
        ['event-search', 'department-filter', 'institute-filter', 'category-filter', 'format-filter', 'date-filter'].forEach(id => { if (qs(id))
            qs(id).value = ''; });
        document.querySelectorAll('[data-status-tab]').forEach(x => x.classList.toggle('active', x.dataset.statusTab === 'All Events'));
        if (qs('sort-filter'))
            qs('sort-filter').value = 'soonest';
        renderEvents();
    } if (t.dataset.deptCard) {
        qs('department-filter').value = t.dataset.deptCard;
        document.querySelectorAll('[data-dept-card]').forEach(x => x.classList.toggle('selected', x === t));
        renderEvents();
        document.querySelector('#events-section').scrollIntoView({ behavior: 'smooth' });
    } if (t.dataset.instituteCard) {
        qs('institute-filter').value = t.dataset.instituteCard;
        renderEvents();
        document.querySelector('#events-section').scrollIntoView({ behavior: 'smooth' });
    } });
    document.querySelectorAll('[data-status-tab]').forEach(t => t.addEventListener('click', () => { document.querySelectorAll('[data-status-tab]').forEach(x => x.classList.toggle('active', x === t)); renderEvents(); }));
    ['event-search', 'department-filter', 'institute-filter', 'category-filter', 'format-filter', 'date-filter', 'sort-filter'].forEach(id => qs(id)?.addEventListener(id === 'event-search' ? 'input' : 'change', renderEvents));
    qs('event-modal')?.addEventListener('click', e => { if (e.target === qs('event-modal'))
        closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape')
        closeModal(); });
    if (qs('events-list')) {
        initFilters();
        renderDepartments();
        renderInstitutes();
        renderEvents();
    }
    window.StudentEvents = { status, getEvents, renderEvents };
})();
