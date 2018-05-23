import * as Joi from 'joi'

export const USUARIO_SCHEMA = Joi
    .object()
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

