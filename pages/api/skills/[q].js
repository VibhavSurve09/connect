import dbConnect from '../../../db/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const { q } = req.query;
  const db = await dbConnect();
  const session = await db.session();
  switch (method) {
    case 'GET':
      const queryString = `MATCH (skills:SKILL) WHERE skills.name STARTS WITH $query RETURN (skills)`;
      const queryData = [];
      try {
        const readResult = await session.readTransaction((tx) =>
          tx.run(queryString, { query: q })
        );
        readResult.records.forEach((record) => {
          const skills = record.get('skills');
          queryData.push({ ...skills.properties, id: skills.identity.low });
        });
        res.status(200).json(queryData);
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
