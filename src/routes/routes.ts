import express from "express";
import dotenv from 'dotenv';
import { RegisterUser } from "../controller/controller.register";
import { LoginUser } from "../controller/controller.login";
import { CreatePost } from "../controller/controller.post";
import { UserFavourites } from "../controller/controller.favourites";
import { Requests } from "../controller/controller.followers";
import { Sessions } from "../controller/controller.session";
import { Logout } from "../controller/controller.logout";

const router = express.Router();


router.post('/register', RegisterUser.register_user);
router.post("/login", LoginUser.user_login);
router.post("/post",CreatePost.create_post);
router.post("/fav", UserFavourites.user_favourites);
router.post("/follower", Requests.follower_following);
router.post("/session", Sessions.maintain_session);
router.get("/logout", Logout.logout_user);


export default router;