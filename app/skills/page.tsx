
import SkillsList from "@/components/SkillsList";
import { getSkill } from "@/public/skills";
import Link from "next/link";

// export const revalidate = 60; //Revalidate this page every 60 seconds


export default async function SkillsSection() {
  
  const skills = await getSkill();
  

  return (
    <section className="mx-auto w-full max-w-md p-4">
      {/* Animated Header */}

      <div className='mb-4 flex flex-col gap-1'>
        <h1 className="text-2xl font-bold tracking-tight text-base-content">
          Skills
        </h1>
        <p className="text-xs text-base-content/60">
          Manage your professional skills
        </p>
      </div>
      <Link href="/skills/create" className="btn btn-primary btn-sm sm:btn-md mb-4">
        Create Skill
      </Link>

      <SkillsList skills={skills} />
    </section>
  );
}
