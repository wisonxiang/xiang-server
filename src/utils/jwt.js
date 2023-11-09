import jwt from 'jsonwebtoken';
import { HttpException } from '@utils/exceptions.js'

const secret = "Xiang@#$"
export function jwtSign(obj){
  return jwt.sign(obj, secret,{ expiresIn: '12h' });
}

export function jwtVerify(token){
  try {
    return jwt.verify(token, secret);
  } catch(err) {
    // err
    throw new HttpException('token已过期')
  }  
}