import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ResponsiveLayoutService } from 'src/app/core/services/responsive-layout.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * @description this directive based on the responsivenss adds or removes the mobile css class to an element
 */
@Directive({
  selector: '[appAddMobileClass]',
  standalone: true,
})
export class AddMobileClassDirective {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private responsiveLayout: ResponsiveLayoutService
  ) {
    this.responsiveLayout.isSmallDevice$
      .pipe(takeUntilDestroyed())
      .subscribe((isSmall) => {
        if (isSmall) {
          this.renderer.addClass(this.elementRef.nativeElement, 'mobile');
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, 'mobile');
        }
      });
  }
}
