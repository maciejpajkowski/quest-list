import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SkillsService } from '../services/skills.service';
import { Skill } from '../shared/models/skill.model';

@Component({
    selector: 'app-skill-list',
    templateUrl: './skill-list.component.html',
    styleUrls: ['./skill-list.component.scss'],
})
export class SkillListComponent implements OnInit, OnDestroy {
    public skills: Skill[] = [];
    public subscription!: Subscription;

    constructor(private skillsService: SkillsService, private router: Router) {}

    ngOnInit(): void {
        this.skills = this.skillsService.getSkills();
        this.subscription = this.skillsService.skillsChanged.subscribe((skills: Skill[]) => {
            this.skills = skills;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onCreateSkill(): void {
        this.router.navigate(['new-skill']);
    }
}
