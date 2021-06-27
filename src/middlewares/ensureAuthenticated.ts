import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

function ensureAuthenticated(req:Request , res: Response, next: NextFunction) {
    try {
    const authToken = req.headers.authorization;

    if(!authToken) return res.status(401).end();

    const [, token] = authToken.split(' ');

    const { sub } = verify(token, '4204957e27fa164a6782c54bc24ecb8e') as IPayload;

    req.user_id = sub;

    return next();        
    } catch (error) {
        res.status(401).end();
    }


}

export { ensureAuthenticated }