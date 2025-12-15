// Classe de apoio usada para fazer login | Não será convertida em tabela

import { ApiProperty } from "@nestjs/swagger"

export class UsuarioLogin {

    @ApiProperty()
    public usuario: string

    @ApiProperty()
    public senha: string
}