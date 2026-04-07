export interface TaskManagerInterface {
    addTask(task: string): void;
    removeTask(index: number): void;
    toggleTaskDone(index: number): void;
    getTasks(): string[];
    getCompletedCount(): number;
}

export class TaskManager implements TaskManagerInterface {
    private tasks: { text: string; done: boolean }[] = [];

    addTask(task: string): void {
        const trimmed = task.trim();

        if (trimmed === "") {
            return;
        }

        this.tasks.push({
            text: trimmed,
            done: false
        });
    }

    removeTask(index: number): void {
        if (index < 0 || index >= this.tasks.length) {
            return;
        }

        this.tasks.splice(index, 1);
    }

    toggleTaskDone(index: number): void {
        if (index < 0 || index >= this.tasks.length) {
            return;
        }

        this.tasks[index].done = !this.tasks[index].done;
    }

    getTasks(): string[] {
        return this.tasks.map(task =>
            task.done ? `[x] ${task.text}` : `[ ] ${task.text}`
        );
    }

    getCompletedCount(): number {
        return this.tasks.filter(task => task.done).length;
    }
}