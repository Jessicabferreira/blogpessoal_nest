import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity({name: "tb_postagens"})  // Indicando que a classe é uma Entidade/Model
export class Postagem {

    @PrimaryColumn() // Chave Primária e Auto Incremental
    id: number;

    @IsNotEmpty()  // Validador de Objeto 
    @Column({ length: 100, nullable: false })  // Tamanho Máximo: 100 | Regra do MYSQL - NOT NULL do MYSQL
    titulo: string;

    @IsNotEmpty()  // Validador de Objeto 
    @Column({ length: 1000, nullable: false })  // Tamanho Máximo: 1000 |Regra do MYSQL - NOT NULL do MYSQL
    texto: string;

    @UpdateDateColumn()
    data: Date;
}