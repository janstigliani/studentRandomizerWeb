class Student {

    constructor(name, surname, yob, gender, nationality, marks = []) {
        this.name = name;
        this.surname = surname;
        this.yob = yob;
        this.gender = gender;
        this.nationality = nationality;
        this.marks = marks;
    }

    getAge(){
        const current = new Date();
        const currentYear = current.getFullYear();
        const age = currentYear - this.yob;
        return age;
    }

    compareByName(student2) {
        const myName = this.name;
        const yourName = student2.name;
        return myName.localeCompare(yourName);
    }

    compareByAge(student2) {
        const myYob = this.yob;
        const yourYob = student2.yob;
        return (myYob - yourYob);
    }

}

export default Student;