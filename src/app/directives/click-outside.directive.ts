import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { IBirthday } from '../birthday/birthday';
import { IGroup } from '../group/group';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<any>()
  @Input() object?: IBirthday | IGroup
  @Input() optionObject?: IBirthday | IGroup

  constructor(private el: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const clickedInside = this.el.nativeElement.contains(event.target)
    
    if (!clickedInside && this.object === this.optionObject) {
      this.clickOutside.emit();
    }
  }
}
