import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { comp1, comp2 } from '../comp/comp';
import { ModalRouterController } from '../modal-router/modal-router.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
})
export class Page2Page {
  
  routes: Routes = [
    {
      path:"comp1",
      component:comp1
    },
    {
      path:"comp2",
      component:comp2
    }
  ];

  constructor(
    private modalrouter:ModalRouterController
  ) {}

  open(){
    this.modalrouter.create({
      routes:this.routes,
      outletName:"test2"
    }).then((modal)=>{
      modal.present();
    })
  }

  navigate(){
    this.modalrouter.navigate(["page1"])
  }

  close(){
    this.modalrouter.dismiss();
  }

}
