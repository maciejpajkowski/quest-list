import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    @Output() close = new EventEmitter<void>();

    constructor(private router: Router, private route: ActivatedRoute) {}

    onClose() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
