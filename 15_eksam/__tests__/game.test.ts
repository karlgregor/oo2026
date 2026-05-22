import {
  Player,
  Question,
  QuestionBank,
  QuizMission,
  ChoiceMission,
  Game,
  ScoreCalculator
} from "../game";

test("player starts with correct values", () => {
  const player = new Player("Karl");

  expect(player.getName()).toBe("Karl");
  expect(player.getLives()).toBe(3);
  expect(player.getScore()).toBe(0);
  expect(player.getKnowledge()).toBe(0);
});

test("empty player name throws error", () => {
  expect(() => new Player("")).toThrow("Mängija nimi ei tohi olla tühi.");
});

test("score calculator gives correct points", () => {
  expect(ScoreCalculator.getDifficultyPoints("easy")).toBe(10);
  expect(ScoreCalculator.getDifficultyPoints("medium")).toBe(20);
  expect(ScoreCalculator.getDifficultyPoints("hard")).toBe(30);
});

test("question checks correct answer", () => {
  const question = new Question(
    "Test küsimus?",
    ["Vale", "Õige"],
    1,
    "easy"
  );

  expect(question.checkAnswer(1)).toBe(true);
  expect(question.checkAnswer(0)).toBe(false);
});

test("question bank adds questions", () => {
  const bank = new QuestionBank();

  const question = new Question(
    "Test küsimus?",
    ["A", "B"],
    0,
    "easy"
  );

  bank.addQuestion(question);

  expect(bank.getQuestions().length).toBe(1);
});

test("quiz mission gives points for correct answer", () => {
  const player = new Player("Karl");

  const question = new Question(
    "Test küsimus?",
    ["Vale", "Õige"],
    1,
    "easy"
  );

  const mission = new QuizMission(
    "Test viktoriin",
    player,
    [question]
  );

  const result = mission.answer(1);

  expect(result).toBe(true);
  expect(player.getScore()).toBe(10);
  expect(player.getKnowledge()).toBe(1);
  expect(mission.isCompleted()).toBe(true);
});

test("quiz mission removes life for wrong answer", () => {
  const player = new Player("Karl");

  const question = new Question(
    "Test küsimus?",
    ["Vale", "Õige"],
    1,
    "easy"
  );

  const mission = new QuizMission(
    "Test viktoriin",
    player,
    [question]
  );

  const result = mission.answer(0);

  expect(result).toBe(false);
  expect(player.getLives()).toBe(2);
  expect(mission.isCompleted()).toBe(true);
});

test("choice mission gives points for correct choice", () => {
  const player = new Player("Karl");

  const mission = new ChoiceMission(
    "Vali tee",
    player,
    "Milline tee on õige?",
    ["põhi", "lõuna"],
    "põhi"
  );

  const result = mission.choose("põhi");

  expect(result).toBe(true);
  expect(player.getScore()).toBe(20);
  expect(player.getKnowledge()).toBe(1);
  expect(mission.isCompleted()).toBe(true);
});

test("choice mission removes life for wrong choice", () => {
  const player = new Player("Karl");

  const mission = new ChoiceMission(
    "Vali tee",
    player,
    "Milline tee on õige?",
    ["põhi", "lõuna"],
    "põhi"
  );

  const result = mission.choose("lõuna");

  expect(result).toBe(false);
  expect(player.getLives()).toBe(2);
  expect(mission.isCompleted()).toBe(true);
});

test("game counts completed missions", () => {
  const player = new Player("Karl");
  const game = new Game(player);

  const mission = new ChoiceMission(
    "Vali tee",
    player,
    "Milline tee on õige?",
    ["põhi", "lõuna"],
    "põhi"
  );

  game.addMission(mission);

  expect(game.getCompletedMissionCount()).toBe(0);

  mission.choose("põhi");

  expect(game.getCompletedMissionCount()).toBe(1);
});