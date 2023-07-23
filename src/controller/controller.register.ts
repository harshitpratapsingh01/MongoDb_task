import User from "../models/user.schema";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Validate } from "../middleware/verify.details";

dotenv.config();
export class RegisterUser {
    static async register_user(req, res) {
        const details = req.body;
        try {
            await Validate.validateUser.validateAsync(details);
            const isUser = await User.find({ username: details.username });
            if (!isUser.length){
                const salt = await bcrypt.genSalt(10);
                const hashpassword = await bcrypt.hash(details.password, salt);
                // console.log(hashpassword);
                const user_details = new User({
                    username: details.username,
                    name: details.name,
                    email: details.email,
                    password: hashpassword,
                    follower_count: details.follower_count,
                    following_count: details.follower_count,
                    dob: details.dob,
                    bio: details.bio
                });
                const Details = await user_details.save();
                res.status(201).json({ message: "User Register Successfully" });
                console.log(Details);
            }
            else {
                res.status(404).json({ message: "Username already exist" });
            }
        }
        catch (err) {
            res.status(500).json({ message: "Server Error" });
        }
    }
}
