import Joi from 'joi';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();


const key = process.env.SECRET_KEY;

export class Verify {
    static async verify_token(token) {
        // const token = req.headers.authorization;
        console.log(token);
        if (token) {
            const decoded = jwt.verify(token, key);
            return decoded;
        }
        else {
            return false;
        }
    }

    static verify_login_details = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required()
    });

}