import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';
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
    public editMode: boolean = false;
    public taskId!: number;
    public currentTask!: Task;
    public subscription!: Subscription;
    public availableSkills!: Skill[];
    public selectedSkills: Skill[] = [];
    public selectedDate!: any;

    faTimesCircle = faTimesCircle;

    constructor(
        private tasksService: TasksService,
        private route: ActivatedRoute,
        private router: Router,
        private skillsService: SkillsService,
        private profileService: ProfileService
    ) {}

    ngOnInit(): void {
        this.availableSkills = this.skillsService.getSkills();
        this.subscription = this.route.params.subscribe((params: Params) => {
            this.editMode = params['id'] != null;

            if (this.editMode) {
                this.taskId = +params['id'];
                this.currentTask = this.tasksService.getTaskByID(this.taskId);
                this.selectedSkills = this.currentTask.skills || [];
                this.removeAlreadySelectedSkills();
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

        const newTask = new Task(
            id,
            value.name,
            +value.difficulty,
            value.description,
            value.expValue,
            value.goldValue,
            undefined,
            this.selectedSkills
        );
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

    private removeAlreadySelectedSkills() {
        const results = this.availableSkills.filter(
            ({ id: id1 }) => !this.selectedSkills.some(({ id: id2 }) => id1 === id2)
        );
        this.availableSkills = results;
    }

    onTaskCompletion(): void {
        this.tasksService.removeTask(this.currentTask.id);
        if (this.currentTask.expValue) {
            this.profileService.addExperience(this.currentTask.expValue);
            if (this.currentTask.skills) {
                for (let skill of this.currentTask.skills) {
                    this.skillsService.addExperienceToSkill(skill.id, this.currentTask.expValue);
                }
            }
        }
        if (this.currentTask.goldValue) {
            this.profileService.addGold(this.currentTask.goldValue);
        }
        this.onCancel();
    }
}
