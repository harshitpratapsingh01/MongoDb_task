import mongoose from "mongoose";
import User from "./user.schema";

const PostSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url:{
        type: String,
        required: true
    },
    caption:{
        type: String,
        maxlength: 100
    },
    likes_count:{
        type:Number,
        default:0
    },
    comment_count:{
        type:Number,
        default:0
    },
    createdAT:{
        type: Date,
        default: Date.now()
    },
    updatedAT:{
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model("Post", PostSchema);

export {Post};