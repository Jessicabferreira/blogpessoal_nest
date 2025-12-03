import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { postagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';

// Decorator - Etiqueta de Metadados
@Module({
  imports: [  // Configurando o TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema],
      synchronize: true,
  }),
  postagemModule,
  TemaModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
