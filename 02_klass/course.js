var Course = /** @class */ (function () {
    function Course(credits, name) {
        this.credits = credits;
        this.name = name;
    }
    // Method including the formula to calculate the GPA
    // Formula is : Grade x Credits
    Course.prototype.gpaContribution = function (grade) {
        return grade * this.credits;
    };
    Course.prototype.show = function () {
        console.log("Course Name: ".concat(this.name, ", Credits: ").concat(this.credits));
    };
    Course.prototype.getCredits = function () {
        return this.credits;
    };
    return Course;
}());
// Here defining the courses and credits
var math = new Course(4, "Mathematics");
var english = new Course(6, "English");
var programming = new Course(5, "Programming");
// 
var mathGrade = 4.0;
var englishGrade = 3.3;
var programmingGrade = 3.7;
var totalPoints = 0;
totalPoints += math.gpaContribution(mathGrade);
totalPoints += english.gpaContribution(englishGrade);
totalPoints += programming.gpaContribution(programmingGrade);
var totalCredits = math.getCredits() + english.getCredits() + programming.getCredits();
var gpa = totalPoints / totalCredits;
console.log("Total GPA: ", gpa.toPrecision(2));
// Create an array to pass grades of several students 
var gradeStudents = [
    { name: "Alice", mathGrade: 4.0, englishGrade: 3.3, programmingGrade: 3.7 },
    { name: "Bob", mathGrade: 3.0, englishGrade: 3.3, programmingGrade: 2.7 },
    { name: "Charlie", mathGrade: 3.3, englishGrade: 3.8, programmingGrade: 3.2 }
];
gradeStudents.forEach(function (student) {
    var totalPoints = 0;
    totalPoints += math.gpaContribution(student.mathGrade);
    totalPoints += english.gpaContribution(student.englishGrade);
    totalPoints += programming.gpaContribution(student.programmingGrade);
    var gpa = totalPoints / totalCredits;
    console.log("".concat(student.name, "'s GPA: ").concat(gpa.toPrecision(2)));
});
