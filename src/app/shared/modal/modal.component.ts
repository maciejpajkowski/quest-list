import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    @Output() close = new EventEmitter<void>();

    constructor(private router: Router) {}

    onClose() {
        this.router.navigate(['..']);
    }
}
