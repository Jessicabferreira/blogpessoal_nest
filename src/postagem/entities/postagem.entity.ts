import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: "tb_postagens"})  // Indicando que a classe é uma Entidade/Model
export class Postagem {

     @PrimaryGeneratedColumn() // Chave Primária e Auto Incremental
    id: number;

    @IsNotEmpty()  // Validador de Objeto 
    @Column({ length: 100, nullable: false })  // Tamanho Máximo: 100 | Regra do MYSQL - NOT NULL do MYSQL
    titulo: string;

    @IsNotEmpty()  // Validador de Objeto 
    @Column({ length: 1000, nullable: false })  // Tamanho Máximo: 1000 |Regra do MYSQL - NOT NULL do MYSQL
    texto: string;

    @UpdateDateColumn()  // Atualiza automaticamente a data sempre que o registro for editado
    data: Date;   // Armazena a data da última atualização do registro
}