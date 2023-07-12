import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from 'src/schema/pokemon';
import { CreatePokemonDTO } from './dto/create-pokemon-dto';

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) { }

    @Get('/getAll/:page')
    async getAllPokemons(
        @Param('page')
        page: number
    ): Promise<Pokemon[]> {
        return this.pokemonService.findAll(page);
    }

    @Get(':keyword')
    async getOnePokemon(
        @Param('keyword')
        keyword: string
    ): Promise<Pokemon[]> {
        return this.pokemonService.findByKeyword(keyword);
    }

    @Post()
    async createPokemon(
        @Body()
        pokemon: CreatePokemonDTO
    ): Promise<Pokemon> {
        return this.pokemonService.create(pokemon)
    }

    @Patch('/update/:id')
    update(
        @Param('id')
        id: string,
        @Body()
        updateData: CreatePokemonDTO
    ): Promise<Pokemon> {
        return this.pokemonService.update(updateData, id);
    }

    @Delete(':id')
    async deleteOnePokemon(
        @Param('id')
        id: string
    ): Promise<Pokemon> {
        return this.pokemonService.deleteById(id);
    }
}
