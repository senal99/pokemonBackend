import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

// export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema({
    timestamps:true
})
export class Pokemon {
  @Prop()
  name: string;

  @Prop() 
  health : number;

  @Prop()
  attack: number;

  @Prop()
  defense: number;

  @Prop()
  description: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);