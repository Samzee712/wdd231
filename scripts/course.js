const courses = [
  { code: 'CSE110', name: 'Programming Basics', credits: 3, completed: true },
  { code: 'WDD130', name: 'Web Fundamentals', credits: 3, completed: true },
  { code: 'CSE111', name: 'Programming with Functions', credits: 3, completed: false },
  { code: 'CSE210', name: 'Programming with Classes', credits: 3, completed: false },
  { code: 'WDD131', name: 'Dynamic Web Fundamentals', credits: 3, completed: false },
  { code: 'WDD231', name: 'Web Frontend Development I', credits: 3, completed: false },
];

const courseList = document.getElementById('course-list');
const totalCredits = document.getElementById('total-credits');

function displayCourses(filter = 'all') {
  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.code.startsWith(filter.toUpperCase()));

  courseList.innerHTML = filteredCourses.map(course => `
    <div class="course-card ${course.completed ? 'completed' : ''}">
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    </div>
  `).join('');

  totalCredits.textContent = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
}

// Add active state to filter buttons
document.querySelectorAll('#course-filters button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('#course-filters button').forEach(btn => btn.classList.remove('active-filter'));
    button.classList.add('active-filter');
    displayCourses(button.dataset.filter);
  });
});

// Initialize
displayCourses();