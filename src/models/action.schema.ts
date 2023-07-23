import mongoose from 'mongoose';


const ReplySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        Required:true
    },
    comment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    content:{
        type: String,
        maxlength: 300,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAT:{
        type: Date,
        default: Date.now()
    }
});

const CommentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    content:{
        type: String,
        maxlength: 300,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAT:{
        type: Date,
        default: Date.now()
    },
    comments:[ReplySchema]
});


const LikeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        Required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAT:{
        type: Date,
        default: Date.now()
    }
});

const ActionSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        Required : true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        Required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAT:{
        type: Date,
        default: Date.now()
    },
    comments: [CommentSchema],
    likes: [LikeSchema]
});

const Action = mongoose.model('Action', ActionSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Like = mongoose.model('Like', LikeSchema);
const Reply = mongoose.model('Reply',ReplySchema);

export { Action, Comment, Like ,Reply};