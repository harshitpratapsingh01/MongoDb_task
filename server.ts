import express from 'express';
import * as dotenv from 'dotenv';
import { dbConnection } from './src/core/connection';
import router from './src/routes/routes';
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
dotenv.config();

const app = express();

const port = process.env.PORT;
app.use(express.json());
dbConnection();

const options ={
    definition: {
        openapi: '3.0.0',
        info:{
            title: "Instagram",
            version: "1.0.0"
        },
        servers:{
            url: 'http://localhost:2004/'
        }
    },
    apis: ['./src/routes/routes.ts']
}

const swaggerDocument = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/',router);

app.listen(port, () => {
    console.log(`server is Listening at http://localhost:${port}`);
});



// User Follow
// class diagram,
// er diagram,
// sequence diagram,
