const STORAGE_KEY = "ipa_matagalpa_school_v2";

const teacherBySubject = {
  "Matemáticas": "Aaron Tinoco",
  "Física": "Aaron Tinoco",
  "Lengua y Literatura": "Jamilet Garcia",
  "Inglés": "Daisy Sarmientos",
  "Ciencias Sociales": "Ada Francis",
  "Biología": "Guillermo Anderson"
};

const initialStudents = [
  {
    id: 1,
    name: "Reyvin Blandon",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 92, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 88, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 90, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 94, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 87, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 89, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 2,
    name: "Ana Travers",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 89, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 86, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 92, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 90, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 85, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 91, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 3,
    name: "Keneth Centeno",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 84, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 82, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 80, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 87, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 83, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 85, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 4,
    name: "Ellen Martinez",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 93, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 90, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 95, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 96, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 89, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 91, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 5,
    name: "Alison Tatiana",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 87, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 83, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 88, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 91, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 86, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 88, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 6,
    name: "Fernando Ballesteros",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 79, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 75, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 82, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 80, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 77, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 81, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 7,
    name: "Kristhel Diaz",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 90, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 88, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 92, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 89, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 91, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 90, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 8,
    name: "Yaeli Leiva",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 88, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 86, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 90, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 92, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 87, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 89, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 9,
    name: "Osmary Martinez",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 85, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 82, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 88, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 84, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 86, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 87, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 10,
    name: "Lucia Calero",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 94, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 90, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 96, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 93, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 92, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 95, profesor: teacherBySubject["Biología"] }
    ]
  },
  {
    id: 11,
    name: "Keydell Navarro",
    course: "Undécimo Grado",
    notas: [
      { materia: "Matemáticas", nota: 80, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 78, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 83, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 81, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 79, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 82, profesor: teacherBySubject["Biología"] }
    ]
  }
];

const state = {
  students: [],
  selectedStudentId: null,
  activeTab: "dashboard"
};

const loginScreen = document.getElementById("loginScreen");
const appScreen = document.getElementById("appScreen");
const loginForm = document.getElementById("loginForm");
const studentList = document.getElementById("studentList");
const detailPanel = document.getElementById("detailPanel");
const statsEl = document.getElementById("stats");
const searchInput = document.getElementById("searchInput");
const courseFilter = document.getElementById("courseFilter");
const addStudentBtn = document.getElementById("addStudentBtn");
const studentModal = document.getElementById("studentModal");
const studentForm = document.getElementById("studentForm");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelStudentBtn = document.getElementById("cancelStudentBtn");
const teacherGrid = document.getElementById("teacherGrid");
const courseGrid = document.getElementById("courseGrid");

function loadStudents() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  state.students = saved && saved.length ? saved : initialStudents;
}

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.students));
}

function getAverage(notas) {
  if (!notas || notas.length === 0) return 0;
  const total = notas.reduce((sum, item) => sum + Number(item.nota || 0), 0);
  return total / notas.length;
}

function getStatusClass(avg) {
  if (avg >= 90) return "status-good";
  if (avg >= 75) return "status-average";
  return "status-low";
}

function getStatusText(avg) {
  if (avg >= 90) return "Excelente";
  if (avg >= 75) return "Aprobado";
  return "Necesita apoyo";
}

function getFilteredStudents() {
  const q = searchInput.value.trim().toLowerCase();
  const selectedCourse = courseFilter.value;

  return state.students.filter((student) => {
    const matchesSearch = !q || student.name.toLowerCase().includes(q);
    const matchesCourse = selectedCourse === "Todos" || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });
}

function renderStats() {
  const filtered = getFilteredStudents();
  const total = filtered.length;
  const promedioGeneral =
    total === 0
      ? 0
      : filtered.reduce((sum, s) => sum + getAverage(s.notas), 0) / total;

  const mejor =
    total === 0
      ? null
      : filtered.reduce((prev, current) =>
          getAverage(current.notas) > getAverage(prev.notas) ? current : prev
        );

  const aprobados = filtered.filter((s) => getAverage(s.notas) >= 75).length;

  const stats = [
    { label: "Total", value: total, color: "#1d4ed8" },
    { label: "Promedio", value: `${promedioGeneral.toFixed(1)}%`, color: "#0f172a" },
    { label: "Aprobados", value: aprobados, color: "#16a34a" },
    { label: "Mejor", value: mejor ? mejor.name.split(" ")[0] : "N/A", color: "#f59e0b" }
  ];

  statsEl.innerHTML = stats.map(item => `
    <div class="stat-card">
      <div class="stat-label">${item.label}</div>
      <div class="stat-value" style="color:${item.color}">${item.value}</div>
    </div>
  `).join("");
}

function renderStudentList() {
  const filtered = getFilteredStudents();

  if (filtered.length === 0) {
    studentList.innerHTML = '<div class="empty-state">No se encontraron estudiantes.</div>';
    renderStats();
    return;
  }

  const selected = filtered.find((s) => s.id === state.selectedStudentId) || filtered[0];
  state.selectedStudentId = selected.id;

  studentList.innerHTML = filtered.map((student) => {
    const avg = getAverage(student.notas);
    const activeClass = student.id === state.selectedStudentId ? "active" : "";

    return `
      <div class="student-card ${activeClass}" data-id="${student.id}">
        <div class="student-card-header">
          <p class="student-name">${student.name}</p>
          <span class="student-average">${avg.toFixed(1)}%</span>
        </div>
        <div class="student-course">${student.course}</div>
      </div>
    `;
  }).join("");

  studentList.querySelectorAll(".student-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedStudentId = Number(card.dataset.id);
      renderStudentsTab();
    });
  });

  renderDetail(selected);
  renderStats();
}

function renderDetail(student) {
  if (!student) {
    detailPanel.innerHTML = '<div class="empty-state">Selecciona un estudiante.</div>';
    return;
  }

  const avg = getAverage(student.notas);
  const statusClass = getStatusClass(avg);
  const statusLabel = getStatusText(avg);

  detailPanel.innerHTML = `
    <div class="profile-header">
      <div>
        <h2 class="profile-title">${student.name}</h2>
        <div class="student-course">${student.course}</div>
      </div>
      <span class="status-pill ${statusClass}">${statusLabel}</span>
    </div>

    <div class="summary-grid">
      <div class="mini-box">
        <div class="mini-box-label">Promedio</div>
        <div class="mini-box-value">${avg.toFixed(1)}%</div>
      </div>
      <div class="mini-box">
        <div class="mini-box-label">Materias</div>
        <div class="mini-box-value">${student.notas.length}</div>
      </div>
      <div class="mini-box">
        <div class="mini-box-label">Curso</div>
        <div class="mini-box-value">${student.course}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Materia</th>
          <th>Docente</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
        ${student.notas.map((item, index) => `
          <tr>
            <td>${item.materia}</td>
            <td>${item.profesor || teacherBySubject[item.materia] || "Sin docente"}</td>
            <td>
              <input type="number" min="0" max="100" step="1" value="${item.nota}" data-index="${index}" />
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="detail-actions">
      <button type="button" class="danger-btn" id="deleteStudentBtn">Eliminar</button>
      <button type="button" class="primary-btn" id="saveNotesBtn">Guardar notas</button>
      <button type="button" class="secondary-btn" id="printBoletinBtn">Imprimir boletín</button>
    </div>
  `;

  document.getElementById("saveNotesBtn").addEventListener("click", () => {
    const inputs = detailPanel.querySelectorAll("input[type='number']");
    const updatedNotas = student.notas.map((item, idx) => {
      const value = Number(inputs[idx]?.value || 0);
      return {
        ...item,
        nota: Math.min(100, Math.max(0, value))
      };
    });

    const studentIndex = state.students.findIndex((s) => s.id === student.id);
    state.students[studentIndex].notas = updatedNotas;
    saveStudents();
    renderStudentsTab();
  });

  document.getElementById("deleteStudentBtn").addEventListener("click", () => {
    const confirmDelete = confirm(`¿Deseas eliminar a ${student.name}?`);
    if (!confirmDelete) return;

    state.students = state.students.filter((s) => s.id !== student.id);
    saveStudents();

    if (state.students.length > 0) {
      state.selectedStudentId = state.students[0].id;
    } else {
      state.selectedStudentId = null;
    }

    renderStudentsTab();
  });

  document.getElementById("printBoletinBtn").addEventListener("click", () => {
    window.print();
  });
}

function renderTeachersTab() {
  const teachers = [
    { nombre: "Aaron Tinoco", cargo: "Matemáticas y Física" },
    { nombre: "Jamilet Garcia", cargo: "Lengua y Literatura" },
    { nombre: "Daisy Sarmientos", cargo: "Inglés" },
    { nombre: "Ada Francis", cargo: "Ciencias Sociales" },
    { nombre: "Guillermo Anderson", cargo: "Biología" }
  ];

  teacherGrid.innerHTML = teachers.map((teacher) => `
    <div class="teacher-card">
      <h3 class="teacher-name">${teacher.nombre}</h3>
      <p class="teacher-role">${teacher.cargo}</p>
    </div>
  `).join("");
}

function renderCoursesTab() {
  const materias = [
    "Matemáticas",
    "Física",
    "Lengua y Literatura",
    "Inglés",
    "Ciencias Sociales",
    "Biología"
  ];

  courseGrid.innerHTML = materias.map((materia) => {
    const count = state.students.filter((student) =>
      student.notas.some((item) => item.materia === materia)
    ).length;

    return `
      <div class="course-card">
        <h3 class="course-name">${materia}</h3>
        <p class="course-meta">${count} estudiantes inscritos</p>
      </div>
    `;
  }).join("");
}

function renderDashboard() {
  renderStats();
}

function renderStudentsTab() {
  const filtered = getFilteredStudents();

  if (filtered.length > 0 && !filtered.some((s) => s.id === state.selectedStudentId)) {
    state.selectedStudentId = filtered[0].id;
  }

  renderStudentList();
}

function showTab(tabName) {
  state.activeTab = tabName;

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  const sections = {
    dashboard: document.getElementById("dashboardTab"),
    students: document.getElementById("studentsTab"),
    teachers: document.getElementById("teachersTab"),
    courses: document.getElementById("coursesTab")
  };

  Object.entries(sections).forEach(([key, el]) => {
    el.classList.toggle("hidden", key !== tabName);
  });

  if (tabName === "dashboard") renderDashboard();
  if (tabName === "students") renderStudentsTab();
  if (tabName === "teachers") renderTeachersTab();
  if (tabName === "courses") renderCoursesTab();
}

function showApp() {
  loginScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
  showTab("dashboard");
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "1234") {
    showApp();
  } else {
    alert("Credenciales incorrectas. Usa admin / 1234");
  }
}

function handleAddStudent(event) {
  event.preventDefault();

  const name = document.getElementById("newName").value.trim();
  const course = document.getElementById("newCourse").value;

  if (!name) {
    alert("Debes ingresar el nombre del estudiante.");
    return;
  }

  const newStudent = {
    id: Date.now(),
    name,
    course,
    notas: [
      { materia: "Matemáticas", nota: 0, profesor: teacherBySubject["Matemáticas"] },
      { materia: "Física", nota: 0, profesor: teacherBySubject["Física"] },
      { materia: "Lengua y Literatura", nota: 0, profesor: teacherBySubject["Lengua y Literatura"] },
      { materia: "Inglés", nota: 0, profesor: teacherBySubject["Inglés"] },
      { materia: "Ciencias Sociales", nota: 0, profesor: teacherBySubject["Ciencias Sociales"] },
      { materia: "Biología", nota: 0, profesor: teacherBySubject["Biología"] }
    ]
  };

  state.students.push(newStudent);
  state.selectedStudentId = newStudent.id;
  saveStudents();
  renderStudentsTab();
  studentForm.reset();
  studentModal.classList.add("hidden");
}

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => showTab(btn.dataset.tab));
});

loginForm.addEventListener("submit", handleLogin);

addStudentBtn.addEventListener("click", () => {
  studentModal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  studentModal.classList.add("hidden");
  studentForm.reset();
});

cancelStudentBtn.addEventListener("click", () => {
  studentModal.classList.add("hidden");
  studentForm.reset();
});

studentForm.addEventListener("submit", handleAddStudent);

searchInput.addEventListener("input", () => {
  if (state.activeTab === "students") renderStudentsTab();
  if (state.activeTab === "dashboard") renderDashboard();
});

courseFilter.addEventListener("change", () => {
  if (state.activeTab === "students") renderStudentsTab();
  if (state.activeTab === "dashboard") renderDashboard();
});

function init() {
  loadStudents();
  state.selectedStudentId = state.students[0]?.id || null;
  renderDashboard();
  renderTeachersTab();
  renderCoursesTab();
  loginScreen.classList.remove("hidden");
  appScreen.classList.add("hidden");
}

init();
