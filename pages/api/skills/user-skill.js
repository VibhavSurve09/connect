import dbConnect from '../../../db/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const db = await dbConnect();
  const session = db.session();
  switch (method) {
    case 'POST':
      const { userId } = req.body;
      const { skillId } = req.body;
      const query = `MATCH (user:USER {uid:$userId}),(skill:SKILL) WHERE ID(skill)=$skillId CREATE (user)-[:HAS_A]->(skill)`;
      try {
        const writeResult = await session.writeTransaction((tx) =>
          tx.run(query, { userId, skillId })
        );
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(404).json({ success: false });
      } finally {
        await session.close();
        await db.close();
      }
      break;

    default:
      res.status(404).json({ success: false });
  }
}
