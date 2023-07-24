import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from 'src/schema/pokemon';
import { CreatePokemonDTO } from './dto/create-pokemon-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) { }

    @Get('/getAll/:page')
    @UseGuards(AuthGuard('jwt'))
    async getAllPokemons(
        @Param('page')
        page: number
    ): Promise<Pokemon[]> {
        return this.pokemonService.findAll(page);
    }

    @Get(':keyword')
    @UseGuards(AuthGuard('jwt'))
    async getOnePokemon(
        @Param('keyword')
        keyword: string
    ): Promise<Pokemon[]> {
        return this.pokemonService.findByKeyword(keyword);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createPokemon(
        @Body()
        pokemon: CreatePokemonDTO
    ): Promise<Pokemon> {
        return this.pokemonService.create(pokemon)
    }

    @Patch('/update/:id')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id')
        id: string,
        @Body()
        updateData: CreatePokemonDTO
    ): Promise<Pokemon> {
        return this.pokemonService.update(updateData, id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteOnePokemon(
        @Param('id')
        id: string
    ): Promise<Pokemon> {
        return this.pokemonService.deleteById(id);
    }
}
