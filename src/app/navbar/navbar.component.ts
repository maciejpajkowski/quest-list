import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../shared/models/profile.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    public profile!: Profile;
    public subscription!: Subscription;

    constructor(private profileService: ProfileService) {}

    ngOnInit(): void {
        this.profile = this.profileService.getProfile();
        this.subscription = this.profileService.profileChanged.subscribe((profile: Profile) => {
            this.profile = profile;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
