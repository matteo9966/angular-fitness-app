import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appComponentHost]',
  standalone: true,
})
export class ComponentHostDirective {
  viewContainerRef = inject(ViewContainerRef);
  constructor() {}
}
