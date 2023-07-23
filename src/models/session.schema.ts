import { timeStamp } from "console";
import mongoose, { Types, now } from "mongoose";

const SessionSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: Boolean,
        default: false
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

const Session = mongoose.model('Session',SessionSchema);

export default Session;