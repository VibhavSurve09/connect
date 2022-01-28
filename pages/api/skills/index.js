import dbConnect from '../../../db/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const db = await dbConnect();
  const session = await db.session();
  switch (method) {
    case 'GET':
      const query = 'MATCH (skills:SKILL) return (skills)';
      try {
        const tempData = [];
        const readResult = await session.readTransaction((tx) => tx.run(query));
        readResult.records.forEach((record) => {
          const skills = record.get('skills');
          tempData.push({ ...skills.properties, id: skills.identity.low });
        });
        res.status(200).json({ success: true, data: tempData });
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
