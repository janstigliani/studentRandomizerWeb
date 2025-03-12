/* The `Student` class defines a blueprint for creating student objects with properties such as name,
surname, year of birth, gender, nationality, marks, and methods to calculate age and compare
students by name or age. */
class Student {

    constructor(name, surname, yob, gender, nationality, avatar = "./assets/avatar1.jpeg", marks = []) {
        this.name = name;
        this.surname = surname;
        this.yob = yob;
        this.gender = gender;
        this.nationality = nationality;
        this.marks = marks;
        this.avatar = avatar
    }

   /**
    * The function calculates the age based on the year of birth provided.
    * @returns The `getAge` function is returning the age calculated based on the year of birth (`yob`)
    * property of the object it is being called on.
    */
    getAge(){
        const current = new Date();
        const currentYear = current.getFullYear();
        const age = currentYear - this.yob;
        return age;
    }

    /**
     * The function `compareByName` compares the names of two student objects using the `localeCompare`
     * method.
     * @param student2 - The `student2` parameter is an object representing another student. It likely
     * has a `name` property that is being compared with the `name` property of the current student
     * object (`this`). The `compareByName` function compares the names of the two students using the
     * `localeCompare` method,
     * @returns The `compareByName` function is returning the result of comparing the names of the
     * current student (referred to as `this.name`) and the name of the student passed as an argument
     * (`student2.name`). The `localeCompare` method is used to compare the two names and return a
     * value indicating their relative order in the sort order.
     */
    compareByName(student2) {
        const myName = this.name;
        const yourName = student2.name;
        return myName.localeCompare(yourName);
    }

    /**
     * The function `compareByAge` compares the year of birth of the current student with another
     * student and returns the difference.
     * @param student2 - The `compareByAge` function compares the year of birth (`yob`) of the current
     * student with another student (`student2`). It calculates the age difference between the two
     * students based on their year of birth. The `student2` parameter represents the other student
     * whose age is being compared with the
     * @returns The `compareByAge` function is returning the difference between the year of birth
     * (`yob`) of the current student object (`this`) and the year of birth of the student2 object.
     */
    compareByAge(student2) {
        const myYob = this.yob;
        const yourYob = student2.yob;
        return (myYob - yourYob);
    }

}

export default Student;