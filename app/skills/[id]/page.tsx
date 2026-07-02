
import { getSkill } from "@/__actions/skills";
import { notFound } from "next/navigation";



export default async function SkillPage({params}: {params: {id: string}}) {
    
    const {id}= await params;
    const skills= await getSkill();
   
    const skill = skills.find((skill)=> skill.id === id);
    
    if(!skill){
        return notFound();
    }
  
    
    return(

        <>
        
        (

            <article className="flex flex-col justify-center align-center m-4 p-4 border-2 border-gray-300 rounded-lg shadow-md">
                Skill ID: {id}  
                <div>Skill Name: {skill?.name}</div>
                <div>Skill Description: {skill?.description}</div>
                <div>Skill Category: {skill?.category}</div>
                <div>Skill Created At: {skill?.createdAt.toString()}</div>    
            </article>
        )
        </>
    )
}
