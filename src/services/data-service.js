import Student from "../model/student.js"

class DataService {
  
    constructor() {

    }

    getStudentsData() {
        const data = [
            {
                "name": "Lorenzo",
                "surname": "Puppo",
                "yob": 1995,
                "nationality": "Italiana",
                "gender": "M",
                "avatar": "./assets/avatar7.jpeg",
                "marks": [
                    8,
                    9,
                    10
                ]
            },
            {
                "name": "Jan",
                "surname": "Stigliani",
                "yob": 2000,
                "nationality": "Italiana",
                "gender": "M",
                "avatar": "./assets/avatar5.jpeg",
                "marks": [
                    7,
                    7,
                    8
                ]
            },
            {
                "name": "Giovanni",
                "surname": "Sussarellu",
                "yob": 1981,
                "nationality": "Italiana",
                "gender": "M",
                "avatar": "./assets/avatar12.jpeg",
                "marks": [
                    7,
                    6,
                    8
                ]
            },
            {
                "name": "Sara",
                "surname": "De Prà",
                "yob": 1989,
                "nationality": "Italiana",
                "gender": "Fluid",
                "avatar": "./assets/avatar19.jpeg",
                "marks": [
                    9,
                    6,
                    8
                ]
            },
            {
                "name": "Jeremias",
                "surname": "Cedeno",
                "yob": 2003,
                "nationality": "Ecuadoriano",
                "gender": "M",
                "avatar": "./assets/avatar14.jpeg",
                "marks": [
                    6,
                    10,
                    7
                ]
            },
            {
                "name": "Laura",
                "surname": "Mazza",
                "yob": 1984,
                "nationality": "Italiana",
                "gender": "F",
                "avatar": "./assets/avatar20.jpeg",
                "marks": [
                    4,
                    2,
                    6
                ]
            },
            {
                "name": "Eusebio",
                "surname": "Veizi",
                "yob": 1993,
                "nationality": "Albanese",
                "gender": "M",
                "avatar": "./assets/avatar1.jpeg",
                "marks": [
                    5,
                    7,
                    6
                ]
            },
            {
                "name": "Hugo",
                "surname": "Martinez",
                "yob": 1994,
                "nationality": "Salvadoregna",
                "gender": "F",
                "avatar": "./assets/avatar16.jpeg",
                "marks": [
                    10,
                    10,
                    8
                ]
            }
        ];

        const students = this.createStudentFromRawData(data);

        students.forEach(student => {
            this.getStudentAvatar(student);
        });

        return students;

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

    createStudentFromRawData(data) {
        const students = [];
        for (const studentOBJ of data) {
            const newStudent = new Student(studentOBJ.name, studentOBJ.surname, studentOBJ.yob, studentOBJ.gender, studentOBJ.nationality, studentOBJ.avatar);
            students.push(newStudent);
        }
        return students;
    };

    getStudentByName() {
        const students = this.getStudentsData();
        const arrayOfStudents = students.slice();
        arrayOfStudents.sort((s1,s2) => s1.compareByName(s2));
        return arrayOfStudents;
    };

    getStudentByAge() {
        const students = this.getStudentsData();
        const arrayOfStudents = students.slice();
        arrayOfStudents.sort((s1,s2) => s1.compareByAge(s2));
        return arrayOfStudents;
    };

    getShuffledStudents() {
        const students = this.getStudentsData();
        const arrayOfStudents = students.slice();
        const shuffledStudents = this.shuffleArray(arrayOfStudents);
        return shuffledStudents;
    };

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
        ];

        const avatarFemaleImages = [
            "./assets/avatar18.jpeg",
            "./assets/avatar19.jpeg",
            "./assets/avatar20.jpeg",
            "./assets/avatar6.jpeg",
            "./assets/avatar4.jpeg",
        ];

        const avatarDiversityImages = [
            "./assets/avatar14.jpeg",
            "./assets/avatar15.jpeg",
            "./assets/avatar16.jpeg",
            "./assets/avatar17.jpeg",
            "./assets/avatar2.jpeg",
            "./assets/avatar4.jpeg",
            "./assets/avatar7.jpeg",
        ];

        const avatarAgeImages = [
            "./assets/avatar1.jpeg",
            "./assets/avatar4.jpeg",
            "./assets/avatar7.jpeg",
            "./assets/avatar9.jpeg",
            "./assets/avatar10.jpeg",
            "./assets/avatar11.jpeg",
            "./assets/avatar12.jpeg",
            "./assets/avatar13.jpeg",
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