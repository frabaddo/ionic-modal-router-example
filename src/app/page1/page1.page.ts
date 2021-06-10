import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { comp1, comp2 } from '../app.component';
import { ModalRouterController } from '../modal-router/modal-router.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page {

  routes: Routes = [
    {
      path:"comp1/:par",
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
      outletName:"test2" ,
      initialNavigation:[["comp1","123567"],{queryParams:{test:5}}]
    }).then((modal)=>{
      modal.present();
    })
  }

  navigate(){
    this.modalrouter.navigate(["page2"])
  }

  close(){
    this.modalrouter.dismiss();
  }

}
