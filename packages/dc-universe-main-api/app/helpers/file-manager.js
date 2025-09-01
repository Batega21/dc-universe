const fs = require('fs').promises;
const path = require('path');
const heroesFilePath = path.join(__dirname, '../heroes-data.json');
const heroesOriginalFilePath = path.join(__dirname, '../heroes-data-backup.json');
const logger = require('../logger');

const readHeroesFromFile = async () => {
  try {
    const data = await fs.readFile(heroesFilePath, 'utf8');
    if (data.trim() === '') {
      logger.warn('Heroes file is empty, returning an empty array');
      return [];
    }
    const heroes = JSON.parse(data);
    return heroes;
  } catch (error) {
    if (error.code === 'ENOENT') {
      logger.error('Heroes file not found, returning an empty array');
      return [];
    }
    if (error.name === 'SyntaxError') {
      logger.error('Heroes file contains invalid JSON, returning an empty array');
      return [];
    }
    logger.error('Error reading heroes from file:', error);
    throw error;    
  }
}

const writeHeroesToFile = async (heroes) => {
  try {
    const data = JSON.stringify(heroes, null, 2);
    await fs.writeFile(heroesFilePath, data, 'utf8');
  } catch (error) {
    logger.error('Error writing heroes to file:', error);
    throw error;
  }
};

const heroesOriginalData = async () => {
  try {
    const data = await fs.readFile(heroesOriginalFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    logger.error('Error reading original heroes data:', error);
    throw error;
  }
}

module.exports = {
  readHeroesFromFile,
  writeHeroesToFile,
  heroesOriginalData
};