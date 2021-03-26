import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Progress } from '../shared/models/progress.model';

@Injectable({
    providedIn: 'root',
})
export class ProgressService {
    private progress: Progress = new Progress(0, 0, 0, 0);
    public progressChanged = new Subject<Progress>();

    constructor() {
        this.progress = JSON.parse(localStorage.getItem('progress') || JSON.stringify({ ...this.progress }));
    }

    sendUpdatedProgress(): void {
        localStorage.setItem('progress', JSON.stringify({ ...this.progress }));
        this.progressChanged.next({ ...this.progress });
    }

    getProgress(): Progress {
        return { ...this.progress };
    }

    addTasksCreatedStat(): void {
        this.progress.tasksCreated++;
        this.sendUpdatedProgress();
    }

    addTasksCompletedStat(): void {
        this.progress.tasksCompleted++;
        this.sendUpdatedProgress();
    }

    addTotalExperienceStat(expAdded: number): void {
        this.progress.totalExperience += expAdded;
        this.sendUpdatedProgress();
    }

    addTotalGoldStat(goldAdded: number) {
        this.progress.totalGold += goldAdded;
        this.sendUpdatedProgress();
    }
}
