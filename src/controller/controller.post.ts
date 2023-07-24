import { Post } from "../models/post.schema";
import User from "../models/user.schema";
import { Verify } from "../middleware/verify.user";
import { createClient } from "redis";

const client = createClient();
export class CreatePost{
    static async create_post(req:any, res: any){
        const details = req.body;
        try{
            await client.connect();
            const user = await Verify.verify_token(req.headers.authorization);
            const isUser = await User.find({email: user.email});
            const session_data = await client.GET(isUser[0].username);
            const status_data = JSON.parse(session_data)
            console.log(status_data);
            const status = status_data.status;
            if(isUser){
                if(status){
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
                    res.status(400).json({message: "Please Login before Creating Post"});
                }
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