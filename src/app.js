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

for (let i = 0; i < studentData.length; i++) {

    const student = studentData[i];

    const studentContainer = document.createElement("div");

    studentContainer.classList.add("studentContainer");

    studentContainer.classList.add("mother");
    

    const nameContainer = document.createElement(`h3`);

    // nameContainer.classList.add("name-container");

    const nameNode = document.createTextNode(student.name + " " + student.surname);

    nameContainer.appendChild(nameNode);



    const countryContainer = document.createElement("span");
    
    const nationalityNode = document.createTextNode("nazionalità: "+ student.nationality);

    countryContainer.appendChild(nationalityNode);



    const genderContainer = document.createElement("span");
    
    const genderNode = document.createTextNode("genere: "+ student.gender);

    genderContainer.appendChild(genderNode);



    const ageContainer = document.createElement("span");

    const current = new Date();

    const currentYear = current.getFullYear();

    const age = currentYear - student.yob;
    
    const ageode = document.createTextNode("età: "+ age + " anni");

    ageContainer.appendChild(ageode);



    studentContainer.appendChild(nameContainer);

    studentContainer.appendChild(countryContainer);

    studentContainer.appendChild(genderContainer);

    studentContainer.appendChild(ageContainer);

    container.appendChild(studentContainer);
}

///TO DO:
//- aggiungere genere                                           DONE
//- aggiungere eta'                                             DONE
//- allineare le schede degli studenti a due a due              DONE
//- rendere il sito molto bello per il docente
//- ordinare gli studenti per ordine alfabetico di nome         DONE