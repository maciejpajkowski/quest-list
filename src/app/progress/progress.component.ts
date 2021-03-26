import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { ProgressService } from '../services/progress.service';
import { Progress } from '../shared/models/progress.model';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit, OnDestroy {
    public progress!: Progress;
    public subscription!: Subscription;

    constructor(private progressService: ProgressService) {}

    ngOnInit(): void {
        this.progress = this.progressService.getProgress();
        this.subscription = this.progressService.progressChanged.subscribe((progress: Progress) => {
            this.progress = progress;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
