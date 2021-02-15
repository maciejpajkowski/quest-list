import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { Task } from '../shared/models/task.model';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
    public tasks: Task[] = [];
    public subscription!: Subscription;

    constructor(private tasksService: TasksService) {}

    ngOnInit(): void {
        this.tasks = this.tasksService.getTasks();
        this.subscription = this.tasksService.tasksChanged.subscribe((tasks: Task[]) => {
            this.tasks = tasks;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
