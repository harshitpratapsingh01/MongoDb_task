import { Post } from "../models/post.schema";
import User from "../models/user.schema";
import { Verify } from "../middleware/verify.user";

export class CreatePost{
    static async create_post(req:any, res: any){
        const details = req.body;
        try{
            const user = await Verify.verify_token(req.headers.authorization);
            // console.log(user, '-----user-------');
            const isUser = await User.find({email: user.email});
            // console.log(isUser, '------isUser------');
            if(isUser){
                const post_details = new Post({
                    user_id: isUser[0]._id,
                    url: details.url,
                    caption: details.caption,
                    likes_count: details.likes_count,
                    comment_count: details.comment_count
                });
                const PostDetails = await post_details.save();
                res.status(201).json({message: "Post Created Successfully"});
                console.log(PostDetails, '------postdetails--------');
            }
            else{
                res.status(404).json({message: "user not found"});
            }
        }
        catch(err){
            res.status(500).json({message: "Server Error"});
        }
    }
}