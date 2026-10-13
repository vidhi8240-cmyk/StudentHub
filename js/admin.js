(() => {
    'use strict';
    let students = [
        {
            name: 'Aarav Shah',
            email: 'aarav@example.edu',
            course: 'Computer Engineering',
            year: 'Second Year'
        },
        {
            name: 'Mira Patel',
            email: 'mira@example.edu',
            course: 'Information Technology',
            year: 'First Year'
        },
        {
            name: 'Kabir Desai',
            email: 'kabir@example.edu',
            course: 'Computer Science',
            year: 'Third Year'
        }
    ];
    function drawStudents() {
        const query = document.querySelector('#student-search').value.toLowerCase();
        const rows = document.querySelector('#student-rows');
        const visibleStudents = students
            .map((student, index) => ({ ...student, index }))
            .filter((student) => [student.name, student.email, student.course]
            .join(' ')
            .toLowerCase()
            .includes(query));
        rows.innerHTML = visibleStudents.map((student) => `
      <tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>${student.year}</td>
        <td>
          <button class="secondary" onclick="editStudent(${student.index})">Edit</button>
          <button onclick="deleteStudent(${student.index})">Delete</button>
        </td>
      </tr>
    `).join('');
        document.querySelector('#student-count').textContent = students.length;
    }
    window.editStudent = function editStudent(index) {
        const student = students[index];
        if (!student)
            return;
        const name = prompt('Student name', student.name);
        if (name === null)
            return;
        const email = prompt('Student email', student.email);
        if (email === null)
            return;
        students[index] = { ...student, name, email };
        drawStudents();
    };
    window.deleteStudent = function deleteStudent(index) {
        if (confirm('Delete this sample student?')) {
            students.splice(index, 1);
            drawStudents();
        }
    };
    document.querySelector('#student-search').addEventListener('input', drawStudents);
    document.querySelector('#add-student').addEventListener('click', () => {
        const name = prompt('Student name');
        if (!name)
            return;
        const email = prompt('Student email');
        if (!email)
            return;
        students.push({ name, email, course: 'Other', year: 'First Year' });
        drawStudents();
    });
    drawStudents();
    document.querySelector('#admin-event-form').addEventListener('submit', (event) => {
        event.preventDefault();
        if (!event.target.reportValidity())
            return;
        const start = document.querySelector('#admin-event-start').value;
        const end = document.querySelector('#admin-event-end').value;
        const deadline = document.querySelector('#admin-event-deadline').value;
        if (end < start) {
            alert('End date must be on or after start date.');
            return;
        }
        const newEvent = {
            id: `CUSTOM${Date.now()}`,
            title: document.querySelector('#admin-event-title').value,
            description: document.querySelector('#admin-event-description').value,
            department: document.querySelector('#admin-event-dept').value,
            institute: document.querySelector('#admin-event-institute').value,
            category: document.querySelector('#admin-event-category').value,
            startDate: start,
            startTime: document.querySelector('#admin-event-starttime').value,
            endDate: end,
            endTime: document.querySelector('#admin-event-endtime').value,
            deadline,
            venue: document.querySelector('#admin-event-venue').value,
            format: document.querySelector('#admin-event-format').value,
            capacity: Number(document.querySelector('#admin-event-capacity').value),
            registeredCount: 0,
            icon: '📌',
            added: Date.now(),
            price: 'Free',
            organizer: 'StudentHub Admin',
            contact: 'events@studenthub.demo'
        };
        let customEvents = [];
        try {
            customEvents = JSON.parse(localStorage.getItem('studenthub-custom-events') || '[]');
        }
        catch {
            customEvents = [];
        }
        customEvents.push(newEvent);
        localStorage.setItem('studenthub-custom-events', JSON.stringify(customEvents));
        const message = document.querySelector('#admin-event-message');
        message.textContent = 'Event published in this browser. Open Events to see it.';
        message.className = 'notice';
        event.target.reset();
    });
})();
