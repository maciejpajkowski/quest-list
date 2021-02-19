import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Skill } from '../shared/models/skill.model';

@Injectable({
    providedIn: 'root',
})
export class SkillsService {
    public skillsChanged = new Subject<Skill[]>();
    public startedEditing = new Subject<number>();
    private skills: Skill[] = [
        new Skill(0, 'Cooking', 0, 1),
        new Skill(1, 'Running', 0, 1),
        new Skill(2, 'Chess', 0, 1),
        new Skill(3, 'Programming', 0, 1),
        new Skill(4, 'Games', 0, 1),
    ];

    constructor() {}

    getSkills(): Skill[] {
        return [...this.skills];
    }
}
