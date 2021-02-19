import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Skill } from '../shared/models/skill.model';
import { Task } from '../shared/models/task.model';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    public tasksChanged = new Subject<Task[]>();
    public startedEditing = new Subject<number>();
    private tasks: Task[] = [
        new Task(
            0,
            'Build this app dsasd asd asd asd as asd asd asd as das !',
            5,
            'This will be my first fully self-made Angular app!',
            10000,
            1000,
            new Date(),
            [new Skill(0, 'Webdev'), new Skill(1, 'CSS'), new Skill(2, 'Angular')]
        ),
        new Task(
            1,
            'Build this apppppppppppppppppppppppppppppp!',
            5,
            'This will be my first fully self-made Angular app!',
            10000,
            1000,
            new Date(),
            [new Skill(0, 'Webdev'), new Skill(1, 'CSS'), new Skill(2, 'Angular')]
        ),
        new Task(
            2,
            'Build this app!',
            5,
            'This will be my first fully self-made Angular app!',
            10000,
            1000,
            new Date(),
            [new Skill(0, 'Webdev'), new Skill(1, 'CSS'), new Skill(2, 'Angular')]
        ),
    ];

    constructor() {}

    sendUpdatedList(): void {
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
