import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
    @Input() task!: Task;
    public dueDateString?: string;

    constructor() {}

    ngOnInit(): void {
        this.dueDateString = this.task.dueDate?.toLocaleDateString('en-GB');
    }
}
