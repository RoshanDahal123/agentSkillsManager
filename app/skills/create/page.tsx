'use client'

import { createSkill } from "@/app/actions/skills";
import { useActionState } from "react";

const initialState = {
  message: "",
};

export default function NewSkillPage() {
  const [state, formAction, pending] = useActionState(
    createSkill,
    initialState,
  );

  return (
    <form action={formAction} className="w-full max-w-md mx-auto space-y-4 mt-4 flex flex-col ">
      <input name="name" className="input input-bordered w-full" />
      <textarea name="description" className="input text-bordered w-full p-2" />
      <input name="category" className="input input-bordered w-full" />
     
      <p aria-live="polite" className="text-red-500">
        {state?.message}
      </p>
      <button disabled={pending} className="btn btn-primary">
        {pending ? "Creating..." : "Create Skill"}
      </button>
    </form>
  );
}
