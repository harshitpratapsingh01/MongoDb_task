import User from "../models/user.schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Verify } from "../middleware/verify.user";
import { Sessions } from "./controller.session";
import Session from "../models/session.schema";
dotenv.config();

export class LoginUser{
    static async user_login(req,res){
        const details = req.body;
        try{
            await Verify.verify_login_details.validateAsync(details);
            const isUser = await User.find({email:details.email});
            console.log(isUser);
            if(isUser.length){
                const isSession = await Session.find({user_id: isUser[0]._id});
                // console.log(isSession);
                if(!isSession.length || !isSession[0].status){ 
                    const hash = isUser[0].password;
                    if(bcrypt.compare(details.password, hash)){
                        const token = jwt.sign({email: details.email}, process.env.SECRET_KEY, {expiresIn: '2d'} );
                        res.status(201).json({message: "login successfully", isUser, token});
                        // console.log(token);
                        await Sessions.maintain_session(req,res,token); 
                        
                    }
                    else{
                        res.status(404).json({message: "password is incorrect"});
                    }
                }
                else{
                    res.status(404).json({message: "User is already activ"})
                }
            }
            else {
                res.status(404).json({ status: "user not found" });
            }
        }
        catch(err){
            res.status(500).json({status: "Server Error"});
        }
    }
}