import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()  // É uma classe de serviço que pode ser injetada em outras classes diretamante
export class Bcrypt{

    // Função para criptografrar a senha do usário
    async criptografarSenha(senha: string): Promise<string> {

        let saltos: number = 10;   // determina o quão forte a criptografia será
        return await bcrypt.hash(senha, saltos)

    }

    // Função que compara a senha criptografa e salva no banco com a senha enviada ao login
    async compararSenhas(senhaBanco: string, senhaDigitada: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhaBanco);
    }

}