import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true, 
      }),
      MongooseModule.forRoot(process.env.DB_URI),
      PokemonModule,
    ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
