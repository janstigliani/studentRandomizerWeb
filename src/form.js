import Student from "./model/student.js";
import DataService from "./services/data-service.js";
import StorageService from "./services/storage-service.js";

const dService = new DataService();
const sService = new StorageService(dService);

function saveStudent(event) {
    event.preventDefault();
    const data = new FormData(form);
    const student = new Student(data.get("name"), data.get("surname"), Number(data.get("date").slice(0,4)), data.get("gender"), data.get("nationality"));
    dService.getStudentAvatar(student);

    sService.save(student)
}

const form = document.getElementById("student-form");

form.addEventListener("submit", (event) => saveStudent(event))