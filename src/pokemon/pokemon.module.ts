import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonSchema } from 'src/schema/pokemon';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }])],
  controllers: [PokemonController],
  providers: [PokemonService]
})
export class PokemonModule { }
