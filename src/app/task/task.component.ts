import { Component, Input, OnInit } from '@angular/core';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { TasksService } from '../services/tasks.service';
import { Task } from '../shared/models/task.model';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
    faCheckCircle = faCheckCircle;

    @Input() task!: Task;
    public dueDateString?: string;

    constructor(private tasksService: TasksService) {}

    ngOnInit(): void {
        this.dueDateString = this.task.dueDate?.toLocaleDateString('en-GB');
    }

    public get difficulty(): string {
        switch (this.task.difficulty) {
            case 1:
                return 'Very easy';
            case 2:
                return 'Easy';
            case 3:
                return 'Normal';
            case 4:
                return 'Hard';
            case 5:
                return 'Very hard';
            case 6:
                return 'Legendary';
            default:
                return 'Unspecified';
        }
    }

    onTaskSelection() {
        // console.log('task with id ' + this.task.id + ' clicked');
        this.tasksService.startedEditing.next(this.task.id);
    }
}
