import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-edit-skill',
    templateUrl: './edit-skill.component.html',
    styleUrls: ['./edit-skill.component.scss'],
})
export class EditSkillComponent implements OnInit {
    @ViewChild('f') skillForm!: NgForm;
    public editMode = false;

    constructor() {}

    ngOnInit(): void {}

    onSubmit(form: NgForm) {
        const value = form.value;
    }
}
