var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    TaskManager.prototype.addTask = function (task) {
        var trimmed = task.trim();
        if (trimmed === "") {
            return;
        }
        this.tasks.push({
            text: trimmed,
            done: false
        });
    };
    TaskManager.prototype.removeTask = function (index) {
        if (index < 0 || index >= this.tasks.length) {
            return;
        }
        this.tasks.splice(index, 1);
    };
    TaskManager.prototype.toggleTaskDone = function (index) {
        if (index < 0 || index >= this.tasks.length) {
            return;
        }
        this.tasks[index].done = !this.tasks[index].done;
    };
    TaskManager.prototype.getTasks = function () {
        return this.tasks.map(function (task) {
            return task.done ? "[x] ".concat(task.text) : "[ ] ".concat(task.text);
        });
    };
    TaskManager.prototype.getCompletedCount = function () {
        return this.tasks.filter(function (task) { return task.done; }).length;
    };
    return TaskManager;
}());
window.TaskManager = TaskManager;
