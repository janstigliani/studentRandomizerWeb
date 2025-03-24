class StorageService {
    constructor(service) {
        this.service = service;
    }

    save(student) {
        
        const studentsString = localStorage.getItem("students");
        const studentArray = JSON.parse(studentsString);
        studentArray.push(student);
        localStorage.setItem("students", JSON.stringify(studentArray));
        
    }

    async getStorage() {
        
        const studentsString = localStorage.getItem("students");

        if (studentsString) {
            const studentArray = JSON.parse(studentsString);
            const studentsObj = this.service.createStudentFromRawData(studentArray);
            return studentsObj;
        } else {
            const students = await this.service.getStudentsData()
            const studentArray = [...students];
            localStorage.setItem("students", JSON.stringify(studentArray));
            const studentsObj = this.service.createStudentFromRawData(studentArray);
            return studentsObj;
        }
    }

    async getShuffledStudents() {

        let students = await this.getStorage();
        const arrayOfStudents = students.slice();
        const shuffledStudents = this.shuffleArray(arrayOfStudents);
        return shuffledStudents;
    };

    shuffleArray(array) {
        const cloneArray = array.slice();
        const array1 = [];

        while(cloneArray.length > 0) {
            const randomIndex = Math.floor(Math.random()*cloneArray.length);
            const randomStudent = cloneArray[randomIndex];
            array1.push(randomStudent);
            cloneArray.splice(randomIndex, 1);
        }
        return array1;
    };

    getStudentByNameAndSurname(name, surname){
        const studentsString = localStorage.getItem("students");
        const studentArray = JSON.parse(studentsString);
        const student = studentArray.find((student) => student.name === name && student.surname === surname);
        return student;
    }

    modifyStudent(student){
        this.delete(student);
        this.save(student);
    }

    delete(student){
        const name = student.name;
        const surname = student.surname;
        const studentsString = localStorage.getItem("students");
        const studentArray = JSON.parse(studentsString);
        const studentToDeleteIndex = studentArray.indexOf((student) => student.name === name && student.surname === surname);
        studentArray.slice(studentToDeleteIndex,1);
        localStorage.setItem("students", JSON.stringify(studentArray));
    }

}

export default StorageService;