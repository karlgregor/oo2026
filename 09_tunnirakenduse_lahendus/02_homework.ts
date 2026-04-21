class Workout {
    weight: number;
    intensity: number;
    duration: number;
    minutesDone: number = 0;
    caloriesBurned: number = 0;

    constructor(weight: number, intensity: number, duration: number) {
        this.weight = weight;
        this.intensity = intensity;
        this.duration = duration;
    }

    train(minutes: number): void {
        if (this.isFinished() || minutes <= 0) {
            return;
        }

        let minutesToTrain = minutes;

        if (this.minutesDone + minutesToTrain > this.duration) {
            minutesToTrain = this.duration - this.minutesDone;
        }

        const caloriesPerMinute = (this.weight * this.intensity) / 100;
        this.caloriesBurned += caloriesPerMinute * minutesToTrain;
        this.minutesDone += minutesToTrain;
    }

    getCaloriesBurned(): number {
        return this.caloriesBurned;
    }

    getMinutesLeft(): number {
        return this.duration - this.minutesDone;
    }

    getMinutesDone(): number {
        return this.minutesDone;
    }

    isFinished(): boolean {
        return this.minutesDone >= this.duration;
    }

    getProgress(): number {
        return (this.minutesDone / this.duration) * 100;
    }

    getStatus(): string {
        if (this.isFinished()) {
            return "Workout is finished.";
        } else {
            return "Workout is in progress.";
        }
    }
}
