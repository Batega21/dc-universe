import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HeroesStore } from './hero.store';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroService } from '../core/services/hero.service';
import { Hero } from '../core/interfaces/hero';
import { of, throwError } from 'rxjs';
import { Pagination } from '../core/enums/pagination.enum';
import { HEROES_MOCK } from '../core/constant/heroes.constant';
import { LocalStorageService } from '../core/services/local-storage.service';

describe('HeroStore', () => {
  let service: HeroService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: HeroesStore,
          useClass: HeroesStore,
        },
        {
          provide: HeroService,
          useValue: {
            getHeroes: jasmine
              .createSpy('getHeroes')
              .and.returnValue(of(HEROES_MOCK)),
            getHeroById: jasmine
              .createSpy('getHeroById')
              .and.returnValue(of(HEROES_MOCK[0])),
            getHeroesPaginated: jasmine
              .createSpy('getHeroesPaginated')
              .and.returnValue(
                of({
                  heroes: HEROES_MOCK,
                  totalCount: HEROES_MOCK.length,
                })
              ),
            getHeroesByQueryParams: jasmine
              .createSpy('getHeroesByQueryParams')
              .and.returnValue(of(HEROES_MOCK)),
            getHeroesByNames: jasmine
              .createSpy('getHeroesByNames')
              .and.returnValue(
                of({
                  heroes: (HEROES_MOCK as Hero[]).slice(0, Pagination.DEFAULT_LIMIT),
                  totalCount: HEROES_MOCK.length,
                })
              ),
            addHero: jasmine
              .createSpy('addHero')
              .and.returnValue(of(HEROES_MOCK[0])),
            updateHero: jasmine
              .createSpy('updateHero')
              .and.returnValue(of(HEROES_MOCK[0])),
            deleteHero: jasmine
              .createSpy('deleteHero')
              .and.returnValue(of(HEROES_MOCK[0])),
          },
        },
        {
          provide: LocalStorageService,
          useValue: {
            getLocalHeroesPaginated: jasmine
              .createSpy('getLocalHeroesPaginated')
              .and.returnValue(null),
            addHeroesInStorage: jasmine.createSpy('addHeroesInStorage'),
            getLocalHeroes: jasmine.createSpy('getLocalHeroes').and.returnValue(null),
            removeHeroesFromStorage: jasmine.createSpy('removeHeroesFromStorage'),
            addHeroToStorage: jasmine
              .createSpy('addHeroToStorage'),
          },
        }
      ],
    });
    service = TestBed.inject(HeroService);
    localStorageService = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    const store = TestBed.inject(HeroesStore);
    expect(store).toBeTruthy();
  });

  it('should fetch Heroes Paginated and update the state', fakeAsync(() => {
    const store = TestBed.inject(HeroesStore);
    const pageIndex = Pagination.DEFAULT_PAGE;
    const pageSize = Pagination.DEFAULT_LIMIT;
    
    (service.getHeroesPaginated as jasmine.Spy).and
      .returnValue(of({ heroes: HEROES_MOCK, heroesCount: HEROES_MOCK.length }));
    store.getHeroesPaginated(pageIndex, pageSize);

    tick(1000);

    expect(service.getHeroesPaginated).toHaveBeenCalledWith(pageIndex, pageSize);
    expect(store.heroes()).toEqual(HEROES_MOCK.slice(pageIndex - 1, pageSize));
    expect(store.heroesCount()).toBe(HEROES_MOCK.length);
    expect(store.loading()).toBeFalse();
    expect(store.initialLoad()).toBeTrue();
    }
  ));

  it('should handle error when fetching Heroes Paginated', () => {
    const store = TestBed.inject(HeroesStore);
    const pageIndex = Pagination.DEFAULT_PAGE;
    const pageSize = Pagination.DEFAULT_LIMIT;
    
    (service.getHeroesPaginated as jasmine.Spy).and.returnValue(
      throwError(() => new Error())
    );
    store.getHeroesPaginated(pageIndex, pageSize);

    expect(service.getHeroesPaginated).toHaveBeenCalledWith(pageIndex, pageSize);
    expect(store.heroes()).toEqual([]);
    expect(store.heroesCount()).toBe(0);
    expect(store.error()).toBe(`Error fetching heroes from API: ${new Error()}`);
    expect(store.loading()).toBeFalse();
    expect(store.initialLoad()).toBeFalse();
    expect(store.selectedHero()).toEqual({} as Hero);
  });
  
  it('should fetch heroes by name and update the state', fakeAsync(() => {
    const store = TestBed.inject(HeroesStore);
    const heroesName = ['Superman', 'Batman'];

    (localStorageService.getLocalHeroesPaginated as jasmine.Spy).and.returnValue(null);
    (service.getHeroesByNames as jasmine.Spy).and
      .returnValue(of({ heroes: HEROES_MOCK, totalCount: HEROES_MOCK.length }));
    store.getHeroesByNames(heroesName);

    tick(1000);
    
    expect(service.getHeroesByNames).toHaveBeenCalledWith(heroesName);
    expect(store.heroes()).toEqual(HEROES_MOCK);
  }));
  
  it('should fail when fetching heroes by name and handle error', () => {
    const store = TestBed.inject(HeroesStore);
    const heroesName = ['Superman', 'Batman'];

    (service.getHeroesByNames as jasmine.Spy).and.returnValue(throwError(() => new Error()));
    store.getHeroesByNames(heroesName);
    
    expect(service.getHeroesByNames).toHaveBeenCalledWith(heroesName);
    expect(store.error()).toBe(`Error fetching heroes from API: ${new Error()}`);
    expect(store.heroes()).toEqual([]);
  });

  it('should fetch a hero by Id from API', fakeAsync(() => {
    const store = TestBed.inject(HeroesStore);
    const heroId = 1;
    (localStorageService.getLocalHeroesPaginated as jasmine.Spy).and.returnValue(null);
    (service.getHeroById as jasmine.Spy).and.returnValue(of(HEROES_MOCK[0]));

    store.getHeroById(heroId);
    tick(1000);

    expect(service.getHeroById).toHaveBeenCalledWith(heroId);
    expect(store.selectedHero()).toEqual(HEROES_MOCK[0]);
    expect(store).toBeTruthy();
  }));

  it('should fetch a hero by Id from local storage', fakeAsync(() => {
    const store = TestBed.inject(HeroesStore);
    const heroId = 1;
    const storageHeroes = {
      heroes: HEROES_MOCK,
      heroesCount: HEROES_MOCK.length,
    };
    const heroLocal = storageHeroes.heroes.find((hero: Hero) => hero.id === heroId);
    
    
    (localStorageService.getLocalHeroesPaginated as jasmine.Spy).and.returnValue(storageHeroes);
    (service.getHeroById as jasmine.Spy).and.returnValue(of(HEROES_MOCK[0]));
    store.getHeroById(heroId);
    
    tick(1000);
    
    expect(heroLocal).toEqual(HEROES_MOCK[0]);
    expect(heroLocal?.id).toEqual(HEROES_MOCK[0].id);
    expect(service.getHeroById).toHaveBeenCalledWith(heroId);
    expect(store.selectedHero()).toEqual(HEROES_MOCK[0]);
    expect(store.loading()).toBeFalse();
  }));

  it('should handle error when fetching a hero by Id', () => {
    const store = TestBed.inject(HeroesStore);
    const heroId = 999;

    (localStorageService.getLocalHeroesPaginated as jasmine.Spy).and.returnValue(null);
    (service.getHeroById as jasmine.Spy).and.returnValue(throwError(() => new Error('Hero not found')));
    
    store.getHeroById(heroId);

    expect(service.getHeroById).toHaveBeenCalledWith(heroId);
    expect(store.error()).toBe(`Error fetching hero from API: ${new Error('Hero not found')}`);
    expect(store.selectedHero()).toEqual({} as Hero);
  });

  it('should add a hero and update the state', fakeAsync(() => {
    const store = TestBed.inject(HeroesStore);
    const newHero: Hero = {
      id: HEROES_MOCK.length + 1,
      name: 'Test Hero',
      alias: 'Test Alias',
      powers: ['Super strength', 'Flight'],
      firstAppearance: '2025',
      alignment: 'Good',
      team: 'Justice League',
      realName: 'Test Real Name',
      origin: 'Test Origin',
      imageUrl: 'img/placeholder.jpg',
    };
    (service.addHero as jasmine.Spy).and.returnValue(of(newHero));

    store.addHero(newHero);
    tick(1000);

    expect(service.addHero).toHaveBeenCalledWith(newHero);
  }
  ));

  it('should handle error when adding a hero', () => {
    const store = TestBed.inject(HeroesStore);
    const newHero: Hero = {
      id: HEROES_MOCK.length + 1,
      name: 'Test Hero',
      alias: 'Test Alias',
      powers: ['Super strength', 'Flight'],
      firstAppearance: '2025',
      alignment: 'Good',
      team: 'Justice League',
      realName: 'Test Real Name',
      origin: 'Test Origin',
      imageUrl: 'img/placeholder.jpg',
    };


    (service.addHero as jasmine.Spy).and.returnValue(throwError(() => new Error('Error adding hero')));

    store.addHero(newHero);

    expect(service.addHero).toHaveBeenCalledWith(newHero);
    expect(store.error()).toBe(`Error adding hero: ${new Error('Error adding hero')}`);
    expect(store.selectedHero()).toEqual({} as Hero);
  });

  it('should update a hero and update the state', fakeAsync(() => {
    const store = TestBed.inject(HeroesStore);
    const heroToUpdate: Hero = { ...HEROES_MOCK[0], name: 'Updated Hero' };
    const storageHeroes = {
      heroes: HEROES_MOCK.map(hero => hero.id === heroToUpdate.id ? heroToUpdate : hero),
      heroesCount: HEROES_MOCK.length,
    };

    (localStorageService.getStoredHeroesByKey as jasmine.Spy).and.returnValue(storageHeroes);
    (localStorageService.addHeroesInStorage as jasmine.Spy).and.callThrough();
    (service.updateHero as jasmine.Spy).and.returnValue(of(heroToUpdate));

    store.updateHero(heroToUpdate);
    tick(1000);

    const updatedHero = storageHeroes['heroes'].find(hero => hero.id === heroToUpdate.id);
    expect(updatedHero?.name).toBe('Updated Hero');
    expect(service.updateHero).toHaveBeenCalledWith(heroToUpdate);
    expect(store.selectedHero()).toEqual(heroToUpdate);
  }));

  it('should handle error when updating a hero', () => {
    const store = TestBed.inject(HeroesStore);
    const updatedHero: Hero = { ...HEROES_MOCK[0], name: 'Updated Hero' };

    (service.updateHero as jasmine.Spy).and.returnValue(throwError(() => new Error('Error updating hero')));

    store.updateHero(updatedHero);

    expect(service.updateHero).toHaveBeenCalledWith(updatedHero);
    expect(store.error()).toBe(`Error updating hero: ${new Error('Error updating hero')}`);
    expect(store.selectedHero()).toEqual({} as Hero);
  });

  it('should delete a hero and update the state', fakeAsync(() => {
    const store = TestBed.inject(HeroesStore);
    const heroId = HEROES_MOCK[0].id;

    const mockStorageData: { heroes: Hero[]; heroesCount: number } | null = JSON.parse(JSON.stringify({
      heroes: HEROES_MOCK,
      heroesCount: HEROES_MOCK.length,
    }));

    (service.deleteHero as jasmine.Spy).and.returnValue(of(null));
    (localStorageService.getStoredHeroesByKey as jasmine.Spy).and.returnValue(mockStorageData);

    store.deleteHero(heroId);
    tick(1000);

    expect(service.deleteHero).toHaveBeenCalledWith(heroId);
    expect(localStorageService.deleteHeroFromStorage).toHaveBeenCalledWith(heroId);
    expect(localStorageService.getStoredHeroesByKey).toHaveBeenCalledWith('heroes');
  }));

  it('should handle error when deleting a hero', () => {
    const store = TestBed.inject(HeroesStore);
    const heroId = HEROES_MOCK[0].id;

    (service.deleteHero as jasmine.Spy).and.returnValue(throwError(() => new Error()));
    
    store.deleteHero(heroId);

    expect(service.deleteHero).toHaveBeenCalledWith(heroId);
    expect(store.error()).toBe(`Error deleting hero: ${new Error()}`);
    expect(store.selectedHero()).toEqual({} as Hero);
  });

});
