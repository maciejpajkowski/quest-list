import { Component, Input, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../services/profile.service';
import { SkillsService } from '../services/skills.service';
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

    constructor(
        private tasksService: TasksService,
        private skillsService: SkillsService,
        private profileService: ProfileService
    ) {}

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
        this.tasksService.startedEditing.next(this.task.id);
    }

    onTaskCompletion() {
        this.tasksService.removeTask(this.task.id);
        if (this.task.expValue) {
            this.profileService.addExperience(this.task.expValue);
            if (this.task.skills) {
                for (let skill of this.task.skills) {
                    this.skillsService.addExperienceToSkill(skill.id, this.task.expValue);
                }
            }
        }
        if (this.task.goldValue) {
            this.profileService.addGold(this.task.goldValue);
        }
    }
}
