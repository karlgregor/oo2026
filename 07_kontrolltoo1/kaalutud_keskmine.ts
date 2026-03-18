// Defines a single course with a letter grade and number of credits
class Course {
  grade: string;
  credits: number;
  color: string;

  constructor(grade: string, credits: number) {
    // Allowed grade values
    const validGrades = ["A", "B", "C", "D", "E", "F"];

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
    this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  // Converts the letter grade to a numeric value
  getNumericGrade(): number {
    const map: Record<string, number> = {
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1,
      F: 0,
    };

    return map[this.grade.toUpperCase()];
  }
}

class GradeBook {
  courses: Course[] = [];

  // Adds a new course to the grade book
  addCourse(grade: string, credits: number) {
    this.courses.push(new Course(grade, credits));
  }

  // Calculates the weighted average of all courses in the grade book
  getWeightedAverage(): number {
    let weightedSum = 0;
    let totalCredits = 0;

    // Iterate over all courses and sum up the weighted sum and total credits
    for (const c of this.courses) {
      weightedSum += c.getNumericGrade() * c.credits;
      totalCredits += c.credits;
    }

    // Return 0 if there are no courses to avoid division by zero
    if (totalCredits === 0) return 0;

    return weightedSum / totalCredits;
  }
}

// Calculates the weighted average of two courses
function weightedAverageTwo(
  grade1: string,
  credits1: number,
  grade2: string,
  credits2: number,
): number {

  // Credits must be a positive number
  if (credits1 <= 0 || credits2 <= 0) {
    throw new Error("Credits must be greater than 0.");
  }

  // Convert the letter grades to numeric values
  const map: Record<string, number> = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
  };

  // Convert the letter grades to numeric values
  const g1 = map[grade1.toUpperCase()];
  const g2 = map[grade2.toUpperCase()];

  // Calculate the weighted average
  return (g1 * credits1 + g2 * credits2) / (credits1 + credits2);
}
