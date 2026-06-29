
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const {email, password}= await request.json();
    if(email !== 'admin' || password !== 'admin'){
        return NextResponse.json({error:"Invalid credentials"},{status:401})
    }

    const response = NextResponse.json({
        message:"Login Successful",
        user:{
            id:"1", name:"admin"
        }
    })
    return response;
   const token = 

    setAuthCookie(response, token);

}

export async function setAuthCookie(response:NextResponse, token:string){
    response.cookies.set("auth_token", token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax",
        maxAge:60*60*24,
        path:"/"
    })
}