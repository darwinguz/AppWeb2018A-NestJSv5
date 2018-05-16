//export es para usarlo en el modulo
import {Body, Controller, Get, Headers, Param, Post, Query, Req, Res} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

//como parametro se manda el url
@Controller('Parametros')
export class ParametrosController {

    constructor(private _usuarioService: UsuarioService) {
    }

    //como parametro va la url
    @Post('devolver/:id')
    devolverParametros(@Req()request, @Res() response, @Query() queryParams, @Body() bodyParams, @Param() paramParams) {
        const respuesta = {
            queryParams: queryParams,
            bodyParams: bodyParams,
            paramParams: paramParams
        };
        //tres tipos de parametros que podemos enviar al servidor
        return response.send(respuesta)
    }

    @Get('ReqRes')
    requestResponse(
        @Req() request,
        @Res() response,
        @Headers() header
    ) {
        const respuesta = {
            baseUrl: request.baseUrl,
            hostname: request.hostname,
            subdominios: request.subdomains,
            ip: request.ip,
            metodo: request.method,
            originalUrl: request.originalUrl,
            path: request.path,
            protocolo: request.protocol,
            header
        };
        console.log(respuesta);
        return response.send(respuesta);
    }

    @Get('ReqResRed')
    requestResponseRedirected(
        @Req() request,
        @Res() response,
        @Headers() header
    ) {
        const respuesta = {
            baseUrl: request.baseUrl,
            hostname: request.hostname,
            subdominios: request.subdomains,
            ip: request.ip,
            metodo: request.method,
            originalUrl: request.originalUrl,
            path: request.path,
            protocolo: request.protocol,
            header
        };
        console.log(respuesta);
        //con 200 no redirecciona
        //return response.redirect(200, 'http://localhost:1997');
        //mejor dejarle por defecto
        //return response.redirect('http://localhost:1997');
        //lo recomendable es usar url relativa ya que la ip localhost no puede variar pero si es una distinta puede variar con el tiempo y no podria escalar:
        return response.redirect('/Usuario/mostrar');

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

    @Get('establecerCookie')
    establecerCookie(
        @Req() request,
        @Res() response) {
        const parametros = {
            nombreCookie: request.query.nombre,
            valorCookie: request.query.valor,
        };
        //seteando cookie y el valor de la cookie
        response.cookie(parametros.nombreCookie, parametros.valorCookie);
        return response.send(parametros)
    }

    @Get('cookie/:nombre')
    leerCookie(
        @Req() request,
        @Res() response
    ) {
        const nombreCookie = request.params.nombre;
        const existeCookie = request.cookies[nombreCookie];
        if (existeCookie) {
            return response.send({
                valor: existeCookie
            })
        } else {
            return response
                .status(404)
                .send({
                    mensaje: 'No encontramos cookie'
                })
        }
    }

}