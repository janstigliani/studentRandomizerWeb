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

    const avatarMaleImages = [
        "./assets/avatar1.jpeg",
        "./assets/avatar2.jpeg",
        "./assets/avatar3.jpeg",
        "./assets/avatar4.jpeg",
        "./assets/avatar5.jpeg",
        "./assets/avatar6.jpeg",
        "./assets/avatar7.jpeg",
        "./assets/avatar8.jpeg",
        "./assets/avatar12.jpeg",
    ]

    const avatarFemaleImages = [
        "./assets/avatar18.jpeg",
        "./assets/avatar19.jpeg",
        "./assets/avatar20.jpeg",
        "./assets/avatar6.jpeg",
        "./assets/avatar4.jpeg",
    ]

    const avatarDiversityImages = [
        "./assets/avatar14.jpeg",
        "./assets/avatar15.jpeg",
        "./assets/avatar16.jpeg",
        "./assets/avatar17.jpeg",
        "./assets/avatar2.jpeg",
        "./assets/avatar4.jpeg",
        "./assets/avatar7.jpeg",
    ]

    const avatarAgeImages = [
        "./assets/avatar1.jpeg",
        "./assets/avatar4.jpeg",
        "./assets/avatar7.jpeg",
        "./assets/avatar9.jpeg",
        "./assets/avatar10.jpeg",
        "./assets/avatar11.jpeg",
        "./assets/avatar12.jpeg",
        "./assets/avatar13.jpeg",
    ]

    for (let i = 0; i < studentData.length; i++) {

        const student = studentData[i];

        const externalContainer = document.createElement("div");
        externalContainer.classList.add("external-container");

        const randomMaleImage = avatarMaleImages[Math.floor(Math.random() * avatarMaleImages.length)];
        const randomFemaleImage = avatarFemaleImages[Math.floor(Math.random() * avatarFemaleImages.length)];
        const randomDiversityImage = avatarDiversityImages[Math.floor(Math.random() * avatarDiversityImages.length)];
        const randomAgeImage = avatarAgeImages[Math.floor(Math.random() * avatarAgeImages.length)];

        const avatarContainer = document.createElement("div");
        avatarContainer.classList.add("avatar-container");

        const avatar = document.createElement("img");
        if (student.gender === "M" && student.nationality === "Italiana" && student.getAge() > 35) {
            avatar.src = randomAgeImage;
        } else if (student.gender === "M" && student.nationality === "Italiana" || student.nationality === "Albanese") {
            avatar.src = randomMaleImage;
        } else if (student.gender === "M" && student.nationality !== "Italiana") {
            avatar.src = randomDiversityImage;
        } else if (student.gender !== "M") {
            avatar.src = randomFemaleImage;
        } else {
            avatar.src = randomMaleImage;
        }

        avatar.alt = student.name + " " + student.surname;
        avatar.classList.add("avatar");
        avatarContainer.appendChild(avatar);

        const studentContainer = document.createElement("div");
        studentContainer.classList.add("studentContainer");
        studentContainer.classList.add("mother");

        const nameContainer = createTextElement("h3", student.name + " " + student.surname);
        // const nameContainer = document.createElement("h3");
        // const nameNode = document.createTextNode(student.name + " " + student.surname);
        // nameContainer.appendChild(nameNode);

        const countryContainer = createTextElement("span", "Nazionalità: " + student.nationality);
        // const countryContainer = document.createElement("span");
        // const nationalityNode = document.createTextNode("Nazionalità: " + student.nationality);
        // countryContainer.appendChild(nationalityNode);

        const genderContainer = createTextElement("span", "Genere: " + student.gender);
        // const genderContainer = document.createElement("span");
        // const genderNode = document.createTextNode("Genere: " + student.gender);
        // genderContainer.appendChild(genderNode);

        const ageContainer = createTextElement("span", "Età: " + student.getAge() + " anni");
        // const ageContainer = document.createElement("span");
        // const ageNode = document.createTextNode("Età: " + student.getAge() + " anni");
        // ageContainer.appendChild(ageNode);

        studentContainer.appendChild(nameContainer);
        studentContainer.appendChild(countryContainer);
        studentContainer.appendChild(genderContainer);
        studentContainer.appendChild(ageContainer);

        externalContainer.appendChild(avatarContainer);
        externalContainer.appendChild(studentContainer);

        container.appendChild(externalContainer);
    }
}

function createTextElement(elementType, text) {
    const element = document.createElement(elementType);

    const node = document.createTextNode(text);

    element.appendChild(node);

    return element;
}