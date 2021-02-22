import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillComponent } from './skill/skill.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { ProgressComponent } from './progress/progress.component';
import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        TaskListComponent,
        TaskComponent,
        EditTaskComponent,
        ModalComponent,
        SkillListComponent,
        SkillComponent,
        EditSkillComponent,
        ProgressComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, FormsModule, DpDatePickerModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
