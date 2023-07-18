import mongoose from "mongoose";

const FollowerFollowingSchema = new mongoose.Schema({
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        enum: ["pending","accepted","rejected"],
        required: true
    }
});

const Follower = mongoose.model("Follower", FollowerFollowingSchema);
export default Follower;