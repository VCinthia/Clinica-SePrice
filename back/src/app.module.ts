import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from 'bdd/typeorm.config';
import { PersonaModule } from './persona/persona.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PersonaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
