import dbConnect from '../../../db/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const { uid } = req.query;
  const db = await dbConnect();
  const session = await db.session();
  switch (method) {
    case 'GET':
      let allPosts = [];
      const timelineQuery =
        'MATCH (user:USER {uid:$uid})-[:IS_FRIEND]->(friends:USER)-[:POSTED]->(posts:POST) WHERE NOT (user)-[:LIKED]-(posts) RETURN posts ORDER BY posts.timeStamp';
      try {
        const readResult = await session.readTransaction((tx) =>
          tx.run(timelineQuery, { uid })
        );

        readResult.records.forEach((record) => {
          let posts = record.get('posts');
          allPosts.push({ ...posts.properties });
        });
        res.status(200).json({ success: true, posts: allPosts });
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
