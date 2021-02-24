import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../shared/models/task.model';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    public tasksChanged = new Subject<Task[]>();
    public startedEditing = new Subject<number>();
    private tasks: Task[] = [];

    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    sendUpdatedList(): void {
        localStorage.setItem('tasks', JSON.stringify([...this.tasks]));
        this.tasksChanged.next([...this.tasks]);
    }

    getTasks(): Task[] {
        return [...this.tasks];
    }

    getTaskByID(id: number): Task {
        return this.tasks.filter((task) => task.id === id)[0];
    }

    addTask(task: Task): void {
        this.tasks.push(task);
        this.sendUpdatedList();
    }

    editTask(id: number, task: Task): void {
        const index: number = this.tasks.findIndex((item) => item.id === id);
        let updatedTasks: Task[] = [...this.tasks];
        updatedTasks[index] = task;
        this.tasks = updatedTasks;
        this.sendUpdatedList();
    }

    removeTask(id: number): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.sendUpdatedList();
    }
}
