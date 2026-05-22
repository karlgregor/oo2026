"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.ChoiceMission = exports.QuizMission = exports.Mission = exports.QuestionBank = exports.Question = exports.Player = exports.ScoreCalculator = void 0;
var ScoreCalculator = /** @class */ (function () {
    function ScoreCalculator() {
    }
    ScoreCalculator.getDifficultyPoints = function (difficulty) {
        if (difficulty === "easy")
            return 10;
        if (difficulty === "medium")
            return 20;
        return 30;
    };
    return ScoreCalculator;
}());
exports.ScoreCalculator = ScoreCalculator;
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.lives = 3;
        this.score = 0;
        this.knowledge = 0;
        if (name.length === 0) {
            throw new Error("Mängija nimi ei tohi olla tühi.");
        }
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.getLives = function () {
        return this.lives;
    };
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.getKnowledge = function () {
        return this.knowledge;
    };
    Player.prototype.addScore = function (points) {
        this.score += points;
    };
    Player.prototype.addKnowledge = function () {
        this.knowledge++;
    };
    Player.prototype.loseLife = function () {
        if (this.lives > 0) {
            this.lives--;
        }
    };
    Player.prototype.isAlive = function () {
        return this.lives > 0;
    };
    return Player;
}());
exports.Player = Player;
var Question = /** @class */ (function () {
    function Question(text, answers, correctAnswer, difficulty) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.difficulty = difficulty;
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
    Question.prototype.getText = function () {
        return this.text;
    };
    Question.prototype.getAnswers = function () {
        return this.answers;
    };
    Question.prototype.getDifficulty = function () {
        return this.difficulty;
    };
    Question.prototype.checkAnswer = function (answerIndex) {
        return answerIndex === this.correctAnswer;
    };
    return Question;
}());
exports.Question = Question;
var QuestionBank = /** @class */ (function () {
    function QuestionBank() {
        this.questions = [];
    }
    QuestionBank.prototype.addQuestion = function (question) {
        this.questions.push(question);
    };
    QuestionBank.prototype.getQuestions = function () {
        return __spreadArray([], this.questions, true);
    };
    return QuestionBank;
}());
exports.QuestionBank = QuestionBank;
var Mission = /** @class */ (function () {
    function Mission(title, player) {
        this.title = title;
        this.player = player;
        this.completed = false;
    }
    Mission.prototype.getTitle = function () {
        return this.title;
    };
    Mission.prototype.isCompleted = function () {
        return this.completed;
    };
    return Mission;
}());
exports.Mission = Mission;
var QuizMission = /** @class */ (function (_super) {
    __extends(QuizMission, _super);
    function QuizMission(title, player, questions) {
        var _this = _super.call(this, title, player) || this;
        _this.questions = questions;
        _this.currentQuestion = 0;
        if (questions.length === 0) {
            throw new Error("Missioon peab sisaldama vähemalt 1 küsimust.");
        }
        return _this;
    }
    QuizMission.prototype.start = function () {
        console.log("Viktoriin alustatud: " + this.title);
    };
    QuizMission.prototype.answer = function (answerIndex) {
        if (this.completed) {
            console.log("Missioon on juba läbitud.");
            return false;
        }
        var question = this.questions[this.currentQuestion];
        var correct = question.checkAnswer(answerIndex);
        if (correct) {
            var points = ScoreCalculator.getDifficultyPoints(question.getDifficulty());
            this.player.addScore(points);
            this.player.addKnowledge();
        }
        else {
            this.player.loseLife();
        }
        this.currentQuestion++;
        if (this.currentQuestion >= this.questions.length || !this.player.isAlive()) {
            this.completed = true;
        }
        return correct;
    };
    return QuizMission;
}(Mission));
exports.QuizMission = QuizMission;
var ChoiceMission = /** @class */ (function (_super) {
    __extends(ChoiceMission, _super);
    function ChoiceMission(title, player, questionText, choices, correctChoice) {
        var _this = _super.call(this, title, player) || this;
        _this.questionText = questionText;
        _this.choices = choices;
        _this.correctChoice = correctChoice;
        if (questionText.length === 0) {
            throw new Error("Valikmissiooni küsimus ei tohi olla tühi.");
        }
        if (choices.length < 2) {
            throw new Error("Valikmissioonil peab olema vähemalt 2 valikut.");
        }
        return _this;
    }
    ChoiceMission.prototype.start = function () {
        console.log("Valikmissioon alustatud: " + this.title);
    };
    ChoiceMission.prototype.getQuestionText = function () {
        return this.questionText;
    };
    ChoiceMission.prototype.getChoices = function () {
        return __spreadArray([], this.choices, true);
    };
    ChoiceMission.prototype.choose = function (choice) {
        if (this.completed) {
            console.log("Missioon on juba läbitud.");
            return false;
        }
        var correct = choice === this.correctChoice;
        if (correct) {
            this.player.addScore(20);
            this.player.addKnowledge();
        }
        else {
            this.player.loseLife();
        }
        this.completed = true;
        return correct;
    };
    return ChoiceMission;
}(Mission));
exports.ChoiceMission = ChoiceMission;
var Game = /** @class */ (function () {
    function Game(player) {
        this.player = player;
        this.missions = [];
    }
    Game.prototype.addMission = function (mission) {
        this.missions.push(mission);
    };
    Game.prototype.showMissions = function () {
        for (var _i = 0, _a = this.missions; _i < _a.length; _i++) {
            var mission = _a[_i];
            console.log(mission.getTitle());
        }
    };
    Game.prototype.getCompletedMissionCount = function () {
        var count = 0;
        for (var _i = 0, _a = this.missions; _i < _a.length; _i++) {
            var mission = _a[_i];
            if (mission.isCompleted()) {
                count++;
            }
        }
        return count;
    };
    Game.prototype.showPlayerInfo = function () {
        console.log("Mängija: " + this.player.getName());
        console.log("Skoor: " + this.player.getScore());
        console.log("Elud: " + this.player.getLives());
        console.log("Tarkus: " + this.player.getKnowledge());
    };
    return Game;
}());
exports.Game = Game;
