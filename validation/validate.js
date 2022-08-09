const Joi = require('joi');

const registerValidation = (user) => {

    const schema = Joi.object({
        username: Joi.string()
            .min(1)
            .max(35)
            .required(),
        email: Joi.string()
            .min(10)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required()
    });
    
    return schema.validate(user);
}

const loginValidation = (user) => {

    const schema = Joi.object({
        email: Joi.string()
            .min(10)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required()
    });
    
    return schema.validate(user);
}

const noteValidation = (note) => {

    const schema = Joi.object({
        title: Joi.string()
            .min(1)
            .required(),
        description: Joi.string()
            .min(1)
            .required()
    });
    
    return schema.validate(note);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.noteValidation = noteValidation;