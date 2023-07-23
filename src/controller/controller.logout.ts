import User from "../models/user.schema";
import { Redis } from "../middleware/session.redis";
import { Sessions } from "./controller.session";
import Session from "../models/session.schema";
import { Verify } from "../middleware/verify.user";

export class Logout{
    static async logout_user(req: any, res:any){
        try{
            const user = await Verify.verify_token(req.headers.authorization);
            const isUser = await User.find({email: user.email});
            console.log(isUser)
            if(isUser){
                const id = isUser[0]._id;
                const isSession = await Session.find({user_id: id});
                if(isSession){
                    if(isSession[0].status){
                        await Session.findOneAndUpdate({_id: isSession[0]._id}, {status: !isSession[0].status});
                        res.status(201).json({message: "User logOut Successfully"});
                    }
                    else{
                        res.status(404).json({message:"User is already inactiv"})
                    }
                }
                else{
                    res.status(404).json({message: "Session not found"});
                }
            }
            else{
                res.status(404).json({message:"User not found"});
            }

        }
        catch(err){
            res.status(500).json({message: "Server Error"});
        }
    }
}