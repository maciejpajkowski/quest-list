import { Component, Input, OnInit } from '@angular/core';
import { SkillsService } from '../services/skills.service';
import { Skill } from '../shared/models/skill.model';

@Component({
    selector: 'app-skill',
    templateUrl: './skill.component.html',
    styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit {
    @Input() skill!: Skill;

    constructor(private skillsService: SkillsService) {}

    ngOnInit(): void {}

    onSkillSelection(): void {
        this.skillsService.startedEditing.next(this.skill.id);
    }
}
