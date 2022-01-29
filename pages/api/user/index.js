import dbConnect from '../../../db/dbConnect';

export default async function handler(req, res) {
  const db = await dbConnect();
  const session = await db.session();
  const { method } = req;
  switch (method) {
    case 'POST':
      const userData = req.body;
      const postQuery = `CREATE (u:USER $userData)`; //query to create a user in Neo4j
      try {
        const writeResult = await session.writeTransaction((tx) =>
          tx.run(postQuery, { userData })
        );
        res.status(200).json({ success: true });
      } catch {
        res.status(404).json({ success: false });
      } finally {
        await session.close();
        await db.close();
      }
      break;

    default:
      res.status(404);
  }
}
