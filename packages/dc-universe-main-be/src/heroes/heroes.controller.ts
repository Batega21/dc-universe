import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('heroes') // This controller handles requests related to heroes
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  findAll() {
    // This method retrieves all heroes
    return this.heroesService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Query() pagination) {
    const { page, limit } = pagination;
    // This method retrieves all heroes
    return this.heroesService.findAllPaginated(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // This method retrieves a hero by ID
    return this.heroesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // Sets the response status code to 201 Created
  create(@Body() createHeroDto: CreateHeroDto) {
    // This method creates a new hero
    return this.heroesService.create(createHeroDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    // This method updates a hero by ID
    return this.heroesService.update(id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // This method deletes a hero by ID
    return this.heroesService.remove(id);
  }
}
