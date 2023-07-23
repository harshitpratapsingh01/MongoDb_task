import Session from "../models/session.schema";
import { Verify } from "../middleware/verify.user";
import User from "../models/user.schema";
import { Redis } from "../middleware/session.redis";

export class Sessions{
    static async maintain_session(req: any, res: any, token){
        try{
            const check_user = await Verify.verify_token(token);
            const isUser = await User.find({email: check_user.email});

            if(isUser){
                const user = isUser[0]._id;
                const isSession = await Session.find({user_id: user})
                console.log(isSession);
                if(!isSession.length){
                    const session_details = new Session({
                        user_id: user,
                        status: true
                    });
                    const session = await session_details.save();
                    console.log("Session stored successfully");
                    console.log(session);
                }
                else if(isSession.length){
                    if(!isSession[0].status){
                        await Session.findOneAndUpdate({user_id: user}, {status: !isSession[0].status});
                        console.log("Session Activate");
                    }
                }
                // console.log("One session of this user is already activ");
                // res.status(201).json({message: "Session stored successfully"});
                await Redis.maintain_session_redis(token);
            }
            else{
                // res.status(404).json({message: "User Not Found"});
                console.log("User not found");
            }
        }
        catch(err){
            // res.status(500).json({message: "Server Error", err});
            console.log("Server Error")
        }
    }
}