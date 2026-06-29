'use server'

import { addSkill } from "@/public/skills";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function createSkill(prevState:any, formData:FormData){
const name = formData.get('name') as string;
const description = formData.get('description') as string;
const category = formData.get('category') as string;

if(!name || !description || !category){
    throw new Error("Please fill all the required fields")
    return {message:"Please fill all the required fields", status:400}
}
    
const createdAt = new Date();



const newSkill={
    id:Date.now().toString(),
    name,
    description,
    category,
    createdAt:new Date().toISOString(),
    updatedAt:new Date().toISOString()
}
await addSkill(newSkill);
revalidatePath('/skills');
redirect('/skills');

}
