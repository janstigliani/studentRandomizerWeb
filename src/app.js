import DataService from "./services/data-service.js";

const service = new DataService();

function orderByName() {
    let studentData = service.getStudentByName();
    render(studentData)
};

function shuffle() {
    let studentData = service.getShuffledStudents();
    render(studentData)
};

function orderByAge() {
    let studentData = service.getStudentByAge();
    render(studentData)
};

window.orderByAge = orderByAge;
window.orderByName = orderByName;
window.shuffle = shuffle;

function render(studentData) {
    const container = document.getElementById("students-container");
    container.innerHTML = ``;

    for (let i = 0; i < studentData.length; i += 2) {
        const externalContainer = document.createElement("div");
        externalContainer.classList.add("external-container", "father");

        for (let j = 0; j < 2; j++) {
            if (i + j >= studentData.length) break;

            const student = studentData[i + j];

            const studentContainer = document.createElement("div");
            studentContainer.classList.add("student-container", "father");

            const avatarContainer = document.createElement("div");
            avatarContainer.classList.add("avatar-container");

            const avatar = document.createElement("img");
            avatar.src = student.avatar;
            avatar.alt = student.name + " " + student.surname;
            avatar.classList.add("avatar");
            avatarContainer.appendChild(avatar);

            const informationContainer = document.createElement("div");
            informationContainer.classList.add("information-container");

            const nameContainer = createTextElement("h3", student.name + " " + student.surname);
            const countryContainer = createTextElement("span", "Nazionalità: " + student.nationality);
            const genderContainer = createTextElement("span", "Genere: " + student.gender);
            const ageContainer = createTextElement("span", "Età: " + student.getAge() + " anni");

            informationContainer.appendChild(nameContainer);
            informationContainer.appendChild(countryContainer);
            informationContainer.appendChild(genderContainer);
            informationContainer.appendChild(ageContainer);

            studentContainer.appendChild(avatarContainer);
            studentContainer.appendChild(informationContainer);

            externalContainer.appendChild(studentContainer);
        }

        container.appendChild(externalContainer);

        const divider = document.createElement("div");
        divider.classList.add("divider");
        container.appendChild(divider);
    }
}

function createTextElement(elementType, text) {
    const element = document.createElement(elementType);

    const node = document.createTextNode(text);

    element.appendChild(node);

    return element;
}