export const STACK = {
  frontend: [
    { name: "React", years: 4, production: true },
    { name: "Next.js", years: 4, production: true },
    { name: "TypeScript", years: 5, production: true },
    { name: "Astro", years: 1, production: true },
  ],
  backend: [
    { name: "Go", years: 3, production: true },
    { name: "Node.js", years: 5, production: true },
    { name: "Python", years: 3, production: true },
    { name: "gRPC", years: 2, production: true },
  ],
  infra: [
    { name: "Kubernetes", years: 2, production: true },
    { name: "Docker", years: 5, production: true },
    { name: "Terraform", years: 2, production: true },
    { name: "GCP / AWS", years: 3, production: true },
  ],
  databases: [
    { name: "PostgreSQL", years: 5, production: true },
    { name: "Redis", years: 4, production: true },
    { name: "Kafka", years: 2, production: true },
    { name: "MongoDB", years: 3, production: false },
  ],
  core: [
    { name: "DDD", years: 3, production: true },
    { name: "Event Sourcing", years: 2, production: true },
    { name: "CQRS", years: 2, production: true },
    { name: "TDD", years: 4, production: true },
    { name: "Clean Architecture", years: 4, production: true },
    { name: "CI/CD", years: 5, production: true },
  ],
} as const;
