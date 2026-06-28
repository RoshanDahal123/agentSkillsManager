import { getSkill } from '@/public/skills';
import Link from 'next/link'

export const revalidate = 60; //Revalidate this page every 60 seconds

 const SkillsPage = async() => {
  //  const skills= await prisma.skill.findMany({where:{isPublic:true}});
  //  return <SkillsGrid skills={skills}/>
  const skills= await getSkill();
  return (
    <section>
      <h1>Skills</h1>
      <Link href='/skills/create'> Create Skills</Link>
      <ul>
        {skills &&
          skills.map((skill) => (
            <li key={skill.id}>
              <Link href={`/skills/${skill.id}`}>{skill.name}</Link>
            </li>
          ))}
      </ul>


    </section>)
}

export default SkillsPage
