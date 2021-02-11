import { Component, OnInit } from '@angular/core';
import { Skill } from '../shared/models/skill.model';
import { Task } from '../shared/models/task.model';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
    public tasks: Task[] = [
        new Task(
            'Build this app!',
            5,
            'This will be my first fully self-made Angular app!',
            10000,
            1000,
            new Date(),
            false,
            [new Skill('Webdev'), new Skill('CSS'), new Skill('Angular')]
        ),
        new Task(
            'Build this app!',
            5,
            'This will be my first fully self-made Angular app!',
            10000,
            1000,
            new Date(),
            false,
            [new Skill('Webdev'), new Skill('CSS'), new Skill('Angular')]
        ),
        new Task(
            'Build this app!',
            5,
            'This will be my first fully self-made Angular app!',
            10000,
            1000,
            new Date(),
            false,
            [new Skill('Webdev'), new Skill('CSS'), new Skill('Angular')]
        ),
    ];

    constructor() {}

    ngOnInit(): void {}
}
