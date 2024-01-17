import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config/jwt';
import { UserModel } from '../../data/mongodb';


export class AuthMiddleware {

    static validateJWT = async (req: Request, res:Response, next:NextFunction)=>{

        const authorization = req.header('Authorization');
        if(!authorization){
            return res.status(401).json({
                ok:false,
                msg:'No se ha encontrado el token'
            })
        }
        if(authorization.startsWith('Bearer ')){
            return res.status(401).json({
                ok:false,
                msg:'No se ha encontrado el token'
            })
        }

        const token = authorization.split(' ').at(1) || '';

        try{
            const payload = await JwtAdapter.validateToken<{id:string}>(token);
            if(!payload){
                return res.status(401).json({
                    ok:false,
                    msg:'Token no válido'
                })
            }

            const user = await UserModel.findById(payload.id);

            if(!user){
                return res.status(401).json({
                    ok:false,
                    msg:'Token no válido'
                })
            }
            req.body.user = user;

            next();
        }catch(err){
            console.log(err);
            res.status(500).json({error:'Internal Server Error'});
        }
          
    }
}