
import { generateToken, setAuthCookie, verifyPassword } from "@/__lib/auth";
import { prisma } from "@/__lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
   
try{

    const {email,password}= await request.json();

    if(!email || !password){
        return NextResponse.json({error:"Missing required fields"},{status:400});
    }

    const user= await prisma.user.findUnique({
        where:{email}
    });

    if(!user){
        return NextResponse.json({error:"Invalid email or password"},{status:401});
    }
    const isPasswordValid= user ? await verifyPassword(password,user.password):false;

  if(!isPasswordValid){
    return NextResponse.json({error:"Invalid email or password"},{status:401});
  }

    //generate token

    const token = await generateToken({
        userId:user.id,
        email:user.email,
        name:user.name
    })

    const response = NextResponse.json({
        message:"Login successful",
        user:{ 
            id:user.id,
            email:user.email,
            name:user.name
        }
    },{status:200
    })

    //set httpOnly cookie with token
    setAuthCookie(response,token);
    return response;

}
catch(error){
    console.log("Error in login:",error);
    return NextResponse.json({
        error:"Internal server error"
    },{status:500})
}
}

