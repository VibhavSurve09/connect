import dbConnect from '../../../db/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const db = await dbConnect();
  const session = await db.session();

  switch (method) {
    case 'POST':
      let { userUID, nodeData } = req.body;
      const query =
        'MATCH (user:USER {uid:$userUID}) CREATE (post:POST $nodeData) SET post.timeStamp=timestamp() MERGE (user)-[:POSTED]->(post)';
      try {
        const writeResult = await session.writeTransaction((tx) =>
          tx.run(query, { userUID, nodeData })
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
      res.status(404).json({ success: false, message: 'Something went wrong' });
  }
}
