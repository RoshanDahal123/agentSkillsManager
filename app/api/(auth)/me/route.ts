import { verifyToken } from "@/__lib/auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest){

    try {
        
     const token = request.cookies.get("auth_token")?.value;
     if(!token){
        return NextResponse.json({error:"Unauthorized"},{status:401});
     }

     const payload = await verifyToken(token);
     if(!payload){
        return NextResponse.json({error:"Invalid or expired token",user:null},{status:401});
     }
     return NextResponse.json({user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name
     }},{status:200});

    } catch (error) {
        console.log("Error in fetching user:",error);
        return NextResponse.json({error:"Internal server error"},{status:500});
    }
}