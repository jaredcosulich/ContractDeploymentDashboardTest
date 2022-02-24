

import {
  prismaClient
} from '../../../lib/server'

export default async function handle(req, res) {
  const { id } = req.query
  const project = await prismaClient.project.findFirst({
    where: {
      id: id
    }
  })
  res.json(project);
}