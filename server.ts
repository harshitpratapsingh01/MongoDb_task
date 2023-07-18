import express from 'express';
import * as dotenv from 'dotenv';
import { dbConnection } from './src/core/connection';
dotenv.config();

const app = express();

const port = process.env.PORT;
app.use(express.json());
dbConnection();
// CreatePost.post_photo('64b63ce05ca0c59e644bb4f2');
// Create.createUser();

// Actions.createAction("64b67b0aaae0574a2c8839fa",'64b63ce05ca0c59e644bb4f2');


app.listen(port, () => {
    console.log(`server is Listening at http://localhost:${port}`);
});