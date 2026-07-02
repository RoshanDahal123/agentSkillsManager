import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const SALT_ROUNDS = 10;
const TOKEN_EXPIRY_HOURS = parseInt(process.env.AUTH_TOKEN_EXPIRY_HOURS || "24");
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "auth_token";
import 'dotenv/config'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export interface TokenPayload{
    userId:number;
    email:string;
    name: string;
    exp: number;
}

//Hash password using bcrypt

export async function hashPassword(password:string):Promise<string>{
    return await bcrypt.hash(password, SALT_ROUNDS);
}
   

//verify a password

export async function verifyPassword(password:string,hashedPassword:string):Promise<boolean>{
    return await bcrypt.compare(password,hashedPassword);
}

/* * Generate a simple base64 encoded token with expiration
 * In production, use a proper JWT library
 */

export function generateToken(payload:TokenPayload):Promise<string>{
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not set');
    }

    const token = jwt.sign(payload, secret, { expiresIn: `${TOKEN_EXPIRY_HOURS}h` });
    return Promise.resolve(token)
}


//verifying a token

export function verifyToken(token:string):Promise<TokenPayload |null>{
    const secret = process.env.JWT_SECRET;
    //@ts-ignore
      const decoded= jwt.verify(token, secret);
        console.log("Decoded JWT:", decoded);

      return decoded ? Promise.resolve(decoded) : Promise.resolve(null);
}

export  function setAuthCookie(response: NextResponse,token:string):void{
response.cookies.set(AUTH_COOKIE_NAME,token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"lax",
    maxAge:TOKEN_EXPIRY_HOURS * 60 * 60, // in seconds
    path:"/"
})
}

export function clearAuthCookie(response:NextResponse):void{
    response.cookies.set(AUTH_COOKIE_NAME,"",{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge:0,
        path:"/"
    })
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
}
export async function getCurrentUser():Promise<TokenPayload | null>{
const token = await getAuthToken();
if(!token) return null;
return verifyToken(token);
}
  

export function extractTokenFromRequest(request:Request) :string |null{
    const cookieHeader= request.headers.get("cookie");
    if(!cookieHeader) return null;
    const cookiesArray= cookieHeader.split(";").reduce((acc,cookie)=>{
        const [key,value]=cookie.trim().split("=");
        acc[key]=value;
        return acc;
    }, {}as Record<string,string>);
    return cookiesArray[AUTH_COOKIE_NAME] || null;
}