import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  @Input() text: string = '';
  @HostBinding('style.left.px') @Input() left: number = 0;
  @HostBinding('style.top.px') @Input() top: number = 0;
}
