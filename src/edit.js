import DataService from "./services/data-service.js";
import StorageService from "./services/storage-service.js";
import Student from "./model/student.js";

const dService = new DataService();
const sService = new StorageService(dService);

const param = new URLSearchParams(window.location.search)
const name = param.get("name");
const surname = param.get("surname");

const student = sService.getStudentByNameAndSurname(name, surname);

function deleteStudent(event, student) {
    event.preventDefault();
    sService.delete(student);
    console.log("utente eliminato")
}

function modify(event, student) {
    event.preventDefault();
    const form = event.target;
    console.log(form);
    const data = new FormData(form);
    const studentobj = new Student(data.get("name"), data.get("surname"), Number(data.get("date")), data.get("gender"), data.get("nationality"));
    sService.modifyStudent(studentobj);
    console.log("utente modificato")
}

window.deleteStudent = deleteStudent;
window.modify = modify;

function render(student) {
    const root = document.getElementById("edit-student-form");

    let gender2 = ""
    let gender3 = ""
    let string1 = ""
    let string2 = ""
    let string3 = ""

    if (student.gender === "M") {
        string1 = "Maschio"
        gender2 = "F"
        string2 = "Femmina"
        gender3 = "O"
        string3 = "Other"
    } else if (student.gender === "F") {
        string1 = "Femmina"
        gender2 = "M"
        string2 = "Maschio"
        gender3 = "O"
        string3 = "Other"
    } else {
        string1 = "Other"
        gender2 = "M"
        string2 = "Maschio"
        gender3 = "F"
        string3 = "Femmina"
    }

    root.innerHTML = `<label for="id-name">Nome</label>
    <input type="text" name="name" id="id-name" value="${student.name}">

    <label for="id-surname">Cognome</label>
    <input type="text" name="surname" id="id-surname" value="${student.surname}">

    <label for="id-date">Anno di nascita</label>
    <input type="text" name="date" id="id-date" value="${student.yob}">

    <label for="id-nationality">Nazionalità</label>
    <input type="text" name="nationality" id="id-nationality" value="${student.nationality}"></input>

    <select name="gender" id="id-gender">
                        <option value="${student.gender}">${string1}</option>
                        <option value="${gender2}">${string2}</option>
                        <option value="${gender3}">${string3}</option>
                    </select>
    
    `
    // <button onclick="modify()" type="submit">Salva Modifiche</button>
    // <button onclick="deleteStudent()"> Elimina Utente</button>

    const deleteBtn = document.createElement("button");
    const modifyBtn = document.createElement("button");
    // deleteBtn.type = "submit";
    modifyBtn.type = "submit";
    deleteBtn.addEventListener("click", (event) => deleteStudent(event, student));
    modifyBtn.addEventListener("submit", (event) => modify(event, student));

    const delNode = document.createTextNode("Elimina Utente");
    const modNode = document.createTextNode("Salva Modifiche");

    deleteBtn.appendChild(delNode);
    modifyBtn.appendChild(modNode);

    root.appendChild(modifyBtn);
    root.appendChild(deleteBtn);

}

function start(student){
    if(student){
        render(student);
    }
}

start(student);
