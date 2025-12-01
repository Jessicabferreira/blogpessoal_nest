import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controller/postagem.Controller";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    providers: [PostagemService],
    controllers: [PostagemController],
})
export class postagemModule {}