export type Skill={
    id:string;
    name:string;
    description:string;
    category:string;
    createdAt:Date;
    updatedAt:Date;
}

export let SKILLS:Skill[] =[
{
    id:"1",
    name:"Javascript",
    description:"Javascript is a programming language that is used to create dynamic and interactive web pages. It is a high-level, interpreted language that is supported by all modern web browsers.",
    category:"Programming Language",
    createdAt:new Date(),
    updatedAt:new Date()
},{
 id:"2",
    name:"Typescript",
    description:"Typescript is a programming language that is a superset of Javascript. It adds optional static typing and other features to the language, making it easier to write and maintain large codebases.",
    category:"Programming Language",
    createdAt:new Date(),
    updatedAt:new Date()
}
]

export async function getSkill(){
    return [...SKILLS]
}

export async function addSkill(skill:Skill){
    await new Promise((resolve)=>setTimeout(resolve,3000));
    SKILLS=[...SKILLS,skill]
    console.log("Skill added successfully",skill);
}