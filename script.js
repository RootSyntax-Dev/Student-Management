// Sample initial data
let students = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    mobile: "9876543210",
    branch: "Computer Science",
    course: "B.Tech",
    batch: "2021-2025",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    mobile: "8765432109",
    branch: "Electrical Engineering",
    course: "M.Tech",
    batch: "2020-2022",
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit.singh@example.com",
    mobile: "7654321098",
    branch: "Mechanical Engineering",
    course: "B.Tech",
    batch: "2022-2026",
  },
];

// DOM elements
const addStudentBtn = document.getElementById("add-student-btn");
const addStudentForm = document.getElementById("add-student-form");
const saveStudentBtn = document.getElementById("save-student");
const cancelAddBtn = document.getElementById("cancel-add");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resetSearchBtn = document.getElementById("reset-search");
const studentsContainer = document.getElementById("students-container");
const filterBranch = document.getElementById("filter-branch");
const filterCourse = document.getElementById("filter-course");
const filterBatch = document.getElementById("filter-batch");
const applyFilterBtn = document.getElementById("apply-filter");
const resetFilterBtn = document.getElementById("reset-filter");

// Stats elements
const totalStudentsEl = document.getElementById("total-students");
const csStudentsEl = document.getElementById("cs-students");
const eeStudentsEl = document.getElementById("ee-students");
const mechStudentsEl = document.getElementById("mech-students");

// Form fields
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const branchInput = document.getElementById("branch");
const courseInput = document.getElementById("course");
const batchInput = document.getElementById("batch");

// Current state
let isEditing = false;
let currentEditId = null;
let filteredStudents = [...students];

// Initialize the app
function init() {
  renderStudents();
  updateStats();

  // Event listeners
  addStudentBtn.addEventListener("click", () => {
    addStudentForm.style.display = "block";
    resetForm();
    isEditing = false;
  });

  cancelAddBtn.addEventListener("click", () => {
    addStudentForm.style.display = "none";
    resetForm();
  });

  saveStudentBtn.addEventListener("click", saveStudent);

  searchBtn.addEventListener("click", searchStudents);
  resetSearchBtn.addEventListener("click", resetSearch);

  applyFilterBtn.addEventListener("click", applyFilters);
  resetFilterBtn.addEventListener("click", resetFilters);
}

// Render students to the DOM
function renderStudents() {
  studentsContainer.innerHTML = "";

  if (filteredStudents.length === 0) {
    studentsContainer.innerHTML =
      "<p>No students found matching your criteria.</p>";
    return;
  }

  filteredStudents.forEach((student) => {
    const studentCard = document.createElement("div");
    studentCard.className = "student-card";
    studentCard.innerHTML = `
            <div class="student-header">
                <div class="student-name">${student.name}</div>
                <div class="student-id">#${student.id}</div>
            </div>
            <div class="student-details">
                <div>
                    <div class="detail-label">Email</div>
                    <div>${student.email}</div>
                </div>
                <div>
                    <div class="detail-label">Mobile</div>
                    <div>${student.mobile}</div>
                </div>
                <div>
                    <div class="detail-label">Branch</div>
                    <div>${student.branch}</div>
                </div>
                <div>
                    <div class="detail-label">Course</div>
                    <div>${student.course}</div>
                </div>
                <div>
                    <div class="detail-label">Batch</div>
                    <div>${student.batch}</div>
                </div>
            </div>
            <div class="action-buttons">
                <button class="edit-btn" data-id="${student.id}">Edit</button>
                <button class="delete-btn" data-id="${student.id}">Delete</button>
            </div>
        `;

    studentsContainer.appendChild(studentCard);
  });

  // Add event listeners to edit and delete buttons
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      editStudent(id);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      deleteStudent(id);
    });
  });
}

// Save student (add or update)
function saveStudent() {
  // Validate form
  if (
    !nameInput.value ||
    !emailInput.value ||
    !mobileInput.value ||
    !branchInput.value ||
    !courseInput.value ||
    !batchInput.value
  ) {
    alert("Please fill all fields");
    return;
  }

  const studentData = {
    name: nameInput.value,
    email: emailInput.value,
    mobile: mobileInput.value,
    branch: branchInput.value,
    course: courseInput.value,
    batch: batchInput.value,
  };

  if (isEditing) {
    // Update existing student
    const index = students.findIndex((s) => s.id === currentEditId);
    if (index !== -1) {
      students[index] = { ...students[index], ...studentData };
    }
  } else {
    // Add new student
    const newId =
      students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    students.push({ id: newId, ...studentData });
  }

  // Reset and hide form
  addStudentForm.style.display = "none";
  resetForm();

  // Update UI
  applyFilters(); // This will re-render with current filters
  updateStats();
}

// Edit student
function editStudent(id) {
  const student = students.find((s) => s.id === id);
  if (!student) return;

  // Fill form with student data
  nameInput.value = student.name;
  emailInput.value = student.email;
  mobileInput.value = student.mobile;
  branchInput.value = student.branch;
  courseInput.value = student.course;
  batchInput.value = student.batch;

  // Set editing state
  isEditing = true;
  currentEditId = id;
  addStudentForm.style.display = "block";

  // Scroll to form
  addStudentForm.scrollIntoView({ behavior: "smooth" });
}

// Delete student
function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    students = students.filter((s) => s.id !== id);
    applyFilters(); // This will re-render with current filters
    updateStats();
  }
}

// Search students by name
function searchStudents() {
  const searchTerm = searchInput.value.toLowerCase();
  if (!searchTerm) {
    filteredStudents = [...students];
  } else {
    filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm)
    );
  }
  renderStudents();
}

// Reset search
function resetSearch() {
  searchInput.value = "";
  filteredStudents = [...students];
  renderStudents();
}

// Apply filters
function applyFilters() {
  const branch = filterBranch.value;
  const course = filterCourse.value;
  const batch = filterBatch.value;

  filteredStudents = students.filter((student) => {
    return (
      (!branch || student.branch === branch) &&
      (!course || student.course === course) &&
      (!batch || student.batch.includes(batch))
    );
  });

  renderStudents();
}

// Reset filters
function resetFilters() {
  filterBranch.value = "";
  filterCourse.value = "";
  filterBatch.value = "";
  filteredStudents = [...students];
  renderStudents();
}

// Reset form
function resetForm() {
  nameInput.value = "";
  emailInput.value = "";
  mobileInput.value = "";
  branchInput.value = "";
  courseInput.value = "";
  batchInput.value = "";
  isEditing = false;
  currentEditId = null;
}

// Update statistics
function updateStats() {
  totalStudentsEl.textContent = students.length;
  csStudentsEl.textContent = students.filter(
    (s) => s.branch === "Computer Science"
  ).length;
  eeStudentsEl.textContent = students.filter(
    (s) => s.branch === "Electrical Engineering"
  ).length;
  mechStudentsEl.textContent = students.filter(
    (s) => s.branch === "Mechanical Engineering"
  ).length;
}

// Initialize the application
document.addEventListener("DOMContentLoaded", init);
