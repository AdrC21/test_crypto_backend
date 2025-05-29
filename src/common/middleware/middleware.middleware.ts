import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MiddlewareMiddleware implements NestMiddleware {
  
  constructor(
    private readonly authService: AuthService
  ){}
  
  use(req: any, res: any, next: () => void) {
    let token = req.headers.authorization

    if(!token){
      throw new HttpException('Autorizacion no enviada',HttpStatus.UNAUTHORIZED)
    }else{
      if(req.headers?.authorization.search('Bearer') >= 0){
        token = req.headers.authorization.replace('Bearer ', '');
      }else{
        token = req.headers.authorization
      }

      return this.authService.verifyToken(token).then(
        async(data)=>{
          if(data){
            next();
          }else{
            return res.status(HttpStatus.UNAUTHORIZED).send({msg:'Session invalida'})
          }
        }
      ).catch(
        (err)=>{
          return res.status(HttpStatus.UNAUTHORIZED).send({msg:err})
        }
      )

    }
  }
}
