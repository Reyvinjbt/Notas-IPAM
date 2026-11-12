"use strict";

const STORAGE_KEY = "ipam_notas_demo_v1";
const PASSWORD = "1234";
const PASSING_GRADE = 60;
const CUT_KEYS = ["corte1", "corte2", "corte3", "corte4"];

const CUT_ROMAN = {
  corte1: "I",
  corte2: "II",
  corte3: "III",
  corte4: "IV"
};

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
  "Pablo", "Paola", "Raquel", "Samuel", "Valeria", "Xiomara"
];

const LAST_NAMES = [
  "Aguilar", "Alvarado", "Amador", "Báez", "Blandón", "Calderón",
  "Castillo", "Cruz", "Duarte", "Espinoza", "Flores", "García",
  "González", "Gutiérrez", "Hernández", "Herrera", "Jiménez",
  "López", "Martínez", "Mendoza", "Morales", "Navarro", "Pérez",
  "Ramírez", "Ramos", "Reyes", "Rivera", "Rodríguez", "Sánchez",
  "Torres", "Vargas", "Vásquez", "Zamora"
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
  selectedStudentId: null,
  assessmentContext: null
};

const $ = (selector) => document.querySelector(selector);
const loginScreen = $("#loginScreen");
const appScreen = $("#appScreen");
const loginForm = $("#loginForm");
const loginError = $("#loginError");
const courseFilter = $("#courseFilter");
const studentFilter = $("#studentFilter");
const assessmentModal = $("#assessmentModal");

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
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

function makeCut(score) {
  const maximums = [10, 10, 10, 20];
  const names = [
    "Trabajo",
    "Revisión de cuaderno",
    "Prueba",
    "Examen"
  ];

  let remaining = Math.max(0, Math.min(50, Math.round(Number(score) || 0)));

  const activities = maximums.map((max, index) => {
    const earned = Math.min(max, remaining);
    remaining -= earned;

    return {
      name: names[index],
      max,
      score: earned
    };
  });

  return { activities };
}

function cutScore(cut) {
  if (typeof cut === "number") return cut;
  if (!cut || !Array.isArray(cut.activities)) return 0;

  return cut.activities.reduce(
    (sum, activity) => sum + Number(activity.score || 0),
    0
  );
}

function makeStudent(id, name, course) {
  const grades = {};

  for (const subject of SUBJECTS) {
    grades[subject.name] = {
      corte1: makeCut(randomInt(34, 50)),
      corte2: makeCut(randomInt(34, 50)),
      corte3: makeCut(randomInt(34, 50)),
      corte4: makeCut(randomInt(34, 50))
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
  const availableNames = shuffle(
    namePool.filter((name) => !usedNames.has(normalize(name)))
  );

  for (const course of COURSES.slice(0, -1)) {
    for (let i = 0; i < 5; i++) {
      students.push(makeStudent(id++, availableNames.pop(), course));
    }
  }

  return students;
}

function migrateStudent(student) {
  if (!student.grades) student.grades = {};

  if (Array.isArray(student.notas)) {
    for (const oldGrade of student.notas) {
      if (!oldGrade?.materia) continue;

      const scoreOutOf100 = Number(oldGrade.nota) || 0;
      const scorePerCut = Math.round(scoreOutOf100 / 2);

      if (!student.grades[oldGrade.materia]) {
        student.grades[oldGrade.materia] = {
          corte1: makeCut(scorePerCut),
          corte2: makeCut(scorePerCut),
          corte3: makeCut(scorePerCut),
          corte4: makeCut(scorePerCut)
        };
      }
    }
  }

  for (const subject of SUBJECTS) {
    if (!student.grades[subject.name]) {
      student.grades[subject.name] = {
        corte1: makeCut(0),
        corte2: makeCut(0),
        corte3: makeCut(0),
        corte4: makeCut(0)
      };
    }

    for (const key of CUT_KEYS) {
      const current = student.grades[subject.name][key];

      if (typeof current === "number") {
        student.grades[subject.name][key] = makeCut(current);
      } else if (!current || !Array.isArray(current.activities)) {
        student.grades[subject.name][key] = makeCut(0);
      }
    }
  }

  if (!Number.isFinite(Number(student.conduct))) {
    student.conduct = 100;
  }

  delete student.notas;
  return student;
}

function loadStudents() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (Array.isArray(saved) && saved.length > 0) {
      state.students = saved.map(migrateStudent);
      saveStudents();
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

function semesterOne(grades) {
  return cutScore(grades.corte1) + cutScore(grades.corte2);
}

function semesterTwo(grades) {
  return cutScore(grades.corte3) + cutScore(grades.corte4);
}

function finalGrade(grades) {
  return (semesterOne(grades) + semesterTwo(grades)) / 2;
}

function studentAverage(student) {
  const total = SUBJECTS.reduce(
    (sum, subject) => sum + finalGrade(student.grades[subject.name]),
    0
  );

  return total / SUBJECTS.length;
}

function qualitative(value, max) {
  const percentage = max > 0 ? (Number(value) / max) * 100 : 0;

  if (percentage >= 90) {
    return { text: "AA", className: "qual-aa" };
  }

  if (percentage >= 76) {
    return { text: "AS", className: "qual-as" };
  }

  if (percentage >= 60) {
    return { text: "AF", className: "qual-af" };
  }

  return { text: "AI", className: "qual-ai" };
}

function qualitativeCell(value, max) {
  const result = qualitative(value, max);

  return `
    <span class="qualitative ${result.className}">
      ${result.text}
    </span>
  `;
}

function isStaff() {
  return state.user?.role === "staff";
}

function visibleStudents() {
  if (!state.user) return [];
  if (isStaff()) return state.students;

  return state.students.filter(
    (student) => normalize(student.name) === state.user.normalizedName
  );
}

function getSelectedStudent() {
  const students = visibleStudents();

  return students.find((student) => student.id === state.selectedStudentId)
    || students[0]
    || null;
}

function login(event) {
  event.preventDefault();

  const username = $("#username").value;
  const password = $("#password").value;

  if (password !== PASSWORD) {
    loginError.textContent = "Contraseña incorrecta. Para esta demostración, usa 1234.";
    return;
  }

  const normalizedName = normalize(username);
  let user = null;

  if (
    normalizedName === normalize(DIRECTOR)
    || normalizedName === "directora"
  ) {
    user = {
      role: "staff",
      name: DIRECTOR,
      title: "Directora"
    };
  } else {
    const teacher = TEACHERS.find(
      (name) => normalize(name) === normalizedName
    );

    if (teacher) {
      user = {
        role: "staff",
        name: teacher,
        title: "Docente"
      };
    } else {
      const student = state.students.find(
        (item) => normalize(item.name) === normalizedName
      );

      if (student) {
        user = {
          role: "student",
          name: student.name,
          title: "Estudiante",
          normalizedName: normalize(student.name)
        };
      }
    }
  }

  if (!user) {
    loginError.textContent = "Usuario no encontrado. Ingresa el nombre completo.";
    return;
  }

  state.user = user;
  state.selectedStudentId = visibleStudents()[0]?.id ?? null;

  loginError.textContent = "";
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
}

function populateFilters() {
  courseFilter.innerHTML = [
    '<option value="Todos">Todos los cursos</option>',
    ...COURSES.map((course) =>
      `<option value="${escapeHTML(course)}">${escapeHTML(course)}</option>`
    )
  ].join("");

  refreshStudentFilter();
}

function refreshStudentFilter() {
  const selectedCourse = courseFilter.value || "Todos";

  const students = state.students
    .filter((student) =>
      selectedCourse === "Todos" || student.course === selectedCourse
    )
    .sort((a, b) => a.name.localeCompare(b.name, "es"));

  studentFilter.innerHTML = students.map((student) =>
    `<option value="${student.id}">${escapeHTML(student.name)}</option>`
  ).join("");

  if (students.some((student) => student.id === state.selectedStudentId)) {
    studentFilter.value = String(state.selectedStudentId);
  } else if (students.length > 0) {
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

function cutButton(student, subject, cutKey) {
  const score = cutScore(student.grades[subject.name][cutKey]);

  return `
    <button
      class="cut-open-button"
      type="button"
      data-student-id="${student.id}"
      data-subject="${escapeHTML(subject.name)}"
      data-cut="${cutKey}"
      aria-label="Ver detalle de ${escapeHTML(subject.name)}, corte ${CUT_ROMAN[cutKey]}"
    >
      ${score.toFixed(0)} / 50
    </button>
  `;
}

function renderGrades(student) {
  $("#gradesBody").innerHTML = SUBJECTS.map((subject) => {
    const grades = student.grades[subject.name];

    const c1 = cutScore(grades.corte1);
    const c2 = cutScore(grades.corte2);
    const c3 = cutScore(grades.corte3);
    const c4 = cutScore(grades.corte4);
    const sem1 = semesterOne(grades);
    const sem2 = semesterTwo(grades);
    const annual = finalGrade(grades);

    return `
      <tr>
        <td>${escapeHTML(subject.name)}</td>
        <td>${escapeHTML(subject.teacher)}</td>
        <td>${cutButton(student, subject, "corte1")}</td>
        <td>${qualitativeCell(c1, 50)}</td>
        <td>${cutButton(student, subject, "corte2")}</td>
        <td>${qualitativeCell(c2, 50)}</td>
        <td class="grade-total">${sem1.toFixed(0)}</td>
        <td>${qualitativeCell(sem1, 100)}</td>
        <td>${cutButton(student, subject, "corte3")}</td>
        <td>${qualitativeCell(c3, 50)}</td>
        <td>${cutButton(student, subject, "corte4")}</td>
        <td>${qualitativeCell(c4, 50)}</td>
        <td class="grade-total">${sem2.toFixed(0)}</td>
        <td>${qualitativeCell(sem2, 100)}</td>
        <td class="grade-total">${annual.toFixed(1)}</td>
        <td>${qualitativeCell(annual, 100)}</td>
      </tr>
    `;
  }).join("");

  const average = studentAverage(student);
  const conduct = Number(student.conduct);

  $("#gradesFooter").innerHTML = `
    <tr>
      <th colspan="15" scope="row">Promedio</th>
      <td>${average.toFixed(1)} ${qualitativeCell(average, 100)}</td>
    </tr>
    <tr>
      <th colspan="15" scope="row">Conducta</th>
      <td>${conduct.toFixed(0)} ${qualitativeCell(conduct, 100)}</td>
    </tr>
  `;
}

function renderApp() {
  if (!state.user) return;

  $("#accountName").textContent = state.user.name;
  $("#accountRole").textContent = state.user.title;

  $("#staffControls").classList.toggle("hidden", !isStaff());
  $("#staffNotice").classList.toggle("hidden", !isStaff());

  $("#pageDescription").textContent = isStaff()
    ? "Puedes consultar y editar el desglose de notas de todos los estudiantes."
    : "Puedes consultar tus notas y el detalle de actividades. No puedes editarlas.";

  if (isStaff()) {
    populateFilters();
  } else {
    state.selectedStudentId = visibleStudents()[0]?.id ?? null;
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
  renderGrades(student);
}

function renderAssessmentRows(activities, editable) {
  $("#assessmentRows").innerHTML = activities.map((activity, index) => {
    const name = escapeHTML(activity.name);
    const max = Number(activity.max);
    const score = Number(activity.score);

    if (!editable) {
      return `
        <div class="assessment-row">
          <div class="assessment-field">
            <label>Actividad</label>
            <div class="assessment-readonly">${name}</div>
          </div>
          <div class="assessment-field">
            <label>Valor</label>
            <div class="assessment-readonly">${max} puntos</div>
          </div>
          <div class="assessment-field">
            <label>Nota obtenida</label>
            <div class="assessment-readonly">${score} puntos</div>
          </div>
        </div>
      `;
    }

    return `
      <div class="assessment-row">
        <div class="assessment-field">
          <label for="activityName${index}">Actividad</label>
          <input
            id="activityName${index}"
            class="activity-name"
            value="${name}"
            maxlength="80"
            required
          />
        </div>

        <div class="assessment-field">
          <label for="activityMax${index}">Valor</label>
          <input
            id="activityMax${index}"
            class="activity-max"
            type="number"
            min="1"
            max="50"
            step="1"
            value="${max}"
            required
          />
        </div>

        <div class="assessment-field">
          <label for="activityScore${index}">Nota obtenida</label>
          <input
            id="activityScore${index}"
            class="activity-score"
            type="number"
            min="0"
            max="${max}"
            step="1"
            value="${score}"
            required
          />
        </div>

        <button
          class="button button-secondary remove-activity"
          type="button"
          aria-label="Quitar actividad"
        >
          Quitar
        </button>
      </div>
    `;
  }).join("");

  updateAssessmentTotal();
}

function updateAssessmentTotal() {
  const maxTotal = [...document.querySelectorAll(".activity-max")]
    .reduce((sum, input) => sum + (Number(input.value) || 0), 0);

  const scoreTotal = [...document.querySelectorAll(".activity-score")]
    .reduce((sum, input) => sum + (Number(input.value) || 0), 0);

  $("#assessmentTotal").textContent =
    `Puntaje posible: ${maxTotal} / 50 · Nota del corte: ${scoreTotal} / 50`;
}

function openAssessment(studentId, subjectName, cutKey) {
  const student = state.students.find((item) => item.id === studentId);

  if (!student || !CUT_KEYS.includes(cutKey)) return;

  const cut = student.grades[subjectName]?.[cutKey];
  if (!cut) return;

  state.assessmentContext = { studentId, subjectName, cutKey };

  $("#assessmentTitle").textContent =
    `${subjectName} · Corte ${CUT_ROMAN[cutKey]}`;
  $("#assessmentSubtitle").textContent =
    `${student.name} · ${student.course}`;

  $("#assessmentHelp").textContent = isStaff()
    ? "Puedes editar actividades y puntajes. El valor máximo de todas las actividades debe sumar exactamente 50 puntos."
    : "Este es el detalle de tus actividades. Solo docentes y dirección pueden editarlo.";

  $("#addAssessmentBtn").classList.toggle("hidden", !isStaff());
  $("#saveAssessmentBtn").classList.toggle("hidden", !isStaff());
  $("#assessmentMessage").textContent = "";

  renderAssessmentRows(cut.activities, isStaff());
  assessmentModal.classList.remove("hidden");
}

function closeAssessment() {
  assessmentModal.classList.add("hidden");
  state.assessmentContext = null;
}

function collectActivities() {
  return [...document.querySelectorAll(".assessment-row")].map((row) => ({
    name: row.querySelector(".activity-name").value.trim(),
    max: Number(row.querySelector(".activity-max").value),
    score: Number(row.querySelector(".activity-score").value)
  }));
}

function saveAssessment(event) {
  event.preventDefault();

  if (!isStaff() || !state.assessmentContext) return;

  const activities = collectActivities();
  const maxTotal = activities.reduce((sum, item) => sum + item.max, 0);

  if (activities.length === 0 || activities.some((item) => !item.name)) {
    $("#assessmentMessage").textContent = "Cada actividad necesita un nombre.";
    return;
  }

  const invalidActivity = activities.some((item) =>
    !Number.isFinite(item.max)
    || !Number.isFinite(item.score)
    || item.max <= 0
    || item.score < 0
    || item.score > item.max
  );

  if (invalidActivity) {
    $("#assessmentMessage").textContent =
      "Revisa los valores. La nota obtenida debe estar entre 0 y el valor de la actividad.";
    return;
  }

  if (maxTotal !== 50) {
    $("#assessmentMessage").textContent =
      `Los valores máximos deben sumar 50. Actualmente suman ${maxTotal}.`;
    return;
  }

  const { studentId, subjectName, cutKey } = state.assessmentContext;
  const student = state.students.find((item) => item.id === studentId);

  if (!student) return;

  student.grades[subjectName][cutKey] = { activities };
  saveStudents();
  closeAssessment();
  renderApp();
}

function addActivity() {
  const activities = collectActivities();
  activities.push({ name: "", max: 0, score: 0 });
  renderAssessmentRows(activities, true);
}

function handleGradeTableClick(event) {
  const button = event.target.closest(".cut-open-button");
  if (!button) return;

  openAssessment(
    Number(button.dataset.studentId),
    button.dataset.subject,
    button.dataset.cut
  );
}

function initEvents() {
  loginForm.addEventListener("submit", login);
  $("#logoutBtn").addEventListener("click", logout);
  $("#printBtn").addEventListener("click", () => window.print());

  $("#gradesBody").addEventListener("click", handleGradeTableClick);
  $("#closeAssessmentBtn").addEventListener("click", closeAssessment);
  $("#addAssessmentBtn").addEventListener("click", addActivity);
  $("#assessmentForm").addEventListener("submit", saveAssessment);

  $("#assessmentRows").addEventListener("input", (event) => {
    if (event.target.matches(".activity-max, .activity-score")) {
      updateAssessmentTotal();
    }
  });

  $("#assessmentRows").addEventListener("click", (event) => {
    const button = event.target.closest(".remove-activity");
    if (!button) return;

    button.closest(".assessment-row").remove();
    updateAssessmentTotal();
  });

  assessmentModal.addEventListener("click", (event) => {
    if (event.target === assessmentModal) closeAssessment();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !assessmentModal.classList.contains("hidden")) {
      closeAssessment();
    }
  });

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
