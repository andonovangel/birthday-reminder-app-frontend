import { ApplicationRef, ComponentRef, Directive, ElementRef, HostListener, Inject, Input, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input() tooltipText: string = '';

  private tooltipComponent?: ComponentRef<any>;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.tooltipComponent) {
      this.tooltipComponent = this.viewContainerRef.createComponent(TooltipComponent);
      this.document.body.appendChild(this.tooltipComponent.location.nativeElement);
      this.setTooltipComponentProperties();
      this.tooltipComponent.hostView.detectChanges();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.tooltipComponent) {
      this.appRef.detachView(this.tooltipComponent.hostView);
      this.tooltipComponent.destroy();
      this.tooltipComponent = undefined;
    }
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document, 
  ) {}

  private setTooltipComponentProperties() {
    if (this.tooltipComponent) {
      this.tooltipComponent.instance.text = this.tooltipText;
      const {
        left,
        right,
        bottom,
      } = this.elementRef.nativeElement.getBoundingClientRect();
      this.tooltipComponent.instance.left = (right - left) / 2 + left;
      this.tooltipComponent.instance.top = bottom;
    }
  }
}
