import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {
  private el: ElementRef = inject(ElementRef<HTMLInputElement>);
  private control: NgControl = inject(NgControl);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const value = inputElement.value;
    const upperCaseValue = value.toUpperCase();

    if (this.control && this.control.control) {
      this.control.control.setValue(upperCaseValue, { emitEvent: false });
    } else {
      inputElement.value = upperCaseValue;
    }


    inputElement.value = upperCaseValue;

    inputElement.setSelectionRange(start, end);
  }
}
