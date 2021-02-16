import { Injectable } from '@angular/core';
import { Profile } from '../shared/models/profile.model';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private profile = new Profile('Default profile', 1, 0, 0);

    constructor() {}
}
