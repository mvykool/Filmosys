import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class appHighLightDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
  }
}
