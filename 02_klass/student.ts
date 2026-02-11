class Student {
    constructor(private mathGrade: number, private englishGrade: number) {}

    show(): void {
        console.log(`Math Grade: ${this.mathGrade}, English Grade: ${this.englishGrade}`);
    }

    calculateBothAverage(): number {
         return (this.mathGrade + this.englishGrade) / 2;
    }

    add(other: Student): Student {
        return new Student(this.mathGrade + other.mathGrade, this.englishGrade + other.englishGrade);
    }

    averageMathGrade(count: number): number {
        return this.mathGrade / count;
    }

    averageEnglishGrade(count: number): number {
        return this.englishGrade / count;
    }

    improveMathGrade(): void {
        this.mathGrade += 5;
    }
}

let student1: Student = new Student(85, 92);
let student2: Student = new Student(70, 90);

// Array of students
let students: Student[] = [
    new Student(85, 92),
    new Student(70, 90),
    new Student(78, 88),
    new Student(90, 95)
];

// Combine all students into one total
let classTotal = students[0];

for (let i = 1; i < students.length; i++) {
    classTotal = classTotal.add(students[i]);
}

// Number of students in the class
const n = students.length;
console.log("Class average grade: ", classTotal.averageMathGrade(n), classTotal.averageEnglishGrade(n));

student1.show();
console.log("Student's average grade:", student1.calculateBothAverage());

// Adding two students' grades together
let combinedStudent: Student = student1.add(student2);

combinedStudent.show();

console.log("Average of both students: ", combinedStudent.averageMathGrade(2), combinedStudent.averageEnglishGrade(2));

console.log("*****************************");
console.log("Before improving math grade:");
student1.show();

console.log("Improving math grade...");
student1.improveMathGrade();
student1.show();