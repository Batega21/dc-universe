import { CreateHeroDto } from './create-hero.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateHeroDto extends PartialType(CreateHeroDto) {}
