import { Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Param, Body, Post, Put, Delete, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)     // Colocando essa Anotação aqui, indica que todos os endpoints são protegidos
@Controller("/postagens")  // Indica que a Classe é uma Controller
@ApiTags('Postagem')
@ApiBearerAuth()
export class PostagemController{

    constructor(private readonly postagemService: PostagemService) {}

    @Get()  //Indica qual tipo de Requesição esse método é executado
    @HttpCode(HttpStatus.OK)  // Monta a Resposta HTTP para o Front com o status 200
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }

    @Get("/:id_post")  // id = "1" => id = 1
    @HttpCode(HttpStatus.OK)    // Monta a Resposta HTTP para o Front com o status 200
    findById(@Param('id_post', ParseIntPipe) id_post: number): Promise<Postagem> {
        return this.postagemService.findById(id_post)
    }

    @Get('/titulo/:titulo') // postagens/titulo/{texto}
    @HttpCode(HttpStatus.OK)
    findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findAllByTitulo(titulo);
    }

    @Post()  // Cadastrar/Criar/Salva info
    @HttpCode(HttpStatus.CREATED) // 201
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem);
    }

    @Put()   // Define que este método responde a requisições HTTP do tipo PUT (usado para atualizar dados)
    @HttpCode(HttpStatus.OK)  // Define que a resposta terá o status 200 (OK) quando der tudo certo
    update(@Body() postagem: Postagem): Promise<Postagem>{    // Método que recebe os dados da postagem pelo corpo da requisição
        return this.postagemService.update(postagem);   // Chama o serviço que realmente faz a atualização no banco      

    }

    @Delete('/:id')   // Define que este método responde a requisições DELETE com um parâmetro :id na URL
    @HttpCode(HttpStatus.NO_CONTENT)   // Define o status 204 (sem conteúdo), usado quando algo é deletado com sucesso
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult>{   // Captura o parâmetro id da URL e converte para número
        return this.postagemService.delete(id);      // Chama o serviço para excluir a postagem com esse id

}

}