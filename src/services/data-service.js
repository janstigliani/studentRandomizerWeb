import Student from "../model/student.js"

/* The `DataService` class in JavaScript handles student data manipulation and retrieval, including
sorting students by name and age, shuffling student data, and assigning avatar images based on
gender, nationality, and age. */
class DataService {
  
    constructor() {

    };

    // useResponse(response) {
    //     const jsonPromise = response.json();
    //     jsonPromise.then((json) => console.log(json));
    //     jsonPromise.catch((error) => console.log(error));
    // };

    // handleError(response) {
    //     console.log(`brutta storia`, response)
    // };

    async getStudentsData() {

        // const responsePromise = fetch(`/assets/students.json`);

        // responsePromise.then(this.useResponse);

        // responsePromise.catch(this.handleError);

        const devUrl = `/assets/students.json`
        const prodUrl = `/studentRandomizerWeb/assets/students.json`

        const studentPromise = fetch(prodUrl).then((response) => response.json())
                                                             .then((jsonData) => {

                                                                const students = this.createStudentFromRawData(jsonData);
                                                                students.forEach(student => {
                                                                    this.getStudentAvatar(student);
                                                                });
                                                        
                                                                return students;
                                      
                                                             })
                                                             .catch((error) => console.log(error));                                                     

                                                             return studentPromise;

        // const richData = this.addAge(data)
        // return richData;
    };

    // addAge(studentArray) {
    //     const newData = studentArray.map(student => {
    //     const current = new Date();
    //     const currentYear = current.getFullYear();
    //     const age = currentYear - student.yob;
    //     student.age = age;
    //     return student;
    //     })

    //     return newData;
    // };

   /* The `createStudentFromRawData(data)` method in the `DataService` class is a function that takes
   an array of raw student data as input and creates an array of `Student` objects based on that
   data. */
    createStudentFromRawData(data) {
        const students = [];
        for (const studentOBJ of data) {
            const newStudent = new Student(studentOBJ.name, studentOBJ.surname, studentOBJ.yob, studentOBJ.gender, studentOBJ.nationality, studentOBJ.avatar);
            students.push(newStudent);
        }
        return students;
    };

  /* The `getStudentByName()` method in the `DataService` class is a function that retrieves student
  data, creates a copy of the array of students, sorts the array of students by name using the
  `compareByName()` method defined in the `Student` class, and then returns the sorted array of
  students based on their names. */
    getStudentByName() {
        return this.getStudentsData().then(students => {
        const arrayOfStudents = students.slice();
        arrayOfStudents.sort((s1,s2) => s1.compareByName(s2));
        return arrayOfStudents
    })
    };

  /* The `getStudentByAge()` method in the `DataService` class is a function that retrieves student
  data, creates a copy of the array of students, sorts the array of students by age using the
  `compareByAge()` method defined in the `Student` class, and then returns the sorted array of
  students based on their ages. */
    getStudentByAge() {
        return this.getStudentsData().then(students => {
        const arrayOfStudents = students.slice();
        arrayOfStudents.sort((s1,s2) => s1.compareByAge(s2));
        return arrayOfStudents;
    })
    };

  /* The `getShuffledStudents()` method in the `DataService` class is a function that performs the
  following steps: */
    async getShuffledStudents() {

        let students = await this.getStudentsData()
        const arrayOfStudents = students.slice();
        const shuffledStudents = this.shuffleArray(arrayOfStudents);
        return shuffledStudents;
    };

    /* The `shuffleArray(array)` function is a method in the `DataService` class that shuffles the
    elements of an array in a random order. Here's how it works: */
    shuffleArray(array) {
        // const newArray = array.slice();
        // newArray.sort(() => Math.random()-0.5);
        // return newArray;

        const cloneArray = array.slice();
        const array1 = [];

        while(cloneArray.length > 0) {
            const randomIndex = Math.floor(Math.random()*cloneArray.length);
            const randomStudent = cloneArray[randomIndex];
            array1.push(randomStudent);
            cloneArray.splice(randomIndex, 1);
            // const randomStudent = cloneArray.splice(randomIndex,1);
            // array1.push(randomStudent);
        }
        return array1;
    };

   /**
    * The function `getStudentAvatar` assigns a random avatar image based on the student's gender,
    * nationality, and age.
    * @param student - The `getStudentAvatar` function takes a `student` object as a parameter and
    * assigns an avatar image URL to the `student.avatar` property based on the student's gender,
    * nationality, and age.
    */
    getStudentAvatar(student) {
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
            "./assets/avatar22.jpg",
            "./assets/avatar23.jpg",
            "./assets/avatar24.jpg"
        ];

        const avatarFemaleImages = [
            "./assets/avatar4.jpeg",
            "./assets/avatar6.jpeg",
            "./assets/avatar18.jpeg",
            "./assets/avatar19.jpeg",
            "./assets/avatar20.jpeg"
        ];

        const avatarDiversityImages = [
            "./assets/avatar2.jpeg",
            "./assets/avatar4.jpeg",
            "./assets/avatar7.jpeg",
            "./assets/avatar14.jpeg",
            "./assets/avatar15.jpeg",
            "./assets/avatar16.jpeg",
            "./assets/avatar17.jpeg",
            "./assets/avatar21.jpg"
        ];

        const avatarAgeImages = [
            "./assets/avatar1.jpeg",
            "./assets/avatar4.jpeg",
            "./assets/avatar7.jpeg",
            "./assets/avatar9.jpeg",
            "./assets/avatar10.jpeg",
            "./assets/avatar11.jpeg",
            "./assets/avatar12.jpeg",
            "./assets/avatar13.jpeg"
        ];

        if (student.gender === "M" && student.nationality === "Italiana" && student.getAge() > 35) {
            student.avatar = avatarAgeImages[Math.floor(Math.random() * avatarAgeImages.length)];
        } else if (student.gender === "M" && (student.nationality === "Italiana" || student.nationality === "Albanese")) {
            student.avatar = avatarMaleImages[Math.floor(Math.random() * avatarMaleImages.length)];
        } else if (student.gender === "M" && student.nationality !== "Italiana") {
            student.avatar = avatarDiversityImages[Math.floor(Math.random() * avatarDiversityImages.length)];
        } else if (student.gender !== "M") {
            student.avatar = avatarFemaleImages[Math.floor(Math.random() * avatarFemaleImages.length)];
        } else {
            student.avatar = avatarMaleImages[Math.floor(Math.random() * avatarMaleImages.length)];
        }
    }
}

export default DataService;