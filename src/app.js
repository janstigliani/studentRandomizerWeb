/**
 * The JavaScript code defines functions to order, shuffle, and render student data fetched from a
 * DataService module.
 */
import DataService from "./services/data-service.js";
import StorageService from "./services/storage-service.js";

const dService = new DataService();
const sService = new StorageService(dService);

/**
 * The function `orderByName` retrieves student data by name and then renders it.
 */
function orderByName() {
    const orderedStudentPromise = dService.getStudentByName();
    orderedStudentPromise.then(studentData => render(studentData));
};

function getStudents() {
    const studentPromise = dService.getStudentsData();
    studentPromise.then(studentData => render(studentData));
}

/**
 * The function `shuffle` retrieves shuffled student data and renders it.
 */
async function shuffle() {
    const studentData = await sService.getShuffledStudents();
    let copyArray = [...studentData];
    const blockedCouples = sService.getCouples();

    for (const student of blockedCouples) {
        const name = student.name;
        const surname = student.surname
        for (const studentFromAll of copyArray) {
            if (studentFromAll.name === name && studentFromAll.surname === surname) {
                const studentToDeleteIndex = copyArray.indexOf(studentFromAll);
                copyArray.splice(studentToDeleteIndex,1);
            }
        }
         copyArray.unshift(student)
        
    }//check between array: couple students eliminated from student data, add couple students as first two parameters
    
    render(copyArray);
};

/**
 * The function orderByAge retrieves student data by age and then renders it.
 */
function orderByAge() {
    dService.getStudentByAge().then(studentData => render(studentData));
};

/* The lines `window.orderByAge = orderByAge;`, `window.orderByName = orderByName;`, and
`window.shuffle = shuffle;` are assigning the functions `orderByAge`, `orderByName`, and `shuffle`
to properties of the `window` object in the browser environment. */
window.orderByAge = orderByAge;
window.getStudents = getStudents;
window.orderByName = orderByName;
window.shuffle = shuffle;

/**
 * The `render` function displays student data in a formatted layout on a web page, grouping students
 * in pairs and including their avatar, name, nationality, gender, and age.
 * @param studentData - An array of student objects, where each student object contains properties like
 * `name`, `surname`, `avatar`, `nationality`, `gender`, and a method `getAge()` that returns the age
 * of the student.
 */
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

            const settingsContainer = document.createElement("div");
            avatarContainer.classList.add("settings-container");

            const link = document.createElement("a")
            link.href = "./edit-student.html?name=" + student.name + "&surname=" + student.surname;
            const settBtn = document.createElement("button");
            settBtn.classList.add("settings-button");
            const btnNode = document.createTextNode("Edit");
            // settBtn.addEventListener("clik", (event) => this.editStudent(event, student))

            settBtn.appendChild(btnNode);
            link.appendChild(settBtn);
            settingsContainer.appendChild(link);

            dService.getStudentAvatar(student);

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

            studentContainer.appendChild(settingsContainer);
            studentContainer.appendChild(avatarContainer);
            studentContainer.appendChild(informationContainer);

            externalContainer.appendChild(studentContainer);
        }

        container.appendChild(externalContainer);

        const blockBtn = document.createElement("button");
        blockBtn.innerText=`Blocca Coppia`
        // const blockNode1 = document.createTextNode(`Blocca Coppia`);
        // blockBtn.appendChild(blockNode1);
        // const blockNode2 = document.createTextNode("Scoppia Coppia");
        blockBtn.addEventListener("click", (event) => blockCuple(event, studentData[i], studentData[i+1], blockBtn));
        container.appendChild(blockBtn);

        if (i < studentData.length - 2) {
            const divider = document.createElement("div");
            divider.classList.add("divider");
            container.appendChild(divider);
        }
    }
}

/**
 * The function `createTextElement` creates a new HTML element of a specified type with the given text
 * content.
 * @param elementType - The `elementType` parameter in the `createTextElement` function is a string
 * that specifies the type of HTML element you want to create. For example, it could be "p" for a
 * paragraph element, "h1" for a heading element, "span" for a span element, etc
 * @param text - The `text` parameter in the `createTextElement` function is the text content that you
 * want to set for the newly created text element. This text will be displayed within the element when
 * it is added to the DOM.
 * @returns The function `createTextElement` returns a newly created HTML element with the specified
 * type (e.g., 'div', 'p', 'span') containing the provided text content.
 */
function createTextElement(elementType, text) {
    const element = document.createElement(elementType);

    const node = document.createTextNode(text);

    element.appendChild(node);

    return element;
}

function blockCuple(event, student1, student2, btn) {
    event.preventDefault();
    if (student1 && student2) {
        sService.getCoupleState(student1, student2);
        if (btn.innerText === `Blocca Coppia`) {
            btn.innerText = "Scoppia Coppia";
        } else {
            btn.innerText = `Blocca Coppia`;
        }
    } else {
        const dialog = document.getElementById("dialog");
        dialog.innerHTML = "";
        const btn = document.createElement("button");
        btn.classList.add("dialog-btn")
        dialog.appendChild(document.createTextNode("non è una coppia!"));
        btn.appendChild(document.createTextNode("Ok"));
        dialog.appendChild(btn);
        btn.addEventListener("click", () => dialog.close());

        dialog.showModal();
    }
}

async function start() {
    const students = await sService.getStorage();
    render(students);
}

start();

//aggiungere queste funzionalità al randomizer:

// 1) ogni volta che il sito viene lanciato, controlla se c'è un array di studenti nel local storage.
//     -se esite carica quell'array.
//     -altrimenti scrive il contenuto del json sul local storage e poi carica quello.
// 2) viene aggiunta la funzionalità "aggiungi studente",
// quando premo il tasto aggiungi studente viene aperta una nuova pagina con una form
// che mi consente di aggiungere uno studente e salvarlo nell'array contenuto nel local storage.
// 3) viene aggiunta la funzione edita studente che aggiunge un tasto ad ogni card studente
// se premo il tasto edit si apre una nuova form precompilata con i dati dello studente
// una volta che salvo lo studente editato, viene sovrascritto lo studente precedente.
// nella form di edit studente c'è anche l'opzione cancella che rimuove lo studente.
// 4) aggiungi la funziona blocca coppia, che permette di evitare che una coppia venga scoppiata.