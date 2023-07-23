import redis from "redis";
import { createClient } from "redis";
import User from "../models/user.schema";
import { Verify } from "./verify.user";

const client = createClient();

export class Redis{
    static async maintain_session_redis(token){
        await client.connect();
        client.on('error', err => console.log('Redis client error', err));
        try{
            const user = await Verify.verify_token(token);
            const isUser = await User.find({email: user.email});
            if(isUser){
                await client.SET(isUser[0].username, JSON.stringify({
                    'user_id': isUser[0]._id,
                    'status': true
                }));
                const session = await client.get('user_session');
                console.log(session);
            }
            else{
                console.log("User not found");
            }
        }
        catch(err){
            console.log(err);
        }
    }
}