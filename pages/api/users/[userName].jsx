import dbConnect from '../../../db/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const { userName } = req.query;
  const db = await dbConnect();
  const session = await db.session();
  switch (method) {
    case 'GET':
      let users = [];
      const query = `MATCH (user:USER) WHERE user.userName CONTAINS $userName RETURN user ORDER BY user.userName LIMIT 5`;
      try {
        const readResult = await session.readTransaction((tx) =>
          tx.run(query, { userName })
        );
        readResult.records.forEach((record) => {
          const user = record.get('user');
          users.push({ ...user.properties });
        });
        res.status(200).json(users);
      } catch {
        console.log('Something went wrong!!');
      } finally {
        await session.close();
        await db.close();
      }
  }
}
