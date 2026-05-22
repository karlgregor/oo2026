type Difficulty = "easy" | "medium" | "hard";

class ScoreCalculator {
  static getDifficultyPoints(difficulty: Difficulty): number {
    if (difficulty === "easy") return 10;
    if (difficulty === "medium") return 20;
    return 30;
  }
}

class Player {
  private lives: number = 3;
  private score: number = 0;
  private knowledge: number = 0;

  constructor(private name: string) {
    if (name.length === 0) {
      throw new Error("Mängija nimi ei tohi olla tühi.");
    }
  }

  getName(): string {
    return this.name;
  }

  getLives(): number {
    return this.lives;
  }

  getScore(): number {
    return this.score;
  }

  getKnowledge(): number {
    return this.knowledge;
  }

  addScore(points: number): void {
    this.score += points;
  }

  addKnowledge(): void {
    this.knowledge++;
  }

  loseLife(): void {
    if (this.lives > 0) {
      this.lives--;
    }
  }

  isAlive(): boolean {
    return this.lives > 0;
  }
}

class Question {
  constructor(
    private text: string,
    private answers: string[],
    private correctAnswer: number,
    private difficulty: Difficulty
  ) {
    if (text.length === 0) {
      throw new Error("Küsimus ei tohi jääda tühjaks.");
    }

    if (answers.length < 2) {
      throw new Error("Küsimus peab sisaldama vähemalt 2 vastust.");
    }

    if (correctAnswer < 0 || correctAnswer >= answers.length) {
      throw new Error("Õige vastuse indeks ei sobi vastuste arvuga.");
    }
  }

  getText(): string {
    return this.text;
  }

  getAnswers(): string[] {
    return this.answers;
  }

  getDifficulty(): Difficulty {
    return this.difficulty;
  }

  checkAnswer(answerIndex: number): boolean {
    return answerIndex === this.correctAnswer;
  }
}

class QuestionBank {
  private questions: Question[] = [];

  addQuestion(question: Question): void {
    this.questions.push(question);
  }

  getQuestions(): Question[] {
    return [...this.questions];
  }
}

abstract class Mission {
  protected completed: boolean = false;

  constructor(
    protected title: string,
    protected player: Player
  ) { }

  getTitle(): string {
    return this.title;
  }

  isCompleted(): boolean {
    return this.completed;
  }

  abstract start(): void;
}

class QuizMission extends Mission {
  currentQuestion: number = 0;

  constructor(
    title: string,
    player: Player,
    private questions: Question[]
  ) {
    super(title, player);

    if (questions.length === 0) {
      throw new Error("Missioon peab sisaldama vähemalt 1 küsimust.");
    }
  }

  start(): void {
    console.log("Viktoriin alustatud: " + this.title);
  }

  answer(answerIndex: number): boolean {
    if (this.completed) {
      console.log("Missioon on juba läbitud.");
      return false;
    }

    const question = this.questions[this.currentQuestion];
    const correct = question.checkAnswer(answerIndex);

    if (correct) {
      const points = ScoreCalculator.getDifficultyPoints(question.getDifficulty());
      this.player.addScore(points);
      this.player.addKnowledge();
    } else {
      this.player.loseLife();
    }

    this.currentQuestion++;

    if (this.currentQuestion >= this.questions.length || !this.player.isAlive()) {
      this.completed = true;
    }

    return correct;
  }
}

class ChoiceMission extends Mission {
  constructor(
    title: string,
    player: Player,
    private questionText: string,
    private choices: string[],
    private correctChoice: string
  ) {
    super(title, player);

    if (questionText.length === 0) {
      throw new Error("Valikmissiooni küsimus ei tohi olla tühi.");
    }

    if (choices.length < 2) {
      throw new Error("Valikmissioonil peab olema vähemalt 2 valikut.");
    }
  }

  start(): void {
    console.log("Valikmissioon alustatud: " + this.title);
  }

  getQuestionText(): string {
    return this.questionText;
  }

  getChoices(): string[] {
    return [...this.choices];
  }

  choose(choice: string): boolean {
    if (this.completed) {
      console.log("Missioon on juba läbitud.");
      return false;
    }

    const correct = choice === this.correctChoice;

    if (correct) {
      this.player.addScore(20);
      this.player.addKnowledge();
    } else {
      this.player.loseLife();
    }

    this.completed = true;
    return correct;
  }
}

class Game {
  private missions: Mission[] = [];

  constructor(private player: Player) { }

  addMission(mission: Mission): void {
    this.missions.push(mission);
  }

  showMissions(): void {
    for (const mission of this.missions) {
      console.log(mission.getTitle());
    }
  }

  getCompletedMissionCount(): number {
    let count = 0;

    for (const mission of this.missions) {
      if (mission.isCompleted()) {
        count++;
      }
    }

    return count;
  }

  showPlayerInfo(): void {
    console.log("Mängija: " + this.player.getName());
    console.log("Skoor: " + this.player.getScore());
    console.log("Elud: " + this.player.getLives());
    console.log("Tarkus: " + this.player.getKnowledge());
  }
}

export {
  ScoreCalculator,
  Player,
  Question,
  QuestionBank,
  Mission,
  QuizMission,
  ChoiceMission,
  Game
};
