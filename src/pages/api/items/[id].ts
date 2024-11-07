import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, description } = req.body;

    try {
      const item = await prisma.item.update({
        where: { id: Number(id) },
        data: { name, description },
      });
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update item' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.item.delete({ where: { id: Number(id) } });
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete item' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
