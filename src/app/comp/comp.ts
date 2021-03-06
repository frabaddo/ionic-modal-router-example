import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalRouterController } from '../modal-router/modal-router.service';

@Component({
    selector: 'comp1',
    template: `
  <ion-content>
    <h1>comp1</h1>
    <ion-button (click)="navigate()">navigate</ion-button>
    <ion-button (click)="close()">close</ion-button>
  </ion-content>`
})
export class comp1 implements OnInit {
    constructor(
        private modalrouter: ModalRouterController,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((par) => console.log("QueryParams: ", par));
        this.route.params.subscribe((par) => console.log("Params: ", par));
    }

    navigate() {
        this.modalrouter.navigate(["comp2"])
    }

    close() {
        this.modalrouter.dismiss();
    }
}

@Component({
    selector: 'comp2',
    template: `
  <ion-content>
    <h1>comp2</h1>
    <ion-button (click)="navigate()">navigate</ion-button>
    <ion-button (click)="close()">close</ion-button>
  </ion-content>`
})
export class comp2 {
    constructor(
        private modalrouter: ModalRouterController
    ) { }

    navigate() {
        this.modalrouter.navigate(["comp1"])
    }

    close() {
        this.modalrouter.dismiss();
    }
}