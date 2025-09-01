import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';

@Module({
  imports: [],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
