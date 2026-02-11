class Course {
    constructor(private credits: number, private name: string) {}

    // Method including the formula to calculate the GPA
    // Formula is : Grade x Credits

    gpaContribution(grade: number): number {
        return grade * this.credits;
    }
    
    show(): void {
        console.log(`Course Name: ${this.name}, Credits: ${this.credits}`);
    }

    getCredits(): number {
        return this.credits;
    }
    
}

// Here defining the courses and credits
let math = new Course(4, "Mathematics");
let english = new Course(6, "English");
let programming = new Course(5, "Programming");

// 
let mathGrade = 4.0;
let englishGrade = 3.3;
let programmingGrade = 3.7;

let totalPoints = 0;

totalPoints += math.gpaContribution(mathGrade);
totalPoints += english.gpaContribution(englishGrade);
totalPoints += programming.gpaContribution(programmingGrade);

let totalCredits = math.getCredits() + english.getCredits() + programming.getCredits();

let gpa = totalPoints / totalCredits;

console.log("Total GPA: ", gpa.toPrecision(2));

// Create an array to pass grades of several students 
let gradeStudents = [
    { name: "Alice", mathGrade: 4.0, englishGrade: 3.3, programmingGrade: 3.7 },
    { name: "Bob", mathGrade: 3.0, englishGrade: 3.3, programmingGrade: 2.7 },
    { name: "Charlie", mathGrade: 3.3, englishGrade: 3.8, programmingGrade: 3.2 }
]

gradeStudents.forEach(student => {
    let totalPoints = 0;
    totalPoints += math.gpaContribution(student.mathGrade);
    totalPoints += english.gpaContribution(student.englishGrade);
    totalPoints += programming.gpaContribution(student.programmingGrade);
    
    let gpa = totalPoints / totalCredits;
    console.log(`${student.name}'s GPA: ${gpa.toPrecision(2)}`);
});