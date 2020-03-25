import { Directive,HostListener,ElementRef } from '@angular/core';

@Directive({
  selector: '[appActiveBtn]'
})
export class ActiveBtnDirective {

  constructor(private elementRef:ElementRef) { }

  @HostListener('focus')onfocus(){
    this.elementRef.nativeElement.style.color = 'green';
  }

  @HostListener('blur')onblur(){
    this.elementRef.nativeElement.style.color = 'initial';
  }

}
