"use strict";

const STORAGE_KEY = "ipam_notas_demo_v1";
const PASSWORD = "1234";
const PASSING_GRADE = 60;

const COURSES = [
  "Séptimo A",
  "Séptimo B",
  "Octavo",
  "Noveno A",
  "Noveno B",
  "Décimo A",
  "Décimo B",
  "Undécimo Grado"
];

const SUBJECTS = [
  { name: "Matemáticas", teacher: "Aaron Tinoco" },
  { name: "Física", teacher: "Aaron Tinoco" },
  { name: "Lengua y Literatura", teacher: "Jamilet Garcia" },
  { name: "Inglés", teacher: "Daisy Sarmientos" },
  { name: "Ciencias Sociales", teacher: "Ada Francis" },
  { name: "Biología", teacher: "Guillermo Anderson" },
  { name: "Biblia", teacher: "Guillermo Anderson" },
  { name: "Computación", teacher: "Elias Fley" },
  { name: "Educación Física", teacher: "Elias Fley" },
  { name: "A.E.P", teacher: "Johayda" },
  { name: "Creciendo en Valores", teacher: "Judith Lerma" },
  { name: "DDM", teacher: "Judith Lerma" }
];

const UNDÉCIMO_STUDENTS = [
  "Reyvin Blandon",
  "Ana Travers",
  "Keneth Centeno",
  "Ellen Martinez",
  "Alison Tatiana",
  "Fernando Ballesteros",
  "Kristhel Diaz",
  "Yaeli Leiva",
  "Osmary Martinez",
  "Lucia Calero",
  "Keydell Navarro"
];

const FIRST_NAMES = [
  "Adriana", "Alejandro", "Andrea", "Andrés", "Brenda", "Carlos",
  "Daniela", "David", "Elena", "Emmanuel", "Esteban", "Fernanda",
  "Gabriela", "Héctor", "Isabella", "Javier", "José", "Juan",
  "Karen", "Kevin", "Laura", "María", "Miguel", "Natalia",
  "Pablo", "Paola", "Raquel", "Samuel", "Valeria", "Xiomara",
  "Daniel", "Camila", "Mateo", "Sofía", "Gabriel", "Nicole",
  "Ricardo", "Tatiana", "Roberto", "Mónica", "Cristian", "Fátima"
];

const LAST_NAMES = [
  "Aguilar", "Alvarado", "Amador", "Báez", "Blandón", "Calderón",
  "Castillo", "Cruz", "Duarte", "Espinoza", "Flores", "García",
  "González", "Gutiérrez", "Hernández", "Herrera", "Jiménez",
  "López", "López", "Martínez", "Mendoza", "Morales", "Navarro",
  "Pérez", "Ramírez", "Ramos", "Reyes", "Rivera", "Rodríguez",
  "Ruiz", "Sánchez", "Torres", "Vargas", "Vásquez", "Zamora"
];

const TEACHERS = [
  "Aaron Tinoco",
  "Guillermo Anderson",
  "Daisy Sarmientos",
  "Jamilet Garcia",
  "Ada Francis",
  "Elias Fley",
  "Johayda",
  "Judith Lerma"
];

const DIRECTOR = "Yessenia Gonzales";

const state = {
  students: [],
  user: null,
  selectedStudentId: null
};

const $ = (selector) => document.querySelector(selector);
const loginScreen = $("#loginScreen");
const appScreen = $("#appScreen");
const loginForm = $("#loginForm");
const loginError = $("#loginError");
const courseFilter = $("#courseFilter");
const studentFilter = $("#studentFilter");

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function makeStudent(id, name, course) {
  const grades = {};
  for (const subject of SUBJECTS) {
    // Cada corte se califica sobre 50 puntos.
    grades[subject.name] = {
      corte1: randomInt(34, 50),
      corte2: randomInt(34, 50),
      corte3: randomInt(34, 50),
      corte4: randomInt(34, 50)
    };
  }

  return {
    id,
    name,
    course,
    grades,
    conduct: randomInt(80, 100)
  };
}

function createInitialStudents() {
  const students = [];
  let id = 1;

  for (const name of UNDÉCIMO_STUDENTS) {
    students.push(makeStudent(id++, name, "Undécimo Grado"));
  }

  const namePool = [];
  for (const first of FIRST_NAMES) {
    for (const last of LAST_NAMES) {
      namePool.push(`${first} ${last}`);
    }
  }

  const usedNames = new Set(UNDÉCIMO_STUDENTS.map(normalize));
  const availableNames = shuffle(namePool.filter((name) => !usedNames.has(normalize(name))));

  for (const course of COURSES.slice(0, -1)) {
    for (let i = 0; i < 5; i++) {
      const name = availableNames.pop();
      students.push(makeStudent(id++, name, course));
    }
  }

  return students;
}

function loadStudents() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) {
      state.students = saved;
      return;
    }
  } catch (error) {
    console.warn("No se pudieron leer los datos guardados.", error);
  }

  state.students = createInitialStudents();
  saveStudents();
}

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.students));
}

function getSubjectGrades(student, subjectName) {
  return student.grades[subjectName];
}

function semesterOne(grades) {
  return Number(grades.corte1) + Number(grades.corte2);
}

function semesterTwo(grades) {
  return Number(grades.corte3) + Number(grades.corte4);
}

function finalGrade(grades) {
  return (semesterOne(grades) + semesterTwo(grades)) / 2;
}

function studentAverage(student) {
  const total = SUBJECTS.reduce(
    (sum, subject) => sum + finalGrade(getSubjectGrades(student, subject.name)),
    0
  );
  return total / SUBJECTS.length;
}

function isStaff() {
  return state.user?.role === "staff";
}

function getVisibleStudents() {
  if (!state.user) return [];
  if (isStaff()) return state.students;

  return state.students.filter(
    (student) => normalize(student.name) === state.user.normalizedName
  );
}

function getSelectedStudent() {
  const visible = getVisibleStudents();
  return visible.find((student) => student.id === state.selectedStudentId) || visible[0] || null;
}

function setLoginError(message) {
  loginError.textContent = message;
}

function findUser(username) {
  const normalizedName = normalize(username);

  if (normalizedName === normalize(DIRECTOR) || normalizedName === "directora") {
    return { role: "staff", name: DIRECTOR, title: "Directora" };
  }

  const teacher = TEACHERS.find((name) => normalize(name) === normalizedName);
  if (teacher) {
    return { role: "staff", name: teacher, title: "Docente" };
  }

  const student = state.students.find(
    (item) => normalize(item.name) === normalizedName
  );

  if (student) {
    return {
      role: "student",
      name: student.name,
      title: "Estudiante",
      normalizedName: normalize(student.name)
    };
  }

  return null;
}

function login(event) {
  event.preventDefault();
  const username = $("#username").value;
  const password = $("#password").value;

  if (password !== PASSWORD) {
    setLoginError("Contraseña incorrecta. Para esta demostración, usa 1234.");
    return;
  }

  const user = findUser(username);
  if (!user) {
    setLoginError("No encontramos ese usuario. Ingresa el nombre completo.");
    return;
  }

  state.user = user;
  const visible = getVisibleStudents();
  state.selectedStudentId = visible[0]?.id ?? null;

  setLoginError("");
  loginScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
  renderApp();
}

function logout() {
  state.user = null;
  state.selectedStudentId = null;
  appScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  loginForm.reset();
  setLoginError("");
}

function populateFilters() {
  courseFilter.innerHTML = [
    '<option value="Todos">Todos los cursos</option>',
    ...COURSES.map((course) => `<option value="${course}">${course}</option>`)
  ].join("");

  refreshStudentFilter();
}

function refreshStudentFilter() {
  const course = courseFilter.value || "Todos";
  const students = state.students
    .filter((student) => course === "Todos" || student.course === course)
    .sort((a, b) => a.name.localeCompare(b.name, "es"));

  studentFilter.innerHTML = students
    .map((student) => `<option value="${student.id}">${student.name}</option>`)
    .join("");

  if (students.some((student) => student.id === state.selectedStudentId)) {
    studentFilter.value = String(state.selectedStudentId);
  } else if (students.length) {
    state.selectedStudentId = students[0].id;
    studentFilter.value = String(state.selectedStudentId);
  }
}

function renderSummary(student) {
  const average = studentAverage(student);
  const approved = SUBJECTS.filter(
    (subject) => finalGrade(student.grades[subject.name]) >= PASSING_GRADE
  ).length;

  $("#summaryCards").innerHTML = `
    <article class="summary-card">
      <div class="summary-label">Promedio anual</div>
      <div class="summary-value">${average.toFixed(1)} / 100</div>
    </article>
    <article class="summary-card">
      <div class="summary-label">Clases aprobadas</div>
      <div class="summary-value">${approved} / ${SUBJECTS.length}</div>
    </article>
    <article class="summary-card">
      <div class="summary-label">Conducta</div>
      <div class="summary-value">${Number(student.conduct).toFixed(0)} / 100</div>
    </article>
  `;
}

function scoreCell(value, studentId, subjectName, key, editable) {
  if (!editable) {
    return `<span>${Number(value).toFixed(0)}</span>`;
  }

  return `
    <input
      class="grade-input"
      type="number"
      min="0"
      max="50"
      step="1"
      value="${Number(value)}"
      data-student-id="${studentId}"
      data-subject="${subjectName}"
      data-grade-key="${key}"
      aria-label="${subjectName}, ${key}"
    />
  `;
}

function renderGradeTable(student) {
  const editable = isStaff();

  $("#gradesBody").innerHTML = SUBJECTS.map((subject) => {
    const grades = getSubjectGrades(student, subject.name);
    const firstSemester = semesterOne(grades);
    const secondSemester = semesterTwo(grades);
    const final = finalGrade(grades);

    return `
      <tr>
        <td>${subject.name}</td>
        <td>${subject.teacher}</td>
        <td>${scoreCell(grades.corte1, student.id, subject.name, "corte1", editable)}</td>
        <td>${scoreCell(grades.corte2, student.id, subject.name, "corte2", editable)}</td>
        <td class="grade-total">${firstSemester.toFixed(0)}</td>
        <td>${scoreCell(grades.corte3, student.id, subject.name, "corte3", editable)}</td>
        <td>${scoreCell(grades.corte4, student.id, subject.name, "corte4", editable)}</td>
        <td class="grade-total">${secondSemester.toFixed(0)}</td>
        <td class="grade-total">${final.toFixed(1)}</td>
      </tr>
    `;
  }).join("");

  const average = studentAverage(student);
  const conductCell = editable
    ? `<input class="conduct-input" type="number" min="0" max="100" step="1"
         value="${Number(student.conduct)}" data-student-id="${student.id}"
         aria-label="Conducta" />`
    : `<span>${Number(student.conduct).toFixed(0)}</span>`;

  $("#gradesFooter").innerHTML = `
    <tr>
      <th colspan="8" scope="row">Promedio</th>
      <td>${average.toFixed(1)}</td>
    </tr>
    <tr>
      <th colspan="8" scope="row">Conducta</th>
      <td>${conductCell}</td>
    </tr>
  `;

  $("#saveBtn").classList.toggle("hidden", !editable);
}

function renderApp() {
  if (!state.user) return;

  $("#accountName").textContent = state.user.name;
  $("#accountRole").textContent = state.user.title;
  $("#staffControls").classList.toggle("hidden", !isStaff());
  $("#staffNotice").classList.toggle("hidden", !isStaff());

  $("#pageDescription").textContent = isStaff()
    ? "Vista de todos los cursos y alumnos. Puedes editar y guardar las notas."
    : "Aquí puedes consultar únicamente tu propio cuadro de notas.";

  if (isStaff()) {
    populateFilters();
  } else {
    state.selectedStudentId = getVisibleStudents()[0]?.id ?? null;
  }

  const student = getSelectedStudent();
  if (!student) {
    $("#studentHeading").textContent = "No se encontró el estudiante";
    $("#studentCourse").textContent = "";
    $("#gradesBody").innerHTML = "";
    $("#gradesFooter").innerHTML = "";
    $("#summaryCards").innerHTML = "";
    return;
  }

  $("#studentHeading").textContent = student.name;
  $("#studentCourse").textContent = `${student.course} · Año lectivo 2026`;
  renderSummary(student);
  renderGradeTable(student);
}

function saveEditedGrades() {
  if (!isStaff()) return;

  const inputs = document.querySelectorAll(".grade-input");
  for (const input of inputs) {
    const value = Number(input.value);
    if (!Number.isFinite(value) || value < 0 || value > 50) {
      $("#saveMessage").textContent = "Cada corte debe ser un número entre 0 y 50.";
      input.focus();
      return;
    }
  }

  const conductInput = document.querySelector(".conduct-input");
  if (conductInput) {
    const conduct = Number(conductInput.value);
    if (!Number.isFinite(conduct) || conduct < 0 || conduct > 100) {
      $("#saveMessage").textContent = "La conducta debe ser un número entre 0 y 100.";
      conductInput.focus();
      return;
    }
  }

  for (const input of inputs) {
    const student = state.students.find(
      (item) => item.id === Number(input.dataset.studentId)
    );
    if (!student) continue;

    const subjectGrades = student.grades[input.dataset.subject];
    subjectGrades[input.dataset.gradeKey] = Number(input.value);
  }

  if (conductInput) {
    const student = state.students.find(
      (item) => item.id === Number(conductInput.dataset.studentId)
    );
    if (student) student.conduct = Number(conductInput.value);
  }

  saveStudents();
  $("#saveMessage").textContent = "Cambios guardados en este navegador.";
  renderApp();
  window.setTimeout(() => {
    $("#saveMessage").textContent = "";
  }, 3500);
}

function initEvents() {
  loginForm.addEventListener("submit", login);
  $("#logoutBtn").addEventListener("click", logout);
  $("#saveBtn").addEventListener("click", saveEditedGrades);
  $("#printBtn").addEventListener("click", () => window.print());

  courseFilter.addEventListener("change", () => {
    if (!isStaff()) return;
    refreshStudentFilter();
    renderApp();
  });

  studentFilter.addEventListener("change", () => {
    if (!isStaff()) return;
    state.selectedStudentId = Number(studentFilter.value);
    renderApp();
  });
}

loadStudents();
initEvents();
