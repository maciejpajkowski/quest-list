import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { Task } from '../shared/models/task.model';

@Component({
    selector: 'app-edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit, OnDestroy {
    @ViewChild('f') taskForm!: NgForm;
    editMode: boolean = false;
    editedItemIndex!: number;
    editedItem!: Task;
    subscription!: Subscription;

    constructor(private tasksService: TasksService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe((params: Params) => {
            this.editedItemIndex = +params['id'];
            this.editMode = params['id'] != null;
            this.editedItem = this.tasksService.getTaskByID(this.editedItemIndex);
            console.log(this.editedItem);

            if (this.editMode) {
                setTimeout(() => {
                    this.taskForm.setValue({
                        name: this.editedItem.name,
                        description: this.editedItem.description,
                        difficulty: this.editedItem.difficulty,
                        expValue: this.editedItem.expValue,
                        goldValue: this.editedItem.goldValue,
                    });
                }, 10);
            }
        });
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        console.log(this.tasksService.getTasks());
        let id =
            this.tasksService.getTasks().length !== 0
                ? this.tasksService
                      .getTasks()
                      .map((task) => task.id || 0)
                      .reduce((prev, current) => {
                          if (current > prev) {
                              return current;
                          } else {
                              return prev;
                          }
                      }) + 1
                : 0;
        this.editMode ? (id = this.editedItemIndex) : id;
        console.log(id);
        const newTask = new Task(id, value.name, +value.difficulty, value.description, value.expValue, value.goldValue);
        console.log(newTask);
        if (this.editMode) {
            this.tasksService.editTask(this.editedItemIndex, newTask);
        } else {
            this.tasksService.addTask(newTask);
        }
        this.onCancel();
        form.reset();
    }

    onDelete() {
        this.tasksService.removeTask(this.editedItemIndex);
        this.onCancel();
    }

    onCancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
