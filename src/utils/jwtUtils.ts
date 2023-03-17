import {readFileSync} from 'fs';
import {resolve} from 'path';
import {sign, verify, Secret, JwtPayload} from 'jsonwebtoken';


const refreshPublicKey = readFileSync(resolve('secretKeys/refreshToken/ec_pub.pem'), 'utf8');
const refreshPrivateKey = readFileSync(resolve('secretKeys/refreshToken/ec_priv.pem'), 'utf8');

const accessPublicKey = readFileSync(resolve('secretKeys/accessToken/ec_pub.pem'), 'utf8');
const accessPrivateKey = readFileSync(resolve('secretKeys/accessToken/ec_priv.pem'), 'utf8');


// Make a token
const signToken = (payload: object, expireTime = '7d', privateKey: Secret) => {
    // Return Promise
    return new Promise<string | undefined>((resolve, reject)=> {
        // Sign the payload with json web token
        sign(payload, privateKey, { algorithm: 'ES256', expiresIn: expireTime }, (err, token) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
}

// Verify Token
const verifyToken = (token: string, publicKey: Secret) => {
    // Return Promise
    return new Promise<JwtPayload>((resolve, reject) => {
        // Verify json web token
        verify(token, publicKey, (err, payload) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(payload as JwtPayload);
            }
        });
    });
}



export const signRefreshToken = async (payload: object, expireTime: string) => {
    return await signToken(payload, expireTime, refreshPrivateKey);
}

export const verifyRefreshToken = async (token: string) => {
    return await verifyToken(token, refreshPublicKey);
}

export const signAccessToken = async (payload: object, expireTime: string) => {
    return await signToken(payload, expireTime, accessPrivateKey);
}

export const verifyAccessToken = async (token: string) => {
    return await verifyToken(token, accessPublicKey);
}