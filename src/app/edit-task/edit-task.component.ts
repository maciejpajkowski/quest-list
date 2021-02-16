import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SkillsService } from '../services/skills.service';
import { TasksService } from '../services/tasks.service';
import { Skill } from '../shared/models/skill.model';
import { Task } from '../shared/models/task.model';

@Component({
    selector: 'app-edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit, OnDestroy {
    @ViewChild('f') taskForm!: NgForm;
    editMode: boolean = false;
    taskId!: number;
    currentTask!: Task;
    subscription!: Subscription;
    availableSkills!: Skill[];
    selectedSkills: Skill[] = [];

    faTimesCircle = faTimesCircle;

    constructor(
        private tasksService: TasksService,
        private route: ActivatedRoute,
        private router: Router,
        private skillsService: SkillsService
    ) {}

    ngOnInit(): void {
        this.availableSkills = this.skillsService.getSkills();
        this.subscription = this.route.params.subscribe((params: Params) => {
            this.taskId = +params['id'];
            this.editMode = params['id'] != null;
            this.currentTask = this.tasksService.getTaskByID(this.taskId);
            console.log(this.currentTask);

            if (this.editMode) {
                setTimeout(() => {
                    this.taskForm.setValue({
                        name: this.currentTask.name,
                        description: this.currentTask.description,
                        difficulty: this.currentTask.difficulty,
                        expValue: this.currentTask.expValue,
                        goldValue: this.currentTask.goldValue,
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
        this.editMode ? (id = this.taskId) : id;
        console.log(id);
        const newTask = new Task(id, value.name, +value.difficulty, value.description, value.expValue, value.goldValue);
        console.log(newTask);
        if (this.editMode) {
            this.tasksService.editTask(this.taskId, newTask);
        } else {
            this.tasksService.addTask(newTask);
        }
        this.onCancel();
        form.reset();
    }

    onDelete() {
        this.tasksService.removeTask(this.taskId);
        this.onCancel();
    }

    onCancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    onSkillSelected(event: Event) {
        const skillId: number = +(<HTMLSelectElement>event.target).value;
        const index = this.availableSkills.findIndex((item) => item.id === skillId);
        this.selectedSkills.push(this.availableSkills.splice(index, 1)[0]);
    }

    onSkillRemoved(id: number) {
        const index = this.selectedSkills.findIndex((item) => item.id === id);
        this.availableSkills.push(this.selectedSkills.splice(index, 1)[0]);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
