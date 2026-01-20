import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PositionFormComponent } from './position-form.component';
import { PositionPermissionsComponent } from './position-permissions.component';
import { PositionsListComponent } from './positions-list.component';

@NgModule({
  declarations: [
    PositionFormComponent,
    PositionPermissionsComponent,
    PositionsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PositionFormComponent,
    PositionPermissionsComponent,
    PositionsListComponent
  ]
})
export class PositionModule {}
