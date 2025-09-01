import { Injectable, NotFoundException } from '@nestjs/common';
import { Hero } from './heroes.entity';

@Injectable()
export class HeroesService {
  private heroes: Hero[] = [
    {
      id: 1,
      name: 'Superman',
      realName: 'Clark Kent',
      alias: 'Man of Steel',
      alignment: 'Hero',
      team: 'Justice League',
      powers: [
        'Super Strength',
        'Flight',
        'X-Ray Vision',
        'Heat Vision',
        'Invulnerability',
      ],
      origin: 'Krypton',
      firstAppearance: 'Action Comics #1 (1938)',
      imageUrl: '/img/superman.png',
    },
    {
      id: 2,
      name: 'Batman',
      realName: 'Bruce Wayne',
      alias: 'The Dark Knight',
      alignment: 'Hero',
      team: 'Justice League',
      powers: [
        'Genius Intellect',
        'Martial Arts',
        'Stealth',
        'High-Tech Gadgets',
      ],
      origin: 'Gotham City',
      firstAppearance: 'Detective Comics #27 (1939)',
      imageUrl: '/img/batman.png',
    },
    {
      id: 3,
      name: 'Wonder Woman',
      realName: 'Diana Prince',
      alias: 'Amazon Princess',
      alignment: 'Hero',
      team: 'Justice League',
      powers: [
        'Super Strength',
        'Flight',
        'Combat Skills',
        'Lasso of Truth',
        'Immortality',
      ],
      origin: 'Themyscira',
      firstAppearance: 'All Star Comics #8 (1941)',
      imageUrl: '/img/wonder_woman.png',
    },
  ];

  findAll() {
    return this.heroes;
  }

  findAllPaginated(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.heroes.slice(start, end);
  }

  findOne(id: string) {
    const hero = this.heroes.find((hero) => hero.id === Number(id));
    if (!hero) {
      throw new NotFoundException('Hero not found');
    }
    return hero;
  }

  create(body: any) {
    const newHero = { id: Date.now().toString(), ...body };
    this.heroes.push(newHero);
    return newHero;
  }

  update(id: string, body: any) {
    const heroIndex = this.heroes.findIndex((hero) => hero.id === Number(id));
    if (heroIndex === -1) {
      return null;
    }
    this.heroes[heroIndex] = {
      ...this.heroes[heroIndex],
      ...body,
    };
    return this.heroes[heroIndex];
  }

  remove(id: string) {
    const heroIndex = this.heroes.findIndex((hero) => hero.id === Number(id));
    if (heroIndex === -1) {
      return null;
    }
    this.heroes.splice(heroIndex, 1);
    return { id };
  }
}
