import mongoConnect from '../../../db/mongoDb';
import Notifications from '../../../schemas/Notfications';
mongoConnect();
export default async function handler(req, res) {
  const { method } = req;
  const { docId } = req.query;
  switch (method) {
    case 'GET':
      try {
        const _notifications = await Notifications.find({
          receiverDocId: docId,
        }).sort({ createdAt: -1 });
        res
          .status(200)
          .json({ success: true, notifications_data: _notifications });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
