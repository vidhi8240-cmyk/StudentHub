# StudentHub — Responsive HTML/CSS/JavaScript Prototype

StudentHub is a beginner-friendly static college portal with 11 interconnected pages and an advanced department-wise/institute-wise event discovery page.

## Project structure

```text
StudentHub/
├── index.html
├── about.html
├── register.html
├── login.html
├── dashboard.html
├── events.html
├── profile.html
├── contact.html
├── admin.html
├── faq.html
├── feedback.html
├── css/style.css
├── js/main.js
├── js/auth.js
├── js/validation.js
├── js/dashboard.js
├── js/events.js
└── assets/images/
```

## Run locally
1. Extract the folder.
2. Open the folder in VS Code.
3. Recommended: use the Live Server extension and open `index.html`.
4. Navigate using the role-aware top navigation. Guests see Home, About, FAQ, Contact, Feedback, Login and Register. Students see the public pages plus Dashboard, Events, Profile and Logout. Admins see the public pages plus Admin Dashboard and Logout.
5. Dashboard, Events and Profile require a student login. Admin Dashboard requires an admin login. Guests who open a protected page are sent to Login and returned to the requested page after a successful login.

## Demo credentials
- Student: `student@demo.com` / `Student123!`
- Admin: `admin@demo.com` / `Admin123!`

Select the matching role on Login. Registration data and session behavior are simulated in the browser. Newly registered passwords are stored as SHA-256 hashes, not plain text (this is still not suitable for production authentication).

## Notes
- This project is a front-end demonstration, not a secure production system.
- Never store real passwords or sensitive student data in LocalStorage. The demo registration stores account demonstration fields and a password hash locally; this is not suitable for real student records.
- The login demo includes hard-coded demonstration credentials in `js/auth.js`; real authentication, password hashing, role authorization, registration capacity checks, event persistence, and admin permissions must be implemented and validated by a backend.
- Event names, dates, participant counts, institutes, departments and contact addresses are illustrative. Event dates are generated relative to the browser date when `js/events.js` loads, so status labels update according to the browser's current date/time.
- The charts on the dashboard are sample visualizations rendered with CSS to avoid external dependencies.

## Checklist
- [x] 11 separate HTML pages
- [x] Shared responsive CSS and light/dark theme persistence
- [x] Mobile navigation toggle
- [x] Student/Admin demonstration login and logout
- [x] Role-aware navigation and protected student/admin pages
- [x] Registration, login, contact and feedback forms
- [x] Event search, department/institute/category/format/date filters
- [x] Event status tabs and My Events
- [x] Event details modal, registration and cancellation demo
- [x] Department and institute explorers with event counts
- [x] Responsive cards, forms and horizontally scrollable admin table
- [x] FAQ accordion and feedback rating
- [ ] Production authentication, server-side validation and database integration (outside static HTML scope)
