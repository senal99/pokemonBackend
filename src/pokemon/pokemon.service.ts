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
        console.log("test2")
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
        // const res = await this.pokemonModel.findById(id)
        const regex = new RegExp(keyword, 'i')
        console.log("test")
        const res = await this.pokemonModel.find({
            $or: [
                { name: regex },
                { description: regex }
            ]
        })
            .exec();
        if (!res) {
            // console.log("Not found")
            throw new NotFoundException('Pokemon not found :(')
        }
        return res;
    }

    async update(pokemon: Pokemon, id: string): Promise<Pokemon> {
        console.log("updating...")
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
            // console.log("Not found")
            throw new NotFoundException('Pokemon not found :(')
        }
        return res;
    }
}
