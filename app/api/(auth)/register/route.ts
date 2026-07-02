import { generateToken, hashPassword, setAuthCookie } from "@/__lib/auth";
import { prisma } from "@/__lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export default async function POST(request:NextRequest){

    try{
        const{email,password,name}= await request.json();
        //validate input

        if(!email || !password || !name){
            return NextResponse.json({error:"Missing required fields"},{status:400});
        }

        //check if user already exists

        const existingUser= await prisma.user.findUnique({
            where:{email}
        });

        if(existingUser){
            return NextResponse.json({error:"User already exists"},{status:400});
        }
        
        const hashedPassword= await hashPassword(password);
        const user= await prisma.user.create({
            data:{
                email,
                password:hashedPassword,
                name
            }

        })

        const token = await generateToken({
            userId:user.id,
            email:user.email,
            name:user.name
        })
        

        const response = NextResponse.json({
            message:"User registered successfully",
            user:{
                id:user.id,
                email:user.email,
                name:user.name
            }
        },{status:201
        })
      
        setAuthCookie(response, token);

        return response;
    }
    catch(error){
    console.log("Error in registration:",error);
    return NextResponse.json({
        error:"Internal server error"
    },{status:500
    })

    }

}