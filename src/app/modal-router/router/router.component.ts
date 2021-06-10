import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router, Routes } from '@angular/router';

@Component({
  selector: 'modal-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.scss']
})
export class RouterComponent implements OnInit {

  @Input("name") name : string;
  @Input("routes") routes : Routes;
  @Input("initialNavigation") initialNavigation : [commands: any[], extras?: NavigationExtras]

  template:string;
  renderrouter=false;

  constructor(
    private router:Router
  ) { }

  ngOnInit(){
    this.template = '<style> router-outlet ~ * { height:100% } </style> <router-outlet name="'+this.name+'"></router-outlet>';
    this.renderrouter = true;
    if(this.initialNavigation){
      let path = {};
      path[this.name]=this.initialNavigation[0];
      this.router.navigate([{outlets:path}],this.initialNavigation[1])
    }
    else{
      let path = {};
      path[this.name]=[this.routes[0].path];
      this.router.navigate([{outlets:path}])
    }
  }

}
