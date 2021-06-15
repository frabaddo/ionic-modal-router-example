import { CommonModule } from "@angular/common";
import { Compiler, Component, ComponentRef, Directive, Inject, Injector, Input, ModuleWithComponentFactories, NgModule, OnChanges, Type, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DynamicRouterOutlet, OUTLET_NAME } from "./dynamic-router/dynamic_router_outlet";

@Directive({
  selector: '[compile]'
})
export class CompileDirective implements OnChanges {
  @Input() compile: string;
  @Input() compileContext: any;
  @Input() compileName: any;

  compRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler,private injector:Injector) {}

  ngOnChanges() {
    if(!this.compile) {
      if(this.compRef) {
        this.updateProperties();
        return;
      }
      throw Error('You forgot to provide template');
    }

    this.vcRef.clear();
    this.compRef = null;

    const component = this.createDynamicComponent(this.compile);
    const module = this.createDynamicModule(component);
    this.compiler.compileModuleAndAllComponentsAsync(module)
      .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
        let compFactory = moduleWithFactories.componentFactories.find(x => x.componentType === component);
        this.compRef = this.vcRef.createComponent(compFactory,0,this.injector,[],moduleWithFactories.ngModuleFactory.create(this.injector));
        this.updateProperties();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateProperties() {
    for(var prop in this.compileContext) {
      this.compRef.instance[prop] = this.compileContext[prop];
    }
  }

  private createDynamicComponent (template:string) {
    @Component({
      selector: 'router-container',
      template: template,
      styles:[":host{display:contents}"],
      encapsulation:ViewEncapsulation.ShadowDom
    })
    class CustomDynamicComponent {}
    return CustomDynamicComponent;
  }

  private createDynamicModule (component: Type<any>) {
    console.log(this.compileName);
    @NgModule({
      // You might need other modules, providers, etc...
      // Note that whatever components you want to be able
      // to render dynamically must be known to this module
      imports: [CommonModule,RouterModule.forChild([])],
      declarations: [component,DynamicRouterOutlet],
      providers:[{provide: OUTLET_NAME,useValue:this.compileName}]
    })
    class DynamicModule {}
    return DynamicModule;
  }
}