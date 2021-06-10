import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ModalRouterController } from '../modal-router/modal-router.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  routes: Routes = [
    {
      path: 'page1',
      loadChildren: () => import('../page1/page1.module').then( m => m.Page1PageModule)
    },
    {
      path: 'page2',
      loadChildren: () => import('../page2/page2.module').then( m => m.Page2PageModule)
    },
  ];

  constructor(
    private modalrouter:ModalRouterController
  ) {}

  open(){
    this.modalrouter.create({
      routes:this.routes,
      outletName:"test"
    }).then((modal)=>{
      modal.present();
    })
  }
  opensecond(){
    this.modalrouter.create({
      outletName:"second",
      initialNavigation:[["page1"]]
    }).then((modal)=>{
      modal.present();
    })
  }

}
