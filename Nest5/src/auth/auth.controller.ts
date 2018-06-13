import {BadRequestException, Body, Controller, HttpCode, Post} from "@nestjs/common";
import {JwtService} from "../servicios/jwt.service";


@Controller('Auth')
export class AuthController {
    constructor(private _jwtService: JwtService) {
    }

    @Post('login')
    @HttpCode(200)
    login(@Body('username') username: string, @Body('password') password: string,) {
        const enviaUsername = username;
        const enviaPassword = password;
        const enviarParametros = enviaPassword && enviaUsername;

        if (enviarParametros) {
            if (username === 'adrianeguez' && password === '1234') {
                const payload = {
                    username: username
                };
                const respuestaToken = {
                    jwt: this._jwtService.emitirToken(payload)
                }
                return respuestaToken;
            } else {
                throw new BadRequestException({
                    mensaje: 'Credenciales invalidas'
                })
            }
        } else {
            throw new BadRequestException({
                mensaje: 'No envia parametros'
            })
        }
    }

    @Post('verificarJWT')
    @HttpCode(200)
    verificarJWT(@Body('jwt') jwt: string,) : any{
        const tieneParametros = jwt;
        if (tieneParametros) {
            this._jwtService.verificarToken(jwt, (error, data) => {
                if (error) {
                    throw new BadRequestException(
                        {
                            mensaje: 'Jwt invalido',
                            error: error
                        }
                    )
                } else {
                    return {
                        mensaje: 'Ok',
                        data: data
                    }
                }
            })
        } else {
            throw new BadRequestException({
                mensaje: 'No envia jwt'

            })
        }
    }
}