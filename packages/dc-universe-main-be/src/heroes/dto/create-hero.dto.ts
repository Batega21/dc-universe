import { IsString, IsArray } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly realName: string;

  @IsString()
  readonly alias: string;

  @IsString()
  readonly alignment: string;

  @IsString()
  readonly team: string;

  @IsArray()
  readonly powers: string[];

  @IsString()
  readonly origin: string;

  @IsString()
  readonly firstAppearance: string;

  @IsString()
  readonly imageUrl: string;
}
