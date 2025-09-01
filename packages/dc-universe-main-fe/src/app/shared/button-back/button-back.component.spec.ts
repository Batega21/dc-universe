import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBackComponent } from './button-back.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { HeroesStore } from '../../state/hero.store';
import { provideHttpClient } from '@angular/common/http';

describe('ButtonBackComponent', () => {
  let component: ButtonBackComponent;
  let fixture: ComponentFixture<ButtonBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonBackComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HeroesStore,
        { provide: ActivatedRoute, 
          useValue: { 
            params: { subscribe: (fn: (value: Record<string, unknown>) => void) => fn({}) }, 
            snapshot: { paramMap: { get: () => null } } 
          }
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
