import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";

const Joi = require('joi');

@Injectable()
export class UsuarioPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const schema = Joi.object()
            .keys({
                nombre: Joi
                    .string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
                apellido: Joi
                    .string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
                edad: Joi
                    .number()
                    .integer()
                    .greater(0)
                    .less(150),
            });

    }
}