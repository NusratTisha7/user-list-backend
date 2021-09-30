const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: Number,
    country: String,
    city: String,
    address: String,
    religion: String,
    nationality: String,
},{timestamps:true});

const validateUser = user => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        religion: Joi.string().required(),
        nationality: Joi.string().required(),
    });
    return schema.validate(user);
}

module.exports.User = model('User', userSchema);
module.exports.validate = validateUser;