export interface TechInfo {
  id: string;
  name: string;
  color: string;
}

export const TECH_DATA: TechInfo[] = [
  { id: "react", name: "React", color: "#58C4DC" },
  { id: "nextjs", name: "Next.js", color: "#FFFFFF" },
  { id: "astro", name: "Astro", color: "#D83333" },
  { id: "typescript", name: "TypeScript", color: "#3178C6" },
  { id: "nodejs", name: "Node.js", color: "#539E43" },
  { id: "tailwindcss", name: "Tailwind CSS", color: "#38bdf8" },
  { id: "postgresql", name: "PostgreSQL", color: "#336791" },
  { id: "prisma", name: "Prisma ORM", color: "#0C344B" },
  { id: "git", name: "Git", color: "#DE4C36" },
  { id: "github", name: "GitHub", color: "#FFFFFF" },
  { id: "vercel", name: "Vercel", color: "#FFFFFF" },
  { id: "vitest", name: "Vitest", color: "#fcc72c" },
];
