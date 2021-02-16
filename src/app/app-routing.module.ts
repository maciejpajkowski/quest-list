import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ProgressComponent } from './progress/progress.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    {
        path: 'tasks',
        component: TaskListComponent,
        children: [
            { path: 'new-task', component: EditTaskComponent },
            { path: ':id', component: EditTaskComponent },
        ],
    },
    {
        path: 'skills',
        component: SkillListComponent,
        children: [
            { path: 'new-skill', component: EditSkillComponent },
            { path: ':id', component: EditSkillComponent },
        ],
    },
    {
        path: 'progress',
        component: ProgressComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
