import dbConnect from '../../../db/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const db = await dbConnect();
  const session = db.session();
  switch (method) {
    case 'POST':
      const query = `MATCH (sender:USER {docId:$senderDocId}),(receiver:USER {docId:$receiverDocId}) CREATE (sender)-[:IS_FRIEND]->(receiver)`;
      const { senderDocId, receiverDocId } = req.body;
      try {
        if (senderDocId && receiverDocId && senderDocId !== receiverDocId) {
          const writeResult = await session.writeTransaction((tx) =>
            tx.run(query, { senderDocId, senderDocId })
          );
          res.json({ success: true });
        } else {
          res.status(404).json({ success: false });
        }
      } catch {
        console.log('Something Went Wrong!!');
        res.status(404).json({ success: false });
      } finally {
        await session.close();
        await db.close();
      }
      break;
  }
}
