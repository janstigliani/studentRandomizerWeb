import DataService from "./services/data-service.js";

const service = new DataService();

let studentData = service.getStudentsData();

const container = document.getElementById("students-container");

studentData = studentData.sort((a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
});

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



const randomMaleImage = avatarMaleImages[Math.floor(Math.random() * avatarMaleImages.length)];
const randomFemaleImage = avatarFemaleImages[Math.floor(Math.random() * avatarFemaleImages.length)];
const randomDiversityImage = avatarDiversityImages[Math.floor(Math.random() * avatarDiversityImages.length)];
const randomAgeImage = avatarAgeImages[Math.floor(Math.random() * avatarAgeImages.length)];


for (let i = 0; i < studentData.length; i++) {

    const student = studentData[i];

    // Create the external container
    const externalContainer = document.createElement("div");
    externalContainer.classList.add("external-container");

    const randomMaleImage = avatarMaleImages[Math.floor(Math.random() * avatarMaleImages.length)];
    const randomFemaleImage = avatarFemaleImages[Math.floor(Math.random() * avatarFemaleImages.length)];
    const randomDiversityImage = avatarDiversityImages[Math.floor(Math.random() * avatarDiversityImages.length)];
    const randomAgeImage = avatarAgeImages[Math.floor(Math.random() * avatarAgeImages.length)];

    // Create the avatar container
    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("avatar-container");

    // Add the image to the avatar container
    const avatar = document.createElement("img");
    if (student.gender==="M" && student.nationality==="Italiana" && student.age>35) {
        avatar.src = randomAgeImage;
    } else if (student.gender==="M" && student.nationality==="Italiana" || student.nationality==="Albanese") {
        avatar.src = randomMaleImage;
    } else if (student.gender==="M" && student.nationality!=="Italiana") {
        avatar.src = randomDiversityImage;
    } else if (student.gender!=="M") {
        avatar.src = randomFemaleImage;
    } else {
        avatar.src = randomMaleImage;
    }
    
    avatar.alt = student.name + " " + student.surname;
    avatar.classList.add("avatar");
    avatarContainer.appendChild(avatar);

    // Create the student container
    const studentContainer = document.createElement("div");
    studentContainer.classList.add("studentContainer");
    studentContainer.classList.add("mother");

    const nameContainer = document.createElement("h3");
    const nameNode = document.createTextNode(student.name + " " + student.surname);
    nameContainer.appendChild(nameNode);

    const countryContainer = document.createElement("span");
    const nationalityNode = document.createTextNode("Nazionalità: " + student.nationality);
    countryContainer.appendChild(nationalityNode);

    const genderContainer = document.createElement("span");
    const genderNode = document.createTextNode("Genere: " + student.gender);
    genderContainer.appendChild(genderNode);

    const ageContainer = document.createElement("span");
    const current = new Date();
    const currentYear = current.getFullYear();
    const age = currentYear - student.yob;
    const ageNode = document.createTextNode("Età: " + age + " anni");
    ageContainer.appendChild(ageNode);

    studentContainer.appendChild(nameContainer);
    studentContainer.appendChild(countryContainer);
    studentContainer.appendChild(genderContainer);
    studentContainer.appendChild(ageContainer);

    // Append the avatar container and student container to the external container
    externalContainer.appendChild(avatarContainer);
    externalContainer.appendChild(studentContainer);

    // Append the external container to the main container
    container.appendChild(externalContainer);
}

///TO DO:
//- aggiungere genere                                           DONE
//- aggiungere eta'                                             DONE
//- allineare le schede degli studenti a due a due              DONE
//- rendere il sito molto bello per il docente
//- ordinare gli studenti per ordine alfabetico di nome         DONE