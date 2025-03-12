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
                "marks": [
                    10,
                    10,
                    8
                ]
            }
        ];

        const students = this.createStudentFromRawData(data);

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
    // }

    createStudentFromRawData(data) {
        const students = [];
        for (const studentOBJ of data) {
            const newStudent = new Student(studentOBJ.name, studentOBJ.surname, studentOBJ.yob, studentOBJ.gender, studentOBJ.nationality);
            students.push(newStudent);
        }
        return students;
    }

    getStudentByName() {
        const students = this.getStudentsData();
        const arrayOfStudents = students.slice();
        arrayOfStudents.sort((s1,s2) => s1.compareByName(s2));
        return arrayOfStudents;
    }

    getStudentByAge() {
        const students = this.getStudentsData();
        const arrayOfStudents = students.slice();
        arrayOfStudents.sort((s1,s2) => s1.compareByAge(s2));
        return arrayOfStudents;
    }

    getShuffledStudents() {
        const students = this.getStudentsData();
        const arrayOfStudents = students.slice();
        const shuffledStudents = this.shuffleArray(arrayOfStudents);
        return shuffledStudents;
    }

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
    }
  
}

export default DataService;