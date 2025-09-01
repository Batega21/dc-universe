const express = require('express');
const cors = require('cors');
const logger = require('./logger');
let counter = 0;

const app = express();
const port = process.env.PORT || 3000;
const { readHeroesFromFile, writeHeroesToFile, heroesOriginalData } = require('./helpers/file-manager');

app.use(cors({ origin: 'http://localhost:4200' }));
app.use('/img', express.static('./public/img'));
app.use(express.json());

// Endpoint to fetch a superhero by name - getHeroByName(name: string)
app.get('/superheroes/hero', async (req, res) => {
  const heroName = req.query.name;
  const heroNameDecoded = decodeURIComponent(heroName);
  let message = '';
  logger.log(`Fetching hero with name: ${heroNameDecoded}`);
  if (!heroNameDecoded || typeof heroNameDecoded !== 'string') {
    message = 'Invalid hero name';
    logger.error(message);
    return res.status(400).json({ error: message });
  }
  if (heroNameDecoded.length < 3) {
    message = 'Hero name must be at least 3 characters long';
    logger.error(message);
    return res.status(400).json({ error: message });
  }
  if (heroNameDecoded.length > 50) {
    message = 'Hero name must be less than 50 characters long';
    logger.error(message);
    return res.status(400).json({ error: message });
  }
  if (!/^[a-zA-Z0-9 ]+$/.test(heroNameDecoded)) {
    message = 'Hero name can only contain alphanumeric characters and spaces';
    logger.error(message);
    return res.status(400).json({ error: message });
  }

  logger.log(`Searching for hero with name: ${heroNameDecoded}`);

  const heroes = await readHeroesFromFile();
  const hero = heroes.find((hero) => hero.name.toLowerCase() == heroNameDecoded.toLowerCase());
  if (hero) {
    res.json(hero);
  } else {
    message = 'Hero not found';
    logger.error(message);
    res.status(404).json({ error: message });
  }
});

// Endpoint to search superheroes by name - getHeroesByName()
app.get('/superheroes/search', async (req, res) => {
  const query = req.query.name;
  logger.log(query);

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }
  logger.log(`---- Searching for Heroes with query: ${query} -----`);

  const heroes = await readHeroesFromFile();
  const heroesByName = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(query.toLowerCase())
  );
  if (heroesByName.length > 0) {
    res.json(heroesByName);
  } else {
    const message = 'No heroes found';
    logger.error(message);
    res.status(404).json({ error: message });
  }
});

app.get('/superheroes/pagination', async (req, res) => {
  logger.log(`Fetching heroes with pagination ${counter}`);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const heroes = await readHeroesFromFile();
  const heroesPaginated = heroes.slice(startIndex, endIndex);
  const heroesCount = heroes.length;
  let message = '';
  logger.log(`Fetching heroes for page ${page} with limit ${limit} - ${new Date().toISOString()}`);

  if (page < 1 || limit < 1) {
    message = 'Invalid page or limit';
    logger.error(message);
    return res.status(400).json({ error: message });
  }
  if (page > Math.ceil(heroesCount / limit)) {
    message = 'Page not found';
    logger.error(message);
    return res.status(404).json({ error: message });
  }
  if (limit > heroesCount) {
    message = 'Limit exceeds total heroes';
    logger.error(message);
    return res.status(400).json({ error: message });
  }
  if (startIndex > heroesCount) {
    message = 'Start index exceeds total heroes';
    logger.error(message);
    return res.status(404).json({ error: message });
  }
  if (heroesPaginated.length > 0) {
    counter++;
    logger.log(`Found ${heroesPaginated.length} heroes`);
    logger.log(`Total heroes: ${heroesCount}`);
    logger.log(`Endpoint called ${counter} times`);
    return res.json({ heroes: heroesPaginated, heroesCount });
  } else {
    const message = 'No heroes found';
    logger.error(message);
    return res.status(404).json({ error: message });
  }
});

app.get('/superheroes/by-names', async (req, res) => {
  const namesDecoded = decodeURIComponent(req.query.name);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let message = '';
  logger.log(`Fetching heroes: ${namesDecoded}`);

  if (!namesDecoded || typeof namesDecoded !== 'string') {
    message = 'Invalid names parameter';
    logger.error(message);
    return res.status(400).json({ error: message });
  }
  if (namesDecoded.length < 3) {
    message = 'Team name must be at least 3 characters long';
    logger.error(message);
    return res.status(400).json({ error: message });
  }
  if (namesDecoded.length > 100) {
    message = 'The hero list must be less than 100 characters long';
    logger.error(message);
    return res.status(400).json({ error: message });
  }

  const searchNames = namesDecoded.split(',');
  const heroes = await readHeroesFromFile();
  const heroesMatched = heroes.filter((hero) =>
    searchNames.some((name) => hero.name.toLowerCase() === name.toLowerCase())
  );
  const heroesByName = heroesMatched.slice(startIndex, endIndex);
  const heroesCount = heroesMatched.length;

  if (heroesByName.length > 0) {
    logger.log(`Found ${heroesByName.length} heroes`);
    logger.log(`Total heroes: ${heroesCount}`);
    return res.json({ heroes: heroesByName, heroesCount });
  } else {
    message = 'No heroes found';
    logger.error(message);
    res.status(404).json({ error: message });
  }
});

// CRUD operations for heroes
// Endpoint to Create a new superhero - addHero(hero: Hero)
app.post('/superheroes', async (req, res) => {
  try {
    const heroes = await readHeroesFromFile();
    const newHero = req.body;
    logger.log("🚀 Adding a newHero:", newHero);
    logger.log(`API called - ${counter} times`);
    if (!newHero || !newHero.name || !newHero.realName) {
      return res.status(400).json({ error: 'Name and Real name properties are required' });
    }
    
    const maxId = heroes.reduce((max, hero) => hero.id > max ? hero.id : max, 0);
    newHero.id = maxId + 1;

    heroes.unshift(newHero);
    await writeHeroesToFile(heroes);
    logger.log(`Added new hero: ${newHero.name}`);
    res.status(201).json(newHero);    
  } catch (error) {
    res.status(500).json({ error: 'Failed to add hero' });
    logger.error('Error adding hero:', error);
  }
});

// Endpoint to Read all superheroes - getHeroes()
app.get('/superheroes', async (req, res) => {
  logger.log('Fetching all superheroes');
  const heroes = await readHeroesFromFile();
  if (!heroes || heroes.length === 0) {
    const message = 'Heroes not found';
    logger.error(message);
    res.status(404).json({ error: message });
  } else {
    res.json(heroes);
  }
});

// Endpoint to Read a superhero by ID - getHeroById(id: string)
app.get('/superheroes/:id', async (req, res) => {
  const heroId = parseInt(req.params.id);
  if (isNaN(heroId) || heroId < 1) {
    const message = heroId < 1 ? 'Hero ID must be a positive integer' : 'Invalid hero ID';
    logger.error(message);
    return res.status(400).json({ error: message });
  }

  const heroes = await readHeroesFromFile();
  const hero = heroes.find((hero) => hero.id === heroId);
  logger.log(`Fetching hero with ID: ${heroId}`);

  if (hero) {
    logger.log(`Found hero: ${hero.name}`);
    res.json(hero);
  } else {
    const message = 'Hero not found';
    logger.error(message);
    res.status(404).json({ error: message });
  }
});


// Endpoint to Update a superhero by ID - updateHero(id: string, hero: Hero)
app.put('/superheroes/:id', async (req, res) => {
  const heroId = parseInt(req.params.id);
  const heroNewData = { ...req.body };
  const heroes = await readHeroesFromFile();
  const index = heroes.findIndex((hero) => hero.id === heroId);
  if (index === -1) {
    return res.status(404).json({ error: 'Hero not found' });
  }
  if (!heroNewData || !heroNewData.name || !heroNewData.realName) {
    return res.status(400).json({ error: 'Name and Real Name are required' });
  }
  if (heroNewData.id && heroNewData.id !== heroId) {
    return res.status(400).json({ error: 'ID cannot be changed' });
  }
  const updatedHero = { ...heroes[index], ...heroNewData, id: heroId };
  heroes[index] = updatedHero;
  await writeHeroesToFile(heroes);
  logger.log(`Updated hero with ID: ${heroId}`);
  res.json(updatedHero);
});

// Endpoint to Delete a superhero by ID - deleteHero(id: string)
app.delete('/superheroes/:id', async (req, res) => {
  try {
    let heroes = await readHeroesFromFile();
    const heroId = parseInt(req.params.id);
    logger.log(`Deleting hero with ID: ${heroId}`);
    if (!heroId || isNaN(heroId)) {
      return res.status(400).json({ error: 'Invalid hero ID' });
    }
    if (heroId < 1) {
      return res.status(400).json({ error: 'Hero ID must be a positive integer' });
    }

    const index = heroes.findIndex((hero) => hero.id === heroId);
    if (index === -1) {
      return res.status(404).json({ error: 'Hero not found' });
    } else {
      const deletedHero = heroes.splice(index, 1)[0];
      await writeHeroesToFile(heroes);
      logger.log(`Deleted hero: ${deletedHero.name}`);
      res.json({ message: `Hero with ID ${heroId} deleted successfully`, hero: deletedHero });
    }
  } catch (error) {
    logger.error('Error deleting hero:', error);
    res.status(500).json({ error: 'Failed to delete hero' });
  }
});

// Endpoint to reset the heroes data from backup JSON file - resetHeroes()
app.post('/superheroes/reset', async (req, res) => {
  logger.log('Resetting heroes data from backup file');
  try {
    const heroes = await heroesOriginalData();
    if (heroes.length === 0) {
      return res.status(404).json({ error: 'No heroes Data to reset' });
    }
    await writeHeroesToFile(heroes);
    logger.log('Heroes data has been reset successfully');
    res.json({ heroes: heroes, heroesCount: heroes.length });
  } catch (error) {
    logger.error('Error resetting heroes:', error);
    res.status(500).json({ error: 'Failed to reset heroes' });
  }
});

app.listen(port, () => {
  logger.debug(`Proxy server listening on port ${port}`);
});
