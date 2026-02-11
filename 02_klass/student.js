var Student = /** @class */ (function () {
    function Student(mathGrade, englishGrade) {
        this.mathGrade = mathGrade;
        this.englishGrade = englishGrade;
    }
    Student.prototype.show = function () {
        console.log("Math Grade: ".concat(this.mathGrade, ", English Grade: ").concat(this.englishGrade));
    };
    Student.prototype.calculateBothAverage = function () {
        return (this.mathGrade + this.englishGrade) / 2;
    };
    Student.prototype.add = function (other) {
        return new Student(this.mathGrade + other.mathGrade, this.englishGrade + other.englishGrade);
    };
    Student.prototype.averageMathGrade = function (count) {
        return this.mathGrade / count;
    };
    Student.prototype.averageEnglishGrade = function (count) {
        return this.englishGrade / count;
    };
    Student.prototype.improveMathGrade = function () {
        this.mathGrade += 5;
    };
    return Student;
}());
var student1 = new Student(85, 92);
var student2 = new Student(70, 90);
// Array of students
var students = [
    new Student(85, 92),
    new Student(70, 90),
    new Student(78, 88),
    new Student(90, 95)
];
// Combine all students into one total
var classTotal = students[0];
for (var i = 1; i < students.length; i++) {
    classTotal = classTotal.add(students[i]);
}
// Number of students in the class
var n = students.length;
console.log("Class average grade: ", classTotal.averageMathGrade(n), classTotal.averageEnglishGrade(n));
student1.show();
console.log("Student's average grade:", student1.calculateBothAverage());
// Adding two students' grades together
var combinedStudent = student1.add(student2);
combinedStudent.show();
console.log("Average of both students: ", combinedStudent.averageMathGrade(2), combinedStudent.averageEnglishGrade(2));
console.log("*****************************");
console.log("Before improving math grade:");
student1.show();
console.log("Improving math grade...");
student1.improveMathGrade();
student1.show();
