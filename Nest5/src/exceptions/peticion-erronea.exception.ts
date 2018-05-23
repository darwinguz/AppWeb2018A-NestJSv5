import {HttpException, HttpStatus} from "@nestjs/common";


export class PeticionErroneaException extends HttpException {
    constructor(private readonly _mensaje, private readonly _nivelError) {
        super({
            mensaje: 'Peticion erronea',
            statusCode: HttpStatus.BAD_REQUEST,
            nivelError: _nivelError,
            detalle: _mensaje
        }, HttpStatus.BAD_REQUEST)
    }
}