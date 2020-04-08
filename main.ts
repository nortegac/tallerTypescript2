import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { student } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

//Variables de información del estudiante
let code: HTMLElement = document.getElementById("codigo")!;
let id: HTMLElement = document.getElementById('cedula')!;
let age: HTMLElement = document.getElementById('edad')!;
let adress: HTMLElement = document.getElementById('direccion')!;
let phone: HTMLElement = document.getElementById('telefono')!;

//Constantes para la filtración por créditos
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputMinBox: HTMLInputElement = <HTMLInputElement> document.getElementById("min-box")!;
const inputMaxBox: HTMLInputElement = <HTMLInputElement> document.getElementById("max-box")!;

renderCoursesInTable(dataCourses);
btnfilterByName.onclick = () => applyFilterByName();

//Invoca la función para poner la infromación del estudiante
renderStudentInfo(student);

//Invoca la filtración por créditos
btnfilterByCredits.onclick = () => applyFilterByCredits();


totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

//Función que coloca la información correspondiente del estudiante
function renderStudentInfo(st: Student): void{
  code.innerHTML = `${st.codigo}`;
  id.innerHTML = `${st.cedula}`;
  age.innerHTML = `${st.edad}`;
  adress.innerHTML = `${st.direccion}`;
  phone.innerHTML = `${st.telefono}`;
} 

//Funciones para la filtración por créditos
function applyFilterByCredits(){
  let minS = inputMinBox.value;
  let maxS = inputMaxBox.value;
  if (minS == '' || maxS == ''){
    clearCoursesInTable();
    renderCoursesInTable(dataCourses);
  }
  else{
    let min: number = Number(minS);
    let max: number = Number(maxS);

    clearCoursesInTable();
    let filtered: Course[] = searchCoursesByRange(min,max);
    
    renderCoursesInTable(filtered);
  }

}

function searchCoursesByRange(min: number, max: number): Course[]{
  let resp: Course[] = [];
  dataCourses.forEach((course) => {
    if (course.credits >= min && course.credits <= max){
      resp.push(course);
    }
  });
  return resp;
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}