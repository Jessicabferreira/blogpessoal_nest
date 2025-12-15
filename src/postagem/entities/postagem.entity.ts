import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagens"})  // Indicando que a classe é uma Entidade/Model
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn() // Chave Primária e Auto Incremental
    id: number;

    @ApiProperty()
    @IsNotEmpty()  // Validador de Objeto 
    @Column({ length: 100, nullable: false })  // Tamanho Máximo: 100 | Regra do MYSQL - NOT NULL do MYSQL
    titulo: string;

    @ApiProperty()
    @IsNotEmpty()  // Validador de Objeto 
    @Column({ length: 1000, nullable: false })  // Tamanho Máximo: 1000 |Regra do MYSQL - NOT NULL do MYSQL
    texto: string;

    @ApiProperty()
    @UpdateDateColumn()  // Atualiza automaticamente a data sempre que o registro for editado
    data: Date;   // Armazena a data da última atualização do registro

    @ManyToOne(() => Tema, (tema) => tema.postagem, {  // Define um relacionamento MUITOS para UM (ManyToOne)
        onDelete: "CASCADE"   // Garante que ao deletar um Tema, todas as Postagens associadas a ele sejam removidas automaticamente
    })
    @ApiProperty({ type: () => Tema })
    tema: Tema   // Cria o atributo "tema" na entidade atual onde sera criada uma chave estrangeira (FK) no banco de dados

    // Indica o lado MUITO do relacionamento, esse campo se conecta ao campo Postagem da Model Usuario
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    @ApiProperty({ type: () => Usuario })
    usuario: Usuario
}