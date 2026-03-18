// Defines a single course with a letter grade and number of credits
var Course = /** @class */ (function () {
    function Course(grade, credits) {
        // Allowed grade values
        var validGrades = ["A", "B", "C", "D", "E", "F"];
        // Validate that the grade is one of the allowed values (if it's not, throw an error)
        if (validGrades.indexOf(grade.toUpperCase()) === -1) {
            throw new Error("Invalid grade");
        }
        // Credits must be a positive number
        if (credits <= 0) {
            throw new Error("Credits must be greater than 0.");
        }
        this.grade = grade;
        this.credits = credits;
        this.color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    }
    // Converts the letter grade to a numeric value
    Course.prototype.getNumericGrade = function () {
        var map = {
            A: 5,
            B: 4,
            C: 3,
            D: 2,
            E: 1,
            F: 0,
        };
        return map[this.grade.toUpperCase()];
    };
    return Course;
}());
var GradeBook = /** @class */ (function () {
    function GradeBook() {
        this.courses = [];
    }
    // Adds a new course to the grade book
    GradeBook.prototype.addCourse = function (grade, credits) {
        this.courses.push(new Course(grade, credits));
    };
    // Calculates the weighted average of all courses in the grade book
    GradeBook.prototype.getWeightedAverage = function () {
        var weightedSum = 0;
        var totalCredits = 0;
        // Iterate over all courses and sum up the weighted sum and total credits
        for (var _i = 0, _a = this.courses; _i < _a.length; _i++) {
            var c = _a[_i];
            weightedSum += c.getNumericGrade() * c.credits;
            totalCredits += c.credits;
        }
        // Return 0 if there are no courses to avoid division by zero
        if (totalCredits === 0)
            return 0;
        return weightedSum / totalCredits;
    };
    return GradeBook;
}());
// Calculates the weighted average of two courses
function weightedAverageTwo(grade1, credits1, grade2, credits2) {
    // Credits must be a positive number
    if (credits1 <= 0 || credits2 <= 0) {
        throw new Error("Credits must be greater than 0.");
    }
    // Convert the letter grades to numeric values
    var map = {
        A: 5,
        B: 4,
        C: 3,
        D: 2,
        E: 1,
        F: 0,
    };
    // Convert the letter grades to numeric values
    var g1 = map[grade1.toUpperCase()];
    var g2 = map[grade2.toUpperCase()];
    // Calculate the weighted average
    return (g1 * credits1 + g2 * credits2) / (credits1 + credits2);
}
