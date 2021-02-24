import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Skill } from '../shared/models/skill.model';

@Injectable({
    providedIn: 'root',
})
export class SkillsService {
    public skillsChanged = new Subject<Skill[]>();
    public startedEditing = new Subject<number>();
    private skills: Skill[] = [];

    constructor() {
        this.skills = JSON.parse(localStorage.getItem('skills') || '[]');
    }

    sendUpdatedList(): void {
        localStorage.setItem('skills', JSON.stringify([...this.skills]));
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

    addExperienceToSkill(skillId: number, experience: number): void {
        const index: number = this.skills.findIndex((item) => item.id === skillId);
        this.skills[index].experience! += experience;
        this.checkForLevelUp(skillId);
        this.sendUpdatedList();
    }

    private checkForLevelUp(skillId: number): void {
        while (this.skills[skillId].experience! >= 2000) {
            this.skills[skillId].level!++;
            this.skills[skillId].experience! -= 2000;
        }
    }
}
