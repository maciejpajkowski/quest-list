import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SkillsService } from '../services/skills.service';
import { Skill } from '../shared/models/skill.model';

@Component({
    selector: 'app-edit-skill',
    templateUrl: './edit-skill.component.html',
    styleUrls: ['./edit-skill.component.scss'],
})
export class EditSkillComponent implements OnInit, OnDestroy {
    @ViewChild('f') skillForm!: NgForm;
    public editMode = false;
    public skillId!: number;
    public currentSkill!: Skill;
    public subscription!: Subscription;

    constructor(private skillsService: SkillsService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe((params: Params) => {
            this.editMode = params['id'] != null;

            if (this.editMode) {
                this.skillId = +params['id'];
                this.currentSkill = this.skillsService.getSkillByID(this.skillId);
                setTimeout(() => {
                    this.skillForm.setValue({
                        name: this.currentSkill.name,
                        experience: this.currentSkill.experience,
                        level: this.currentSkill.level,
                    });
                }, 10);
            } else {
                setTimeout(() => {
                    this.skillForm.setValue({
                        name: '',
                        experience: 0,
                        level: 1,
                    });
                }, 10);
            }
        });
    }

    onSubmit(form: NgForm): void {
        const value = form.value;

        let id =
            this.skillsService.getSkills().length !== 0
                ? this.skillsService
                      .getSkills()
                      .map((skill) => skill.id || 0)
                      .reduce((prev, current) => {
                          if (current > prev) {
                              return current;
                          } else {
                              return prev;
                          }
                      }) + 1
                : 0;

        this.editMode ? (id = this.skillId) : id;
        const newSkill = new Skill(id, value.name, value.experience, value.level);

        if (this.editMode) {
            this.skillsService.editSkill(this.skillId, newSkill);
        } else {
            this.skillsService.addSkill(newSkill);
        }

        this.onCancel();
        form.reset();
    }

    onDelete() {
        this.skillsService.removeSkill(this.skillId);
        this.onCancel();
    }

    onCancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
