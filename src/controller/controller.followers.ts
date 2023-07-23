import Follower from "../models/follower.following.schema";
import User from "../models/user.schema";
import { Verify } from "../middleware/verify.user";

export class Requests{
    static async follower_following(req: any, res: any){
        const details = req.body;
        try{
            const user = await Verify.verify_token(req.headers.authorization);
            const isUser = await User.find({email: user.email});

            if(isUser){
                const user_id = isUser[0]._id;
                const receiver = await User.find({username: details.username});
                if(receiver){
                    const receiver_id = receiver[0]._id;
                    const follower_following_status = new Follower({
                        sender_id: user_id,
                        receiver_id: receiver_id,
                        status: details.status,
                    });

                    const RequestDetails = await follower_following_status.save();
                    res.status(201).json({message: `Request ${follower_following_status.status}`});
                    console.log(RequestDetails);
                }
                else{
                    res.status(404).json({message: "search result not found"});
                }
            }
            else{
                res.status(404).json({message: "User Not Found"});
            }
        }
        catch(err){
            res.status(500).json({message: "Server Error"});
        }
    }
}