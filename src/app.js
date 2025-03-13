/**
 * The JavaScript code defines functions to order, shuffle, and render student data fetched from a
 * DataService module.
 */
import DataService from "./services/data-service.js";

const service = new DataService();

/**
 * The function `orderByName` retrieves student data by name and then renders it.
 */
function orderByName() {
    const orderedStudentPromise = service.getStudentByName();
    orderedStudentPromise.then(studentData => render(studentData));
};

function getStudents() {
    const studentPromise = service.getStudentsData();
    studentPromise.then(studentData => render(studentData));
}

/**
 * The function `shuffle` retrieves shuffled student data and renders it.
 */
async function shuffle() {
    let studentData = await service.getShuffledStudents();
    render(studentData);
};

/**
 * The function orderByAge retrieves student data by age and then renders it.
 */
function orderByAge() {
    service.getStudentByAge().then(studentData => render(studentData));
};

/* The lines `window.orderByAge = orderByAge;`, `window.orderByName = orderByName;`, and
`window.shuffle = shuffle;` are assigning the functions `orderByAge`, `orderByName`, and `shuffle`
to properties of the `window` object in the browser environment. */
window.orderByAge = orderByAge;
window.getStudents = getStudents;
window.orderByName = orderByName;
window.shuffle = shuffle
;

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

        if (i < studentData.length-2) {
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