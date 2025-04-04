import { ApplicationRef, ComponentRef, Directive, ElementRef, Host, HostListener, Inject, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnDestroy {
  private tooltipComponent?: ComponentRef<TooltipComponent>;

  @Input() tooltipText: string = '';
  @Input() type: 'hover' | 'click' = 'hover';

  @HostListener('click')
  onMouseClick(): void {
    this.type === 'click' && this.destroyTooltip();
  }

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

  ngOnDestroy(): void {
    this.destroyTooltip();
  }

  private setTooltipComponentProperties(): void {
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

  private destroyTooltip(): void {
    if (this.tooltipComponent) {
      this.tooltipComponent.destroy();
      this.tooltipComponent = undefined
    }
  }
}
