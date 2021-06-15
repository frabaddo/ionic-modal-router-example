import { CommonModule } from "@angular/common";
import { Compiler, Component, ComponentRef, Directive, Inject, Injector, Input, ModuleWithComponentFactories, NgModule, NgModuleRef, OnChanges, OnDestroy, Type, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DynamicRouterOutlet, OUTLET_NAME } from "./dynamic-router/dynamic_router_outlet";

@Component({
  selector: 'router-container',
  template: "<style> dynamic-router-outlet ~ * { height:100% } </style> <dynamic-router-outlet></dynamic-router-outlet>",
  styles:[":host{display:contents}"],
  encapsulation:ViewEncapsulation.ShadowDom
})
class CustomDynamicComponent {}

@Directive({
  selector: '[compile]'
})
export class CompileDirective implements OnChanges, OnDestroy {
  @Input() compile: string;
  @Input() compileContext: any;

  compRef: ComponentRef<any>;

  moduleProviderRef : NgModuleRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler,private injector:Injector) {}

  ngOnChanges() {
    if(!this.compile) {
      throw Error('You forgot to provide a name');
    }

    this.vcRef.clear();
    this.compRef = null;

    const module = this.createDynamicModule(CustomDynamicComponent);
    const moduleProviders = this.createProvidersDynamicModule();
    this.compiler.compileModuleAndAllComponentsAsync(module)
      .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
        this.compiler.compileModuleAndAllComponentsAsync(moduleProviders)
        .then((providers : ModuleWithComponentFactories<any>)=>{
          let compFactory = moduleWithFactories.componentFactories.find(x => x.componentType === CustomDynamicComponent);
          this.moduleProviderRef = providers.ngModuleFactory.create(this.injector);
          this.compRef = this.vcRef.createComponent(compFactory,0,this.injector,[],this.moduleProviderRef);
          this.updateProperties();
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnDestroy(){
    if(this.moduleProviderRef) this.moduleProviderRef.destroy();
  }

  updateProperties() {
    for(var prop in this.compileContext) {
      this.compRef.instance[prop] = this.compileContext[prop];
    }
  }

  private createDynamicModule (component: Type<any>) {
    @NgModule({
      imports: [CommonModule,RouterModule.forChild([])],
      declarations: [component,DynamicRouterOutlet]
    })
    class DynamicModule {}
    return DynamicModule;
  }

  private createProvidersDynamicModule () {
    @NgModule({
      providers:[{provide: OUTLET_NAME,useValue:this.compile}]
    })
    class DynamicModule {}
    return DynamicModule;
  }
}