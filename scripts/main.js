import { dataCourses } from './dataCourses.js';
import { student } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
//Variables de información del estudiante
var code = document.getElementById("codigo");
var id = document.getElementById('cedula');
var age = document.getElementById('edad');
var adress = document.getElementById('direccion');
var phone = document.getElementById('telefono');
//Constantes para la filtración por créditos
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputMinBox = document.getElementById("min-box");
var inputMaxBox = document.getElementById("max-box");
renderCoursesInTable(dataCourses);
btnfilterByName.onclick = function () { return applyFilterByName(); };
//Invoca la función para poner la infromación del estudiante
renderStudentInfo(student);
//Invoca la filtración por créditos
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
//Función que coloca la información correspondiente del estudiante
function renderStudentInfo(st) {
    code.innerHTML = "" + st.codigo;
    id.innerHTML = "" + st.cedula;
    age.innerHTML = "" + st.edad;
    adress.innerHTML = "" + st.direccion;
    phone.innerHTML = "" + st.telefono;
}
//Funciones para la filtración por créditos
function applyFilterByCredits() {
    var minS = inputMinBox.value;
    var maxS = inputMaxBox.value;
    if (minS == '' || maxS == '') {
        clearCoursesInTable();
        renderCoursesInTable(dataCourses);
    }
    else {
        var min = Number(minS);
        var max = Number(maxS);
        clearCoursesInTable();
        var filtered = searchCoursesByRange(min, max);
        renderCoursesInTable(filtered);
    }
}
function searchCoursesByRange(min, max) {
    var resp = [];
    dataCourses.forEach(function (course) {
        if (course.credits >= min && course.credits <= max) {
            resp.push(course);
        }
    });
    return resp;
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
