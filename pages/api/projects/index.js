

export default async function handle(_req, res) {
  const projects = await prisma.project.findMany({})
  res.json(projects);
}