import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDialog } from './dialog.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroService } from '../../core/services/hero.service';
import { HeroesStore } from '../../state/hero.store';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideRouter, RouterLink } from '@angular/router';
import { HEROES_MOCK } from '../../core/constant/heroes.constant';

describe('HeroDialog', () => {
  let component: HeroDialog;
  let fixture: ComponentFixture<HeroDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroDialog,
        RouterLink,
      ],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        HeroService,
        HeroesStore,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => ({
                subscribe: (callback: (result: { name: string; power: string }) => void) => {
                  callback({ name: 'Test Hero', power: 'Test Power' });
                },
              }),
            }),
          }
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit false and close dialog on onNoClick', () => {
    const closeSpy = jasmine.createSpy('close');
    const emitSpy = spyOn(component.confirmed, 'emit');
    (component as HeroDialog).dialogRef.close = closeSpy;

    component.onNoClick();

    expect(closeSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should emit true and close dialog on onConfirm', () => {
    const closeSpy = jasmine.createSpy('close');
    const emitSpy = spyOn(component.confirmed, 'emit');
    (component as HeroDialog).dialogRef.close = closeSpy;
    (component as HeroDialog).data.hero = HEROES_MOCK[0];
    (component as HeroDialog).data.actionType = 'edit';
    const updateHeroSpy = spyOn((component as HeroDialog).store, 'updateHero');

    component.onConfirm();

    expect(updateHeroSpy).toHaveBeenCalledWith(
      {
        id: 1,
        name: 'Superman',
        alias: 'Man of steel',
        powers: ['Super strength'],
        firstAppearance: '1938',
        alignment: 'Good',
        team: 'Justice League',
        realName: 'Kal-El',
        origin: 'Krypton',
        imageUrl: 'img/superman.jpg',
      });
    expect(emitSpy).toHaveBeenCalledWith(true);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should call addHero if actionType is add on onConfirm', () => {
    const closeSpy = jasmine.createSpy('close');
    const emitSpy = spyOn(component.confirmed, 'emit');
    (component as HeroDialog).dialogRef.close = closeSpy;
    (component as HeroDialog).data.hero = HEROES_MOCK[0];
    (component as HeroDialog).data.actionType = 'edit';
    const addHeroSpy = spyOn((component as HeroDialog).store, 'addHero');

    component.onConfirm();

    expect(addHeroSpy).toHaveBeenCalledWith(
      {
        id: 1,
        name: 'Superman',
        alias: 'Man of steel',
        powers: ['Super strength'],
        firstAppearance: '1938',
        alignment: 'Good',
        team: 'Justice League',
        realName: 'Kal-El',
        origin: 'Krypton',
        imageUrl: 'img/superman.jpg',
      });
    expect(emitSpy).toHaveBeenCalledWith(true);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should only emit true and close dialog if no hero is provided on onConfirm', () => {
    const closeSpy = jasmine.createSpy('close');
    const emitSpy = spyOn(component.confirmed, 'emit');
    (component as HeroDialog).dialogRef.close = closeSpy;
    (component as HeroDialog).data.hero = HEROES_MOCK[0];
    (component as HeroDialog).data.actionType = 'edit';
    const updateHeroSpy = spyOn((component as HeroDialog).store, 'updateHero');
    const addHeroSpy = spyOn((component as HeroDialog).store, 'addHero');

    component.onConfirm();

    expect(updateHeroSpy).not.toHaveBeenCalled();
    expect(addHeroSpy).not.toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(true);
    expect(closeSpy).toHaveBeenCalled();
  });
});
