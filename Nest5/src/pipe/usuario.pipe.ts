import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionErroneaException} from "../exceptions/peticion-erronea.exception";

const Joi = require('joi');

@Injectable()
export class UsuarioPipe implements PipeTransform {
    constructor(private readonly _schema) {

    }

    transform(jsonValidar: any, metadata: ArgumentMetadata) {
        const {
            error
        } = Joi.validate(jsonValidar, this._schema);
        if (error) {
            //lanzar un error
            throw new PeticionErroneaException({
                error: error,
                mensaje: 'Json no valido customizado'
            }, 10);
        } else {
            //nada
            return jsonValidar;
        }
    }
}