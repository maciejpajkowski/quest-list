import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from '../shared/models/profile.model';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private profile = new Profile('Default profile', 1, 0, 0);
    public profileChanged = new Subject<Profile>();

    constructor() {}

    sendUpdatedProfile(): void {
        this.profileChanged.next({ ...this.profile });
    }

    getProfile(): Profile {
        return { ...this.profile };
    }

    addExperience(taskExp: number): void {
        this.profile.experience += taskExp;
        this.checkForLevelUp();
        this.sendUpdatedProfile();
    }

    addGold(taskGold: number): void {
        this.profile.gold += taskGold;
        this.sendUpdatedProfile();
    }

    private checkForLevelUp(): void {
        while (this.profile.experience >= 2000) {
            this.profile.level++;
            this.profile.experience -= 2000;
        }
    }
}
