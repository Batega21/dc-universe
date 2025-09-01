const HEROES_API = [
  {
    id: 1,
    name: 'Superman',
    realName: 'Clark Kent',
    alias: 'Man of Steel',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Super Strength', 'Flight', 'X-Ray Vision', 'Heat Vision', 'Invulnerability'],
    origin: 'Krypton',
    firstAppearance: 'Action Comics #1 (1938)',
    imageUrl: '/img/superman.png'
  },
  {
    id: 2,
    name: 'Batman',
    realName: 'Bruce Wayne',
    alias: 'The Dark Knight',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Genius Intellect', 'Martial Arts', 'Stealth', 'High-Tech Gadgets'],
    origin: 'Gotham City',
    firstAppearance: 'Detective Comics #27 (1939)',
    imageUrl: '/img/batman.png'
  },
  {
    id: 3,
    name: 'Wonder Woman',
    realName: 'Diana Prince',
    alias: 'Amazon Princess',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Super Strength', 'Flight', 'Combat Skills', 'Lasso of Truth', 'Immortality'],
    origin: 'Themyscira',
    firstAppearance: 'All Star Comics #8 (1941)',
    imageUrl: '/img/wonder_woman.png'
  },
  {
    id: 4,
    name: 'The Flash',
    realName: 'Barry Allen',
    alias: 'Scarlet Speedster',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Super Speed', 'Time Travel', 'Phasing', 'Accelerated Healing'],
    origin: 'Central City',
    firstAppearance: 'Showcase #4 (1956)',
    imageUrl: '/img/flash.png'
  },
  {
    id: 5,
    name: 'Green Lantern',
    realName: 'Hal Jordan',
    alias: 'Emerald Knight',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Power Ring', 'Energy Constructs', 'Flight', 'Force Fields'],
    origin: 'Coast City',
    firstAppearance: 'Showcase #22 (1959)',
    imageUrl: '/img/green_lantern.png'
  },
  {
    id: 6,
    name: 'Aquaman',
    realName: 'Arthur Curry',
    alias: 'King of Atlantis',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Underwater Breathing', 'Super Strength', 'Telepathy with Sea Life', 'Trident Mastery'],
    origin: 'Atlantis',
    firstAppearance: 'More Fun Comics #73 (1941)',
    imageUrl: '/img/aquaman.png'
  },
  {
    id: 7,
    name: 'Cyborg',
    realName: 'Victor Stone',
    alias: 'Half-Man, Half-Machine',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Cybernetic Enhancements', 'Technopathy', 'Super Strength', 'Flight', 'Weapons Integration'],
    origin: 'Detroit',
    firstAppearance: 'DC Comics Presents #26 (1980)',
    imageUrl: '/img/cyborg.png'
  },
  {
    id: 8,
    name: 'Martian Manhunter',
    realName: 'J\'onn J\'onzz',
    alias: 'The Martian Detective',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Telepathy', 'Shape-Shifting', 'Invisibility', 'Flight', 'Super Strength'],
    origin: 'Mars',
    firstAppearance: 'Detective Comics #225 (1955)',
    imageUrl: '/img/martian_manhunter.png'
  },
  {
    id: 9,
    name: 'Supergirl',
    realName: 'Kara Zor-El',
    alias: 'Superman\'s Cousin',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Super Strength', 'Flight', 'Heat Vision', 'X-Ray Vision'],
    origin: 'Krypton',
    firstAppearance: 'Superman/Batman #8 (May, 2004)',
    imageUrl: '/img/supergirl.png'
  },
  {
    id: 10,
    name: 'Green Arrow',
    realName: 'Oliver Queen',
    alias: 'Emerald Archer',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Archery', 'Hand-to-Hand Combat', 'Gadgets'],
    origin: 'Star City',
    firstAppearance: 'More Fun Comics #73 (1941)',
    imageUrl: '/img/green_arrow.png'
  },
  {
    id: 11,
    name: 'Black Canary',
    realName: 'Dinah Lance',
    alias: 'Siren of Justice',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Martial Arts', 'Sonic Scream', 'Acrobatics'],
    origin: 'Star City',
    firstAppearance: 'Flash Comics #86 (1947)',
    imageUrl: '/img/black_canary.png'
  },
  {
    id: 12,
    name: 'Plastic Man',
    realName: 'Patrick O\'Brian',
    alias: 'Stretchy Hero',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Elasticity', 'Shape-Shifting', 'Super Strength', 'Regeneration'],
    origin: 'Chicago',
    firstAppearance: 'Police Comics #1 (1941)',
    imageUrl: '/img/plastic_man.png'
  },
  {
    id: 13,
    name: 'Batwoman',
    realName: 'Kate Kane',
    alias: 'The Dark Knight\'s Cousin',
    alignment: 'Hero',
    team: 'Bat Family',
    powers: ['Martial Arts', 'Gadgets', 'Stealth'],
    origin: 'Gotham City',
    firstAppearance: '52 #7 (June, 2006)',
    imageUrl: '/img/batwoman.png'
  },
  {
    id: 14,
    name: 'Hawkman',
    realName: 'Carter Hall',
    alias: 'Winged Warrior',
    alignment: 'Hero',
    team: 'Justice League',
    powers: ['Flight', 'Super Strength', 'Combat Skills', 'Regeneration'],
    origin: 'Thanagar',
    firstAppearance: 'Flash Comics #1 (1940)',
    imageUrl: '/img/hawkman.png'
  }
];

module.exports = {
  HEROES_API
};