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

    sendUpdatedList(): void {
        this.skillsChanged.next([...this.skills]);
    }

    getSkills(): Skill[] {
        return [...this.skills];
    }

    getSkillByID(id: number): Skill {
        return this.skills.filter((skill) => skill.id === id)[0];
    }

    editSkill(id: number, skill: Skill): void {
        const index: number = this.skills.findIndex((item) => item.id === id);
        let updatedskills: Skill[] = [...this.skills];
        updatedskills[index] = skill;
        this.skills = updatedskills;
        this.sendUpdatedList();
    }

    addSkill(skill: Skill): void {
        this.skills.push(skill);
        this.sendUpdatedList();
    }

    removeSkill(id: number): void {
        this.skills = this.skills.filter((skill) => skill.id !== id);
        this.sendUpdatedList();
    }
}
