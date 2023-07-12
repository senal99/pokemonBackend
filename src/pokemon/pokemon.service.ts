import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import * as mongoose from 'mongoose';
import { Pokemon } from 'src/schema/pokemon';

@Injectable()
export class PokemonService {

    constructor(
        @InjectModel(Pokemon.name)
        private pokemonModel: mongoose.Model<Pokemon>
    ) { }

    async findAll(page: number): Promise<Pokemon[]> {
        const pokemonsPerPage = 5
        const pokemons = await this.pokemonModel
            .find()
            .skip(page * pokemonsPerPage)
            .limit(pokemonsPerPage)
            .sort({ _id: -1 })
        // comment this line to !reverse the order
        return pokemons;
    }

    async create(pokemon: Pokemon): Promise<Pokemon> {
        const res = await this.pokemonModel.create(pokemon)
        return res;
    }

    async findByKeyword(keyword: string): Promise<Pokemon[]> {
        const regex = new RegExp(keyword, 'i')
        const res = await this.pokemonModel.find({
            $or: [
                { name: regex },
                { description: regex }
            ]
        })
            .exec();
        if (!res) {
            throw new NotFoundException('Pokemon not found :(')
        }
        return res;
    }

    async update(pokemon: Pokemon, id: string): Promise<Pokemon> {
        return await this.pokemonModel.findOneAndUpdate({ _id: id }, {
            name: pokemon.name,
            health: pokemon.health,
            attack: pokemon.attack,
            defense: pokemon.defense,
            description: pokemon.description
        })
    }

    async deleteById(id: string): Promise<Pokemon> {
        const res = await this.pokemonModel.findByIdAndDelete(id)
        if (!res) {
            throw new NotFoundException('Pokemon not found :(')
        }
        return res;
    }
}
