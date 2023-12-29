import { DOCUMENT } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { ComponentRef, Directive, HostListener, Input, ComponentFactoryResolver, Injector, Inject, ElementRef, ApplicationRef } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  private tooltipComponent?: ComponentRef<any>;

  @Input() tooltipText = '';

  @HostListener('mouseenter') onMouseEnter() {
    console.log('onMouseenter');
    if(this.tooltipComponent) {
      return;
    }
    this.setTextToEndOfBody(); // Test html
    const tooltipComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.tooltipComponent = tooltipComponentFactory.create(this.injector);
    this.document.body.appendChild(this.tooltipComponent.location.nativeElement);
    this.setTooltipComponentProperties();
    this.tooltipComponent.hostView.detectChanges();
 
  }
  @HostListener('mouseleave') onMouseLeave() {
    console.log('onMouseLeave');
    if (!this.tooltipComponent) {
      return;
    }
    this.appRef.detachView(this.tooltipComponent.hostView);
    this.tooltipComponent.destroy();
    this.tooltipComponent = undefined;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private elementRef: ElementRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
  ) { 
    console.log('INIT:TooltipDirective')
  }

  private setTooltipComponentProperties() {
    if(!this.tooltipComponent) {
      return;
    }
    this.tooltipComponent.instance.text = this.tooltipText;
    const { left, right, bottom } = this.elementRef.nativeElement.getBoundingClientRect();
    this.tooltipComponent.instance.left = (right - left) / 2 + left;
    this.tooltipComponent.instance.top = bottom;
  }

  private setTextToEndOfBody() {
    let textN = this.document.createElement('div');
    textN.innerHTML = '<i>TEXT N</i>';
    this.document.body.appendChild(textN);
    setTimeout(() => { textN.remove() }, 1000);
  }

}
