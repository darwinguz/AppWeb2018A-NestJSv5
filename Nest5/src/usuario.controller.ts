import {Controller, Get, HttpCode, Post, Req, Res} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

//decorator
@Controller('Usuario')
export class UsuarioController {
    usuario = {
        nombre: 'Adrian',
        apellido: 'Guzman',
        edad: 28
    };

    usuarios = [];

    constructor(private _usuarioService: UsuarioService) {
    }

    //este usuario va a usar estos recurso
    @HttpCode(200)
    @Get('mostrar')
    mostrarUsuario(@Res() response) {
        const usuarios = this._usuarioService.mostrarUsuarios();
        return response.send(usuarios);
    }

    @Get('mostrarExpress')
    mostrarUsuarioExpress(@Req() request, @Res() response) {
        return response
            .status(200)
            .send(this.usuarios);
    }

    @Post('crearUsuario')
    crearUsuario(@Req() request, @Res() response) {
        const nuevoUsuario = {
            nombre: request.query.nombre,
            apellido: request.query.apellido,
            edad: request.query.edad

        };
        const usuarioCreado = this._usuarioService.crearUsuario(nuevoUsuario);
        return response
            .status(201)
            .send(nuevoUsuario);
    }
}