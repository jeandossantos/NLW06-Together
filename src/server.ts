import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import './database/index';
import { routes } from './routes';
import { CustomErrorException } from './exceptions/CustomErrorException';

const app = express();

app.use(express.json());
app.use(routes);

app.use((error: CustomErrorException, req: Request, res: Response, next: NextFunction) => {
    
    console.log(error.message);
    if(error instanceof CustomErrorException) {
        return res.status(error.code).send(error.message);
    } 
    
    return res.status(500).send('Internal Error');
});

app.listen(3001, () => console.log('Backend is running on port 3001...'));