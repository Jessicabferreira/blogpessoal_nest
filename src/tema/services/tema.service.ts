import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()  // Indica que essa classe pode ser injetada em outros lugares (Injeção de Dependência)
export class TemaService {
    constructor(
        @InjectRepository(Tema)  // Injeta o repositório da entidade Tema
        private temaRepository: Repository<Tema>   // Cria a variável que permite acessar o banco de dados da tabela Tema
    ) { }

    async findAll(): Promise<Tema[]> {  // Método assíncrono que retorna uma lista de Temas
        return await this.temaRepository.find({  // Busca todos os registros no banco
            relations: {  // Define os relacionamentos que também devem ser carregados
                postagem: true  // Carrega também as postagens relacionadas a cada tema
            }
        });
    }

    async findById(id: number): Promise<Tema> {  // Busca um tema específico pelo ID

        let tema = await this.temaRepository.findOne({  // Procura um único registro no banco
            where: {
                id
            },
            relations: {
                postagem: true  // Carrega as postagens relacionadas ao tema
            }
        });

        if (!tema)  // Verifica se o tema não foi encontrado
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);  // Lança erro 404 caso não encontre o tema

        return tema;   // Retorna o tema encontrado
    }

    async findAllByDescricao(descricao: string): Promise<Tema[]> {  // Busca todos os temas que contenham a descrição informada
        return await this.temaRepository.find({  // Realiza a busca no banco
            where: {   // Define a condição
                descricao: ILike(`%${descricao}%`)  // % é usado para buscar qualquer texto antes ou depois da palavra
            },
            relations: {  // Traz também os relacionamentos
                postagem: true  // Carrega as postagens relacionadas
            }
        })
    }

    async create(Tema: Tema): Promise<Tema> {   // Método responsável por criar (salvar) um novo Tema no banco
        return await this.temaRepository.save(Tema);  // Salva o objeto Tema no banco de dados
    }

    async update(tema: Tema): Promise<Tema> {  // Método responsável por atualizar um tema existente

        await this.findById(tema.id);  // Verifica se o tema existe antes de atualizar se não existir aparece o erro 404 

        return await this.temaRepository.save(tema);  // Atualiza os dados do tema no banco
    }

    async delete(id: number): Promise<DeleteResult> {   // Método responsável por deletar um tema pelo ID

        await this.findById(id);  // Verifica se o tema existe

        return await this.temaRepository.delete(id);  // Remove o tema do banco de dados
    }

}