import Joi from '@hapi/joi';
import PasswordComplexity from 'joi-password-complexity';

export const getUsersSchema = Joi.object({
    login: Joi.string().required(),
    limit: Joi.string().required()
});

export const getUserByIdSchema = Joi.object({
    id: Joi.string().required()
});

const PASSWORD_OPTIONS = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2
};

export const postUserSchema = Joi.object({
    login: Joi.string().required(),
    password: new PasswordComplexity(PASSWORD_OPTIONS),
    age: Joi.number().min(4).max(130).required()
});

export const putUserBodySchema = Joi.object({
    login: Joi.string(),
    age: Joi.number().min(4).max(130)
});

export const putUserParamsSchema = Joi.object({
    id: Joi.string().required()
});

export const deleteUserSchema = Joi.object({
    id: Joi.string().required()
});
