import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalRouterController } from './modal-router.service';
import { RouterModule } from '@angular/router';
import { RouterComponent } from './router/router.component';
import { NamedRouterDirective } from './router/named-router.directive';

@NgModule({
  declarations: [
    RouterComponent,
    NamedRouterDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    IonicModule
  ]
})
export class ModalRouterModule { 
  static forRoot(): ModuleWithProviders<ModalRouterModule> {
    return {
      ngModule: ModalRouterModule,
      providers:[ ModalRouterController]
    };
  }
}
