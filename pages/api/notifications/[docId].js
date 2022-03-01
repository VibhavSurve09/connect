import mongoConnect from '../../../db/mongoDb';
import Notifications from '../../../schemas/Notfications';
mongoConnect();
export async function handler(req, res) {
  const { method } = req;
  const { docId } = req.query;
  switch (method) {
    case 'GET':
      try {
        const notifications = await Notifications.find({
          receiverDocId: docId,
        });
        res.status(200).json({ success: true, data: notifications });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
