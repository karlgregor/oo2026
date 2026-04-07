import { TaskManager } from "../homeworkForTest";

let manager: TaskManager;

beforeEach(() => {
    manager = new TaskManager();
});

test("initially task list is empty", () => {
    expect(manager.getTasks()).toEqual([]);
});

test("add one task", () => {
    manager.addTask("Õpi TypeScripti");
    expect(manager.getTasks()).toEqual(["[ ] Õpi TypeScripti"]);
});

test("add multiple tasks", () => {
    manager.addTask("Esimene");
    manager.addTask("Teine");
    expect(manager.getTasks()).toEqual(["[ ] Esimene", "[ ] Teine"]);
});

test("empty task is not added", () => {
    manager.addTask("");
    expect(manager.getTasks()).toEqual([]);
});

test("toggle task done", () => {
    manager.addTask("Kodutöö");
    manager.toggleTaskDone(0);
    expect(manager.getTasks()).toEqual(["[x] Kodutöö"]);
});

test("completed count works", () => {
    manager.addTask("A");
    manager.addTask("B");
    manager.toggleTaskDone(0);
    expect(manager.getCompletedCount()).toBe(1);
});

test("remove task", () => {
    manager.addTask("A");
    manager.addTask("B");
    manager.removeTask(0);
    expect(manager.getTasks()).toEqual(["[ ] B"]);
});