import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule, MatDialogModule, MatButtonModule } from '@angular/material';

const MaterialComponents = [
  MatProgressSpinnerModule,
  MatDialogModule,
  MatButtonModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
