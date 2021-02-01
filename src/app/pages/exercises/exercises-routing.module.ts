import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExercisesComponent } from './exercises.component';
import { ExercisesInputsComponent } from './exercise-inputs/exercises-inputs.component';
import {ExercisesListComponent} from './exercise-list/exercises-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisesComponent,
    children: [
      {
        path: 'input',
        component: ExercisesInputsComponent,
      },
      {
        path: 'list',
        component: ExercisesListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ExercisesRoutingModule {
}

