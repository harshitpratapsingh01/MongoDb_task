import mongoose from "mongoose";

const FavouritesSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        Required : true
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

const Favourites = mongoose.model("Favourites", FavouritesSchema);
export default Favourites;