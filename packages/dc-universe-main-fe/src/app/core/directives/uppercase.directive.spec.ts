import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UppercaseDirective } from './uppercase.directive';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UppercaseDirective],
  template: `<input type="text" [formControl]="name" appUppercase />`
})
class TestHostComponent {
  name = new FormControl('');
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent, UppercaseDirective]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should convert input text to uppercase', () => {
    const input: HTMLInputElement = inputEl.nativeElement;

    input.value = 'wonder woman';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    
    expect(input.value).toBe('WONDER WOMAN');
  });

  it('should preserve cursor position after uppercase', () => {
    const inputNativeEl: HTMLInputElement = inputEl.nativeElement;

    inputNativeEl.value = 'wonder woman';
    inputNativeEl.setSelectionRange(5, 5);
    inputNativeEl.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(inputNativeEl.selectionStart).toBe(5);
    expect(inputNativeEl.selectionEnd).toBe(5);
  });
});
