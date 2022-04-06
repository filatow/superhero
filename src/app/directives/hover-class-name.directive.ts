import { AfterViewInit, Directive, ElementRef,HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverClassName]'
})
export class HoverClassNameDirective implements AfterViewInit {
  @Input('appHoverClassName') hoverClassName: string = '';
  initialClassName: string;


  constructor(
    private elemRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.initialClassName = this.elemRef.nativeElement.className;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setAttribute(this.elemRef.nativeElement, 'class', this.hoverClassName);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setAttribute(this.elemRef.nativeElement, 'class', this.initialClassName);
  }
}
