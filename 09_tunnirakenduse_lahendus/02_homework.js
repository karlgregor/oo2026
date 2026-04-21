var Workout = /** @class */ (function () {
    function Workout(weight, intensity, duration) {
        this.minutesDone = 0;
        this.caloriesBurned = 0;
        this.weight = weight;
        this.intensity = intensity;
        this.duration = duration;
    }
    Workout.prototype.train = function (minutes) {
        if (this.isFinished() || minutes <= 0) {
            return;
        }
        var minutesToTrain = minutes;
        if (this.minutesDone + minutesToTrain > this.duration) {
            minutesToTrain = this.duration - this.minutesDone;
        }
        var caloriesPerMinute = (this.weight * this.intensity) / 100;
        this.caloriesBurned += caloriesPerMinute * minutesToTrain;
        this.minutesDone += minutesToTrain;
    };
    Workout.prototype.getCaloriesBurned = function () {
        return this.caloriesBurned;
    };
    Workout.prototype.getMinutesLeft = function () {
        return this.duration - this.minutesDone;
    };
    Workout.prototype.getMinutesDone = function () {
        return this.minutesDone;
    };
    Workout.prototype.isFinished = function () {
        return this.minutesDone >= this.duration;
    };
    Workout.prototype.getProgress = function () {
        return (this.minutesDone / this.duration) * 100;
    };
    Workout.prototype.getStatus = function () {
        if (this.isFinished()) {
            return "Workout is finished.";
        }
        else {
            return "Workout is in progress.";
        }
    };
    return Workout;
}());
