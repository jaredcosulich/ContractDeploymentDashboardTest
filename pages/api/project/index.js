import { Action } from '.prisma/client';
import prisma from '../../../lib/prisma';

const safeJsonStringify = require('safe-json-stringify');

// POST /api/project
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { teamId, title } = req.body;

  const data = { 
    teamId,
    title
  }

  const component = await prisma.component.create({ data: data });

  res.json(component);
}