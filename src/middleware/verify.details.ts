import Joi from 'joi';


export class Validate{
    static validateUser = Joi.object({
        username: Joi.string().min(6).max(30).required(),
        name: Joi.string().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
        dob: Joi.date().required(),
        follower_count: Joi.number(),
        following_count: Joi.number(),
        bio: Joi.string().max(100)
    });
}