import { ComponentsModule } from './../components.module';
import {PipesModule} from '../../app/pipe/pipes.module';
//import { AppModule } from './../../app/app.module';
import {
  Component,
  Directive,
  NgModule,
  Input,
  ViewContainerRef,
  Compiler,
  ComponentFactory,
  ModuleWithComponentFactories,
  ComponentRef,
  ReflectiveInjector
} from "@angular/core";

import {IonicModule} from 'ionic-angular';

export function createComponentFactory(
  compiler: Compiler,
  metadata: Component,
  context:any
): Promise<any | ComponentFactory<any>> {
  const cmpClass = class DynamicComponent {};
  cmpClass.prototype = context;
  const decoratedCmp = Component(metadata)(cmpClass);

  @NgModule({
    imports: [ComponentsModule,PipesModule,IonicModule],
    declarations: [decoratedCmp]
  })
  class DynamicHtmlModule {}

  return compiler
    .compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories.find(
        x => x.componentType === decoratedCmp
      );
    }).catch(err => console.log(`Error compiling module and all components async: ${err}`));
}

@Directive({selector:"html-outlet"})
export class HtmlOutlet {
  @Input() html: string;
  @Input() context:any;
  cmpRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

  ngOnChanges() {
    const html = this.html;
    if (!html) return;

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const compMetadata = new Component({
      selector: "dynamic-html",
      template: this.html
    });

    createComponentFactory(this.compiler, compMetadata, this.context).then(factory => {
      const injector = ReflectiveInjector.fromResolvedProviders(
        [],
        this.vcRef.parentInjector
      );
      this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
    }).catch(err => console.log(`Error creating component factory: ${err}`));
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
