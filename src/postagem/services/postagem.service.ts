import { HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm/browser";

@Injectable()  //Indica que a classe é de serviço e pode ser inserida/injetada em outras classes
export class PostagemService {

    // Iniciando ferramentas para classe de Serviço
    constructor(
        @InjectRepository(Postagem) // Injeta o repositório da entidade Postagem para acessar o banco de dados
        private postagemRepository: Repository<Postagem> // Declara o repositório que será usado nos métodos
    ) { } // Construtor da classe (executado quando o service é criado)

    async findAll(): Promise<Postagem[]> { // Método assíncrono que retorna uma lista de Postagens

        return await this.postagemRepository.find() // Busca todas as postagens no banco de dados

    }

    async findById(id: number): Promise<Postagem> {  // Método que busca uma postagem pelo ID
        const postagem = await this.postagemRepository.findOne({  // Procura uma postagem no banco
            where: { id }  // Condição de busca: onde o id seja igual ao id informado
        })

        if (!postagem) {  // Verifica se a postagem não foi encontrada
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)  // Vai lançar uma exceção de eero com a mensagem de erro depois o status HTTP 404 de não encontrada
        }

        return postagem  // Retorna a postagem encontrada
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {  // Busca postagens pelo título
        return await this.postagemRepository.find({  // Procura no banco de dados
            where:{
                titulo: ILike(`%${titulo}%`)  // Busca títulos que contenham o texto informado (ignorando maiúsculas/minúsculas)
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem>{  // Método para criar (salvar) uma nova postagem
        return await this.postagemRepository.save(postagem);  // Salva a postagem no banco
    }

    async update(postagem: Postagem): Promise<Postagem> {  // Método para atualizar uma postagem existente
        await this.findById(postagem.id)   // Verifica se a postagem existe antes de atualizar
        return await this.postagemRepository.save(postagem);  // Atualiza os dados no banco
    }

    async delete(id: number): Promise<DeleteResult> {   // Método para deletar uma postagem pelo ID
        await this.findById(id)  // Verifica se a postagem existe antes de excluir
        return await this.postagemRepository.delete(id);   // Remove a postagem do banco
}

}