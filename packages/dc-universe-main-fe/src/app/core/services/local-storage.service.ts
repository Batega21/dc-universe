import { Injectable } from '@angular/core';
import { Hero, HeroesPaginated } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public key = 'heroes';

  public addHeroesInStorage(heroData: HeroesPaginated): void {
    heroData?.heroes?.forEach(hero => {
      if (hero && hero.id) {
        this.addHeroToStorage(hero);
      } else {
        console.error('Hero data is invalid:', hero);
      }
    });
  }

  private updateLocalStorage(heroesPaginated: HeroesPaginated): void {
    localStorage.setItem(this.key, JSON.stringify(heroesPaginated));
  }

  public addHeroToStorage(hero: Hero): void {
    const localHeroes = this.getStoredHeroesByKey(this.key) || { heroes: [], heroesCount: 0 };
    
    if (this.isHeroInStorage(hero.id)) {
      console.warn(`Hero with id ${hero.id} already exists in local storage.`);
      return;
    }

    localHeroes.heroes.push(hero);
    this.updateLocalStorage(localHeroes);
  }

  public getLocalHeroesPaginated(page: number, pageSize: number): HeroesPaginated | null {
    const localHeroes = this.getStoredHeroesByKey(this.key) || { heroes: [], heroesCount: 0 };
    const startIndex = (page - 1) * pageSize;

    if (localHeroes.heroesCount > 0) {
      const heroes = localHeroes['heroes'].slice(startIndex, startIndex + pageSize);
      const addHeroesInStorage: HeroesPaginated = {
        heroes: heroes,
        heroesCount: localHeroes.heroesCount
      }
      return addHeroesInStorage;
    } else {
      return null;
    }
  }

  public updateStorage(hero: Hero): void {
    const localHeroes = this.getStoredHeroesByKey(this.key) || { heroes: [], heroesCount: 0 };
    if (this.isHeroInStorage(hero.id)) {
      const updatedHeroes = localHeroes.heroes.map(localHero => localHero.id === hero.id ? hero : localHero);
      localHeroes.heroes = updatedHeroes;
    } else {
      localHeroes.heroes.unshift(hero);
      localHeroes.heroesCount = localHeroes.heroes.length;
    }
    this.updateLocalStorage(localHeroes);
  }

  public getStoredHeroesByKey(key: string): HeroesPaginated | null {
    if (key && key === this.key) {
      const storedHeroes: HeroesPaginated = JSON.parse(localStorage.getItem(key) as string) || null;
      if (!storedHeroes) {
        return null;
      } else {
        return storedHeroes;
      }
    } else {
      return null;
    }
  }

  public deleteHeroFromStorage(id: number): void {
    if (id && this.isHeroInStorage(id)) {
      const localHeroes = this.getStoredHeroesByKey(this.key) || { heroes: [], heroesCount: 0 };
      const updatedHeroes = localHeroes.heroes.filter(hero => hero.id !== id);
      localHeroes.heroes = updatedHeroes;
      localHeroes.heroesCount = updatedHeroes.length;
      this.updateLocalStorage(localHeroes);
    } else {
      console.warn(`Hero with id:${id} does not exist in local storage.`);
    }
  }

  private isHeroInStorage(id: number): boolean {
    const localHeroes = this.getStoredHeroesByKey(this.key) || { heroes: [], heroesCount: 0 };
    const isHero = localHeroes.heroes.some(hero => hero.id === id);
    return isHero;
  }
}
