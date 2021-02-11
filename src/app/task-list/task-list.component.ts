import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../shared/models/task.model';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
    public tasks: Task[] = [];

    constructor(private tasksService: TasksService) {}

    ngOnInit(): void {
        this.tasks = this.tasksService.getTasks();
    }
}
