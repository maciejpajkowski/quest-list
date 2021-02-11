import { Injectable, OnInit } from '@angular/core';
import { Skill } from '../shared/models/skill.model';
import { Task } from '../shared/models/task.model';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    private tasks: Task[] = [
        new Task(
            0,
            'Build this app!',
            5,
            'This will be my first fully self-made Angular app!',
            10000,
            1000,
            new Date(),
            false,
            [new Skill(0, 'Webdev'), new Skill(1, 'CSS'), new Skill(2, 'Angular')]
        ),
        new Task(
            1,
            'Build this app!',
            5,
            'This will be my first fully self-made Angular app!',
            10000,
            1000,
            new Date(),
            false,
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
            false,
            [new Skill(0, 'Webdev'), new Skill(1, 'CSS'), new Skill(2, 'Angular')]
        ),
    ];

    constructor() {}

    getTasks() {
        return [...this.tasks];
    }
}
