'use client';

import { Skill } from "@/public/skills";
import { motion } from "framer-motion";
import Link from "next/link";
export default function SkillsList({ skills }: { skills: Skill[] }) {
  // Animation variants for the parent container (stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Staggers the animation of each skill list item
      },
    },
  };

  // Animation variants for individual items (Fade & Slide Up)
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="menu menu-vertical bg-base-200 rounded-box gap-1 p-2 w-full shadow-sm overflow-hidden"
    >
      {skills && skills.length > 0 ? (
        skills.map((skill) => (
          // Animated List Item
          <motion.li
            key={skill.id}
            variants={itemVariants}
            className="hover:bg-base-300 rounded-lg transition-colors"
          >
            <Link
              href={`/skills/${skill.id}`}
              className="flex justify-between py-3 px-4 font-medium"
            >
              <span>{skill.name}</span>
              <span className="text-xs opacity-40">➔</span>
            </Link>
          </motion.li>
        ))
      ) : (
        <motion.li
          variants={itemVariants}
          className="disabled p-4 text-center text-sm text-base-content/50"
        >
          No skills added yet.
        </motion.li>
      )}
    </motion.ul>
  );
}
